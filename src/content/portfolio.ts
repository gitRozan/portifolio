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

export const experiences: Experience[] = [
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
  primary: ["SAP Fiori", "SAPUI5", "SAP BTP", "ABAP", "RAP", "CDS Views", "CAP", "HANA Cloud"],
  secondary: ["React.js", "Vue.js", "Node.js", "PHP", "TypeScript"]
};


