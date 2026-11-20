import Link from "next/link";
import Logo from "./Logo";
import { CATEGORIAS } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="mt-16 bg-nova-navy text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <Logo className="text-xl" />
          <p className="mt-3 text-sm">Tecnologia acessível e prática para o seu dia a dia.</p>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-white">Categorias</h4>
          <ul className="space-y-1 text-sm">
            {CATEGORIAS.map((c) => (
              <li key={c.slug}><Link className="hover:text-nova-sky" href={`/catalogo?categoria=${c.slug}`}>{c.nome}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-white">Institucional</h4>
          <ul className="space-y-1 text-sm">
            <li><Link className="hover:text-nova-sky" href="/sobre">Sobre a TechNova</Link></li>
            <li><Link className="hover:text-nova-sky" href="/contato">Fale conosco</Link></li>
            <li><Link className="hover:text-nova-sky" href="/contato">Trocas e devoluções</Link></li>
            <li><Link className="hover:text-nova-sky" href="/admin">Painel Admin (CRM)</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-white">Pagamento</h4>
          <p className="text-sm">Pix · Cartão de crédito · Boleto</p>
          <p className="mt-2 text-sm">🔒 Compra 100% segura</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-400">
        TechNova Comércio de Eletrônicos · Projeto acadêmico, loja fictícia, sem vendas reais.
      </div>
    </footer>
  );
}
