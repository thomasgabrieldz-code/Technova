# TechNova — Workers + D1

Autenticação real, sem Firebase, usando o mesmo tipo de infraestrutura do Kimetsu System. Leia `README_CLOUDFLARE_D1.txt` para configurar o D1 e publicar no Cloudflare Workers.


## Ícone e identidade visual TechNova

O novo favicon foi adicionado em `public/favicon.ico`, `public/favicon-32.png`, `public/favicon-192.png` e `public/apple-touch-icon.png`. O layout Next.js declara explicitamente os ícones em `app/layout.jsx`, e o cabeçalho usa a marca nova em `components/Logo.jsx`.

A arte completa também está em `public/technova-identidade-visual.jpg` para uso futuro.

Após publicar, se o navegador mostrar o ícone antigo, faça um recarregamento sem cache (Ctrl+Shift+R), ou abra o site em aba anônima.

ATENÇÃO: A criação de contas só funcionará depois que você criar `technova-db`, colocar o UUID real em `wrangler.jsonc`, executar `migrations/0001_accounts.sql` e republicar. Não substitua por D1 do Kimetsu.
