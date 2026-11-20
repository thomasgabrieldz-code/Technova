# TechNova — pronto para GitHub + Cloudflare Pages

Loja demonstrativa Next.js 15 / React 19. Catálogo e carrinho públicos; cadastro real via Firebase Authentication depois de uma configuração rápida. **Pagamentos e e-mails de marketing continuam sendo simulações.**

## 1. Ativar cadastro e login (obrigatório para contas reais)
1. Acesse https://console.firebase.google.com/ e crie um projeto Firebase (plano Spark, se disponível).
2. Em **Build > Authentication > Sign-in method**, habilite **E-mail/Senha**.
3. Em **Configurações do projeto > Geral**, crie um aplicativo **Web** (ícone </>) caso não exista; copie a `apiKey` de `firebaseConfig`.
4. Abra `public/firebase-config.json` e substitua `COLE_AQUI_A_CHAVE_WEB_API_DO_FIREBASE` pelo valor `apiKey` fornecido pelo Firebase. Não precisa adicionar senhas nem chaves privadas. Esta é uma chave pública de configuração.
5. Faça commit do arquivo no repositório GitHub. A página `/conta` passará a permitir cadastro, login, saída e recuperação de senha. As sessões são restauradas quando o visitante reabre o site.
6. Opcional: para habilitar a página `/admin` na interface, faça login, veja o UID do usuário no painel **Authentication > Users** do Firebase e coloque-o em `adminUid` no mesmo JSON. **Isso é apenas restrição da interface; não constitui segurança de backend.** O CRM continua sendo uma DEMONSTRAÇÃO local (`localStorage`) e NÃO armazena dados de clientes em servidor.

## 2. GitHub
1. Crie um repositório novo no GitHub.
2. Envie o **conteúdo de dentro da pasta `technova/`** para a raiz do repositório (de modo que `package.json` fique na raiz).
3. Não envie `node_modules`, nem `.next` ou `out`.

## 3. Cloudflare Pages (via GitHub)
1. Cloudflare Dashboard > **Workers & Pages** > **Create** > **Pages** > **Connect to Git**.
2. Escolha o repositório TechNova.
3. Framework: **Next.js (Static HTML Export)** (ou preset Custom, se necessário).
4. Build command: `npm run build`.
5. Build output directory: `out`.
6. Root directory: `/` (vazio, se os arquivos estão na raiz); Node.js 22 recomendado.
7. Deploy. A pasta `out` é gerada automaticamente pelo Next.js. `output: "export"` já está habilitado em `next.config.mjs`.

## Observações importantes
- A vitrine é pública: visitantes não precisam de login para ver os produtos e navegar no carrinho.
- Os usuários são cadastrados pelo **Firebase Authentication**, não por `localStorage`. Dados de sessão ficam no navegador e são renovados por tokens Firebase.
- **Não é uma loja de pagamento real.** Não insira informações de cartão de clientes. O checkout atual é demonstrativo.
- O CRM em `/admin` é demonstrativo e fica no navegador; a checagem de UID no frontend não impede manipulação técnica por usuários maliciosos, portanto NÃO use para informações sensíveis ou funções administrativas reais. Para um CRM de produção é necessário backend, regras de autorização e banco de dados seguros.
- Caso faça mudanças no Firebase e não apareçam no Cloudflare, aguarde o novo deploy após o commit.

## Desenvolvimento local
`npm install` e `npm run dev`.
