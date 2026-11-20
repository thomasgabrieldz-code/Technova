"use client";
import { useAuth } from "@/components/AuthProvider";
import AdminCRM from "@/components/AdminCRM";
import Link from "next/link";
export default function AdminPage() {
  const { ready, isAdmin } = useAuth();
  if (!ready) return <div className="p-10 text-center">Carregando...</div>;
  if (!isAdmin) return <div className="mx-auto max-w-lg p-10 text-center"><h1 className="text-xl font-bold">Acesso restrito</h1><p className="mt-3">Esta página é uma demonstração local do CRM, acessível somente à conta administrativa configurada no Cloudflare.</p><Link className="mt-5 inline-block text-blue-700 underline" href="/conta">Entrar</Link></div>;
  return <AdminCRM />;
}
