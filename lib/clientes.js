export const CHAVE = "technova_clientes";

export const CLIENTES_INICIAIS = [
  { id: 1, nome: "Lucas Martins", email: "lucas.martins@email.com", data: "02/11/2026", status: "Ativo" },
  { id: 2, nome: "Ana Beatriz Souza", email: "ana.souza@email.com", data: "05/11/2026", status: "Ativo" },
  { id: 3, nome: "Pedro Henrique Lima", email: "pedro.lima@email.com", data: "08/11/2026", status: "Inativo" },
  { id: 4, nome: "Camila Rocha", email: "camila.rocha@email.com", data: "12/11/2026", status: "Ativo" },
  { id: 5, nome: "Rafael Gomes", email: "rafael.gomes@email.com", data: "15/11/2026", status: "Inativo" },
];

export function carregarClientes() {
  try {
    const raw = localStorage.getItem(CHAVE);
    if (raw) return JSON.parse(raw);
  } catch {}
  return CLIENTES_INICIAIS;
}

export function salvarClientes(lista) {
  try { localStorage.setItem(CHAVE, JSON.stringify(lista)); } catch {}
}

/** Usado pelo checkout: cadastra o comprador no CRM (se ainda não existir). */
export function adicionarCliente(nome, email) {
  const lista = carregarClientes();
  const m = email.trim().toLowerCase();
  if (lista.some((c) => c.email.toLowerCase() === m)) return lista;
  const novo = { id: Date.now(), nome: nome.trim(), email: m, data: new Date().toLocaleDateString("pt-BR"), status: "Ativo" };
  const nova = [novo, ...lista];
  salvarClientes(nova);
  return nova;
}
