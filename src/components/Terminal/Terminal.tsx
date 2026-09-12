import React, {
  useState, useRef, useEffect, useCallback,
  KeyboardEvent, FormEvent,
} from "react";
import { profile } from "../../data/profile";

// ─── portfolio data ───────────────────────────────────────────────────────────
const portfolioProfile: typeof profile = {
  ...profile,
  name:       "Gaurav Sharad Bansod",
  education:  "B.Tech in Computer Science and Engineering",
  university: "VIT Bhopal University",
  role:       "Software Developer",

  projects: [
    {
      name: "NITIGATI – AI-Powered Freelance Service Marketplace",
      description: "Full-stack freelance marketplace built with Django REST Framework and Next.js 16 (TypeScript).",
      tech: [
        { name: "TypeScript", percent: 79.4 },
        { name: "Python",     percent: 20.4 },
        { name: "Other",      percent: 0.2  },
      ],
      link: "github.com/Gauravb741/NITIGATI",
    },
    {
      name: "GitOps Kubernetes Deployer",
      description: "Automated CI/CD pipeline using GitHub Actions with Trivy security scanning.",
      tech: [
        { name: "Shell",      percent: 41.3 },
        { name: "Python",     percent: 36.5 },
        { name: "CSS",        percent: 10.4 },
        { name: "HTML",       percent: 9.1  },
        { name: "Dockerfile", percent: 2.7  },
      ],
      link: "github.com/Gauravb741/gitops-kubernetes-deployer",
    },
    {
      name: "CAPE – Online Examination Management Platform",
      description: "Full-stack examination platform using Django REST Framework, React.js, and MongoDB.",
      tech: [
        { name: "TypeScript", percent: 46   },
        { name: "Python",     percent: 33.9 },
        { name: "Astro",      percent: 19.7 },
        { name: "JavaScript", percent: 0.4  },
      ],
      link: "github.com/Gauravb741/CAPE",
    },
    {
      name: "Online Examination & Proctoring System",
      description: "Desktop examination application built with Core Java and Java Swing.",
      tech: [{ name: "Java", percent: 100 }],
      link: "github.com/Gauravb741/Online-Examination-and-Proctoring-System",
    },
    {
      name: "Terraform AWS Infrastructure Automation",
      description: "Production-oriented modular AWS infrastructure provisioned with Terraform.",
      tech: [
        { name: "HCL",        percent: 62.6 },
        { name: "Shell",      percent: 29.1 },
        { name: "Python",     percent: 4.4  },
        { name: "Dockerfile", percent: 3.9  },
      ],
      link: "github.com/Gauravb741/tf-aws-infra",
    },
    {
      name: "Smart Retail AI – Retail Analytics Platform",
      description: "AI-powered retail analytics with Python, OpenCV, and scikit-learn.",
      tech: [
        { name: "Python",           percent: 61.9 },
        { name: "Jupyter Notebook", percent: 37.3 },
        { name: "Dockerfile",       percent: 0.8  },
      ],
      link: "github.com/Gauravb741/Smart_retail_AI_MajorProject_MPonline",
    },
  ],

  experience: [
    {
      role:     "Advanced Software Engineering & Development Intern",
      company:  "MPonline Ltd.",
      duration: "May 2026 – July 2026",
      points: [
        "Worked on enterprise software development and deployment workflows.",
        "Built a Library Management System in C# using the MVC pattern.",
        "Contributed to backend module development for enterprise ASP.NET web applications.",
      ],
    },
    {
      role:     "AI / ML Intern",
      company:  "MPonline Ltd.",
      duration: "May 2026 – July 2026",
      points: [
        "Worked with AI/ML datasets and developed machine learning models.",
        "Developed a Smart Customer Retail System in Python with churn prediction and sentiment analysis.",
        "Worked across data preprocessing, feature engineering, and model optimisation.",
      ],
    },
  ],

  certificates: [
    { name: "AWS Solutions Architecture",                 issuer: "Forage",           date: "—", id: "Forage",           url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_BH5gMFez324c74oJ7_1753364678966_completion_certificate.pdf" },
    { name: "Programming in Java",                        issuer: "VITyarthi",        date: "—", id: "VITyarthi",        url: "https://vityarthi.com/certificate/nCfmIK3hHprb" },
    { name: "Google IT Support Professional Certificate", issuer: "Google / Credly",  date: "—", id: "Google / Credly",  url: "https://www.credly.com/go/vCgmdZ5g" },
    { name: "The Bits and Bytes of Computer Networking",  issuer: "Coursera / Google",date: "—", id: "Coursera / Google",url: "https://coursera.org/verify/SIN5WMTHPVV7" },
    { name: "AWS Cloud Practitioner Certification",       issuer: "Intellipaat",      date: "—", id: "Intellipaat",      url: "https://drive.google.com/file/d/1HEdhZ75B9Mgi58osTsDl_SBNuwKCVkT7/view?usp=sharing" },
    { name: "Machine Learning",                           issuer: "NPTEL / IIT",      date: "—", id: "NPTEL / IIT",      url: "https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs46/Course/NPTEL25CS46S44090032604386642.pdf" },
  ],

  achievements: [
    { icon: "\u25c6", title: "Granted Patent \u2013 In-Display Fingerprint Mouse", date: "Design No. 434354-001", description: "Granted a patent for \u2018In-Display Fingerprint Mouse\u2019 (Design No. 434354-001)." },
    { icon: "\u2605", title: "1st Place \u2013 IEEE Ideathon",                     date: "IEEE Club",            description: "Secured 1st place in the IEEE Ideathon competition." },
    { icon: "\u2726", title: "Published Author \u2013 WORDS FALLEN WRONG",         date: "July 2025",            description: "Authored and self-published \u201cWORDS FALLEN WRONG\u201d through Pothi.com." },
  ],

  contactLinks: [
    { icon: "\u2709",  label: "Email",    value: "gauravbansod680@gmail.com",   href: "mailto:gauravbansod680@gmail.com" },
    { icon: "\u2318",  label: "GitHub",   value: "github.com/Gauravb741",       href: "https://github.com/Gauravb741" },
    { icon: "in",      label: "LinkedIn", value: "linkedin.com/in/gauravbansod", href: "https://linkedin.com/in/gauravbansod" },
    { icon: "\u260e",  label: "Phone",    value: "+91 9373497204",               href: "tel:+919373497204" },
  ],

  skills: [
    { category: "Languages",      items: ["Python", "Java", "Bash / Shell Scripting"] },
    { category: "Core Python",    items: ["OOP", "Data Structures & Algorithms"] },
    { category: "Core Java",      items: ["Collections Framework", "Exception Handling", "Multithreading"] },
    { category: "Web / API",      items: ["REST APIs", "Django", "Django REST Framework"] },
    { category: "Databases",      items: ["MySQL", "MongoDB", "JDBC"] },
    { category: "DevOps & Cloud", items: ["Docker","Kubernetes","Argo CD","GitHub Actions","Terraform","AWS","Linux","Git","GitHub","Prometheus","Ansible","Grafana"] },
    { category: "AI / ML",        items: ["Machine Learning","Computer Vision","Scikit-learn","Data Preprocessing"] },
  ],
};

// ─── types ────────────────────────────────────────────────────────────────────
interface Line {
  id:   number;
  type: "prompt" | "output" | "error" | "system" | "gap" | "visual";
  text: string;
  jsx?: React.ReactNode;
}
type Handler = (p: typeof profile) => string | React.ReactNode;

// ─── HUD Banner ──────────────────────────────────────────────────────────────
const HUD_BANNER_DATA = {
  portraitSrc:  "/assets/profile_image.png",
  portraitAlt:  "Profile portrait",
  stats:        [
    { label: "PROJECTS", value: "06" },
    { label: "COMMITS",  value: "245" },
    { label: "ACTIVE",   value: "2023\u201327" },
    { label: "GPA",      value: "7.86" },
  ],
  availability: "IMMEDIATE / FULL-TIME",
  stack:        ["Python","Java","Docker","Kubernetes","AWS"],
  division:     "SOFTWARE DEVELOPMENT / DEVOPS",
};

const ImagePortrait: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <img src={src} alt={alt} draggable={false} style={{
    display:"block", width:"100%", height:"100%",
    objectFit:"cover", objectPosition:"center",
    filter:"grayscale(1) contrast(1.16) brightness(0.86)",
    userSelect:"none",
  }} />
);

const HUDBanner: React.FC = () => {
  const [glitch,  setGlitch]  = useState(false);
  const [scanPos, setScanPos] = useState(0);
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => setScanPos(p => (p + 1.8) % 100), 35);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => {
    const iv = setInterval(() => {
      if (Math.random() < 0.13) { setGlitch(true); setTimeout(() => setGlitch(false), 55 + Math.random()*95); }
    }, 620);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => {
    const iv = setInterval(() => {
      if (Math.random() < 0.035) { setFlicker(true); setTimeout(() => setFlicker(false), 25); }
    }, 900);
    return () => clearInterval(iv);
  }, []);

  const FONT   = "'Consolas','Cascadia Code','Courier New',monospace";
  const fields = [
    { key:">EDU",        val: portfolioProfile.education   },
    { key:">LOC",        val: portfolioProfile.location    },
    { key:">TOUR START", val: portfolioProfile.issueDate   },
    { key:">TOUR END",   val: portfolioProfile.expiryDate  },
    { key:">AVAIL",      val: HUD_BANNER_DATA.availability },
    { key:">ROLE",       val: portfolioProfile.role        },
  ];

  return (
    <div style={{ position:"relative",width:"74.25%",maxWidth:"570px",minWidth:0,aspectRatio:"764 / 543",margin:"0 auto",background:"transparent",color:"#fff",fontFamily:FONT,overflow:"hidden",boxSizing:"border-box",opacity:flicker?0.72:1,transition:"opacity 0.025s linear",userSelect:"none" }}>
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden" }}>
        <div style={{ position:"absolute",width:"42%",height:"70%",left:"-9%",top:"18%",background:"rgba(0,255,170,0.045)",clipPath:"polygon(0 18%,58% 0,100% 35%,73% 100%,12% 82%)",transform:"rotate(-8deg)" }} />
        <div style={{ position:"absolute",width:"35%",height:"52%",right:"-7%",top:"-5%",background:"rgba(255,34,85,0.05)",clipPath:"polygon(28% 0,100% 17%,72% 100%,0 69%)",transform:"rotate(9deg)" }} />
        <div style={{ position:"absolute",inset:0,background:"repeating-linear-gradient(0deg,rgba(255,255,255,0.012) 0px,rgba(255,255,255,0.012) 1px,transparent 1px,transparent 4px)" }} />
      </div>
      <div style={{ position:"absolute",inset:"4% 2.8%",border:"1px solid rgba(255,255,255,0.18)",clipPath:"polygon(6% 0%,92% 0%,100% 11%,100% 89%,94% 100%,6% 100%,0 89%,0 11%)",background:"linear-gradient(135deg,rgba(255,255,255,0.025),rgba(0,0,0,0.08))",overflow:"hidden",zIndex:1 }}>
        {/* header */}
        <div style={{ position:"absolute",left:"4%",right:"4%",top:"5%",height:"10%",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display:"flex",alignItems:"center",gap:"10px" }}>
            <div style={{ width:"25px",height:"25px",border:"1px solid rgba(0,255,170,0.35)",display:"grid",placeItems:"center",transform:"rotate(45deg)",flexShrink:0 }}>
              <div style={{ width:"8px",height:"8px",border:"1px solid rgba(255,255,255,0.75)",transform:"rotate(-45deg)" }} />
            </div>
            <div>
              <div style={{ fontSize:"9px",color:"rgba(255,255,255,0.9)",letterSpacing:"2.6px",fontWeight:800 }}>DEV PORTFOLIO</div>
              <div style={{ fontSize:"5.5px",color:"rgba(0,255,170,0.5)",letterSpacing:"1.3px",marginTop:"3px" }}>PERSONAL REPRESENTATION / DIGITAL ID</div>
            </div>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:"5px" }}>
            <span style={{ width:"7px",height:"7px",borderRadius:"50%",border:"1px solid rgba(255,34,85,0.65)",background:"rgba(255,34,85,0.45)" }} />
            <span style={{ fontSize:"5px",color:"rgba(255,255,255,0.28)",letterSpacing:"0.9px" }}>LIVE PROFILE</span>
          </div>
        </div>
        {/* portrait */}
        <div style={{ position:"absolute",left:"4%",top:"19%",width:"24.5%",height:"59%" }}>
          <div style={{ display:"flex",justifyContent:"space-between",fontSize:"5px",color:"rgba(255,255,255,0.3)",letterSpacing:"1px",marginBottom:"5px" }}>
            <span>VISUAL ID</span><span>01 / 01</span>
          </div>
          <div style={{ position:"relative",height:"calc(100% - 15px)",border:"1px solid rgba(255,255,255,0.17)",overflow:"hidden",background:"rgba(0,0,0,0.12)" }}>
            <ImagePortrait src={HUD_BANNER_DATA.portraitSrc} alt={HUD_BANNER_DATA.portraitAlt} />
            <div style={{ position:"absolute",inset:0,background:"repeating-linear-gradient(0deg,transparent 0px,transparent 3px,rgba(0,0,0,0.32) 4px)",pointerEvents:"none" }} />
            <div style={{ position:"absolute",left:0,right:0,top:`${scanPos}%`,height:"1px",background:"rgba(0,255,170,0.5)",boxShadow:"0 0 9px rgba(0,255,170,0.25)" }} />
            {glitch && [18,31,52,67].map((top,i) => (
              <div key={i} style={{ position:"absolute",left:`${10+i*7}%`,width:`${25+i*7}%`,top:`${top}%`,height:i%2===0?"2px":"1px",background:i%2===0?"rgba(255,34,85,0.65)":"rgba(0,255,170,0.55)",transform:`translateX(${i%2===0?"-5px":"7px"})` }} />
            ))}
          </div>
          <div style={{ marginTop:"9px",height:"22px",display:"flex",alignItems:"flex-end",gap:"1.5px",opacity:0.42 }}>
            {Array.from({length:46}).map((_,i) => (
              <div key={i} style={{ width:i%5===0?"2px":"1px",height:`${5+Math.abs(Math.sin(i*1.7)*16)}px`,background:"#fff" }} />
            ))}
          </div>
          <div style={{ fontSize:"4.5px",color:"rgba(255,255,255,0.2)",letterSpacing:"0.8px",marginTop:"3px" }}>{portfolioProfile.cardSerial}</div>
        </div>
        {/* identity */}
        <div style={{ position:"absolute",left:"35%",right:"4%",top:"19%",bottom:"9%" }}>
          <div style={{ fontSize:"clamp(15px,3.35vw,22px)",lineHeight:1.05,fontWeight:700,letterSpacing:"clamp(1px,0.45vw,4px)",color:"rgba(255,255,255,0.94)",whiteSpace:"nowrap",textShadow:glitch?"2px 0 rgba(255,34,85,0.3),-2px 0 rgba(0,255,170,0.25)":"none" }}>
            {portfolioProfile.name.toUpperCase()}
          </div>
          <div style={{ fontSize:"6px",color:"rgba(0,255,170,0.52)",letterSpacing:"1.8px",marginTop:"6px",marginBottom:"13px" }}>[ {portfolioProfile.role.toUpperCase()} ]</div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",border:"1px solid rgba(255,255,255,0.11)",marginBottom:"13px",background:"rgba(255,255,255,0.015)" }}>
            {HUD_BANNER_DATA.stats.map((stat,i) => (
              <div key={stat.label} style={{ height:"43px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRight:i<3?"1px solid rgba(255,255,255,0.08)":"none" }}>
                <div style={{ fontSize:"15px",lineHeight:1,color:"rgba(255,255,255,0.9)",letterSpacing:"1px" }}>{stat.value}</div>
                <div style={{ fontSize:"5px",color:"rgba(255,255,255,0.34)",letterSpacing:"0.9px",marginTop:"4px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:"6px" }}>
            {fields.map(field => (
              <div key={field.key} style={{ display:"grid",gridTemplateColumns:"78px 1fr",alignItems:"baseline",fontSize:"6.5px",lineHeight:1.35 }}>
                <span style={{ color:"rgba(255,255,255,0.27)",letterSpacing:"0.7px" }}>{field.key}</span>
                <span style={{ color:"rgba(255,255,255,0.68)",letterSpacing:"0.45px",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis" }}>{field.val}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex",gap:"5px",flexWrap:"wrap",marginTop:"9px" }}>
            {HUD_BANNER_DATA.stack.map((tag,i) => (
              <span key={tag} style={{ border:`1px solid ${i%2===0?"rgba(0,255,170,0.18)":"rgba(255,34,85,0.15)"}`,padding:"2px 5px",fontSize:"5px",color:"rgba(255,255,255,0.52)",background:"rgba(255,255,255,0.012)" }}>{tag}</span>
            ))}
          </div>
        </div>
        <div style={{ position:"absolute",right:"4.5%",bottom:"5%",fontSize:"44px",lineHeight:0.8,fontWeight:900,letterSpacing:"-3px",color:"rgba(255,255,255,0.035)" }}>DEV</div>
        {glitch && [
          { top:"18.5%",left:"3.8%", width:"17%" },
          { top:"31.8%",left:"31.5%",width:"10%" },
          { top:"45.2%",left:"72%",  width:"17%" },
          { top:"68.4%",left:"5%",   width:"13%" },
          { top:"82.8%",left:"47%",  width:"19%" },
        ].map((g,i) => (
          <div key={i} style={{ position:"absolute",top:g.top,left:g.left,width:g.width,height:i%2===0?"2px":"1px",background:i%2===0?"rgba(255,34,85,0.55)":"rgba(0,255,170,0.5)",transform:`translateX(${i%2===0?"-7px":"5px"})`,pointerEvents:"none",zIndex:30 }} />
        ))}
        <div style={{ position:"absolute",left:0,right:0,top:`${scanPos}%`,height:"1px",background:"rgba(255,255,255,0.025)",pointerEvents:"none",zIndex:40 }} />
      </div>
    </div>
  );
};

// ─── SegBar ───────────────────────────────────────────────────────────────────
const TOTAL_SEGS = 75;
const SegBar: React.FC<{ name: string; percent: number; delay?: number }> = ({ name, percent, delay = 0 }) => {
  const [displayed, setDisplayed] = useState(0);
  const [glitched,  setGlitched]  = useState<Set<number>>(new Set());
  useEffect(() => {
    const t = setTimeout(() => {
      let cur = 0;
      const step = setInterval(() => {
        cur += Math.ceil(percent / 18);
        if (cur >= percent) { cur = percent; clearInterval(step); }
        setDisplayed(cur);
      }, 28);
      return () => clearInterval(step);
    }, delay);
    return () => clearTimeout(t);
  }, [percent, delay]);
  useEffect(() => {
    const iv = setInterval(() => {
      if (Math.random() < 0.12) {
        const fc = Math.round((displayed / 100) * TOTAL_SEGS);
        if (!fc) return;
        const picks = new Set<number>();
        picks.add(Math.floor(Math.random() * fc));
        if (Math.random() < 0.4) picks.add(Math.floor(Math.random() * fc));
        setGlitched(picks);
        setTimeout(() => setGlitched(new Set()), 50 + Math.random() * 100);
      }
    }, 150);
    return () => clearInterval(iv);
  }, [displayed]);
  const filled = Math.round((displayed / 100) * TOTAL_SEGS);
  return (
    <div style={{ display:"flex",alignItems:"center",gap:"10px",padding:"2px 0",fontFamily:"inherit" }}>
      <span style={{ color:"rgba(200,200,200,0.85)",width:"82px",flexShrink:0,fontSize:"11px" }}>{name}</span>
      <div style={{ display:"flex",gap:"2px",alignItems:"center" }}>
        {Array.from({ length: TOTAL_SEGS }).map((_,i) => {
          const isFilled = i < filled;
          const isGlitch = glitched.has(i);
          return (
            <div key={i} style={{ width:5,height:12,background:isFilled&&!isGlitch?`rgba(255,255,255,${0.25+(percent/100)*0.70})`:isFilled&&isGlitch?"rgba(255,255,255,0.08)":"rgba(255,255,255,0.07)",borderRadius:"1px",transition:isGlitch?"none":"background 0.06s",flexShrink:0 }} />
          );
        })}
      </div>
      <span style={{ color:"rgba(210,210,210,0.8)",fontSize:"11px",width:"34px",textAlign:"right",flexShrink:0 }}>
        {Number.isInteger(percent) ? displayed : displayed.toFixed(1)}%
      </span>
    </div>
  );
};

// ─── BG ──────────────────────────────────────────────────────────────────────
const BG_STYLE: React.CSSProperties = {
  background: "linear-gradient(145deg,#1a1a1a 0%,#141414 50%,#1a1a1a 100%)",
};
const BgOverlay: React.FC = () => (
  <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent 0px,transparent 9px,rgba(255,255,255,0.012) 9px,rgba(255,255,255,0.012) 10px)",pointerEvents:"none",zIndex:0 }} />
);

// ─── Skills Roadmap ───────────────────────────────────────────────────────────
const SkillsRoadmap: React.FC<{ p: typeof profile }> = ({ p }) => {
  const cats = p.skills as unknown as { category: string; items: string[] }[];
  const [selected, setSelected] = useState<{ category: string; item: string } | null>(null);
  const FONT = "'Consolas','Cascadia Code','Courier New',monospace";
  const W = 760, TOP = 24, ROW_GAP = 16, MIN_ROW_H = 108;
  const rowCount   = Math.ceil(cats.length / 2);
  const rowHeights = Array.from({ length: rowCount }, (_,row) => {
    const l = cats[row*2]; const r = cats[row*2+1];
    return Math.max(MIN_ROW_H, 38 + Math.max(l?.items.length??0, r?.items.length??0) * 18);
  });
  const H  = TOP*2 + rowHeights.reduce((s,h) => s+h, 0) + ROW_GAP*Math.max(0,rowCount-1);
  const CX = W/2, CY = H/2;
  const selCat      = selected ? cats.find(c => c.category === selected.category) : null;
  const relatedItems = selCat ? selCat.items.filter(i => i !== selected?.item).slice(0,5) : [];
  const getLayout = (idx: number) => {
    const row = Math.floor(idx/2); const isLeft = idx%2===0;
    let rowTop = TOP;
    for (let i = 0; i < row; i++) rowTop += rowHeights[i] + ROW_GAP;
    const nodeOffsetY = cats[idx]?.category === "AI / ML" ? 10 : 0;
    return { isLeft, nodeX:isLeft?250:510, nodeY:rowTop+22+nodeOffsetY, contentX:isLeft?18:528, contentWidth:214, rowTop };
  };
  const branchPath = (x: number, y: number) => {
    const dx = x-CX; const endX = x - Math.sign(dx)*6;
    return `M ${CX} ${CY} C ${CX+dx*0.32} ${CY}, ${CX+dx*0.72} ${y}, ${endX} ${y}`;
  };
  return (
    <div style={{ padding:"4px 14px 10px",fontFamily:FONT }}>
      <div style={{ fontSize:"10px",color:"rgba(180,180,180,0.7)",marginBottom:"8px" }}>$ skills --roadmap</div>
      <div style={{ display:"flex",gap:"12px",alignItems:"flex-start" }}>
        <div style={{ flex:1,minWidth:0,overflowX:"auto" }}>
          <div style={{ position:"relative",width:W,height:H,minWidth:W,background:"rgba(255,255,255,0.008)",overflow:"hidden" }}>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position:"absolute",inset:0,display:"block",pointerEvents:"none",zIndex:1 }}>
              {cats.map((_,idx) => { const l=getLayout(idx); return <path key={idx} d={branchPath(l.nodeX,l.nodeY)} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />; })}
              <circle cx={CX} cy={CY} r="25" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
              <circle cx={CX} cy={CY} r="14" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.70)" strokeWidth="1.5" />
              <circle cx={CX} cy={CY} r="5"  fill="rgba(255,255,255,0.90)" />
              <text x={CX} y={CY+38} fill="rgba(255,255,255,0.55)" fontSize="8" fontFamily={FONT} textAnchor="middle" letterSpacing="2">CORE</text>
            </svg>
            {cats.map((cat,idx) => {
              const layout = getLayout(idx);
              return (
                <div key={idx} style={{ position:"absolute",left:layout.contentX,top:layout.rowTop,width:layout.contentWidth,zIndex:2 }}>
                  <div style={{ height:"27px",display:"flex",alignItems:"center",justifyContent:layout.isLeft?"flex-end":"flex-start" }}>
                    <div style={{ maxWidth:"190px",fontSize:"10px",color:"rgba(255,255,255,0.92)",fontWeight:600,textAlign:layout.isLeft?"right":"left",overflowWrap:"anywhere" }}>{">"} {cat.category}</div>
                  </div>
                  <div style={{ marginTop:"6px",display:"flex",flexDirection:"column",gap:"3px" }}>
                    {cat.items.map((item,ii) => {
                      const isSel = selected?.category===cat.category && selected?.item===item;
                      return (
                        <div key={ii} onClick={() => setSelected(isSel?null:{category:cat.category,item})} style={{ display:"flex",alignItems:"flex-start",flexDirection:layout.isLeft?"row-reverse":"row",gap:"7px",cursor:"pointer" }}>
                          <span style={{ width:ii===0?9:6,height:ii===0?9:6,marginTop:3,borderRadius:"50%",flexShrink:0,boxSizing:"border-box",background:isSel?"rgba(255,255,255,0.55)":ii===0?"rgba(255,255,255,0.10)":"transparent",border:isSel?"1px solid #fff":ii===0?"1px solid rgba(255,255,255,0.70)":"1px solid rgba(255,255,255,0.35)" }} />
                          <span style={{ flex:1,fontSize:ii===0?"10px":"9px",lineHeight:"14px",color:isSel?"#ffffff":ii===0?"rgba(255,255,255,0.92)":"rgba(220,220,220,0.75)",fontWeight:ii===0?600:400,textAlign:layout.isLeft?"right":"left",overflowWrap:"anywhere" }}>{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {cats.map((_,idx) => { const l=getLayout(idx); return <div key={idx} style={{ position:"absolute",left:l.nodeX-5.5,top:l.nodeY-5.5,width:11,height:11,borderRadius:"50%",boxSizing:"border-box",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.65)",zIndex:3,pointerEvents:"none" }} />; })}
          </div>
        </div>
        <div style={{ width:"145px",flexShrink:0 }}>
          <div style={{ fontSize:"8px",color:"rgba(180,180,180,0.65)",letterSpacing:"1px",marginBottom:"6px" }}>{selected?"SELECTED":"FEATURED SKILL"}</div>
          {selected ? (
            <div style={{ border:"1px solid rgba(255,255,255,0.08)",padding:"8px",background:"rgba(255,255,255,0.02)" }}>
              <div style={{ fontSize:"8px",color:"rgba(180,180,180,0.65)",marginBottom:"3px",textTransform:"uppercase" }}>{selected.category}</div>
              <div style={{ fontSize:"13px",color:"rgba(255,255,255,0.92)",marginBottom:"8px",overflowWrap:"anywhere" }}>{selected.item}</div>
              <div style={{ height:"1px",background:"rgba(255,255,255,0.06)",marginBottom:"8px" }} />
              {relatedItems.length > 0 && (<>
                <div style={{ fontSize:"8px",color:"rgba(180,180,180,0.65)",marginBottom:"4px" }}>RELATED</div>
                {relatedItems.map((rel,ri) => (
                  <div key={ri} style={{ fontSize:"9px",color:"rgba(200,200,200,0.7)",marginBottom:"3px",paddingLeft:"10px",position:"relative",overflowWrap:"anywhere" }}>
                    <span style={{ position:"absolute",left:0,color:"rgba(180,180,180,0.5)" }}>{">"}</span>{rel}
                  </div>
                ))}
              </>)}
              <div style={{ marginTop:"8px",fontSize:"8px",color:"rgba(160,160,160,0.5)" }}>click to deselect</div>
            </div>
          ) : (
            <div style={{ border:"1px solid rgba(255,255,255,0.06)",padding:"8px",background:"rgba(255,255,255,0.02)" }}>
              <div style={{ fontSize:"10px",color:"rgba(180,180,180,0.55)",lineHeight:"1.6" }}>Click any node to see details.</div>
            </div>
          )}
          <div style={{ marginTop:"10px",fontSize:"8px",color:"rgba(160,160,160,0.55)" }}>
            {cats.length} categories<br />{cats.reduce((a,c) => a+c.items.length, 0)} technologies
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Contact ──────────────────────────────────────────────────────────────────
const ContactVisual: React.FC<{ p: typeof profile }> = ({ p }) => {
  const links = p.contactLinks as unknown as { icon:string;label:string;value:string;href:string }[];
  return (
    <div style={{ padding:"2px 14px",fontFamily:"inherit" }}>
      <div style={{ fontSize:"10px",color:"rgba(180,180,180,0.65)",marginBottom:"10px" }}>$ contact --list</div>
      {links.map((lnk,i) => (
        <div key={i} style={{ display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px",padding:"7px 10px",background:"rgba(255,255,255,0.02)",borderLeft:"1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ fontSize:"16px",color:"rgba(255,255,255,0.5)",flexShrink:0,width:"20px",textAlign:"center" }}>{lnk.icon}</span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:"9px",color:"rgba(180,180,180,0.65)",letterSpacing:"0.8px",marginBottom:"2px" }}>{lnk.label.toUpperCase()}</div>
            <a href={lnk.href} target="_blank" rel="noreferrer" style={{ fontSize:"12px",color:"#38d9a9",textDecoration:"none" }}>{lnk.value}</a>
          </div>
          <span style={{ fontSize:"11px",color:"rgba(180,180,180,0.55)",flexShrink:0 }}>{"\u2197"}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Projects ─────────────────────────────────────────────────────────────────
const ProjectsVisual: React.FC<{ p: typeof profile }> = ({ p }) => (
  <div style={{ padding:"4px 14px" }}>
    {p.projects.map((proj,pi) => (
      <div key={pi} style={{ marginBottom:"18px" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"12px",marginBottom:"7px",paddingBottom:"5px",borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ fontSize:"13px",color:"#f2f5f7",fontWeight:700 }}>{proj.name}</span>
          <span style={{ fontSize:"10px",whiteSpace:"nowrap",flexShrink:0,color:"rgba(225,225,225,0.72)" }}>{(proj as any).year ?? ""}</span>
        </div>
        <div style={{ fontSize:"10.5px",color:"rgba(220,220,220,0.86)",lineHeight:"1.55",marginBottom:"8px",paddingLeft:"2px" }}>
          {proj.description}
        </div>
        <div style={{ fontSize:"9px",color:"rgba(185,185,185,0.66)",letterSpacing:"0.9px",marginBottom:"4px" }}>TECH STACK // PROJECT WEIGHT</div>
        <div style={{ paddingLeft:"2px" }}>
          {proj.tech.map((t,ti) => <SegBar key={ti} name={t.name} percent={t.percent} delay={pi*100+ti*70} />)}
        </div>
        <a href={`https://${proj.link}`} target="_blank" rel="noreferrer"
          style={{ display:"flex",alignItems:"center",gap:"8px",marginTop:"8px",padding:"7px 9px",color:"#38d9a9",textDecoration:"none",fontSize:"13px",fontWeight:700,border:"1px solid rgba(255,255,255,0.24)",background:"rgba(255,255,255,0.055)",wordBreak:"break-all" }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.11)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.055)"; }}>
          <span style={{ fontSize:"15px" }}>{"\u2197"}</span>
          <span style={{ textDecoration:"underline",textUnderlineOffset:"3px" }}>{proj.link}</span>
        </a>
        {pi < p.projects.length-1 && <div style={{ marginTop:"12px",borderTop:"1px solid rgba(255,255,255,0.07)" }} />}
      </div>
    ))}
  </div>
);

const ExperienceVisual: React.FC<{ p: typeof profile }> = ({ p }) => (
  <div style={{ padding:"2px 14px" }}>
    {p.experience.map((exp,ei) => (
      <div key={ei} style={{ marginBottom:"14px" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"1px" }}>
          <span style={{ fontSize:"12px",color:"#e6edf3" }}>{exp.role}</span>
          <span style={{ fontSize:"10px",color:"rgba(180,180,180,0.7)" }}>{exp.duration}</span>
        </div>
        <div style={{ fontSize:"11px",color:"#58a6ff",marginBottom:"6px",paddingLeft:"2px" }}>@ {exp.company}</div>
        {exp.points.map((pt,pti) => (
          <div key={pti} style={{ fontSize:"11px",color:"rgba(200,200,200,0.82)",lineHeight:"1.6",paddingLeft:"14px",position:"relative",marginBottom:"3px" }}>
            <span style={{ position:"absolute",left:0,color:"rgba(160,160,160,0.6)" }}>{"\u25b8"}</span>{pt}
          </div>
        ))}
        {ei < p.experience.length-1 && <div style={{ marginTop:"10px",borderTop:"1px solid rgba(255,255,255,0.05)" }} />}
      </div>
    ))}
  </div>
);

const CertificatesVisual: React.FC<{ p: typeof profile }> = ({ p }) => (
  <div style={{ padding:"2px 14px" }}>
    {p.certificates.map((cert,ci) => (
      <div key={ci} style={{ marginBottom:"12px" }}>
        <div style={{ fontSize:"12px",color:"#e6edf3" }}>
          <a href={cert.url} target="_blank" rel="noreferrer" style={{ color:"#38d9a9",textDecoration:"none" }}>{cert.name}</a>
        </div>
        <div style={{ fontSize:"11px",color:"rgba(200,200,200,0.75)",paddingLeft:"2px",marginTop:"2px" }}>{cert.issuer} {"\u00b7"} {cert.date} {"\u00b7"} ID: {cert.id}</div>
        {ci < p.certificates.length-1 && <div style={{ marginTop:"8px",borderTop:"1px solid rgba(255,255,255,0.05)" }} />}
      </div>
    ))}
  </div>
);

const AchievementsVisual: React.FC<{ p: typeof profile }> = ({ p }) => (
  <div style={{ padding:"2px 14px" }}>
    {p.achievements.map((ach,ai) => (
      <div key={ai} style={{ marginBottom:"12px" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline" }}>
          <span style={{ fontSize:"12px",color:"#e6edf3" }}>{ach.icon} {ach.title}</span>
          <span style={{ fontSize:"10px",color:"rgba(180,180,180,0.7)" }}>{ach.date}</span>
        </div>
        <div style={{ fontSize:"11px",color:"rgba(200,200,200,0.82)",lineHeight:"1.55",paddingLeft:"2px",marginTop:"3px" }}>{ach.description}</div>
        {ai < p.achievements.length-1 && <div style={{ marginTop:"8px",borderTop:"1px solid rgba(255,255,255,0.05)" }} />}
      </div>
    ))}
  </div>
);

// ─── Commands ─────────────────────────────────────────────────────────────────
const COMMANDS: Record<string, Handler> = {
  whoami: (p) => [
    `  ${p.name}`,`  ${"\u2500".repeat(Math.min(p.name.length+2,38))}`,
    `  A passionate ${p.role} pursuing`,`  ${p.education} at ${p.university}.`,``,
    `  Building modern digital experiences with clean code and thoughtful design.`,``,
    `  Currently based in ${p.location}.`,``,
    `  Name       :  ${p.name}`,`  Role       :  ${p.role}`,
    `  Education  :  ${p.education}`,`  University :  ${p.university}`,
    `  Location   :  ${p.location}`,`  Dev ID     :  ${p.developerId}`,
    `  Serial     :  ${p.cardSerial}`,`  Issued     :  ${p.issueDate}`,`  Expires    :  ${p.expiryDate}`,
  ].join("\n"),

  help: () => [
    "","        \u256d\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256e",
    "        \u2502         PORTFOLIO // HELP              \u2502",
    "        \u2502         navigation interface           \u2502",
    "        \u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256f","",
    "  \u25c9 IDENTITY","  \u2502","  \u2514\u2500 whoami          identity, profile & about me","",
    "  \u25c9 EXPLORE","  \u2502",
    "  \u251c\u2500 projects        projects & technologies",
    "  \u251c\u2500 experience      work experience",
    "  \u251c\u2500 skills          interactive skill roadmap",
    "  \u251c\u2500 certificates    certifications",
    "  \u2514\u2500 achievements    achievements","",
    "  \u25c9 CONNECT","  \u2502","  \u2514\u2500 contact         contact & social links","",
    "  \u25c9 SYSTEM","  \u2502",
    "  \u251c\u2500 banner          show HUD banner",
    "  \u251c\u2500 clear           clear terminal",
    "  \u2514\u2500 help            show this menu","",
    "       \u2022 ONLINE       v1.0","",
    "       \u2191 \u2193 navigate   \u21b5 execute","",
  ].join("\n"),

  projects:     (p) => <ProjectsVisual     p={p} />,
  experience:   (p) => <ExperienceVisual   p={p} />,
  certificates: (p) => <CertificatesVisual p={p} />,
  achievements: (p) => <AchievementsVisual p={p} />,
  skills:       (p) => <SkillsRoadmap      p={p} />,
  contact:      (p) => <ContactVisual      p={p} />,
  banner:       ()  => "__BANNER__",
  clear:        ()  => "__CLEAR__",
};

const ALL_CMDS    = Object.keys(COMMANDS);
const PROMPT_USER = portfolioProfile.name.toLowerCase().split(" ")[0];
const PROMPT_HOST = "portfolio";

let uid = 0;
const mkLine = (type: Line["type"], text: string, jsx?: React.ReactNode): Line =>
  ({ id: uid++, type, text, jsx });

// ─── Terminal ─────────────────────────────────────────────────────────────────
export const Terminal: React.FC<{ onCommand: (cmd: string) => void }> = ({ onCommand }) => {
  const [lines,   setLines]   = useState<Line[]>([
    mkLine("visual","",<HUDBanner />),
    mkLine("gap",""),
    mkLine("system",`  Initializing portfolio system...`),
    mkLine("system",`  Logged in as: guest@${PROMPT_HOST}`),
    mkLine("gap",""),
    mkLine("output",`  Type 'help' to see all commands.`),
    mkLine("output",`  Try: whoami  projects  experience  skills`),
    mkLine("gap",""),
  ]);
  const [input,   setInput]   = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [blink,   setBlink]   = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => { const t = setInterval(() => setBlink(b => !b), 520); return () => clearInterval(t); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [lines]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  // ── shared command runner (typed input + nav button events both use this) ──
  const runCommand = useCallback((raw: string) => {
    const cmd     = raw.trim().toLowerCase();
    if (!cmd) return;
    const handler = COMMANDS[cmd];
    if (!handler) {
      setLines(prev => [
        ...prev,
        mkLine("prompt", cmd),
        mkLine("error",  `  bash: ${cmd}: command not found`),
        mkLine("error",  `  Type 'help' for available commands.`),
        mkLine("gap",    ""),
      ]);
    } else {
      const out = handler(portfolioProfile);
      if (out === "__CLEAR__") {
        setLines([mkLine("system","  Terminal cleared."), mkLine("gap","")]);
      } else if (out === "__BANNER__") {
        setLines(prev => [...prev, mkLine("prompt",cmd), mkLine("visual","",<HUDBanner />), mkLine("gap","")]);
      } else if (typeof out === "string") {
        setLines(prev => [...prev, mkLine("prompt",cmd), mkLine("output",out), mkLine("gap","")]);
      } else {
        setLines(prev => [...prev, mkLine("prompt",cmd), mkLine("visual","",out as React.ReactNode), mkLine("gap","")]);
      }
      onCommand(cmd);
    }
    setHistory(h => [cmd, ...h.slice(0,99)]);
    setHistIdx(-1);
  }, [onCommand]);

  // ── listen for events fired by IDCard3D nav buttons ──
  useEffect(() => {
    const handler = (e: Event) => {
      const cmd = (e as CustomEvent<string>).detail;
      if (cmd) {
        runCommand(cmd);
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior:"smooth" }), 80);
      }
    };
    window.addEventListener("portfolio-nav", handler);
    return () => window.removeEventListener("portfolio-nav", handler);
  }, [runCommand]);

  const submit = useCallback((e: FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  }, [input, runCommand]);

  const onKey = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(histIdx+1, history.length-1);
      setHistIdx(i); setInput(history[i] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = Math.max(histIdx-1, -1);
      setHistIdx(i); setInput(i===-1 ? "" : (history[i] ?? ""));
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = ALL_CMDS.find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  }, [histIdx, history, input]);

  const lineColour = (t: Line["type"]) =>
    t==="error" ? "#f85149" : t==="system" ? "#6e7681" : "#c9d1d9";

  const FONT = "'Consolas','Cascadia Code','Courier New',monospace";

  return (
    <div style={{ width:"100%",height:"100%",display:"flex",flexDirection:"column",position:"relative",...BG_STYLE,fontFamily:FONT,overflow:"hidden" }}
      onClick={() => inputRef.current?.focus()}>
      <BgOverlay />
      {/* title bar */}
      <div style={{ display:"flex",alignItems:"center",padding:"9px 14px",background:"rgba(0,0,0,0.35)",borderBottom:"1px solid rgba(255,255,255,0.06)",flexShrink:0,gap:"10px",position:"relative",zIndex:1 }}>
        <div style={{ display:"flex",gap:"6px" }}>
          {["#ff5f57","#ffbd2e","#28c940"].map((c,i) => <div key={i} style={{ width:11,height:11,borderRadius:"50%",background:c }} />)}
        </div>
        <div style={{ flex:1,display:"flex",justifyContent:"center" }}>
          <span style={{ fontSize:"11px",color:"rgba(255,255,255,0.25)" }}>{PROMPT_USER}@{PROMPT_HOST}: ~</span>
        </div>
        <span style={{ fontSize:"9px",color:"#2ecc71",border:"1px solid #1a5c34",padding:"1px 7px",borderRadius:"3px",background:"rgba(46,204,113,0.05)" }}>bash</span>
      </div>
      {/* output */}
      <div style={{ flex:1,overflowY:"auto",padding:"12px 0 6px",scrollbarWidth:"thin",scrollbarColor:"rgba(255,255,255,0.08) transparent",position:"relative",zIndex:1 }}>
        {lines.map(l => {
          if (l.type==="gap")    return <div key={l.id} style={{ height:"5px" }} />;
          if (l.type==="visual") return <div key={l.id} style={{ margin:"3px 0" }}>{l.jsx}</div>;
          if (l.type==="prompt") return (
            <div key={l.id} style={{ display:"flex",alignItems:"center",padding:"1px 0",lineHeight:"1.5" }}>
              <span style={{ color:"#2ecc71",fontSize:"12px",paddingLeft:"14px",flexShrink:0 }}>{PROMPT_USER}</span>
              <span style={{ color:"rgba(255,255,255,0.25)",fontSize:"12px" }}>@</span>
              <span style={{ color:"#58a6ff",fontSize:"12px" }}>{PROMPT_HOST}</span>
              <span style={{ color:"rgba(255,255,255,0.25)",fontSize:"12px" }}>:~$&nbsp;</span>
              <span style={{ color:"#e6edf3",fontSize:"12px" }}>{l.text}</span>
            </div>
          );
          return <pre key={l.id} style={{ margin:0,padding:"0.5px 14px",fontSize:"12px",lineHeight:"1.65",color:lineColour(l.type),whiteSpace:"pre",fontFamily:"inherit",overflowX:"auto" }}>{l.text}</pre>;
        })}
        {/* live prompt */}
        <div style={{ display:"flex",alignItems:"center",padding:"1px 0",lineHeight:"1.5" }}>
          <span style={{ color:"#2ecc71",fontSize:"12px",paddingLeft:"14px",flexShrink:0 }}>{PROMPT_USER}</span>
          <span style={{ color:"rgba(255,255,255,0.25)",fontSize:"12px" }}>@</span>
          <span style={{ color:"#58a6ff",fontSize:"12px" }}>{PROMPT_HOST}</span>
          <span style={{ color:"rgba(255,255,255,0.25)",fontSize:"12px" }}>:~$&nbsp;</span>
          <span style={{ color:"#e6edf3",fontSize:"12px" }}>{input}</span>
          <span style={{ display:"inline-block",width:"7px",height:"14px",background:blink?"#e6edf3":"transparent",verticalAlign:"middle",marginLeft:"1px" }} />
        </div>
        <div ref={bottomRef} />
      </div>
      {/* hidden form */}
      <form onSubmit={submit} style={{ position:"absolute",opacity:0,pointerEvents:"none",bottom:30,zIndex:0 }}>
        <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey}
          autoComplete="off" autoCapitalize="off" spellCheck={false} style={{ position:"absolute",opacity:0,width:1 }} />
      </form>
      {/* status bar */}
      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"5px 14px",background:"rgba(0,0,0,0.35)",borderTop:"1px solid rgba(255,255,255,0.06)",flexShrink:0,position:"relative",zIndex:1 }}>
        <div style={{ display:"flex",gap:"14px" }}>
          <Stat dot="#2ecc71" label="READY" />
          <Stat dot="#58a6ff" label={portfolioProfile.role.toUpperCase()} />
        </div>
        <div style={{ display:"flex",gap:"14px" }}>
          <Stat dot="#30363d" label="UTF-8" />
          <Stat dot="#30363d" label="bash" />
          <Stat dot="#30363d" label={portfolioProfile.location} />
        </div>
      </div>
    </div>
  );
};

const Stat: React.FC<{ dot: string; label: string }> = ({ dot, label }) => (
  <div style={{ display:"flex",alignItems:"center",gap:"5px" }}>
    <div style={{ width:6,height:6,borderRadius:"50%",background:dot }} />
    <span style={{ fontSize:"9px",color:"rgba(255,255,255,0.2)",letterSpacing:"0.6px" }}>{label}</span>
  </div>
);