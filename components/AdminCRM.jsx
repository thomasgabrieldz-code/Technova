"use client";

import { useEffect, useState } from "react";
import WelcomeEmail from "./WelcomeEmail";
import { CLIENTES_INICIAIS, carregarClientes, salvarClientes } from "@/lib/clientes";

const CUPOM = "BEMVINDO10";

const hoje = () => new Date().toLocaleDateString("pt-BR");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AdminCRM() {
  const [clientes, setClientes] = useState(CLIENTES_INICIAIS);
  const [pronto, setPronto] = useState(false);

  // Carrega do navegador (clientes que compraram na loja aparecem aqui)
  useEffect(() => {
    setClientes(carregarClientes());
    setPronto(true);
  }, []);
  useEffect(() => {
    if (pronto) salvarClientes(clientes);
  }, [clientes, pronto]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [emailAberto, setEmailAberto] = useState(null); // cliente cujo e-mail está na prévia
  const [aviso, setAviso] = useState("");

  const ativos = clientes.filter((c) => c.status === "Ativo").length;

  function simularCadastro(e) {
    e.preventDefault();
    const n = nome.trim();
    const m = email.trim().toLowerCase();

    if (n.length < 2) return setErro("Informe o nome do cliente.");
    if (!EMAIL_REGEX.test(m)) return setErro("Informe um e-mail válido.");
    if (clientes.some((c) => c.email.toLowerCase() === m))
      return setErro("Este e-mail já está cadastrado.");

    const novo = {
      id: Date.now(),
      nome: n,
      email: m,
      data: hoje(),
      status: "Ativo",
    };
    setClientes((lista) => [novo, ...lista]);
    setNome("");
    setEmail("");
    setErro("");
    setAviso(`Cadastro simulado! E-mail de boas-vindas enviado para ${m}.`);
    setEmailAberto(novo); // abre a prévia do e-mail automaticamente
  }

  function alternarStatus(id) {
    setClientes((lista) =>
      lista.map((c) =>
        c.id === id ? { ...c, status: c.status === "Ativo" ? "Inativo" : "Ativo" } : c
      )
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-700">
      {/* Topo */}
      <header className="bg-[#0B1F3A] text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#38A9F5] text-lg font-bold text-[#0B1F3A]">
              ⚡
            </span>
            <div>
              <p className="text-xl font-bold leading-none">
                Tech<span className="text-[#38A9F5]">Nova</span>
              </p>
              <p className="text-[11px] text-slate-300">Painel administrativo · CRM</p>
            </div>
          </div>
          <span className="hidden text-xs text-slate-300 sm:block">
            Tecnologia acessível e prática para o seu dia a dia
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        {/* Indicadores */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { rotulo: "Total de clientes", valor: clientes.length },
            { rotulo: "Clientes ativos", valor: ativos },
            { rotulo: "Clientes inativos", valor: clientes.length - ativos },
          ].map((card) => (
            <div key={card.rotulo} className="rounded-xl border-l-4 border-[#38A9F5] bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {card.rotulo}
              </p>
              <p className="mt-1 text-3xl font-extrabold text-[#0B1F3A]">{card.valor}</p>
            </div>
          ))}
        </section>

        {/* Formulário */}
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#0B1F3A]">Novo cliente</h2>
          <p className="text-sm text-slate-500">
            Ao simular o cadastro, o cliente entra na lista e recebe o e-mail de boas-vindas.
          </p>

          <form onSubmit={simularCadastro} className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <label className="block text-sm font-medium">
              Nome
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex.: Maria Silva"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#38A9F5] focus:ring-2 focus:ring-[#38A9F5]/30"
              />
            </label>
            <label className="block text-sm font-medium">
              E-mail
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maria@email.com"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#38A9F5] focus:ring-2 focus:ring-[#38A9F5]/30"
              />
            </label>
            <button
              type="submit"
              className="rounded-lg bg-[#0B1F3A] px-5 py-2.5 font-semibold text-white transition hover:bg-[#12315c] focus:outline-none focus:ring-2 focus:ring-[#38A9F5]"
            >
              Simular Cadastro
            </button>
          </form>

          {erro && (
            <p role="alert" className="mt-3 text-sm font-medium text-red-600">
              {erro}
            </p>
          )}
          {aviso && !erro && (
            <p className="mt-3 rounded-lg bg-sky-50 px-3 py-2 text-sm text-[#0B1F3A]">
              ✅ {aviso}
            </p>
          )}
        </section>

        {/* Tabela */}
        <section className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-lg font-bold text-[#0B1F3A]">Clientes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">E-mail</th>
                  <th className="px-6 py-3">Cadastro</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clientes.map((c) => (
                  <tr key={c.id} className="hover:bg-sky-50/50">
                    <td className="px-6 py-3 font-medium text-[#0B1F3A]">{c.nome}</td>
                    <td className="px-6 py-3">{c.email}</td>
                    <td className="px-6 py-3">{c.data}</td>
                    <td className="px-6 py-3">
                      <button
                        type="button"
                        onClick={() => alternarStatus(c.id)}
                        title="Clique para alternar o status"
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          c.status === "Ativo"
                            ? "bg-sky-100 text-[#0B1F3A]"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {c.status}
                      </button>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setEmailAberto(c)}
                        className="text-xs font-semibold text-[#1d86d6] hover:underline"
                      >
                        Ver e-mail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Modal do e-mail */}
      {emailAberto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="E-mail de boas-vindas"
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#0B1F3A]/70 p-4"
          onClick={() => setEmailAberto(null)}
        >
          <div className="my-8 w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between text-white">
              <p className="text-sm font-semibold">📧 E-mail de boas-vindas (simulação)</p>
              <button
                type="button"
                onClick={() => setEmailAberto(null)}
                className="rounded-md bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
              >
                Fechar ✕
              </button>
            </div>
            <WelcomeEmail nome={emailAberto.nome} email={emailAberto.email} cupom={CUPOM} />
          </div>
        </div>
      )}
    </div>
  );
}
