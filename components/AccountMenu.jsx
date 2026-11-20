"use client";
import Link from "next/link";
import { useAuth } from "./AuthProvider";

export default function AccountMenu() {
  const { user, ready, isAdmin, logout } = useAuth();
  if (!ready) return <span className="text-xs text-slate-300">Conta...</span>;
  return <div className="flex items-center gap-3 text-sm">
    {user ? <>
      <Link href="/conta" className="max-w-28 truncate font-semibold hover:text-nova-sky" title={user.email}>👤 Minha conta</Link>
      {isAdmin && <Link href="/admin" className="hover:text-nova-sky">Admin</Link>}
      <button type="button" onClick={logout} className="hover:text-nova-sky">Sair</button>
    </> : <Link href="/conta" className="whitespace-nowrap font-semibold hover:text-nova-sky">👤 Entrar / Cadastrar</Link>}
  </div>;
}
