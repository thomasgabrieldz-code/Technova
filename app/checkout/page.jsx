"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import WelcomeEmail from "@/components/WelcomeEmail";
import { adicionarCliente } from "@/lib/clientes";
import { brl, FRETE_GRATIS, FRETE_FIXO, CUPOM } from "@/lib/products";

const campo = "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-nova-sky focus:ring-2 focus:ring-nova-sky/30";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Checkout() {
  const { linhas, subtotal, limpar, pronto } = useCart();
  const [f, setF] = useState({ nome: "", email: "", telefone: "", cep: "", rua: "", numero: "", cidade: "", uf: "" });
  const [pagamento, setPagamento] = useState("pix");
  const [cupom, setCupom] = useState("");
  const [cupomOk, setCupomOk] = useState(false);
  const [erro, setErro] = useState("");
  const [pedido, setPedido] = useState(null);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const frete = subtotal >= FRETE_GRATIS ? 0 : FRETE_FIXO;
  const descCupom = cupomOk ? subtotal * 0.1 : 0;
  const descPix = pagamento === "pix" ? (subtotal - descCupom) * 0.05 : 0;
  const total = subtotal - descCupom - descPix + frete;

  function aplicarCupom() {
    if (cupom.trim().toUpperCase() === CUPOM) { setCupomOk(true); setErro(""); }
    else { setCupomOk(false); setErro("Cupom inválido. Tente BEMVINDO10."); }
  }

  function finalizar(e) {
    e.preventDefault();
    if (f.nome.trim().length < 2) return setErro("Informe seu nome completo.");
    if (!EMAIL_REGEX.test(f.email)) return setErro("Informe um e-mail válido.");
    if (!f.cep || !f.rua || !f.numero || !f.cidade || !f.uf) return setErro("Preencha o endereço de entrega.");
    setErro("");
    adicionarCliente(f.nome, f.email); // cadastra o comprador no CRM
    setPedido({
      numero: "TN" + Math.floor(100000 + Math.random() * 900000),
      total, pagamento, nome: f.nome, email: f.email,
    });
    limpar();
  }

  if (!pronto) return <p className="p-10 text-center">Carregando...</p>;

  if (pedido)
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-5xl">🎉</p>
          <h1 className="mt-2 text-2xl font-extrabold text-nova-navy">Pedido {pedido.numero} confirmado!</h1>
          <p className="mt-1 text-slate-600">Obrigado, {pedido.nome.split(" ")[0]}! Total: <strong>{brl(pedido.total)}</strong></p>
          {pedido.pagamento === "pix" && <p className="mt-4 break-all rounded-lg bg-slate-100 p-3 text-xs">PIX (simulado): 00020126580014br.gov.bcb.pix0136technova-fake-{pedido.numero}</p>}
          {pedido.pagamento === "boleto" && <p className="mt-4 break-all rounded-lg bg-slate-100 p-3 text-xs">Boleto (simulado): 23790.12345 60000.123456 78901.234567 8 99990000000000</p>}
          {pedido.pagamento === "cartao" && <p className="mt-4 rounded-lg bg-slate-100 p-3 text-xs">Pagamento no cartão aprovado (simulado).</p>}
          <p className="mt-3 text-xs text-slate-400">Nenhuma cobrança real foi feita. Este é um projeto acadêmico.</p>
        </div>

        <h2 className="mb-3 mt-8 text-center font-bold text-nova-navy">📧 E-mail de boas-vindas enviado para {pedido.email}</h2>
        <WelcomeEmail nome={pedido.nome} email={pedido.email} />

        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="rounded-lg bg-nova-navy px-5 py-2.5 font-bold text-white">Voltar à loja</Link>
          <Link href="/admin" className="rounded-lg border-2 border-nova-navy px-5 py-2.5 font-bold text-nova-navy">Ver no CRM</Link>
        </div>
      </div>
    );

  if (linhas.length === 0)
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-5xl">🛒</p>
        <p className="mt-2 font-semibold text-nova-navy">Seu carrinho está vazio.</p>
        <Link href="/catalogo" className="mt-4 inline-block rounded-lg bg-nova-navy px-6 py-3 font-bold text-white">Ver produtos</Link>
      </div>
    );

  return (
    <form onSubmit={finalizar} className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <h1 className="text-2xl font-extrabold text-nova-navy">Finalizar compra</h1>

        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-bold text-nova-navy">1. Seus dados</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-medium sm:col-span-2">Nome completo<input className={campo} value={f.nome} onChange={set("nome")} /></label>
            <label className="text-sm font-medium">E-mail<input type="email" className={campo} value={f.email} onChange={set("email")} /></label>
            <label className="text-sm font-medium">Telefone<input className={campo} value={f.telefone} onChange={set("telefone")} placeholder="(11) 99999-9999" /></label>
          </div>
        </section>

        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-bold text-nova-navy">2. Endereço de entrega</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-6">
            <label className="text-sm font-medium sm:col-span-2">CEP<input className={campo} value={f.cep} onChange={set("cep")} /></label>
            <label className="text-sm font-medium sm:col-span-3">Rua<input className={campo} value={f.rua} onChange={set("rua")} /></label>
            <label className="text-sm font-medium">Nº<input className={campo} value={f.numero} onChange={set("numero")} /></label>
            <label className="text-sm font-medium sm:col-span-4">Cidade<input className={campo} value={f.cidade} onChange={set("cidade")} /></label>
            <label className="text-sm font-medium sm:col-span-2">UF<input maxLength={2} className={campo} value={f.uf} onChange={(e) => setF({ ...f, uf: e.target.value.toUpperCase() })} /></label>
          </div>
        </section>

        <section className="rounded-xl bg-white p-5 shadow-sm">
          <h2 className="font-bold text-nova-navy">3. Pagamento</h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {[["pix", "Pix", "5% de desconto"], ["cartao", "Cartão de crédito", "10x sem juros"], ["boleto", "Boleto", "Vence em 3 dias"]].map(([v, t, s]) => (
              <label key={v} className={`cursor-pointer rounded-lg border-2 p-3 text-sm ${pagamento === v ? "border-nova-sky bg-sky-50" : "border-slate-200"}`}>
                <input type="radio" name="pg" className="mr-2" checked={pagamento === v} onChange={() => setPagamento(v)} />
                <strong>{t}</strong><br /><span className="text-xs text-slate-500">{s}</span>
              </label>
            ))}
          </div>
          {pagamento === "cartao" && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-medium sm:col-span-2">Número do cartão (fictício)<input className={campo} placeholder="0000 0000 0000 0000" /></label>
              <label className="text-sm font-medium">Validade<input className={campo} placeholder="MM/AA" /></label>
              <label className="text-sm font-medium">CVV<input className={campo} placeholder="123" /></label>
            </div>
          )}
        </section>
      </div>

      <aside className="h-fit rounded-xl bg-white p-5 shadow-sm lg:mt-12">
        <h2 className="font-bold text-nova-navy">Resumo do pedido</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {linhas.map(({ produto, qtd }) => (
            <li key={produto.slug} className="flex justify-between gap-2"><span className="truncate">{qtd}x {produto.nome}</span><span>{brl(produto.preco * qtd)}</span></li>
          ))}
        </ul>
        <div className="mt-4 flex gap-2">
          <input value={cupom} onChange={(e) => setCupom(e.target.value)} placeholder="Cupom" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm uppercase" />
          <button type="button" onClick={aplicarCupom} className="rounded-lg bg-nova-navy px-3 text-sm font-bold text-white">Aplicar</button>
        </div>
        {cupomOk && <p className="mt-1 text-xs text-emerald-600">Cupom {CUPOM} aplicado: -10%</p>}
        <dl className="mt-4 space-y-1 border-t pt-3 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{brl(subtotal)}</dd></div>
          {cupomOk && <div className="flex justify-between text-emerald-600"><dt>Cupom</dt><dd>-{brl(descCupom)}</dd></div>}
          {descPix > 0 && <div className="flex justify-between text-emerald-600"><dt>Desconto Pix</dt><dd>-{brl(descPix)}</dd></div>}
          <div className="flex justify-between"><dt>Frete</dt><dd>{frete === 0 ? "Grátis" : brl(frete)}</dd></div>
          <div className="flex justify-between pt-2 text-lg font-extrabold text-nova-navy"><dt>Total</dt><dd>{brl(total)}</dd></div>
        </dl>
        {erro && <p role="alert" className="mt-3 text-sm font-medium text-red-600">{erro}</p>}
        <button className="mt-4 w-full rounded-lg bg-nova-sky py-3 font-extrabold text-nova-navy hover:brightness-110">Confirmar pedido</button>
        <p className="mt-2 text-center text-xs text-slate-400">🔒 Simulação, sem cobrança real</p>
      </aside>
    </form>
  );
}
