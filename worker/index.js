// TechNova: autenticação Cloudflare Workers + D1, mesma abordagem do Kimetsu System.
const json=(data,status=200,headers={})=>Response.json(data,{status,headers:{"Cache-Control":"no-store",...headers}});
const fail=(error,status=400)=>json({error},status);
const read=async req=>{try{return await req.json();}catch{return {};}};
const sha256=async value=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value)))).map(b=>b.toString(16).padStart(2,"0")).join("");
const rand=n=>Array.from(crypto.getRandomValues(new Uint8Array(n))).map(b=>b.toString(16).padStart(2,"0")).join("");
const hashPassword=async(password,salt)=>{
 const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(password),"PBKDF2",false,["deriveBits"]);
 const result=await crypto.subtle.deriveBits({name:"PBKDF2",salt:new TextEncoder().encode(salt),iterations:100000,hash:"SHA-256"},key,256);
 return Array.from(new Uint8Array(result)).map(b=>b.toString(16).padStart(2,"0")).join("");
};
const equal=(a,b)=>{if(typeof a!=="string"||typeof b!=="string"||a.length!==b.length)return false;let v=0;for(let i=0;i<a.length;i++)v|=a.charCodeAt(i)^b.charCodeAt(i);return v===0;};
const now=()=>new Date().toISOString();
const row=(db,q,...args)=>db.prepare(q).bind(...args).first();
const run=(db,q,...args)=>db.prepare(q).bind(...args).run();
const COOKIE="technova_session";
const sessionCookie=(token,maxAge)=>`${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
const matchCookie=req=>{const value=(req.headers.get("cookie")||"").split(";").map(x=>x.trim()).find(x=>x.startsWith(COOKIE+"="));if(!value)return null;const token=value.slice(COOKIE.length+1);return /^[a-f0-9]{64}$/.test(token)?[value,token]:null;};
async function currentUser(req,env){
 const m=matchCookie(req);if(!m)return null;
 const tokenHash=await sha256(m[1]);
 return await row(env.DB,`SELECT u.id,u.email FROM sessions s JOIN users u ON s.user_id=u.id WHERE s.token_hash=? AND s.expires_at>?`,tokenHash,now());
}
const safeUser=(user,env)=>({id:user.id,uid:user.id,email:user.email,isAdmin:Boolean(env.ADMIN_EMAIL&&user.email.toLowerCase()===env.ADMIN_EMAIL.trim().toLowerCase())});
async function createSession(db,user){
 const token=rand(32); const age=30*86400;
 await run(db,"INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,?)",await sha256(token),user.id,new Date(Date.now()+age*1000).toISOString());
 return sessionCookie(token,age);
}
async function api(req,env,path){
 const db=env.DB;
 if(!db)return fail("Banco D1 não conectado. Configure o binding DB no Worker.",503);
 if(path==="/api/health"){
  try{await row(db,"SELECT id FROM users LIMIT 1");return json({ok:true,database:"connected"});}
  catch{return fail("Banco conectado, mas tabelas ainda não criadas. Execute a migração D1.",503);}
 }
 const method=req.method, action=path.split("/")[3];
 if(method==="GET"&&action==="me"){
  const user=await currentUser(req,env);return json({user:user?safeUser(user,env):null});
 }
 if(method==="POST"&&action==="signup"){
  const data=await read(req),email=String(data.email||"").trim().toLowerCase().slice(0,254),password=String(data.password||"");
  if(!/^\S+@\S+\.\S+$/.test(email))return fail("Informe um e-mail válido.");
  if(password.length<10||password.length>128)return fail("A senha deve ter de 10 a 128 caracteres.");
  const user={id:crypto.randomUUID(),email}; const salt=rand(16),passwordHash=await hashPassword(password,salt);
  try{await run(db,"INSERT INTO users(id,email,password_hash,salt,created_at) VALUES(?,?,?,?,?)",user.id,email,passwordHash,salt,now());}
  catch(e){if(String(e).includes("UNIQUE"))return fail("Esse e-mail já está cadastrado.",409);throw e;}
  const cookie=await createSession(db,user);
  return json({user:safeUser(user,env)},201,{"Set-Cookie":cookie});
 }
 if(method==="POST"&&action==="login"){
  const data=await read(req),email=String(data.email||"").trim().toLowerCase().slice(0,254),password=String(data.password||"");
  const user=await row(db,"SELECT * FROM users WHERE email=?",email);
  if(!user)return fail("E-mail ou senha incorretos.",401);
  if(user.locked_until&&user.locked_until>now())return fail("Muitas tentativas. Aguarde 15 minutos.",429);
  const valid=equal(await hashPassword(password,user.salt),user.password_hash);
  if(!valid){const n=Number(user.failed_attempts||0)+1;await run(db,"UPDATE users SET failed_attempts=?,locked_until=? WHERE id=?",n>=8?0:n,n>=8?new Date(Date.now()+900000).toISOString():null,user.id);return fail("E-mail ou senha incorretos.",401);}
  await run(db,"UPDATE users SET failed_attempts=0,locked_until=NULL WHERE id=?",user.id);
  return json({user:safeUser(user,env)},200,{"Set-Cookie":await createSession(db,user)});
 }
 if(method==="POST"&&action==="logout"){
  const m=matchCookie(req);if(m)await run(db,"DELETE FROM sessions WHERE token_hash=?",await sha256(m[1]));
  return json({ok:true},200,{"Set-Cookie":sessionCookie("",0)});
 }
 if(method==="POST"&&action==="reset")return fail("A recuperação de senha por e-mail ainda não está disponível. Entre em contato com a loja.",501);
 return fail("Rota não encontrada.",404);
}
export default {
 async fetch(req,env){
  const url=new URL(req.url),path=url.pathname;
  if(path.startsWith("/api/")){
   if(req.method!=="GET"&&req.method!=="HEAD"){
    const origin=req.headers.get("origin");
    if(origin&&origin!==url.origin)return fail("Origem não autorizada.",403);
   }
   try{return await api(req,env,path);}catch(e){console.error("TechNova API error",e);return fail("Erro interno no servidor.",500);}
  }
  return env.ASSETS.fetch(req);
 }
};
