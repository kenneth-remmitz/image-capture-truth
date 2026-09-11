import type { CredentialDoc } from "@/components/site/credential-card";

const driveView = (id: string) => `https://drive.google.com/file/d/${id}/view`;
const driveDownload = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;

const CV_ID = "1fFCHFDHpbnKL43vnaQcIymUUbMqX3tmX";
const DIPLOMA_ID = "1L3Fbh1u31l48-LHIEni4OtvbNh3iymPd";
const AI_ESSENTIALS_ID = "1Kkq3H3xKkCbm8Tc5XD-pJ1PVsJ9Ac4aM";

export const credentialDocs: CredentialDoc[] = [
  {
    name: "Kenneth Remmitz — CV",
    provider: "Kenneth Remmitz",
    description:
      "A concise overview of my education, technical skills, experience and software-development projects.",
    viewHref: driveView(CV_ID),
    downloadHref: driveDownload(CV_ID),
  },
  {
    name: "Diploma in Information Technology in Software Development",
    provider: "IIE Rosebank College",
    date: "2023 – 2025",
    description:
      "My formal qualification in Information Technology in Software Development, completed after three years of study from 2023 to 2025.",
    viewHref: driveView(DIPLOMA_ID),
    downloadHref: driveDownload(DIPLOMA_ID),
  },
  {
    name: "Google AI Essentials",
    provider: "Google / Coursera",
    date: "12 August 2026",
    description:
      "A five-course specialization developed by Google covering practical AI use, productivity, prompting, responsible AI and adapting to developments in AI.",
    viewHref: driveView(AI_ESSENTIALS_ID),
    downloadHref: driveDownload(AI_ESSENTIALS_ID),
  },
  {
    name: "Academic Transcript",
    provider: "IIE Rosebank College",
    description:
      "My academic results across the modules completed during my Diploma in Information Technology in Software Development.",
    status: "Available on request",
  },
];
