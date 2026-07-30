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

export const projects: Project[] = [
  {
    id: "cockpit-veiculos",
    category: "sap",
    stack: ["SAPUI5 Freestyle", "OData", "SAP BTP", "HANA Cloud"],
  },
  {
    id: "integracao-ecommerce-domvs",
    category: "sap",
    stack: ["SAP CAP", "SAP Integration Suite (iFlows)", "SAP BTP", "HANA Cloud"],
  },
  {
    id: "sipal-otimizacao-agricola",
    category: "sap",
    stack: ["Fiori", "ABAP", "RAP", "CDS Views"],
  },
  {
    id: "appgraos-brf",
    category: "sap",
    stack: ["Hybrid App (HAT)", "SAPUI5", "Offline"],
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

export const skills = {
  primary: ["SAP ECC", "S/4HANA", "SAP Fiori", "SAPUI5", "SAP BTP", "ABAP", "RAP", "CDS Views", "CAP", "HANA Cloud"],
  secondary: ["React.js", "Vue.js", "Node.js", "PHP", "TypeScript"]
};

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

