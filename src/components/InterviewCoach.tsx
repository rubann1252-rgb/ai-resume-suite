import React, { useState, useMemo } from "react";
import { ResumeData, InterviewQuestion, InterviewFeedback } from "../types";
import { 
  Mic, Sparkles, AlertCircle, CheckCircle, ChevronRight, HelpCircle,
  Loader, Send, RefreshCw, Volume2, Award, ClipboardCheck, BookOpen, Trash2, BookMarked,
  Upload, FileText, X, File, Target, UploadCloud, Edit3, ArrowRight,
  Code, UserCheck, Compass, Layers, Filter
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import AceInterviewBook from "./AceInterviewBook";

interface InterviewCoachProps {
  resume: ResumeData;
  questions: InterviewQuestion[];
  onGenerateQuestions: (newQuestions: InterviewQuestion[]) => void;
  onClearQuestions?: () => void;
}

export default function InterviewCoach({ resume, questions, onGenerateQuestions, onClearQuestions }: InterviewCoachProps) {
  const [coachMode, setCoachMode] = useState<"book" | "practice">("book");
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<{ [qId: string]: InterviewFeedback }>({});
  
  // Category filter state
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");

  // Audio simulation or TTS playback
  const [isPlayingTTS, setIsPlayingTTS] = useState<string | null>(null);

  // Resume Upload & Source state
  const [resumeSource, setResumeSource] = useState<"upload" | "paste">("upload");
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [uploadedText, setUploadedText] = useState<string>("");
  const [pastedText, setPastedText] = useState<string>("");
  const [targetRole, setTargetRole] = useState<string>(resume.personalInfo.jobTitle || "");
  const [uploadError, setUploadError] = useState<string>("");
  const [isParsingFile, setIsParsingFile] = useState<boolean>(false);
  const [showUploadSection, setShowUploadSection] = useState<boolean>(questions.length === 0);
  const [analyzedSummary, setAnalyzedSummary] = useState<{
    sourceName: string;
    role: string;
    characterCount: number;
  } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    setUploadError("");
    setIsParsingFile(true);

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
        const clean = extracted.trim() || `[Resume File: ${file.name}]`;
        setUploadedText(clean);
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
          setUploadedText(extracted.trim() || `[Resume File: ${file.name}]`);
        }
      } else {
        const text = await file.text();
        setUploadedText(text);
      }
    } catch (err) {
      setUploadError("Could not read file content. Please try pasting the text directly or uploading a standard PDF/TXT file.");
    } finally {
      setIsParsingFile(false);
    }
  };

  const handleClearAllQuestions = () => {
    onGenerateQuestions([]);
    if (onClearQuestions) onClearQuestions();
    setActiveQuestionIdx(null);
    setUserAnswer("");
    setActiveFeedback({});
    setShowUploadSection(true);
    setAnalyzedSummary(null);
    try {
      localStorage.removeItem("ai_resume_suite_questions");
    } catch (e) {}
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Behavioral":
        return <UserCheck className="w-3.5 h-3.5 text-blue-600" />;
      case "Technical":
        return <Code className="w-3.5 h-3.5 text-purple-600" />;
      case "Situational":
        return <Compass className="w-3.5 h-3.5 text-amber-600" />;
      case "Resume-Specific":
        return <Target className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-indigo-600" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Behavioral":
        return "bg-blue-50 text-blue-700 border-blue-200/60";
      case "Technical":
        return "bg-purple-50 text-purple-700 border-purple-200/60";
      case "Situational":
        return "bg-amber-50 text-amber-700 border-amber-200/60";
      case "Resume-Specific":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      default:
        return "bg-indigo-50 text-indigo-700 border-indigo-200/60";
    }
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: questions.length };
    questions.forEach(q => {
      const cat = q.category || "Resume-Specific";
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [questions]);

  const categoriesList = useMemo(() => {
    const list = ["All"];
    const seen = new Set<string>();
    questions.forEach(q => {
      const cat = q.category || "General";
      if (!seen.has(cat)) {
        seen.add(cat);
        list.push(cat);
      }
    });
    return list;
  }, [questions]);

  const groupedQuestions = useMemo<Record<string, { question: InterviewQuestion; originalIndex: number }[]>>(() => {
    const groups: Record<string, { question: InterviewQuestion; originalIndex: number }[]> = {};
    
    questions.forEach((q, idx) => {
      const cat = q.category || "General";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push({ question: q, originalIndex: idx });
    });

    if (selectedCategoryFilter !== "All") {
      const filtered: Record<string, { question: InterviewQuestion; originalIndex: number }[]> = {};
      if (groups[selectedCategoryFilter]) {
        filtered[selectedCategoryFilter] = groups[selectedCategoryFilter];
      }
      return filtered;
    }

    return groups;
  }, [questions, selectedCategoryFilter]);

  const generateTailoredQuestionsFromSource = async () => {
    setUploadError("");

    let textToUse = "";
    let sourceName = "";

    if (resumeSource === "upload") {
      textToUse = uploadedText;
      sourceName = uploadedFileName || "Uploaded Resume File";
    } else {
      textToUse = pastedText;
      sourceName = "Pasted Resume Content";
    }

    const trimmedRole = targetRole.trim();
    const hasResume = Boolean(textToUse && textToUse.trim().length >= 10);
    const hasRole = Boolean(trimmedRole.length > 0);

    if (!hasResume || !hasRole) {
      if (!hasResume && !hasRole) {
        setUploadError("Please provide a resume AND enter a target position / job title.");
      } else if (!hasResume) {
        setUploadError("Please upload a resume file or paste resume text first.");
      } else {
        setUploadError("Please enter a target position / job title.");
      }
      return;
    }

    setIsGenerating(true);
    const effectiveRole = trimmedRole;

    try {
      const res = await fetch("/api/interview/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: textToUse,
          jobTitle: effectiveRole,
          jobDescription: ""
        })
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        onGenerateQuestions(data);
        setActiveQuestionIdx(0);
        setUserAnswer("");
        setAnalyzedSummary({
          sourceName,
          role: effectiveRole,
          characterCount: textToUse.length
        });
        setShowUploadSection(false);
      } else if (data.error) {
        setUploadError(data.error);
      }
    } catch (err) {
      console.error(err);
      setUploadError("Failed to analyze resume and generate questions. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEvaluate = async (q: InterviewQuestion) => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);
    try {
      const res = await fetch("/api/interview/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q.question,
          answer: userAnswer,
          context: q.context
        })
      });
      const data = await res.json();
      if (data) {
        setActiveFeedback(prev => ({
          ...prev,
          [q.id]: data
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleTTSPlay = (textToSpeak: string, qId: string) => {
    if ("speechSynthesis" in window) {
      if (isPlayingTTS === qId) {
        window.speechSynthesis.cancel();
        setIsPlayingTTS(null);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => setIsPlayingTTS(null);
      utterance.onerror = () => setIsPlayingTTS(null);
      setIsPlayingTTS(qId);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser version.");
    }
  };

  const activeQuestion = activeQuestionIdx !== null ? questions[activeQuestionIdx] : null;
  const activeQFeedback = activeQuestion ? activeFeedback[activeQuestion.id] : null;

  return (
    <div className="space-y-6">
      {/* Top Banner Header with Mode Switcher */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-850 to-slate-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-800/60 border border-indigo-700/50 text-indigo-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Interview Suite</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
            Ace Any Interview
          </h1>
          <p className="text-slate-300 text-xs mt-1 max-w-xl leading-relaxed">
            Master candidate questions with our interactive Playbook reference guide, or launch a live 10-question AI practice simulation evaluated against your resume.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 bg-indigo-950/80 p-1.5 rounded-2xl border border-indigo-700/40 shrink-0">
          <button
            onClick={() => setCoachMode("book")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              coachMode === "book"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-300 hover:text-white hover:bg-indigo-900/50"
            }`}
            id="tab-mode-playbook-book"
          >
            <BookMarked className="w-4 h-4 text-indigo-200" />
            <span>Playbook Guide</span>
          </button>

          <button
            onClick={() => setCoachMode("practice")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              coachMode === "practice"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-300 hover:text-white hover:bg-indigo-900/50"
            }`}
            id="tab-mode-ai-practice"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Resume Questions</span>
          </button>
        </div>
      </div>

      {/* Render Mode Content */}
      {coachMode === "book" ? (
        <AceInterviewBook />
      ) : showUploadSection || questions.length === 0 ? (
        /* Upload & Analyze Resume Card */
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Upload Resume to Walk Through & Generate Questions</h2>
            <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
              Upload your resume (PDF, DOCX, TXT) or paste its text. AI will walk through your work history, projects, and skills to craft 10 deeply tailored interview questions.
            </p>
          </div>

          {/* Source Selection Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl">
            <button
              onClick={() => setResumeSource("upload")}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                resumeSource === "upload" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload File
            </button>
            <button
              onClick={() => setResumeSource("paste")}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                resumeSource === "paste" ? "bg-white text-indigo-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Paste Text
            </button>
          </div>

          {/* Option 1: File Dropzone */}
          {resumeSource === "upload" && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Upload Resume Document <span className="text-rose-500">*</span>
              </label>
              <div className="relative border-2 border-dashed border-indigo-200 bg-indigo-50/20 hover:bg-indigo-50/50 rounded-2xl p-6 text-center transition-all cursor-pointer group">
                <input
                  type="file"
                  accept=".pdf,.docx,.doc,.txt,.md,.json"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="resume-file-input"
                />
                <div className="space-y-2 pointer-events-none">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-xs border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {isParsingFile ? "Extracting file text..." : "Click or drag & drop resume file here"}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Supports PDF, DOCX, TXT, or Markdown documents</p>
                  </div>
                </div>
              </div>

              {uploadedFileName && (
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs text-slate-700">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span className="font-semibold truncate max-w-sm">{uploadedFileName}</span>
                  </div>
                  <button
                    onClick={() => {
                      setUploadedFileName("");
                      setUploadedText("");
                    }}
                    className="p-1 hover:bg-slate-200/70 rounded-lg text-slate-500 hover:text-slate-800 transition-colors shrink-0"
                    title="Remove file"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Option 2: Paste Text */}
          {resumeSource === "paste" && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Paste Full Resume Text <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={7}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste your resume content here (Summary, Work Experience, Projects, Skills)..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-mono"
              />
            </div>
          )}

          {/* Target Role Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              Target Position / Job Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Senior Frontend Architect, Data Engineer, Product Manager"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>

          {/* Error Message if any */}
          {uploadError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            {questions.length > 0 && (
              <button
                onClick={() => setShowUploadSection(false)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel / Return to Questions
              </button>
            )}
            <button
              onClick={generateTailoredQuestionsFromSource}
              disabled={isGenerating || isParsingFile}
              className="ml-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
              id="btn-analyze-resume-generate-questions"
            >
              {isGenerating ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Analyzing Resume & Walking Through...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze Resume & Generate 10 Questions
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Questions Catalog & Interactive Practice Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 10 Questions Navigation Sidebar - Left */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-100 space-y-2">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                    Resume Questions
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">10 Tailored Mock Questions</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setShowUploadSection(true)}
                    className="px-2.5 py-1.5 text-xs text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors font-medium flex items-center gap-1 border border-indigo-200/60"
                    title="Upload different resume"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Change Resume
                  </button>
                  {questions.length > 0 && (
                    <button
                      onClick={handleClearAllQuestions}
                      className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors font-medium border border-rose-200/60"
                      title="Remove all questions"
                      id="btn-remove-all-questions"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Analyzed Resume Banner */}
              {analyzedSummary && (
                <div className="p-2.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-[11px] text-indigo-900 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 truncate">
                    <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span className="font-bold truncate">{analyzedSummary.sourceName}</span>
                    <span className="text-indigo-600 shrink-0">• {analyzedSummary.role}</span>
                  </div>
                </div>
              )}

              {/* Category Filter Pills */}
              {questions.length > 0 && (
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-bold px-0.5">
                    <span className="flex items-center gap-1">
                      <Filter className="w-3 h-3 text-indigo-600" />
                      Categories
                    </span>
                    <span className="text-slate-400 font-normal">{questions.length} total</span>
                  </div>
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth">
                    {categoriesList.map(cat => {
                      const count = categoryCounts[cat] || 0;
                      if (cat !== "All" && count === 0) return null;
                      const isSelected = selectedCategoryFilter === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategoryFilter(cat)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 shrink-0 border ${
                            isSelected
                              ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {cat !== "All" && getCategoryIcon(cat)}
                          <span>{cat}</span>
                          <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                            isSelected ? "bg-indigo-500 text-white" : "bg-slate-200/80 text-slate-700"
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

        {questions.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mx-auto">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-700">No Questions Generated</p>
              <p className="text-xs text-slate-500 max-w-[200px] mx-auto leading-normal">Click below to trigger a personalized 10-question interview catalog.</p>
            </div>
            <button
              onClick={generateTailoredQuestionsFromSource}
              disabled={isGenerating}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-1.5 mx-auto"
            >
              {isGenerating ? "Analyzing Resume..." : "Generate 10 Questions"}
            </button>
          </div>
        ) : (
          <div className="space-y-5 max-h-[520px] overflow-y-auto pr-1">
            {Object.keys(groupedQuestions).length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500">
                No questions found in this category.
              </div>
            ) : (
              Object.keys(groupedQuestions).map((categoryName) => {
                const items = groupedQuestions[categoryName];
                return (
                  <div key={categoryName} className="space-y-2">
                    {/* Category Group Header */}
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                        {getCategoryIcon(categoryName)}
                        <span>{categoryName} Questions</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryBadgeClass(categoryName)}`}>
                        {items.length} {items.length === 1 ? "question" : "questions"}
                      </span>
                    </div>

                    {/* Question Cards */}
                    <div className="space-y-2">
                      {items.map(({ question: q, originalIndex }) => {
                        const hasResponse = activeFeedback[q.id] !== undefined;
                        const isSelected = activeQuestionIdx === originalIndex;
                        return (
                          <button
                            key={q.id}
                            onClick={() => {
                              setActiveQuestionIdx(originalIndex);
                              setUserAnswer("");
                            }}
                            className={`w-full text-left p-3 rounded-xl transition-all border flex gap-3 items-start ${
                              isSelected
                                ? "border-indigo-600 bg-indigo-50/50 shadow-xs"
                                : "border-slate-100 bg-slate-50/50 hover:bg-slate-50"
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-lg text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600"
                            }`}>
                              {originalIndex + 1}
                            </span>
                            <div className="flex-1 space-y-1.5">
                              <p className={`text-xs font-semibold leading-relaxed line-clamp-2 ${
                                isSelected ? "text-indigo-900" : "text-slate-800"
                              }`}>
                                {q.question}
                              </p>
                              <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium">
                                <span className="truncate max-w-[140px] text-slate-500">{q.context || q.category}</span>
                                {hasResponse && (
                                  <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5 border border-emerald-100">
                                    Score: {activeFeedback[q.id].score}%
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Interactive Question Panel & AI Coaching - Right */}
      <div className="lg:col-span-8 space-y-6">
        <AnimatePresence mode="wait">
          {!activeQuestion ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]"
            >
              <Award className="w-12 h-12 text-slate-400 mb-4" />
              <h3 className="text-lg font-medium text-slate-800">Select a Prep Question</h3>
              <p className="text-sm text-slate-500 max-w-sm mt-2">
                Generate tailored interview questions from your resume dashboard, and click any item to begin your mock practice session.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeQuestion.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Core Question Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded">
                      {activeQuestion.category} Question
                    </span>
                    <h3 className="text-lg font-semibold text-slate-800 leading-snug pt-1">
                      {activeQuestion.question}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleTTSPlay(activeQuestion.question, activeQuestion.id)}
                    className={`p-2.5 rounded-xl transition-all shrink-0 ${
                      isPlayingTTS === activeQuestion.id ? "bg-indigo-600 text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    }`}
                    title="Audio Read Aloud"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Interviewer Intent Box */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex gap-2.5 items-start">
                  <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-600">
                    <strong className="block text-slate-700 font-semibold mb-0.5">What is evaluated?</strong>
                    <p className="leading-relaxed">{activeQuestion.context}</p>
                  </div>
                </div>

                {/* Suggested Star Framework Answer */}
                <div className="p-3.5 bg-emerald-50/30 rounded-xl border border-emerald-100/50 flex gap-2.5 items-start">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-600">
                    <strong className="block text-emerald-800 font-semibold mb-0.5">Model Sample Answer (STAR Method)</strong>
                    <p className="leading-relaxed italic text-emerald-950">"{activeQuestion.sampleAnswer}"</p>
                  </div>
                </div>
              </div>

              {/* Mock Answer Input Zone */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-semibold text-slate-800">Your Response</h4>
                  <p className="text-[11px] text-slate-400 italic">Be specific, use metrics, and match STAR structure (Situation, Task, Action, Result)</p>
                </div>

                <div className="relative">
                  <textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type or dictate your answer here. Provide specific context and outcome metrics if possible..."
                    rows={5}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-y"
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => handleEvaluate(activeQuestion)}
                    disabled={isEvaluating || !userAnswer.trim()}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    {isEvaluating ? (
                      <>
                        <Loader className="w-3.5 h-3.5 animate-spin" />
                        Analyzing with Coach...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        Submit for Coaching Evaluation
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Real-time Evaluation Results Panel */}
              {activeQFeedback && (
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-5">
                  <div className="flex justify-between items-center">
                    <h4 className="text-base font-semibold text-slate-800 flex items-center gap-1.5">
                      <ClipboardCheck className="w-5 h-5 text-indigo-500" /> AI Coach Feedback Report
                    </h4>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">
                      Delivery Score: {activeQFeedback.score}/100
                    </span>
                  </div>

                  {/* Strengths & Improvements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-emerald-50/30 rounded-xl border border-emerald-100/50 space-y-2">
                      <h5 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-emerald-600" /> Strengths
                      </h5>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
                        {activeQFeedback.strengths.map(s => <li key={s}>{s}</li>)}
                      </ul>
                    </div>

                    <div className="p-4 bg-amber-50/30 rounded-xl border border-amber-100/50 space-y-2">
                      <h5 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                        <AlertCircle className="w-4 h-4 text-amber-600" /> Improvement Targets
                      </h5>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside leading-relaxed">
                        {activeQFeedback.improvements.map(i => <li key={i}>{i}</li>)}
                      </ul>
                    </div>
                  </div>

                  {/* Recommended Professional Phrasing */}
                  <div className="p-4 bg-indigo-50/30 rounded-xl border border-indigo-100/50 space-y-2">
                    <h5 className="text-xs font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-indigo-600" /> Polished Professional Phrasing (Rewrite)
                    </h5>
                    <p className="text-xs text-indigo-950 leading-relaxed italic">
                      "{activeQFeedback.betterPhrasing}"
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )}
</div>
);
}

