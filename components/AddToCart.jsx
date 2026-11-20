"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";

export default function AddToCart({ slug }) {
  const { adicionar } = useCart();
  const router = useRouter();
  const [qtd, setQtd] = useState(1);
  const [ok, setOk] = useState(false);

  function add() {
    adicionar(slug, qtd);
    setOk(true);
    setTimeout(() => setOk(false), 2000);
  }

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-lg border border-slate-300 bg-white">
        <button className="px-3 py-2 text-lg" onClick={() => setQtd(Math.max(1, qtd - 1))} aria-label="Diminuir">−</button>
        <span className="w-8 text-center font-semibold">{qtd}</span>
        <button className="px-3 py-2 text-lg" onClick={() => setQtd(Math.min(10, qtd + 1))} aria-label="Aumentar">+</button>
      </div>
      <button onClick={add} className="rounded-lg border-2 border-nova-navy px-5 py-2.5 font-bold text-nova-navy hover:bg-nova-navy hover:text-white">
        {ok ? "Adicionado ✓" : "Adicionar ao carrinho"}
      </button>
      <button onClick={() => { adicionar(slug, qtd); router.push("/carrinho"); }} className="rounded-lg bg-nova-sky px-6 py-3 font-extrabold text-nova-navy hover:brightness-110">
        Comprar agora
      </button>
    </div>
  );
}
