import React, { useState } from "react";
import { ResumeData, WorkExperience, Education, Internship, Project } from "../types";
import { 
  Sparkles, Plus, Trash2, Printer, ChevronDown, Check, Briefcase, 
  GraduationCap, Award, Mail, Phone, MapPin, Linkedin, Globe, Save, HelpCircle,
  Download, FileJson, FileText, FileCode, Github, Upload, Camera, X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { jsPDF } from "jspdf";

interface ResumeBuilderProps {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
  onSave: () => void;
}

const TEMPLATES = [
  { id: "tech-modern", name: "Tech Modern (Single Column)", desc: "Clean geometric layout optimized for professional parsing. Best for software, IT, and product management." },
  { id: "executive-classic", name: "Executive Serif (Centered)", desc: "Formal, balanced layout with elegant typography. Perfect for finance, law, consulting, and senior roles." },
  { id: "creative-teal", name: "Creative Accent (Dual Column)", desc: "Includes a sleek colored sidebar. Excellent for marketing, design, startups, and media." },
  { id: "healthcare-grid", name: "Structured Grid", desc: "Bordered grids and clean sections for compact detail. Designed for healthcare, research, and academia." }
];

const STANDARD_INDUSTRIES = [
  "Technology & Software",
  "Finance & Banking",
  "Healthcare & Life Sciences",
  "Creative & Marketing",
  "Business & Consulting",
  "Education & Non-Profit",
  "Engineering & Manufacturing"
];

const INDUSTRIES = [
  ...STANDARD_INDUSTRIES,
  "Other"
];

const SUGGESTED_SKILLS = [
  "TypeScript", "React 19", "Tailwind CSS", "Express", "Node.js", 
  "AWS Architectures", "Docker", "Kubernetes", "SQL", "Agile Methodologies",
  "Python", "Next.js", "Git & GitHub", "REST APIs", "CI/CD Pipelines"
];

const SUGGESTED_CERTS = [
  "AWS Certified Solutions Architect",
  "Certified ScrumMaster (CSM) - Scrum Alliance",
  "Google Cloud Professional Architect",
  "Microsoft Azure Solutions Architect",
  "Project Management Professional (PMP)",
  "CompTIA Security+"
];

interface IndustryField {
  key: string;
  label: string;
  placeholder: string;
  type: "text" | "textarea";
}

const INDUSTRY_SPECIFIC_FIELDS: Record<string, IndustryField[]> = {
  "Technology & Software": [
    { key: "techStack", label: "Programming Languages / Tech Stack", placeholder: "e.g., JavaScript, Python, React, Go", type: "text" },
    { key: "githubPortfolio", label: "GitHub / Portfolio URL", placeholder: "e.g., github.com/username", type: "text" },
    { key: "projectsTech", label: "Projects (with tech used)", placeholder: "e.g., E-commerce App built with React and Node.js", type: "textarea" },
    { key: "certificationsCloud", label: "Certifications (AWS, Azure, GCP, etc.)", placeholder: "e.g., AWS Certified Solutions Architect", type: "text" },
    { key: "openSource", label: "Open Source Contributions", placeholder: "e.g., Contributed to Webpack, maintained local library", type: "textarea" }
  ],
  "Finance & Banking": [
    { key: "financeCerts", label: "Certifications (CFA, CPA, FRM, Series 7/63)", placeholder: "e.g., CFA Charterholder, CPA", type: "text" },
    { key: "licenseNum", label: "License Number (if regulated role)", placeholder: "e.g., FINRA CRD #1234567", type: "text" },
    { key: "financialTools", label: "Key Financial Tools (Bloomberg, SAP, Excel/VBA)", placeholder: "e.g., Bloomberg Terminal, SAP ERP, Excel VBA macro automation", type: "text" },
    { key: "dealSize", label: "Deal/Portfolio Size Managed", placeholder: "e.g., $15M portfolio, $120M M&A transactions", type: "text" },
    { key: "complianceExp", label: "Compliance/Regulatory Experience", placeholder: "e.g., SEC reporting, SOX compliance audits", type: "textarea" }
  ],
  "Healthcare & Life Sciences": [
    { key: "healthcareLicense", label: "License Number & Issuing Authority", placeholder: "e.g., Medical License #RN987654 - CA Board of Registered Nursing", type: "text" },
    { key: "boardCerts", label: "Board Certifications", placeholder: "e.g., Board Certified in Internal Medicine", type: "text" },
    { key: "specialization", label: "Specialization / Area of Practice", placeholder: "e.g., Pediatrics, Cardiology, Clinical Research", type: "text" },
    { key: "clinicalHours", label: "Clinical Hours / Patient Load", placeholder: "e.g., 2,500+ direct clinical hours, averaging 25 patients/day", type: "text" },
    { key: "publications", label: "Publications / Research (if applicable)", placeholder: "e.g., Author of 'Clinical Analysis of...' in Journal of Medicine", type: "textarea" }
  ],
  "Creative & Marketing": [
    { key: "creativePortfolio", label: "Portfolio URL (personal site)", placeholder: "e.g., behance.net/username or myportfolio.com", type: "text" },
    { key: "campaignsLed", label: "Campaigns Led (with metrics/results)", placeholder: "e.g., Led Q3 Brand Campaign resulting in 45% increase in lead gen", type: "textarea" },
    { key: "creativeTools", label: "Design/Marketing Tools (Adobe CC, Figma, HubSpot, etc.)", placeholder: "e.g., Figma, Photoshop, Illustrator, HubSpot, Google Analytics", type: "text" },
    { key: "socialMediaLinks", label: "Social Media / Content Links", placeholder: "e.g., linkedin.com/in/username/recent-activity", type: "text" },
    { key: "awardsCreative", label: "Awards or Recognitions", placeholder: "e.g., Webby Award Winner 2025, Red Dot Design Award", type: "textarea" }
  ],
  "Business & Consulting": [
    { key: "industriesServed", label: "Industries Served", placeholder: "e.g., Retail, SaaS, Energy, Supply Chain", type: "text" },
    { key: "clientEngagements", label: "Client Engagements / Case Studies", placeholder: "e.g., Advised Fortune 500 company on digital transformation strategy", type: "textarea" },
    { key: "businessFrameworks", label: "Frameworks Used (Six Sigma, Agile, etc.)", placeholder: "e.g., MECE, SWOT, Agile, Scrum, Lean Six Sigma Black Belt", type: "text" },
    { key: "revenueImpact", label: "Revenue Impact / Cost Savings Achieved", placeholder: "e.g., Saved $2.4M annually by streamlining operations", type: "text" },
    { key: "businessCerts", label: "Certifications (PMP, Lean Six Sigma)", placeholder: "e.g., PMP, Lean Six Sigma Green Belt", type: "text" }
  ],
  "Education & Non-Profit": [
    { key: "teachingLicense", label: "Teaching License / Certification", placeholder: "e.g., State Certified Secondary Educator - Mathematics", type: "text" },
    { key: "subjectsTaught", label: "Grade Levels / Subjects Taught", placeholder: "e.g., 9th-12th Grade AP Calculus & Statistics", type: "text" },
    { key: "grantsManaged", label: "Grants Written or Managed", placeholder: "e.g., Secured $45,000 STEM grant for classroom equipment", type: "textarea" },
    { key: "communityImpact", label: "Volunteer/Community Impact", placeholder: "e.g., Directed community outreach program serving 500+ families", type: "textarea" },
    { key: "curriculumDev", label: "Curriculum Development Experience", placeholder: "e.g., Designed new county-wide syllabus for introductory coding", type: "textarea" }
  ],
  "Engineering & Manufacturing": [
    { key: "engineeringLicense", label: "Engineering License (PE, etc.)", placeholder: "e.g., Licensed Professional Engineer (PE) - Civil", type: "text" },
    { key: "cadTools", label: "CAD/Software Tools (AutoCAD, SolidWorks, MATLAB)", placeholder: "e.g., SolidWorks, AutoCAD, MATLAB, Ansys", type: "text" },
    { key: "safetyCerts", label: "Safety Certifications (OSHA, etc.)", placeholder: "e.g., OSHA 30-Hour General Industry Certification", type: "text" },
    { key: "engineeringProjects", label: "Projects (with scale/budget)", placeholder: "e.g., Led design of a 4,000 sq ft structural extension ($1.2M budget)", type: "textarea" },
    { key: "patents", label: "Patents (if any)", placeholder: "e.g., Co-inventor of 'Automated Cooling Assembly' (US Patent #9,876,543)", type: "textarea" }
  ],
  "Other": [
    { key: "otherTools", label: "Relevant Tools/Software (free text)", placeholder: "e.g., Jira, Slack, Notion, specific proprietary software", type: "text" },
    { key: "otherCerts", label: "Certifications (free text)", placeholder: "e.g., First Aid, local training courses", type: "text" }
  ]
};

const getCleanLabel = (label: string) => {
  return label.replace(/\s*\(AWS,\s*Azure,\s*GCP,\s*etc\.\)/i, "");
};

const splitByComma = (arr: string[] | undefined): string[] => {
  if (!arr) return [];
  const result: string[] = [];
  arr.forEach(item => {
    if (!item) return;
    const parts = item.split(",");
    parts.forEach(part => {
      const trimmed = part.trim();
      if (trimmed) {
        result.push(trimmed);
      }
    });
  });
  return result;
};

export default function ResumeBuilder({ resume, onChange, onSave }: ResumeBuilderProps) {
  const [activeTemplate, setActiveTemplate] = useState("tech-modern");
  const [isOptimizingSummary, setIsOptimizingSummary] = useState(false);
  const [optimizingBulletId, setOptimizingBulletId] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState("");
  const [newCert, setNewCert] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [newSoftSkill, setNewSoftSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  // Local optimization handlers via API
  const optimizeSummary = async () => {
    if (!resume.summary) return;
    setIsOptimizingSummary(true);
    try {
      const res = await fetch("/api/resume/optimize-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: resume.summary, jobTitle: resume.personalInfo.jobTitle }),
      });
      const data = await res.json();
      if (data.result) {
        onChange({ ...resume, summary: data.result });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsOptimizingSummary(false);
    }
  };

  const optimizeBullet = async (itemId: string, currentText: string, contextType: "experience" | "internship" | "project" = "experience") => {
    if (!currentText) return;
    setOptimizingBulletId(itemId);
    try {
      const res = await fetch("/api/resume/optimize-bullet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bullet: currentText,
          position: resume.personalInfo.jobTitle,
          contextType
        }),
      });
      const data = await res.json();
      if (data.result) {
        if (contextType === "experience") {
          const updatedExp = resume.experience.map(exp => {
            if (exp.id === itemId) {
              return { ...exp, description: data.result };
            }
            return exp;
          });
          onChange({ ...resume, experience: updatedExp });
        } else if (contextType === "internship") {
          const updatedIntern = (resume.internships || []).map(intern => {
            if (intern.id === itemId) {
              return { ...intern, description: data.result };
            }
            return intern;
          });
          onChange({ ...resume, internships: updatedIntern });
        } else if (contextType === "project") {
          const updatedProj = (resume.projects || []).map(proj => {
            if (proj.id === itemId) {
              return { ...proj, description: data.result };
            }
            return proj;
          });
          onChange({ ...resume, projects: updatedProj });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setOptimizingBulletId(null);
    }
  };

  // State modification triggers
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [field]: value
      }
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if image format
    if (!file.type.startsWith("image/")) {
      alert("Invalid file format. Please upload an image file (PNG, JPEG, JPG, or WEBP).");
      return;
    }

    // Limit file size to 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("File is too large. Please select an image under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updatePersonalInfo("photo", event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const addExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    onChange({ ...resume, experience: [newExp, ...resume.experience] });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    const updated = resume.experience.map(exp => {
      if (exp.id === id) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    onChange({ ...resume, experience: updated });
  };

  const deleteExperience = (id: string) => {
    onChange({ ...resume, experience: resume.experience.filter(exp => exp.id !== id) });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      percentage: ""
    };
    onChange({ ...resume, education: [newEdu, ...resume.education] });
  };

  const updateEducation = (id: string, field: string, value: any) => {
    const updated = resume.education.map(edu => {
      if (edu.id === id) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    onChange({ ...resume, education: updated });
  };

  const deleteEducation = (id: string) => {
    onChange({ ...resume, education: resume.education.filter(edu => edu.id !== id) });
  };

  const addInternship = () => {
    const newIntern: Internship = {
      id: `intern-${Date.now()}`,
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    onChange({
      ...resume,
      internships: [newIntern, ...(resume.internships || [])]
    });
  };

  const updateInternship = (id: string, field: string, value: any) => {
    const updated = (resume.internships || []).map(intern => {
      if (intern.id === id) {
        return { ...intern, [field]: value };
      }
      return intern;
    });
    onChange({ ...resume, internships: updated });
  };

  const deleteInternship = (id: string) => {
    onChange({
      ...resume,
      internships: (resume.internships || []).filter(intern => intern.id !== id)
    });
  };

  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: "",
      technologies: "",
      link: "",
      description: ""
    };
    onChange({
      ...resume,
      projects: [newProj, ...(resume.projects || [])]
    });
  };

  const updateProject = (id: string, field: string, value: any) => {
    const updated = (resume.projects || []).map(proj => {
      if (proj.id === id) {
        return { ...proj, [field]: value };
      }
      return proj;
    });
    onChange({ ...resume, projects: updated });
  };

  const deleteProject = (id: string) => {
    onChange({
      ...resume,
      projects: (resume.projects || []).filter(proj => proj.id !== id)
    });
  };

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !resume.skills.includes(newSkill.trim())) {
      onChange({ ...resume, skills: [...resume.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    onChange({ ...resume, skills: resume.skills.filter(s => s !== skill) });
  };

  const addCertification = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCert.trim() && !resume.certifications.includes(newCert.trim())) {
      onChange({ ...resume, certifications: [...resume.certifications, newCert.trim()] });
      setNewCert("");
    }
  };

  const removeCertification = (cert: string) => {
    onChange({ ...resume, certifications: resume.certifications.filter(c => c !== cert) });
  };

  const addInterest = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newInterest.trim();
    const currentInterests = resume.interests || [];
    if (clean && !currentInterests.includes(clean)) {
      onChange({ ...resume, interests: [...currentInterests, clean] });
      setNewInterest("");
    }
  };

  const removeInterest = (item: string) => {
    const currentInterests = resume.interests || [];
    onChange({ ...resume, interests: currentInterests.filter(i => i !== item) });
  };

  const addSoftSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newSoftSkill.trim();
    const currentSoft = resume.softSkills || [];
    if (clean && !currentSoft.includes(clean)) {
      onChange({ ...resume, softSkills: [...currentSoft, clean] });
      setNewSoftSkill("");
    }
  };

  const removeSoftSkill = (item: string) => {
    const currentSoft = resume.softSkills || [];
    onChange({ ...resume, softSkills: currentSoft.filter(s => s !== item) });
  };

  const addLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newLanguage.trim();
    const currentLang = resume.languages || [];
    if (clean && !currentLang.includes(clean)) {
      onChange({ ...resume, languages: [...currentLang, clean] });
      setNewLanguage("");
    }
  };

  const removeLanguage = (item: string) => {
    const currentLang = resume.languages || [];
    onChange({ ...resume, languages: currentLang.filter(l => l !== item) });
  };

  const formatDateInput = (val: string): string => {
    // Clean all non-digits
    const digits = val.replace(/\D/g, "").slice(0, 8);
    
    if (digits.length <= 2) {
      // If user types a slash or finishes typing 2 digits
      if (val.endsWith("/") && digits.length > 0) {
        if (digits.length === 1) {
          return `0${digits}/`;
        }
        return `${digits}/`;
      }
      return digits;
    }
    
    if (digits.length <= 4) {
      const first = digits.slice(0, 2);
      const second = digits.slice(2);
      if (val.endsWith("/") && digits.length === 4) {
        return `${first}/${second}/`;
      }
      return `${first}/${second}`;
    }
    
    const first = digits.slice(0, 2);
    const second = digits.slice(2, 4);
    const third = digits.slice(4, 8);
    return `${first}/${second}/${third}`;
  };

  const triggerPrint = () => {
    window.print();
  };

  const downloadAsPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const pageWidth = doc.internal.pageSize.getWidth(); // 210
    const pageHeight = doc.internal.pageSize.getHeight(); // 297
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2); // 170

    let y = 20;

    // Helper to draw horizontal lines
    const drawDivider = (currentY: number) => {
      doc.setDrawColor(180, 180, 180); // gray-scale line
      doc.setLineWidth(0.3);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      return currentY + 6;
    };

    // Helper to print text and wrap
    const writeWrappedText = (text: string, x: number, currentY: number, size: number, color: [number, number, number], fontStyle: "normal" | "bold" | "italic" = "normal") => {
      doc.setFont("Helvetica", fontStyle);
      doc.setFontSize(size);
      doc.setTextColor(0, 0, 0); // Always pure black
      
      const lines = doc.splitTextToSize(text, contentWidth);
      doc.text(lines, x, currentY);
      return currentY + (lines.length * (size * 0.35 + 1.2)); // Dynamic spacing based on font size and lines
    };

    // 1. Header (Name and Title)
    const fullName = resume.personalInfo.fullName?.trim() || "";
    let jobTitle = resume.personalInfo.jobTitle?.trim() || "";
    const eduDetail = [
      resume.personalInfo.education?.trim(),
      resume.personalInfo.educationYear?.trim() ? `(${resume.personalInfo.educationYear.trim()})` : ""
    ].filter(Boolean).join(" ");

    if (eduDetail) {
      if (jobTitle) {
        jobTitle += `  |  ${eduDetail}`;
      } else {
        jobTitle = eduDetail;
      }
    }

    const hasPhoto = !!resume.personalInfo.photo;
    const headerTextWidth = hasPhoto ? contentWidth - 25 : contentWidth;
    const headerStartY = y;

    // Draw Name
    if (fullName) {
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(24);
      doc.setTextColor(0, 0, 0); // pure black
      const splitName = doc.splitTextToSize(fullName, headerTextWidth);
      doc.text(splitName, margin, y);
      y += (splitName.length * 8.5);
    }

    // Draw Title
    if (jobTitle) {
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(0, 0, 0); // pure black
      const splitTitle = doc.splitTextToSize(jobTitle, headerTextWidth);
      doc.text(splitTitle, margin, y);
      y += (splitTitle.length * 5) + 3;
    }

    // 2. Contact Details
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0); // pure black

    // Line 1: email and phone
    const line1Parts = [];
    if (resume.personalInfo.email) line1Parts.push(`Email: ${resume.personalInfo.email}`);
    if (resume.personalInfo.phone) line1Parts.push(`Phone: ${resume.personalInfo.phone}`);
    const contactLine1 = line1Parts.join("   |   ");
    if (contactLine1) {
      doc.text(contactLine1, margin, y);
      y += 5;
    }

    // Line 2: location
    if (resume.personalInfo.location) {
      doc.text(`Location: ${resume.personalInfo.location}`, margin, y);
      y += 5;
    }

    // Line 3: LinkedIn
    if (resume.personalInfo.linkedin) {
      doc.text(`LinkedIn: ${resume.personalInfo.linkedin}`, margin, y);
      y += 5;
    }

    // Line 4: GitHub
    if (resume.personalInfo.github) {
      doc.text(`GitHub: ${resume.personalInfo.github}`, margin, y);
      y += 5;
    }

    // Line 5: Portfolio / Website
    if (resume.personalInfo.website) {
      doc.text(`Portfolio: ${resume.personalInfo.website}`, margin, y);
      y += 5;
    }
    y += 2;

    // Draw photo on the top right
    if (hasPhoto) {
      try {
        let format = "JPEG";
        if (resume.personalInfo.photo.includes("png")) format = "PNG";
        else if (resume.personalInfo.photo.includes("webp")) format = "WEBP";
        else if (resume.personalInfo.photo.includes("gif")) format = "GIF";
        
        doc.addImage(resume.personalInfo.photo, format, pageWidth - margin - 20, headerStartY, 20, 20);
      } catch (err) {
        console.error("Failed to add image to PDF:", err);
      }
      y = Math.max(y, headerStartY + 23);
    }

    y = drawDivider(y);

    // 3. Summary Section
    if (resume.summary) {
      // Section Heading
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // pure black
      doc.text("CAREER OBJECTIVE", margin, y);
      y += 5;

      // Summary Body
      y = writeWrappedText(resume.summary, margin, y, 10, [0, 0, 0]); // pure black
      y += 4;
    }

    // Industry Specific Highlights
    const currentIndustryKey = STANDARD_INDUSTRIES.includes(resume.industry) ? resume.industry : "Other";
    const indFieldsList = INDUSTRY_SPECIFIC_FIELDS[currentIndustryKey] || [];
    const hasIndFields = indFieldsList.some(field => resume.industryFields?.[field.key]?.trim());

    if (hasIndFields) {
      if (y > pageHeight - 30) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // pure black
      doc.text(`${resume.industry.toUpperCase()} SPECIALIZATIONS`, margin, y);
      y += 5;

      indFieldsList.forEach(field => {
        const val = resume.industryFields?.[field.key];
        if (val && val.trim()) {
          if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
          }
          doc.setFont("Helvetica", "bold");
          doc.setFontSize(10);
          const cleanLabel = getCleanLabel(field.label);
          doc.text(`${cleanLabel}: `, margin, y);
          
          const labelWidth = doc.getTextWidth(`${cleanLabel}: `);
          
          doc.setFont("Helvetica", "normal");
          doc.setFontSize(9.5);
          
          if (field.type === "textarea" || val.length > 60) {
            y += 4.5;
            y = writeWrappedText(val, margin + 4, y, 9.5, [0, 0, 0]);
          } else {
            doc.text(val, margin + labelWidth, y);
            y += 5;
          }
        }
      });
      y += 3;
    }

    // 4. Experience Section
    const validPdfExperience = (resume.experience || []).filter(exp => exp.position?.trim() || exp.company?.trim() || exp.description?.trim() || exp.startDate?.trim() || exp.endDate?.trim());
    if (validPdfExperience.length > 0) {
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // pure black
      doc.text("PROFESSIONAL EXPERIENCE", margin, y);
      y += 6;

      validPdfExperience.forEach(exp => {
        // Position Title & Date (Bold / aligned left and right)
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0); // pure black
        doc.text(exp.position || "Role Title", margin, y);

        // Date right-aligned
        const dateStr = `${exp.startDate || ""} - ${exp.current ? "Present" : exp.endDate || ""}`;
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // pure black
        doc.text(dateStr, pageWidth - margin, y, { align: "right" });
        y += 5;

        // Company
        if (exp.company) {
          doc.setFont("Helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0); // pure black
          doc.text(exp.company, margin, y);
          y += 5;
        }

        // Location (printed on separate line)
        if (exp.location) {
          doc.setFont("Helvetica", "normal");
          doc.setFontSize(9.5);
          doc.setTextColor(80, 80, 80);
          doc.text(exp.location, margin, y);
          y += 5;
        }

        // Description
        if (exp.description) {
          y = writeWrappedText(exp.description, margin, y, 9.5, [0, 0, 0]);
        }
        y += 5;
      });
    }

    // 5. Education Section (printed before internships)
    const validPdfEducation = (resume.education || []).filter(edu => edu.institution?.trim() || edu.degree?.trim() || edu.fieldOfStudy?.trim() || edu.percentage?.trim() || edu.startDate?.trim() || edu.endDate?.trim());
    if (validPdfEducation.length > 0) {
      if (y > pageHeight - 25) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // pure black
      doc.text("EDUCATION", margin, y);
      y += 6;

      validPdfEducation.forEach(edu => {
        if (y > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0); // pure black
        const degreeText = `${edu.degree || ""}${edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}`;
        doc.text(degreeText, margin, y);

        // Date right-aligned (bold)
        const dateStr = `${edu.startDate || ""} - ${edu.current ? "Present" : edu.endDate || ""}`;
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // pure black
        doc.text(dateStr, pageWidth - margin, y, { align: "right" });
        y += 5;

        // Institution & Location
        if (edu.institution) {
          doc.setFont("Helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(50, 50, 50); // dark grey
          doc.text(edu.institution, margin, y);
          y += 4.5;
        }

        if (edu.location) {
          doc.setFont("Helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(80, 80, 80);
          doc.text(edu.location, margin, y);
          y += 4.5;
        }

        // Grade/Percentage (left-aligned)
        if (edu.percentage) {
          doc.setFont("Helvetica", "italic");
          doc.setFontSize(9.5);
          doc.setTextColor(80, 80, 80);
          const gradeText = `Percentage: ${edu.percentage}`;
          doc.text(gradeText, margin, y);
          y += 4.5;
        }
        y += 2;
      });
    }

    // Internships Section
    const validPdfInternships = (resume.internships || []).filter(intern => intern.role?.trim() || intern.company?.trim() || intern.description?.trim() || intern.startDate?.trim() || intern.endDate?.trim());
    if (validPdfInternships.length > 0) {
      if (y > pageHeight - 25) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // pure black
      doc.text("INTERNSHIPS", margin, y);
      y += 6;

      validPdfInternships.forEach(intern => {
        if (y > pageHeight - 20) {
          doc.addPage();
          y = 20;
        }
        // Position Title & Date with Bullet
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0); // pure black
        doc.text(`• ${intern.role || "Intern Role"}`, margin, y);

        // Date right-aligned
        const dateStr = `${intern.startDate || ""} - ${intern.current ? "Present" : intern.endDate || ""}`;
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // pure black
        doc.text(dateStr, pageWidth - margin, y, { align: "right" });
        y += 5;

        // Company (indented by 4)
        if (intern.company) {
          doc.setFont("Helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0); // pure black
          doc.text(intern.company, margin + 4, y);
          y += 5;
        }

        // Location (indented by 4, printed on its own line below company)
        if (intern.location) {
          doc.setFont("Helvetica", "normal");
          doc.setFontSize(9.5);
          doc.setTextColor(80, 80, 80);
          doc.text(intern.location, margin + 4, y);
          y += 5;
        }

        // Description (indented by 4)
        if (intern.description) {
          y = writeWrappedText(intern.description, margin + 4, y, 9.5, [0, 0, 0]);
        }
        y += 5;
      });
    }

    // Projects Section (rendered beautifully on separate lines)
    const validPdfProjects = (resume.projects || []).filter(proj => proj.title?.trim() || proj.description?.trim() || proj.technologies?.trim() || proj.link?.trim());
    if (validPdfProjects.length > 0) {
      if (y > pageHeight - 25) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // pure black
      doc.text("PROJECTS", margin, y);
      y += 6;

      validPdfProjects.forEach(proj => {
        if (y > pageHeight - 25) {
          doc.addPage();
          y = 20;
        }

        // 1. Draw Project Title (Bold & Dark)
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10.5);
        doc.setTextColor(0, 0, 0); // pure black / dark
        const projectTitleText = `• ${proj.title || "Project Title"}`;
        doc.text(projectTitleText, margin, y);

        let xOffset = margin + doc.getTextWidth(projectTitleText + " ");

        // 2. Draw Technologies next to title (Italic & Grey)
        if (proj.technologies) {
          doc.setFont("Helvetica", "italic");
          doc.setFontSize(9.5);
          doc.setTextColor(80, 80, 80);
          const techStr = `(${proj.technologies})`;
          doc.text(techStr, xOffset, y);
          xOffset += doc.getTextWidth(techStr + " ");
        }

        // 3. Draw Link (Indigo/blue-grey, right-aligned if it fits)
        if (proj.link) {
          doc.setFont("Helvetica", "normal");
          doc.setFontSize(9);
          doc.setTextColor(79, 70, 229); // Modern Indigo
          const linkStr = `[Link: ${proj.link}]`;
          const linkWidth = doc.getTextWidth(linkStr);
          if (pageWidth - margin - linkWidth > xOffset + 5) {
            doc.text(linkStr, pageWidth - margin - linkWidth, y);
          } else {
            y += 4.5;
            doc.text(linkStr, margin + 4, y);
          }
        }
        y += 5.5;

        // 4. Draw Description (wrapped, normal font weight below title)
        if (proj.description) {
          if (y > pageHeight - 15) {
            doc.addPage();
            y = 20;
          }
          y = writeWrappedText(proj.description, margin + 4, y, 9.5, [0, 0, 0]);
        }
        y += 3.5; // spacing between projects
      });
      y += 2.5;
    }

    // 6. Skills, Languages, Certifications, Soft Skills & Interests
    const cleanLanguages = splitByComma(resume.languages).filter(l => l && l.trim());
    const validSkillsPdf = (resume.skills || []).filter(s => s && s.trim());
    const validCertificationsPdf = (resume.certifications || []).filter(c => c && c.trim());
    const cleanSoftSkills = splitByComma(resume.softSkills).filter(s => s && s.trim());
    const cleanInterests = splitByComma(resume.interests).filter(i => i && i.trim());

    const hasSkillsOrExtras = 
      validSkillsPdf.length > 0 || 
      validCertificationsPdf.length > 0 || 
      cleanLanguages.length > 0 || 
      cleanSoftSkills.length > 0 || 
      cleanInterests.length > 0;

    if (hasSkillsOrExtras) {
      if (y > pageHeight - 25) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // pure black
      doc.text("SKILLS & ADDITIONAL DETAILS", margin, y);
      y += 6;

      // Languages Known (before core skills)
      if (cleanLanguages.length > 0) {
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // pure black
        doc.text("Languages Known", margin, y);
        y += 5;
        
        cleanLanguages.forEach(lang => {
          if (y > pageHeight - 15) {
            doc.addPage();
            y = 20;
          }
          y = writeWrappedText(`• ${lang}`, margin + 3, y, 9.5, [0, 0, 0]);
        });
        y += 4;
      }

      // Core Skills
      if (validSkillsPdf.length > 0) {
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // pure black
        doc.text("Core Skills", margin, y);
        y += 5;
        
        validSkillsPdf.forEach(skill => {
          if (y > pageHeight - 15) {
            doc.addPage();
            y = 20;
          }
          y = writeWrappedText(`• ${skill}`, margin + 3, y, 9.5, [0, 0, 0]);
        });
        y += 4;
      }

      // Certifications
      if (validCertificationsPdf.length > 0) {
        if (y > pageHeight - 15) {
          doc.addPage();
          y = 20;
        }
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // pure black
        doc.text("Certifications", margin, y);
        y += 5;
        
        validCertificationsPdf.forEach(cert => {
          if (y > pageHeight - 15) {
            doc.addPage();
            y = 20;
          }
          y = writeWrappedText(`• ${cert}`, margin + 3, y, 9.5, [0, 0, 0]);
        });
        y += 4;
      }

      // Soft Skills
      if (cleanSoftSkills.length > 0) {
        if (y > pageHeight - 15) {
          doc.addPage();
          y = 20;
        }
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // pure black
        doc.text("Soft Skills", margin, y);
        y += 5;
        
        cleanSoftSkills.forEach(soft => {
          if (y > pageHeight - 15) {
            doc.addPage();
            y = 20;
          }
          y = writeWrappedText(`• ${soft}`, margin + 3, y, 9.5, [0, 0, 0]);
        });
        y += 4;
      }

      // Interests
      if (cleanInterests.length > 0) {
        if (y > pageHeight - 15) {
          doc.addPage();
          y = 20;
        }
        doc.setFont("Helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // pure black
        doc.text("Interests", margin, y);
        y += 5;
        
        cleanInterests.forEach(interest => {
          if (y > pageHeight - 15) {
            doc.addPage();
            y = 20;
          }
          y = writeWrappedText(`• ${interest}`, margin + 3, y, 9.5, [0, 0, 0]);
        });
      }
    }

    // Save actual PDF file!
    doc.save(`${resume.personalInfo.fullName.replace(/\s+/g, '_') || 'resume'}.pdf`);
  };

  const downloadAsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resume.personalInfo.fullName.replace(/\s+/g, '_') || 'resume'}_data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const downloadAsTXT = () => {
    let txt = `==================================================\n`;
    txt += `RESUME: ${resume.personalInfo.fullName.toUpperCase() || 'YOUR NAME'}\n`;
    txt += `Target Role: ${resume.personalInfo.jobTitle || 'N/A'}\n`;
    txt += `==================================================\n\n`;
    
    txt += `CONTACT DETAILS\n`;
    txt += `---------------\n`;
    const line1Items = [
      resume.personalInfo.email ? `Email: ${resume.personalInfo.email}` : null,
      resume.personalInfo.phone ? `Phone: ${resume.personalInfo.phone}` : null,
      resume.personalInfo.location ? `Location: ${resume.personalInfo.location}` : null
    ].filter(Boolean);
    if (line1Items.length > 0) txt += `${line1Items.join("  |  ")}\n`;
    if (resume.personalInfo.linkedin) txt += `LinkedIn: ${resume.personalInfo.linkedin}\n`;
    if (resume.personalInfo.github) txt += `GitHub: ${resume.personalInfo.github}\n`;
    if (resume.personalInfo.website) txt += `Portfolio: ${resume.personalInfo.website}\n`;
    txt += `\n`;

    if (resume.summary) {
      txt += `EXECUTIVE SUMMARY\n`;
      txt += `-----------------\n`;
      txt += `${resume.summary}\n\n`;
    }

    // Industry Specific Highlights
    const currentIndustryKey = STANDARD_INDUSTRIES.includes(resume.industry) ? resume.industry : "Other";
    const indFieldsList = INDUSTRY_SPECIFIC_FIELDS[currentIndustryKey] || [];
    const hasIndFields = indFieldsList.some(field => resume.industryFields?.[field.key]?.trim());
    if (hasIndFields) {
      txt += `${resume.industry.toUpperCase()} SPECIALIZATIONS\n`;
      txt += `${"-".repeat(resume.industry.length + 17)}\n`;
      indFieldsList.forEach(field => {
        const val = resume.industryFields?.[field.key];
        if (val && val.trim()) {
          txt += `${field.label}: ${val}\n`;
        }
      });
      txt += `\n`;
    }

    const validTxtExperience = (resume.experience || []).filter(exp => exp.position?.trim() || exp.company?.trim() || exp.description?.trim() || exp.startDate?.trim() || exp.endDate?.trim());
    if (validTxtExperience.length > 0) {
      txt += `WORK HISTORY\n`;
      txt += `------------\n`;
      validTxtExperience.forEach(exp => {
        txt += `${exp.position || 'Position'} | ${exp.company || 'Company'} (${exp.location || 'Remote'})\n`;
        txt += `Period: ${exp.startDate} – ${exp.current ? 'Present' : exp.endDate}\n`;
        txt += `${exp.description || ''}\n\n`;
      });
    }

    const validTxtEducation = (resume.education || []).filter(edu => edu.institution?.trim() || edu.degree?.trim() || edu.fieldOfStudy?.trim() || edu.percentage?.trim() || edu.startDate?.trim() || edu.endDate?.trim());
    if (validTxtEducation.length > 0) {
      txt += `EDUCATION\n`;
      txt += `---------\n`;
      validTxtEducation.forEach(edu => {
        txt += `${edu.degree || ""}${edu.fieldOfStudy ? ` , ${edu.fieldOfStudy}` : ""}\n`;
        txt += `${edu.institution || 'Institution'} (${edu.location || ''})\n`;
        txt += `Period: ${edu.startDate} – ${edu.current ? 'Present' : edu.endDate}\n\n`;
      });
    }

    const validTxtInternships = (resume.internships || []).filter(intern => intern.role?.trim() || intern.company?.trim() || intern.description?.trim() || intern.startDate?.trim() || intern.endDate?.trim());
    if (validTxtInternships.length > 0) {
      txt += `INTERNSHIPS\n`;
      txt += `-----------\n`;
      validTxtInternships.forEach(intern => {
        txt += `${intern.role || 'Intern Role'} | ${intern.company || 'Company'} (${intern.location || 'Remote'})\n`;
        txt += `Period: ${intern.startDate} – ${intern.current ? 'Present' : intern.endDate}\n`;
        txt += `${intern.description || ''}\n\n`;
      });
    }

    const validTxtProjects = (resume.projects || []).filter(proj => proj.title?.trim() || proj.description?.trim() || proj.technologies?.trim() || proj.link?.trim());
    if (validTxtProjects.length > 0) {
      txt += `FEATURED PROJECTS\n`;
      txt += `-----------------\n`;
      const projLines = validTxtProjects.map(proj => {
        let pStr = `${proj.title || 'Project Title'}`;
        if (proj.technologies) pStr += ` (${proj.technologies})`;
        if (proj.description) pStr += ` : ${proj.description}`;
        if (proj.link) pStr += ` [${proj.link}]`;
        return pStr;
      });
      txt += `${projLines.join("   |   ")}\n\n`;
    }

    // Languages Known (before core skills)
    const validTxtLanguages = splitByComma(resume.languages).filter(l => l && l.trim());
    if (validTxtLanguages.length > 0) {
      txt += `LANGUAGES KNOWN\n`;
      txt += `---------------\n`;
      validTxtLanguages.forEach(lang => {
        txt += `• ${lang}\n`;
      });
      txt += `\n`;
    }

    const validTxtSkills = (resume.skills || []).filter(s => s && s.trim());
    if (validTxtSkills.length > 0) {
      txt += `SKILLS & EXPERTISE\n`;
      txt += `------------------\n`;
      validTxtSkills.forEach(skill => {
        txt += `• ${skill}\n`;
      });
      txt += `\n`;
    }

    const validTxtCertifications = (resume.certifications || []).filter(c => c && c.trim());
    if (validTxtCertifications.length > 0) {
      txt += `CERTIFICATIONS\n`;
      txt += `--------------\n`;
      validTxtCertifications.forEach(cert => {
        txt += `• ${cert}\n`;
      });
      txt += `\n`;
    }

    const validTxtSoftSkills = splitByComma(resume.softSkills).filter(s => s && s.trim());
    if (validTxtSoftSkills.length > 0) {
      txt += `SOFT SKILLS\n`;
      txt += `-----------\n`;
      validTxtSoftSkills.forEach(soft => {
        txt += `• ${soft}\n`;
      });
      txt += `\n`;
    }

    if (resume.interests && resume.interests.length > 0) {
      txt += `INTERESTS\n`;
      txt += `---------\n`;
      resume.interests.forEach(interest => {
        txt += `• ${interest}\n`;
      });
      txt += `\n`;
    }

    const element = document.createElement("a");
    const file = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${resume.personalInfo.fullName.replace(/\s+/g, '_') || 'resume'}.txt`;
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const downloadAsHTML = () => {
    const title = resume.personalInfo.fullName || "Resume";
    const css = `
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color: #334155; line-height: 1.6; margin: 0; padding: 40px; background: #f8fafc; }
      .container { max-width: 800px; margin: 0 auto; background: white; padding: 50px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 1px solid #e2e8f0; }
      h1 { font-size: 32px; color: #0f172a; margin-bottom: 4px; font-weight: 800; }
      .subtitle { font-size: 18px; color: #4f46e5; font-weight: 600; margin-bottom: 20px; }
      .contact-block { font-size: 14px; color: #64748b; margin-bottom: 30px; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; }
      .section { margin-bottom: 35px; }
      .section-title { font-size: 16px; font-weight: 700; color: #4f46e5; text-transform: uppercase; tracking: 0.05em; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 15px; }
      .summary-text { font-size: 15px; color: #475569; }
      .item { margin-bottom: 24px; }
      .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
      .item-title { font-size: 16px; font-weight: 700; color: #1e293b; }
      .item-meta { font-size: 14px; color: #64748b; font-weight: 500; }
      .item-subtitle { font-size: 14px; color: #4f46e5; font-weight: 600; margin-bottom: 8px; }
      .item-desc { font-size: 14px; color: #475569; white-space: pre-line; }
      .tags { display: flex; flex-wrap: wrap; gap: 8px; }
      .tag { background: #f1f5f9; color: #334155; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 500; border: 1px solid #e2e8f0; }
    `;

    const currentIndustryKey = STANDARD_INDUSTRIES.includes(resume.industry) ? resume.industry : "Other";
    const indFieldsList = INDUSTRY_SPECIFIC_FIELDS[currentIndustryKey] || [];
    const hasIndFields = indFieldsList.some(field => resume.industryFields?.[field.key]?.trim());
    
    let industryFieldsHtml = "";
    if (hasIndFields) {
      const fieldsContent = indFieldsList.map(field => {
        const val = resume.industryFields?.[field.key];
        if (!val || !val.trim()) return "";
        const cleanLabel = getCleanLabel(field.label);
        return `
          <div style="margin-bottom: 12px;">
            <strong style="color: #0f172a; font-size: 14px;">${cleanLabel}:</strong>
            <span style="color: #475569; font-size: 14px; white-space: pre-line;">${val}</span>
          </div>
        `;
      }).join('');
      
      industryFieldsHtml = `
        <div class="section">
          <div class="section-title">${resume.industry} Specializations</div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px;">
            ${fieldsContent}
          </div>
        </div>
      `;
    }

    const experienceHtml = resume.experience.map(exp => `
      <div class="item">
        <div class="item-header">
          <span class="item-title">${exp.position || 'Position'}</span>
          <span class="item-meta">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span>
        </div>
        <div class="item-subtitle">${exp.company || 'Company'} &bull; ${exp.location || ''}</div>
        <div class="item-desc">${exp.description || ''}</div>
      </div>
    `).join('');

    const educationHtml = resume.education.map(edu => `
      <div class="item">
        <div class="item-header">
          <span class="item-title">${edu.degree || ""}${edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}</span>
          <span class="item-meta">${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}</span>
        </div>
        <div class="item-subtitle" style="display: flex; justify-content: space-between; font-weight: normal; color: #475569;">
          <span>${edu.institution || 'Institution'}${edu.location ? ` &bull; ${edu.location}` : ''}</span>
          ${edu.percentage ? `<span style="font-style: italic; font-size: 13px; color: #4f46e5;">Percentage: ${edu.percentage}</span>` : ''}
        </div>
      </div>
    `).join('');

    const internshipsHtml = resume.internships && resume.internships.length > 0 ? `
      <div class="section">
        <div class="section-title">Internships</div>
        ${resume.internships.map(intern => `
          <div class="item">
            <div class="item-header">
              <span class="item-title">${intern.role || 'Intern Role'}</span>
              <span class="item-meta">${intern.startDate} - ${intern.current ? 'Present' : intern.endDate}</span>
            </div>
            <div class="item-subtitle">${intern.company || 'Company'} &bull; ${intern.location || ''}</div>
            <div class="item-desc">${intern.description || ''}</div>
          </div>
        `).join('')}
      </div>
    ` : '';

    const projectsHtml = resume.projects && resume.projects.length > 0 ? `
      <div class="section">
        <div class="section-title">Projects</div>
        <div style="font-size: 14px; color: #334155; line-height: 1.6; display: flex; flex-direction: column; gap: 12px;">
          ${resume.projects.map(proj => {
            let titlePart = `<strong style="color: #0f172a; font-size: 14px;">&bull; ${proj.title || 'Project Title'}</strong>`;
            if (proj.technologies) {
              titlePart += ` <span style="color: #64748b; font-size: 12px; font-style: italic;">(${proj.technologies})</span>`;
            }
            if (proj.link) {
              titlePart += ` <a href="${proj.link}" target="_blank" style="color: #4f46e5; text-decoration: none; font-size: 12px; margin-left: 8px;">[Link]</a>`;
            }
            
            let descPart = '';
            if (proj.description) {
              descPart = `<div style="margin-top: 4px; margin-left: 12px; color: #475569;">${proj.description}</div>`;
            }
            return `<div style="margin-bottom: 8px;">
              <div>${titlePart}</div>
              ${descPart}
            </div>`;
          }).join('')}
        </div>
      </div>
    ` : '';

    const cleanLangs = splitByComma(resume.languages);
    const languagesHtml = cleanLangs.length > 0 ? `
      <div class="section">
        <div class="section-title">Languages Known</div>
        <div style="font-size: 14px; color: #475569; line-height: 1.6; padding-left: 12px;">
          ${cleanLangs.map(lang => `<div style="margin-bottom: 4px;">&bull; ${lang}</div>`).join('')}
        </div>
      </div>
    ` : '';

    const skillsHtml = resume.skills.length > 0 ? `
      <div class="section">
        <div class="section-title">Core Skills</div>
        <div class="tags">${resume.skills.map(s => `<span class="tag">${s}</span>`).join('')}</div>
      </div>
    ` : '';

    const certsHtml = resume.certifications.length > 0 ? `
      <div class="section">
        <div class="section-title">Certifications</div>
        <div class="tags">${resume.certifications.map(c => `<span class="tag">${c}</span>`).join('')}</div>
      </div>
    ` : '';

    const cleanSofts = splitByComma(resume.softSkills);
    const softSkillsHtml = cleanSofts.length > 0 ? `
      <div class="section">
        <div class="section-title">Soft Skills</div>
        <div style="font-size: 14px; color: #475569; line-height: 1.6; padding-left: 12px;">
          ${cleanSofts.map(soft => `<div style="margin-bottom: 4px;">&bull; ${soft}</div>`).join('')}
        </div>
      </div>
    ` : '';

    const cleanInts = splitByComma(resume.interests);
    const interestsHtml = cleanInts.length > 0 ? `
      <div class="section">
        <div class="section-title">Interests</div>
        <div style="font-size: 14px; color: #475569; line-height: 1.6; padding-left: 12px;">
          ${cleanInts.map(i => `<div style="margin-bottom: 4px;">&bull; ${i}</div>`).join('')}
        </div>
      </div>
    ` : '';

    const line1Items = [
      resume.personalInfo.email ? `✉ &nbsp; ${resume.personalInfo.email}` : '',
      resume.personalInfo.phone ? `📞 &nbsp; ${resume.personalInfo.phone}` : ''
    ].filter(Boolean);

    const contactBlockHtml = `
      <div class="contact-block" style="text-align: left; line-height: 1.5; font-size: 14px; margin-bottom: 15px;">
        ${line1Items.length > 0 ? `<div style="margin-bottom: 4px;">${line1Items.join(" &nbsp;&nbsp;|&nbsp;&nbsp; ")}</div>` : ''}
        ${resume.personalInfo.location ? `<div style="margin-bottom: 4px;">📍 &nbsp; ${resume.personalInfo.location}</div>` : ''}
        ${resume.personalInfo.linkedin ? `<div style="margin-bottom: 4px;">🔗 &nbsp; ${resume.personalInfo.linkedin}</div>` : ''}
        ${resume.personalInfo.github ? `<div style="margin-bottom: 4px;">💻 &nbsp; ${resume.personalInfo.github}</div>` : ''}
        ${resume.personalInfo.website ? `<div style="margin-bottom: 4px;">🌐 &nbsp; ${resume.personalInfo.website}</div>` : ''}
      </div>
    `;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} - Professional Resume</title>
        <style>${css}</style>
      </head>
      <body>
        <div class="container">
          <h1>${resume.personalInfo.fullName || 'Your Name'}</h1>
          <div class="subtitle">${resume.personalInfo.jobTitle || 'Professional Title'}</div>
          
          ${contactBlockHtml}

          ${resume.summary ? `
            <div class="section">
              <div class="section-title">Professional Summary</div>
              <div class="summary-text">${resume.summary}</div>
            </div>
          ` : ''}

          ${industryFieldsHtml}

          ${resume.experience.length > 0 ? `
            <div class="section">
              <div class="section-title">Professional Experience</div>
              <div>${experienceHtml}</div>
            </div>
          ` : ''}

          ${resume.education.length > 0 ? `
            <div class="section">
              <div class="section-title">Education</div>
              <div>${educationHtml}</div>
            </div>
          ` : ''}

          ${internshipsHtml}

          ${projectsHtml}

          ${languagesHtml}

          ${skillsHtml}

          ${certsHtml}

          ${softSkillsHtml}

          ${interestsHtml}
        </div>
      </body>
      </html>
    `;

    const element = document.createElement("a");
    const file = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${resume.personalInfo.fullName.replace(/\s+/g, '_') || 'resume'}.html`;
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar Controls - Left (no-print) */}
      <div className="lg:col-span-5 space-y-6 no-print">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Resume Builder</h2>
              <p className="text-sm text-slate-500">Configure your professional profile</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={onSave}
                className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors"
                title="Save Profile"
                id="btn-save-resume"
              >
                <Save className="w-5 h-5" />
              </button>
              <button
                onClick={downloadAsPDF}
                className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors"
                title="Download PDF"
                id="btn-download-pdf-resume"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Editor Content Area (no-print when previewing maybe? No, let's keep it responsive) */}
      <div className="lg:col-span-7 space-y-6 relative">
        <div className="space-y-6 no-print">
            {/* Personal Details */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-500" /> Personal Contact Information
              </h3>

              {/* Profile Photo Upload */}
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center pb-4 border-b border-slate-100">
                <div className="relative group flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden transition-all relative group-hover:border-indigo-500 cursor-pointer shadow-sm">
                    {resume.personalInfo.photo ? (
                      <>
                        <img src={resume.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Camera className="w-4 h-4 text-white" />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-slate-400">
                        <Camera className="w-5 h-5 mb-1 text-slate-400" />
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Photo</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      onChange={handlePhotoChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                  </div>
                  {resume.personalInfo.photo && (
                    <button
                      type="button"
                      onClick={() => updatePersonalInfo("photo", "")}
                      className="absolute -top-1 -right-1 bg-rose-500 hover:bg-rose-600 text-white p-1 rounded-full transition-colors shadow-sm z-20 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-slate-700">Profile Picture</h4>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Upload a professional headshot. Accepts <strong className="text-slate-600 font-semibold">PNG, JPEG, JPG, WEBP</strong> formats only. Max file size: 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={resume.personalInfo.fullName}
                    onChange={(e) => updatePersonalInfo("fullName", e.target.value.replace(/\d/g, ""))}
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Target Professional Title</label>
                  <input
                    type="text"
                    value={resume.personalInfo.jobTitle}
                    onChange={(e) => updatePersonalInfo("jobTitle", e.target.value.replace(/\d/g, ""))}
                    placeholder="Senior Software Architect"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Education / Qualification</label>
                  <input
                    type="text"
                    value={resume.personalInfo.education || ""}
                    onChange={(e) => updatePersonalInfo("education", e.target.value.replace(/\d/g, ""))}
                    placeholder="Bachelor of Science in Computer Science"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs text-slate-500">Education Year</label>
                    <span className="text-[10px] text-slate-400 font-mono">(YYYY-YYYY)</span>
                  </div>
                  <input
                    type="text"
                    value={resume.personalInfo.educationYear || ""}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
                      const formatted = digits.length > 4 ? `${digits.slice(0, 4)}-${digits.slice(4)}` : digits;
                      updatePersonalInfo("educationYear", formatted);
                    }}
                    placeholder="2023-2027"
                    maxLength={9}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={resume.personalInfo.email}
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={resume.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo("phone", e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="15550192834"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Location (City, State / Country)</label>
                  <input
                    type="text"
                    value={resume.personalInfo.location}
                    onChange={(e) => updatePersonalInfo("location", e.target.value)}
                    placeholder="San Francisco, CA"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">LinkedIn Profile Link</label>
                  <input
                    type="url"
                    value={resume.personalInfo.linkedin}
                    onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                    placeholder="linkedin.com/in/johndoe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">GitHub Profile Link</label>
                  <input
                    type="url"
                    value={resume.personalInfo.github || ""}
                    onChange={(e) => updatePersonalInfo("github", e.target.value)}
                    placeholder="github.com/johndoe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-500 mb-1">Personal Website / Portfolio Link</label>
                  <input
                    type="url"
                    value={resume.personalInfo.website}
                    onChange={(e) => updatePersonalInfo("website", e.target.value)}
                    placeholder="johndoe.dev"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Career Objective with AI Trigger */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-500" /> Career Objective
                </h3>
                <button
                  onClick={optimizeSummary}
                  disabled={isOptimizingSummary || !resume.summary}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-semibold hover:bg-indigo-100 disabled:opacity-50 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {isOptimizingSummary ? "Optimizing with AI..." : "AI Optimize"}
                </button>
              </div>
              <p className="text-xs text-slate-500">Provide an overview of your primary competencies. Click "AI Optimize" to rewrite and align with professional standards using strong phrasing.</p>
              <textarea
                value={resume.summary}
                onChange={(e) => onChange({ ...resume, summary: e.target.value })}
                placeholder="A dedicated expert specializing in..."
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-y"
              />
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-500" /> Work History & Experience
                </h3>
                {resume.experience.length < 1 ? (
                  <button
                    onClick={addExperience}
                    className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Role
                  </button>
                ) : (
                  <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md font-medium">
                    1 of 1 Experience Limit
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {resume.experience.length === 0 ? (
                  <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
                    No work experience added. Click "Add Role" above to get started.
                  </div>
                ) : (
                  resume.experience.map((exp, idx) => (
                    <div key={exp.id} className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 space-y-4 relative">
                      <button
                        onClick={() => deleteExperience(exp.id)}
                        className="absolute right-3 top-3 p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-slate-500 mb-0.5">Company / Organization</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                            placeholder="Acme Corp"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-0.5">Position Title</label>
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                            placeholder="Software Engineer"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-0.5">Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                            placeholder="Remote / New York"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs text-slate-500 mb-0.5">Start Date (DD/MM/YYYY)</label>
                            <input
                              type="text"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, "startDate", formatDateInput(e.target.value))}
                              placeholder="e.g., 01/02/2022"
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-500 mb-0.5">End Date (DD/MM/YYYY)</label>
                            <input
                              type="text"
                              value={exp.current ? "Present" : exp.endDate}
                              disabled={exp.current}
                              onChange={(e) => {
                                if (!exp.current) {
                                  updateExperience(exp.id, "endDate", formatDateInput(e.target.value));
                                }
                              }}
                              placeholder="e.g., 15/12/2024"
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-400"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2 flex items-center gap-2 mt-1">
                          <input
                            type="checkbox"
                            id={`current-${exp.id}`}
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor={`current-${exp.id}`} className="text-xs text-slate-600 font-medium">I currently work here</label>
                        </div>
                      </div>

                      {/* Bullet / Description */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs text-slate-500">Key Achievements & Responsibilities</label>
                          <button
                            type="button"
                            onClick={() => optimizeBullet(exp.id, exp.description, "experience")}
                            disabled={optimizingBulletId === exp.id || !exp.description}
                            className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[11px] font-semibold hover:bg-indigo-100 disabled:opacity-50 transition-colors"
                          >
                            <Sparkles className="w-3 h-3 text-indigo-500" />
                            {optimizingBulletId === exp.id ? "Optimizing..." : "AI Optimize"}
                          </button>
                        </div>
                        <textarea
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                          placeholder="Spearheaded critical system migrations. Collaborated with a team of 5 to decrease page latency by 30%..."
                          rows={3}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-500" /> Education & Academic Credentials
                </h3>
                {resume.education.length < 2 ? (
                  <button
                    onClick={addEducation}
                    className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Degree
                  </button>
                ) : (
                  <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md font-medium">
                    2 of 2 Education Limit
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {resume.education.length === 0 ? (
                  <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
                    No academic history added. Click "Add Degree" above.
                  </div>
                ) : (
                  resume.education.map((edu, idx) => (
                    <div key={edu.id} className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 space-y-4 relative">
                      <button
                        onClick={() => deleteEducation(edu.id)}
                        className="absolute right-3 top-3 p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>



                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-slate-500 mb-0.5">
                            {idx === 0 ? "School" : "Institution / University"}
                          </label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                            placeholder={idx === 0 ? "hr sec school" : "Stanford University"}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-0.5">
                            {idx === 0 ? "Studies" : "Degree Type"}
                          </label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                            placeholder={idx === 0 ? "Higher Secondary studies" : "Bachelor of Science"}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-0.5">Field of Study</label>
                          <input
                            type="text"
                            value={edu.fieldOfStudy}
                            onChange={(e) => updateEducation(edu.id, "fieldOfStudy", e.target.value)}
                            placeholder="Computer Science"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-0.5">Grade / Percentage</label>
                          <input
                            type="text"
                            value={edu.percentage || ""}
                            onChange={(e) => {
                              let val = e.target.value.replace(/[^0-9.]/g, "");
                              const parts = val.split(".");
                              if (parts.length > 2) {
                                val = parts[0] + "." + parts.slice(1).join("");
                              }
                              const parsed = parseFloat(val);
                              if (!isNaN(parsed) && parsed > 100) {
                                val = "100";
                              }
                              updateEducation(edu.id, "percentage", val);
                            }}
                            placeholder="e.g., 85 or 3.8"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2 md:col-span-2">
                          <div>
                            <label className="block text-xs text-slate-500 mb-0.5">Start Date (DD/MM/YYYY)</label>
                            <input
                              type="text"
                              value={edu.startDate}
                              onChange={(e) => updateEducation(edu.id, "startDate", formatDateInput(e.target.value))}
                              placeholder="e.g., 15/09/2018"
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-500 mb-0.5">End Date / Expected (DD/MM/YYYY)</label>
                            <input
                              type="text"
                              value={edu.current ? "Present" : edu.endDate}
                              disabled={edu.current}
                              onChange={(e) => {
                                if (!edu.current) {
                                  updateEducation(edu.id, "endDate", formatDateInput(e.target.value));
                                }
                              }}
                              placeholder="e.g., 20/06/2022"
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Internships */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-500" /> Internships
                </h3>
                {(resume.internships || []).length < 2 ? (
                  <button
                    onClick={addInternship}
                    className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Internship
                  </button>
                ) : (
                  <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md font-medium">
                    2 Internships Limit
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {(!resume.internships || resume.internships.length === 0) ? (
                  <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
                    No internships added yet. Click "Add Internship" above to add one.
                  </div>
                ) : (
                  resume.internships.map((intern) => (
                    <div key={intern.id} className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 space-y-4 relative">
                      <button
                        onClick={() => deleteInternship(intern.id)}
                        className="absolute right-3 top-3 p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Internship"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-slate-500 mb-0.5">Company / Organization</label>
                          <input
                            type="text"
                            value={intern.company}
                            onChange={(e) => updateInternship(intern.id, "company", e.target.value)}
                            placeholder="e.g., Google"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-0.5">Domain / Role</label>
                          <input
                            type="text"
                            value={intern.role}
                            onChange={(e) => updateInternship(intern.id, "role", e.target.value)}
                            placeholder="e.g., Fullstack"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-0.5">Location</label>
                          <input
                            type="text"
                            value={intern.location}
                            onChange={(e) => updateInternship(intern.id, "location", e.target.value)}
                            placeholder="e.g., Remote / San Francisco, CA"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs text-slate-500 mb-0.5">Start Date (DD/MM/YYYY)</label>
                            <input
                              type="text"
                              value={intern.startDate}
                              onChange={(e) => updateInternship(intern.id, "startDate", formatDateInput(e.target.value))}
                              placeholder="e.g., 01/05/2023"
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-500 mb-0.5">End Date (DD/MM/YYYY)</label>
                            <input
                              type="text"
                              value={intern.current ? "Present" : intern.endDate}
                              disabled={intern.current}
                              onChange={(e) => {
                                if (!intern.current) {
                                  updateInternship(intern.id, "endDate", formatDateInput(e.target.value));
                                }
                              }}
                              placeholder="e.g., 31/08/2023"
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-400"
                            />
                          </div>
                        </div>
                        <div className="md:col-span-2 flex items-center gap-2 mt-1">
                          <input
                            type="checkbox"
                            id={`current-intern-${intern.id}`}
                            checked={intern.current}
                            onChange={(e) => updateInternship(intern.id, "current", e.target.checked)}
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor={`current-intern-${intern.id}`} className="text-xs text-slate-600 font-medium">I currently intern here</label>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs text-slate-500">Key Responsibilities & Learnings</label>
                          <button
                            type="button"
                            onClick={() => optimizeBullet(intern.id, intern.description, "internship")}
                            disabled={optimizingBulletId === intern.id || !intern.description}
                            className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[11px] font-semibold hover:bg-indigo-100 disabled:opacity-50 transition-colors"
                          >
                            <Sparkles className="w-3 h-3 text-indigo-500" />
                            {optimizingBulletId === intern.id ? "Optimizing..." : "AI Optimize"}
                          </button>
                        </div>
                        <textarea
                          value={intern.description}
                          onChange={(e) => updateInternship(intern.id, "description", e.target.value)}
                          placeholder="Assisted in implementing scalable responsive components. Collaborated with a team of..."
                          rows={2}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <FileCode className="w-5 h-5 text-indigo-500" /> Projects
                </h3>
                {(resume.projects || []).length < 3 ? (
                  <button
                    onClick={addProject}
                    className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" /> Add Project
                  </button>
                ) : (
                  <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md font-medium">
                    3 Projects Limit
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {(!resume.projects || resume.projects.length === 0) ? (
                  <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
                    No projects added yet. Click "Add Project" above to highlight your work.
                  </div>
                ) : (
                  resume.projects.map((proj) => (
                    <div key={proj.id} className="p-4 bg-slate-50/50 rounded-xl border border-slate-100 space-y-4 relative">
                      <button
                        onClick={() => deleteProject(proj.id)}
                        className="absolute right-3 top-3 p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-slate-500 mb-0.5">Project Title</label>
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => updateProject(proj.id, "title", e.target.value)}
                            placeholder="e.g., E-commerce App"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-500 mb-0.5">Technologies Used</label>
                          <input
                            type="text"
                            value={proj.technologies}
                            onChange={(e) => updateProject(proj.id, "technologies", e.target.value)}
                            placeholder="e.g., React, Node.js, Tailwind CSS"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-slate-500 mb-0.5">Project Link (GitHub / Live Demo)</label>
                          <input
                            type="url"
                            value={proj.link || ""}
                            onChange={(e) => updateProject(proj.id, "link", e.target.value)}
                            placeholder="e.g., https://github.com/username/project"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="block text-xs text-slate-500">Project Description</label>
                          <button
                            type="button"
                            onClick={() => optimizeBullet(proj.id, proj.description, "project")}
                            disabled={optimizingBulletId === proj.id || !proj.description}
                            className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[11px] font-semibold hover:bg-indigo-100 disabled:opacity-50 transition-colors"
                          >
                            <Sparkles className="w-3 h-3 text-indigo-500" />
                            {optimizingBulletId === proj.id ? "Optimizing..." : "AI Optimize"}
                          </button>
                        </div>
                        <textarea
                          value={proj.description}
                          onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                          placeholder="A brief description of what the project does, key features, and achievements..."
                          rows={2}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Skills & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skills */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-500" /> Core Skills
                </h3>
                <form onSubmit={addSkill} className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="TypeScript, AWS, SQL"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Add
                  </button>
                </form>
                
                {/* Suggested Skills */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-slate-500">Suggested Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_SKILLS.filter(s => !resume.skills.includes(s)).map(skill => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => onChange({ ...resume, skills: [...resume.skills, skill] })}
                        className="px-2.5 py-1 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 text-[11px] font-medium rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3 text-indigo-500" /> {skill}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {resume.skills.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">No skills added to resume yet.</span>
                  ) : (
                    resume.skills.map(skill => (
                      <span
                        key={skill}
                        className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="text-slate-400 hover:text-slate-600 font-bold"
                        >
                          &times;
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-500" /> Certifications
                </h3>
                <form onSubmit={addCertification} className="flex gap-2">
                  <input
                    type="text"
                    value={newCert}
                    onChange={(e) => setNewCert(e.target.value)}
                    placeholder="PMP, AWS Certified, ScrumMaster"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Add
                  </button>
                </form>

                {/* Suggested Certifications */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-slate-500">Suggested Certifications:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_CERTS.filter(c => !resume.certifications.includes(c)).map(cert => (
                      <button
                        key={cert}
                        type="button"
                        onClick={() => onChange({ ...resume, certifications: [...resume.certifications, cert] })}
                        className="px-2.5 py-1 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 text-[11px] font-medium rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3 text-indigo-500" /> {cert}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {resume.certifications.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">No certifications added to resume yet.</span>
                  ) : (
                    resume.certifications.map(cert => (
                      <span
                        key={cert}
                        className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100"
                      >
                        {cert}
                        <button
                          type="button"
                          onClick={() => removeCertification(cert)}
                          className="text-indigo-400 hover:text-indigo-600 font-bold"
                        >
                          &times;
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Languages */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-500" /> Languages known
                </h3>
                <form onSubmit={addLanguage} className="flex gap-2">
                  <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="e.g., English, Spanish, Tamil"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Add
                  </button>
                </form>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {(!resume.languages || resume.languages.length === 0) ? (
                    <span className="text-xs text-slate-400 italic">No languages added yet.</span>
                  ) : (
                    resume.languages.map(lang => (
                      <span
                        key={lang}
                        className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full"
                      >
                        {lang}
                        <button
                          type="button"
                          onClick={() => removeLanguage(lang)}
                          className="text-slate-400 hover:text-slate-600 font-bold"
                        >
                          &times;
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-500" /> Soft Skills
                </h3>
                <form onSubmit={addSoftSkill} className="flex gap-2">
                  <input
                    type="text"
                    value={newSoftSkill}
                    onChange={(e) => setNewSoftSkill(e.target.value)}
                    placeholder="e.g., Leadership, Communication"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Add
                  </button>
                </form>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {(!resume.softSkills || resume.softSkills.length === 0) ? (
                    <span className="text-xs text-slate-400 italic">No soft skills added yet.</span>
                  ) : (
                    resume.softSkills.map(s => (
                      <span
                        key={s}
                        className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full border border-indigo-100"
                      >
                        {s}
                        <button
                          type="button"
                          onClick={() => removeSoftSkill(s)}
                          className="text-indigo-400 hover:text-indigo-600 font-bold"
                        >
                          &times;
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Interests */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-500" /> Interests
                </h3>
                <form onSubmit={addInterest} className="flex gap-2">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="e.g., web development , cloud computing"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Add
                  </button>
                </form>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {(!resume.interests || resume.interests.length === 0) ? (
                    <span className="text-xs text-slate-400 italic">No interests added yet.</span>
                  ) : (
                    resume.interests.map(i => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full"
                      >
                        {i}
                        <button
                          type="button"
                          onClick={() => removeInterest(i)}
                          className="text-slate-400 hover:text-slate-600 font-bold"
                        >
                          &times;
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PREVIEW STYLES */}
        <div className="absolute left-0 top-0 w-[820px] h-0 overflow-hidden pointer-events-none">
            <div className="mb-4 flex items-center justify-between no-print">
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Active: {TEMPLATES.find(t => t.id === activeTemplate)?.name}
              </span>
              <p className="text-xs text-slate-400 italic">Press Ctrl+P or Click 'Print' to export perfect A4 / US Letter sheets</p>
            </div>

            {/* Actual dynamic CSS templates compiled directly in React */}
            <div className="border border-slate-200 rounded-lg p-8 bg-white min-h-[842px] font-sans text-slate-800 print-root text-left" id="resume-document-print-area">
              {(() => {
                const validExperience = (resume.experience || []).filter(exp => exp.position?.trim() || exp.company?.trim() || exp.description?.trim() || exp.startDate?.trim() || exp.endDate?.trim());
                const validEducation = (resume.education || []).filter(edu => edu.institution?.trim() || edu.degree?.trim() || edu.fieldOfStudy?.trim() || edu.percentage?.trim() || edu.startDate?.trim() || edu.endDate?.trim());
                const validInternships = (resume.internships || []).filter(intern => intern.role?.trim() || intern.company?.trim() || intern.description?.trim() || intern.startDate?.trim() || intern.endDate?.trim());
                const validProjects = (resume.projects || []).filter(proj => proj.title?.trim() || proj.description?.trim() || proj.technologies?.trim() || proj.link?.trim());
                const validSkills = (resume.skills || []).filter(s => s && s.trim());
                const validCertifications = (resume.certifications || []).filter(c => c && c.trim());

                return (
                  <>
                    {activeTemplate === "tech-modern" && (
                      <div className="space-y-6">
                        {/* Tech Modern Header */}
                        <div className="border-b pb-4 border-slate-200 flex flex-row justify-between items-start gap-4">
                          <div className="flex-1">
                            {resume.personalInfo.fullName?.trim() && (
                              <h1 className="text-2xl font-bold tracking-tight text-slate-900">{resume.personalInfo.fullName.trim()}</h1>
                            )}
                            {(resume.personalInfo.jobTitle?.trim() || resume.personalInfo.education?.trim() || resume.personalInfo.educationYear?.trim()) && (
                              <p className="text-slate-800 font-medium text-sm mt-0.5">
                                {resume.personalInfo.jobTitle?.trim()}
                                {(resume.personalInfo.education?.trim() || resume.personalInfo.educationYear?.trim()) && (
                                  <span className="text-slate-600 font-normal">
                                    {resume.personalInfo.jobTitle?.trim() ? " | " : ""}
                                    {resume.personalInfo.education?.trim()}
                                    {resume.personalInfo.education?.trim() && resume.personalInfo.educationYear?.trim() ? ` (${resume.personalInfo.educationYear.trim()})` : (resume.personalInfo.educationYear?.trim() || "")}
                                  </span>
                                )}
                              </p>
                            )}
                            
                            {/* Contact Info (5 lines) */}
                            <div className="text-xs text-slate-500 mt-2.5 font-mono space-y-1">
                              {(resume.personalInfo.email || resume.personalInfo.phone) && (
                                <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                                  {resume.personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {resume.personalInfo.email}</span>}
                                  {resume.personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {resume.personalInfo.phone}</span>}
                                </div>
                              )}
                              {resume.personalInfo.location && (
                                <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {resume.personalInfo.location}</div>
                              )}
                              {resume.personalInfo.linkedin && (
                                <div className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5" /> {resume.personalInfo.linkedin}</div>
                              )}
                              {resume.personalInfo.github && (
                                <div className="flex items-center gap-1"><Github className="w-3.5 h-3.5" /> {resume.personalInfo.github}</div>
                              )}
                              {resume.personalInfo.website && (
                                <div className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {resume.personalInfo.website}</div>
                              )}
                            </div>
                          </div>
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-50 flex items-center justify-center flex-shrink-0 ml-4">
                            {resume.personalInfo.photo ? (
                              <img src={resume.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                                <svg className="w-10 h-10 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Summary */}
                        {resume.summary && (
                          <div className="space-y-1.5">
                            <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase border-b pb-1 border-slate-300">Career Objective</h2>
                            <p className="text-[13px] leading-relaxed text-slate-600">{resume.summary}</p>
                          </div>
                        )}

                        {/* Industry Specific Fields */}
                        {(() => {
                          const hasIndustryFields = Object.values(resume.industryFields || {}).some(val => val && val.trim() !== "");
                          if (!hasIndustryFields) return null;
                          const currentIndustryKey = STANDARD_INDUSTRIES.includes(resume.industry) ? resume.industry : "Other";
                          const fields = INDUSTRY_SPECIFIC_FIELDS[currentIndustryKey] || [];
                          
                          return (
                            <div className="space-y-1.5">
                              <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase border-b pb-1 border-slate-300">
                                {resume.industry === "Other" ? "Industry Specializations" : `${resume.industry} Specializations`}
                              </h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-[13px]">
                                {fields.map(field => {
                                  const val = resume.industryFields?.[field.key];
                                  if (!val || !val.trim()) return null;
                                  return (
                                    <div key={field.key} className={field.type === "textarea" ? "col-span-1 md:col-span-2" : ""}>
                                      <span className="font-bold text-slate-800">{getCleanLabel(field.label)}:</span>{" "}
                                      <span className="text-slate-600 whitespace-pre-line">{val}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })()}

                        {/* Experience */}
                        {validExperience.length > 0 && (
                          <div className="space-y-3">
                            <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase border-b pb-1 border-slate-300">Work History</h2>
                            <div className="space-y-4">
                              {validExperience.map(exp => (
                                <div key={exp.id} className="space-y-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="text-sm font-bold text-slate-900">{exp.position || "Untitled Position"}</h3>
                                      <p className="text-xs text-slate-500">{exp.company || "Company"}</p>
                                    </div>
                                    <div className="text-right text-xs text-slate-500">
                                      <p className="font-medium font-mono">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</p>
                                      <p className="text-[10px]">{exp.location}</p>
                                    </div>
                                  </div>
                                  <p className="text-xs leading-relaxed text-slate-600 pl-2 border-l-2 border-slate-200 whitespace-pre-line">{exp.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Education (before internships) */}
                        {validEducation.length > 0 && (
                          <div className="space-y-3">
                            <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase border-b pb-1 border-slate-300">Education</h2>
                            <div className="space-y-3.5">
                              {validEducation.map(edu => (
                                <div key={edu.id} className="text-xs space-y-0.5">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-bold text-slate-900">
                                        {edu.degree || "Degree"}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                                      </h3>
                                      <p className="text-slate-600 font-medium text-[11px]">{edu.institution || "Institution"}</p>
                                      {edu.location && <p className="text-slate-500 text-[10px]">{edu.location}</p>}
                                      {edu.percentage && <p className="text-[10px] text-indigo-600 font-semibold mt-0.5">Percentage: {edu.percentage}</p>}
                                    </div>
                                    <div className="text-right text-xs text-slate-500 font-mono">
                                      <p className="font-medium">{edu.startDate} – {edu.current ? "Present" : edu.endDate}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Internships */}
                        {validInternships.length > 0 && (
                          <div className="space-y-3">
                            <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase border-b pb-1 border-slate-300">Internship Experience</h2>
                            <div className="space-y-4">
                              {validInternships.map(intern => (
                                <div key={intern.id} className="space-y-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                                        <span className="text-[10px] text-slate-400">•</span>
                                        <span>{intern.role || "Untitled Intern"}</span>
                                      </h3>
                                      <p className="text-xs text-slate-500 pl-3">{intern.company || "Company"}</p>
                                    </div>
                                    <div className="text-right text-xs text-slate-500">
                                      <p className="font-medium font-mono">{intern.startDate} – {intern.current ? "Present" : intern.endDate}</p>
                                      <p className="text-[10px]">{intern.location}</p>
                                    </div>
                                  </div>
                                  <p className="text-xs leading-relaxed text-slate-600 pl-5 border-l-2 border-slate-200 whitespace-pre-line">{intern.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Projects (rendered on separate lines) */}
                        {validProjects.length > 0 && (
                          <div className="space-y-3">
                            <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase border-b pb-1 border-slate-300">Projects</h2>
                            <div className="space-y-3 flex flex-col">
                              {validProjects.map((proj) => (
                                <div key={proj.id} className="text-xs space-y-1">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="text-[10px] text-slate-400">•</span>
                                      <span className="font-bold text-slate-900 text-sm">{proj.title || "Untitled Project"}</span>
                                      {proj.technologies && (
                                        <span className="text-[10px] text-slate-500 font-mono bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                                          {proj.technologies}
                                        </span>
                                      )}
                                    </div>
                                    {proj.link && (
                                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[11px] text-indigo-600 font-medium hover:underline font-mono">
                                        {proj.link}
                                      </a>
                                    )}
                                  </div>
                                  {proj.description && (
                                    <p className="text-slate-600 pl-4 border-l-2 border-slate-200 whitespace-pre-line text-xs leading-relaxed">
                                      {proj.description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Skills & Certs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          {/* Languages Known (before core skills) */}
                          {(() => {
                            const cleanLanguages = splitByComma(resume.languages);
                            return cleanLanguages.length > 0 && (
                              <div className="space-y-1.5">
                                <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase border-b pb-1 border-slate-300 font-semibold">Languages Known</h2>
                                <div className="space-y-1">
                                  {cleanLanguages.map((lang, index) => (
                                    <p key={index} className="text-xs text-slate-600 font-mono flex items-center gap-1.5">
                                      <span className="w-1 h-1 bg-slate-900 rounded-full inline-block flex-shrink-0" /> {lang}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            );
                          })()}

                          {/* Technical Competencies / Core Skills */}
                          {validSkills.length > 0 && (
                            <div className="space-y-1.5">
                              <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase border-b pb-1 border-slate-300 font-semibold">Technical Competencies</h2>
                              <div className="space-y-1">
                                {validSkills.map((skill, index) => (
                                  <p key={index} className="text-xs text-slate-600 font-mono flex items-center gap-1.5">
                                    <span className="w-1 h-1 bg-slate-900 rounded-full inline-block flex-shrink-0" /> {skill}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Certifications & Licenses */}
                          {validCertifications.length > 0 && (
                            <div className="space-y-1.5">
                              <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase border-b pb-1 border-slate-300 font-semibold">Certifications & Licenses</h2>
                              <div className="space-y-1">
                                {validCertifications.map((cert, index) => (
                                  <p key={index} className="text-xs text-slate-600 font-mono flex items-center gap-1.5">
                                    <span className="w-1 h-1 bg-slate-900 rounded-full inline-block flex-shrink-0" /> {cert}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}

                    {/* Soft Skills */}
                    {(() => {
                      const cleanSoftSkills = splitByComma(resume.softSkills);
                      return cleanSoftSkills.length > 0 && (
                        <div className="space-y-1.5">
                          <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase border-b pb-1 border-slate-300 font-semibold">Soft Skills</h2>
                          <div className="space-y-1">
                            {cleanSoftSkills.map((soft, index) => (
                              <p key={index} className="text-xs text-slate-600 font-mono flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-slate-900 rounded-full inline-block flex-shrink-0" /> {soft}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Interests */}
                    {(() => {
                      const cleanInterests = splitByComma(resume.interests);
                      return cleanInterests.length > 0 && (
                        <div className="space-y-1.5">
                          <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase border-b pb-1 border-slate-300 font-semibold">Interests</h2>
                          <div className="space-y-1">
                            {cleanInterests.map((interest, index) => (
                              <p key={index} className="text-xs text-slate-600 font-mono flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-slate-900 rounded-full inline-block flex-shrink-0" /> {interest}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {activeTemplate === "executive-classic" && (
                <div className="space-y-6 font-serif">
                  {/* Executive Classic Header */}
                  <div className="pb-4 border-b border-slate-200 flex flex-row justify-between items-start gap-4">
                    <div className="flex-1 space-y-1">
                      {resume.personalInfo.fullName?.trim() && (
                        <h1 className="text-2xl font-semibold tracking-wide text-slate-950 uppercase">{resume.personalInfo.fullName.trim()}</h1>
                      )}
                      {(resume.personalInfo.jobTitle?.trim() || resume.personalInfo.education?.trim() || resume.personalInfo.educationYear?.trim()) && (
                        <p className="text-slate-700 italic tracking-wider text-sm">
                          {resume.personalInfo.jobTitle?.trim()}
                          {(resume.personalInfo.education?.trim() || resume.personalInfo.educationYear?.trim()) && (
                            <span className="not-italic font-normal">
                              {resume.personalInfo.jobTitle?.trim() ? " | " : ""}
                              {resume.personalInfo.education?.trim()}
                              {resume.personalInfo.education?.trim() && resume.personalInfo.educationYear?.trim() ? ` (${resume.personalInfo.educationYear.trim()})` : (resume.personalInfo.educationYear?.trim() || "")}
                            </span>
                          )}
                        </p>
                      )}
                      
                      {/* Contact Info with Lucide Icons (5 lines) */}
                      <div className="text-xs text-slate-600 mt-2 font-sans space-y-1 flex flex-col items-center text-center">
                        {(resume.personalInfo.email || resume.personalInfo.phone) && (
                          <div className="flex flex-wrap gap-x-3 gap-y-0.5 justify-center">
                            {resume.personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-500" /> {resume.personalInfo.email}</span>}
                            {resume.personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-500" /> {resume.personalInfo.phone}</span>}
                          </div>
                        )}
                        {resume.personalInfo.location && (
                          <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {resume.personalInfo.location}</div>
                        )}
                        {resume.personalInfo.linkedin && (
                          <div className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5 text-slate-500" /> {resume.personalInfo.linkedin}</div>
                        )}
                        {resume.personalInfo.github && (
                          <div className="flex items-center gap-1"><Github className="w-3.5 h-3.5 text-slate-500" /> {resume.personalInfo.github}</div>
                        )}
                        {resume.personalInfo.website && (
                          <div className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-slate-500" /> {resume.personalInfo.website}</div>
                        )}
                      </div>
                    </div>
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-300 bg-slate-50 flex items-center justify-center flex-shrink-0 ml-4">
                      {resume.personalInfo.photo ? (
                        <img src={resume.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                          <svg className="w-10 h-10 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  {resume.summary && (
                    <div className="space-y-2">
                      <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase text-center">Career Objective</h2>
                      <p className="text-sm leading-relaxed text-slate-700 text-justify italic">{resume.summary}</p>
                    </div>
                  )}

                  {/* Industry Specific Fields */}
                  {(() => {
                    const hasIndustryFields = Object.values(resume.industryFields || {}).some(val => val && val.trim() !== "");
                    if (!hasIndustryFields) return null;
                    const currentIndustryKey = STANDARD_INDUSTRIES.includes(resume.industry) ? resume.industry : "Other";
                    const fields = INDUSTRY_SPECIFIC_FIELDS[currentIndustryKey] || [];
                    
                    return (
                      <div className="space-y-2">
                        <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase text-center border-b pb-1 border-slate-200">
                          {resume.industry === "Other" ? "Industry Specializations" : `${resume.industry} Specializations`}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                          {fields.map(field => {
                            const val = resume.industryFields?.[field.key];
                            if (!val || !val.trim()) return null;
                            return (
                              <div key={field.key} className={field.type === "textarea" ? "col-span-1 md:col-span-2 text-center" : "text-center md:text-left"}>
                                <span className="font-bold text-slate-900">{getCleanLabel(field.label)}:</span>{" "}
                                <span className="text-slate-700 whitespace-pre-line">{val}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Experience */}
                  {validExperience.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase text-center border-b pb-1 border-slate-200">Professional Experience</h2>
                      <div className="space-y-5">
                        {validExperience.map(exp => (
                          <div key={exp.id} className="space-y-1">
                            <div className="flex justify-between items-baseline">
                              <h3 className="text-sm font-bold text-slate-950">{exp.company || "Company"} – <span className="font-normal italic">{exp.position || "Untitled Position"}</span></h3>
                              <span className="text-xs font-mono text-slate-600">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                            </div>
                            <p className="text-xs text-slate-500 font-sans italic">{exp.location}</p>
                            <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-line pl-1">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education (before internships) */}
                  {validEducation.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase text-center border-b pb-1 border-slate-200">Academic History</h2>
                      <div className="space-y-3.5">
                        {validEducation.map(edu => (
                          <div key={edu.id} className="flex justify-between items-start text-xs">
                            <div>
                              <h3 className="font-bold text-slate-950">
                                {edu.degree || "Degree"}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                              </h3>
                              <p className="italic text-slate-600">{edu.institution || "Institution"}</p>
                              {edu.location && <p className="italic text-slate-500 text-[11px]">{edu.location}</p>}
                              {edu.percentage && <p className="text-[10px] text-slate-600 mt-0.5 font-sans italic font-bold">Percentage: {edu.percentage}</p>}
                            </div>
                            <div className="text-right text-slate-500 font-mono">
                              <p>{edu.startDate} – {edu.current ? "Present" : edu.endDate}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Internships */}
                  {validInternships.length > 0 && (
                    <div className="space-y-4 font-serif">
                      <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase text-center border-b pb-1 border-slate-200">Internship Experience</h2>
                      <div className="space-y-5">
                        {validInternships.map(intern => (
                          <div key={intern.id} className="space-y-1">
                            <div className="flex justify-between items-baseline">
                              <h3 className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                                <span className="text-[10px] text-slate-500 font-normal">•</span>
                                <span>{intern.company || "Company"} – <span className="font-normal italic">{intern.role || "Untitled Intern"}</span></span>
                              </h3>
                              <span className="text-xs font-mono text-slate-600">{intern.startDate} – {intern.current ? "Present" : intern.endDate}</span>
                            </div>
                            <p className="text-xs text-slate-500 font-sans italic pl-3">{intern.location}</p>
                            <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-line pl-3">{intern.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects (rendered on separate lines) */}
                  {validProjects.length > 0 && (
                    <div className="space-y-4 font-serif">
                      <h2 className="text-xs font-bold tracking-widest text-slate-900 uppercase text-center border-b pb-1 border-slate-200">Projects</h2>
                      <div className="space-y-3.5 flex flex-col text-left">
                        {validProjects.map((proj) => (
                          <div key={proj.id} className="text-xs space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-slate-100 pb-0.5">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[10px] text-slate-400">•</span>
                                <span className="font-bold text-slate-950 text-sm">{proj.title || "Untitled Project"}</span>
                                {proj.technologies && (
                                  <span className="text-[10px] text-slate-500 italic bg-slate-50 px-1 py-0.5 rounded">
                                    ({proj.technologies})
                                  </span>
                                )}
                              </div>
                              {proj.link && (
                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[11px] text-indigo-600 hover:underline">
                                  {proj.link}
                                </a>
                              )}
                            </div>
                            {proj.description && (
                              <p className="text-slate-700 pl-3 whitespace-pre-line text-xs leading-relaxed">
                                {proj.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills & Certs */}
                  {(splitByComma(resume.languages).length > 0 || validSkills.length > 0 || validCertifications.length > 0 || splitByComma(resume.softSkills).length > 0 || splitByComma(resume.interests).length > 0) && (
                    <div className="grid grid-cols-2 gap-6 border-t pt-4 border-slate-200 font-sans">
                      {/* Languages Known (before core skills) */}
                      {(() => {
                        const cleanLanguages = splitByComma(resume.languages);
                        return cleanLanguages.length > 0 && (
                          <div className="space-y-1">
                            <h3 className="text-xs font-bold tracking-widest text-slate-900 uppercase">Languages Known</h3>
                            <div className="space-y-1">
                              {cleanLanguages.map((lang, index) => (
                                <p key={index} className="text-xs text-slate-700 flex items-center gap-1.5">
                                  <span className="w-1 h-1 bg-slate-600 rounded-full inline-block flex-shrink-0" /> {lang}
                                </p>
                              ))}
                            </div>
                          </div>
                        );
                      })()}

                      {/* Core Expertise */}
                      {validSkills.length > 0 && (
                        <div className="space-y-1">
                          <h3 className="text-xs font-bold tracking-widest text-slate-900 uppercase">Core Expertise</h3>
                          <div className="space-y-1">
                            {validSkills.map((skill, index) => (
                              <p key={index} className="text-xs text-slate-700 flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-slate-600 rounded-full inline-block flex-shrink-0" /> {skill}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Certifications */}
                      {validCertifications.length > 0 && (
                        <div className="space-y-1">
                          <h3 className="text-xs font-bold tracking-widest text-slate-900 uppercase">Certifications</h3>
                          <div className="space-y-1">
                            {validCertifications.map((cert, index) => (
                              <p key={index} className="text-xs text-slate-700 flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-slate-600 rounded-full inline-block flex-shrink-0" /> {cert}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Soft Skills */}
                    {(() => {
                      const cleanSoftSkills = splitByComma(resume.softSkills);
                      return cleanSoftSkills.length > 0 && (
                        <div className="space-y-1">
                          <h3 className="text-xs font-bold tracking-widest text-slate-900 uppercase">Soft Skills</h3>
                          <div className="space-y-1">
                            {cleanSoftSkills.map((soft, index) => (
                              <p key={index} className="text-xs text-slate-700 flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-slate-600 rounded-full inline-block flex-shrink-0" /> {soft}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Interests */}
                    {(() => {
                      const cleanInterests = splitByComma(resume.interests);
                      return cleanInterests.length > 0 && (
                        <div className="space-y-1">
                          <h3 className="text-xs font-bold tracking-widest text-slate-900 uppercase">Interests</h3>
                          <div className="space-y-1">
                            {cleanInterests.map((interest, index) => (
                              <p key={index} className="text-xs text-slate-700 flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-slate-600 rounded-full inline-block flex-shrink-0" /> {interest}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}
              {activeTemplate === "creative-teal" && (
                <div className="space-y-6">
                  {/* Creative Header */}
                  <div className="border-b pb-4 border-slate-300 flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-1">
                      {resume.personalInfo.fullName?.trim() && (
                        <h1 className="text-2xl font-bold text-slate-950 tracking-tight">{resume.personalInfo.fullName.trim()}</h1>
                      )}
                      {(resume.personalInfo.jobTitle?.trim() || resume.personalInfo.education?.trim() || resume.personalInfo.educationYear?.trim()) && (
                        <p className="text-slate-800 font-medium text-sm mt-0.5">
                          {resume.personalInfo.jobTitle?.trim()}
                          {(resume.personalInfo.education?.trim() || resume.personalInfo.educationYear?.trim()) && (
                            <span className="text-slate-600 font-normal">
                              {resume.personalInfo.jobTitle?.trim() ? " | " : ""}
                              {resume.personalInfo.education?.trim()}
                              {resume.personalInfo.education?.trim() && resume.personalInfo.educationYear?.trim() ? ` (${resume.personalInfo.educationYear.trim()})` : (resume.personalInfo.educationYear?.trim() || "")}
                            </span>
                          )}
                        </p>
                      )}
                      
                      <div className="text-xs text-slate-500 mt-2.5 font-mono space-y-1">
                        {(resume.personalInfo.email || resume.personalInfo.phone) && (
                          <div className="flex flex-wrap gap-x-4 gap-y-1">
                            {resume.personalInfo.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-slate-500" /> {resume.personalInfo.email}</span>}
                            {resume.personalInfo.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-500" /> {resume.personalInfo.phone}</span>}
                          </div>
                        )}
                        {resume.personalInfo.location && <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" /> {resume.personalInfo.location}</div>}
                        {resume.personalInfo.linkedin && <div className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5 text-slate-500" /> {resume.personalInfo.linkedin}</div>}
                        {resume.personalInfo.github && <div className="flex items-center gap-1"><Github className="w-3.5 h-3.5 text-slate-500" /> {resume.personalInfo.github}</div>}
                        {resume.personalInfo.website && <div className="flex items-center gap-1"><Globe className="w-3.5 h-3.5 text-slate-500" /> {resume.personalInfo.website}</div>}
                      </div>
                    </div>
                    <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-slate-300 bg-slate-50 flex items-center justify-center flex-shrink-0 ml-4 shadow-sm">
                      {resume.personalInfo.photo ? (
                        <img src={resume.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                          <svg className="w-10 h-10 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-6">
                    {/* Left Accent Column */}
                    <div className="col-span-4 bg-slate-50 p-4 rounded-xl space-y-6 border border-slate-200">
                      {(() => {
                        const cleanLanguages = splitByComma(resume.languages);
                        return cleanLanguages.length > 0 && (
                          <div className="space-y-2">
                            <h3 className="font-semibold text-slate-900 uppercase tracking-wider text-[10px]">Languages Known</h3>
                            <div className="space-y-1">
                              {cleanLanguages.map(lang => (
                                <p key={lang} className="text-slate-700 text-[10px] font-medium flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 bg-slate-600 rounded-full inline-block flex-shrink-0" /> {lang}
                                </p>
                              ))}
                            </div>
                          </div>
                        );
                      })()}

                      {validSkills.length > 0 && (
                        <div className="space-y-2">
                          <h3 className="font-semibold text-slate-900 uppercase tracking-wider text-[10px]">Technical Stack</h3>
                          <div className="space-y-1">
                            {validSkills.map(s => (
                              <p key={s} className="text-slate-700 text-[10px] font-medium flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-slate-900 rounded-full inline-block flex-shrink-0" /> {s}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {validCertifications.length > 0 && (
                        <div className="space-y-2">
                          <h3 className="font-semibold text-slate-900 uppercase tracking-wider text-[10px]">Accreditation</h3>
                          <div className="space-y-1 text-xs text-slate-600">
                            {validCertifications.map(c => (
                              <p key={c} className="border-l-2 border-slate-900 pl-1.5 leading-tight">{c}</p>
                            ))}
                          </div>
                        </div>
                      )}

                      {(() => {
                        const cleanSoftSkills = splitByComma(resume.softSkills);
                        return cleanSoftSkills.length > 0 && (
                          <div className="space-y-2">
                            <h3 className="font-semibold text-slate-900 uppercase tracking-wider text-[10px]">Soft Skills</h3>
                            <div className="space-y-1">
                              {cleanSoftSkills.map(s => (
                                <p key={s} className="text-slate-700 text-[10px] font-medium flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 bg-slate-500 rounded-full inline-block flex-shrink-0" /> {s}
                                </p>
                              ))}
                            </div>
                          </div>
                        );
                      })()}

                      {(() => {
                        const cleanInterests = splitByComma(resume.interests);
                        return cleanInterests.length > 0 && (
                          <div className="space-y-2">
                            <h3 className="font-semibold text-slate-900 uppercase tracking-wider text-[10px]">Interests</h3>
                            <div className="space-y-1">
                              {cleanInterests.map(i => (
                                <p key={i} className="text-slate-700 text-[10px] font-medium flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full inline-block flex-shrink-0" /> {i}
                                </p>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Right Core Content */}
                    <div className="col-span-8 space-y-6">
                      {resume.summary && (
                        <div className="space-y-1.5">
                          <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1">About Me</h2>
                          <p className="text-xs leading-relaxed text-slate-600">{resume.summary}</p>
                        </div>
                      )}

                      {/* Industry Specific Fields */}
                      {(() => {
                        const hasIndustryFields = Object.values(resume.industryFields || {}).some(val => val && val.trim() !== "");
                        if (!hasIndustryFields) return null;
                        const currentIndustryKey = STANDARD_INDUSTRIES.includes(resume.industry) ? resume.industry : "Other";
                        const fields = INDUSTRY_SPECIFIC_FIELDS[currentIndustryKey] || [];
                        
                        return (
                          <div className="space-y-1.5">
                            <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1">
                              {resume.industry === "Other" ? "Industry Specialties" : `${resume.industry} Specialties`}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-600">
                              {fields.map(field => {
                                const val = resume.industryFields?.[field.key];
                                if (!val || !val.trim()) return null;
                                return (
                                  <div key={field.key} className={field.type === "textarea" ? "col-span-1 md:col-span-2" : ""}>
                                    <span className="font-bold text-slate-800">{getCleanLabel(field.label)}:</span>{" "}
                                    <span className="text-slate-600 whitespace-pre-line">{val}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}

                      {validExperience.length > 0 && (
                        <div className="space-y-3">
                          <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1">Professional Roles</h2>
                          <div className="space-y-4">
                            {validExperience.map(exp => (
                              <div key={exp.id} className="space-y-1">
                                <div className="flex justify-between items-start text-xs">
                                  <div>
                                    <h4 className="font-bold text-slate-900">{exp.position || "Position"}</h4>
                                    <p className="text-slate-800 font-semibold">{exp.company || "Company"}</p>
                                  </div>
                                  <p className="text-[10px] text-slate-400 font-mono">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</p>
                                </div>
                                <p className="text-[11px] leading-relaxed text-slate-600 pl-1">{exp.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Academic Background (Reordered before Internships & Projects) */}
                      {validEducation.length > 0 && (
                        <div className="space-y-3">
                          <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1">Academic Background</h2>
                          <div className="space-y-3.5">
                            {validEducation.map(edu => (
                              <div key={edu.id} className="text-xs space-y-0.5">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-bold text-slate-900">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}</h4>
                                    <p className="text-slate-600 font-medium text-[11px]">{edu.institution || "Institution"}{edu.location ? ` • ${edu.location}` : ""}</p>
                                    {edu.percentage && <p className="text-[10px] text-teal-600 font-bold mt-0.5">Percentage: {edu.percentage}</p>}
                                  </div>
                                  <div className="text-right text-[11px] text-slate-500 font-mono">
                                    <p>{edu.startDate} – {edu.endDate}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Internships */}
                      {validInternships.length > 0 && (
                        <div className="space-y-3">
                          <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1">Internships</h2>
                          <div className="space-y-4">
                            {validInternships.map(intern => (
                              <div key={intern.id} className="space-y-1">
                                <div className="flex justify-between items-start text-xs">
                                  <div>
                                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                                      <span className="text-[10px] text-teal-600 font-normal">•</span>
                                      <span>{intern.role || "Role"}</span>
                                    </h4>
                                    <p className="text-slate-800 font-semibold pl-3">{intern.company || "Company"}</p>
                                  </div>
                                  <p className="text-[10px] text-slate-400 font-mono">{intern.startDate} – {intern.current ? "Present" : intern.endDate}</p>
                                </div>
                                <p className="text-[11px] leading-relaxed text-slate-600 pl-4">{intern.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Projects (rendered on separate lines) */}
                      {validProjects.length > 0 && (
                        <div className="space-y-3">
                          <h2 className="text-xs font-bold text-slate-950 uppercase tracking-wider border-b border-slate-300 pb-1">Projects</h2>
                          <div className="space-y-3.5 flex flex-col">
                            {validProjects.map((proj) => (
                              <div key={proj.id} className="text-xs space-y-1">
                                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-0.5">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="text-[10px] text-teal-600">•</span>
                                    <span className="font-bold text-slate-950 text-sm">{proj.title || "Untitled Project"}</span>
                                    {proj.technologies && (
                                      <span className="text-[10px] text-slate-500 font-mono bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                                        {proj.technologies}
                                      </span>
                                    )}
                                  </div>
                                  {proj.link && (
                                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[11px] text-teal-600 font-medium hover:underline font-mono">
                                      {proj.link}
                                    </a>
                                  )}
                                </div>
                                {proj.description && (
                                  <p className="text-slate-600 pl-4 border-l-2 border-teal-500/30 whitespace-pre-line text-xs leading-relaxed">
                                    {proj.description}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTemplate === "healthcare-grid" && (
                <div className="space-y-4 border border-slate-300 p-4 rounded-lg bg-slate-50/20">
                  {/* Grid layout */}
                  <div className="flex justify-between items-start border-b border-slate-300 pb-3 gap-4">
                    <div className="flex-1">
                      {resume.personalInfo.fullName?.trim() && (
                        <h1 className="text-xl font-bold tracking-tight text-slate-900">{resume.personalInfo.fullName.trim()}</h1>
                      )}
                      {(resume.personalInfo.jobTitle?.trim() || resume.personalInfo.education?.trim() || resume.personalInfo.educationYear?.trim()) && (
                        <p className="text-xs text-slate-600 mt-0.5 font-medium">
                          {resume.personalInfo.jobTitle?.trim()}
                          {(resume.personalInfo.education?.trim() || resume.personalInfo.educationYear?.trim()) && (
                            <span className="text-slate-500 font-normal">
                              {resume.personalInfo.jobTitle?.trim() ? " | " : ""}
                              {resume.personalInfo.education?.trim()}
                              {resume.personalInfo.education?.trim() && resume.personalInfo.educationYear?.trim() ? ` (${resume.personalInfo.educationYear.trim()})` : (resume.personalInfo.educationYear?.trim() || "")}
                            </span>
                          )}
                        </p>
                      )}
                      
                      <div className="text-xs text-slate-500 font-mono mt-1.5 space-y-1">
                        {(resume.personalInfo.email || resume.personalInfo.phone) && (
                          <div>
                            {[resume.personalInfo.email, resume.personalInfo.phone].filter(Boolean).join("  |  ")}
                          </div>
                        )}
                        {resume.personalInfo.location && <div>Location: {resume.personalInfo.location}</div>}
                        {resume.personalInfo.linkedin && <div>LinkedIn: {resume.personalInfo.linkedin}</div>}
                        {resume.personalInfo.github && <div>GitHub: {resume.personalInfo.github}</div>}
                        {resume.personalInfo.website && <div>Portfolio: {resume.personalInfo.website}</div>}
                      </div>
                    </div>
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-300 bg-slate-50 flex items-center justify-center flex-shrink-0 ml-4">
                      {resume.personalInfo.photo ? (
                        <img src={resume.personalInfo.photo} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                          <svg className="w-10 h-10 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Summary row */}
                  {resume.summary && (
                    <div className="border border-slate-200 p-3 rounded bg-white text-xs space-y-1">
                      <strong className="text-slate-800 uppercase tracking-wider text-[10px]">Executive Outline:</strong>
                      <p className="leading-relaxed text-slate-600">{resume.summary}</p>
                    </div>
                  )}

                  {/* Industry Specific Fields */}
                  {(() => {
                    const hasIndustryFields = Object.values(resume.industryFields || {}).some(val => val && val.trim() !== "");
                    if (!hasIndustryFields) return null;
                    const currentIndustryKey = STANDARD_INDUSTRIES.includes(resume.industry) ? resume.industry : "Other";
                    const fields = INDUSTRY_SPECIFIC_FIELDS[currentIndustryKey] || [];
                    
                    return (
                      <div className="border border-slate-200 p-3 rounded bg-white text-xs space-y-2">
                        <strong className="text-slate-800 uppercase tracking-wider text-[10px] block border-b pb-1 mb-1 border-slate-100">
                          {resume.industry === "Other" ? "Specialized Criteria:" : `${resume.industry} Criteria:`}
                        </strong>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-slate-600">
                          {fields.map(field => {
                            const val = resume.industryFields?.[field.key];
                            if (!val || !val.trim()) return null;
                            return (
                              <div key={field.key} className={field.type === "textarea" ? "col-span-1 md:col-span-2" : ""}>
                                <span className="font-bold text-slate-800">{getCleanLabel(field.label)}:</span>{" "}
                                <span className="text-slate-600 whitespace-pre-line">{val}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()}

                  {/* History Grid */}
                  {validExperience.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b pb-1 border-slate-300">Detailed Chronology</h3>
                      <div className="space-y-2">
                        {validExperience.map(exp => (
                          <div key={exp.id} className="border border-slate-200 bg-white p-3 rounded text-xs grid grid-cols-12 gap-2">
                            <div className="col-span-3 border-r border-slate-100 pr-2">
                              <span className="font-bold font-mono text-[10px] text-slate-500">{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                              <p className="text-[10px] text-slate-400 mt-0.5">{exp.location}</p>
                            </div>
                            <div className="col-span-9">
                              <h4 className="font-bold text-slate-900">{exp.position} at {exp.company}</h4>
                              <p className="text-[11px] leading-relaxed text-slate-600 mt-1 whitespace-pre-line">{exp.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education Grid (Reordered before Internships & Projects) */}
                  {validEducation.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b pb-1 border-slate-300">Degree & Credentials</h3>
                      <div className="space-y-2">
                        {validEducation.map(edu => (
                          <div key={edu.id} className="border border-slate-200 bg-white p-3 rounded text-xs space-y-0.5">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-slate-950">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}</h4>
                                <p className="text-slate-600 font-medium text-[11px]">{edu.institution || "Institution"}</p>
                                {edu.location && <p className="text-slate-500 text-[10px]">{edu.location}</p>}
                                {edu.percentage && <p className="text-[10px] text-indigo-600 font-bold mt-0.5 font-sans">Percentage: {edu.percentage}</p>}
                              </div>
                              <div className="text-right text-slate-500 font-mono">
                                <p>{edu.startDate} – {edu.endDate}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Internships Grid */}
                  {validInternships.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b pb-1 border-slate-300">Internship Roles</h3>
                      <div className="space-y-2">
                        {validInternships.map(intern => (
                          <div key={intern.id} className="border border-slate-200 bg-white p-3 rounded text-xs grid grid-cols-12 gap-2">
                            <div className="col-span-3 border-r border-slate-100 pr-2">
                              <span className="font-bold font-mono text-[10px] text-slate-500">{intern.startDate} - {intern.current ? "Present" : intern.endDate}</span>
                              <p className="text-[10px] text-slate-400 mt-0.5">{intern.location}</p>
                            </div>
                            <div className="col-span-9">
                              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                                <span className="text-[10px] text-blue-600 font-normal">•</span>
                                <span>{intern.role} at {intern.company}</span>
                              </h4>
                              <p className="text-[11px] leading-relaxed text-slate-600 mt-1 whitespace-pre-line pl-3">{intern.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects Grid (rendered on separate lines) */}
                  {validProjects.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b pb-1 border-slate-300">Projects</h3>
                      <div className="space-y-2 flex flex-col">
                        {validProjects.map((proj) => (
                          <div key={proj.id} className="border border-slate-200 bg-white p-3 rounded text-xs space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-0.5">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[10px] text-blue-600">•</span>
                                <span className="font-bold text-slate-950 text-sm">{proj.title || "Untitled Project"}</span>
                                {proj.technologies && (
                                  <span className="text-[10px] text-slate-500 font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                                    {proj.technologies}
                                  </span>
                                )}
                              </div>
                              {proj.link && (
                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-600 hover:underline">
                                  {proj.link}
                                </a>
                              )}
                            </div>
                            {proj.description && (
                              <p className="text-slate-600 whitespace-pre-line text-xs leading-relaxed pl-3">
                                {proj.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Competencies & Sections */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-3 border-slate-200">
                    {/* Languages Known (before core skills) */}
                    {(() => {
                      const cleanLanguages = splitByComma(resume.languages);
                      return cleanLanguages.length > 0 && (
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Languages Known</h4>
                          <div className="space-y-1 text-slate-700 text-[11px]">
                            {cleanLanguages.map((l, index) => (
                              <p key={index} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-slate-400 rounded-full inline-block flex-shrink-0" /> {l}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Core Skills */}
                    {resume.skills && resume.skills.length > 0 && (
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Core Skills</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {resume.skills.map(s => (
                            <span key={s} className="bg-white border border-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded shadow-sm">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certifications */}
                    {resume.certifications && resume.certifications.length > 0 && (
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Certifications</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {resume.certifications.map(c => (
                            <span key={c} className="bg-white border border-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded shadow-sm">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Soft Skills */}
                    {(() => {
                      const cleanSoftSkills = splitByComma(resume.softSkills);
                      return cleanSoftSkills.length > 0 && (
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Soft Skills</h4>
                          <div className="space-y-1 text-slate-700 text-[11px]">
                            {cleanSoftSkills.map((s, index) => (
                              <p key={index} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-slate-400 rounded-full inline-block flex-shrink-0" /> {s}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Interests */}
                    {(() => {
                      const cleanInterests = splitByComma(resume.interests);
                      return cleanInterests.length > 0 && (
                        <div className="space-y-1 md:col-span-2">
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Interests</h4>
                          <div className="space-y-1 text-slate-700 text-[11px]">
                            {cleanInterests.map((i, index) => (
                              <p key={index} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-slate-400 rounded-full inline-block flex-shrink-0" /> {i}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}
            </>
          );
        })()}
      </div>
    </div>

      {/* Download Section at Last (no-print) */}
      <div className="no-print bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Download className="w-5 h-5 text-indigo-500" /> Export & Download Built Resume
            </h3>
            <p className="text-sm text-slate-500">Choose your preferred format to save and submit your professional resume.</p>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-xl">
            <Check className="w-4 h-4" /> 100% Client-Side Secured
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* PDF Format Card */}
          <button
            onClick={downloadAsPDF}
            className="group flex flex-col items-start p-5 bg-slate-50 border border-slate-200/60 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/20 transition-all text-left w-full"
          >
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Download className="w-5 h-5" />
            </div>
            <span className="font-semibold text-slate-800 text-sm">Download PDF Document</span>
            <p className="text-xs text-slate-500 mt-1">Export as highly-compatible A4/Letter PDF for online job portals.</p>
            <span className="text-xs text-indigo-600 font-bold mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Download PDF &rarr;
            </span>
          </button>

          {/* TXT Format Card */}
          <button
            onClick={downloadAsTXT}
            className="group flex flex-col items-start p-5 bg-slate-50 border border-slate-200/60 rounded-xl hover:border-emerald-500 hover:bg-emerald-50/20 transition-all text-left w-full"
          >
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <span className="font-semibold text-slate-800 text-sm">Download Plain Text</span>
            <p className="text-xs text-slate-500 mt-1">Download as structured plain text, perfect for copy-pasting to job forms.</p>
            <span className="text-xs text-emerald-600 font-bold mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Download Plain Text &rarr;
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
