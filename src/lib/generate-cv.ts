import { Document as DocxDocument, Packer, Paragraph, HeadingLevel } from "docx";

export type CVData = {
  name: string;
  role: string;
  photoDataUrl?: string;
  photoAlt?: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  about: string;
  highlightsTitle?: string;
  highlights?: Array<{ label: string; value: string }>;
  experienceTitle: string;
  experienceSections: Array<{
    company: string;
    role: string;
    period: string;
    highlights: string[];
    subtopics?: Array<{
      title: string;
      items: string[];
    }>;
  }>;
  skillsTitle: string;
  skillsPrimary: string[];
  skillsSecondary: string[];
  languages: string[];
  projectsTitle: string;
  projectsSections: Array<{
    title: string;
    summary: string;
    stack: string[];
  }>;
  credentialsTitle: string;
  credentialsSections: Array<{
    title: string;
    issuer: string;
    period?: string;
    status?: string;
  }>;
  recommendationsTitle?: string;
  recommendationGroups?: Array<{
    title: string;
    people: Array<{
      name: string;
      phone?: string;
      email?: string;
    }>;
  }>;
};

export function generateCVHTML(data: CVData): string {
  const topSkills = data.skillsPrimary.slice(0, 8);

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.name} - Currículo</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --ink: #0f172a;
      --text: #334155;
      --muted: #64748b;
      --line: #e2e8f0;
      --surface: #ffffff;
      --sidebar: #f8fafc;
      --brand: #2563eb;
      --brand-ink: #1e40af;

      --radius: 12px;
      --space-1: 6px;
      --space-2: 10px;
      --space-3: 14px;
      --space-4: 18px;
      --space-5: 24px;

      --font-sans: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif;
      --font-display: "Space Grotesk", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    }

    * { box-sizing: border-box; }
    html, body { height: 100%; }
    body {
      margin: 0;
      background: var(--surface);
      color: var(--text);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
      line-height: 1.45;
    }

    a { color: inherit; text-decoration: none; }
    .meta-value a { color: var(--brand); text-decoration: underline; }

    .page {
      max-width: 960px;
      margin: 0 auto;
      padding: 32px 18px;
    }

    .cv {
      border: 1px solid var(--line);
      border-radius: var(--radius);
      overflow: hidden;
      background: var(--surface);
    }

    .cv--first {
      display: grid;
      grid-template-columns: 320px 1fr;
    }

    .cv--rest {
      margin-top: 16px;
    }

    .sidebar {
      background: var(--sidebar);
      padding: 26px 20px;
      border-right: 1px solid var(--line);
    }

    .avatar-wrap {
      display: flex;
      justify-content: center;
      padding-top: 4px;
    }

    .content {
      padding: 26px 24px;
      min-width: 0;
    }

    .content--full {
      padding: 26px 24px;
    }

    .header {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 18px;
      align-items: start;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--line);
      margin-bottom: 18px;
    }

    .name {
      font-family: var(--font-display);
      font-size: 30px;
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: var(--ink);
      margin: 0;
    }

    .role {
      margin-top: 8px;
      font-size: 13px;
      color: var(--muted);
      font-weight: 600;
    }

    .top-skills {
      margin-top: 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid rgba(37, 99, 235, 0.22);
      background: rgba(37, 99, 235, 0.06);
      color: var(--brand-ink);
      font-size: 11px;
      font-weight: 600;
      white-space: nowrap;
    }

    .avatar {
      width: 140px;
      height: 140px;
      border-radius: 8px;
      object-fit: cover;
      border: 1px solid var(--line);
      background: #fff;
    }

    .block + .block { margin-top: 18px; }

    .section-title {
      font-family: var(--font-display);
      font-size: 12px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--ink);
      margin: 0 0 10px;
    }

    .divider {
      height: 1px;
      background: var(--line);
      margin: 16px 0;
    }

    .meta-list {
      display: grid;
      gap: 10px;
      font-size: 12px;
      color: var(--text);
    }

    .meta-item {
      display: grid;
      gap: 2px;
    }

    .meta-label {
      font-size: 11px;
      color: var(--muted);
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .meta-value {
      font-weight: 600;
      color: var(--ink);
      overflow-wrap: anywhere;
    }

    .summary {
      font-size: 12.5px;
      color: var(--text);
      white-space: pre-line;
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .tag {
      font-size: 11px;
      font-weight: 600;
      color: var(--text);
      background: rgba(15, 23, 42, 0.04);
      border: 1px solid rgba(15, 23, 42, 0.08);
      padding: 4px 8px;
      border-radius: 999px;
      white-space: nowrap;
    }

    .edu-list {
      display: grid;
      gap: 10px;
    }

    .edu-item {
      display: grid;
      gap: 4px;
      padding: 10px 10px;
      border-radius: 10px;
      border: 1px solid rgba(15, 23, 42, 0.08);
      background: rgba(15, 23, 42, 0.03);
    }

    .edu-title {
      font-size: 12px;
      font-weight: 800;
      color: var(--ink);
      line-height: 1.2;
    }

    .edu-issuer {
      font-size: 11px;
      font-weight: 700;
      color: var(--text);
      overflow-wrap: anywhere;
    }

    .edu-meta {
      font-size: 11px;
      font-weight: 700;
      color: var(--muted);
    }

    .rec-group + .rec-group {
      margin-top: 12px;
    }

    .rec-group-title {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.03em;
      color: var(--ink);
      margin: 0 0 8px;
    }

    .rec-card {
      border-radius: 10px;
      padding: 10px 10px;
      border: 1px solid rgba(37, 99, 235, 0.22);
      background: rgba(37, 99, 235, 0.06);
    }

    .rec-card + .rec-card {
      margin-top: 10px;
    }

    .rec-name {
      font-size: 12px;
      font-weight: 800;
      color: var(--ink);
      margin: 0 0 6px;
    }

    .rec-line {
      font-size: 11px;
      font-weight: 600;
      color: var(--text);
      line-height: 1.35;
      overflow-wrap: anywhere;
    }

    .content-section { margin-top: 18px; }

    .item {
      padding: 12px 12px;
      border-radius: 12px;
      border: 1px solid rgba(226, 232, 240, 0.9);
      background: rgba(248, 250, 252, 0.55);
    }

    .item + .item { margin-top: 10px; }

    .item-head {
      display: grid;
      gap: 2px;
      margin-bottom: 8px;
    }

    .item-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--ink);
    }

    .item-subtitle {
      font-size: 12px;
      color: var(--text);
      font-weight: 600;
    }

    .item-meta {
      font-size: 11px;
      color: var(--muted);
      font-weight: 600;
    }

    ul.bullets {
      margin: 0;
      padding-left: 16px;
      display: grid;
      gap: 6px;
      color: var(--text);
      font-size: 12px;
    }

    .subtopic {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px dashed rgba(148, 163, 184, 0.5);
    }

    .subtopic-title {
      font-size: 11px;
      font-weight: 800;
      color: var(--ink);
      letter-spacing: 0.02em;
      margin: 0 0 8px;
    }

    .project-title { font-size: 13px; font-weight: 800; color: var(--ink); }
    .project-summary { font-size: 12px; color: var(--text); margin-top: 4px; }

    .stack {
      margin-top: 8px;
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .stack-tag {
      font-size: 10.5px;
      font-weight: 700;
      color: var(--brand-ink);
      background: rgba(37, 99, 235, 0.08);
      border: 1px solid rgba(37, 99, 235, 0.18);
      padding: 3px 8px;
      border-radius: 999px;
      white-space: nowrap;
    }

    @media print {
      @page {
        size: A4;
        margin: 14mm;
      }

      * {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      body {
        background: #ffffff;
      }

      .page {
        padding: 0;
        max-width: none;
      }

      .cv {
        border: 0;
        border-radius: 0;
      }

      .cv--first {
        break-after: page;
      }

      .cv--rest {
        margin-top: 0;
      }

      .cv--first .summary {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 8;
        overflow: hidden;
      }

      .item,
      .block,
      .content-section,
      .header {
        break-inside: avoid;
      }

      .rec-group,
      .rec-card {
        break-inside: avoid;
      }

      .edu-item {
        break-inside: avoid;
      }

      .item {
        background: rgba(248, 250, 252, 0.75);
      }

      .section-title {
        break-after: avoid;
      }

      ul.bullets {
        orphans: 3;
        widows: 3;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <section class="cv cv--first">
      <aside class="sidebar">
        <div class="avatar-wrap">
          ${data.photoDataUrl ? `<img class="avatar" src="${data.photoDataUrl}" alt="${data.photoAlt ?? ""}" />` : ""}
        </div>

        <div class="divider"></div>

        <div class="block">
          <h2 class="section-title">Contato</h2>
          <div class="meta-list">
            <div class="meta-item">
              <div class="meta-label">Email</div>
              <div class="meta-value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            <div class="meta-item">
              <div class="meta-label">Telefone</div>
              <div class="meta-value"><a href="tel:${data.phone}">${data.phone}</a></div>
            </div>
            <div class="meta-item">
              <div class="meta-label">Local</div>
              <div class="meta-value">${data.location}</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">LinkedIn</div>
              <div class="meta-value"><a href="${data.linkedin.startsWith("http") ? data.linkedin : `https://${data.linkedin}`}">${data.linkedin}</a></div>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="block">
          <h2 class="section-title">${data.skillsTitle}</h2>
          <div class="meta-item">
            <div class="meta-label">Primárias</div>
            <div class="tag-list">
              ${data.skillsPrimary.map((s) => `<span class="tag">${s}</span>`).join("")}
            </div>
          </div>
          <div style="height: 12px"></div>
          <div class="meta-item">
            <div class="meta-label">Secundárias</div>
            <div class="tag-list">
              ${data.skillsSecondary.map((s) => `<span class="tag">${s}</span>`).join("")}
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="block">
          <h2 class="section-title">Idiomas</h2>
          <div class="tag-list">
            ${data.languages.map((s) => `<span class="tag">${s}</span>`).join("")}
          </div>
        </div>

        ${
          data.credentialsSections && data.credentialsSections.length > 0
            ? `
        <div class="divider"></div>

        <div class="block">
          <h2 class="section-title">${data.credentialsTitle}</h2>
          <div class="edu-list">
            ${data.credentialsSections
              .slice(0, 3)
              .map(
                (cred) => `
            <div class="edu-item">
              <div class="edu-title">${cred.title}</div>
              <div class="edu-issuer">${cred.issuer}</div>
              ${cred.period || cred.status ? `<div class="edu-meta">${cred.period || ""}${cred.period && cred.status ? " • " : ""}${cred.status || ""}</div>` : ""}
            </div>
            `
              )
              .join("")}
          </div>
        </div>
        `
            : ""
        }
      </aside>

      <main class="content">
        <header class="header">
          <div>
            <h1 class="name">${data.name}</h1>
            <div class="role">${data.role}</div>
            <div class="top-skills">
              ${topSkills.map((s) => `<span class="chip">${s}</span>`).join("")}
            </div>
          </div>
          <div></div>
        </header>

        <section class="content-section">
          <h2 class="section-title">Sobre</h2>
          <div class="summary">${data.about}</div>
        </section>

        ${
          data.highlights && data.highlights.length > 0
            ? `
        <section class="content-section">
          <h2 class="section-title">${data.highlightsTitle ?? "Destaques"}</h2>
          ${data.highlights
            .slice(0, 4)
            .map(
              (x) => `
          <div class="meta-item" style="margin-top: 10px">
            <div class="meta-label">${x.label}</div>
            <div class="meta-value">${x.value}</div>
          </div>
          `
            )
            .join("")}
        </section>
        `
            : ""
        }

        ${
          data.recommendationGroups && data.recommendationGroups.length > 0
            ? `
        <section class="content-section">
          <h2 class="section-title">${data.recommendationsTitle ?? "Referências"}</h2>
          ${data.recommendationGroups
            .map(
              (g) => `
          <div class="rec-group">
            <div class="rec-group-title">${g.title}</div>
            ${g.people
              .map(
                (p) => `
            <div class="rec-card">
              <div class="rec-name">${p.name}</div>
              ${p.phone ? `<div class="rec-line">${p.phone}</div>` : ""}
              ${p.email ? `<div class="rec-line">${p.email}</div>` : ""}
            </div>
            `
              )
              .join("")}
          </div>
          `
            )
            .join("")}
        </section>
        `
            : ""
        }
      </main>
    </section>

    <section class="cv cv--rest">
      <main class="content content--full">
        <section class="content-section">
          <h2 class="section-title">${data.experienceTitle}</h2>
          ${data.experienceSections
            .map(
              (exp) => `
            <div class="item">
              <div class="item-head">
                <div class="item-title">${exp.company}</div>
                <div class="item-subtitle">${exp.role}</div>
                <div class="item-meta">${exp.period}</div>
              </div>
              <ul class="bullets">
                ${exp.highlights.map((h) => `<li>${h}</li>`).join("")}
              </ul>
              ${
                exp.subtopics
                  ? exp.subtopics
                      .map(
                        (sub) => `
                <div class="subtopic">
                  <div class="subtopic-title">${sub.title}</div>
                  <ul class="bullets">
                    ${sub.items.map((item) => `<li>${item}</li>`).join("")}
                  </ul>
                </div>
              `
                      )
                      .join("")
                  : ""
              }
            </div>
          `
            )
            .join("")}
        </section>

        <section class="content-section">
          <h2 class="section-title">${data.projectsTitle}</h2>
          ${data.projectsSections
            .map(
              (proj) => `
            <div class="item">
              <div class="project-title">${proj.title}</div>
              <div class="project-summary">${proj.summary}</div>
              <div class="stack">
                ${proj.stack.map((tech) => `<span class="stack-tag">${tech}</span>`).join("")}
              </div>
            </div>
          `
            )
            .join("")}
        </section>
      </main>
    </section>
  </div>
</body>
</html>`;
}

export async function getAssetAsDataUrl(path: string): Promise<string | null> {
  try {
    const res = await fetch(path);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : null);
      reader.onerror = () => reject(new Error("Failed to read blob"));
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function waitForImages(doc: Document): Promise<void> {
  const imgs = Array.from(doc.images ?? []);
  const pending = imgs
    .filter((img) => !img.complete)
    .map(
      (img) =>
        new Promise<void>((resolve) => {
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        })
    );
  return Promise.all(pending).then(() => undefined);
}

export async function downloadPDF(html: string, filename: string): Promise<void> {
  const safeName = filename.toLowerCase().endsWith(".pdf") ? filename : `${filename}.pdf`;

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-10000px";
  iframe.style.top = "0";
  iframe.style.width = "1024px";
  iframe.style.height = "768px";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  try {
    const doc = iframe.contentDocument;
    if (!doc) throw new Error("No iframe document");
    doc.open();
    doc.title = safeName.replace(/\.pdf$/i, "");
    doc.write(html);
    doc.close();

    await new Promise((r) => setTimeout(r, 50));
    await (doc.fonts?.ready ?? Promise.resolve());
    await waitForImages(doc);

    const win = iframe.contentWindow;
    if (!win) throw new Error("No iframe window");

    await new Promise<void>((resolve) => {
      let resolved = false;
      const done = () => {
        if (resolved) return;
        resolved = true;
        resolve();
      };

      win.addEventListener("afterprint", done, { once: true });
      win.focus();
      win.print();
      window.setTimeout(done, 5000);
    });
  } finally {
    document.body.removeChild(iframe);
  }
}

function docxP(
  text: string,
  heading?: (typeof HeadingLevel)[keyof typeof HeadingLevel]
): Paragraph {
  return new Paragraph(heading ? { text, heading } : { text });
}

export async function generateCVDocx(data: CVData): Promise<Blob> {
  const children: Paragraph[] = [
    docxP(data.name, HeadingLevel.TITLE),
    docxP(data.role),
    new Paragraph({ text: "" }),
    docxP(data.about),
    new Paragraph({ text: "" }),
    docxP("Contato", HeadingLevel.HEADING_2),
    docxP(`Email: ${data.email}`),
    docxP(`Telefone: ${data.phone}`),
    docxP(`Local: ${data.location}`),
    docxP(`LinkedIn: ${data.linkedin}`),
    new Paragraph({ text: "" }),
    docxP(data.experienceTitle, HeadingLevel.HEADING_2),
  ];

  for (const exp of data.experienceSections) {
    children.push(docxP(exp.company, HeadingLevel.HEADING_3));
    children.push(docxP(`${exp.role} | ${exp.period}`));
    for (const h of exp.highlights) {
      children.push(new Paragraph({ text: h, bullet: { level: 0 } }));
    }
    if (exp.subtopics?.length) {
      for (const sub of exp.subtopics) {
        children.push(docxP(sub.title, HeadingLevel.HEADING_4));
        for (const item of sub.items) {
          children.push(new Paragraph({ text: item, bullet: { level: 1 } }));
        }
      }
    }
    children.push(new Paragraph({ text: "" }));
  }

  children.push(docxP(data.skillsTitle, HeadingLevel.HEADING_2));
  children.push(docxP(`Primárias: ${data.skillsPrimary.join(", ")}`));
  children.push(docxP(`Secundárias: ${data.skillsSecondary.join(", ")}`));
  children.push(docxP(`Idiomas: ${data.languages.join(", ")}`));
  children.push(new Paragraph({ text: "" }));
  children.push(docxP(data.projectsTitle, HeadingLevel.HEADING_2));

  for (const proj of data.projectsSections) {
    children.push(docxP(proj.title, HeadingLevel.HEADING_3));
    children.push(docxP(proj.summary));
    children.push(docxP(proj.stack.join(", ")));
    children.push(new Paragraph({ text: "" }));
  }

  children.push(docxP(data.credentialsTitle, HeadingLevel.HEADING_2));
  for (const cred of data.credentialsSections) {
    children.push(docxP(cred.title, HeadingLevel.HEADING_3));
    children.push(docxP(`${cred.issuer}${cred.period ? ` | ${cred.period}` : ""}${cred.status ? ` | ${cred.status}` : ""}`));
  }

  if (data.recommendationGroups?.length) {
    children.push(new Paragraph({ text: "" }));
    children.push(docxP(data.recommendationsTitle ?? "Referências", HeadingLevel.HEADING_2));
    for (const g of data.recommendationGroups) {
      children.push(docxP(g.title, HeadingLevel.HEADING_3));
      for (const person of g.people) {
        children.push(docxP(person.name));
        if (person.phone) children.push(docxP(person.phone));
        if (person.email) children.push(docxP(person.email));
      }
    }
  }

  const doc = new DocxDocument({
    sections: [{ children }],
  });

  return Packer.toBlob(doc);
}
