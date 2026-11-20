"use client";

import { useState } from "react";

/**
 * Prévia do e-mail de boas-vindas da TechNova (simulado).
 * Texto gerado com apoio de IA e revisado pelo grupo.
 * Paleta: azul-escuro #0B1F3A, azul-claro #38A9F5, branco e cinza.
 */
export default function WelcomeEmail({ nome, email, cupom = "BEMVINDO10" }) {
  const primeiroNome = (nome || "cliente").split(" ")[0];
  const [copiado, setCopiado] = useState(false);

  async function copiarCupom() {
    try {
      await navigator.clipboard.writeText(cupom);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* clipboard pode estar bloqueado; ignorar */
    }
  }

  return (
    <div className="mx-auto w-full max-w-[560px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Cabeçalho */}
      <div className="bg-[#0B1F3A] px-6 py-5 text-center">
        <div className="inline-flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#38A9F5] text-lg font-bold text-[#0B1F3A]">
            ⚡
          </span>
          <span className="text-2xl font-bold tracking-tight text-white">
            Tech<span className="text-[#38A9F5]">Nova</span>
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-300">
          Tecnologia acessível e prática para o seu dia a dia
        </p>
      </div>

      {/* Metadados do e-mail */}
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-3 text-xs text-slate-500">
        <p>
          <span className="font-semibold text-slate-600">Para:</span> {email}
        </p>
        <p>
          <span className="font-semibold text-slate-600">Assunto:</span> 🎉{" "}
          {primeiroNome}, seu cupom de boas-vindas chegou!
        </p>
      </div>

      {/* Corpo */}
      <div className="px-6 py-8 text-slate-700">
        <h2 className="text-2xl font-bold text-[#0B1F3A]">
          Olá, {primeiroNome}! 👋
        </h2>
        <p className="mt-4 leading-relaxed">
          <strong>Seja bem-vindo à TechNova!</strong> Aqui você encontra
          tecnologia acessível e prática para o seu dia a dia: fones, teclados,
          mouses, carregadores, cabos e suportes selecionados para quem quer
          qualidade sem pesar no bolso.
        </p>
        <p className="mt-3 leading-relaxed">
          Para comemorar o seu cadastro, preparamos um presente: use o cupom
          abaixo na sua primeira compra e ganhe{" "}
          <strong className="text-[#0B1F3A]">10% de desconto</strong>.
        </p>

        {/* Cupom */}
        <div className="mt-6 rounded-xl border-2 border-dashed border-[#38A9F5] bg-sky-50 p-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Seu cupom de 10% OFF
          </p>
          <p className="mt-1 text-3xl font-extrabold tracking-widest text-[#0B1F3A]">
            {cupom}
          </p>
          <button
            type="button"
            onClick={copiarCupom}
            className="mt-3 rounded-md border border-[#38A9F5] px-3 py-1 text-xs font-semibold text-[#0B1F3A] transition hover:bg-[#38A9F5] hover:text-white"
          >
            {copiado ? "Copiado ✓" : "Copiar cupom"}
          </button>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-block rounded-lg bg-[#38A9F5] px-8 py-3 font-bold text-[#0B1F3A] shadow transition hover:brightness-110"
          >
            Aproveitar meu desconto
          </a>
          <p className="mt-3 text-xs text-slate-400">
            Válido por 7 dias, para a primeira compra.
          </p>
        </div>

        {/* Benefícios */}
        <ul className="mt-8 grid grid-cols-3 gap-3 text-center text-xs text-slate-600">
          <li className="rounded-lg bg-slate-100 p-3">
            <div className="text-xl">💸</div>
            Preços acessíveis
          </li>
          <li className="rounded-lg bg-slate-100 p-3">
            <div className="text-xl">🔒</div>
            Compra segura
          </li>
          <li className="rounded-lg bg-slate-100 p-3">
            <div className="text-xl">🚚</div>
            Entrega prática
          </li>
        </ul>
      </div>

      {/* Rodapé */}
      <div className="bg-slate-100 px-6 py-4 text-center text-[11px] leading-relaxed text-slate-500">
        TechNova · Projeto acadêmico, e-mail fictício e simulado.
        <br />
        Você recebeu esta mensagem porque se cadastrou na loja.
      </div>
    </div>
  );
}
