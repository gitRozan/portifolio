# Project Context & AI Memory

## Visao Geral do Projeto
Portfolio pessoal de Nicolas Belchior — consultor SAP Full Stack. Site Next.js com i18n (pt/en), geracao de CV (PDF/DOCX) e secoes de experiencia, projetos, skills e credenciais.

## Arquitetura e Stack Tecnica
* **Frontend:** Next.js, React, Tailwind CSS, next-intl
* **Conteudo:** `src/content/portfolio.ts` (dados estruturados) + `src/messages/{pt,en}.json` (textos)
* **CV:** `src/lib/generate-cv.ts` (PDF/DOCX a partir dos dados do portfolio)
* **Assets:** logos em `public/assets/logos/`

## Regras de Negocio & Premissas Criticas
* Experiencias ordenadas por `startYM` decrescente em `portfolio.ts`
* Textos de role, periodo, highlights e subtopics ficam nos JSONs de mensagens (`content.experience.{id}`)
* Datas de inicio usam formato `YYYY-MM` em `portfolio.ts`; fim fica no JSON traduzido

## Estado Atual & Ultimas Alteracoes
* **2026-07-30:** Referencias Maylon (BRF AppGrãos/AMS Freestyle) e Mauricio (fabrica RAP/CDS/Fiori) com contexto distinto no site e CV.
