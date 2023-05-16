import { Track } from "./Interfaces";

export const languages = [
  "Afrikaans",
  "Albanian",
  "Amharic",
  "Arabic",
  "Armenian",
  "Azerbaijani",
  "Basque",
  "Belarusian",
  "Bengali",
  "Bosnian",
  "Bulgarian",
  "Catalan",
  "Cebuano",
  "Chichewa",
  "Chinese (Simplified)",
  "Chinese (Traditional)",
  "Corsican",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "English",
  "Esperanto",
  "Estonian",
  "Filipino",
  "Finnish",
  "French",
  "Frisian",
  "Galician",
  "Georgian",
  "German",
  "Greek",
  "Gujarati",
  "Haitian Creole",
  "Hausa",
  "Hawaiian",
  "Hebrew",
  "Hindi",
  "Hmong",
  "Hungarian",
  "Icelandic",
  "Igbo",
  "Indonesian",
  "Irish",
  "Italian",
  "Japanese",
  "Javanese",
  "Kannada",
  "Kazakh",
  "Khmer",
  "Kinyarwanda",
  "Korean",
  "Kurdish",
  "Kyrgyz",
  "Lao",
  "Latin",
  "Latvian",
  "Lithuanian",
  "Luxembourgish",
  "Macedonian",
  "Malagasy",
  "Malay",
  "Malayalam",
  "Maltese",
  "Maori",
  "Marathi",
  "Mongolian",
  "Myanmar (Burmese)",
  "Nepali",
  "Norwegian",
  "Odia (Oriya)",
  "Pashto",
  "Persian",
  "Polish",
  "Portuguese",
  "Punjabi",
  "Romanian",
  "Russian",
  "Samoan",
  "Scots Gaelic",
  "Serbian",
  "Sesotho",
  "Shona",
  "Sindhi",
  "Sinhala (Sinhalese)",
  "Slovak",
  "Slovenian",
  "Somali",
  "Spanish",
  "Sundanese",
  "Swahili",
  "Swedish",
  "Tajik",
  "Tamil",
  "Tatar",
  "Telugu",
  "Thai",
  "Turkish",
  "Turkmen",
  "Ukrainian",
  "Urdu",
  "Uyghur",
  "Uzbek",
  "Vietnamese",
  "Welsh",
  "Xhosa",
  "Yiddish",
  "Yoruba",
  "Zulu",
];

export const profSkills = [
  "Software development",
  "Data engineering",
  "Software engineer",
  "UI",
  "UX",
  "Data science",
  "Cloud computing",
  "Data analysis",
  "Digital marketing",
  "Computer programming",
  "Computer literacy",
  "Analytics",
  "Mobile development",
  "Automation",
  "Computer graphics",
  "Cyber security",
  "Project management",
  "Data and information visualisation",
  "Computer network",
  "Design",
  "Technical writing",
  "Information security",
  "Virtualisation",
  "Network maintenance",
  "Business analysis",
  "People management",
  "Blockchain",
  "Quantum computing",
  "Robotics",
  "Video production",
  "Game development",
  "Industrial design",
  "Audio production",
  "Machine learning",
  "Translation",
  "AI",
];

export const compLanguages = [
  "Oracle",
  "Java",
  "Javascript",
  "Linux",
  "Html",
  "Css",
  "Python",
  "SQL",
  "C/C++",
  "Scrum",
  "Git",
  "Unix",
  "C#",
  "Perl",
  "Swift",
  "Azure",
  "Ruby",
  "Go",
  "Php",
  "AWS",
  ".net",
  "Scala",
  "Salesforce/crm",
  "Docker",
  "Typescript",
];

export const stack = [
  "Symfony",
  "Flask",
  "Android SDK",
  "Graph QL",
  "MUI",
  "Bootstrap",
  "Tailwind",
  "React testing library",
  "Supertest",
  "Jest",
  "Cypress",
  "Django",
  "Spring",
  "Node",
  "Express",
  "Koa",
  "Superbase",
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "React native",
  "Vite",
  "Prisma",
  "Sequelize",
  "Mongoose",
  "Mongodb",
  "Ruby on rails",
  "Fastapi",
  "Jquery",
];

export const workingModals = ["On-site", "Remote", "Hybrid"];

export const workingHours = [
  "Full-time",
  "Part-time",
  "Freelance",
  "Internship",
  "Flextime",
];

export const levelLanguages = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Native",
];

export const typeForStep = ["Questionary", "Zoom call", "SandBox"];

export function extractApplicantData(userInfo: any) {
  const { avatar_url, bio, email, html_url, node_id, name } = userInfo;
  return {
    picture: avatar_url,
    about: bio,
    email,
    socialMedia: [html_url],
    idAuth: node_id,
    name,
  };
}

export function extractRecruiterData(userInfo: any) {
  const { avatar_url, bio, email, node_id, name } = userInfo;
  if (userInfo.name) {
    return {
      picture: avatar_url,
      about: bio || "",
      email,
      idAuth: node_id,
      recruiterName: name,
      name: "",
      logo: "",
      founded: "",
      externalLinks: [],
      headOffice: "",
    };
  } else {
    return {
      picture: avatar_url,
      about: bio || "",
      email,
      idAuth: node_id,
      recruiterName: "",
      name: "",
      logo: "",
      founded: "",
      externalLinks: [],
      headOffice: "",
    };
  }
}

export function extractItemsByOrder(track: Track) {
  const orderedItems: any[] = [];
  if (track.hasOwnProperty("CodeSandbox")) {
    const codeSandBoxItems = track.CodeSandbox;
    codeSandBoxItems.forEach((item) => {
      orderedItems.push(item);
    });
  }
  if (track.hasOwnProperty("Videocall")) {
    const videoCallItems = track.Videocall;
    videoCallItems.forEach((item) => {
      orderedItems.push(item);
    });
  }
  if (track.hasOwnProperty("Questionaries")) {
    const questionariesItems = track.Questionaries;
    questionariesItems.forEach((item) => {
      orderedItems.push(item);
    });
  }

  return orderedItems
    .sort((a, b) => a.order - b.order)
    .filter((item) => item.hidden !== true);
}
