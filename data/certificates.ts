export type Certificate = {
  id: string;
  index: string;
  title: string;
  issuer: string;
  type: string;
  year: string;
  credentialId?: string;
  skills: string[];
  pdf: string;
};

export const certificates: Certificate[] = [
  {
    id: "advanced-dl-llm",
    index: "01",
    title: "Advanced Deep Learning for LLM",
    issuer: "rubythalib.ai — AI Academy",
    type: "Batch 6 · Project Completion",
    year: "2026",
    credentialId: "ADLFL6-3",
    skills: ["Deep Learning", "LLM", "AI Engineering"],
    pdf: "/certificates/advanced-dl-llm.pdf",
  },
  {
    id: "genai-n8n",
    index: "02",
    title: "Bootcamp Gen AI & N8N for AI Workflow Automation",
    issuer: "DQLab × UMN × Xeratic",
    type: "Batch 23 · Graduation",
    year: "2026",
    credentialId: "DQLABBCGAIB23FEJSDI",
    skills: ["Generative AI", "n8n", "Workflow Automation"],
    pdf: "/certificates/genai-n8n-bootcamp.pdf",
  },
  {
    id: "english-young-learners",
    index: "03",
    title: "English for Young Learners",
    issuer: "Tsabit English Course",
    type: "Private Course · Completion",
    year: "2026",
    credentialId: "TC-EYL-001",
    skills: ["English", "Communication"],
    pdf: "/certificates/english-young-learners.pdf",
  },
];
