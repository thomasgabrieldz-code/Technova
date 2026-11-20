"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ProductImage } from "@/components/ProductCard";
import { brl, pix, FRETE_GRATIS, FRETE_FIXO } from "@/lib/products";

export default function Carrinho() {
  const { linhas, subtotal, alterarQtd, remover, pronto } = useCart();
  const frete = subtotal === 0 || subtotal >= FRETE_GRATIS ? 0 : FRETE_FIXO;
  const falta = FRETE_GRATIS - subtotal;

  if (!pronto) return <p className="p-10 text-center">Carregando...</p>;

  if (linhas.length === 0)
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-6xl">🛒</p>
        <h1 className="mt-3 text-2xl font-extrabold text-nova-navy">Seu carrinho está vazio</h1>
        <Link href="/catalogo" className="mt-5 inline-block rounded-lg bg-nova-navy px-6 py-3 font-bold text-white hover:bg-nova-sky hover:text-nova-navy">Ver produtos</Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-extrabold text-nova-navy">Meu carrinho</h1>
      {falta > 0 && (
        <p className="mt-2 rounded-lg bg-sky-50 px-4 py-2 text-sm text-nova-navy">
          Faltam <strong>{brl(falta)}</strong> para você ganhar <strong>frete grátis</strong>!
        </p>
      )}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-3">
          {linhas.map(({ produto, qtd }) => (
            <div key={produto.slug} className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
              <ProductImage produto={produto} className="h-20 w-20 shrink-0 text-4xl" />
              <div className="min-w-0 flex-1">
                <Link href={`/produto/${produto.slug}`} className="line-clamp-2 font-semibold text-nova-navy hover:underline">{produto.nome}</Link>
                <p className="text-sm text-slate-500">{brl(produto.preco)} cada</p>
                <button onClick={() => remover(produto.slug)} className="mt-1 text-xs font-semibold text-red-600 hover:underline">Remover</button>
              </div>
              <div className="flex items-center rounded-lg border border-slate-300">
                <button className="px-2.5 py-1" onClick={() => alterarQtd(produto.slug, qtd - 1)} aria-label="Diminuir">−</button>
                <span className="w-6 text-center text-sm font-semibold">{qtd}</span>
                <button className="px-2.5 py-1" onClick={() => alterarQtd(produto.slug, qtd + 1)} aria-label="Aumentar">+</button>
              </div>
              <p className="w-24 text-right font-bold text-nova-navy">{brl(produto.preco * qtd)}</p>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-bold text-nova-navy">Resumo</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{brl(subtotal)}</dd></div>
            <div className="flex justify-between"><dt>Frete</dt><dd>{frete === 0 ? "Grátis" : brl(frete)}</dd></div>
            <div className="flex justify-between border-t pt-2 text-base font-extrabold text-nova-navy"><dt>Total</dt><dd>{brl(subtotal + frete)}</dd></div>
            <p className="text-xs text-emerald-600">ou {brl(pix(subtotal) + frete)} no Pix (5% OFF)</p>
          </dl>
          <Link href="/checkout" className="mt-4 block rounded-lg bg-nova-sky py-3 text-center font-extrabold text-nova-navy hover:brightness-110">Finalizar compra</Link>
          <Link href="/catalogo" className="mt-2 block text-center text-sm text-slate-500 hover:underline">Continuar comprando</Link>
        </aside>
      </div>
    </div>
  );
}
