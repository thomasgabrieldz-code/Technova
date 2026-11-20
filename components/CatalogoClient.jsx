"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { CATEGORIAS, PRODUTOS } from "@/lib/products";

export default function CatalogoClient() {
  const sp = useSearchParams();
  const categoria = sp.get("categoria") || "";
  const q = (sp.get("q") || "").toLowerCase();
  const ordem = sp.get("ordem") || "relevancia";
  const max = Number(sp.get("max")) || 0;

  const href = (over) => {
    const params = new URLSearchParams();
    const base = { categoria, q: sp.get("q") || "", ordem, max: max || "", ...over };
    Object.entries(base).forEach(([k, v]) => v && params.set(k, v));
    const s = params.toString();
    return `/catalogo${s ? `?${s}` : ""}`;
  };

  let lista = PRODUTOS.filter(
    (p) =>
      (!categoria || p.categoria === categoria) &&
      (!q || `${p.nome} ${p.marca} ${p.descricao}`.toLowerCase().includes(q)) &&
      (!max || p.preco <= max)
  );
  if (ordem === "menor") lista = [...lista].sort((a, b) => a.preco - b.preco);
  if (ordem === "maior") lista = [...lista].sort((a, b) => b.preco - a.preco);
  if (ordem === "nota") lista = [...lista].sort((a, b) => b.rating - a.rating);

  const chip = (ativo) =>
    `block rounded-lg px-3 py-2 text-sm ${ativo ? "bg-nova-navy font-bold text-white" : "bg-white text-slate-700 hover:bg-sky-50"}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-extrabold text-nova-navy">
        {categoria ? CATEGORIAS.find((c) => c.slug === categoria)?.nome : "Todos os produtos"}
        {q && <span className="text-base font-medium text-slate-500"> · busca: “{sp.get("q")}”</span>}
      </h1>
      <p className="text-sm text-slate-500">{lista.length} produto(s) encontrado(s)</p>

      <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
        <aside className="space-y-6">
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Categorias</h3>
            <div className="space-y-1">
              <Link href={href({ categoria: "" })} className={chip(!categoria)}>Todas</Link>
              {CATEGORIAS.map((c) => (
                <Link key={c.slug} href={href({ categoria: c.slug })} className={chip(categoria === c.slug)}>{c.emoji} {c.nome}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Preço até</h3>
            <div className="space-y-1">
              {[0, 50, 100, 200].map((v) => (
                <Link key={v} href={href({ max: v || "" })} className={chip(max === v)}>{v ? `R$ ${v}` : "Qualquer preço"}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Ordenar por</h3>
            <div className="space-y-1">
              {[["relevancia", "Relevância"], ["menor", "Menor preço"], ["maior", "Maior preço"], ["nota", "Melhor avaliação"]].map(([v, t]) => (
                <Link key={v} href={href({ ordem: v })} className={chip(ordem === v)}>{t}</Link>
              ))}
            </div>
          </div>
        </aside>

        {lista.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-2 font-semibold text-nova-navy">Nenhum produto encontrado</p>
            <Link href="/catalogo" className="mt-3 inline-block text-sm font-semibold text-sky-600 hover:underline">Limpar filtros</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">{lista.map((p) => <ProductCard key={p.slug} produto={p} />)}</div>
        )}
      </div>
    </div>
  );
}
