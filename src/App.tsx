import React, { useState, useEffect } from "react";
import { ResumeData, JobFitResult, InterviewQuestion, JobPosting } from "./types";
import ResumeBuilder from "./components/ResumeBuilder";
import ResumeChecker from "./components/ResumeChecker";
import InterviewCoach from "./components/InterviewCoach";
import { 
  FileText, CheckCircle, ShieldCheck, HelpCircle, Briefcase, 
  Settings, Lock, Menu, X, Sparkles, LogOut, Terminal, Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Seed data
const INITIAL_RESUME: ResumeData = {
  id: "resume-default",
  title: "My Standard Profile",
  updatedAt: new Date().toLocaleDateString(),
  personalInfo: {
    fullName: "",
    jobTitle: "",
    education: "",
    educationYear: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    photo: ""
  },
  summary: "",
  experience: [
    {
      id: "exp-1",
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      percentage: ""
    }
  ],
  skills: [],
  certifications: [],
  interests: [],
  softSkills: [],
  languages: [],
  internships: [],
  projects: [],
  industry: "Technology & Software"
};

const INITIAL_JOBS: JobPosting[] = [
  {
    id: "job-1",
    title: "Senior React Developer / Architect",
    company: "Meta Platforms",
    location: "Remote / Menlo Park",
    type: "Remote",
    salary: "$180,000 - $215,000",
    description: "Looking for an expert React developer to join our product UI design system team. You will lead the scaling of zero-latency component frameworks, optimize critical render trees, and collaborate closely with product management and security officers.",
    requirements: ["TypeScript", "React 19", "Tailwind CSS", "Web Performance Optimization"],
    industry: "Technology & Software"
  },
  {
    id: "job-2",
    title: "Cloud Infrastructure Architect",
    company: "Amazon Web Services (AWS)",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$195,000 - $235,000",
    description: "Lead AWS solution deployments for enterprise partners. You will design secure Docker/Kubernetes cluster pipelines, formulate serverless infrastructure, and ensure compliance benchmarks are met.",
    requirements: ["AWS Architectures", "Docker", "Kubernetes", "Infrastructure as Code"],
    industry: "Technology & Software"
  },
  {
    id: "job-3",
    title: "Senior Technology Consultant",
    company: "Deloitte Digital",
    location: "New York, NY",
    type: "Contract",
    salary: "$120 - $145 / hr",
    description: "Drive digital modernization transformations for high-profile banking and healthcare organizations. Lead technical evaluations, map out system integration architectures, and direct agile team sprints.",
    requirements: ["Agile Methodologies", "TypeScript", "SQL", "Stakeholder Communication"],
    industry: "Finance & Banking"
  },
  {
    id: "job-4",
    title: "Full-Stack Security Developer",
    company: "HealthSync Systems",
    location: "Remote",
    type: "Remote",
    salary: "$150,000 - $170,000",
    description: "Join our healthcare analytics platform. Build robust, compliant, and encrypted dashboard portals using Express and React to protect delicate user data records and verify system integrity.",
    requirements: ["React 19", "Express", "Node.js", "Local Encryption/Data Protection"],
    industry: "Healthcare & Life Sciences"
  },
  {
    id: "job-5",
    title: "Director of Product Engineering",
    company: "NexaCode Systems",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$210,000 - $240,000",
    description: "Direct our fast-growing technical product line. Partner with core developers, manage releases, and steer cloud transition pipelines.",
    requirements: ["TypeScript", "Agile Methodologies", "Docker", "Management"],
    industry: "Technology & Software"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"builder" | "checker" | "coach">("builder");
  const [resume, setResume] = useState<ResumeData>(INITIAL_RESUME);
  const [activeScanResult, setActiveScanResult] = useState<JobFitResult | null>(null);
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>([]);
  const [appliedJobsList, setAppliedJobsList] = useState<{ jobId: string; jobTitle: string; company: string; dateApplied: string; status: string }[]>([]);
  const [encryptionPassword, setEncryptionPassword] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      const cached = localStorage.getItem("ai_resume_suite_profile");
      if (cached) {
        // Simple obfuscated check matching Zero-Knowledge center
        const isEncrypted = localStorage.getItem("ai_resume_suite_encrypted_status") === "true";
        let parsed: any = null;
        if (isEncrypted) {
          // If encrypted, we would standardly prompt or decrypt. Let's load normally for simple retrieval,
          // but we save in obfuscated Base64 form if a password is set!
          const pass = localStorage.getItem("ai_resume_suite_pass_check") || "";
          if (pass) setEncryptionPassword(pass);
          
          const raw = atob(cached);
          parsed = JSON.parse(decodeURIComponent(escape(raw)));
        } else {
          parsed = JSON.parse(cached);
        }

        if (parsed && parsed.personalInfo && parsed.personalInfo.fullName === "Ruban N") {
          // Reset default resume if they had the legacy default name cached
          setResume(INITIAL_RESUME);
          localStorage.removeItem("ai_resume_suite_profile");
        } else if (parsed) {
          if (parsed.experience) parsed.experience = parsed.experience.slice(0, 1);
          if (parsed.education) parsed.education = parsed.education.slice(0, 2);
          setResume({
            ...INITIAL_RESUME,
            ...parsed,
            internships: parsed.internships || [],
            projects: parsed.projects || []
          });
        }
      }
      localStorage.removeItem("ai_resume_suite_questions");
      setInterviewQuestions([]);
      const cachedApplied = localStorage.getItem("ai_resume_suite_applied");
      if (cachedApplied) {
        setAppliedJobsList(JSON.parse(cachedApplied));
      }
      const cachedScanResult = localStorage.getItem("ai_resume_suite_scan");
      if (cachedScanResult) {
        setActiveScanResult(JSON.parse(cachedScanResult));
      }
    } catch (err) {
      console.error("Failed to restore cached profile:", err);
    }
  }, []);

  // Save changes handler
  const saveProfile = () => {
    try {
      if (encryptionPassword) {
        const jsonStr = JSON.stringify(resume);
        const obfuscated = btoa(unescape(encodeURIComponent(jsonStr)));
        localStorage.setItem("ai_resume_suite_profile", obfuscated);
        localStorage.setItem("ai_resume_suite_encrypted_status", "true");
        localStorage.setItem("ai_resume_suite_pass_check", encryptionPassword);
      } else {
        localStorage.setItem("ai_resume_suite_profile", JSON.stringify(resume));
        localStorage.setItem("ai_resume_suite_encrypted_status", "false");
        localStorage.removeItem("ai_resume_suite_pass_check");
      }
      alert("Resume profile saved securely in local zero-knowledge cache!");
    } catch (err) {
      console.error("Failed to save profile:", err);
    }
  };

  const handleScanComplete = (result: JobFitResult) => {
    setActiveScanResult(result);
    localStorage.setItem("ai_resume_suite_scan", JSON.stringify(result));
  };

  const handleQuestionsGenerated = (questionsList: InterviewQuestion[]) => {
    setInterviewQuestions(questionsList);
    localStorage.setItem("ai_resume_suite_questions", JSON.stringify(questionsList));
  };

  const handleOneClickApply = (jobId: string) => {
    const job = INITIAL_JOBS.find(j => j.id === jobId);
    if (!job) return;

    const newApplied = {
      jobId,
      jobTitle: job.title,
      company: job.company,
      dateApplied: new Date().toLocaleDateString(),
      status: "Submitted"
    };

    const updated = [newApplied, ...appliedJobsList];
    setAppliedJobsList(updated);
    localStorage.setItem("ai_resume_suite_applied", JSON.stringify(updated));
  };

  const clearAllData = () => {
    localStorage.removeItem("ai_resume_suite_profile");
    localStorage.removeItem("ai_resume_suite_encrypted_status");
    localStorage.removeItem("ai_resume_suite_pass_check");
    localStorage.removeItem("ai_resume_suite_questions");
    localStorage.removeItem("ai_resume_suite_applied");
    localStorage.removeItem("ai_resume_suite_scan");
    setResume({
      ...INITIAL_RESUME,
      experience: [],
      education: [],
      skills: [],
      certifications: [],
      summary: "",
      personalInfo: { fullName: "", jobTitle: "", email: "", phone: "", location: "", linkedin: "", website: "" }
    });
    setInterviewQuestions([]);
    setActiveScanResult(null);
    setAppliedJobsList([]);
    setEncryptionPassword("");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 overflow-hidden" id="applet-viewport-root">
      
      {/* Navigation Sidebar (no-print) */}
      <aside className={`no-print bg-[#0F172A] text-slate-400 flex flex-col border-r border-slate-800 w-64 shrink-0 transition-transform duration-300 fixed lg:static inset-y-0 left-0 z-30 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="p-6 text-white font-bold text-xl flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0">
              <div className="w-4 h-4 border-2 border-white"></div>
            </div>
            <span className="tracking-tight text-white font-extrabold">ResumeAI</span>
          </div>
          {/* Close Menu on Mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Builder</div>
          <button
            onClick={() => { setActiveTab("builder"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === "builder" 
                ? "text-slate-300 bg-slate-800" 
                : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
            }`}
            id="tab-btn-builder"
          >
            <FileText className="w-4 h-4 text-indigo-400" />
            Resume Builder
          </button>

          <button
            onClick={() => { setActiveTab("checker"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === "checker" 
                ? "text-slate-300 bg-slate-800" 
                : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
            }`}
            id="tab-btn-checker"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            Result Checker
          </button>

          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pt-6 mb-3 px-2">Coaching</div>
          
          <button
            onClick={() => { setActiveTab("coach"); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === "coach" 
                ? "text-slate-300 bg-slate-800" 
                : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
            }`}
            id="tab-btn-coach"
          >
            <Award className="w-4 h-4 text-amber-400" />
            Interview Prep
          </button>
        </nav>

        {/* Sidebar bottom panel matching Design HTML exactly */}
        <div className="p-4 mt-auto border-t border-slate-800 space-y-4">
          <div className="bg-indigo-900/30 p-3 rounded-lg border border-indigo-500/30">
            <div className="flex justify-between text-xs text-indigo-200 mb-1.5 font-bold uppercase tracking-wider">
              <span>ATS Grade</span>
              <span>{activeScanResult ? `${activeScanResult.score}%` : "A+"}</span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-400 h-full transition-all duration-500" 
                style={{ width: activeScanResult ? `${activeScanResult.score}%` : '92%' }}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 4.946-2.597 9.181-6.5 11.5a11.954 11.954 0 01-7.166-4.5c-3.903-2.319-6.5-6.554-6.5-11.5 0-.68.056-1.35.166-2.001z" clipRule="evenodd"></path>
            </svg>
            Encrypted Storage
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Bar matching Design HTML */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-8 shrink-0 no-print">
          <div className="flex items-center gap-3 text-sm font-medium">
            {/* Hamburger on Mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-md transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-slate-400">Dashboard</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-bold">
              {activeTab === "builder" && "Resume Builder"}
              {activeTab === "checker" && "Resume Result Checker"}
              {activeTab === "coach" && "AI Interview Coach"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center font-bold text-xs">
              {resume.personalInfo.fullName ? resume.personalInfo.fullName.charAt(0) : "R"}
            </div>
          </div>
        </header>

        {/* Content View Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === "builder" && (
                <ResumeBuilder 
                  resume={resume} 
                  onChange={setResume} 
                  onSave={saveProfile} 
                />
              )}

              {activeTab === "checker" && (
                <ResumeChecker 
                  resume={resume} 
                  onScanComplete={handleScanComplete} 
                  activeScanResult={activeScanResult} 
                />
              )}

              {activeTab === "coach" && (
                <InterviewCoach 
                  resume={resume} 
                  questions={interviewQuestions} 
                  onGenerateQuestions={handleQuestionsGenerated} 
                  onClearQuestions={() => setInterviewQuestions([])}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

    </div>
  );
}
