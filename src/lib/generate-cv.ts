import { Document as DocxDocument, Packer, Paragraph, HeadingLevel } from "docx";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export type CVLocale = "pt" | "en";

export type CVCredentialSection = {
  title: string;
  issuer: string;
  period?: string;
  status?: string;
  credlyUrl?: string;
  kind?: string;
  badgeDataUrl?: string;
};

export type CVData = {
  locale: CVLocale;
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
  credentialsSections: CVCredentialSection[];
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

function groupCredentials(creds: CVCredentialSection[], locale: CVLocale) {
  const labels =
    locale === "pt"
      ? { certification: "Certificações", higherEducation: "Formação", course: "Cursos", badge: "Badges" }
      : { certification: "Certifications", higherEducation: "Education", course: "Courses", badge: "Badges" };

  const order = ["certification", "higherEducation", "course", "badge"] as const;
  const groups: Array<{ label: string; items: CVCredentialSection[] }> = [];

  for (const kind of order) {
    const items = creds.filter((c) => c.kind === kind);
    if (items.length > 0) {
      groups.push({ label: labels[kind] ?? kind, items });
    }
  }

  const uncategorized = creds.filter((c) => !c.kind || !order.includes(c.kind as (typeof order)[number]));
  if (uncategorized.length > 0) {
    groups.push({ label: locale === "pt" ? "Outros" : "Other", items: uncategorized });
  }

  return groups;
}

export function generateCVHTML(data: CVData): string {
  const topSkills = data.skillsPrimary.slice(0, 8);
  const credGroups = groupCredentials(data.credentialsSections, data.locale);
  const strings =
    data.locale === "pt"
      ? {
          lang: "pt-BR",
          docTitle: "Curriculo",
          contact: "Contato",
          email: "Email",
          phone: "Telefone",
          location: "Local",
          linkedin: "LinkedIn",
          primary: "Primarias",
          secondary: "Secundarias",
          languages: "Idiomas",
          about: "Sobre",
          highlights: "Destaques",
          references: "Referencias",
          verifyCredly: "Verificar no Credly",
        }
      : {
          lang: "en",
          docTitle: "CV",
          contact: "Contact",
          email: "Email",
          phone: "Phone",
          location: "Location",
          linkedin: "LinkedIn",
          primary: "Primary",
          secondary: "Secondary",
          languages: "Languages",
          about: "About",
          highlights: "Highlights",
          references: "References",
          verifyCredly: "Verify on Credly",
        };

  return `<!DOCTYPE html>
<html lang="${strings.lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.name} - ${strings.docTitle}</title>
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
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; }
    body {
      background: var(--surface);
      color: var(--text);
      font-family: var(--font-sans);
      -webkit-font-smoothing: antialiased;
      line-height: 1.45;
      font-size: 13px;
    }

    a { color: inherit; text-decoration: none; }
    .link { color: var(--brand); text-decoration: underline; }

    .page { max-width: 960px; margin: 0 auto; padding: 24px 16px; }

    .cv {
      border: 1px solid var(--line);
      border-radius: var(--radius);
      overflow: hidden;
      background: var(--surface);
    }
    .cv--first { display: grid; grid-template-columns: 300px 1fr; }
    .cv--rest { margin-top: 16px; }

    .sidebar {
      background: var(--sidebar);
      padding: 24px 18px;
      border-right: 1px solid var(--line);
      overflow: hidden;
      min-width: 0;
    }

    .avatar-wrap { display: flex; justify-content: center; }
    .avatar {
      width: 100%;
      aspect-ratio: 4 / 5;
      border-radius: 8px;
      border: 1px solid rgba(226, 232, 240, 0.7);
      background-size: cover;
      background-position: center top;
      background-repeat: no-repeat;
    }

    .content { padding: 24px 22px; min-width: 0; overflow: hidden; }
    .content--full { padding: 24px 22px; overflow: hidden; }

    .header {
      padding-bottom: 16px;
      border-bottom: 1px solid var(--line);
      margin-bottom: 16px;
    }
    .name {
      font-size: 28px;
      font-weight: 700;
      line-height: 1.15;
      letter-spacing: -0.01em;
      color: var(--ink);
    }
    .role {
      margin-top: 6px;
      font-size: 12px;
      color: var(--muted);
      font-weight: 600;
    }
    .top-skills { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 5px; max-width: 100%; overflow: hidden; }
    .chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid rgba(37, 99, 235, 0.22);
      background: rgba(37, 99, 235, 0.06);
      color: var(--brand-ink);
      font-size: 10.5px;
      font-weight: 600;
      white-space: nowrap;
      line-height: 1.2;
    }

    .block + .block { margin-top: 16px; }
    .divider { height: 1px; background: var(--line); margin: 14px 0; }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ink);
      margin: 0 0 8px;
    }

    .meta-list { display: grid; gap: 8px; font-size: 11.5px; }
    .meta-item { display: grid; gap: 1px; }
    .meta-label { font-size: 10px; color: var(--muted); font-weight: 600; letter-spacing: 0.02em; }
    .meta-value { font-weight: 600; color: var(--ink); overflow-wrap: anywhere; font-size: 11.5px; }
    .meta-value a { color: var(--brand); text-decoration: underline; }

    .summary { font-size: 12px; color: var(--text); white-space: pre-line; line-height: 1.5; }

    .tag-list { display: flex; flex-wrap: wrap; gap: 5px; max-width: 100%; overflow: hidden; }
    .tag {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 10.5px;
      font-weight: 600;
      color: var(--text);
      background: rgba(15, 23, 42, 0.04);
      border: 1px solid rgba(15, 23, 42, 0.08);
      padding: 4px 8px;
      border-radius: 999px;
      white-space: nowrap;
      line-height: 1.2;
    }

    .edu-list { display: grid; gap: 8px; }
    .edu-item {
      display: grid;
      gap: 3px;
      padding: 8px;
      border-radius: 8px;
      border: 1px solid rgba(15, 23, 42, 0.08);
      background: rgba(15, 23, 42, 0.02);
    }
    .edu-header { display: flex; align-items: start; gap: 8px; }
    .edu-badge { width: 36px; height: 36px; border-radius: 4px; object-fit: contain; flex-shrink: 0; }
    .edu-text { min-width: 0; }
    .edu-title { font-size: 11px; font-weight: 700; color: var(--ink); line-height: 1.25; }
    .edu-issuer { font-size: 10.5px; font-weight: 600; color: var(--text); }
    .edu-meta { font-size: 10px; font-weight: 600; color: var(--muted); }
    .edu-link { font-size: 10px; font-weight: 600; }

    .cred-group + .cred-group { margin-top: 12px; }
    .cred-group-label { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); margin-bottom: 6px; }

    .rec-group + .rec-group { margin-top: 12px; }
    .rec-group-title { font-size: 11px; font-weight: 700; color: var(--ink); margin: 0 0 6px; }
    .rec-card {
      border-radius: 8px;
      padding: 8px;
      border: 1px solid rgba(37, 99, 235, 0.2);
      background: rgba(37, 99, 235, 0.04);
    }
    .rec-card + .rec-card { margin-top: 8px; }
    .rec-name { font-size: 11.5px; font-weight: 700; color: var(--ink); margin: 0 0 4px; }
    .rec-line { font-size: 10.5px; font-weight: 600; color: var(--text); line-height: 1.3; overflow-wrap: anywhere; }

    .content-section { margin-top: 16px; }
    .item {
      padding: 10px;
      border-radius: 10px;
      border: 1px solid rgba(226, 232, 240, 0.9);
      background: rgba(248, 250, 252, 0.55);
    }
    .item + .item { margin-top: 8px; }
    .item-head { display: grid; gap: 1px; margin-bottom: 6px; }
    .item-title { font-size: 12px; font-weight: 700; color: var(--ink); }
    .item-subtitle { font-size: 11.5px; color: var(--text); font-weight: 600; }
    .item-meta { font-size: 10.5px; color: var(--muted); font-weight: 600; }

    ul.bullets { margin: 0; padding-left: 14px; display: grid; gap: 4px; color: var(--text); font-size: 11.5px; }
    .subtopic { margin-top: 8px; padding-top: 8px; border-top: 1px dashed rgba(148, 163, 184, 0.5); }
    .subtopic-title { font-size: 10.5px; font-weight: 700; color: var(--ink); margin: 0 0 6px; }

    .project-title { font-size: 12px; font-weight: 700; color: var(--ink); }
    .project-summary { font-size: 11.5px; color: var(--text); margin-top: 3px; }
    .stack { margin-top: 6px; display: flex; flex-wrap: wrap; gap: 5px; max-width: 100%; overflow: hidden; }
    .stack-tag {
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 10px; font-weight: 600; color: var(--brand-ink);
      background: rgba(37, 99, 235, 0.06); border: 1px solid rgba(37, 99, 235, 0.16);
      padding: 3px 8px; border-radius: 999px; white-space: nowrap; line-height: 1.2;
    }

    @media print {
      @page { size: A4; margin: 12mm; }
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      body { background: #fff; }
      .page { padding: 0; max-width: none; }
      .cv { border: 0; border-radius: 0; }
      .cv--first { break-after: page; }
      .cv--rest { margin-top: 0; }
      .item, .block, .content-section, .header { break-inside: avoid; }
      .section-title { break-after: avoid; }
      ul.bullets { orphans: 3; widows: 3; }
    }
  </style>
</head>
<body>
  <div class="page">
    <section class="cv cv--first">
      <aside class="sidebar">
        <div class="avatar-wrap">
          ${data.photoDataUrl ? `<div class="avatar" role="img" aria-label="${data.photoAlt ?? ""}" style="background-image:url(${data.photoDataUrl})"></div>` : ""}
        </div>

        <div class="divider"></div>

        <div class="block">
          <h2 class="section-title">${strings.contact}</h2>
          <div class="meta-list">
            <div class="meta-item">
              <div class="meta-label">${strings.email}</div>
              <div class="meta-value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            <div class="meta-item">
              <div class="meta-label">${strings.phone}</div>
              <div class="meta-value"><a href="https://api.whatsapp.com/send?phone=${data.phone.replace(/\D/g, "")}">${data.phone}</a></div>
            </div>
            <div class="meta-item">
              <div class="meta-label">${strings.location}</div>
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
            <div class="meta-label">${strings.primary}</div>
            <div class="tag-list">${data.skillsPrimary.map((s) => `<span class="tag">${s}</span>`).join("")}</div>
          </div>
          <div style="height:10px"></div>
          <div class="meta-item">
            <div class="meta-label">${strings.secondary}</div>
            <div class="tag-list">${data.skillsSecondary.map((s) => `<span class="tag">${s}</span>`).join("")}</div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="block">
          <h2 class="section-title">${strings.languages}</h2>
          <div class="tag-list">${data.languages.map((s) => `<span class="tag">${s}</span>`).join("")}</div>
        </div>

        ${credGroups.length > 0 ? `
        <div class="divider"></div>
        <div class="block">
          <h2 class="section-title">${data.credentialsTitle}</h2>
          ${credGroups.map((g) => `
          <div class="cred-group">
            <div class="cred-group-label">${g.label}</div>
            <div class="edu-list">
              ${g.items.map((cred) => `
              <div class="edu-item">
                <div class="edu-header">
                  ${cred.badgeDataUrl ? `<img class="edu-badge" src="${cred.badgeDataUrl}" alt="" />` : ""}
                  <div class="edu-text">
                    <div class="edu-title">${cred.title}</div>
                    <div class="edu-issuer">${cred.issuer}</div>
                    ${cred.status ? `<div class="edu-meta">${cred.status}</div>` : ""}
                    ${cred.credlyUrl ? `<div class="edu-link"><a href="${cred.credlyUrl}" class="link">${strings.verifyCredly}</a></div>` : ""}
                  </div>
                </div>
              </div>
              `).join("")}
            </div>
          </div>
          `).join("")}
        </div>
        ` : ""}
      </aside>

      <main class="content">
        <header class="header">
          <h1 class="name">${data.name}</h1>
          <div class="role">${data.role}</div>
          <div class="top-skills">${topSkills.map((s) => `<span class="chip">${s}</span>`).join("")}</div>
        </header>

        <section class="content-section">
          <h2 class="section-title">${strings.about}</h2>
          <div class="summary">${data.about}</div>
        </section>

        ${data.highlights && data.highlights.length > 0 ? `
        <section class="content-section">
          <h2 class="section-title">${data.highlightsTitle ?? strings.highlights}</h2>
          ${data.highlights.slice(0, 4).map((x) => `
          <div class="meta-item" style="margin-top:8px">
            <div class="meta-label">${x.label}</div>
            <div class="meta-value">${x.value}</div>
          </div>
          `).join("")}
        </section>
        ` : ""}

        ${data.recommendationGroups && data.recommendationGroups.length > 0 ? `
        <section class="content-section">
          <h2 class="section-title">${data.recommendationsTitle ?? strings.references}</h2>
          ${data.recommendationGroups.map((g) => `
          <div class="rec-group">
            <div class="rec-group-title">${g.title}</div>
            ${g.people.map((p) => `
            <div class="rec-card">
              <div class="rec-name">${p.name}</div>
              ${p.phone ? `<div class="rec-line">${p.phone}</div>` : ""}
              ${p.email ? `<div class="rec-line">${p.email}</div>` : ""}
            </div>
            `).join("")}
          </div>
          `).join("")}
        </section>
        ` : ""}
      </main>
    </section>

    <section class="cv cv--rest">
      <main class="content content--full">
        <section class="content-section">
          <h2 class="section-title">${data.experienceTitle}</h2>
          ${data.experienceSections.map((exp) => `
            <div class="item">
              <div class="item-head">
                <div class="item-title">${exp.company}</div>
                <div class="item-subtitle">${exp.role}</div>
                <div class="item-meta">${exp.period}</div>
              </div>
              <ul class="bullets">
                ${exp.highlights.map((h) => `<li>${h}</li>`).join("")}
              </ul>
              ${exp.subtopics ? exp.subtopics.map((sub) => `
                <div class="subtopic">
                  <div class="subtopic-title">${sub.title}</div>
                  <ul class="bullets">
                    ${sub.items.map((item) => `<li>${item}</li>`).join("")}
                  </ul>
                </div>
              `).join("") : ""}
            </div>
          `).join("")}
        </section>

        <section class="content-section">
          <h2 class="section-title">${data.projectsTitle}</h2>
          ${data.projectsSections.map((proj) => `
            <div class="item">
              <div class="project-title">${proj.title}</div>
              <div class="project-summary">${proj.summary}</div>
              <div class="stack">
                ${proj.stack.map((tech) => `<span class="stack-tag">${tech}</span>`).join("")}
              </div>
            </div>
          `).join("")}
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

type LinkRect = { href: string; x: number; y: number; w: number; h: number };

function collectLinks(doc: Document, root: Element): LinkRect[] {
  const rootRect = root.getBoundingClientRect();
  const links: LinkRect[] = [];
  const anchors = doc.querySelectorAll("a[href]");
  anchors.forEach((el) => {
    const a = el as HTMLAnchorElement;
    const href = a.href;
    if (!href || (!href.startsWith("http") && !href.startsWith("mailto:") && !href.startsWith("tel:"))) return;
    const r = a.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    links.push({
      href,
      x: r.left - rootRect.left,
      y: r.top - rootRect.top,
      w: r.width,
      h: r.height,
    });
  });
  return links;
}

export async function downloadPDF(html: string, filename: string): Promise<void> {
  const safeName = filename.toLowerCase().endsWith(".pdf") ? filename : `${filename}.pdf`;

  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-10000px";
  iframe.style.top = "0";
  iframe.style.width = "1024px";
  iframe.style.height = "auto";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  try {
    const doc = iframe.contentDocument;
    if (!doc) throw new Error("No iframe document");
    doc.open();
    doc.title = safeName.replace(/\.pdf$/i, "");
    doc.write(html);
    doc.close();

    await new Promise((r) => setTimeout(r, 200));
    await (doc.fonts?.ready ?? Promise.resolve());
    await waitForImages(doc);

    const pageRoot = doc.querySelector(".page") as HTMLElement;
    if (!pageRoot) throw new Error("CV root not found");

    const allLinks = collectLinks(doc, pageRoot);

    const canvas = await html2canvas(pageRoot, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 1024,
    });

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
    const marginMm = 5;
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const contentW = pageW - marginMm * 2;
    const contentH = pageH - marginMm * 2;

    const pxToMm = contentW / canvas.width;
    const sliceMaxPx = Math.floor(contentH / pxToMm);

    const breakPoints = findSafeBreaks(doc, pageRoot, canvas.width / pageRoot.clientWidth, sliceMaxPx, canvas.height);

    let renderedPx = 0;
    let pageIndex = 0;

    for (const breakPx of breakPoints) {
      const sliceH = breakPx - renderedPx;
      if (sliceH <= 0) continue;

      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = sliceH;
      const ctx = sliceCanvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context error");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, sliceCanvas.width, sliceH);
      ctx.drawImage(canvas, 0, renderedPx, canvas.width, sliceH, 0, 0, canvas.width, sliceH);

      const imgData = sliceCanvas.toDataURL("image/jpeg", 0.95);
      const sliceHeightMm = sliceH * pxToMm;

      if (pageIndex > 0) pdf.addPage();
      pdf.addImage(imgData, "JPEG", marginMm, marginMm, contentW, sliceHeightMm, undefined, "FAST");

      const canvasScale = canvas.width / pageRoot.clientWidth;
      const sliceTopPx = renderedPx;
      const sliceBottomPx = breakPx;

      for (const link of allLinks) {
        const linkTopPx = link.y * canvasScale;
        const linkBottomPx = (link.y + link.h) * canvasScale;
        if (linkBottomPx <= sliceTopPx || linkTopPx >= sliceBottomPx) continue;

        const clippedTop = Math.max(linkTopPx, sliceTopPx);
        const clippedBottom = Math.min(linkBottomPx, sliceBottomPx);

        const xMm = marginMm + link.x * canvasScale * pxToMm;
        const yMm = marginMm + (clippedTop - sliceTopPx) * pxToMm;
        const wMm = link.w * canvasScale * pxToMm;
        const hMm = (clippedBottom - clippedTop) * pxToMm;

        pdf.link(xMm, yMm, wMm, hMm, { url: link.href });
      }

      renderedPx = breakPx;
      pageIndex++;
    }

    pdf.save(safeName);
  } finally {
    document.body.removeChild(iframe);
  }
}

function findSafeBreaks(doc: Document, root: HTMLElement, domToCanvasScale: number, maxSlicePx: number, totalHeight: number): number[] {
  const rootTop = root.getBoundingClientRect().top;

  const forbidden = new Set<number>();
  const sectionTitles = root.querySelectorAll(".section-title");
  sectionTitles.forEach((title) => {
    const titleRect = title.getBoundingClientRect();
    const titleTopPx = Math.round((titleRect.top - rootTop) * domToCanvasScale);
    const titleBottomPx = Math.round((titleRect.bottom - rootTop) * domToCanvasScale);
    for (let px = titleTopPx; px <= titleBottomPx + 20; px++) {
      forbidden.add(px);
    }
  });

  const breakable = root.querySelectorAll(".item, .rec-card, .edu-item, .cred-group, .cv--rest");
  const edges: number[] = [];
  breakable.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const topPx = Math.round((rect.top - rootTop) * domToCanvasScale);
    if (!forbidden.has(topPx)) {
      edges.push(topPx);
    }
  });
  edges.sort((a, b) => a - b);
  const unique = [...new Set(edges)];

  const breaks: number[] = [];
  let cursor = 0;

  while (cursor < totalHeight) {
    const ideal = cursor + maxSlicePx;
    if (ideal >= totalHeight) {
      breaks.push(totalHeight);
      break;
    }

    let best = -1;
    for (let i = unique.length - 1; i >= 0; i--) {
      const edge = unique[i];
      if (edge <= cursor + 10) continue;
      if (edge <= ideal) {
        best = edge;
        break;
      }
    }

    if (best <= cursor) {
      for (const edge of unique) {
        if (edge > ideal) {
          best = edge;
          break;
        }
      }
    }

    if (best <= cursor) {
      best = ideal;
    }

    breaks.push(best);
    cursor = best;
  }

  return breaks;
}

function docxP(
  text: string,
  heading?: (typeof HeadingLevel)[keyof typeof HeadingLevel]
): Paragraph {
  return new Paragraph(heading ? { text, heading } : { text });
}

export async function generateCVDocx(data: CVData): Promise<Blob> {
  const strings =
    data.locale === "pt"
      ? {
          contact: "Contato",
          email: "Email",
          phone: "Telefone",
          location: "Local",
          linkedin: "LinkedIn",
          primary: "Primarias",
          secondary: "Secundarias",
          languages: "Idiomas",
          references: "Referencias",
        }
      : {
          contact: "Contact",
          email: "Email",
          phone: "Phone",
          location: "Location",
          linkedin: "LinkedIn",
          primary: "Primary",
          secondary: "Secondary",
          languages: "Languages",
          references: "References",
        };

  const children: Paragraph[] = [
    docxP(data.name, HeadingLevel.TITLE),
    docxP(data.role),
    new Paragraph({ text: "" }),
    docxP(data.about),
    new Paragraph({ text: "" }),
    docxP(strings.contact, HeadingLevel.HEADING_2),
    docxP(`${strings.email}: ${data.email}`),
    docxP(`${strings.phone}: ${data.phone}`),
    docxP(`${strings.location}: ${data.location}`),
    docxP(`${strings.linkedin}: ${data.linkedin}`),
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
  children.push(docxP(`${strings.primary}: ${data.skillsPrimary.join(", ")}`));
  children.push(docxP(`${strings.secondary}: ${data.skillsSecondary.join(", ")}`));
  children.push(docxP(`${strings.languages}: ${data.languages.join(", ")}`));
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
    children.push(docxP(`${cred.issuer}${cred.status ? ` | ${cred.status}` : ""}${cred.credlyUrl ? ` | ${cred.credlyUrl}` : ""}`));
  }

  if (data.recommendationGroups?.length) {
    children.push(new Paragraph({ text: "" }));
    children.push(docxP(data.recommendationsTitle ?? strings.references, HeadingLevel.HEADING_2));
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
