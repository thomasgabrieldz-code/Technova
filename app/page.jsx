import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { CATEGORIAS, PRODUTOS } from "@/lib/products";

export default function Home() {
  const ofertas = PRODUTOS.filter((p) => p.precoAntigo).sort((a, b) => b.precoAntigo / b.preco - a.precoAntigo / a.preco).slice(0, 8);
  const destaques = [...PRODUTOS].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-4 pt-6">
      {/* Banner */}
      <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-nova-navy via-nova-navy2 to-sky-600 p-8 text-white md:p-14">
        <p className="text-sm font-bold uppercase tracking-widest text-nova-sky">Semana TechNova</p>
        <h1 className="mt-2 max-w-xl text-3xl font-extrabold leading-tight md:text-5xl">
          Tecnologia acessível e prática para o seu dia a dia
        </h1>
        <p className="mt-3 max-w-lg text-slate-200">
          Fones, teclados, mouses e muito mais com até 30% OFF, 10x sem juros e 5% extra no Pix.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/catalogo" className="rounded-lg bg-nova-sky px-6 py-3 font-extrabold text-nova-navy hover:brightness-110">Ver catálogo</Link>
          <Link href="/catalogo?categoria=fones" className="rounded-lg border border-white/40 px-6 py-3 font-semibold hover:bg-white/10">Fones em oferta</Link>
        </div>
      </section>

      {/* Benefícios */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["🚚", "Frete grátis", "Acima de R$ 199"],
          ["💳", "10x sem juros", "No cartão de crédito"],
          ["⚡", "5% no Pix", "Desconto automático"],
          ["🔒", "Compra segura", "Seus dados protegidos"],
        ].map(([i, t, s]) => (
          <div key={t} className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
            <span className="text-2xl">{i}</span>
            <div><p className="font-bold text-nova-navy">{t}</p><p className="text-xs text-slate-500">{s}</p></div>
          </div>
        ))}
      </section>

      {/* Categorias */}
      <section>
        <h2 className="mb-4 text-xl font-extrabold text-nova-navy">Compre por categoria</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIAS.map((c) => (
            <Link key={c.slug} href={`/catalogo?categoria=${c.slug}`} className="flex flex-col items-center gap-2 rounded-xl bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <span className="text-4xl">{c.emoji}</span>
              <span className="text-sm font-semibold text-nova-navy">{c.nome}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Ofertas */}
      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-extrabold text-nova-navy">🔥 Ofertas da semana</h2>
          <Link href="/catalogo" className="text-sm font-semibold text-sky-600 hover:underline">Ver tudo →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{ofertas.map((p) => <ProductCard key={p.slug} produto={p} />)}</div>
      </section>

      {/* Mais bem avaliados */}
      <section>
        <h2 className="mb-4 text-xl font-extrabold text-nova-navy">⭐ Mais bem avaliados</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{destaques.map((p) => <ProductCard key={p.slug} produto={p} />)}</div>
      </section>

      {/* Cupom */}
      <section className="rounded-2xl bg-nova-navy p-8 text-center text-white">
        <p className="text-sm uppercase tracking-widest text-nova-sky">Primeira compra</p>
        <h2 className="mt-1 text-2xl font-extrabold">Use o cupom <span className="rounded bg-nova-sky px-2 text-nova-navy">BEMVINDO10</span> e ganhe 10% OFF</h2>
        <p className="mt-2 text-sm text-slate-300">Aplique no carrinho ou no checkout.</p>
      </section>
    </div>
  );
}
