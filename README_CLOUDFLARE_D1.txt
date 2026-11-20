TECHNOVA — AUTENTICAÇÃO SEM FIREBASE (CLOUDFLARE WORKERS + D1)

IMPORTANTE: Para este modelo, é necessário criar UM banco D1 para a TechNova.
Não use o D1 do Kimetsu. R2 NÃO é necessário.

1. Cloudflare > Storage & databases > D1 SQL database > Create database
   Nome: technova-db
2. Copie o Database ID (UUID) e cole no arquivo wrangler.jsonc, no campo database_id.
   Envie a alteração ao GitHub (Commit changes).
3. Crie as tabelas: Cloudflare > D1 > technova-db > Console
   Abra migrations/0001_accounts.sql no GitHub, copie TODO o conteúdo SQL e execute no Console.
   Alternativa via CLI: npx wrangler d1 migrations apply technova-db --remote
4. Cloudflare > Workers & Pages > technova > Settings > Build:
   Build command: npm run build
   Deploy command: npx wrangler deploy
   Root: /
5. Faça deploy. Confira https://SEU-ENDERECO.workers.dev/api/health (deve responder ok:true).
6. Abra /conta e crie uma conta com senha de PELO MENOS 10 caracteres.
7. Para liberar o painel demo /admin, configure a variável ADMIN_EMAIL no wrangler.jsonc
   com o seu endereço de e-mail, faça commit e redeploy.

O site continua público: produtos, carrinho e checkout demo não exigem login.
As contas Firebase antigas não são migradas automaticamente. Cadastre-as novamente no D1.
Senha de usuário: hash PBKDF2 com salt individual. Sessão: cookie HttpOnly, Secure e SameSite=Lax.

AVISOS: A recuperação de senha por e-mail não foi implementada; o botão informa isso.
O CRM é DEMONSTRATIVO e os clientes que ele gerencia são salvos somente no navegador.
O checkout não efetua cobrança real; falta sistema de pedidos/pagamentos para loja comercial.
