import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { analyzeAtsSimulated, generateInterviewQuestionsSimulated } from "./src/server/domainAnalyzer";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));

const PORT = 3000;

// Helper to safely extract and parse JSON from Gemini text output
function cleanAndParseJson(text: string) {
  if (!text) throw new Error("Empty response from AI model");
  let cleaned = text.replace(/```(?:json)?\s*([\s\S]*?)\s*```/gi, "$1").trim();
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const jsonMatch = cleaned.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }
    throw e;
  }
}

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } else {
    console.warn("GEMINI_API_KEY is not defined or is placeholder. AI features will run in domain-aware simulator mode.");
  }
} catch (err) {
  console.error("Failed to initialize Gemini:", err);
}

// Helper for fallback simulated responses when API key is missing
function enhanceTextWithRuleBasedFallback(text: string, position: string = "Professional", contextType: string = "experience"): string {
  if (!text || !text.trim()) {
    return `Demonstrated technical expertise and key deliverables in ${position} role.`;
  }

  let cleaned = text.trim();

  // Correct tech stack spelling & capitalizations
  const replacements: [RegExp, string][] = [
    [/\bjava\s*script\b/gi, "JavaScript"],
    [/\btype\s*script\b/gi, "TypeScript"],
    [/\breact\s*js\b/gi, "React.js"],
    [/\bnode\s*js\b/gi, "Node.js"],
    [/\bcss\b/gi, "CSS"],
    [/\bhtml\b/gi, "HTML"],
    [/\bpython\b/gi, "Python"],
    [/\bjava\b/gi, "Java"],
    [/\bc\+\+\b/gi, "C++"],
    [/\bsql\b/gi, "SQL"],
    [/\bmongodb\b/gi, "MongoDB"],
    [/\bexpress\b/gi, "Express"],
    [/\btailwind\b/gi, "Tailwind CSS"],
    [/\bgit\b/gi, "Git"],
    [/\bgithub\b/gi, "GitHub"],
    [/\baws\b/gi, "AWS"],
    [/\bdocker\b/gi, "Docker"],
  ];

  for (const [regex, rep] of replacements) {
    cleaned = cleaned.replace(regex, rep);
  }

  // Remove awkward leading informal phrases & standardize starter verbs
  cleaned = cleaned
    .replace(/^here\s+i\s+have\s+learn(ed)?\s+to\s+use\s+/i, "Gained practical hands-on experience utilizing ")
    .replace(/^here\s+i\s+have\s+learn(ed)?\s+/i, "Acquired hands-on experience in ")
    .replace(/^i\s+have\s+learn(ed)?\s+to\s+use\s+/i, "Gained proficiency in ")
    .replace(/^i\s+learned\s+how\s+to\s+use\s+/i, "Developed technical proficiency in ")
    .replace(/^i\s+learned\s+/i, "Acquired practical expertise in ")
    .replace(/^i\s+worked\s+on\s+/i, "Collaborated on ")
    .replace(/^i\s+built\s+/i, "Engineered ")
    .replace(/^i\s+made\s+/i, "Developed ");

  // Fix awkward spacing around commas or punctuation
  cleaned = cleaned.replace(/\s+,\s*/g, ", ").replace(/\s+\.\s*/g, ". ").replace(/\s+/g, " ");

  // Capitalize first letter
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  // If the sentence doesn't start with a strong action verb
  if (!/^(gained|acquired|developed|engineered|collaborated|spearheaded|implemented|designed|built|architected|utilizing|managed|led|created|delivered|optimized|assisted)\b/i.test(cleaned)) {
    if (contextType === "internship") {
      cleaned = `Gained hands-on experience and technical proficiency in ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}`;
    } else if (contextType === "project") {
      cleaned = `Designed and implemented project solution utilizing ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}`;
    } else {
      cleaned = `Utilized key competencies to ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}`;
    }
  }

  // Ensure ending period
  if (!cleaned.endsWith(".")) {
    cleaned += ".";
  }

  return cleaned;
}

function getSimulatorResponse(type: string, reqBody: any) {
  switch (type) {
    case "optimize-summary": {
      const summaryText = reqBody.summary || "";
      const title = reqBody.jobTitle || reqBody.position || "Professional";
      if (summaryText.trim()) {
        return enhanceTextWithRuleBasedFallback(summaryText, title, "summary");
      }
      return `Results-driven ${title} with demonstrated success leading high-impact initiatives, driving process optimization, and collaborating with cross-functional partners. Adept at leveraging modern methodologies to deliver reliable solutions and maximize operational efficiency.`;
    }
    
    case "optimize-bullet": {
      const text = reqBody.bullet || reqBody.currentText || "";
      const position = reqBody.position || "Professional";
      const contextType = reqBody.contextType || "experience";
      return enhanceTextWithRuleBasedFallback(text, position, contextType);
    }

    case "analyze-ats":
      return analyzeAtsSimulated(
        reqBody.resumeText || "",
        reqBody.jobTitle || "Software Engineer",
        reqBody.jobDescription
      );

    case "interview-questions":
      return generateInterviewQuestionsSimulated(
        reqBody.resumeText || "",
        reqBody.jobTitle || "Software Engineer"
      );

    case "interview-coach":
      return {
        score: 82,
        strengths: ["Clear action-oriented structure", "Mentions quantifiable improvements", "Direct answers"],
        improvements: ["Could state the context more briefly", "Needs to link back to the specific team value"],
        betterPhrasing: "I successfully overhauled our core system deployment. By setting up standardized configuration files and automating our lint validation check, we reduced deployment-related downtime by 30% and increased total release velocity."
      };

    default:
      return {};
  }
}

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", aiEnabled: ai !== null });
});

// 2. Optimize Summary
app.post("/api/resume/optimize-summary", async (req, res) => {
  const { summary, jobTitle } = req.body;
  if (!summary) {
    return res.status(400).json({ error: "Summary is required" });
  }

  if (!ai) {
    console.log("No Gemini API key. Emulating optimize-summary.");
    return res.json({ result: getSimulatorResponse("optimize-summary", req.body) });
  }

  try {
    const prompt = `You are an expert executive resume writer and career coach.
Enhance, correct, and professionalize the following professional summary for a candidate targeting the role of "${jobTitle || "Professional"}".

CRITICAL INSTRUCTIONS:
1. Retain and preserve the original details, core competencies, technologies, and career focus provided in the candidate's input.
2. Fix any grammar errors, typos (e.g. "java script" -> "JavaScript", "css" -> "CSS"), awkward syntax, or informal language.
3. Rewrite into an impactful, ATS-optimized professional summary using active verbs and industry-standard phrasing.
4. Keep the summary concise (2 to 4 sentences, under 100 words total).
5. Do NOT include any introduction, placeholders, or explanation. Return ONLY the enhanced text.

Summary to optimize:
"${summary}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const optimized = response.text ? response.text.trim() : "";
    res.json({ result: optimized || getSimulatorResponse("optimize-summary", req.body) });
  } catch (error) {
    console.error("Error in optimize-summary:", error);
    res.status(500).json({ error: "Failed to optimize summary via Gemini API" });
  }
});

// 3. Optimize Bullet Point / Description
app.post("/api/resume/optimize-bullet", async (req, res) => {
  const { bullet, position, contextType } = req.body;
  if (!bullet) {
    return res.status(400).json({ error: "Description text is required" });
  }

  if (!ai) {
    console.log("No Gemini API key. Emulating optimize-bullet.");
    return res.json({ result: getSimulatorResponse("optimize-bullet", req.body) });
  }

  try {
    const typeLabel = contextType === "internship" 
      ? "internship experience and key learnings" 
      : contextType === "project" 
        ? "project description and technical achievements" 
        : "work experience role and achievements";

    const prompt = `You are an ATS optimization expert and senior career counselor.
Enhance, correct, and professionalize the following ${typeLabel} for a candidate targeting or working as "${position || "Professional"}".

CRITICAL INSTRUCTIONS:
1. Retain and preserve ALL tools, technologies, responsibilities, and facts mentioned in the input (e.g., if CSS, JavaScript, Python, or specific tasks are mentioned, keep them prominent and accurate).
2. Fix all grammatical mistakes, spelling errors (e.g. "java script" -> "JavaScript", "css" -> "CSS", "python" -> "Python"), punctuation, and awkward phrasing (e.g. "here i have learn to use" -> "Gained practical experience and hands-on proficiency in").
3. Begin with a strong action verb (e.g., Engineered, Spearheaded, Developed, Collaborated, Architected, Delivered, Utilized).
4. Keep it concise (1 to 2 clear, impactful sentences), professional, and ATS-friendly.
5. Do NOT add meta commentary, quotation marks, or surrounding text. Return ONLY the enhanced text.

Text to optimize:
"${bullet}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const optimized = response.text ? response.text.trim() : "";
    res.json({ result: optimized || getSimulatorResponse("optimize-bullet", req.body) });
  } catch (error) {
    console.error("Error in optimize-bullet:", error);
    res.status(500).json({ error: "Failed to optimize text via Gemini API" });
  }
});

// 4. Analyze Resume & ATS (Job-Fit Scoring)
app.post("/api/resume/analyze-ats", async (req, res) => {
  const { resumeText, jobTitle, jobDescription } = req.body;
  if (!resumeText || !jobTitle) {
    return res.status(400).json({ error: "Resume text and job title are required for analysis" });
  }

  if (!ai) {
    console.log("No Gemini API key. Emulating analyze-ats with domain analyzer.");
    return res.json(getSimulatorResponse("analyze-ats", req.body));
  }

  try {
    const prompt = `You are an expert Applicant Tracking System (ATS) auditor and senior career counselor.
Analyze the provided Resume Text against the target Job Title "${jobTitle}" and optional Job Description "${jobDescription || ""}".

CRITICAL ACCURACY REQUIREMENT:
Rigorously evaluate whether the candidate's actual skills and experience in the resume match the target Job Title "${jobTitle}".
If the candidate's resume is from a different domain (e.g., a Software Developer resume applying for Cybersecurity, Nursing, or Accounting):
- Reflect this domain mismatch in the score (typically 35-58 out of 100).
- Matched keywords should ONLY include terms present in the resume that actually apply to or cross over into "${jobTitle}".
- Missing keywords MUST list the essential skills, tools, and certifications required for "${jobTitle}" that are missing from the resume.
- Recommendations and recommended certifications MUST be specific to "${jobTitle}".

Evaluate and return the output strictly structured as a JSON object matching this schema:
{
  "jobTitle": "${jobTitle}",
  "targetCompany": "Extracted target company name, or 'Target Company' if not specified",
  "score": 85, // Integer from 0 to 100 reflecting true ATS fit, keyword alignment, and structural completeness.
  "atsAudit": {
    "formattingCheck": {
      "hasColumns": false,
      "hasTables": false,
      "hasCleanFonts": true,
      "isStandardLength": true
    },
    "keywordMatch": {
      "matched": ["list", "of", "keywords", "present", "in", "resume", "that", "align", "with", "target", "role"],
      "missing": ["list", "of", "essential", "keywords", "required", "for", "target", "role", "absent", "from", "resume"]
    },
    "structuralAnalysis": {
      "hasContactInfo": true,
      "hasProfessionalSummary": true,
      "hasExperienceSection": true,
      "hasEducationSection": true,
      "hasSkillsSection": true
    }
  },
  "skillsGap": {
    "technicalGaps": ["missing", "technical", "skills", "or", "tools", "required", "for", "target", "role"],
    "softGaps": ["missing", "interpersonal", "or", "domain", "soft", "skills"],
    "recommendedSkillsToInclude": ["skills", "the", "user", "should", "add", "to", "their", "resume", "for", "this", "role"]
  },
  "certifications": [
    {
      "title": "Name of relevant certification for ${jobTitle}",
      "provider": "Provider (e.g., CompTIA, AWS, PMI, Cisco, Google)",
      "description": "Short explanation of why this certification helps them qualify for ${jobTitle}",
      "url": "Official or search URL for this certification",
      "relevance": "High"
    }
  ],
  "recommendations": [
    "3-4 highly actionable recommendations to optimize this resume specifically for ${jobTitle}"
  ]
}

Resume Text:
${resumeText}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const rawJson = response.text ? response.text.trim() : "";
    const parsed = cleanAndParseJson(rawJson);
    res.json(parsed);
  } catch (error) {
    console.error("Error in analyze-ats:", error);
    res.json(getSimulatorResponse("analyze-ats", req.body));
  }
});

// 5. Generate Tailored Interview Prep Questions
app.post("/api/interview/questions", async (req, res) => {
  const { resumeText, jobTitle, jobDescription } = req.body;
  if (!resumeText || !jobTitle) {
    return res.status(400).json({ error: "Resume text and Job Title are required to generate preparation questions" });
  }

  if (!ai) {
    console.log("No Gemini API key. Emulating interview questions.");
    return res.json(getSimulatorResponse("interview-questions", req.body));
  }

  try {
    const prompt = `You are an elite corporate interviewer.
Generate exactly 10 interview preparation questions tailored to the candidate's resume and target role of "${jobTitle}" (and Job Description: "${jobDescription || ""}").

The 10 questions must be partitioned into:
- Behavioral questions (testing leadership, teamwork, grit)
- Technical questions (specific to tools or methodologies required for ${jobTitle})
- Situational questions (what they would do in a future scenario in this role)
- Resume-Specific questions (derived explicitly from facts or achievements listed in their resume text).

Return the output strictly structured as a JSON array of 10 objects:
[
  {
    "id": "q1",
    "question": "The question string",
    "category": "Behavioral" | "Technical" | "Situational" | "Resume-Specific",
    "context": "Contextual advice explaining what the interviewer evaluates with this question",
    "sampleAnswer": "A sample answer demonstrating strong execution"
  }
]

Resume Text:
${resumeText}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const rawJson = response.text ? response.text.trim() : "";
    const parsed = cleanAndParseJson(rawJson);
    res.json(parsed);
  } catch (error) {
    console.error("Error in interview/questions:", error);
    res.json(getSimulatorResponse("interview-questions", req.body));
  }
});

// 6. Real-Time Interview Coaching & Evaluation
app.post("/api/interview/coach", async (req, res) => {
  const { question, answer, context } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: "Question and Answer are required for coaching" });
  }

  if (!ai) {
    console.log("No Gemini API key. Emulating interview coach.");
    return res.json(getSimulatorResponse("interview-coach", req.body));
  }

  try {
    const prompt = `You are an expert interview coach.
Evaluate the candidate's answer to the following question.

Question: "${question}"
Candidate's Answer: "${answer}"
Question Context/Tips: "${context || ""}"

Return a JSON object:
{
  "score": 85,
  "strengths": ["2-3 strong points"],
  "improvements": ["2-3 areas to improve"],
  "betterPhrasing": "A polished rewrite of their response"
}

Question & Answer:
Question: ${question}
Answer: ${answer}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const rawJson = response.text ? response.text.trim() : "";
    const parsed = cleanAndParseJson(rawJson);
    res.json(parsed);
  } catch (error) {
    console.error("Error in interview/coach:", error);
    res.json(getSimulatorResponse("interview-coach", req.body));
  }
});

// Setup Vite Dev server or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting development server with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting production server static asset hosting...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
