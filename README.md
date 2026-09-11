# Vault Prime — starter full-stack front-end

Projeto inicial em React + Vite + TypeScript, com estética dark premium / glass e arquitetura preparada para produtos digitais.

## O que já está incluído
- Home com hero dark, dourado e efeito glass.
- Login e criação de conta.
- Catálogo e páginas de produto.
- Carrinho inicial.
- Tipos de produto: download, APK, vídeo privado e URL externa.
- Painel administrativo inicial.
- Camada de pagamento desacoplada (`src/lib/payment.ts`) para conectar Mercado Pago, Stripe, Asaas ou outro gateway depois.
- Supabase Auth + banco + RLS preparados.
- URLs assinadas para arquivos e vídeos privados.
- Layout responsivo.

## Importante
Este ZIP é uma base funcional de interface e arquitetura. Para pagamentos reais, armazenamento privado e administração em produção, é necessário configurar Supabase e um backend/endpoint seguro do gateway. **Nunca coloque segredo de gateway no frontend.**

## Rodar
1. Instale Node.js 20+.
2. `npm install`
3. Copie `.env.example` para `.env` e preencha as variáveis Supabase.
4. `npm run dev`
5. Para produção: `npm run build`.

## Supabase
Execute `supabase/schema.sql` no SQL Editor. Crie os buckets privados `product-files` e `private-videos`.

Depois, promova manualmente sua conta para `admin` no banco (campo `profiles.role`). Não confie apenas em esconder o botão: as políticas RLS também protegem os dados.

## GitHub
Crie um repositório vazio, extraia o ZIP, coloque os arquivos dentro dele e faça commit/push. Depois conecte o repositório à hospedagem que você escolher.
