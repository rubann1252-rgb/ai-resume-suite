export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github?: string;
  jobTitle: string;
  photo?: string;
  education?: string;
  educationYear?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  percentage?: string;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  technologies: string;
  link?: string;
  description: string;
}

export interface ResumeData {
  id: string;
  title: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  internships?: Internship[];
  projects?: Project[];
  skills: string[];
  certifications: string[];
  interests?: string[];
  softSkills?: string[];
  languages?: string[];
  industry: string;
  industryFields?: Record<string, string>;
}

export interface JobFitResult {
  jobTitle: string;
  targetCompany?: string;
  score: number; // 0-100
  atsAudit: {
    formattingCheck: {
      hasColumns: boolean;
      hasTables: boolean;
      hasCleanFonts: boolean;
      isStandardLength: boolean;
    };
    keywordMatch: {
      matched: string[];
      missing: string[];
    };
    structuralAnalysis: {
      hasContactInfo: boolean;
      hasProfessionalSummary: boolean;
      hasExperienceSection: boolean;
      hasEducationSection: boolean;
      hasSkillsSection: boolean;
    };
  };
  skillsGap: {
    technicalGaps: string[];
    softGaps: string[];
    recommendedSkillsToInclude: string[];
  };
  certifications: {
    title: string;
    provider: string;
    description: string;
    url: string;
    relevance: 'High' | 'Medium';
  }[];
  recommendations: string[];
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: 'Behavioral' | 'Technical' | 'Situational' | 'Resume-Specific';
  context: string;
  sampleAnswer: string;
}

export interface InterviewFeedback {
  score: number; // 0-100
  strengths: string[];
  improvements: string[];
  betterPhrasing: string;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string; // 'Full-time' | 'Contract' | 'Remote'
  salary: string;
  description: string;
  requirements: string[];
  industry: string;
  applied?: boolean;
}
