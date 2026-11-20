import Link from "next/link";
import { brl, pix, parcela } from "@/lib/products";

export function ProductImage({ produto, className = "h-44 text-6xl" }) {
  return (
    <div className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-slate-100 via-sky-50 to-sky-100 ${className}`}>
      <span aria-hidden>{produto.emoji}</span>
    </div>
  );
}

export function Estrelas({ nota }) {
  return (
    <span className="text-xs text-amber-500" aria-label={`Nota ${nota} de 5`}>
      {"★".repeat(Math.round(nota))}
      <span className="text-slate-300">{"★".repeat(5 - Math.round(nota))}</span>
      <span className="ml-1 text-slate-500">{nota.toFixed(1)}</span>
    </span>
  );
}

export default function ProductCard({ produto }) {
  const desconto = produto.precoAntigo ? Math.round((1 - produto.preco / produto.precoAntigo) * 100) : 0;
  return (
    <Link href={`/produto/${produto.slug}`} className="group relative flex flex-col rounded-xl bg-white p-3 shadow-sm transition hover:shadow-lg">
      {desconto > 0 && (
        <span className="absolute left-3 top-3 z-10 rounded bg-nova-navy px-2 py-0.5 text-xs font-bold text-white">-{desconto}%</span>
      )}
      <ProductImage produto={produto} />
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-nova-sky">{produto.marca}</p>
      <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-nova-navy group-hover:underline">{produto.nome}</h3>
      <Estrelas nota={produto.rating} />
      <div className="mt-2">
        {produto.precoAntigo && <p className="text-xs text-slate-400 line-through">{brl(produto.precoAntigo)}</p>}
        <p className="text-lg font-extrabold text-nova-navy">{brl(pix(produto.preco))} <span className="text-xs font-semibold text-emerald-600">no Pix</span></p>
        <p className="text-xs text-slate-500">ou {brl(produto.preco)} em 10x de {parcela(produto.preco)}</p>
      </div>
      <span className="mt-3 rounded-lg bg-nova-navy py-2 text-center text-sm font-bold text-white group-hover:bg-nova-sky group-hover:text-nova-navy">
        Ver produto
      </span>
    </Link>
  );
}
