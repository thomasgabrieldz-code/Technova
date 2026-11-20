"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function ContaPage() {
  const { user, ready, configured, login, register, resetPassword, logout, isAdmin } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function handle(e) {
    e.preventDefault(); setError(""); setMessage("");
    if (mode === "register" && password !== confirm) { setError("As senhas não conferem."); return; }
    if (mode === "register" && password.length < 10) { setError("A senha precisa ter ao menos 10 caracteres."); return; }
    setBusy(true);
    try {
      if (mode === "reset") { await resetPassword(email.trim()); setMessage("A recuperação foi solicitada."); }
      else if (mode === "register") await register(email.trim(), password);
      else await login(email.trim(), password);
      setPassword(""); setConfirm("");
    } catch(err) { setError(err?.message || "Não foi possível concluir sua solicitação."); }
    finally { setBusy(false); }
  }
  return <div className="mx-auto min-h-[65vh] max-w-lg px-4 py-12">
    <div className="rounded-2xl bg-white p-7 shadow-lg">
      {!ready ? <p>Carregando...</p> : user ? <>
        <h1 className="mb-3 text-2xl font-bold text-nova-navy">Minha conta</h1>
        <p className="break-all text-slate-700">Você está conectado como <strong>{user.email}</strong>.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded-lg bg-nova-navy px-4 py-2 font-semibold text-white" href="/catalogo">Ver produtos</Link>
          {isAdmin && <Link className="rounded-lg bg-slate-200 px-4 py-2" href="/admin">Painel demo</Link>}
          <button className="rounded-lg border px-4 py-2" onClick={logout}>Sair da conta</button>
        </div>
      </> : <>
        <h1 className="text-2xl font-extrabold text-nova-navy">{mode === "login" ? "Entrar na TechNova" : mode === "register" ? "Criar conta" : "Recuperar senha"}</h1>
        <p className="mt-2 text-sm text-slate-600">Você pode navegar pela loja sem entrar. O cadastro é opcional.</p>
        {!configured && <div role="alert" className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          O serviço de contas está indisponível. Confira o banco D1 do Cloudflare e a configuração do Worker.
        </div>}
        <form onSubmit={handle} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold text-slate-800">E-mail
            <input required type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-3" placeholder="voce@email.com" />
          </label>
          {mode !== "reset" && <label className="block text-sm font-semibold text-slate-800">Senha
            <input required type="password" minLength={mode === "register" ? 10 : undefined} autoComplete={mode === "register" ? "new-password" : "current-password"} value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-3" placeholder="Pelo menos 10 caracteres" />
          </label>}
          {mode === "register" && <label className="block text-sm font-semibold text-slate-800">Confirmar senha
            <input required type="password" autoComplete="new-password" value={confirm} onChange={e=>setConfirm(e.target.value)} className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-3" />
          </label>}
          {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {message && <p role="status" className="rounded-md bg-green-50 p-3 text-sm text-green-700">{message}</p>}
          <button disabled={!configured || busy} className="w-full rounded-lg bg-nova-navy px-4 py-3 font-bold text-white disabled:opacity-50">{busy ? "Aguarde..." : mode === "reset" ? "Enviar recuperação" : mode === "register" ? "Criar conta" : "Entrar"}</button>
        </form>
        <div className="mt-5 flex flex-wrap gap-3 text-sm">
          {mode !== "login" && <button className="font-semibold text-blue-700 underline" onClick={()=>{setMode("login");setError("");setMessage("");}}>Já tenho conta</button>}
          {mode !== "register" && <button className="font-semibold text-blue-700 underline" onClick={()=>{setMode("register");setError("");setMessage("");}}>Criar conta</button>}
          {mode !== "reset" && <button className="font-semibold text-blue-700 underline" onClick={()=>{setMode("reset");setError("");setMessage("");}}>Esqueci a senha</button>}
        </div>
      </>}
    </div>
  </div>;
}
