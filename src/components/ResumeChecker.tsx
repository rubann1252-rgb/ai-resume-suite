import React, { useState } from "react";
import { JobFitResult, ResumeData } from "../types";
import { 
  CheckCircle, AlertCircle, Search, HelpCircle, Loader, ArrowRight,
  Sparkles, Award, ArrowUpRight, GraduationCap, Compass, FileText, Upload, X, HelpCircle as InfoIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ResumeCheckerProps {
  resume: ResumeData;
  onScanComplete: (result: JobFitResult) => void;
  activeScanResult: JobFitResult | null;
}

export default function ResumeChecker({ resume, onScanComplete, activeScanResult }: ResumeCheckerProps) {
  const [jobTitle, setJobTitle] = useState(resume.personalInfo.jobTitle || "");
  const [isScanning, setIsScanning] = useState(false);
  const [sourceType, setSourceType] = useState<"builtin" | "upload">("builtin");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [uploadedText, setUploadedText] = useState<string>("");
  const [uploadError, setUploadError] = useState<string>("");

  // Construct standard textual resume representation for Gemini scanner
  const getResumeText = (): string => {
    if (sourceType === "upload") {
      return uploadedText;
    }

    // Construct rich text from the current resume state
    let text = `Name: ${resume.personalInfo.fullName}\n`;
    text += `Title: ${resume.personalInfo.jobTitle}\n`;
    text += `Email: ${resume.personalInfo.email} | Phone: ${resume.personalInfo.phone}\n`;
    text += `Location: ${resume.personalInfo.location}\n`;
    text += `LinkedIn: ${resume.personalInfo.linkedin} | Website: ${resume.personalInfo.website}\n\n`;
    text += `Professional Summary:\n${resume.summary}\n\n`;
    
    text += `Work Experience:\n`;
    resume.experience.forEach(exp => {
      text += `- ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.current ? "Present" : exp.endDate}) in ${exp.location}\n`;
      text += `  Description: ${exp.description}\n`;
    });

    if (resume.internships && resume.internships.length > 0) {
      text += `\nInternships:\n`;
      resume.internships.forEach(intern => {
        text += `- ${intern.role} at ${intern.company} (${intern.startDate} - ${intern.current ? "Present" : intern.endDate}) in ${intern.location}\n`;
        text += `  Description: ${intern.description}\n`;
      });
    }

    if (resume.projects && resume.projects.length > 0) {
      text += `\nFeatured Projects:\n`;
      resume.projects.forEach(proj => {
        text += `- ${proj.title} (Technologies: ${proj.technologies}${proj.link ? ` | Link: ${proj.link}` : ""})\n`;
        text += `  Description: ${proj.description}\n`;
      });
    }
    
    text += `\nEducation:\n`;
    resume.education.forEach(edu => {
      text += `- ${edu.degree} in ${edu.fieldOfStudy} at ${edu.institution} (${edu.startDate} - ${edu.endDate}) in ${edu.location}\n`;
    });
    
    text += `\nSkills: ${resume.skills.join(", ")}\n`;
    text += `Certifications: ${resume.certifications.join(", ")}\n`;
    return text;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    setUploadError("");

    try {
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        const buffer = await file.arrayBuffer();
        const textDecoder = new TextDecoder("utf-8");
        const rawText = textDecoder.decode(buffer);
        const matches = rawText.match(/\(([^()]+)\)/g);
        let extracted = "";
        if (matches && matches.length > 20) {
          extracted = matches.map(m => m.slice(1, -1)).join(" ");
        } else {
          extracted = rawText.replace(/[^\x20-\x7E\n\r\t]/g, " ").replace(/\s+/g, " ");
        }
        setUploadedText(extracted.trim() || `[Resume Document: ${file.name}]\nUploaded file containing resume data for target position evaluation.`);
      } else if (file.name.endsWith(".docx") || file.name.endsWith(".doc")) {
        const buffer = await file.arrayBuffer();
        const textDecoder = new TextDecoder("utf-8");
        const rawText = textDecoder.decode(buffer);
        const matches = rawText.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
        if (matches && matches.length > 0) {
          const extracted = matches.map(m => m.replace(/<[^>]+>/g, "")).join(" ");
          setUploadedText(extracted);
        } else {
          const extracted = rawText.replace(/<[^>]+>/g, " ").replace(/[^\x20-\x7E\n\r\t]/g, " ").replace(/\s+/g, " ");
          setUploadedText(extracted.trim() || `[Resume Document: ${file.name}]`);
        }
      } else {
        const reader = new FileReader();
        reader.onload = (evt) => {
          if (evt.target?.result) {
            setUploadedText(evt.target.result as string);
          }
        };
        reader.readAsText(file);
      }
    } catch (err) {
      console.error("Error reading document:", err);
      setUploadError("Could not extract document text automatically. You can paste the text manually below.");
    }
  };

  const clearUploadedFile = () => {
    setUploadedFileName("");
    setUploadedText("");
    setUploadError("");
  };

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    const textToScan = getResumeText();
    if (!jobTitle.trim() || !textToScan.trim()) return;

    setIsScanning(true);

    try {
      const res = await fetch("/api/resume/analyze-ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: textToScan,
          jobTitle,
          jobDescription: ""
        })
      });
      const data = await res.json();
      onScanComplete(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  // Helper to color gauge by score
  const getScoreColor = (score: number) => {
    if (score >= 85) return { stroke: "stroke-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50" };
    if (score >= 70) return { stroke: "stroke-indigo-500", text: "text-indigo-600", bg: "bg-indigo-50" };
    if (score >= 50) return { stroke: "stroke-amber-500", text: "text-amber-600", bg: "bg-amber-50" };
    return { stroke: "stroke-rose-500", text: "text-rose-600", bg: "bg-rose-50" };
  };

  const scoreTheme = activeScanResult ? getScoreColor(activeScanResult.score) : null;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Scanner Inputs - Left */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Resume Result Checker</h2>
            <p className="text-sm text-slate-500">Scan and score your resume against real job roles</p>
          </div>

          <form onSubmit={handleScan} className="space-y-5">
            {/* Target Job Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Target Job Title *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Document Source Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Document Source</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setSourceType("builtin")}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    sourceType === "builtin"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Use Built-in Resume
                </button>
                <button
                  type="button"
                  onClick={() => setSourceType("upload")}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    sourceType === "upload"
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload Document
                </button>
              </div>
            </div>

            {/* Upload Document Panel */}
            {sourceType === "upload" && (
              <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-semibold text-slate-700">Upload Resume File (.pdf, .docx, .txt)</label>
                  {uploadedFileName && (
                    <button
                      type="button"
                      onClick={clearUploadedFile}
                      className="text-[11px] text-rose-600 font-medium hover:underline flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Clear
                    </button>
                  )}
                </div>

                {!uploadedFileName ? (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-white hover:border-indigo-400 transition-all bg-white/50">
                    <div className="flex flex-col items-center justify-center pt-4 pb-4 px-4 text-center">
                      <Upload className="w-7 h-7 text-indigo-500 mb-2" />
                      <p className="text-xs font-medium text-slate-700">
                        <span className="font-semibold text-indigo-600 underline">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">PDF, DOCX, TXT, or MD resume documents</p>
                    </div>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".pdf,.docx,.doc,.txt,.md,.json"
                    />
                  </label>
                ) : (
                  <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div className="truncate">
                        <p className="text-xs font-bold text-emerald-900 truncate">{uploadedFileName}</p>
                        <p className="text-[10px] text-emerald-700">Ready for target job check</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  </div>
                )}

                {uploadError && (
                  <p className="text-xs text-rose-600 font-medium">{uploadError}</p>
                )}

                {/* Extracted or Manual Text */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">
                    Resume Content (Extracted or Pasted)
                  </label>
                  <textarea
                    rows={4}
                    value={uploadedText}
                    onChange={(e) => setUploadedText(e.target.value)}
                    placeholder="Document text will appear here after upload, or paste your resume text manually..."
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                  />
                </div>
              </div>
            )}

            {/* Run Button */}
            <button
              type="submit"
              disabled={isScanning || !jobTitle.trim() || (sourceType === "upload" && !uploadedText.trim())}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
              id="btn-scan-resume"
            >
              {isScanning ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Analyzing Resume with Gemini AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Check ATS & Match Job-Fit
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Showcase - Right */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!activeScanResult ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400 mb-4">
                  <Compass className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-800">Awaiting Compatibility Scan</h3>
                <p className="text-sm text-slate-500 max-w-sm mt-2">
                  Provide your target job title above and click "Check ATS & Match Job-Fit" to evaluate structural scoring and keyword alignments.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="results-panel"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Score Widget */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Gauge */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center">
                    <div className="relative w-40 h-40">
                      {/* SVG Arc Gauge */}
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          className="stroke-slate-100 fill-none"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          className={`${scoreTheme?.stroke} fill-none transition-all duration-1000 ease-out`}
                          strokeWidth="8"
                          strokeDasharray={251.2}
                          strokeDashoffset={251.2 - (251.2 * activeScanResult.score) / 100}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-extrabold tracking-tight text-slate-800">{activeScanResult.score}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Job-Fit Score</span>
                      </div>
                    </div>
                  </div>

                  {/* General Profile Match Details */}
                  <div className="md:col-span-7 space-y-3">
                    <div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full">ATS Audit Verified</span>
                      <h3 className="text-xl font-bold text-slate-800 mt-2">{activeScanResult.jobTitle}</h3>
                      <p className="text-sm text-slate-500 font-medium">Target Company: {activeScanResult.targetCompany}</p>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2 text-xs">
                      {Object.entries(activeScanResult.atsAudit.structuralAnalysis).map(([key, val]) => (
                        <span
                          key={key}
                          className={`px-2.5 py-1 rounded-lg flex items-center gap-1 font-medium ${
                            val ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          <CheckCircle className={`w-3.5 h-3.5 ${val ? "text-emerald-500" : "text-rose-400"}`} />
                          {key.replace("has", "").replace(/([A-Z])/g, " $1").trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Keyword Analysis Panel */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                  <h3 className="text-base font-semibold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle className="w-5 h-5 text-indigo-500" /> ATS Keyword Analysis
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Matched Keywords */}
                    <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-100/50 space-y-3">
                      <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" /> Matched Keywords ({activeScanResult.atsAudit.keywordMatch.matched.length})
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeScanResult.atsAudit.keywordMatch.matched.map(kw => (
                          <span key={kw} className="px-2.5 py-1 bg-white border border-emerald-100 text-emerald-700 text-xs font-medium rounded-lg">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Missing Keywords */}
                    <div className="p-4 bg-rose-50/30 rounded-xl border border-rose-100/50 space-y-3">
                      <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-500" /> Missing ATS Keywords ({activeScanResult.atsAudit.keywordMatch.missing.length})
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeScanResult.atsAudit.keywordMatch.missing.map(kw => (
                          <span key={kw} className="px-2.5 py-1 bg-white border border-rose-100 text-rose-700 text-xs font-medium rounded-lg">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skill Gaps & Certifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Skill Gap List */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                    <h3 className="text-base font-semibold text-slate-800 flex items-center gap-1.5">
                      <GraduationCap className="w-5 h-5 text-indigo-500" /> Skill Gap Analysis
                    </h3>
                    <div className="space-y-4 text-xs">
                      <div>
                        <strong className="block text-slate-700 mb-1.5">Technical & Tooling Gaps</strong>
                        <ul className="space-y-1 text-slate-600 list-disc list-inside">
                          {activeScanResult.skillsGap.technicalGaps.map(g => <li key={g}>{g}</li>)}
                        </ul>
                      </div>
                      <div>
                        <strong className="block text-slate-700 mb-1.5">Soft Skills & Methodologies</strong>
                        <ul className="space-y-1 text-slate-600 list-disc list-inside">
                          {activeScanResult.skillsGap.softGaps.map(g => <li key={g}>{g}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Certification Program Recommendations */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                    <h3 className="text-base font-semibold text-slate-800 flex items-center gap-1.5">
                      <Award className="w-5 h-5 text-indigo-500" /> Professional Certifications
                    </h3>
                    <p className="text-xs text-slate-500 leading-normal">Personalized training suggestions to fill your skill gaps and improve resume screening pass rates:</p>
                    <div className="space-y-3">
                      {activeScanResult.certifications.map(cert => (
                        <a
                          key={cert.title}
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-all hover:border-slate-200"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-slate-800 text-xs flex items-center gap-1">
                              {cert.title}
                              <ArrowUpRight className="w-3 h-3 text-slate-400" />
                            </h4>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                              cert.relevance === "High" ? "bg-emerald-100 text-emerald-800" : "bg-indigo-100 text-indigo-800"
                            }`}>
                              {cert.relevance} Relevance
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1 font-medium">{cert.provider} • Certified Program</p>
                          <p className="text-[11px] text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">{cert.description}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Improvement Strategy */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                  <h3 className="text-base font-semibold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-indigo-500" /> AI Improvement Blueprint
                  </h3>
                  <div className="space-y-3">
                    {activeScanResult.recommendations.map((rec, i) => (
                      <div key={i} className="flex gap-3 text-xs leading-relaxed text-slate-600 p-3 bg-slate-50 rounded-xl border border-slate-100/50 items-start">
                        <div className="w-5 h-5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <p className="pt-0.5">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
