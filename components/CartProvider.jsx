"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getProduto } from "@/lib/products";

const CartCtx = createContext(null);
const CHAVE = "technova_carrinho";

export function CartProvider({ children }) {
  const [itens, setItens] = useState([]); // [{ slug, qtd }]
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CHAVE);
      if (raw) setItens(JSON.parse(raw));
    } catch {}
    setPronto(true);
  }, []);

  useEffect(() => {
    if (!pronto) return;
    try { localStorage.setItem(CHAVE, JSON.stringify(itens)); } catch {}
  }, [itens, pronto]);

  const adicionar = (slug, qtd = 1) =>
    setItens((l) => {
      const ex = l.find((i) => i.slug === slug);
      return ex ? l.map((i) => (i.slug === slug ? { ...i, qtd: Math.min(10, i.qtd + qtd) } : i)) : [...l, { slug, qtd }];
    });
  const remover = (slug) => setItens((l) => l.filter((i) => i.slug !== slug));
  const alterarQtd = (slug, qtd) =>
    setItens((l) => (qtd <= 0 ? l.filter((i) => i.slug !== slug) : l.map((i) => (i.slug === slug ? { ...i, qtd: Math.min(10, qtd) } : i))));
  const limpar = () => setItens([]);

  const linhas = itens.map((i) => ({ ...i, produto: getProduto(i.slug) })).filter((i) => i.produto);
  const subtotal = linhas.reduce((s, i) => s + i.produto.preco * i.qtd, 0);
  const quantidade = linhas.reduce((s, i) => s + i.qtd, 0);

  return (
    <CartCtx.Provider value={{ linhas, subtotal, quantidade, adicionar, remover, alterarQtd, limpar, pronto }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);
