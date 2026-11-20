export const metadata = { title: "Sobre | TechNova" };

export default function Sobre() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-extrabold text-nova-navy">Sobre a TechNova</h1>
      <p><strong>Tecnologia acessível e prática para o seu dia a dia.</strong> A TechNova é uma loja virtual de acessórios e produtos de tecnologia, com variedade, praticidade e preços acessíveis.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {[["🎯", "Missão", "Facilitar o acesso à tecnologia com preço justo e compra simples."], ["👀", "Visão", "Ser a loja de tecnologia preferida dos jovens brasileiros."], ["💙", "Valores", "Transparência, praticidade e bom custo-benefício."]].map(([i, t, d]) => (
          <div key={t} className="rounded-xl bg-white p-5 shadow-sm"><p className="text-3xl">{i}</p><h2 className="mt-1 font-bold text-nova-navy">{t}</h2><p className="mt-1 text-sm">{d}</p></div>
        ))}
      </div>
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="font-bold text-nova-navy">Para quem vendemos</h2>
        <p className="mt-1 text-sm">Pensamos em jovens de 18 a 30 anos, como o Lucas Martins: estudantes e jovens profissionais conectados, que pesquisam preços e avaliações antes de comprar e querem segurança e custo-benefício.</p>
      </div>
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="font-bold text-nova-navy">Projeto acadêmico</h2>
        <p className="mt-1 text-sm">Esta loja foi desenvolvida por Ricardo Afonso, João Pavanete, Thomas, Gabriel e Maria Eduarda na disciplina de Tecnologia da Informação em Administração, com apoio de IA generativa. Produtos e pedidos são fictícios.</p>
      </div>
    </div>
  );
}
