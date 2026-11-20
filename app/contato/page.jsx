"use client";

import { useState } from "react";

const campo = "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-nova-sky focus:ring-2 focus:ring-nova-sky/30";

export default function Contato() {
  const [enviado, setEnviado] = useState(false);
  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-2">
      <div>
        <h1 className="text-3xl font-extrabold text-nova-navy">Fale com a TechNova</h1>
        <p className="mt-2 text-sm">Dúvidas, trocas ou devoluções? Fale com a gente.</p>
        <ul className="mt-5 space-y-2 text-sm">
          <li>📧 contato@technova.example</li>
          <li>💬 WhatsApp: (11) 90000-0000 (fictício)</li>
          <li>🕘 Seg a sex, das 9h às 18h</li>
        </ul>
        <div className="mt-6 rounded-xl bg-white p-5 text-sm shadow-sm">
          <h2 className="font-bold text-nova-navy">Política de trocas</h2>
          <p className="mt-1">Você pode devolver ou trocar em até 7 dias após o recebimento (direito de arrependimento) e em até 30 dias em caso de defeito.</p>
        </div>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); setEnviado(true); }} className="space-y-3 rounded-xl bg-white p-6 shadow-sm">
        {enviado ? (
          <p className="py-10 text-center font-semibold text-nova-navy">✅ Mensagem enviada (simulação). Obrigado pelo contato!</p>
        ) : (
          <>
            <label className="block text-sm font-medium">Nome<input required className={campo} /></label>
            <label className="block text-sm font-medium">E-mail<input type="email" required className={campo} /></label>
            <label className="block text-sm font-medium">Mensagem<textarea required rows={4} className={campo} /></label>
            <button className="rounded-lg bg-nova-navy px-5 py-2.5 font-bold text-white hover:bg-nova-sky hover:text-nova-navy">Enviar</button>
          </>
        )}
      </form>
    </div>
  );
}
