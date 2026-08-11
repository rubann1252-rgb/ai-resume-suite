# AI Resume Suite 🚀

An end-to-end, AI-powered Resume Builder, ATS Compatibility Scanner, and Interactive Interview Coach built with **React**, **TypeScript**, **Express**, **Tailwind CSS**, and **Google Gemini AI**.
# PROJECT LINK : https://ai-resume-suite.onrender.com/
---

## 🌟 Key Features

### 📄 1. Interactive Resume Builder
- **Real-Time Live Preview**: Instantly watch updates take effect as you enter personal details, work experience, projects, education, and skills.
- **Career Objective AI Optimizer**: Automatically refine and rewrite career objectives with high-impact phrasing tailored to your professional background.
- **Custom Section Support**: Built-in support for internships, personal projects, technical skills, soft skills, languages, certifications, and interests.
- **PDF Export**: Download high-quality, ATS-formatted PDF resumes directly from the browser using `jsPDF` and `html2canvas`.
- **Local Auto-Save**: Keeps your profile state stored safely in browser storage.

### 🎯 2. ATS Resume Checker & Job Fit Analyzer
- **Resume Upload & Extraction**: Supports uploading resume files (`.pdf`, `.docx`, `.txt`) or pasting raw resume text.
- **ATS Compatibility Score**: Calculates an overall match percentage against job descriptions or target position requirements.
- **In-Depth Analysis**:
  - Keyword match & missing skills gap identification.
  - Action verb impact scoring.
  - Readability and ATS formatting checks.
  - Actionable recommendations to pass automated applicant tracking systems.

### 🎙️ 3. AI Interview Preparation Coach
- **Tailored Question Generation**: Requires both a valid resume and target job position to generate 10 customized technical, behavioral, and situational questions.
- **Sample Answers & Tips**: Provides model answers and key talking points structured around your real background.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Motion (`motion/react`), Lucide React Icons
- **Backend / API**: Node.js, Express, ESBuild, TSX
- **AI Integration**: `@google/genai` (Google Gemini 2.5 / Flash model)
- **PDF Generation**: `jspdf`, `html2canvas`

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18+` or `v20+`
- **npm**: `v9+`
- **Google Gemini API Key**: Obtain a free key from [Google AI Studio](https://aistudio.google.com/)

---

### Installation & Local Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-resume-suite.git
   cd ai-resume-suite
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=3000
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

- `npm run dev`: Starts the Node/Express backend with Vite development middleware.
- `npm run build`: Compiles the React client with Vite and bundles `server.ts` into CommonJS (`dist/server.cjs`) using ESBuild.
- `npm start`: Runs the production server (`node dist/server.cjs`).
- `npm run lint`: Runs TypeScript type-checking without emitting code.

---

## 🌐 Deployment Guidelines

### Deploying on Render (Full-Stack Web Service)
This application includes a custom Express server that handles Gemini AI proxy requests and serves static files.

1. Create a new **Web Service** on [Render.com](https://render.com).
2. Connect your GitHub repository.
3. Set the following build settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add Environment Variables in Render:
   - `GEMINI_API_KEY` = *your_gemini_api_key*
   - `NODE_ENV` = `production`

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).



