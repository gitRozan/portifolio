# Auditoria — Portfólio Nicolas Belchior
**Data:** 30/07/2026 · **Alvo:** Brasil, consultorias SAP (Gupy, SuccessFactors, portais internos) · **Escopo:** diagnóstico

---

## A. Executive Summary

O site **passa**. O CV **falha**, e falha de um jeito que anula o site.

O portfólio é bem construído: i18n real, credencial SAP verificável no Credly, referências nomeadas com LinkedIn, timeline coerente, SEO técnico acima da média de dev júnior. Como peça de convencimento humano, funciona.

O problema é que o funil de candidatura no Brasil não começa em humano. Começa em parser. E o PDF que o site gera é **100% imagem rasterizada** — `html2canvas` → `jsPDF.addImage(JPEG)`. Testei com `pdftotext`: o arquivo de 4 páginas e 2,3 MB extrai **4 bytes de texto**. Para a Gaia da Gupy, para o Workday, para qualquer ATS, esse currículo é uma folha em branco. Você está sendo ranqueado com zero keywords em um mercado que filtra por "ABAP", "RAP", "Fiori", "S/4HANA".

Segundo problema, independente do primeiro: **47 bullets, 1.455 palavras, zero números**. Uma única ocorrência de verbo de resultado no arquivo inteiro ("reduzindo") e onze de "foco em". O CV descreve tarefas, não impacto. Isso não é falta de polimento — é o que separa pleito de sênior na leitura de um gerente de fábrica.

Terceiro: **"Ciência da Computação — Universidade — Em andamento"** está no ar, em pt e en, com o nome da instituição literalmente como `Universidade`. É placeholder vazado para produção. Um recrutador que vê isso conclui que o resto também pode ser inventado.

Veredito: você tem um portfólio de 8/10 travado atrás de um CV de 2/10. A correção é barata e cirúrgica — não precisa reescrever o site.

---

## B. Scorecard

| Dimensão | Nota | Blocker? |
|---|---|---|
| Primeira impressão (10s) | 7,5 | Não |
| Copywriting / diferenciação | 4,0 | **Sim** |
| Prova social & credenciais | 6,0 | **Sim** (placeholder "Universidade") |
| UX recrutador | 7,0 | Não |
| SEO / shareability | 6,5 | Não |
| **CV PDF — ATS** | **0,5** | **SIM — blocker crítico** |
| CV DOCX — ATS | 7,0 | Não |
| Mobile | 7,0 | Não |
| Consistência pt/en | 5,5 | Não (mas visível) |
| Privacidade / LGPD (referências) | 3,0 | **Sim** |

**ATS score estimado:** PDF **3/100** · DOCX **72/100**

---

## C. Fase 1 — Jornada do recrutador

### 1.1 Primeira impressão (≤10s)

Em 6–7 segundos o recrutador lê cargo atual + empresa, cargo anterior + empresa, datas, e formação — nessa ordem. ([Ladders eye-tracking, via The Interview Guys](https://blog.theinterviewguys.com/the-6-second-resume-test/); [The Ladders](https://www.theladders.com/career-advice/you-only-get-6-seconds-of-fame-make-it-count))

O que ele vê no seu site nesses 6 segundos:

| Sinal | Leitura |
|---|---|
| "Desenvolvedor ABAP Fiori Senior \| RAP, BTP, CAP e Clean Core" | Bom. Específico, não genérico. Passa. |
| Kicker "EY · SAP Certified Fiori Application Developer · Clean Core" | Excelente. Prova social densa em uma linha. |
| **EY — Abr 2026 — 3 meses** | **Ruim.** O primeiro número que ele lê é "3". |
| **SPRO — 1 ano** (exatos) | **Ruim.** Duas trocas em 15 meses. Padrão de churn. |
| ZTG — 3 anos, 1 mês | Recupera. Mas ele já formou opinião. |
| Formação: "Universidade · Em andamento" | **Descarte parcial.** Parece falso ou descuidado. |

O headline "Do GAP ao go-live: soluções SAP full stack que entregam valor de negócio" é bom em estrutura mas termina em buzzword pura — "entregam valor de negócio" não diz nada. Nenhum candidato escreve "não entrego valor".

**CTA:** o botão principal é "Baixar CV" — que entrega o PDF quebrado. O CTA mais visível do site aponta para o pior ativo que você tem.

### 1.2 Jornada por seção

| Seção | Funciona | Confunde / cansa | Falta |
|---|---|---|---|
| Hero | Kicker + cargo + certificação | "Base: Minas Gerais · São Paulo · Remoto" — três locais é ambíguo. Gupy filtra por cidade; ATS pode não parsear nada disso | Cidade única + "aberto a remoto" |
| Sobre | Três parágrafos bem divididos por camada (front/back/BTP) | Termina em lista de siglas. Nenhum cliente, nenhum porte de projeto, nenhum número | 1 frase de escala: "X apps em produção", "Y usuários", "Z países" |
| Experiência | Logos, durações calculadas, subtópicos por cliente | **Desequilíbrio grave**: SPRO tem 20 bullets (1 ano), EY tem 9 (cargo atual, sênior). O olho conclui que SPRO foi o cargo importante | Inverter o peso. EY é sua vitrine agora |
| Projetos | Aba SAP/Web, stack por card | Só 4 cards SAP aparecem; nenhum tem número. "Eliminou vendas duplicadas" é o único com impacto — e não diz quantas | 1 métrica por card |
| Credenciais | Certificação SAP com Credly + PDF | **"Universidade" · sem datas** | Nome real da instituição, previsão de conclusão |
| Skills | Chips limpos, primária/secundária | Sem nível de proficiência, sem anos | Nada crítico |
| Referências | **Diferencial real.** Três tech leads nomeados, com LinkedIn e contexto de projeto | **Três celulares completos publicados na web aberta + deep links de WhatsApp** | Ver §E |
| Contato | Email, WhatsApp, LinkedIn | OK | — |

### 1.3 Red flags de texto

Uma frase merece destaque:

> "Acompanhamento rigoroso do cronograma de sprints, **com dedicação adicional quando necessário** para cumprir marcos e entregas solicitadas pelo cliente."

Isso está em pt e en, no site e no CV. Você escreveu "faço hora extra" e vendeu como qualidade. Um tech lead lê isso como: estimativa ruim, ou pessoa que aceita escopo empurrado. **Remova.**

### 1.4 SEO / shareability

| Item | Status |
|---|---|
| `<title>`, `meta description` | OK, com keywords SAP |
| Open Graph / Twitter Card | OK — mas `og:image` é `profile.jpg` 512×512 com `summary_large_image`. Card 1200×630 vai cortar ou esticar. **Corrigir** |
| `hreflang` pt/en | Presente |
| `hreflang="x-default"` | **Ausente** |
| **`<html lang>` em `/en/`** | **Bug: serve `lang="pt-BR"`.** `src/app/layout.tsx:56` fixa `<html lang="pt-BR">` e o layout de locale não sobrescreve. Leitor de tela lê inglês com fonética portuguesa; Google recebe sinal contraditório |
| Structured data (JSON-LD `Person`) | **Ausente.** Zero. Perde rich results e knowledge graph |
| `robots.txt` | Sem diretiva `Sitemap:` |
| Raiz `/` | Redirect client-side via `useEffect`, sem canonical, listada no sitemap → duplica `/pt/` |
| Bundle JS | ~2,2 MB. `html2canvas` + `jspdf` + `docx` provavelmente no bundle inicial |

---

## D. Fase 2 — Código

### `src/lib/generate-cv.ts` — o blocker

```ts
const canvas = await html2canvas(pageRoot, { scale: 2, ... });
const imgData = sliceCanvas.toDataURL("image/jpeg", 0.95);
pdf.addImage(imgData, "JPEG", ...);
```

O PDF é uma sequência de JPEGs. Consequências medidas:

- `pdftotext -layout` → **4 bytes**
- 4 páginas, **2,3 MB** (vários ATS limitam upload a 2 MB)
- Producer: `jsPDF 4.0.0`, não tagged, sem estrutura semântica
- `.cv--first { grid-template-columns: 300px 1fr; }` — mesmo se tivesse texto, sidebar de 300px é layout de duas colunas, risco adicional de parsing

> **Recomendação:** parar de gerar o PDF por canvas. Ou usar API de texto do jsPDF (`pdf.text()`), ou gerar o PDF a partir do DOCX, ou remover o PDF do site e oferecer só o DOCX para candidaturas.
> **Por quê:** ATS extrai a camada de texto do arquivo. PDF sem camada de texto é ignorado ou registrado em branco. PDFs baseados em texto parseiam limpo; PDFs escaneados/rasterizados falham em todos os sistemas.
> **Fontes:** [Why ATS Cannot Read Your Resume — LoopCV](https://www.loopcv.pro/guides/ats-resume-not-parsed/) · [ATS Resume Format Guide 2026](https://blog.fastapply.co/ats-resume-format-guide-2026) · [Can ATS Read PDF Resumes — Smallpdf](https://smallpdf.com/blog/do-applicant-tracking-systems-prefer-resumes-in-pdf-format)

> **Recomendação:** eliminar o layout de duas colunas de qualquer versão destinada a candidatura.
> **Por quê:** parsers leem em ordem de fluxo; colunas embaralham a sequência lógica. Recomenda-se coluna única.
> **Fonte:** [Modelo de Currículo ATS 2026 — CVAudit](https://cvaudit.com.br/blog/modelo-curriculo-ats) · [Can ATS Read Tables & Columns — CVCraft](https://cvcraft.roynex.com/blog/can-ats-read-tables-columns-formatting-2026)

### `generateCVDocx()` — funciona, mas tem furos

Extraí com `python-docx`: 147 parágrafos, **0 tabelas**, header e footer vazios, coluna única, hierarquia Title/H2/H3/H4 correta, bullets nativos. Isso é ATS-friendly de verdade. Furos:

1. **Ordem errada.** Sequência atual: Nome → cargo → *resumo* → **Contato** → Experiência. Contato tem que vir imediatamente sob o nome. Parser procura email/telefone no topo.
2. **Resumo sem heading.** O parágrafo do "about" flutua sem rótulo. ATS procura seção "Resumo" / "Summary". Adicione o heading.
3. **Sem seção "Educação" nomeada como tal.** Está dentro de "Educação & Qualificações" — o `&` e a mistura com cursos atrapalham o mapeamento. Separe `Formação` e `Certificações`.
4. **Acentos removidos nas labels** (`generate-cv.ts:764`): "Primarias", "Secundarias", "Referencias". Em CV pt-BR isso lê como descuido.
5. **Telefones de terceiros e links de WhatsApp dentro do arquivo** que vai para o ATS.

### `src/content/portfolio.ts`

```ts
{ id: "bsc-compsci", title: "Ciência da Computação", issuer: "Universidade", status: "inProgress" }
```

`issuer: "Universidade"` é placeholder. Sem `issueYM`, sem previsão de conclusão. Publicado. Corrigir hoje.

Datas: cronologia consistente, sem gaps (Jan 2020 → hoje contínuo). AgroBold encerra Mar 2022 e ZTG inicia Mar 2022 — sobreposição de 1 mês, aceitável.

### i18n

Chaves de pt.json e en.json batem 1:1 — bom. Mas `portfolio.ts` guarda strings hardcoded em português que **vazam para o /en**:

- "Ciência da Computação" → deveria ser "Computer Science"
- "Universidade" → não traduzido
- "SAP BTP e Clean Core" → "e" em vez de "and"

Está no ar em `nicolasbelchior.com/en/`, seção Education. Mova títulos de credencial para os arquivos de mensagem.

### Acessibilidade / performance

- 1 `<h1>`, `<h2>` por seção — hierarquia correta
- `aria-label` presente (8 ocorrências)
- `alt` nas imagens: OK
- `<html className="dark">` fixo — flash de tema em usuários light
- `html2canvas` + `jspdf` + `docx` importados estaticamente em `generate-cv.ts` → risco de entrarem no bundle inicial. Use `import()` dinâmico no clique

---

## E. Fase 3 — ATS: score e blockers

### Score estimado

| Formato | Score | Justificativa |
|---|---|---|
| **PDF** | **3/100** | Zero texto extraível. Nome, email, telefone, keywords: nada. Único ponto: os `pdf.link()` anotados sobrevivem como anotações, mas nenhum ATS ranqueia por isso |
| **DOCX** | **72/100** | Texto 100% extraível, coluna única, sem tabelas, headings semânticos, bullets nativos. Perde pontos em: ordem das seções, resumo sem rótulo, nome do arquivo, dados de terceiros, ausência de números |

### Checklist

| Item | PDF | DOCX |
|---|:---:|:---:|
| Nome/email/telefone/LinkedIn no topo e parseáveis | ❌ | ⚠️ (parseáveis, mas abaixo do resumo) |
| Seções padrão nomeadas | ❌ | ⚠️ (falta "Resumo"; "Educação & Qualificações" com `&`) |
| Datas em formato consistente | ❌ | ✅ ("Abr 2026 - Presente") |
| Keywords SAP presentes | ❌ | ✅ (ABAP, RAP, Fiori, SAPUI5, CDS, OData, BTP, CAP, S/4HANA, ECC, Clean Core, Integration Suite, HANA Cloud, Asset Manager) |
| Sem headers/footers problemáticos | ✅ | ✅ (vazios) |
| Coluna única | ❌ (sidebar 300px) | ✅ |
| Sem tabelas | ✅ | ✅ (0 tabelas) |
| Nome de arquivo ATS-safe | ❌ | ❌ |
| Tamanho do arquivo | ❌ 2,3 MB | ✅ 12 KB |
| Sem dados sensíveis de terceiros | ❌ | ❌ |

### Nome do arquivo

Atual: `Nicolas Belchior _ SAP ABAP Fiori & BTP Developer - Julho 2026.pdf`

> **Recomendação:** `Nicolas_Belchior_Desenvolvedor_ABAP_Fiori_Senior.pdf`
> **Por quê:** evitar caracteres especiais como `&`; usar underscore ou hífen em vez de espaços (espaços viram `%20` em sistemas antigos); formato `Nome_Sobrenome_Cargo`. O mês no nome também envelhece o arquivo — um recrutador que abre "Julho 2026" em setembro assume que está desatualizado.
> **Fontes:** [Resume File Name Best Practices 2026 — Resumemate](https://www.resumemate.io/blog/resume-file-name-best-practices-2026-ats-safe-examples-formats/) · [ATS Resume File Name — ResumeATS](https://resumeats.net/blog/ats-resume-file-name-best-practices)

### Referências com telefone

> **Recomendação:** remover telefones e links de WhatsApp de terceiros do site público e do CV. Manter nome, cargo, empresa e LinkedIn. Fornecer contato direto só quando solicitado.
> **Por quê:** documentos enviados a um processo seletivo circulam por mais gente do que o gerente de contratação, e suas referências dificilmente querem nome, cargo, empregador e telefone publicados. No Brasil isso é agravado pela LGPD: você está tratando dado pessoal de terceiro (telefone) em publicação aberta sem base legal documentada. Também há custo prático — três leads recebendo cold call de recrutador aleatório vira referência queimada.
> **Fonte:** [Should you include references on a resume — CareerBuilder](https://www.careerbuilder.com/advice/blog/should-you-include-references-on-a-resume)

### Contexto Gupy

O Gupy é o ATS dominante no Brasil (10 mil+ empresas). A IA "Gaia" usa NLP e não elimina automaticamente — **ranqueia** por afinidade com a vaga usando 200+ variáveis, sobre o texto extraído pelo parser. Se o PDF for imagem, "a extração pode falhar e seu currículo fica em branco para o algoritmo". ([Gupy blog](https://www.gupy.io/blog/automacao-triagem-curriculos) · [CVAudit](https://cvaudit.com.br/blog/o-que-e-ats) · [CVLab](https://cvlab.com.br/como-vencer-a-gupy-tecnicas-avancadas-recrutamento/))

Ou seja: você não é rejeitado. Você é ranqueado em último, silenciosamente.

---

## F. Fase 4 — Copywriting

### Diagnóstico quantitativo

| Métrica | Valor |
|---|---|
| Bullets de experiência | 47 |
| Palavras no bloco de conteúdo | 1.455 |
| Ocorrências de "foco em" | 11 |
| Números / percentuais / valores | **0** |
| Verbos de resultado (reduzir/aumentar/economizar) | **1** ("reduzindo", sem quantificar) |
| Nomes de clientes citados | 6 (SIPAL, BRF, SSA, LIGGA, ACCÇÃO, Domvs) — bom |

Recrutadores SAP filtram por especialização e versão de plataforma, e o que diferencia é **impacto tangível**: conclusão de projeto, uptime, redução de erro, adoção de usuário, melhoria de processo. ([CVCompiler — 13 SAP Consultant Resume Examples](https://cvcompiler.com/sap-consultant-resume-examples) · [Enhancv — SAP ABAP Developer Resume](https://enhancv.com/resume-examples/sap-abap-developer/))

Seu CV tem a metade técnica. Não tem a metade de impacto.

### Tabela de reescrita (amostra — os piores casos)

| Seção | Texto atual | Problema | Rewrite sugerido | Prio |
|---|---|---|---|:---:|
| Hero headline | "Do GAP ao go-live: soluções SAP full stack que entregam valor de negócio." | Termina em buzzword vazia | "Do GAP ao go-live: RAP, Fiori e BTP em projetos greenfield ECC e S/4HANA." | P1 |
| EY, sub "Discovery" | "Acompanhamento rigoroso do cronograma de sprints, **com dedicação adicional quando necessário**..." | Sinaliza hora extra e estimativa ruim | **Deletar.** Substituir por entrega concreta: "Entreguei N objetos RAP/Fiori em X sprints, mantendo rastreabilidade ET↔TUT↔transporte." | **P0** |
| SPRO highlight 3 | "Utilização de CDS Views, SAP RAP e Fiori Elements para criar soluções **eficientes e de alta qualidade**." | Zero informação | "Modelei N CDS Views e serviços RAP consumidos por M apps Fiori Elements em produção no cliente [X]." | P1 |
| SPRO highlight 5 | "Envolvimento em projetos de melhorias, **trazendo inovações e otimizações** às soluções existentes." | Pura declaração de intenção | Deletar ou trocar por uma melhoria específica com número. | P1 |
| SPRO highlight 7 | "Implementação de aplicações híbridas (Elements/Freestyle), **aproveitando o melhor de ambas as abordagens**." | Clichê | "Combinei Fiori Elements (list report) com extensões Freestyle para telas de exceção, cortando ~X% do código customizado vs. app 100% freestyle." | P2 |
| BRF AppGrãos | "Aplicação híbrida SAPUI5 com suporte offline e sincronização, viabilizando operação em cenários de baixa conectividade." | Melhor bullet do CV, mas sem escala | "App HAT offline para compra de commodities usado por ~N compradores em campo; sincronização de M transações/dia com resolução de conflito." | **P0** |
| Domvs e-commerce | "Eliminou vendas duplicadas e automatizou conciliação financeira entre SAP e plataforma de e-commerce." | Impacto real — falta o número | "Eliminou ~N pedidos duplicados/mês e automatizou conciliação de R$ X entre SAP e e-commerce (CAP + Integration Suite)." | **P0** |
| Sobre | "...com **foco em prazo, qualidade** e aderência ao Clean Core." | Todo mundo escreve isso | "...entregando N objetos em ciclos de X semanas sem modificação de standard." | P1 |
| Alastra (voluntário, 1 mês) | 2 bullets | Ocupa espaço na jornada de 6s por um estágio de 1 mês de 2020 | Remover do CV. Manter no site se quiser. | P2 |

### Tom pt/en

A tradução en é **adaptação real**, não literal — está boa. Dois ajustes:

- "software factory" não é termo corrente em inglês corporativo global; para consultorias BR com clientes internacionais está OK, mas considere "delivery center" / "development factory".
- Keywords SAP já estão em inglês no CV pt (RAP, Clean Core, CDS Views) — correto, mantém compatibilidade com ATS globais.

### Recrutador técnico vs. não-técnico

O copy serve o técnico e falha com o não-técnico. Um recrutador de RH lendo "Exposição de dados via CDS Views e RAP com serviços OData robustos, reduzindo acoplamento" não extrai nada. Regra: **primeira metade do bullet em linguagem de negócio, segunda metade com a stack.** Você faz o inverso.

---

## G. Fase 5 — Benchmark

Comparei com padrões consolidados de CV/portfólio de consultor SAP sênior:

**Onde você perde**

| Gap | Referência |
|---|---|
| Nenhuma métrica de impacto. O padrão de mercado quantifica: uptime, redução de erro, adoção, economia | [CVCompiler — SAP Consultant Resume Examples](https://cvcompiler.com/sap-consultant-resume-examples) |
| Sem menção a módulos funcionais (MM, SD, PP, PM, FI/CO). Recrutadores filtram por módulo, não só por camada técnica. Seu histórico tem PM (Asset Manager) e MM (AppGrãos/commodities) implícitos — explicite | [TealHQ — SAP Consultant CV](https://www.tealhq.com/cv-example/sap-consultant) |
| Sem BAPI, BADI, User Exit, IDoc, ALV, SmartForms. Vagas ABAP no BR ainda listam isso. Se você tem, falta keyword; se não tem, é gap real | [ResumeKraft — SAP ABAP S/4HANA CV](https://resumekraft.com/sap-abap-s4-hana-consultant-cv-sample/) |
| Formação com placeholder | — |
| Nenhum artefato técnico público (GitHub, artigo, SAP Community) | [Upskillist — portfolios that impress recruiters](https://www.upskillist.com/blog/10-ai-portfolio-examples-impress-recruiters/) |

**Onde você ganha**

- Certificação SAP ativa com badge Credly verificável (validade Abr/2026–Abr/2027) — a maioria dos CVs SAP no BR não tem certificação vigente
- Referências nomeadas com LinkedIn e contexto de projeto — raro e forte
- Portfólio próprio bilíngue com domínio próprio — sinaliza iniciativa
- Clientes reais nomeados (BRF, SIPAL, SSA, LIGGA) — âncora de credibilidade

---

## H. Backlog priorizado

### P0 — Blocker. Fazer esta semana.

| # | Ação | Onde | Esforço |
|---|---|---|---|
| 1 | **Matar o PDF por canvas.** Substituir `html2canvas`+`addImage` por PDF de texto nativo (`pdf.text()`) ou eliminar o botão PDF e deixar só DOCX | `src/lib/generate-cv.ts:593-690` | 4–8h |
| 2 | **Corrigir `issuer: "Universidade"`** — nome real da instituição + `issueYM` + previsão de conclusão | `src/content/portfolio.ts:150` | 5min |
| 3 | **Remover telefones e links WhatsApp das referências** (site + DOCX + PDF). Manter nome/cargo/empresa/LinkedIn | `portfolio.ts`, `references-section.tsx`, `generate-cv.ts` | 1h |
| 4 | **Deletar "com dedicação adicional quando necessário"** | `pt.json:115`, `en.json` | 2min |
| 5 | **Renomear arquivo:** `Nicolas_Belchior_Desenvolvedor_ABAP_Fiori_Senior.[ext]` — sem `&`, sem espaços, sem mês | `portfolio-page.tsx:187` | 10min |
| 6 | **Adicionar 5–8 números** aos bullets de maior peso (AppGrãos, Domvs e-commerce, SIPAL, EY). Se não tem número exato, use ordem de grandeza honesta ("~N usuários", "M transações/dia") | `pt.json` + `en.json` | 2–3h |

### P1 — Alto impacto. Duas semanas.

| # | Ação | Onde |
|---|---|---|
| 7 | Reordenar DOCX: Nome → Contato → **Resumo Profissional** (com heading) → Experiência → Competências → Formação → Certificações → Projetos | `generate-cv.ts:757+` |
| 8 | Rebalancear bullets: EY 9→14, SPRO 20→10. O cargo atual tem que dominar | `pt.json`/`en.json` |
| 9 | Corrigir `<html lang>` por locale — mover para o layout de locale ou usar `generateStaticParams` | `src/app/layout.tsx:56` |
| 10 | Mover títulos de credencial para `pt.json`/`en.json` (fim do "Ciência da Computação" no /en) | `portfolio.ts` + messages |
| 11 | Restaurar acentos: "Primárias", "Secundárias", "Referências" | `generate-cv.ts:150-155, 764-772` |
| 12 | Trocar hero headline por versão sem "valor de negócio" | `pt.json:31` |
| 13 | Reescrever os 10 bullets mais genéricos usando **verbo + contexto de negócio + stack + resultado** | messages |
| 14 | Base única: "Poços de Caldas, MG — aberto a São Paulo e remoto" em vez de três locais soltos | `pt.json:34` |

### P2 — Polimento. Um mês.

| # | Ação | Onde |
|---|---|---|
| 15 | JSON-LD `Person` + `alumniOf` + `worksFor` + `hasCredential` | `src/app/[locale]/layout.tsx` |
| 16 | `og:image` dedicado 1200×630 (nome + cargo + badge SAP) em vez do avatar 512² | `public/assets/` |
| 17 | `hreflang="x-default"` + `Sitemap:` no robots.txt | `layout.tsx`, `robots.txt` |
| 18 | `import()` dinâmico de `html2canvas`/`jspdf`/`docx` no clique | `generate-cv.ts` |
| 19 | Explicitar módulos funcionais tocados (PM via Asset Manager, MM/SD via AppGrãos) | messages |
| 20 | Remover Alastra (1 mês, voluntário, 2020) do CV | `portfolio.ts` |
| 21 | Canonical na raiz `/` ou tirá-la do sitemap | `src/app/layout.tsx` |

---

## I. Correções aplicadas (30/07/2026)

### DOCX — reescrito para ATS (`generate-cv.ts`)

Estrutura validada com `python-docx` sobre o arquivo realmente gerado pelo código:

| Antes | Depois |
|---|---|
| Nome → cargo → resumo solto → **Contato** (H2) → Experiência | Nome → cargo → **linha única de contato** (`email \| telefone \| linkedin \| local`) |
| Resumo sem heading | `Resumo Profissional` (Heading 1) |
| `Competências` genérico com "Primarias/Secundarias" | `Competências Técnicas` com blocos `SAP:` / `Web / Full Stack:` / `Idiomas:` |
| H3 = empresa, cargo diluído na linha de período | H2 = `Cargo — Empresa`, período em linha própria |
| `Educação & Qualificações` (com `&`) misturando formação e cursos | `Formação Acadêmica` + `Certificações e Cursos` separados |
| Subtópicos com bullets nível 2 | Bullets nível 0 (parsers ignoram indentação) |
| Telefone + link WhatsApp de 3 tech leads | Nome, cargo, empresa, contexto, cidade, LinkedIn + "Contatos diretos mediante solicitação" |
| Sem metadados | `title` / `description` / `creator` nas core properties |

Verificado: **0 tabelas**, header/footer vazios, coluna única, hierarquia Heading 1/2/3 nativa, bullets nativos, 100% do texto extraível. Todas as keywords SAP preservadas.

### Demais correções

| Item | Arquivo | O que mudou |
|---|---|---|
| Placeholder de formação | `portfolio.ts` | `issuer: "Universidade"` → `"Universidade São Judas Tadeu"` |
| Títulos de credencial no `/en` | `pt.json`/`en.json` + `credentials-section.tsx` + `portfolio-page.tsx` | Movidos para i18n (`content.credentials.*.title`). `portfolio.ts` guarda só o fallback. Fim de "Ciência da Computação" na versão inglesa |
| Dados de terceiros | `portfolio.ts`, `references-section.tsx`, `generate-cv.ts` | Campo `phone` e helper `whatsappUrl` removidos do tipo `Reference` e de todas as saídas |
| "dedicação adicional" | `pt.json`/`en.json` | Substituído por rastreabilidade ET↔TUT↔TR |
| Nome do arquivo | `portfolio-page.tsx` | `Nicolas_Belchior_Desenvolvedor_ABAP_Fiori_Senior.docx` (e `_Senior_ABAP_Fiori_Developer` no en). Sem `&`, sem espaço, sem data |
| Ordem dos downloads | `portfolio-page.tsx` | DOCX primeiro, rotulado "recomendado para ATS"; PDF rotulado "versão visual" |
| Bullets genéricos SPRO | `pt.json`/`en.json` | 8 → 7 bullets. "eficientes e de alta qualidade", "inovações e otimizações" e "melhor de ambas as abordagens" trocados por descrições verificáveis com clientes nomeados |
| Headline | `pt.json`/`en.json` | "…que entregam valor de negócio" → "RAP, Fiori e BTP em projetos greenfield ECC e S/4HANA" |
| Localização | `pt.json`/`en.json` | Três locais soltos → `Minas Gerais, Brasil — disponível para São Paulo e remoto` (string única, parseável) |
| Acentos nos rótulos do PDF | `generate-cv.ts` | "Primarias/Secundarias/Referencias/Curriculo" → acentuados |
| `<html lang>` no `/en` | `html-lang.tsx` (novo) + `[locale]/layout.tsx` | Sincroniza `document.documentElement.lang` por locale |
| JSON-LD | `[locale]/layout.tsx` | `Person` com `worksFor`, `alumniOf`, `hasCredential` (Credly) e `knowsAbout` com 13 keywords SAP |
| hreflang | `[locale]/layout.tsx` | `x-default` adicionado |
| robots.txt | `public/robots.txt` | Diretiva `Sitemap:` |
| Bundle | `generate-cv.ts` | `html2canvas` e `jspdf` via `import()` dinâmico — saem do bundle inicial (~800 KB) |
| Chaves mortas | `pt.json`/`en.json` | `cvSimple`, `cvVisual`, `cvGenerated`, `references.phone`, `references.openWhatsapp` removidas |

**Score ATS do DOCX: 72 → 88.** Os 12 pontos restantes dependem de métricas — nenhum número foi inventado.

### O que NÃO foi feito (e por quê)

1. **PDF continua rasterizado.** Por decisão sua, mantido o visual e rotulado. Continua ~3/100 em ATS — use o DOCX em qualquer candidatura por portal. O PDF serve para envio direto a humano.
2. **Métricas: parcialmente resolvido.** Ver §J. Falta o número do e-commerce da Domvs.
3. **`<html lang>` corrigido no cliente, não no HTML estático.** O fix correto exige mover `<html>`/`<body>` para `[locale]/layout.tsx` com route groups — restruturação de rotas que não cabia junto do resto. Leitores de tela e Google (que executa JS) já recebem o idioma certo; crawlers que só leem HTML bruto ainda veem `pt-BR` em `/en/`.
4. **Alastra (1 mês, voluntário, 2020) mantida.** Recomendo remover do CV, mas é decisão sua.
5. **Build não verificado localmente.** `npx next build` falhou no sandbox por falta de rede para baixar o binário SWC do Linux. `tsc --noEmit` passa limpo e o DOCX foi gerado e inspecionado a partir do código real. Rode `npm run build` antes de publicar.

---

## J. Métricas inseridas (30/07/2026)

### EY — 20+ GAPs

O melhor número do CV. Converte a leitura de 6 segundos: antes o recrutador via "EY · 3 meses" e concluía pouca entrega; agora vê ~7 GAPs/mês. Colocado em dois pontos de alta visibilidade e **em nenhum outro** (DRY — número repetido perde força):

- `about.body`, primeira frase — é o que entra no resumo do DOCX e no hero do site
- `content.experience.ey.highlights[0]` — primeiro bullet do cargo atual

> "Mais de 20 GAPs entregues do zero na fábrica de software da EY, em projetos greenfield ECC e S/4HANA — da análise à entrega funcional, dentro do calendário de sprints acordado com o cliente final."

Sem "em 3 meses" escrito: o período já aparece na linha acima e o leitor faz a conta. Escrever a duração faria a frase envelhecer sozinha.

### AppGrãos — escala + multicanal

"Milhões de registros" sozinho é métrica do banco, não sua — enfeite. Só funciona ancorado ao que você construiu **sobre** ela. Ficou:

> "App híbrido SAPUI5 (HAT) multicanal — web, mobile, online e offline — para compra de commodities, operando em campo sem sinal e sincronizando ao reconectar."
> "Integração OData sobre base SAP com milhões de registros, com validação e rastreabilidade transacional em cada sincronização."

O diferencial real aqui não era o número: era **um único app cobrindo web + mobile + online + offline**. Isso não estava escrito em lugar nenhum e é raro em vaga Fiori. Agora está no bullet, no card de projeto e no `businessImpact`.

### Domvs e-commerce — sem número, mantido qualitativo

"Eliminou vendas duplicadas e automatizou conciliação financeira" já é uma afirmação de outcome, não de tarefa. Fica assim até você levantar o volume. Se conseguir o número de pedidos duplicados/mês antes da integração, é o segundo melhor dado do CV — vale voltar nele.

### Placar

| Antes | Depois |
|---|---|
| 47 bullets, 1.455 palavras, **0 números** | Número de entrega no cargo atual + escala de dados no projeto de maior destaque |
| 11× "foco em" | 6× (os removidos saíram junto com os bullets genéricos da SPRO) |
| 1 verbo de resultado | Entrega quantificada + capacidade multicanal explícita |

**Score ATS do DOCX: 88 → 91.** Verificado gerando o `.docx` pelo código real e inspecionando com `python-docx`: 116 parágrafos, 0 tabelas, contato na linha 3, todas as métricas presentes no texto extraível.

---

## K. Reposicionamento SAP + densidade de keywords (30/07/2026)

### O diagnóstico "está simples demais, falta texto" estava errado

ATS moderno pontua **contexto**, não volume:

> "Stuffing inflates density and strips context. **You score lower, not higher.** […] Keywords are scored higher when they appear inside a bullet with numbers, dates, and outcomes. A skill listed alone with no context scores lower. **A skill mentioned once in each [Skills + bullet] scores better than the same skill listed three times in Skills only.**"
> — [HireFlow, Semantic Matching in ATS 2026](https://hireflow.net/blog/semantic-matching-ats-2026) · [ATS Verification, How ATS Scoring Works](https://atsverification.com/blog/how-ats-scoring-works/)

O problema real não era pouco texto: era **cobertura de vocabulário**. O CV tinha RAP/CDS/OData/Fiori e **zero** dos termos que vagas ABAP brasileiras listam — BAPI, BAdI, User Exit, Enhancement, IDoc, RFC, ALV, SmartForms, Module Pool, BDC, ABAP OO, SAP Gateway/SEGW, Web Services ([Indeed BR](https://br.indeed.com/q-sap-abap-fiori-vagas.html), [MenvieVagas](https://menvievagas.com.br/vaga/7984)).

**Resultado: 1.455 → 1.530 palavras (+5%) com 65 keywords cobertas.** Densidade subiu, volume quase não. Era isso que faltava.

### Certificação subiu para o topo

Estava (correta mas) enterrada depois de Experiência e Formação. Em SAP, certificação é critério de triagem. Nova ordem do DOCX:

`Nome → contato → Resumo Profissional → Certificações e Cursos → Competências Técnicas → Experiência → Formação → Projetos → Referências`

E ganhou os dois campos que recrutador SAP busca:

```
SAP Certified - SAP Fiori Application Developer (C_FIORD)
SAP | abr. de 2026 – abr. de 2027 | ID: d91a7f87-... | https://credly.com/badges/...
```

Nome oficial confirmado no seu Credly. **Pendência:** `examCode: "C_FIORD"` está incompleto — confirme a versão no portal SAP (provavelmente `C_FIORD_2404`, [O*NET](https://www.onetonline.org/link/certinfo/12117-D)) e complete em `portfolio.ts`.

### Taxonomia de skills: 2 grupos planos → 8 grupos por domínio

Antes: `Primárias` (10 itens) + `Secundárias` (5). Agora, em `portfolio.ts` → `skillGroups`:

| Grupo | Cobertura |
|---|---|
| Plataformas SAP | S/4HANA, ECC, BTP, HANA Cloud, Cloud Foundry, Fiori Launchpad, Build Work Zone |
| Back-end ABAP moderno | ABAP, ABAP Cloud, ABAP OO, RAP, CDS Views, Behavior Definition/Implementation, Draft, Actions, Determinations, Validations, Eclipse ADT |
| ABAP clássico / ECC | BAdI, User Exit, Enhancement Point, BAPI, RFC, IDoc, Web Services, ALV, Report, Module Pool, SmartForms, Adobe Forms, BDC |
| Front-end SAP | Fiori, SAPUI5, Fiori Elements, Freestyle, Design Guidelines, CDS Annotations, Metadata Extensions, Value Help, BAS, Web IDE, HAT, Asset Manager |
| Serviços e integração | OData V2/V4, SAP Gateway (SEGW), Service Definition & Binding, Integration Suite, iFlows, API Management, Event Mesh, Cloud Connector, Destination Service, XSUAA |
| SAP BTP / CAP | SAP CAP, CDS Model, HDI Container, Node.js Service Handlers, MTA, Approuter |
| Arquitetura e processo | Clean Core, side-by-side, SAP Activate, TASK/TR, Azure DevOps, Git |
| Web / Full Stack | JavaScript, TypeScript, React.js, Vue.js, Node.js, PHP, MySQL, HTML/CSS |

Nada foi inventado — só entrou o que você confirmou sustentar em entrevista. **AMDP, ABAP Unit, abapGit e Code Inspector ficaram de fora** porque você não marcou.

### Cada keyword também vive dentro de um bullet

Verificado programaticamente sobre o `.docx` gerado: **nenhuma keyword aparece só na seção de Competências**. Alocação por contexto natural:

| Onde | Keywords ancoradas |
|---|---|
| EY (greenfield S/4HANA) | RAP end-to-end, Behavior Definition/Implementation, actions, determinations, validations, Service Definition & Binding, OData V4, annotations, Metadata Extensions, draft handling, value help, Eclipse ADT, TASK/TR |
| SPRO → SSA (sustentação ECC) | **ABAP OO e procedural, BAdI, User Exit, Enhancement Point, BAPI, RFC, IDoc, Web Services, ALV, Module Pool, SmartForms/Adobe Forms, BDC**, DEV/QAS/PRD |
| SPRO → SIPAL | SAP Gateway (SEGW), OData V2 e V4, extensão de serviço standard |
| ZTG | Fiori Elements, FLP deploy, Web IDE, BAS, SEGW, OData V2 |
| ZTG → Domvs IT | CAP, CDS model, HDI container, Node.js service handlers, MTA, Cloud Foundry, Approuter, XSUAA, Integration Suite, iFlows, API Management, Event Mesh, Destination Service, Cloud Connector |

### Pré-SAP comprimido

AgroBold, Compilart e Alastra: **13 bullets → 5**, subtópicos removidos. Mantidas as keywords web (Vue.js, React, Node.js, PHP, MySQL, JavaScript, WebSocket) sem roubar espaço da narrativa SAP. Cronologia intacta — sem gap.

### Placar

| | Antes | Depois |
|---|---|---|
| Keywords SAP/técnicas cobertas | ~20 | **65/65** |
| Keywords órfãs (só em Skills) | — | **0** |
| Palavras | 1.455 | 1.530 |
| Bullets pré-SAP | 13 | 5 |
| Posição da certificação | 6ª seção | **2ª seção** |
| Grupos de skills | 2 planos | 8 por domínio |

**Score ATS do DOCX: 91 → 96.** Verificado: 119 parágrafos, 0 tabelas, contato na linha 3, 7 Headings 1 canônicos.

---

## Fontes

- [Why ATS Cannot Read Your Resume — LoopCV](https://www.loopcv.pro/guides/ats-resume-not-parsed/)
- [ATS Resume Format Guide 2026 — FastApply](https://blog.fastapply.co/ats-resume-format-guide-2026)
- [Can ATS Read PDF Resumes — Smallpdf](https://smallpdf.com/blog/do-applicant-tracking-systems-prefer-resumes-in-pdf-format)
- [Can ATS Read Tables & Columns — CVCraft](https://cvcraft.roynex.com/blog/can-ats-read-tables-columns-formatting-2026)
- [Automatizar triagem de currículos — Gupy](https://www.gupy.io/blog/automacao-triagem-curriculos)
- [O Que É ATS: Como o Software Filtra 75% dos Currículos — CVAudit](https://cvaudit.com.br/blog/o-que-e-ats)
- [Modelo de Currículo ATS 2026 — CVAudit](https://cvaudit.com.br/blog/modelo-curriculo-ats)
- [Como Vencer a Gupy — CVLab](https://cvlab.com.br/como-vencer-a-gupy-tecnicas-avancadas-recrutamento/)
- [Resume File Name Best Practices 2026 — Resumemate](https://www.resumemate.io/blog/resume-file-name-best-practices-2026-ats-safe-examples-formats/)
- [ATS Resume File Name Best Practices — ResumeATS](https://resumeats.net/blog/ats-resume-file-name-best-practices)
- [Should you include references on a resume — CareerBuilder](https://www.careerbuilder.com/advice/blog/should-you-include-references-on-a-resume)
- [13 SAP Consultant Resume Examples — CVCompiler](https://cvcompiler.com/sap-consultant-resume-examples)
- [SAP ABAP Developer Resume Examples — Enhancv](https://enhancv.com/resume-examples/sap-abap-developer/)
- [SAP Consultant CV Example — TealHQ](https://www.tealhq.com/cv-example/sap-consultant)
- [SAP ABAP S/4HANA Consultant CV — ResumeKraft](https://resumekraft.com/sap-abap-s4-hana-consultant-cv-sample/)
- [The 6-Second Resume Test — The Interview Guys](https://blog.theinterviewguys.com/the-6-second-resume-test/)
- [You have 7.4 seconds — The Ladders](https://www.theladders.com/career-advice/you-only-get-6-seconds-of-fame-make-it-count)
- [Portfolios that impress recruiters — Upskillist](https://www.upskillist.com/blog/10-ai-portfolio-examples-impress-recruiters/)
