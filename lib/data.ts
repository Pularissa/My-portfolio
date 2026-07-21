/**
 * SINGLE SOURCE OF TRUTH
 * Edit anything here and it reflects everywhere on the portfolio.
 * In production this would come from a database — for now it's a flat file.
 */

export type Project = {
  id: number;
  number: string;
  featured: boolean;
  title: string;
  subtitle: string;
  description: string;
  techs: string[];
  highlights: string[];
  bgImage: string;
  fgImage: string;
  link: string;
};

export type Skill = {
  name: string;
  percent: number;
};

export type SkillCategory = {
  id: string;
  label: string;
  icon: string;
  skills: Skill[];
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string;
  description: string;
};

export type Profile = {
  name: string;
  tagline: string;
  school: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  available: string;
  heroWords: string[];
  stats: { number: string; label: string }[];
  floatChips: string[];
};

// ─── PROFILE ────────────────────────────────────────────────────────────────

export const profile: Profile = {
  name:      "Prisca Larissa",
  tagline:   "Software Programming & Embedded Systems student at Rwanda Coding Academy — building real solutions for real problems across web, mobile, and hardware.",
  school:    "Rwanda Coding Academy",
  location:  "Rwanda, Africa",
  email:     "iyonezalarissaprisca@gmail.com",
  github:    "https://github.com",
  linkedin:  "https://linkedin.com",
  available: "Open to internships & collaborative opportunities",
  heroWords: ["Developer", "Builder", "Problem Solver", "Student"],
  stats: [
    { number: "10+", label: "Projects"  },
    { number: "6+",  label: "Languages" },
    { number: "RCA", label: "Student"   },
  ],
  floatChips: ["UmuhinziLink", "Next.js", "IoT"],
};

// ─── PROJECTS ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 1, number: "01", featured: true,
    title: "UmuhinziLink", subtitle: "AgriTech Platform",
    description: "A digital platform connecting Rwandan smallholder farmers directly with buyers — cutting out middlemen, improving market access, and delivering AI-powered farming advice, live market prices, and digital payment support.",
    techs: ["Next.js","React","Node.js","PostgreSQL","Tailwind CSS","AI Integration"],
    highlights: ["Farmer & buyer marketplace","AI farming assistant","Secure auth & payments"],
    bgImage: "/images/bus.png", fgImage: "/images/me.png", link: "#",
  },
  {
    id: 2, number: "02", featured: false,
    title: "YNT Rwanda", subtitle: "NGO Website",
    description: "A modern website for Youth for National Transformation Rwanda — showcasing the organisation's mission, managing memberships, collecting donations, publishing events, and supporting multi-language audiences.",
    techs: ["React.js","Tailwind CSS","React Router","i18next","JavaScript"],
    highlights: ["Multi-language (i18next)","Membership & donations","Events management"],
    bgImage: "/images/me.png", fgImage: "/images/bus.png", link: "#",
  },
  {
    id: 3, number: "03", featured: false,
    title: "Hotel & Flight Booking", subtitle: "Full-Stack App",
    description: "A full-stack booking application letting users search, book, and manage hotel and flight reservations with secure authentication, booking history, and automated scheduler reports.",
    techs: ["Spring Boot","Java","PostgreSQL","Hibernate","REST API"],
    highlights: ["Hotel & flight search","User auth & history","Scheduler reports"],
    bgImage: "/images/bus.png", fgImage: "/images/me.png", link: "#",
  },
  {
    id: 4, number: "04", featured: false,
    title: "Smart Garden Monitor", subtitle: "IoT / Embedded System",
    description: "An embedded IoT solution monitoring environmental conditions for smart farming — tracking temperature, humidity, and soil conditions with real-time LCD display and ESP8266 WiFi connectivity.",
    techs: ["Arduino","C++","DHT11","LM35","LCD I2C","ESP8266"],
    highlights: ["Real-time sensor readings","LCD display","IoT connectivity"],
    bgImage: "/images/me.png", fgImage: "/images/bus.png", link: "#",
  },
  {
    id: 5, number: "05", featured: false,
    title: "Rwanda Traffic Signs", subtitle: "Educational Platform",
    description: "An interactive learning platform helping learner drivers prepare for Rwanda driving theory exams — with hundreds of traffic sign questions, practice mode, quiz mode, score tracking, and instant feedback.",
    techs: ["React","JavaScript","CSS"],
    highlights: ["Hundreds of questions","Practice & quiz modes","Score tracking"],
    bgImage: "/images/bus.png", fgImage: "/images/me.png", link: "#",
  },
  {
    id: 6, number: "06", featured: false,
    title: "Library Management System", subtitle: "Desktop Application",
    description: "A desktop application for managing books, borrowing, returns, and student records — with full search functionality and report generation, built with Java Swing and PostgreSQL.",
    techs: ["Java","Java Swing","JDBC","PostgreSQL"],
    highlights: ["Book & student management","Borrow/return tracking","Report generation"],
    bgImage: "/images/me.png", fgImage: "/images/bus.png", link: "#",
  },
  {
    id: 7, number: "07", featured: false,
    title: "pBeFree", subtitle: "Drug Prevention App",
    description: "A youth-focused platform that helps prevent drug abuse by providing education, peer support, AI-powered counseling, and access to healthy activities — empowering young people to make better choices and build a drug-free future.",
    techs: ["React.js","Node.js","Express.js","MongoDB","JWT","OpenAI API","Firebase","Google Maps API","Tailwind CSS"],
    highlights: ["AI chatbot & personalized guidance","Find nearby rehab centres (Maps)","Push notifications & reminders"],
    bgImage: "/images/bus.png", fgImage: "/images/me.png", link: "#",
  },
];

// ─── SKILLS ──────────────────────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend", label: "Frontend", icon: "◈",
    skills: [
      { name: "React.js",     percent: 88 },
      { name: "Next.js",      percent: 84 },
      { name: "JavaScript",   percent: 90 },
      { name: "Tailwind CSS", percent: 88 },
      { name: "HTML & CSS",   percent: 95 },
    ],
  },
  {
    id: "backend", label: "Backend", icon: "◎",
    skills: [
      { name: "Java / Spring Boot", percent: 80 },
      { name: "Node.js",            percent: 78 },
      { name: "PostgreSQL",         percent: 82 },
      { name: "REST APIs",          percent: 86 },
      { name: "Hibernate / JDBC",   percent: 74 },
    ],
  },
  {
    id: "embedded", label: "Embedded & IoT", icon: "◆",
    skills: [
      { name: "Arduino / C++", percent: 80 },
      { name: "ESP8266",       percent: 74 },
      { name: "DHT11 / LM35",  percent: 78 },
      { name: "LCD I2C",       percent: 76 },
      { name: "Sensor Systems",percent: 75 },
    ],
  },
  {
    id: "tools", label: "Tools & Design", icon: "◇",
    skills: [
      { name: "Git & GitHub", percent: 88 },
      { name: "Figma",        percent: 76 },
      { name: "TypeScript",   percent: 78 },
      { name: "Postman",      percent: 80 },
      { name: "VS Code",      percent: 95 },
    ],
  },
];

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

export const experiences: ExperienceItem[] = [
  {
    id: "01",
    company: "Rwanda Coding Academy",
    role: "Software Programming & Embedded Systems Student",
    period: "2023 — Present",
    type: "Education",
    description: "Studying software engineering and embedded systems at one of Rwanda's top coding academies. Building real-world projects spanning web apps, desktop software, IoT devices, and AI-assisted systems.",
  },
  {
    id: "02",
    company: "UmuhinziLink",
    role: "Founder & Lead Developer",
    period: "2024 — Present",
    type: "Project",
    description: "Designed and built a full-stack AgriTech platform connecting Rwandan farmers with buyers. Integrated AI farming advice, live market pricing, and digital payments using Next.js, Node.js, and PostgreSQL.",
  },
  {
    id: "03",
    company: "YNT Rwanda",
    role: "Frontend Developer",
    period: "2024",
    type: "Project",
    description: "Developed a modern NGO website with multi-language support (i18next), membership registration, donation handling, and an events management system using React and Tailwind CSS.",
  },
  {
    id: "04",
    company: "Independent Projects",
    role: "Self-directed Developer",
    period: "2023 — Present",
    type: "Personal",
    description: "Built 10+ projects across web (React, Spring Boot), desktop (Java Swing), and hardware (Arduino, ESP8266). Topics include traffic education, library management, IoT smart gardens, and personal safety apps.",
  },
];
