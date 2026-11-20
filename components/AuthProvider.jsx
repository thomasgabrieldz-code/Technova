"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
const Context = createContext(null);
async function api(endpoint,method="GET",data){
 const resp=await fetch(`/api/auth/${endpoint}`,{method,credentials:"same-origin",cache:"no-store",headers:{"Content-Type":"application/json"},body:data===undefined?undefined:JSON.stringify(data)});
 let payload={}; try {payload=await resp.json();}catch{}
 if(!resp.ok) throw new Error(payload.error||`Erro HTTP ${resp.status}`);
 return payload;
}
export function AuthProvider({children}){
 const [user,setUser]=useState(null);
 const [ready,setReady]=useState(false);
 const [configured,setConfigured]=useState(true);
 const [isAdmin,setIsAdmin]=useState(false);
 const refresh=useCallback(async()=>{
  try{const r=await api("me");setUser(r.user||null);setIsAdmin(Boolean(r.user?.isAdmin));setConfigured(true);}
  catch(e){setUser(null);setIsAdmin(false);setConfigured(false);}
  finally{setReady(true);}
 },[]);
 useEffect(()=>{refresh();},[refresh]);
 const login=async(email,password)=>{const r=await api("login","POST",{email,password});setUser(r.user);setIsAdmin(Boolean(r.user.isAdmin));return r.user;};
 const register=async(email,password)=>{const r=await api("signup","POST",{email,password});setUser(r.user);setIsAdmin(Boolean(r.user.isAdmin));return r.user;};
 const resetPassword=async()=>{throw new Error("Recuperação por e-mail ainda não configurada. Entre em contato com a loja para redefinir a senha.");};
 const logout=async()=>{try{await api("logout","POST",{});}finally{setUser(null);setIsAdmin(false);}};
 return <Context.Provider value={{user,ready,configured,isAdmin,login,register,resetPassword,logout,refresh}}>{children}</Context.Provider>;
}
export const useAuth=()=>useContext(Context);
