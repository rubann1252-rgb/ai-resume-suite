import React, { useState } from "react";
import { INTERVIEW_PLAYBOOK } from "../data/interviewBook";
import { 
  BookOpen, Search, Copy, Check, Sparkles, User, Award, Compass, 
  FileText, HelpCircle, GraduationCap, AlertTriangle, Lightbulb, Edit3
} from "lucide-react";

export default function AceInterviewBook() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedQuestionId, setCopiedQuestionId] = useState<string | null>(null);
  
  // State for user customizing sample answers
  const [customizingQId, setCustomizingQId] = useState<string | null>(null);
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({});

  const categories = [
    "All",
    ...Array.from(new Set(INTERVIEW_PLAYBOOK.map(ch => ch.category)))
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuestionId(id);
    setTimeout(() => setCopiedQuestionId(null), 2000);
  };

  // Filter chapters and questions based on category and search query
  const filteredChapters = INTERVIEW_PLAYBOOK.map(chapter => {
    const matchesCategory = selectedCategory === "All" || chapter.category === selectedCategory;
    const filteredQuestions = chapter.questions.filter(q => {
      const qText = q.question.toLowerCase();
      const aText = q.sampleAnswer.toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      return qText.includes(query) || aText.includes(query) || chapter.title.toLowerCase().includes(query);
    });

    return {
      ...chapter,
      questions: filteredQuestions,
      hasMatches: matchesCategory && filteredQuestions.length > 0
    };
  }).filter(ch => ch.hasMatches);

  const getIcon = (name: string) => {
    switch (name) {
      case "User": return <User className="w-4 h-4 text-indigo-600" />;
      case "Award": return <Award className="w-4 h-4 text-indigo-600" />;
      case "Compass": return <Compass className="w-4 h-4 text-indigo-600" />;
      case "FileText": return <FileText className="w-4 h-4 text-indigo-600" />;
      case "GraduationCap": return <GraduationCap className="w-4 h-4 text-indigo-600" />;
      default: return <HelpCircle className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Category Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Ace Any Interview Playbook
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive reference guide with model sample answers and key pitfalls to avoid.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or keywords..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters List */}
      {filteredChapters.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">No matching questions found</h3>
          <p className="text-xs text-slate-400">Try adjusting your search terms or selecting a different category.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredChapters.map((chapter) => {
            return (
              <div 
                key={chapter.id} 
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all"
              >
                {/* Chapter Header Banner */}
                <div className="p-5 flex items-center justify-between bg-white border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                      {getIcon(chapter.iconName)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          Chapter {chapter.chapterNumber}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {chapter.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                        {chapter.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Chapter Content directly displayed */}
                <div className="bg-slate-50/40 p-5 space-y-5">
                  {/* Chapter Strategy Note */}
                  <div className="p-3.5 bg-indigo-50/80 border border-indigo-100 rounded-xl text-xs text-indigo-900 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold mb-0.5">Chapter Strategy:</p>
                      <p className="text-indigo-800 leading-relaxed">{chapter.strategy}</p>
                    </div>
                  </div>

                  {/* Questions List directly shown */}
                  <div className="space-y-4">
                    {chapter.questions.map((q, idx) => {
                      const currentAnswerText = customAnswers[q.id] !== undefined ? customAnswers[q.id] : q.sampleAnswer;
                      const isCustomizing = customizingQId === q.id;

                      return (
                        <div 
                          key={q.id}
                          className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-3.5"
                        >
                          <div className="flex justify-between items-start gap-3">
                            <h4 className="text-sm font-bold text-slate-900 leading-snug">
                              <span className="text-indigo-600 mr-2">Q{idx + 1}.</span>
                              {q.question}
                            </h4>
                            <button
                              onClick={() => handleCopy(q.id, currentAnswerText)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1 shrink-0"
                              title="Copy answer template"
                            >
                              {copiedQuestionId === q.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span className="text-emerald-700">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Sample Answer Box */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                                Model Answer Template
                              </label>
                              <button
                                onClick={() => {
                                  if (isCustomizing) {
                                    setCustomizingQId(null);
                                  } else {
                                    setCustomizingQId(q.id);
                                    if (customAnswers[q.id] === undefined) {
                                      setCustomAnswers(prev => ({ ...prev, [q.id]: q.sampleAnswer }));
                                    }
                                  }
                                }}
                                className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                              >
                                <Edit3 className="w-3 h-3" />
                                {isCustomizing ? "Close Editor" : "Customize Answer"}
                              </button>
                            </div>

                            {isCustomizing ? (
                              <div className="space-y-2">
                                <textarea
                                  rows={4}
                                  value={currentAnswerText}
                                  onChange={(e) => setCustomAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                  placeholder="Fill in your bracketed details here..."
                                  className="w-full bg-slate-50 border border-indigo-200 rounded-xl p-3 text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                                />
                                <p className="text-[10px] text-slate-400 italic">
                                  Tip: Replace all [bracketed placeholders] with your actual metrics and achievements.
                                </p>
                              </div>
                            ) : (
                              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-800 leading-relaxed whitespace-pre-line font-normal">
                                {currentAnswerText}
                              </div>
                            )}
                          </div>

                          {/* Why It Works & Pitfalls Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                            <div className="p-2.5 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-emerald-950">Why This Works: </span>
                                <span className="text-emerald-800">{q.whyItWorks}</span>
                              </div>
                            </div>

                            <div className="p-2.5 bg-rose-50/70 border border-rose-200/60 rounded-xl text-xs text-rose-900 flex items-start gap-2">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-rose-950">Pitfall to Avoid: </span>
                                <span className="text-rose-800">{q.pitfallToAvoid}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
