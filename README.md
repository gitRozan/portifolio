# Portfólio — Nicolas Belchior

Portfólio mobile-first construído com Next.js (App Router), Tailwind CSS, i18n (next-intl) e dark mode (next-themes).

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- next-intl (i18n)
- next-themes (dark mode)
- framer-motion

## Rodando localmente

Instale as dependências e rode o servidor:

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## i18n / rotas

- `/` redireciona para `/pt` ou `/en` usando `navigator.language`
- A página principal fica em `src/app/[locale]`
- As mensagens ficam em `src/messages`

## CV (opcional)

Se você quiser habilitar os downloads do portfólio, coloque os PDFs em:

- `public/assets/cv/Profile.pdf`
- `public/assets/cv/Nicolas_Belchior_Visual.pdf`

## README do perfil do GitHub

O template que você vai usar no repositório especial do perfil (`gitRozan/gitRozan`) está em `github-profile/README.md`.
