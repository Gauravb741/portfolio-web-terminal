// ============================================================
//  PERSONALIZATION FILE
//  Edit ONLY this file to update everything
// ============================================================

export const profile = {
  // ── Identity ──
  name:         "Gaurav Sharad Bansod",
  role:         "Software Developer",
  education:    "B.Tech Computer Science and Engineering",
  university:   "VIT Bhopal University",
  location:     "India",

  // ── Card Details ──
  developerId:  "DEV-2026-001",
  cardSerial:   "VIT-CS-2026-GSB-001",
  issueDate:    "2026-05",
  expiryDate:   "2027-12",

  // ── Assets ──
  profileImage: "/assets/id_card_image.png",
  logo:         "/assets/logo.png",

  // ── Contact ──
  email:        "gauravbansod680@gmail.com",
  github:       "https://github.com/Gauravb741",
  linkedin:     "https://linkedin.com/in/gauravbansod",
  portfolio:    "https://github.com/Gauravb741",
  qrValue:      "https://github.com/Gauravb741",

  // ── Banner / HUD config ──
  // Edit these freely — they appear in the startup HUD banner
  banner: {
    // Stats grid (4 boxes)
    stats: [
      { value: "3",   label: "PROJECTS" },
      { value: "3",   label: "INTERNSHIPS" },
      { value: "2027", label: "GRADUATE" },
      { value: "7.86", label: "GPA" },
    ],

    // Info fields shown on the right
    fields: [
      { key: "USER",         val: "GAURAV SHARAD BANSOD" },
      { key: "ROLE",         val: "PYTHON DEVELOPER" },
      { key: "DOMAIN",       val: "PYTHON // DEVOPS" },
      { key: "STATUS",       val: "ONLINE" },
      { key: "ACCESS_LEVEL", val: "DEVELOPER" },
    ],

    // Tagline shown below the big name
    tagline: "BUILDING PRACTICAL SYSTEMS AND SOLVING REAL PROBLEMS.",

    // Skill tags shown at the bottom
    tags: ["Python", "Django", "DevOps", "Kubernetes", "AWS"],

    // Bottom footer text
    footer: "CODE / AUTOMATE / DEPLOY / REPEAT",

    // Since year
    since: "2022",

    // Hex log ID shown bottom left
    syslog: "0xGSB741",

    // Biometric scan serial shown below photo
    scanSerial: "93-734-97204-GSB",
  },

  // ── Skills ──
  skills: [
    {
      category: "languages",
      items: ["Python", "Java", "Bash / Shell Scripting"],
    },
    {
      category: "core-python",
      items: ["OOP", "Data Structures & Algorithms"],
    },
    {
      category: "web-and-api",
      items: ["REST APIs", "Django", "Django REST Framework"],
    },
    {
      category: "databases",
      items: ["MySQL", "MongoDB"],
    },
    {
      category: "devops-and-cloud",
      items: [
        "Docker",
        "Kubernetes",
        "GitHub Actions",
        "Terraform",
        "AWS",
        "Linux",
        "Git",
        "GitHub",
      ],
    },
  ],

  // ── Contact Links ──
  contactLinks: [
    {
      icon: "⌘",
      label: "email",
      value: "gauravbansod680@gmail.com",
      href: "mailto:gauravbansod680@gmail.com",
    },
    {
      icon: "◈",
      label: "github",
      value: "github.com/Gauravb741",
      href: "https://github.com/Gauravb741",
    },
    {
      icon: "◉",
      label: "linkedin",
      value: "linkedin.com/in/gauravbansod",
      href: "https://linkedin.com/in/gauravbansod",
    },
    {
      icon: "◎",
      label: "portfolio",
      value: "github.com/Gauravb741",
      href: "https://github.com/Gauravb741",
    },
  ],

  // ── Projects ──
  projects: [
    {
      name: "NITIGATI – AI-Powered Freelance Service Marketplace",
      description:
        "Full-stack freelance marketplace using Django REST Framework and Next.js with token authentication, Provider/Customer roles, service discovery, proposal negotiation, and complete order lifecycle.",
      year: "2026",
      status: "Live",
      link: "https://github.com/Gauravb741/NITIGATI",
      tech: [
        { name: "Django", percent: 90 },
        { name: "Next.js", percent: 85 },
        { name: "TypeScript", percent: 80 },
        { name: "WebSockets", percent: 75 },
      ],
    },
    {
      name: "GitOps Kubernetes Deployer",
      description:
        "Automated CI/CD pipeline using GitHub Actions with testing, Docker image creation, Trivy security scanning, Kubernetes deployment, and Argo CD GitOps workflows.",
      year: "2026",
      status: "Completed",
      link: "https://github.com/Gauravb741/gitops-kubernetes-deployer",
      tech: [
        { name: "Kubernetes", percent: 90 },
        { name: "GitHub Actions", percent: 90 },
        { name: "Docker", percent: 85 },
        { name: "Argo CD", percent: 80 },
      ],
    },
    {
      name: "CAPE – Online Examination Management Platform",
      description:
        "Full-stack examination platform using Django REST Framework, React.js, and MongoDB with role-based Admin/Student portals, exam scheduling, student records, study material, analytics, and data processing.",
      year: "2026",
      status: "Completed",
      link: "https://github.com/Gauravb741/CAPE",
      tech: [
        { name: "Django REST", percent: 90 },
        { name: "React.js", percent: 80 },
        { name: "MongoDB", percent: 75 },
        { name: "Python", percent: 90 },
      ],
    },
  ],

  // ── Experience ──
  experience: [
    {
      role: "Advanced Software Engineering & Development Intern",
      company: "MPonline Ltd.",
      duration: "May 2026 – July 2026",
      points: [
        "Built a Library Management System in Java using the MVC pattern",
        "Implemented cataloguing, borrowing, and return workflows",
        "Applied clean separation of models, views, and controllers",
      ],
    },
    {
      role: "AI / ML Intern",
      company: "MPonline Ltd.",
      duration: "May 2026 – July 2026",
      points: [
        "Developed a Smart Customer Retail System in Python",
        "Built churn-prediction and sentiment-analysis components",
        "Developed a conversational chatbot with independent training and testing components",
      ],
    },
  ],

  // ── Certificates ──
  certificates: [
    {
      name: "AWS Solutions Architecture Forage",
      issuer: "Amazon Web Services / Forage",
      date: "2026",
      id: "AWS-SA-FORAGE",
    },
    {
      name: "Google IT Support Professional Certificate",
      issuer: "Google / Credly",
      date: "2026",
      id: "GOOGLE-IT-SUPPORT",
    },
    {
      name: "The Bits and Bytes of Computer Networking",
      issuer: "Coursera / Google",
      date: "2026",
      id: "GOOGLE-NETWORKING",
    },
    {
      name: "AWS Cloud Practitioner Certification",
      issuer: "Intellipaat",
      date: "2026",
      id: "AWS-CP-INTELLIPAAT",
    },
  ],

  // ── Achievements ──
  achievements: [
    {
      title: "Patent Granted",
      description:
        "Granted a patent for 'In-Display Fingerprint Mouse' (Design No. 434354-001)",
      date: "2026",
      icon: "🏆",
    },
    {
      title: "IEEE Ideathon Winner",
      description:
        "Secured 1st place in the IEEE Ideathon competition",
      date: "2026",
      icon: "🥇",
    },
    {
      title: "Published Author",
      description:
        "Authored and self-published 'WORDS FALLEN WRONG' via Pothi.com",
      date: "2025",
      icon: "📖",
    },
  ],

} as const;

export type Profile = typeof profile;