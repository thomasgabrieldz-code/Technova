"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import AccountMenu from "./AccountMenu";
import { useCart } from "./CartProvider";
import { CATEGORIAS } from "@/lib/products";

export default function Header() {
  const router = useRouter();
  const { quantidade } = useCart();
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(false);

  function buscar(e) {
    e.preventDefault();
    router.push(`/catalogo${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`);
    setMenu(false);
  }

  return (
    <header className="sticky top-0 z-40 shadow">
      <div className="bg-nova-sky px-4 py-1.5 text-center text-xs font-semibold text-nova-navy">
        🚚 Frete grátis acima de R$ 199 para todo o Brasil · 5% de desconto no Pix · Cupom BEMVINDO10
      </div>

      <div className="bg-nova-navy">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <button className="text-2xl text-white md:hidden" onClick={() => setMenu(!menu)} aria-label="Menu">☰</button>
          <Link href="/" aria-label="TechNova - início"><Logo /></Link>

          <form onSubmit={buscar} className="mx-2 hidden flex-1 md:flex">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="O que você procura? Ex.: fone, teclado, carregador..."
              className="w-full rounded-l-lg bg-white px-4 py-2 text-sm text-slate-700 outline-none"
            />
            <button className="rounded-r-lg bg-nova-sky px-5 font-bold text-nova-navy hover:brightness-110">Buscar</button>
          </form>

          <div className="ml-auto flex items-center gap-4 text-white">
            <AccountMenu />
            <Link href="/carrinho" className="relative flex items-center gap-1 text-sm font-semibold hover:text-nova-sky">
              <span className="text-xl">🛒</span>
              <span className="hidden sm:inline">Carrinho</span>
              {quantidade > 0 && (
                <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-nova-sky px-1 text-[11px] font-bold text-nova-navy">
                  {quantidade}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Categorias */}
        <nav className={`${menu ? "block" : "hidden"} border-t border-white/10 bg-nova-navy2 md:block`}>
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-2 text-sm text-slate-200 md:flex-row md:items-center md:gap-6">
            <form onSubmit={buscar} className="mb-2 flex md:hidden">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar produtos" className="w-full rounded-l-lg bg-white px-3 py-2 text-slate-700 outline-none" />
              <button className="rounded-r-lg bg-nova-sky px-4 font-bold text-nova-navy">OK</button>
            </form>
            <Link href="/catalogo" className="font-bold text-white hover:text-nova-sky" onClick={() => setMenu(false)}>Todos os produtos</Link>
            {CATEGORIAS.map((c) => (
              <Link key={c.slug} href={`/catalogo?categoria=${c.slug}`} className="hover:text-nova-sky" onClick={() => setMenu(false)}>
                {c.nome}
              </Link>
            ))}
            <span className="hidden flex-1 md:block" />
            <Link href="/sobre" className="hover:text-nova-sky" onClick={() => setMenu(false)}>Sobre</Link>
            <Link href="/contato" className="hover:text-nova-sky" onClick={() => setMenu(false)}>Contato</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
