export const CATEGORIAS = [
  { slug: "fones", nome: "Fones de ouvido", emoji: "🎧" },
  { slug: "teclados", nome: "Teclados", emoji: "⌨️" },
  { slug: "mouses", nome: "Mouses", emoji: "🖱️" },
  { slug: "cabos-carregadores", nome: "Cabos e carregadores", emoji: "🔌" },
  { slug: "suportes", nome: "Suportes", emoji: "📱" },
  { slug: "outros", nome: "Outros", emoji: "🔋" },
];

const p = (slug, nome, categoria, marca, preco, precoAntigo, emoji, rating, descricao, specs) => ({
  slug, nome, categoria, marca, preco, precoAntigo, emoji, rating, descricao, specs,
});

export const PRODUTOS = [
  p("fone-bluetooth-air-pro", "Fone Bluetooth Air Pro TWS", "fones", "NovaSound", 129.9, 189.9, "🎧", 4.7,
    "Fone sem fio com cancelamento de ruído, estojo de carregamento e até 24h de bateria no total.",
    ["Bluetooth 5.3", "Bateria: 6h + 18h no estojo", "Resistente a respingos IPX4", "Microfone com redução de ruído"]),
  p("headset-gamer-storm", "Headset Gamer Storm 7.1", "fones", "NovaGame", 219.9, 299.9, "🎮", 4.6,
    "Headset com som surround 7.1 virtual, almofadas macias e microfone retrátil.",
    ["Conexão USB", "Drivers de 50 mm", "Iluminação RGB", "Compatível com PC e PS5"]),
  p("fone-p2-basic", "Fone de Ouvido P2 com Microfone", "fones", "NovaSound", 29.9, null, "🎵", 4.2,
    "Fone intra-auricular com fio, ideal para o dia a dia e aulas online.",
    ["Plugue P2 3,5 mm", "Cabo de 1,2 m", "Controle de volume", "Acompanha 3 tamanhos de borracha"]),
  p("headphone-over-ear-comfort", "Headphone Over-Ear Comfort", "fones", "SoundMax", 159.9, 209.9, "🎧", 4.5,
    "Headphone dobrável com almofadas confortáveis para longas horas de uso.",
    ["Bluetooth ou cabo P2", "Bateria de 30h", "Dobrável", "Microfone embutido"]),

  p("teclado-mecanico-rgb", "Teclado Mecânico RGB Switch Blue", "teclados", "NovaGame", 249.9, 329.9, "⌨️", 4.8,
    "Teclado mecânico com iluminação RGB, ABNT2 e construção resistente.",
    ["Switch Blue", "Layout ABNT2", "Anti-ghosting", "Cabo USB destacável"]),
  p("teclado-sem-fio-slim", "Teclado Sem Fio Slim", "teclados", "TypeOne", 99.9, 129.9, "⌨️", 4.4,
    "Teclado compacto e silencioso, perfeito para estudo e home office.",
    ["Conexão 2.4 GHz", "Teclas silenciosas", "Duração de pilhas: até 12 meses", "Layout ABNT2"]),
  p("combo-teclado-mouse", "Combo Teclado e Mouse USB", "teclados", "TypeOne", 69.9, null, "💻", 4.1,
    "Kit básico com teclado e mouse com fio para uso diário.",
    ["Conexão USB", "Teclado ABNT2", "Mouse óptico 1000 DPI", "Plug and play"]),
  p("teclado-60-compacto", "Teclado 60% Compacto Hot-Swap", "teclados", "NovaGame", 329.9, 399.9, "⌨️", 4.7,
    "Teclado 60% com Bluetooth e USB-C, ideal para quem curte setup limpo.",
    ["Bluetooth 5.0 + USB-C", "Hot-swap", "RGB por tecla", "Bateria de 3000 mAh"]),

  p("mouse-gamer-pulse", "Mouse Gamer Pulse 12000 DPI", "mouses", "NovaGame", 89.9, 129.9, "🖱️", 4.6,
    "Mouse gamer com 6 botões programáveis e sensor de alta precisão.",
    ["Até 12000 DPI", "6 botões", "RGB", "Cabo trançado"]),
  p("mouse-sem-fio-silent", "Mouse Sem Fio Silent Click", "mouses", "TypeOne", 49.9, 69.9, "🖱️", 4.5,
    "Cliques silenciosos e receptor USB nano, ótimo para escritório e faculdade.",
    ["2.4 GHz", "1600 DPI", "Cliques silenciosos", "Pilha inclusa"]),
  p("mouse-ergonomico-vertical", "Mouse Ergonômico Vertical", "mouses", "SoundMax", 119.9, null, "🖱️", 4.3,
    "Formato vertical que reduz o cansaço do pulso em longas jornadas.",
    ["Bluetooth + 2.4 GHz", "Bateria recarregável", "DPI ajustável", "Ergonômico"]),
  p("mousepad-xl", "Mousepad Gamer XL 90x40 cm", "mouses", "NovaGame", 59.9, 79.9, "🟦", 4.7,
    "Mousepad extra grande com base antiderrapante e borda costurada.",
    ["Tamanho 90x40 cm", "Base de borracha", "Superfície speed", "Lavável"]),

  p("cabo-usbc-trancado-2m", "Cabo USB-C Trançado 2 m", "cabos-carregadores", "NovaCharge", 29.9, 39.9, "🔌", 4.6,
    "Cabo resistente com carregamento rápido e transferência de dados.",
    ["USB-C para USB-A", "2 metros", "Até 60 W", "Nylon trançado"]),
  p("carregador-turbo-25w", "Carregador de Parede Turbo 25 W", "cabos-carregadores", "NovaCharge", 59.9, 79.9, "⚡", 4.7,
    "Carregador compacto com tecnologia de carga rápida para celulares.",
    ["Saída USB-C 25 W", "Compacto", "Proteção contra superaquecimento", "Bivolt"]),
  p("carregador-veicular-duplo", "Carregador Veicular Duplo USB", "cabos-carregadores", "NovaCharge", 39.9, null, "🚗", 4.3,
    "Duas portas USB para carregar dois aparelhos ao mesmo tempo no carro.",
    ["2 portas USB", "Até 3.1 A", "LED indicador", "Proteção de curto-circuito"]),
  p("cabo-lightning-1m", "Cabo Lightning 1 m Certificado", "cabos-carregadores", "NovaCharge", 49.9, 64.9, "🔌", 4.4,
    "Cabo para iPhone com carregamento rápido e boa durabilidade.",
    ["Lightning para USB-C", "1 metro", "Carga rápida", "Reforço nas pontas"]),

  p("suporte-celular-mesa", "Suporte de Celular para Mesa Articulado", "suportes", "NovaStand", 34.9, 49.9, "📱", 4.5,
    "Suporte ajustável em altura e ângulo, serve para celulares e mini tablets.",
    ["Alumínio", "Ajustável", "Base antiderrapante", "Para telas de 4 a 10 polegadas"]),
  p("suporte-notebook-aluminio", "Suporte para Notebook em Alumínio", "suportes", "NovaStand", 89.9, 119.9, "💻", 4.6,
    "Eleva o notebook, melhora a postura e ajuda na ventilação.",
    ["Dobrável", "Até 17 polegadas", "Alumínio", "Altura regulável"]),
  p("suporte-veicular-magnetico", "Suporte Veicular Magnético", "suportes", "NovaStand", 24.9, null, "🧲", 4.2,
    "Fixação firme no painel ou na saída de ar, com ímãs fortes.",
    ["Ímã de neodímio", "Rotação 360°", "Compatível com MagSafe", "Instalação rápida"]),
  p("ring-light-26cm", "Ring Light 26 cm com Tripé", "suportes", "NovaStand", 79.9, 109.9, "💡", 4.4,
    "Ideal para lives, estudos e vídeos, com 3 temperaturas de cor.",
    ["Diâmetro 26 cm", "3 temperaturas de cor", "Tripé de 2 m", "Alimentação USB"]),

  p("power-bank-10000", "Power Bank 10.000 mAh", "outros", "NovaCharge", 99.9, 139.9, "🔋", 4.7,
    "Bateria portátil com 2 saídas e display de carga.",
    ["10.000 mAh", "Saída USB-C 22,5 W", "Display digital", "Slim"]),
  p("webcam-full-hd", "Webcam Full HD 1080p", "outros", "TypeOne", 119.9, 159.9, "📷", 4.5,
    "Webcam com microfone embutido para aulas, reuniões e streams.",
    ["1920x1080 30 fps", "Microfone embutido", "Plug and play", "Tampa de privacidade"]),
  p("hub-usbc-6em1", "Hub USB-C 6 em 1", "outros", "NovaCharge", 149.9, 199.9, "🔗", 4.6,
    "Expanda as portas do notebook com HDMI, USB 3.0 e leitor de cartão.",
    ["HDMI 4K", "2x USB 3.0", "Leitor SD/microSD", "Entrega de energia 100 W"]),
  p("caixa-som-bluetooth", "Caixa de Som Bluetooth à Prova d'água", "outros", "SoundMax", 139.9, 179.9, "🔊", 4.8,
    "Som potente e graves marcantes, resistente a água e poeira.",
    ["Bluetooth 5.3", "IPX7", "Bateria de 12h", "Potência de 20 W"]),
];

export const getProduto = (slug) => PRODUTOS.find((x) => x.slug === slug);
export const getCategoria = (slug) => CATEGORIAS.find((c) => c.slug === slug);
export const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const pix = (v) => Math.round(v * 0.95 * 100) / 100; // 5% de desconto no Pix
export const parcela = (v) => brl(v / 10); // 10x sem juros
export const FRETE_GRATIS = 199;
export const FRETE_FIXO = 19.9;
export const CUPOM = "BEMVINDO10";
