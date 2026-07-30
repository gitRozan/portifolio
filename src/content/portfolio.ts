export type ProjectCategory = "sap" | "web";

export type Project = {
  id: string;
  category: ProjectCategory;
  stack: string[];
};

export type Experience = {
  id: string;
  company: string;
  logoUrl?: string;
  startYM: string;
};

export type CredentialKind = "higherEducation" | "course" | "certification" | "badge";

export type CredentialProof = {
  type: "external" | "pdf";
  href: string;
};

export type Credential = {
  id: string;
  title: string;
  kind: CredentialKind;
  issuer: string;
  /** Codigo oficial do exame SAP (ex.: C_FIORD_2404). Recrutador SAP busca por codigo. */
  examCode?: string;
  /** ID publico da credencial, para verificacao. */
  credentialId?: string;
  issueYM?: string;
  validUntilYM?: string;
  status?: "inProgress" | "completed";
  proof?: CredentialProof;
  credlyUrl?: string;
  badgeImageUrl?: string;
};

export type Reference = {
  id: string;
  name: string;
  role: string;
  company?: string;
  location: string;
  linkedin: string;
};

export type CVReferencePerson = {
  name: string;
  role?: string;
  company?: string;
  context?: string;
  location?: string;
  linkedin?: string;
};

export function buildReferenceGroupsForCV(
  people: Reference[],
  contexts: Record<string, string | undefined> = {}
): Array<{ people: CVReferencePerson[] }> {
  return [
    {
      people: people.map(({ id, name, role, company, location, linkedin }) => ({
        name,
        role,
        company,
        context: contexts[id],
        location,
        linkedin,
      })),
    },
  ];
}

export const experiences: Experience[] = [
  {
    id: "ey",
    company: "EY (Ernst & Young)",
    logoUrl: "/assets/logos/ey.svg",
    startYM: "2026-04",
  },
  {
    id: "spro",
    company: "SPRO IT Solutions",
    logoUrl: "/assets/logos/spro.svg",
    startYM: "2025-04",
  },
  {
    id: "ztg",
    company: "ZTG Consulting",
    logoUrl: "/assets/logos/ztg.svg",
    startYM: "2022-03",
  },
  {
    id: "agrobold",
    company: "AgroBold Tecnologia",
    logoUrl: "/assets/logos/agrobold.svg",
    startYM: "2021-05",
  },
  {
    id: "compilart",
    company: "Compilart",
    logoUrl: "/assets/logos/compilart.svg",
    startYM: "2020-03",
  },
  {
    id: "alastra",
    company: "Alastra",
    logoUrl: "/assets/logos/alastra.svg",
    startYM: "2020-01",
  },
];

// Ordem SAP intencional: cases mais fortes primeiro (escala/impacto verificavel),
// nao ordem cronologica. AppGraos e Domvs sao os dois cases com numero e resultado
// de negocio explicito; Cockpit e SIPAL sao mais descritivos.
export const projects: Project[] = [
  {
    id: "appgraos-brf",
    category: "sap",
    stack: ["Hybrid App (HAT)", "SAPUI5", "Offline"],
  },
  {
    id: "integracao-ecommerce-domvs",
    category: "sap",
    stack: ["SAP CAP", "SAP Integration Suite (iFlows)", "SAP BTP", "HANA Cloud"],
  },
  {
    id: "cockpit-veiculos",
    category: "sap",
    stack: ["SAPUI5 Freestyle", "OData", "SAP BTP", "HANA Cloud"],
  },
  {
    id: "sipal-otimizacao-agricola",
    category: "sap",
    stack: ["Fiori", "ABAP", "RAP", "CDS Views"],
  },
  {
    id: "leiloes-agrobold",
    category: "web",
    stack: ["Vue.js", "PHP", "WebSocket"],
  },
  {
    id: "leilao-cotas",
    category: "web",
    stack: ["React Native", "AWS Serverless"],
  }
];

export type SkillGroup = {
  /** Chave em content.skills.groups.<id> nos arquivos de mensagem. */
  id: string;
  items: string[];
};

/**
 * Taxonomia agrupada por dominio. ATS moderno pontua skill com contexto acima de
 * lista solta, entao cada termo daqui tambem aparece dentro de pelo menos um
 * bullet de experiencia. Nao adicionar termo que nao se sustente em entrevista.
 */
// Ordem intencional: Fiori primeiro (main skill), depois ABAP. Sao os unicos
// grupos garantidos visiveis sem rolagem no mobile, onde o grid vira 1 coluna.
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    items: ["SAP Fiori", "SAPUI5", "Fiori Elements", "Fiori Freestyle", "Fiori Design Guidelines", "CDS Annotations", "Metadata Extensions", "Value Help", "SAP Business Application Studio", "SAP Web IDE", "Hybrid App Toolkit (HAT)", "SAP Asset Manager"],
  },
  {
    id: "abapModern",
    items: ["ABAP", "ABAP Cloud", "ABAP OO", "RAP", "CDS Views", "Behavior Definition", "Behavior Implementation", "Draft", "Actions", "Determinations", "Validations", "Eclipse ADT"],
  },
  {
    id: "platforms",
    items: ["SAP S/4HANA", "SAP ECC", "SAP BTP", "SAP HANA Cloud", "Cloud Foundry", "SAP Fiori Launchpad", "SAP Build Work Zone"],
  },
  {
    id: "abapClassic",
    items: ["BAdI", "User Exit", "Enhancement Point", "BAPI", "RFC", "IDoc", "Web Services", "ALV", "Report", "Module Pool", "SmartForms", "Adobe Forms", "BDC"],
  },
  {
    id: "integration",
    items: ["OData V2", "OData V4", "SAP Gateway (SEGW)", "Service Definition & Binding", "SAP Integration Suite", "iFlows", "API Management", "Event Mesh", "Cloud Connector", "Destination Service", "XSUAA"],
  },
  {
    id: "btpDev",
    items: ["SAP CAP", "CDS Model", "HDI Container", "Node.js Service Handlers", "MTA", "Approuter"],
  },
  {
    id: "architecture",
    items: ["Clean Core", "Extensibilidade side-by-side", "SAP Activate", "Transportes (TASK/TR)", "Azure DevOps", "Git"],
  },
  {
    id: "web",
    items: ["JavaScript", "TypeScript", "React.js", "Vue.js", "Node.js", "PHP", "MySQL", "HTML/CSS"],
  },
];

export const credentials: Credential[] = [
  {
    id: "bsc-compsci",
    title: "Ciência da Computação",
    kind: "higherEducation",
    issuer: "Universidade São Judas Tadeu",
    status: "inProgress",
  },
  {
    id: "ka-btp-clean-core",
    title: "SAP BTP e Clean Core",
    kind: "course",
    issuer: "Ka Solution",
    issueYM: "2025-10",
    proof: {
      type: "pdf",
      href: "/assets/certificados/CLEANCORE-BTP-INTEGRATION-SUITE-KASOLUTION-10-2025.pdf",
    },
  },
  {
    id: "sap-certified-fiori-application-developer",
    title: "SAP Certified - SAP Fiori Application Developer",
    kind: "certification",
    issuer: "SAP",
    // TODO Nicolas: confirme o codigo do exame no seu portal SAP (provavelmente C_FIORD_2404)
    // e preencha abaixo. Recrutador SAP filtra por codigo, nao so' por nome.
    examCode: "C_FIORD",
    credentialId: "d91a7f87-8e0b-4445-af47-daac97fb2cec",
    issueYM: "2026-04",
    validUntilYM: "2027-04",
    proof: {
      type: "pdf",
      href: "/assets/certificados/SAP2024Certification20260408-31-58uldt.pdf",
    },
    credlyUrl:
      "https://www.credly.com/badges/d91a7f87-8e0b-4445-af47-daac97fb2cec/linked_in?t=td6s60",
    badgeImageUrl: "/assets/certificados/badge-cfiord.png",
  },
];

export const references: Reference[] = [
  {
    id: "maylon-zanardi",
    name: "Maylon de Oliveira Zanardi",
    role: "Tech Lead",
    company: "SPRO",
    location: "Curitiba, PR",
    linkedin: "https://www.linkedin.com/in/maylonzanardi/",
  },
  {
    id: "joao-gabardo",
    name: "João Henrique Gabardo",
    role: "Tech Lead",
    company: "ACCAO",
    location: "Curitiba, PR",
    linkedin: "https://www.linkedin.com/in/joaohmgabardo/",
  },
  {
    id: "mauricio-oliveira",
    name: "Mauricio Oliveira",
    role: "Tech Lead",
    company: "SPRO",
    location: "Curitiba, PR",
    linkedin: "https://www.linkedin.com/in/mauriciofilho93/",
  },
];

