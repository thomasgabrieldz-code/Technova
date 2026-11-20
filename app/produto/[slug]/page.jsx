import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";
import ProductCard, { ProductImage, Estrelas } from "@/components/ProductCard";
import { PRODUTOS, getProduto, getCategoria, brl, pix, parcela, FRETE_GRATIS } from "@/lib/products";

export function generateStaticParams() {
  return PRODUTOS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduto(slug);
  return { title: p ? `${p.nome} | TechNova` : "Produto | TechNova" };
}

export default async function Produto({ params }) {
  const { slug } = await params;
  const p = getProduto(slug);
  if (!p) notFound();
  const cat = getCategoria(p.categoria);
  const relacionados = PRODUTOS.filter((x) => x.categoria === p.categoria && x.slug !== p.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-4 text-xs text-slate-500">
        <Link href="/" className="hover:underline">Início</Link> /{" "}
        <Link href={`/catalogo?categoria=${cat.slug}`} className="hover:underline">{cat.nome}</Link> / {p.nome}
      </nav>

      <div className="grid gap-8 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
        <ProductImage produto={p} className="h-72 text-9xl md:h-full" />
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-nova-sky">{p.marca}</p>
          <h1 className="mt-1 text-2xl font-extrabold text-nova-navy">{p.nome}</h1>
          <div className="mt-1"><Estrelas nota={p.rating} /></div>
          <p className="mt-4 text-slate-600">{p.descricao}</p>

          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            {p.precoAntigo && <p className="text-sm text-slate-400 line-through">{brl(p.precoAntigo)}</p>}
            <p className="text-3xl font-extrabold text-nova-navy">{brl(pix(p.preco))} <span className="text-sm font-semibold text-emerald-600">à vista no Pix (5% OFF)</span></p>
            <p className="text-sm text-slate-600">ou {brl(p.preco)} em até <strong>10x de {parcela(p.preco)}</strong> sem juros</p>
          </div>

          <AddToCart slug={p.slug} />
          <p className="mt-4 text-sm text-slate-500">🚚 Frete grátis em compras acima de {brl(FRETE_GRATIS)} · ✅ Em estoque</p>

          <h2 className="mt-6 font-bold text-nova-navy">Especificações</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {p.specs.map((s) => <li key={s} className="rounded bg-slate-50 px-3 py-1.5">• {s}</li>)}
          </ul>
        </div>
      </div>

      {relacionados.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-extrabold text-nova-navy">Quem viu este produto também viu</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{relacionados.map((r) => <ProductCard key={r.slug} produto={r} />)}</div>
        </section>
      )}
    </div>
  );
}
