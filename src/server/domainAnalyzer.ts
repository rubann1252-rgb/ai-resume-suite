export interface DomainProfile {
  domainName: string;
  coreKeywords: string[];
  recommendedSkills: string[];
  certifications: {
    title: string;
    provider: string;
    description: string;
    url: string;
    relevance: "High" | "Medium";
  }[];
}

const DOMAIN_PROFILES: Record<string, DomainProfile> = {
  cybersecurity: {
    domainName: "Cybersecurity & Information Security",
    coreKeywords: [
      "Network Security", "SIEM & SOC Monitoring", "Penetration Testing", "Vulnerability Management",
      "Incident Response", "Firewalls & VPNs", "Threat Intelligence", "ISO 27001 & Compliance",
      "Wireshark", "Identity & Access Management (IAM)", "Encryption Protocols", "CompTIA Security+",
      "Ethical Hacking", "Zero Trust Architecture"
    ],
    recommendedSkills: ["Wireshark", "Splunk / SIEM", "Metasploit", "IAM", "CISSP", "Firewalls", "Incident Response"],
    certifications: [
      {
        title: "CompTIA Security+",
        provider: "CompTIA",
        description: "Foundational cybersecurity certification validating core security principles, threat analysis, and risk management.",
        url: "https://www.comptia.org/certifications/security",
        relevance: "High"
      },
      {
        title: "Certified Information Systems Security Professional (CISSP)",
        provider: "ISC2",
        description: "The gold standard credential for security managers, architects, and cybersecurity leaders.",
        url: "https://www.isc2.org/certifications/cissp",
        relevance: "High"
      },
      {
        title: "Certified Ethical Hacker (CEH)",
        provider: "EC-Council",
        description: "Validates hands-on ethical hacking, penetration testing, and security auditing expertise.",
        url: "https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/",
        relevance: "High"
      }
    ]
  },
  cloud: {
    domainName: "Cloud Computing & DevOps",
    coreKeywords: [
      "AWS / Azure / GCP", "Terraform & IaC", "Kubernetes & Docker", "CI/CD Pipelines",
      "Linux Administration", "Cloud Security", "Infrastructure Monitoring", "Serverless Architecture",
      "Bash & Python Automation", "Site Reliability Engineering (SRE)", "Load Balancing", "Microservices"
    ],
    recommendedSkills: ["AWS / Azure", "Kubernetes", "Docker", "Terraform", "GitHub Actions / CI/CD", "Prometheus & Grafana"],
    certifications: [
      {
        title: "AWS Certified Solutions Architect – Associate",
        provider: "Amazon Web Services",
        description: "Validates proficiency in designing resilient, high-performing, cost-optimized cloud architectures.",
        url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
        relevance: "High"
      },
      {
        title: "Certified Kubernetes Administrator (CKA)",
        provider: "Linux Foundation / CNCF",
        description: "Proves hands-on capability to build, configure, and manage production Kubernetes clusters.",
        url: "https://www.cncf.io/certification/cka/",
        relevance: "High"
      }
    ]
  },
  software: {
    domainName: "Software & Web Development",
    coreKeywords: [
      "TypeScript & JavaScript", "React & Next.js", "Node.js & Express", "REST & GraphQL APIs",
      "SQL & Database Systems", "Git & Version Control", "System Architecture", "Unit & Integration Testing",
      "Agile & Scrum", "CI/CD Pipelines", "Object-Oriented Programming", "Algorithms & Data Structures"
    ],
    recommendedSkills: ["TypeScript", "System Architecture", "Docker", "Jest / Vitest", "GraphQL", "PostgreSQL"],
    certifications: [
      {
        title: "AWS Certified Developer – Associate",
        provider: "Amazon Web Services",
        description: "Demonstrates technical expertise in building and deploying cloud-native applications on AWS.",
        url: "https://aws.amazon.com/certification/certified-developer-associate/",
        relevance: "High"
      },
      {
        title: "Meta Front-End / Back-End Developer Certificate",
        provider: "Meta",
        description: "Industry certification covering full-stack software development principles, frameworks, and tools.",
        url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
        relevance: "Medium"
      }
    ]
  },
  data: {
    domainName: "Data Science, AI & Analytics",
    coreKeywords: [
      "Python & R", "SQL & Data Warehousing", "Pandas & NumPy", "Machine Learning & Scikit-Learn",
      "Deep Learning & PyTorch", "Data Pipelines & Airflow", "Tableau & Power BI", "Statistical Analysis",
      "ETL Processing", "Big Data (Spark / Hadoop)", "Feature Engineering", "A/B Testing"
    ],
    recommendedSkills: ["Python", "SQL", "Machine Learning", "PyTorch / TensorFlow", "Data Pipelines", "Tableau / Power BI"],
    certifications: [
      {
        title: "Google Data Analytics Professional Certificate",
        provider: "Google",
        description: "Validates skills in data cleaning, SQL analysis, R programming, and data visualization.",
        url: "https://grow.google/certificates/data-analytics/",
        relevance: "High"
      },
      {
        title: "AWS Certified Data Analytics – Specialty",
        provider: "Amazon Web Services",
        description: "Demonstrates capability to design and maintain analytics solutions on AWS big data platforms.",
        url: "https://aws.amazon.com/certification/certified-data-analytics-specialty/",
        relevance: "High"
      }
    ]
  },
  healthcare: {
    domainName: "Healthcare & Clinical Nursing",
    coreKeywords: [
      "Patient Care & Assessment", "EHR / EMR Documentation", "Clinical Workflow", "Vital Signs Monitoring",
      "HIPAA Compliance", "Medication Administration", "Infection Control", "Emergency Triage",
      "Basic Life Support (BLS)", "Patient Safety Protocols", "Interdisciplinary Care", "Clinical Diagnostics"
    ],
    recommendedSkills: ["EHR Systems (Epic/Cerner)", "Clinical Triage", "Patient Assessment", "BLS / ACLS", "Medication Administration"],
    certifications: [
      {
        title: "NCLEX-RN (Registered Nurse License)",
        provider: "NCSBN",
        description: "Essential national licensing examination for registered nurse clinical practice.",
        url: "https://www.ncsbn.org/nclex.page",
        relevance: "High"
      },
      {
        title: "Basic Life Support (BLS) & ACLS",
        provider: "American Heart Association",
        description: "Standard resuscitation and emergency care certification required in clinical settings.",
        url: "https://cpr.heart.org/",
        relevance: "High"
      }
    ]
  },
  finance: {
    domainName: "Finance, Accounting & Banking",
    coreKeywords: [
      "Financial Analysis & Modeling", "GAAP & IFRS Compliance", "Budgeting & Forecasting", "Auditing & Internal Controls",
      "Excel VBA & Financial Macros", "SAP / Oracle ERP", "Risk Management", "M&A Deal Structure",
      "General Ledger Accounting", "Tax Compliance", "Capital Budgeting", "Cash Flow Valuation"
    ],
    recommendedSkills: ["Financial Modeling", "Excel / VBA", "GAAP / IFRS", "SAP ERP", "Valuation Methods"],
    certifications: [
      {
        title: "Chartered Financial Analyst (CFA)",
        provider: "CFA Institute",
        description: "Premier global charter for investment analysis, portfolio management, and financial ethics.",
        url: "https://www.cfainstitute.org/",
        relevance: "High"
      },
      {
        title: "Certified Public Accountant (CPA)",
        provider: "AICPA",
        description: "Standard professional designation for public accounting, corporate auditing, and tax advising.",
        url: "https://www.aicpa-cima.com/",
        relevance: "High"
      }
    ]
  },
  marketing: {
    domainName: "Digital Marketing & Growth",
    coreKeywords: [
      "SEO & Search Marketing", "Content Strategy & Copywriting", "Google Analytics & GA4", "Social Media Campaigns",
      "PPC & Paid Search Advertising", "Conversion Rate Optimization (CRO)", "Brand Positioning", "Email Marketing Automation",
      "HubSpot & CRM Tools", "A/B Testing & Funnels", "Customer Acquisition Cost (CAC)", "Return on Ad Spend (ROAS)"
    ],
    recommendedSkills: ["Google Analytics (GA4)", "SEO / SEM Strategy", "HubSpot CRM", "Copywriting", "Paid Ads (Meta/Google)"],
    certifications: [
      {
        title: "Google Ads & GA4 Certification",
        provider: "Google Skillshop",
        description: "Official credential for search advertising, display campaigns, and web analytics mastery.",
        url: "https://skillshop.exceedlms.com/",
        relevance: "High"
      },
      {
        title: "HubSpot Inbound & Content Marketing Certification",
        provider: "HubSpot Academy",
        description: "Recognized certification in inbound lead generation, content creation, and lead nurturing.",
        url: "https://academy.hubspot.com/",
        relevance: "High"
      }
    ]
  },
  project: {
    domainName: "Project & Product Management",
    coreKeywords: [
      "Agile & Scrum Methodologies", "Jira & Confluence", "Sprint Planning & Retrospectives", "Stakeholder Management",
      "Resource & Budget Allocation", "Risk Identification & Mitigation", "Roadmapping & PRDs", "Cross-Functional Leadership",
      "Scope Management", "KPI Tracking & Metrics", "Change Management", "Vendor Relations"
    ],
    recommendedSkills: ["Jira / Confluence", "Agile Frameworks", "Sprint Planning", "Stakeholder Management", "Product Roadmapping"],
    certifications: [
      {
        title: "Project Management Professional (PMP)",
        provider: "PMI",
        description: "Globally recognized standard certification for project leadership across all industries.",
        url: "https://www.pmi.org/certifications/project-management-pmp",
        relevance: "High"
      },
      {
        title: "Certified ScrumMaster (CSM)",
        provider: "Scrum Alliance",
        description: "Validates expertise in Scrum principles, team facilitation, and agile workflow delivery.",
        url: "https://www.scrumalliance.org/",
        relevance: "High"
      }
    ]
  },
  hr: {
    domainName: "Human Resources & Talent Acquisition",
    coreKeywords: [
      "Talent Sourcing & Recruitment", "Applicant Tracking Systems (ATS)", "Employee Relations & Culture", "Onboarding & HR Operations",
      "Performance Appraisal Systems", "HRIS (Workday / BambooHR)", "Labor Law & HR Compliance", "Compensation & Benefits Strategy",
      "Conflict Resolution", "Diversity & Inclusion Initiatives"
    ],
    recommendedSkills: ["Workday / HRIS", "ATS Sourcing", "Labor Law Compliance", "Employee Engagement", "Performance Management"],
    certifications: [
      {
        title: "SHRM Certified Professional (SHRM-CP)",
        provider: "SHRM",
        description: "Global HR certification for professionals managing policy, recruitment, and organizational culture.",
        url: "https://www.shrm.org/certification",
        relevance: "High"
      }
    ]
  },
  engineering: {
    domainName: "Engineering & Technical Design",
    coreKeywords: [
      "AutoCAD & CAD Drafting", "SolidWorks / Revit / MATLAB", "Structural Analysis & FEA", "Project Engineering & Inspection",
      "OSHA Safety Compliance", "Technical Specifications & BOM", "Thermal & Fluid Dynamics", "Quality Assurance & Control",
      "Prototype Testing", "Cost Estimation & Procurement"
    ],
    recommendedSkills: ["AutoCAD", "SolidWorks", "MATLAB", "OSHA Safety Standards", "Project Engineering"],
    certifications: [
      {
        title: "Licensed Professional Engineer (PE)",
        provider: "NSPE / NCEES",
        description: "Highest legal license for engineers, authorizing official engineering document sign-offs.",
        url: "https://www.ncees.org/engineering/pe/",
        relevance: "High"
      }
    ]
  }
};

export function getDomainProfile(jobTitle: string): DomainProfile {
  const lower = (jobTitle || "").toLowerCase();

  if (lower.includes("cyber") || lower.includes("security") || lower.includes("infosec") || lower.includes("soc ") || lower.includes("penetration")) {
    return DOMAIN_PROFILES.cybersecurity;
  }
  if (lower.includes("cloud") || lower.includes("devops") || lower.includes("aws") || lower.includes("azure") || lower.includes("kubernetes") || lower.includes("sre") || lower.includes("infrastructure")) {
    return DOMAIN_PROFILES.cloud;
  }
  if (lower.includes("software") || lower.includes("developer") || lower.includes("web") || lower.includes("frontend") || lower.includes("backend") || lower.includes("fullstack") || lower.includes("programmer") || lower.includes("engineer")) {
    return DOMAIN_PROFILES.software;
  }
  if (lower.includes("data") || lower.includes("ai ") || lower.includes("machine learning") || lower.includes("ml ") || lower.includes("analytics") || lower.includes("statistician")) {
    return DOMAIN_PROFILES.data;
  }
  if (lower.includes("health") || lower.includes("nurse") || lower.includes("nursing") || lower.includes("clinical") || lower.includes("medical") || lower.includes("doctor") || lower.includes("patient")) {
    return DOMAIN_PROFILES.healthcare;
  }
  if (lower.includes("finance") || lower.includes("account") || lower.includes("bank") || lower.includes("audit") || lower.includes("tax") || lower.includes("treasury") || lower.includes("cfa") || lower.includes("cpa")) {
    return DOMAIN_PROFILES.finance;
  }
  if (lower.includes("market") || lower.includes("seo") || lower.includes("content") || lower.includes("growth") || lower.includes("brand") || lower.includes("media") || lower.includes("copywriter")) {
    return DOMAIN_PROFILES.marketing;
  }
  if (lower.includes("project") || lower.includes("product") || lower.includes("scrum") || lower.includes("agile") || lower.includes("pmp")) {
    return DOMAIN_PROFILES.project;
  }
  if (lower.includes("hr") || lower.includes("human resource") || lower.includes("recruit") || lower.includes("talent")) {
    return DOMAIN_PROFILES.hr;
  }
  if (lower.includes("mechanical") || lower.includes("civil") || lower.includes("electrical") || lower.includes("cad") || lower.includes("structural")) {
    return DOMAIN_PROFILES.engineering;
  }

  // Fallback profile generated from the job title itself
  return {
    domainName: jobTitle || "Professional Field",
    coreKeywords: [
      `${jobTitle} Methodology`, "Industry Standards & Best Practices", "Quality Assurance & Control",
      "Technical Documentation", "Strategic Planning", "Cross-Functional Collaboration",
      "Process Optimization", "Performance Metrics & KPIs", "Problem Solving & Analysis"
    ],
    recommendedSkills: [jobTitle, "Strategic Planning", "Data Analysis", "Process Improvement", "Team Leadership"],
    certifications: [
      {
        title: `Professional Certification in ${jobTitle || "Specialty"}`,
        provider: "Industry Standards Institute",
        description: "Demonstrates recognized competency, ethical standards, and advanced field knowledge.",
        url: "https://www.google.com/search?q=" + encodeURIComponent((jobTitle || "Professional") + " certification"),
        relevance: "High"
      }
    ]
  };
}

export function analyzeAtsSimulated(resumeText: string, jobTitle: string, jobDescription?: string) {
  const profile = getDomainProfile(jobTitle);
  const textLower = (resumeText || "").toLowerCase();

  // Search resume for domain core keywords
  const matched: string[] = [];
  const missing: string[] = [];

  profile.coreKeywords.forEach((keyword) => {
    // Check if key terms in the keyword exist in resumeText
    const parts = keyword.toLowerCase().split(/[\s/&()]+/);
    const hasMatch = parts.some(p => p.length > 2 && textLower.includes(p));
    if (hasMatch) {
      matched.push(keyword);
    } else {
      missing.push(keyword);
    }
  });

  // Structural checks
  const hasContactInfo = /@|phone|email|\+\d+|\d{10}/i.test(resumeText);
  const hasProfessionalSummary = /summary|profile|about|overview|objective/i.test(resumeText) || resumeText.length > 300;
  const hasExperienceSection = /experience|employment|work history|projects|roles/i.test(resumeText);
  const hasEducationSection = /education|university|degree|college|bachelor|master|gpa|percentage/i.test(resumeText);
  const hasSkillsSection = /skills|technologies|competencies|tools|stack/i.test(resumeText);

  const matchRatio = matched.length / profile.coreKeywords.length;
  
  // Base ATS score calculation
  let keywordScore = Math.round(matchRatio * 65);
  let structureScore = 0;
  if (hasContactInfo) structureScore += 6;
  if (hasProfessionalSummary) structureScore += 6;
  if (hasExperienceSection) structureScore += 7;
  if (hasEducationSection) structureScore += 6;
  if (hasSkillsSection) structureScore += 10;

  // Final score calculation
  const totalScore = Math.max(38, Math.min(96, keywordScore + structureScore));

  const technicalGaps = missing.slice(0, 4);
  const softGaps = ["Stakeholder Communication", "Domain-Specific Technical Writing", "Strategic Leadership"];

  const recommendations: string[] = [];
  if (matchRatio < 0.3) {
    recommendations.push(
      `Your current resume appears tailored for a different specialization. To target "${jobTitle}", add relevant ${profile.domainName} projects and tools.`
    );
  }
  if (missing.length > 0) {
    recommendations.push(
      `Incorporate missing high-value ATS keywords such as: ${missing.slice(0, 3).join(", ")}.`
    );
  }
  recommendations.push("Quantify achievements in your work history with concrete metrics (e.g., '% improvement', '$ impact', 'X% efficiency increase').");
  recommendations.push("Ensure contact details, LinkedIn profile, and key technical skills are formatted in clean, plain-text sections.");

  return {
    jobTitle: jobTitle || "Target Role",
    targetCompany: "Target Company",
    score: totalScore,
    atsAudit: {
      formattingCheck: {
        hasColumns: false,
        hasTables: false,
        hasCleanFonts: true,
        isStandardLength: true
      },
      keywordMatch: {
        matched: matched.length > 0 ? matched : ["Communication", "Problem Solving", "Teamwork"],
        missing: missing.length > 0 ? missing : ["Industry Standards"]
      },
      structuralAnalysis: {
        hasContactInfo,
        hasProfessionalSummary,
        hasExperienceSection,
        hasEducationSection,
        hasSkillsSection
      }
    },
    skillsGap: {
      technicalGaps: technicalGaps.length > 0 ? technicalGaps : ["Specialized Tools"],
      softGaps,
      recommendedSkillsToInclude: profile.recommendedSkills
    },
    certifications: profile.certifications,
    recommendations
  };
}

export function generateInterviewQuestionsSimulated(resumeText: string, jobTitle: string) {
  const profile = getDomainProfile(jobTitle);
  const resumeFirstLine = (resumeText || "").split("\n")[0] || "candidate";

  return [
    {
      id: "q1",
      question: `How does your background align with a dedicated ${jobTitle} role, and what key strengths do you bring to this domain?`,
      category: "Resume-Specific",
      context: `Evaluating your primary domain fit, enthusiasm, and narrative alignment for a ${jobTitle} position.`,
      sampleAnswer: `My background combines hands-on technical execution with problem-solving. While building various projects, I developed a strong foundation in core workflows and am eager to apply these skills directly as a ${jobTitle}.`
    },
    {
      id: "q2",
      question: `What specific methodologies or tools in ${profile.domainName} do you rely on to ensure project success?`,
      category: "Technical",
      context: "Testing technical knowledge of industry tools, standards, and practical execution frameworks.",
      sampleAnswer: `I regularly utilize tools like ${profile.recommendedSkills.slice(0, 3).join(", ")} to streamline workflows, maintain rigorous standards, and deliver reliable results.`
    },
    {
      id: "q3",
      question: `Describe a situation where you had to troubleshoot or resolve a complex issue under a tight deadline.`,
      category: "Behavioral",
      context: "Assessing pressure management, root-cause analysis, and critical thinking.",
      sampleAnswer: "I systematically isolated the problem, gathered telemetry and metrics, prioritized critical path items, and kept key stakeholders informed until full resolution."
    },
    {
      id: "q4",
      question: `How do you stay up to date with rapid developments, new tools, and security/compliance standards in ${profile.domainName}?`,
      category: "Situational",
      context: "Evaluating commitment to continuous professional learning and staying ahead of industry trends.",
      sampleAnswer: "I follow industry blogs, participate in technical communities, build hands-on side projects, and pursue certifications to continually upgrade my skillset."
    },
    {
      id: "q5",
      question: `Tell me about a time you had to collaborate with a cross-functional team or non-technical stakeholders.`,
      category: "Behavioral",
      context: "Testing communication clarity, empathy, and ability to translate technical concepts to business partners.",
      sampleAnswer: "I translated complex technical details into clear business outcomes, established shared milestones, and held regular check-ins to ensure seamless collaboration."
    },
    {
      id: "q6",
      question: `If you were tasked with leading an initiative for a key client as a ${jobTitle}, how would you structure your first 30 days?`,
      category: "Situational",
      context: "Assessing onboarding strategic approach, active listening, and early value creation.",
      sampleAnswer: "In the first 30 days, I would conduct a thorough discovery of existing processes, build trust with team members, identify immediate quick wins, and draft a long-term roadmap."
    },
    {
      id: "q7",
      question: `Can you walk me through a project mentioned in your resume (${resumeFirstLine.slice(0, 30)}...) and highlight its business impact?`,
      category: "Resume-Specific",
      context: "Verifying authentic hands-on experience and ability to articulate measurable achievements.",
      sampleAnswer: "In that project, I took ownership of core deliverables, collaborated with team members to overcome obstacles, and achieved measurable improvements in efficiency."
    },
    {
      id: "q8",
      question: `What is your approach to handling conflicting priorities or unexpected requirements changes?`,
      category: "Situational",
      context: "Measuring adaptability, risk prioritization, and transparent stakeholder communication.",
      sampleAnswer: "I re-evaluate scope based on business value, communicate tradeoffs openly with project sponsors, and adjust team priorities to maintain high quality."
    },
    {
      id: "q9",
      question: `Which key metrics or KPIs do you track to measure the quality and success of your work in ${jobTitle}?`,
      category: "Technical",
      context: "Evaluating focus on quantifiable metrics, operational excellence, and accountability.",
      sampleAnswer: "I track efficiency improvements, error/defect rates, user or stakeholder satisfaction scores, and project milestone adherence."
    },
    {
      id: "q10",
      question: `Where do you see yourself growing in the field of ${jobTitle} over the next 3 to 5 years?`,
      category: "Behavioral",
      context: "Assessing long-term career vision, growth mindset, and retention potential.",
      sampleAnswer: "I aim to deepen my technical expertise in this domain, take on broader project leadership responsibilities, and eventually mentor junior team members."
    }
  ];
}
