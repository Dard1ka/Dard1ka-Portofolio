export type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "youtube" | "website" | "demo";
};

export type Project = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  year: string;
  stack: string[];
  category: string;
  links: ProjectLink[];
  images: { src: string; alt: string }[];
  video?: string;
  pdf?: string;
  accent?: string;
};

export const projects: Project[] = [
  {
    id: "aika",
    index: "01",
    name: "AIKA",
    tagline: "LLM API with character voice",
    description:
      "A voice-enabled conversational AI that pipelines LLM responses through text-to-speech and voice conversion (RVC) to reply in a fine-tuned character voice. Modular architecture for easy model upgrades, plus a context-aware memory system for short-term and long-term recall.",
    year: "2025",
    stack: ["Python", "FastAPI", "TypeScript", "OpenAI API", "Edge TTS", "RVC"],
    category: "AI · LLM · Voice",
    links: [
      { label: "Repository", href: "https://github.com/Dard1ka/AIKA_LLM_API", kind: "github" },
      { label: "Demo", href: "https://youtu.be/fUw0D4FmWCU", kind: "youtube" },
    ],
    images: [],
    video: "/projects/aika/demo.mp4",
  },
  {
    id: "itcs",
    index: "02",
    name: "ITCS",
    tagline: "IoT monitoring & control concept",
    description:
      "An end-to-end IoT concept with a React control interface and a FastAPI backend orchestrating sensors and devices. Presented to local government as a working tool for real-world monitoring and intervention scenarios.",
    year: "2025",
    stack: ["React", "FastAPI", "IoT", "Python"],
    category: "IoT · Full-stack",
    links: [
      { label: "Repository", href: "https://github.com/Dard1ka/ITCS_Concept_React_IOT_FASTAPI", kind: "github" },
      { label: "Demo", href: "https://youtu.be/WSv8LOs6RgM", kind: "youtube" },
    ],
    images: [
      { src: "/projects/itcs/output.jpg", alt: "ITCS dashboard output" },
      { src: "/projects/itcs/tool.jpg", alt: "ITCS IoT hardware" },
      { src: "/projects/itcs/present.jpg", alt: "Presentation to local government" },
      { src: "/projects/itcs/team.jpg", alt: "ITCS team" },
    ],
    pdf: "/projects/itcs/presentation.pdf",
  },
  {
    id: "fortunas",
    index: "03",
    name: "Fortunas AI",
    tagline: "Intelligent workflow application",
    description:
      "An AI-powered application focused on user experience and intelligent workflows. It blends automation, prediction, and a clean interactive surface for end users.",
    year: "2025",
    stack: ["AI", "Web", "Product"],
    category: "AI · Product",
    links: [
      { label: "Repository", href: "https://github.com/Dard1ka/fortunas-ai", kind: "github" },
      { label: "Demo", href: "https://youtu.be/wWKt6JIUQpg", kind: "youtube" },
    ],
    images: [
      { src: "/projects/fortunas/mainmenu.jpg", alt: "Fortunas main menu" },
      { src: "/projects/fortunas/example.jpg", alt: "Fortunas example" },
    ],
    pdf: "/projects/fortunas/presentation.pdf",
  },
  {
    id: "mmd-generator",
    index: "04",
    name: "MMD Generator",
    tagline: "Automated content generation with n8n",
    description:
      "An automation pipeline built during an N8N bootcamp that generates MMD content end-to-end. It orchestrates LLM prompts, asset hand-offs, and delivery steps into a repeatable workflow.",
    year: "2025",
    stack: ["n8n", "Automation", "LLM", "Workflow"],
    category: "Automation · AI",
    links: [],
    images: [
      { src: "/projects/mmd-generator/n8n_node.png", alt: "n8n workflow nodes for MMD Generator" },
      { src: "/projects/mmd-generator/tele_bot.png", alt: "Telegram bot interface" },
    ],
    pdf: "/projects/mmd-generator/presentation.pdf",
  },
  {
    id: "number-memory",
    index: "05",
    name: "Number Memory AI",
    tagline: "AI memory training game",
    description:
      "A memory game that progressively trains and tests your ability to recall numeric sequences. Designed as a small, focused experience with clear feedback loops.",
    year: "2024",
    stack: ["AI", "Game", "Web"],
    category: "AI · Game",
    links: [
      { label: "Repository", href: "https://github.com/Dard1ka/NumberMemoryAi", kind: "github" },
      { label: "Demo", href: "https://youtube.com/shorts/Lww2MENCgiA", kind: "youtube" },
    ],
    images: [
      { src: "/projects/number-memory/mainmenu.jpg", alt: "Main menu" },
      { src: "/projects/number-memory/lesson2.jpg", alt: "Lesson 2" },
      { src: "/projects/number-memory/lesson3.jpg", alt: "Lesson 3" },
      { src: "/projects/number-memory/win.jpg", alt: "Win screen" },
    ],
  },
  {
    id: "illegal-parking",
    index: "06",
    name: "AI Illegal Parking",
    tagline: "Real-time CV violation detection",
    description:
      "A computer vision system that detects illegal parking from a live camera feed, classifies violations, and surfaces warnings through a monitoring interface, bridging deep learning and real-world enforcement.",
    year: "2024",
    stack: ["Python", "Computer Vision", "AI"],
    category: "Computer Vision",
    links: [
      { label: "Repository", href: "https://github.com/Dard1ka/Ai-Ilegal-Parking", kind: "github" },
    ],
    images: [
      { src: "/projects/illegal-parking/monitoring.jpg", alt: "Monitoring view" },
      { src: "/projects/illegal-parking/violation.jpg", alt: "Violation detection" },
      { src: "/projects/illegal-parking/warning.jpg", alt: "Warning state" },
      { src: "/projects/illegal-parking/start.jpg", alt: "Start menu" },
    ],
  },
  {
    id: "kost-sista",
    index: "07",
    name: "Kost Sista",
    tagline: "Property business website",
    description:
      "A business website for a boarding house, focused on property presentation, room information, and conversion. Production deployment serving real visitors.",
    year: "2024",
    stack: ["Web", "Frontend", "Product"],
    category: "Web · Production",
    links: [
      { label: "Website", href: "https://kostsista.com", kind: "website" },
    ],
    images: [
      { src: "/projects/kost-sista/preview.jpg", alt: "Kost Sista preview" },
    ],
  },
];
