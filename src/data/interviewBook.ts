export interface BookQuestion {
  id: string;
  question: string;
  sampleAnswer: string;
  whyItWorks: string;
  pitfallToAvoid: string;
}

export interface BookChapter {
  id: string;
  chapterNumber: number;
  title: string;
  category: string;
  iconName: string;
  summary: string;
  strategy: string;
  questions: BookQuestion[];
}

export const INTERVIEW_PLAYBOOK: BookChapter[] = [
  {
    id: "ch1",
    chapterNumber: 1,
    title: "Tell Me About Yourself & Background",
    category: "Tell Me About Yourself",
    iconName: "User",
    summary: "Master the elevator pitch and narrative arc that sets a positive tone for the entire interview.",
    strategy: "Structure your narrative as: Past (foundation & key wins) -> Present (current focus & strengths) -> Future (why this exact role excites you). Keep it between 90 to 120 seconds.",
    questions: [
      {
        id: "q1_1",
        question: "1. Tell me about yourself.",
        sampleAnswer: "I've spent [X years] in [industry], most recently as a [role] at [company/organization], where I [key achievement]. Before that, I [earlier role or major project], which built my foundation in [core skill]. What connects it all is [theme]. I'm excited about this role because [specific reason tied to the company], and I think my background in [strength] fits well with what you're building here.",
        whyItWorks: "Seamlessly connects past achievements with future goals while explicitly validating company alignment.",
        pitfallToAvoid: "Don't recite your resume line-by-line or ramble into personal hobbies unless asked."
      },
      {
        id: "q1_2",
        question: "2. Walk me through your resume.",
        sampleAnswer: "I started at [first role/degree], where I focused on [what you did]. From there, I moved to [next role], taking on [added responsibility or achievement]. Most recently, at [current role], I've been [current focus], which is what's led me to look at opportunities like this one.",
        whyItWorks: "Presents a logical narrative curve showing upward trajectory and intentional growth.",
        pitfallToAvoid: "Avoid getting bogged down in dates, minor job duties, or negative reasons for leaving past roles."
      },
      {
        id: "q1_3",
        question: "3. Can you give me a brief summary of your background?",
        sampleAnswer: "I have a background in [field/degree], with [X years] of experience in [specific area]. My strengths are in [core skill 1] and [core skill 2], and I've applied them most recently at [company/project] to [result]. I'm looking to bring that into a role like this one.",
        whyItWorks: "Concise summary that highlights core competencies and immediate relevance.",
        pitfallToAvoid: "Avoid being vague or skipping key domain accomplishments."
      },
      {
        id: "q1_4",
        question: "4. What should I know about you that isn't on your resume?",
        sampleAnswer: "One thing that doesn't show up on paper is [trait — e.g., how much I enjoy mentoring newer team members]. At [company/project], I [specific example]. It's not something I'd list as a 'skill,' but it shapes how I work day to day.",
        whyItWorks: "Shows emotional intelligence, cultural alignment, and personal leadership philosophy.",
        pitfallToAvoid: "Don't share irrelevant personal facts; keep it focused on work posture and value."
      },
      {
        id: "q1_5",
        question: "5. How would you describe yourself in a few sentences?",
        sampleAnswer: "I'd say I'm [trait 1] and [trait 2] — for example, [brief evidence]. I care a lot about [value, e.g., doing thorough work or supporting my team], and that's shown up throughout my time at [company/school].",
        whyItWorks: "Punchy, memorably anchored in concrete evidence rather than empty buzzwords.",
        pitfallToAvoid: "Avoid listing generic adjectives like 'hardworking' without supporting context."
      },
      {
        id: "q1_6",
        question: "6. What led you to pursue a career in this field?",
        sampleAnswer: "It started with [specific moment or experience — a class, project, internship], where I realized I really enjoyed [aspect of the work]. Since then, I've built on that through [subsequent experience], which confirmed this is the kind of work I want to keep doing.",
        whyItWorks: "Establishes genuine passion and intentionality rather than accidental job choice.",
        pitfallToAvoid: "Don't cite money or prestige as the primary motivation."
      },
      {
        id: "q1_7",
        question: "7. Tell me about your education and how it prepared you for this role.",
        sampleAnswer: "I studied [degree/field] at [school], focusing on [relevant coursework or specialization]. [Specific project, thesis, or coursework] gave me hands-on experience with [skill relevant to the role], which applies directly to what you're looking for here.",
        whyItWorks: "Directly bridges academic training to practical industry skills.",
        pitfallToAvoid: "Don't just list course names; explain what you actually built or mastered."
      },
      {
        id: "q1_8",
        question: "8. What are you currently doing in your career or studies?",
        sampleAnswer: "Right now I'm [current role/year of study] at [company/school], focused on [main responsibility or coursework]. I'm also [side project, extracurricular, or additional learning], which has helped me build [relevant skill].",
        whyItWorks: "Demonstrates active growth, momentum, and continuous learning.",
        pitfallToAvoid: "Don't sound dissatisfied or disengaged in your present position."
      },
      {
        id: "q1_9",
        question: "9. How would your friends, classmates, or colleagues describe you?",
        sampleAnswer: "I think they'd say I'm [trait], and probably mention that I [specific behavior — e.g., always double-check the details before a deadline]. A teammate at [company/project] once told me [brief anecdote], which stuck with me.",
        whyItWorks: "Offers 3rd-party social proof and validates peer reputation.",
        pitfallToAvoid: "Avoid braggy statements that sound unrealistic."
      },
      {
        id: "q1_10",
        question: "10. Give me your professional story in about two minutes.",
        sampleAnswer: "It started with [early interest or first role], which led me to [next step]. Along the way, I [key achievement], and that shaped how I approach [skill/value]. Now I'm looking for a role like this one because [reason tied to the company or role].",
        whyItWorks: "Clear chronological arc with a tight 2-minute constraint.",
        pitfallToAvoid: "Don't lose track of time or get lost in trivial details."
      },
      {
        id: "q1_11",
        question: "11. Introduce yourself as if we'd just met at a networking event.",
        sampleAnswer: "Hi, I'm [name] — I work in [field] as a [role], mostly focused on [what you do]. Right now I'm especially interested in [trend or area], which is actually part of why I wanted to connect with people here.",
        whyItWorks: "Conversational, approachable, and highlights immediate professional focus.",
        pitfallToAvoid: "Don't sound overly formal or rehearsed like a textbook monologue."
      },
      {
        id: "q1_12",
        question: "12. What are the key milestones in your journey so far, academic or professional?",
        sampleAnswer: "A few stand out: [milestone 1 — e.g., landing my first internship at X], [milestone 2 — e.g., leading Y project], and [milestone 3 — e.g., earning Z certification]. Each one pushed me to build a different skill, and together they've prepared me for a role like this.",
        whyItWorks: "Highlights progressive growth and resilience across key inflection points.",
        pitfallToAvoid: "Avoid selecting milestones that lack measurable outcomes or clear learning."
      }
    ]
  },
  {
    id: "ch2",
    chapterNumber: 2,
    title: "Behavioral Questions (STAR Method)",
    category: "Behavioral Questions",
    iconName: "Award",
    summary: "Structure past experiences cleanly using Situation, Task, Action, and Result.",
    strategy: "Dedicate 15% to Situation/Task, 65% to your specific Actions, and 20% to quantifiable Results and Key Learnings.",
    questions: [
      {
        id: "q2_1",
        question: "1. Tell me about a time you faced a difficult challenge at work or school.",
        sampleAnswer: "During [project/role], we ran into [challenge]. I [specific action], which involved [detail]. As a result, [outcome], and I learned [lesson].",
        whyItWorks: "Clean STAR framework that highlights individual problem-solving and tangible results.",
        pitfallToAvoid: "Don't spend too much time complaining about the difficulty of the situation."
      },
      {
        id: "q2_2",
        question: "2. Describe a situation where you had to work with a difficult team member.",
        sampleAnswer: "I worked with a teammate who [specific difficult behavior — e.g., missed deadlines without communicating]. Instead of escalating right away, I [action — had a direct conversation, adjusted the workflow]. That improved things, and we finished [project] on time.",
        whyItWorks: "Shows interpersonal maturity, empathy, and direct conflict management.",
        pitfallToAvoid: "Never trash-talk the team member or sound spiteful."
      },
      {
        id: "q2_3",
        question: "3. Give an example of a time you went above and beyond what was expected.",
        sampleAnswer: "On [project], I noticed [gap or opportunity beyond my role]. I took it on by [specific action], even though it wasn't formally my responsibility. It resulted in [outcome], and it's something my manager/professor later called out.",
        whyItWorks: "Demonstrates high ownership, proactivity, and self-direction.",
        pitfallToAvoid: "Avoid framing standard job duties as 'going above and beyond'."
      },
      {
        id: "q2_4",
        question: "4. Tell me about a time you made a mistake. How did you handle it?",
        sampleAnswer: "I once [specific mistake] on [project]. As soon as I noticed, I [immediate action — flagged it, fixed it, informed the right people]. We resolved it by [outcome], and I changed my process afterward to [preventive step].",
        whyItWorks: "Proves accountability, rapid remediation, and process improvement.",
        pitfallToAvoid: "Don't blame others or pick a mistake that shows a lack of core integrity."
      },
      {
        id: "q2_5",
        question: "5. Describe a time you had to learn something new very quickly.",
        sampleAnswer: "When I joined [project/role], I had to get up to speed on [tool/skill] within [timeframe]. I [specific learning approach — took a course, shadowed someone, built a small test project]. Within [timeframe], I was able to [outcome].",
        whyItWorks: "Demonstrates agility, learning speed, and practical application.",
        pitfallToAvoid: "Don't claim you mastered it overnight without evidence."
      },
      {
        id: "q2_6",
        question: "6. Tell me about a time you disagreed with a manager, professor, or supervisor.",
        sampleAnswer: "On [project], I disagreed with [person]'s approach to [decision] because [reason]. I raised it using [specific evidence or alternative proposal], while being clear I'd support whatever they decided. We ended up [outcome].",
        whyItWorks: "Shows respectful dissent backed by evidence, coupled with commitment to team decisions.",
        pitfallToAvoid: "Avoid sounding insubordinate or passive-aggressive."
      },
      {
        id: "q2_7",
        question: "7. Give an example of a time you took initiative without being asked.",
        sampleAnswer: "I noticed [problem/opportunity] that wasn't anyone's direct responsibility. I decided to [action you took on your own], and brought it to [person/team] once I had something concrete. It led to [outcome].",
        whyItWorks: "Proves intrinsic motivation and proactive execution.",
        pitfallToAvoid: "Don't pick an initiative that disrupted core team priorities."
      },
      {
        id: "q2_8",
        question: "8. Describe a time you had to persuade someone to see things your way.",
        sampleAnswer: "I believed [position], but [person/team] initially disagreed. I built my case around [specific evidence or reasoning] rather than just insisting, and walked them through it. They came around, and we moved forward with [outcome].",
        whyItWorks: "Highlights persuasion based on data, logic, and shared goals.",
        pitfallToAvoid: "Don't describe it as a power struggle or argument."
      },
      {
        id: "q2_9",
        question: "9. Tell me about a time you received tough feedback. How did you respond?",
        sampleAnswer: "My manager/professor once told me [feedback]. My first reaction was [honest, brief], but I reflected and realized they had a point about [specific aspect]. I worked on it by [action], and it's noticeably improved since then.",
        whyItWorks: "Shows coachability, emotional maturity, and growth mindset.",
        pitfallToAvoid: "Don't get defensive or dismiss the feedback."
      },
      {
        id: "q2_10",
        question: "10. Describe a situation where you had to adapt to sudden, unexpected change.",
        sampleAnswer: "Midway through [project], [change] happened. I adjusted by [specific action — e.g., re-prioritizing tasks, learning a new tool overnight]. We still delivered [outcome] despite the shift.",
        whyItWorks: "Shows resilience, flexibility, and steady composure.",
        pitfallToAvoid: "Don't dwell on how stressful or unfair the change was."
      },
      {
        id: "q2_11",
        question: "11. Tell me about a time you missed a deadline. What happened?",
        sampleAnswer: "On [project], I missed the deadline for [deliverable] because [honest reason, e.g., underestimated scope]. I let [person] know as soon as I realized, proposed a revised timeline, and delivered [outcome] shortly after. Since then, I've built in [preventive habit].",
        whyItWorks: "Demonstrates early communication, responsibility, and systematic prevention.",
        pitfallToAvoid: "Don't make excuses or hide the missed deadline."
      },
      {
        id: "q2_12",
        question: "12. Give an example of a time you performed well under pressure.",
        sampleAnswer: "With [tight deadline/high-stakes situation], I focused first on [prioritization approach], then executed by [specific action]. We delivered [outcome] on time, staying effective by [how you managed the pressure].",
        whyItWorks: "Proves mental clarity and methodical triage in high-stakes environments.",
        pitfallToAvoid: "Avoid saying you 'always work better under pressure' without proof."
      },
      {
        id: "q2_13",
        question: "13. Describe a time you collaborated with people from a very different background or department than yours.",
        sampleAnswer: "On [project], I worked closely with [team/department], who approached things very differently than my own team. I made a point to [action — asked questions, adjusted communication style], which helped us align on [shared goal] and deliver [outcome].",
        whyItWorks: "Highlights cross-functional empathy and communication adaptability.",
        pitfallToAvoid: "Don't stereotype other departments or teams."
      }
    ]
  },
  {
    id: "ch3",
    chapterNumber: 3,
    title: "Situational Questions",
    category: "Situational Questions",
    iconName: "Compass",
    summary: "Demonstrate calm judgment, priority handling, and clear decision-making in hypothetical scenarios.",
    strategy: "Outline your logical step-by-step thinking: assess risk -> prioritize -> consult stakeholders -> execute & follow up.",
    questions: [
      {
        id: "q3_1",
        question: "1. What would you do if you were given a task with unclear instructions?",
        sampleAnswer: "I'd start by listing what I do understand, then go back to [person] with specific questions rather than guessing. If they weren't available right away, I'd make my best reasonable assumption, note it clearly, and proceed — flagging it for confirmation as soon as I could.",
        whyItWorks: "Balances independent initiative with proactive alignment.",
        pitfallToAvoid: "Don't freeze and wait passively, or guess wildly without documenting assumptions."
      },
      {
        id: "q3_2",
        question: "2. How would you handle disagreeing with a decision made by leadership?",
        sampleAnswer: "I'd raise my concern privately and directly, framed around the reasoning rather than just the outcome. If they still went ahead after hearing me out, I'd commit fully to executing it well.",
        whyItWorks: "Demonstrates 'disagree and commit' professional philosophy.",
        pitfallToAvoid: "Avoid undermining leadership decisions behind their backs."
      },
      {
        id: "q3_3",
        question: "3. If you noticed a teammate quietly struggling, what would you do?",
        sampleAnswer: "I'd check in privately rather than raise it in a group setting. If they needed help, I'd offer it directly rather than waiting to be asked, and loop in a manager only if it seemed necessary.",
        whyItWorks: "Shows peer empathy, discretion, and supportive teamwork.",
        pitfallToAvoid: "Don't embarrass them in public or ignore their struggle."
      },
      {
        id: "q3_4",
        question: "4. How would you respond if you were given more work than you could realistically finish?",
        sampleAnswer: "I'd lay out my current workload for my manager with rough time estimates and ask them to help me prioritize, rather than silently trying to do it all or silently dropping something.",
        whyItWorks: "Maintains transparent workload management and prevents burnout or dropped balls.",
        pitfallToAvoid: "Don't say 'yes' to everything silently and fail on deliverables."
      },
      {
        id: "q3_5",
        question: "5. What would you do if you found a serious error right before a deadline?",
        sampleAnswer: "I'd flag it immediately rather than hope no one notices, with a clear description of the error and, if possible, a proposed fix. Missing the deadline slightly to fix it properly beats shipping a known mistake.",
        whyItWorks: "Prioritizes long-term quality and integrity over short-term optical compliance.",
        pitfallToAvoid: "Never hide bugs or errors hoping they go unnoticed."
      },
      {
        id: "q3_6",
        question: "6. If a client or customer was unhappy with your work, how would you handle it?",
        sampleAnswer: "I'd listen fully before responding, to understand exactly what fell short. Then I'd acknowledge the specific issue, propose a concrete fix, and follow up to confirm they're satisfied.",
        whyItWorks: "De-escalates tension through active listening and constructive resolution.",
        pitfallToAvoid: "Avoid getting defensive or making excuses."
      },
      {
        id: "q3_7",
        question: "7. How would you respond if asked to do something outside your job description?",
        sampleAnswer: "As long as it's reasonable and not a pattern of overreach, I'd take it on — it's often a chance to learn something new. I'd just make sure my existing priorities were still communicated clearly.",
        whyItWorks: "Shows team-first mindset and flexibility.",
        pitfallToAvoid: "Don't say 'that's not my job' or neglect primary duties."
      },
      {
        id: "q3_8",
        question: "8. What would you do if two teammates were in conflict and it was hurting the project?",
        sampleAnswer: "I'd talk to each of them separately first to understand both sides, then bring them together to focus on the shared goal. If it stayed unresolved, I'd loop in a manager.",
        whyItWorks: "Provides structured mediation while maintaining focus on project outcomes.",
        pitfallToAvoid: "Don't take sides or spread workplace gossip."
      },
      {
        id: "q3_9",
        question: "9. If two managers gave you conflicting priorities, how would you handle it?",
        sampleAnswer: "I'd bring both of them into the same conversation, or make sure they were both aware of the conflict, and ask them to help me decide what comes first.",
        whyItWorks: "Aligns stakeholders transparently without getting caught in the middle.",
        pitfallToAvoid: "Don't try to decide secretly without letting both managers know."
      },
      {
        id: "q3_10",
        question: "10. How would you approach a project using a tool or method you'd never used before?",
        sampleAnswer: "I'd spend focused time upfront learning the basics — documentation, a short tutorial, or asking someone experienced with it — before diving in, and build in extra buffer time.",
        whyItWorks: "Demonstrates systematic self-learning and risk mitigation.",
        pitfallToAvoid: "Don't start hacking away blindly without reviewing fundamentals."
      },
      {
        id: "q3_11",
        question: "11. What would you do if, halfway through a project, you realized the original plan wasn't working?",
        sampleAnswer: "I'd raise it as soon as I noticed rather than push forward hoping it'd resolve itself, bringing [stakeholder] a clear picture of what's not working plus one or two alternatives.",
        whyItWorks: "Proves courage to pivot early and come with solutions.",
        pitfallToAvoid: "Don't continue down a failing path due to sunk cost fallacy."
      },
      {
        id: "q3_12",
        question: "12. If you had to deliver bad news to a stakeholder or client, how would you approach it?",
        sampleAnswer: "I'd be direct and upfront rather than burying it — stating clearly what happened, why, and what I'm doing about it — and come with a plan already in hand.",
        whyItWorks: "Builds long-term trust through courage, clarity, and immediate solutions.",
        pitfallToAvoid: "Avoid sugarcoating or delaying the news."
      }
    ]
  },
  {
    id: "ch4",
    chapterNumber: 4,
    title: "Technical & Domain Expertise",
    category: "Technical Questions",
    iconName: "FileText",
    summary: "Articulate core tools, system architecture, quality controls, and problem-solving methodologies.",
    strategy: "Anchor your answers in industry best practices, scientific troubleshooting, and verifiable technical outcomes.",
    questions: [
      {
        id: "q4_1",
        question: "1. What tools, software, or systems are you most proficient in for this kind of role?",
        sampleAnswer: "I'm most comfortable with [tool/system 1] and [tool/system 2], which I've used for [specific task] in [role/project]. I've also picked up [tool 3] more recently and am comfortable learning new systems quickly.",
        whyItWorks: "Directly lists relevant core stack and proves adaptability to new software.",
        pitfallToAvoid: "Don't list 20 tools superficially without depth in core ones."
      },
      {
        id: "q4_2",
        question: "2. Walk me through how you'd approach solving a typical technical or domain-specific problem in your field.",
        sampleAnswer: "I'd start by clearly defining the actual problem, not just the symptom. Then I'd [gather relevant information/data], test a hypothesis on a small scale, and adjust before rolling out a full solution.",
        whyItWorks: "Demonstrates a scientific, repeatable problem-solving framework.",
        pitfallToAvoid: "Don't jump straight to code/execution without defining root cause."
      },
      {
        id: "q4_3",
        question: "3. How do you stay current with new developments or best practices in your industry?",
        sampleAnswer: "I follow [specific publications, communities, or newsletters], and try to actually apply new ideas in small side projects rather than just reading about them. I also learn a lot from [colleagues/mentors/courses].",
        whyItWorks: "Shows continuous curiosity and hands-on experimentation.",
        pitfallToAvoid: "Avoid generic answers like 'I read the news online'."
      },
      {
        id: "q4_4",
        question: "4. Describe a technical or domain-specific challenge you faced and how you solved it.",
        sampleAnswer: "On [project], I ran into [specific technical challenge]. I approached it by [action — researched, tested, consulted a colleague], and solved it through [solution]. That taught me [lesson].",
        whyItWorks: "Combines technical depth with clear narrative resolution.",
        pitfallToAvoid: "Avoid getting bogged down in jargon the interviewer might not track."
      },
      {
        id: "q4_5",
        question: "5. What certifications, training, or coursework have you completed relevant to this role?",
        sampleAnswer: "I completed [certification/course/degree] in [area], which covered [relevant content]. I've also done [additional self-directed learning], since I like building on the fundamentals.",
        whyItWorks: "Validates formal learning alongside self-motivated skill building.",
        pitfallToAvoid: "Don't just list titles without explaining practical takeaways."
      },
      {
        id: "q4_6",
        question: "6. How would you explain a complex concept from your field to someone without that background?",
        sampleAnswer: "I'd use an analogy from everyday life rather than jargon — comparing [technical concept] to [simple, relatable comparison] — then check in to make sure it landed before adding detail.",
        whyItWorks: "Proves deep mastery by simplifying complex concepts.",
        pitfallToAvoid: "Never talk down to the audience or use dense technical buzzwords."
      },
      {
        id: "q4_7",
        question: "7. What steps do you take to ensure accuracy and quality in your work?",
        sampleAnswer: "I build in a review step before anything goes out — usually [specific method, e.g., a checklist, peer review, testing against sample data]. Catching small errors early saves much bigger problems later.",
        whyItWorks: "Highlights disciplined QA mechanisms and risk reduction.",
        pitfallToAvoid: "Don't rely solely on memory or rushing deliverables out the door."
      },
      {
        id: "q4_8",
        question: "8. Describe your process for troubleshooting when something isn't working as expected.",
        sampleAnswer: "I start by isolating the problem, checking the most likely cause first rather than guessing randomly. I change one variable at a time so I can tell what actually fixed it.",
        whyItWorks: "Demonstrates rigorous, step-by-step diagnostic isolation.",
        pitfallToAvoid: "Avoid changing multiple parameters at once randomly."
      },
      {
        id: "q4_9",
        question: "9. What's a skill or technique you're actively trying to improve right now?",
        sampleAnswer: "I'm working on [specific skill], because [reason — a gap I noticed, a goal I have]. I'm building it through [specific method — a course, practice project, mentorship].",
        whyItWorks: "Proves self-awareness and active professional growth.",
        pitfallToAvoid: "Don't name a core requirement of the role as something you're struggling with."
      },
      {
        id: "q4_10",
        question: "10. How do you decide whether a new tool or method is actually worth adopting?",
        sampleAnswer: "I look at whether it solves a real, recurring problem versus just being new for its own sake, and I test it on a small, low-risk task first before recommending it more broadly.",
        whyItWorks: "Shows pragmatic business evaluation over shiny-object syndrome.",
        pitfallToAvoid: "Don't advocate adopting tools just because they're trendy."
      },
      {
        id: "q4_11",
        question: "11. Tell me about a project where your technical or functional expertise made a real difference.",
        sampleAnswer: "On [project], my background in [skill] let me [specific contribution] that others on the team weren't positioned to do. It directly led to [outcome/result].",
        whyItWorks: "Illustrates distinct domain value and concrete business impact.",
        pitfallToAvoid: "Don't minimize team contribution while taking credit."
      },
      {
        id: "q4_12",
        question: "12. Tell me about a technical mistake you made and what you learned from it.",
        sampleAnswer: "I once [specific technical mistake] on [project], which caused [consequence]. Once I found the root cause, I fixed it by [action], and I now [preventive habit].",
        whyItWorks: "Shows technical humility and post-mortem learning.",
        pitfallToAvoid: "Don't pick a mistake that caused catastrophic unrecoverable damage."
      },
      {
        id: "q4_13",
        question: "13. How comfortable are you picking up new systems or technologies on the job?",
        sampleAnswer: "Very comfortable — for example, I picked up [tool/system] on [project] within [timeframe] by [approach], and was contributing productively soon after.",
        whyItWorks: "Proves past velocity in adopting new technology stacks.",
        pitfallToAvoid: "Don't just say 'very comfortable' without a past example."
      }
    ]
  },
  {
    id: "ch5",
    chapterNumber: 5,
    title: "Problem-Solving & Analytical Thinking",
    category: "Problem-Solving & Analytical",
    iconName: "Compass",
    summary: "Showcase data-driven analysis, breaking down ambiguity, and systematic problem resolution.",
    strategy: "Deconstruct complex challenges: isolate variables -> gather evidence -> form hypotheses -> test & validate.",
    questions: [
      {
        id: "q5_1",
        question: "1. Describe a complex problem you solved. What was your approach?",
        sampleAnswer: "On [project], we were dealing with [complex problem]. I broke it down into [smaller pieces], tackled [specific piece] first since it was the biggest blocker, and worked through the rest systematically. We resolved it by [outcome].",
        whyItWorks: "Shows structured decomposition of intimidating challenges.",
        pitfallToAvoid: "Avoid presenting the problem as an unorganized mess."
      },
      {
        id: "q5_2",
        question: "2. How do you approach a problem when you don't know the answer right away?",
        sampleAnswer: "I start by researching what's already known, then talk to someone with more context if I can. If I still don't have a clear answer, I'll test a small, reversible option rather than waiting for certainty.",
        whyItWorks: "Combines research discipline with low-risk execution.",
        pitfallToAvoid: "Don't freeze waiting for 100% complete information."
      },
      {
        id: "q5_3",
        question: "3. Tell me about a time you used data or evidence to make a decision.",
        sampleAnswer: "Before deciding on [decision], I looked at [specific data/evidence] rather than going purely on instinct. It showed [finding], which changed our approach to [action] and led to [outcome].",
        whyItWorks: "Highlights empirical decision-making over subjective opinion.",
        pitfallToAvoid: "Don't ignore quantitative metrics in favor of gut feeling."
      },
      {
        id: "q5_4",
        question: "4. Walk me through how you'd think about solving a hypothetical problem I give you.",
        sampleAnswer: "I'd first make sure I understand the actual goal and any constraints, then think out loud about a couple of possible approaches before picking one, rather than jumping straight to an answer.",
        whyItWorks: "Shows structured mental framework and willingness to clarify requirements.",
        pitfallToAvoid: "Don't rush to give a quick answer without understanding constraints."
      },
      {
        id: "q5_5",
        question: "5. Describe a time you spotted a problem before it became serious.",
        sampleAnswer: "While working on [project], I noticed [early warning sign] that others hadn't flagged yet. I raised it with [person], and we addressed it before it turned into [larger consequence it could have caused].",
        whyItWorks: "Proves proactive vigilance and risk mitigation.",
        pitfallToAvoid: "Don't exaggerate the severity to make yourself look like a hero."
      },
      {
        id: "q5_6",
        question: "6. How do you prioritize when you're solving several problems at once?",
        sampleAnswer: "I look at which problem is blocking the most other work, or has the most serious consequences if left unresolved, and tackle that first. I'll quickly triage the smaller ones so nothing falls through the cracks.",
        whyItWorks: "Emphasizes bottleneck analysis and high-impact prioritization.",
        pitfallToAvoid: "Don't tackle low-hanging easy tasks while critical blockers stall."
      },
      {
        id: "q5_7",
        question: "7. Tell me about a time your first solution didn't work. What did you do next?",
        sampleAnswer: "My first attempt at solving [problem] didn't hold up because [reason]. Rather than getting discouraged, I went back to what the data/feedback was telling me, adjusted to [second solution], and that one worked.",
        whyItWorks: "Shows iteration, adaptability, and resilience.",
        pitfallToAvoid: "Don't stubbornly stick to a failing approach."
      },
      {
        id: "q5_8",
        question: "8. How do you break a large, ambiguous problem into manageable steps?",
        sampleAnswer: "I start by writing out what I actually know versus what's still unclear, then turn the unclear parts into specific questions I can answer one at a time. That turns something overwhelming into a clear list of next steps.",
        whyItWorks: "Reduces anxiety through logical task framing.",
        pitfallToAvoid: "Avoid getting overwhelmed by the overall scope."
      },
      {
        id: "q5_9",
        question: "9. Describe a time you had to decide with incomplete information.",
        sampleAnswer: "On [project], I had to move forward on [decision] without all the information I'd have liked. I made the best call based on [what you did have], flagged my assumptions clearly, and stayed ready to adjust.",
        whyItWorks: "Shows comfort with ambiguity and risk awareness.",
        pitfallToAvoid: "Don't pretend you had complete information when you didn't."
      },
      {
        id: "q5_10",
        question: "10. Give an example of a creative solution you came up with for a tough problem.",
        sampleAnswer: "Instead of the obvious approach to [problem], I tried [unconventional approach], which came from [where the idea came from — noticing a pattern elsewhere, borrowing from another field]. It solved [problem] more efficiently than the standard method.",
        whyItWorks: "Demonstrates cross-domain lateral thinking.",
        pitfallToAvoid: "Don't overcomplicate solutions when simple ones work."
      },
      {
        id: "q5_11",
        question: "11. How do you check that a solution actually fixed the underlying problem, not just the symptom?",
        sampleAnswer: "I look at whether the original cause is actually gone, not just whether the immediate symptom disappeared — usually by testing the specific scenario that caused the problem, and monitoring for a while afterward.",
        whyItWorks: "Ensures long-term stability and root-cause verification.",
        pitfallToAvoid: "Don't declare victory immediately without post-fix monitoring."
      },
      {
        id: "q5_12",
        question: "12. Tell me about a time you had to think on your feet.",
        sampleAnswer: "During [situation], something unexpected came up with no time to plan. I quickly weighed the options I had and went with [decision], which resulted in [outcome].",
        whyItWorks: "Proves composure and rapid evaluation under pressure.",
        pitfallToAvoid: "Don't portray impulsive actions as thoughtful decisions."
      }
    ]
  },
  {
    id: "ch6",
    chapterNumber: 6,
    title: "Leadership & Teamwork",
    category: "Leadership & Teamwork",
    iconName: "HelpCircle",
    summary: "Highlight empathy, delegation, peer mentorship, and team empowerment regardless of formal title.",
    strategy: "Emphasize setting clear goals, unblocking team members, and building mutual trust.",
    questions: [
      {
        id: "q6_1",
        question: "1. Describe your leadership style.",
        sampleAnswer: "I'd describe it as [style, e.g., hands-on but not micromanaging] — I set clear expectations upfront, then trust people to do the work while staying available if they need support. On [project], that looked like [specific example].",
        whyItWorks: "Combines strategic goal setting with autonomous trust.",
        pitfallToAvoid: "Avoid sounding micromanaging or dictatorial."
      },
      {
        id: "q6_2",
        question: "2. Tell me about a time you led a team or project.",
        sampleAnswer: "I led [team/project], responsible for [scope]. I focused on [specific leadership action — setting priorities, unblocking people, communicating status], and we delivered [outcome].",
        whyItWorks: "Directly articulates leadership responsibilities and project outcomes.",
        pitfallToAvoid: "Don't take total credit for the team's entire output."
      },
      {
        id: "q6_3",
        question: "3. How do you motivate team members who seem disengaged or are struggling?",
        sampleAnswer: "I try to understand what's actually behind it first — workload, unclear expectations, something personal — rather than assuming. Once I know the cause, I can actually help, whether that's adjusting their tasks or checking in more.",
        whyItWorks: "Emphasizes root-cause empathy before taking action.",
        pitfallToAvoid: "Don't judge or publicly reprimand struggling peers."
      },
      {
        id: "q6_4",
        question: "4. Describe a time you gave constructive feedback to a peer or teammate.",
        sampleAnswer: "I noticed [teammate] was [specific issue], and I brought it up privately and specifically, focused on the behavior and its impact, not the person. They took it well, and [outcome/change].",
        whyItWorks: "Shows peer coaching, discretion, and actionable communication.",
        pitfallToAvoid: "Don't give vague feedback or attack character."
      },
      {
        id: "q6_5",
        question: "5. Tell me about a time you worked with a team full of very different personalities.",
        sampleAnswer: "On [project], the team included [description of different working styles]. I adjusted how I communicated with each person and made sure we had a shared process everyone could work within, which helped us deliver [outcome].",
        whyItWorks: "Demonstrates emotional intelligence and inclusive process design.",
        pitfallToAvoid: "Avoid complaining about different working styles."
      },
      {
        id: "q6_6",
        question: "6. How do you handle it when a team member isn't pulling their weight?",
        sampleAnswer: "I'd talk to them directly first — sometimes there's a reason I don't know about. If it's about motivation or clarity, I try to address that. If it continues, I'd involve a manager rather than let it quietly affect the rest of the team.",
        whyItWorks: "Balances direct communication with appropriate escalation paths.",
        pitfallToAvoid: "Don't suffer in silence or vent to other teammates."
      },
      {
        id: "q6_7",
        question: "7. Describe a time you stepped up and led without being formally asked.",
        sampleAnswer: "When [situation, e.g., our lead was out and a deadline was approaching], I stepped in to [specific action — coordinate the team, make a call]. It wasn't formally my role, but someone needed to, and it led to [outcome].",
        whyItWorks: "Proves informal leadership and operational initiative.",
        pitfallToAvoid: "Don't overstep or alienate designated leaders."
      },
      {
        id: "q6_8",
        question: "8. How do you build trust with a brand-new team?",
        sampleAnswer: "I focus on following through on small things early — being reliable, doing what I say I'll do — before trying to influence bigger decisions. I also ask more than I tell at first, to understand how the team already works.",
        whyItWorks: "Focuses on consistency and active listening over ego.",
        pitfallToAvoid: "Don't try to dictate changes on day one."
      },
      {
        id: "q6_9",
        question: "9. Tell me about a time you delegated tasks. How did you decide what to hand off?",
        sampleAnswer: "On [project], I delegated [task] to [person] because it matched their strengths and gave them a chance to grow, while I focused on [what you kept]. I checked in periodically rather than micromanaging.",
        whyItWorks: "Shows strategic delegation matched to growth opportunities.",
        pitfallToAvoid: "Don't dump undesirable tasks onto others without context."
      },
      {
        id: "q6_10",
        question: "10. Describe a time you supported a decision from leadership that you didn't fully agree with.",
        sampleAnswer: "I disagreed with [decision] initially, but once it was made, I committed to executing it well rather than undermining it, including [specific supportive action]. It turned out [outcome].",
        whyItWorks: "Proves organizational maturity and team alignment.",
        pitfallToAvoid: "Don't express ongoing cynicism to your peers."
      },
      {
        id: "q6_11",
        question: "11. How do you handle disagreements within a team about direction or approach?",
        sampleAnswer: "I try to get everyone's reasoning on the table before pushing for a decision, since disagreements are often about different assumptions rather than genuinely different goals. Once that's clear, it's easier to find a path most people can support.",
        whyItWorks: "Surfaces hidden assumptions to build authentic consensus.",
        pitfallToAvoid: "Don't force a vote without understanding underlying concerns."
      },
      {
        id: "q6_12",
        question: "12. Tell me about a time you helped a struggling teammate succeed.",
        sampleAnswer: "I noticed [teammate] was struggling with [specific task]. I offered to [specific help — pair with them, share resources, take something off their plate temporarily], and they were able to [outcome].",
        whyItWorks: "Demonstrates true team spirit and peer mentorship.",
        pitfallToAvoid: "Avoid taking all the credit for their turnaround."
      }
    ]
  },
  {
    id: "ch7",
    chapterNumber: 7,
    title: "Communication Skills",
    category: "Communication Skills",
    iconName: "CheckCircle",
    summary: "Articulate ideas clearly, tailor messaging for audiences, and active listen across channels.",
    strategy: "Lead with bottom-line takeaways, use relatable analogies for non-technical stakeholders, and confirm understanding.",
    questions: [
      {
        id: "q7_1",
        question: "1. Describe a time you had to explain something complicated to someone unfamiliar with it.",
        sampleAnswer: "I needed to explain [complex topic] to [audience, e.g., a client, a non-technical stakeholder]. I used [analogy or simplified framing] instead of jargon, and checked their understanding along the way.",
        whyItWorks: "Demonstrates user-centered communication and jargon reduction.",
        pitfallToAvoid: "Don't overwhelm non-technical listeners with dense technical terms."
      },
      {
        id: "q7_2",
        question: "2. How do you adjust your communication style for different audiences?",
        sampleAnswer: "With [technical audience], I get into specifics and data. With [non-technical or executive audience], I lead with the takeaway and only go into detail if they ask. I try to read the room rather than using one script for everyone.",
        whyItWorks: "Shows audience awareness and context switching.",
        pitfallToAvoid: "Don't give high-level summaries to deep technical reviewers."
      },
      {
        id: "q7_3",
        question: "3. Tell me about a time miscommunication caused a problem. How did you fix it?",
        sampleAnswer: "On [project], [person] and I had different understandings of [task], which led to [consequence]. Once we noticed, we got on a call to clarify exactly what was expected, and agreed to [preventive step] going forward.",
        whyItWorks: "Shows quick alignment, humility, and ongoing documentation.",
        pitfallToAvoid: "Don't place all the blame on the other party."
      },
      {
        id: "q7_4",
        question: "4. How do you make sure your message lands clearly, especially in writing?",
        sampleAnswer: "I lead with the main point instead of burying it, keep sentences short, and reread from the reader's perspective before sending — asking whether someone with less context would still understand it.",
        whyItWorks: "Highlights crisp, structured written communication.",
        pitfallToAvoid: "Avoid sending long, unstructured blocks of text."
      },
      {
        id: "q7_5",
        question: "5. Describe a time you had to deliver difficult or unwelcome news.",
        sampleAnswer: "I had to tell [person/team] that [difficult news]. I was direct about what happened and why, came with next steps already in mind, and gave them space to react before moving into problem-solving.",
        whyItWorks: "Direct, empathetic, and solution-oriented delivery.",
        pitfallToAvoid: "Don't delay or wrap bad news in confusing corporate speak."
      },
      {
        id: "q7_6",
        question: "6. How do you communicate with someone whose style is very different from yours?",
        sampleAnswer: "I try to match their pace and format — being more concise with someone who prefers brevity, or providing more context upfront for someone who likes detail — rather than expecting them to adapt to me.",
        whyItWorks: "Shows communication flexibility and interpersonal adaptability.",
        pitfallToAvoid: "Don't force everyone into your preferred format."
      },
      {
        id: "q7_7",
        question: "7. Tell me about a presentation or pitch you're proud of.",
        sampleAnswer: "I presented [topic] to [audience]. I focused on [key structural choice, e.g., leading with the result, then the reasoning], and it landed well — [specific outcome, like a decision made or positive feedback].",
        whyItWorks: "Highlights persuasive presentation structure and positive outcome.",
        pitfallToAvoid: "Don't focus only on slides; focus on audience impact."
      },
      {
        id: "q7_8",
        question: "8. How do you make sure you're actually listening, not just waiting to respond?",
        sampleAnswer: "I try to summarize back what I heard before responding, especially in disagreements. It slows things down slightly, but it means I'm responding to what was actually said, not what I assumed.",
        whyItWorks: "Demonstrates active listening and confirmation loops.",
        pitfallToAvoid: "Don't interrupt speakers before they finish."
      },
      {
        id: "q7_9",
        question: "9. Describe a time you explained a technical or complex idea to a non-technical audience.",
        sampleAnswer: "I explained [technical topic] to [audience] by focusing on what it meant for them practically, using [analogy], rather than walking through the mechanics. They were able to make [decision] based on it.",
        whyItWorks: "Focuses on business value and outcome over internal mechanics.",
        pitfallToAvoid: "Avoid getting lost in internal architectural details."
      },
      {
        id: "q7_10",
        question: "10. How do you handle communication in a remote or hybrid setting?",
        sampleAnswer: "I default to over-communicating in writing so nothing depends on catching someone live, and I use video calls for anything that needs real back-and-forth or could be misread over text.",
        whyItWorks: "Matches modern asynchronous and synchronous communication channels.",
        pitfallToAvoid: "Don't assume everyone knows what you're working on without updates."
      },
      {
        id: "q7_11",
        question: "11. Tell me about a time you had to change your communication approach mid-conversation.",
        sampleAnswer: "I started explaining [topic] one way, but noticed [person] wasn't following — [cue you picked up on]. I switched to [different approach, e.g., a concrete example instead of an abstract explanation], and that worked better.",
        whyItWorks: "Shows real-time social awareness and adaptability.",
        pitfallToAvoid: "Don't keep pushing a failing explanation style when someone is lost."
      },
      {
        id: "q7_12",
        question: "12. How do you deliver feedback in a way that actually lands well?",
        sampleAnswer: "I focus on specific behavior and impact rather than general judgments, give it privately and promptly rather than saving it up, and frame it around helping them succeed rather than just pointing out a flaw.",
        whyItWorks: "Framed around behavioral specifics and growth support.",
        pitfallToAvoid: "Never make personal attacks or save up complaints for months."
      }
    ]
  },
  {
    id: "ch8",
    chapterNumber: 8,
    title: "Conflict Resolution",
    category: "Conflict Resolution",
    iconName: "Compass",
    summary: "Resolve interpersonal and professional disagreements through objective data, empathy, and win-win solutions.",
    strategy: "Separate personalities from the problem; anchor discussions in shared business goals and objective data.",
    questions: [
      {
        id: "q8_1",
        question: "1. Tell me about a conflict you had with a coworker or classmate. How was it resolved?",
        sampleAnswer: "[Person] and I disagreed about [issue] on [project]. I asked to talk it through directly rather than let it linger, we each explained our reasoning, and landed on [resolution] that addressed both concerns.",
        whyItWorks: "Shows proactive, direct 1-on-1 resolution without drama.",
        pitfallToAvoid: "Don't let disagreements fester or gossip behind backs."
      },
      {
        id: "q8_2",
        question: "2. How do you handle disagreements with a manager or supervisor?",
        sampleAnswer: "I raise my perspective clearly and respectfully, usually with a specific reason or example behind it, but I also recognize they may have context I don't. If they still go a different way, I support it fully.",
        whyItWorks: "Respectful voice coupled with full operational execution.",
        pitfallToAvoid: "Avoid being combative or passive-aggressive."
      },
      {
        id: "q8_3",
        question: "3. Describe a time you mediated a conflict between two other people.",
        sampleAnswer: "[Two people] disagreed about [issue], and it was affecting [project/team]. I talked to each of them separately first, then brought them together to focus on the shared goal rather than who was right, and we landed on [resolution].",
        whyItWorks: "Neutral mediation focused on unifying shared goals.",
        pitfallToAvoid: "Don't take sides or play favorites."
      },
      {
        id: "q8_4",
        question: "4. What's your approach when someone gets emotional during a disagreement?",
        sampleAnswer: "I slow down and let them finish rather than trying to 'win' in the moment. Once things are calmer, I go back to the actual issue — usually the emotion fades once someone feels heard.",
        whyItWorks: "Demonstrates emotional regulation and active de-escalation.",
        pitfallToAvoid: "Don't match their emotional volume or tell them to 'calm down'."
      },
      {
        id: "q8_5",
        question: "5. Tell me about a time you had to compromise to resolve a conflict.",
        sampleAnswer: "On [issue], [person] and I wanted different things. We each gave a little — I agreed to [what you conceded], they agreed to [what they conceded] — and ended up with [outcome] that worked for both of us.",
        whyItWorks: "Highlights realistic win-win trade-offs.",
        pitfallToAvoid: "Don't view compromise as weakness."
      },
      {
        id: "q8_6",
        question: "6. How do you handle conflict when you're confident you're right but the other person won't budge?",
        sampleAnswer: "I try once more to present my reasoning clearly, then ask what would change their mind — sometimes that surfaces a concern I hadn't addressed. If we're truly stuck, I'll suggest a neutral third opinion rather than just repeating myself.",
        whyItWorks: "Breaks gridlock through inquiry and neutral escalation.",
        pitfallToAvoid: "Don't repeat the exact same argument louder."
      },
      {
        id: "q8_7",
        question: "7. Describe a conflict that wasn't resolved well. What would you do differently now?",
        sampleAnswer: "With [person], a disagreement about [issue] never really got resolved — we just avoided the topic. Looking back, I should have [what you'd do differently, e.g., addressed it directly earlier] instead of letting it sit unspoken.",
        whyItWorks: "Proves self-reflection and growth from past missteps.",
        pitfallToAvoid: "Don't pretend every past conflict ended in perfection."
      },
      {
        id: "q8_8",
        question: "8. How do you address tension before it escalates into a real conflict?",
        sampleAnswer: "I try to name it early and privately — something like, 'I've noticed some friction around X, can we talk about it?' — rather than waiting for it to boil over.",
        whyItWorks: "Proactive, early friction reduction.",
        pitfallToAvoid: "Don't ignore subtle signals until a crisis hits."
      },
      {
        id: "q8_9",
        question: "9. Tell me about a time you had to push back on a request diplomatically.",
        sampleAnswer: "[Person] asked for [request], but I had concerns about [reason]. I acknowledged their need, explained my concern with a specific reason, and offered [alternative]. They appreciated the honesty, and we went with [outcome].",
        whyItWorks: "Respectful boundary setting backed by alternative options.",
        pitfallToAvoid: "Don't give a flat 'no' without explaining constraints."
      },
      {
        id: "q8_10",
        question: "10. How do you rebuild a working relationship after a serious disagreement?",
        sampleAnswer: "I make a point to address the issue directly once things have cooled down, rather than pretending it didn't happen, and then focus on small, consistent follow-through afterward to rebuild trust.",
        whyItWorks: "Focuses on explicit reconciliation and ongoing consistency.",
        pitfallToAvoid: "Don't hold permanent grudges or avoid working together."
      },
      {
        id: "q8_11",
        question: "11. Describe a time you resolved a conflict without pulling in a manager or authority figure.",
        sampleAnswer: "[Person] and I had a disagreement about [issue]. We set up time to talk it through one-on-one, focused on the specific problem rather than personalities, and worked out [resolution] ourselves.",
        whyItWorks: "Shows independent conflict ownership and mature peer resolution.",
        pitfallToAvoid: "Don't run to management for minor peer disputes."
      }
    ]
  },
  {
    id: "ch9",
    chapterNumber: 9,
    title: "Time Management & Prioritization",
    category: "Time Management",
    iconName: "Compass",
    summary: "Manage competing deadlines, defend focused work, and align priorities with organizational goals.",
    strategy: "Categorize by urgency vs impact, communicate trade-offs early, and protect focused time blocks.",
    questions: [
      {
        id: "q9_1",
        question: "1. How do you prioritize when everything feels urgent?",
        sampleAnswer: "I look at actual deadlines and consequences rather than just who's asking loudest, and I check with my manager if two things genuinely can't both be done in time — better to surface that early than guess wrong silently.",
        whyItWorks: "Prioritizes based on business risk rather than emotional noise.",
        pitfallToAvoid: "Don't try to multitask everything simultaneously."
      },
      {
        id: "q9_2",
        question: "2. Tell me about a time you juggled multiple deadlines at once.",
        sampleAnswer: "I had [deadline 1] and [deadline 2] landing close together. I mapped out what each actually required, tackled the parts only I could do first, and delegated or streamlined the rest. Both were delivered on time.",
        whyItWorks: "Shows task breakdown, delegation, and execution velocity.",
        pitfallToAvoid: "Don't panic or drop deadlines silently."
      },
      {
        id: "q9_3",
        question: "3. Describe how you plan your day or week.",
        sampleAnswer: "I start the week by listing my key priorities, then block time for the most important or hardest tasks earlier in the day when I have the most focus, leaving smaller items for lower-energy periods.",
        whyItWorks: "Matches task complexity with natural energy cycles.",
        pitfallToAvoid: "Avoid working reactively out of your inbox all day."
      },
      {
        id: "q9_4",
        question: "4. How do you handle it when priorities shift without warning?",
        sampleAnswer: "I re-assess quickly rather than trying to force the old plan to still work — what's now most urgent, what can wait, and whether anyone needs to be told about the change.",
        whyItWorks: "Rapid mental reset without frustration.",
        pitfallToAvoid: "Don't complain about shifting priorities."
      },
      {
        id: "q9_5",
        question: "5. Tell me about a time you missed a deadline. What did you learn?",
        sampleAnswer: "I missed the deadline for [task] because [honest reason, e.g., underestimated the scope]. I communicated it as soon as I realized and delivered shortly after. Since then, I build in buffer time and flag risks earlier.",
        whyItWorks: "Shows responsibility, early notification, and buffer management.",
        pitfallToAvoid: "Don't hide or rationalize missed deadlines."
      },
      {
        id: "q9_6",
        question: "6. What tools or systems do you use to stay organized?",
        sampleAnswer: "I use [tool, e.g., a task manager, calendar blocking] to keep track of deadlines and priorities, and I do a quick review at the start and end of each day so nothing slips through unnoticed.",
        whyItWorks: "Proves systematic daily organization habits.",
        pitfallToAvoid: "Don't say you store everything in your head."
      },
      {
        id: "q9_7",
        question: "7. How do you decide what *not* to do when time is limited?",
        sampleAnswer: "I look at what will actually move the needle versus what just feels productive, and I'm willing to explicitly deprioritize or delay the lower-impact items rather than spreading myself thin across everything.",
        whyItWorks: "Understands trade-offs and high-leverage execution.",
        pitfallToAvoid: "Avoid doing low-value tasks just because they are quick."
      },
      {
        id: "q9_8",
        question: "8. Describe a time you had to say no to something because of time constraints.",
        sampleAnswer: "[Person] asked me to take on [task], but I was already committed to [priority]. I explained the trade-off honestly and suggested [alternative, like a later timeline or someone else], rather than saying yes and underdelivering on both.",
        whyItWorks: "Respectfully defends quality and delivery promises.",
        pitfallToAvoid: "Don't say yes to everything and drop deliverables."
      },
      {
        id: "q9_9",
        question: "9. How do you handle interruptions when you're deep in focused work?",
        sampleAnswer: "For anything non-urgent, I'll note it and address it once I hit a natural stopping point. For anything urgent, I switch immediately — but I try to protect blocks of uninterrupted time for the work that needs it most.",
        whyItWorks: "Protects deep focus while staying accessible for urgent needs.",
        pitfallToAvoid: "Don't context-switch on every ping immediately."
      },
      {
        id: "q9_10",
        question: "10. Tell me about a time strong time management made the difference in an outcome.",
        sampleAnswer: "On [project], breaking the work into a clear schedule early on meant we caught [potential delay] with enough time to fix it, instead of discovering it right before the deadline.",
        whyItWorks: "Proves schedule buffers prevent launch-day panics.",
        pitfallToAvoid: "Don't present scheduling as a rigid formality."
      },
      {
        id: "q9_11",
        question: "11. How do you balance long-term projects against day-to-day tasks?",
        sampleAnswer: "I protect specific time each week for the long-term project, even when it's not urgent yet, so it doesn't get permanently crowded out by whatever's loudest that day.",
        whyItWorks: "Prevents short-term firefighting from killing strategic goals.",
        pitfallToAvoid: "Don't neglect long-term deliverables until the day before deadline."
      }
    ]
  },
  {
    id: "ch10",
    chapterNumber: 10,
    title: "Project Experience",
    category: "Project Experience",
    iconName: "FileText",
    summary: "Articulate end-to-end project execution, resource constraints, cross-functional alignment, and key outcomes.",
    strategy: "Highlight end-to-end lifecycle: scope definition -> milestone delivery -> risk mitigation -> measurable results.",
    questions: [
      {
        id: "q10_1",
        question: "1. Tell me about a project you're most proud of.",
        sampleAnswer: "I'm proud of [project], where I [your role/contribution]. The biggest challenge was [challenge], and we overcame it by [action]. It resulted in [outcome], and I learned [lesson].",
        whyItWorks: "Showcases personal pride tied to overcome obstacles and measurable results.",
        pitfallToAvoid: "Don't pick a project where you played a passive minor role."
      },
      {
        id: "q10_2",
        question: "2. Walk me through a project from start to finish — your role and the outcome.",
        sampleAnswer: "The project was [goal]. I was responsible for [your role]. We started by [initial step], hit [challenge] partway through, adjusted by [action], and ultimately delivered [outcome].",
        whyItWorks: "Provides clean end-to-end operational clarity.",
        pitfallToAvoid: "Don't skip the middle execution phase or lessons learned."
      },
      {
        id: "q10_3",
        question: "3. Describe a project that didn't go as planned. What did you do?",
        sampleAnswer: "[Project] didn't go as expected because [what went wrong]. Once it was clear, I [corrective action], and we still managed to deliver [outcome], though it taught me [lesson] for next time.",
        whyItWorks: "Demonstrates adaptability, course correction, and retrospective learning.",
        pitfallToAvoid: "Don't pretend nothing ever goes wrong in projects."
      },
      {
        id: "q10_4",
        question: "4. Tell me about a project where you worked with people outside your immediate team or class group.",
        sampleAnswer: "On [project], I coordinated with [other team/department]. I made sure to [action, e.g., align on expectations early, adapt communication style], which helped us deliver [outcome] despite the different priorities each side had.",
        whyItWorks: "Highlights cross-departmental alignment and stakeholder navigation.",
        pitfallToAvoid: "Avoid criticizing other teams' priorities."
      },
      {
        id: "q10_5",
        question: "5. What's the most challenging project you've worked on, and why?",
        sampleAnswer: "[Project] was the most challenging because [reason — scope, ambiguity, stakes]. I managed it by [approach], and while it was tough, it resulted in [outcome] and taught me [lesson].",
        whyItWorks: "Shows comfort with high-stakes, ambiguous, or large-scale efforts.",
        pitfallToAvoid: "Don't make the challenge sound like a failure of planning."
      },
      {
        id: "q10_6",
        question: "6. Describe your specific role in a group project.",
        sampleAnswer: "In [group project], my role was [specific responsibility], while others handled [their parts]. I made sure to [how you contributed beyond your slice, e.g., kept us aligned on deadlines], which helped the group deliver [outcome].",
        whyItWorks: "Clarifies individual accountability within team environments.",
        pitfallToAvoid: "Don't use 'we' for everything without specifying 'I'."
      },
      {
        id: "q10_7",
        question: "7. Tell me about a time you had to deliver a project with limited resources or time.",
        sampleAnswer: "On [project], we had [constraint — less time, fewer people, limited budget]. I focused on [what you prioritized] and cut scope on [what you deprioritized], which let us still deliver [outcome] within the constraint.",
        whyItWorks: "Proves pragmatic scope management under tight constraints.",
        pitfallToAvoid: "Don't sacrifice core quality or security to rush scope."
      },
      {
        id: "q10_8",
        question: "8. How do you measure whether a project actually succeeded?",
        sampleAnswer: "I look at whether it achieved the original goal, not just whether it 'shipped' — for [project], that meant checking [specific measure, e.g., adoption, feedback, a metric] rather than just completion.",
        whyItWorks: "Focuses on long-term user/business adoption over mere shipping.",
        pitfallToAvoid: "Don't equate shipping code/deliverables with true success."
      },
      {
        id: "q10_9",
        question: "9. Describe a project where you had to learn a new skill or tool quickly.",
        sampleAnswer: "[Project] required [skill/tool] I hadn't used before. I learned it through [method], and was able to apply it well enough to deliver [outcome] on the original timeline.",
        whyItWorks: "Demonstrates high learning agility on live deliverables.",
        pitfallToAvoid: "Don't claim you became a world expert in 2 days."
      },
      {
        id: "q10_10",
        question: "10. Tell me about a time you had to rescue or take over a struggling project.",
        sampleAnswer: "[Project] was behind and losing momentum when I stepped in. I first figured out [root cause], then [corrective action], and we were able to turn it around and deliver [outcome].",
        whyItWorks: "Proves turnaround leadership and rapid diagnostic skill.",
        pitfallToAvoid: "Don't speak ill of the previous project owner."
      },
      {
        id: "q10_11",
        question: "11. What would you do differently if you could redo one of your past projects?",
        sampleAnswer: "On [project], I'd probably [specific change, e.g., get alignment from stakeholders earlier or test assumptions sooner]. It wouldn't have changed the outcome dramatically, but it would have saved [time/friction].",
        whyItWorks: "Shows reflective continuous improvement and post-mortem mindset.",
        pitfallToAvoid: "Don't pick a flaw that ruined the entire project outcome."
      }
    ]
  },
  {
    id: "ch11",
    chapterNumber: 11,
    title: "Strengths & Weaknesses",
    category: "Strengths & Weaknesses",
    iconName: "GraduationCap",
    summary: "Articulate authentic strengths with proof points and frame development areas with active remedies.",
    strategy: "Strengths: Name trait -> give metric/example. Weakness: Name genuine minor area -> explain active corrective habit.",
    questions: [
      {
        id: "q11_1",
        question: "1. What are your greatest strengths?",
        sampleAnswer: "My biggest strengths are [strength 1] and [strength 2]. For example, [brief evidence for strength 1], and on [project], [brief evidence for strength 2].",
        whyItWorks: "Anchored in concrete project evidence rather than empty self-praise.",
        pitfallToAvoid: "Don't list 10 generic buzzwords without proof."
      },
      {
        id: "q11_2",
        question: "2. What is your biggest weakness?",
        sampleAnswer: "I tend to [genuine, non-fatal weakness, e.g., want to double-check details more than is always necessary]. I've been working on it by [specific action, e.g., setting myself time limits for review], and it's improved noticeably.",
        whyItWorks: "Genuine self-awareness coupled with a structured, active remedy.",
        pitfallToAvoid: "Never use fake weaknesses like 'I work too hard'."
      },
      {
        id: "q11_3",
        question: "3. What do you think you most need to improve on?",
        sampleAnswer: "I want to get better at [specific skill], since [reason it matters for growth]. I'm working on it through [specific action — practice, training, feedback-seeking].",
        whyItWorks: "Growth-oriented focus tied to future career trajectory.",
        pitfallToAvoid: "Don't pick a core technical requirement of the role as your main gap."
      },
      {
        id: "q11_4",
        question: "4. How would your manager, professor, or teammates describe your strengths?",
        sampleAnswer: "I think they'd point to [strength], and probably mention [specific example, like a project or moment] as evidence.",
        whyItWorks: "Validates strengths through peer and managerial perception.",
        pitfallToAvoid: "Don't invent quotes that sound arrogantly fabricated."
      },
      {
        id: "q11_5",
        question: "5. What's a skill you've worked hard to build?",
        sampleAnswer: "I wasn't naturally strong at [skill] early on, but I built it up through [specific effort — practice, courses, mentorship], and now it's one of the things I rely on most in my work.",
        whyItWorks: "Highlights grit and deliberate practice over innate talent.",
        pitfallToAvoid: "Don't make it sound like you still struggle with it."
      },
      {
        id: "q11_6",
        question: "6. What part of your work do you find most difficult?",
        sampleAnswer: "[Specific task or aspect] is the part I find hardest, mainly because [honest reason]. I manage it by [coping strategy, e.g., blocking extra time for it or asking for a second pair of eyes].",
        whyItWorks: "Honest self-assessment backed by proactive mitigation strategies.",
        pitfallToAvoid: "Don't express dislike for core daily duties of this job."
      },
      {
        id: "q11_7",
        question: "7. How self-aware are you about your own blind spots?",
        sampleAnswer: "I try to actively look for them — for example, [specific example of seeking feedback or catching a blind spot yourself]. I don't think I catch everything, but I actively try.",
        whyItWorks: "Shows active feedback-seeking culture.",
        pitfallToAvoid: "Don't claim you have no blind spots."
      },
      {
        id: "q11_8",
        question: "8. What's a piece of feedback that genuinely surprised you?",
        sampleAnswer: "[Person] once told me [feedback], which surprised me because [why it was unexpected]. Once I reflected on it, I could see [specific instance] where it was true, and I've adjusted by [action].",
        whyItWorks: "Proves openness to surprising input and ability to self-correct.",
        pitfallToAvoid: "Don't get defensive when recounting the feedback."
      },
      {
        id: "q11_9",
        question: "9. What's something you're naturally good at without much effort?",
        sampleAnswer: "[Trait/skill] has always come naturally to me — for example, [brief evidence]. It's something I try not to take for granted, since not everyone finds it as easy.",
        whyItWorks: "Humble acknowledgement of natural aptitude.",
        pitfallToAvoid: "Avoid bragging or sounding dismissive of others' efforts."
      },
      {
        id: "q11_10",
        question: "10. Describe a weakness that used to hold you back, and how you've addressed it.",
        sampleAnswer: "Earlier in my [career/studies], I struggled with [weakness], which showed up as [specific consequence]. I addressed it by [specific action over time], and it's no longer something that holds me back the way it used to.",
        whyItWorks: "Demonstrates long-term character evolution and personal growth.",
        pitfallToAvoid: "Don't re-open a vulnerability that is still actively harming performance."
      }
    ]
  },
  {
    id: "ch12",
    chapterNumber: 12,
    title: "Achievements & Failures",
    category: "Achievements & Failures",
    iconName: "Award",
    summary: "Celebrate significant milestones while taking mature accountability for setbacks and lessons.",
    strategy: "Achievements: highlight difficulty & measurable outcome. Failures: own root cause & emphasize changed behavior.",
    questions: [
      {
        id: "q12_1",
        question: "1. What's your proudest achievement, academic or professional?",
        sampleAnswer: "I'm most proud of [achievement], where I [what you did]. It mattered to me because [why it stands out — difficulty, growth, impact], and it resulted in [outcome].",
        whyItWorks: "Highlights personal standard of excellence and measurable impact.",
        pitfallToAvoid: "Don't pick an achievement where you were just a bystander."
      },
      {
        id: "q12_2",
        question: "2. Tell me about a time you failed. What did you learn?",
        sampleAnswer: "I failed to [specific failure] on [project]. Looking back, the root cause was [honest reason]. I learned [specific lesson], and I've applied it since by [changed behavior].",
        whyItWorks: "Complete accountability with zero deflection, closing on behavioral change.",
        pitfallToAvoid: "Never blame external factors or teammates for your failure."
      },
      {
        id: "q12_3",
        question: "3. Describe an accomplishment you didn't get much credit for.",
        sampleAnswer: "On [project], I [specific contribution] that mostly went unnoticed, since the visible result was credited to [team/outcome as a whole]. I'm still proud of it because [why it mattered to you personally].",
        whyItWorks: "Shows quiet dedication, team-first mentality, and internal motivation.",
        pitfallToAvoid: "Don't sound bitter or resentful toward teammates or management."
      },
      {
        id: "q12_4",
        question: "4. What achievement best represents your work ethic?",
        sampleAnswer: "[Achievement] represents it well — it required [specific effort, e.g., persistence over a long timeline, going beyond what was asked], and I stuck with it because [reason].",
        whyItWorks: "Ties perseverance and stamina directly to concrete results.",
        pitfallToAvoid: "Don't confuse working late hours with true work ethic."
      },
      {
        id: "q12_5",
        question: "5. Tell me about a goal you set for yourself and achieved.",
        sampleAnswer: "I set a goal to [goal], because [reason]. I worked toward it by [specific actions over time], and achieved it by [outcome/timeframe].",
        whyItWorks: "Demonstrates self-directed goal setting and systematic execution.",
        pitfallToAvoid: "Don't pick a trivial or easy goal."
      },
      {
        id: "q12_6",
        question: "6. Describe a time you didn't meet your own expectations.",
        sampleAnswer: "On [project], I expected to [expectation], but fell short because [honest reason]. I was disappointed, but I used it to [what you changed or learned], which has helped since.",
        whyItWorks: "Reflects high personal standards and self-correcting mechanisms.",
        pitfallToAvoid: "Don't lower your standards to make yourself look successful."
      },
      {
        id: "q12_7",
        question: "7. What accomplishment required the most personal growth to reach?",
        sampleAnswer: "[Achievement] required me to grow the most, because it meant [specific growth, e.g., getting comfortable with public speaking, learning to delegate]. It wasn't natural for me at first, but I pushed through by [action].",
        whyItWorks: "Highlights overcoming discomfort to achieve meaningful results.",
        pitfallToAvoid: "Don't understate the personal discomfort it took."
      },
      {
        id: "q12_8",
        question: "8. Tell me about a failure that changed how you approach your work now.",
        sampleAnswer: "After [failure], I realized I needed to [specific change, e.g., get feedback earlier in a project instead of at the end]. I've built that into how I work since, and it's prevented similar issues.",
        whyItWorks: "Direct link between past setback and present operational excellence.",
        pitfallToAvoid: "Avoid choosing a failure that indicates repeated carelessness."
      },
      {
        id: "q12_9",
        question: "9. Describe an achievement that might not sound impressive but means a lot to you.",
        sampleAnswer: "[Small-sounding achievement] doesn't sound like much on paper, but it meant a lot because [personal reason — it was hard for you specifically, or it helped someone].",
        whyItWorks: "Shows character, humility, and intrinsic personal values.",
        pitfallToAvoid: "Don't dismiss the value of small, steady wins."
      },
      {
        id: "q12_10",
        question: "10. Tell me about a time you bounced back from a real setback.",
        sampleAnswer: "After [setback], I took time to understand what went wrong, then rebuilt by [specific action]. It took [timeframe], but I came out of it with [outcome/lesson].",
        whyItWorks: "Demonstrates true resilience and grit under adversity.",
        pitfallToAvoid: "Don't focus on the emotional hardship; focus on the rebound."
      }
    ]
  },
  {
    id: "ch13",
    chapterNumber: 13,
    title: "Decision-Making Frameworks",
    category: "Decision-Making",
    iconName: "Compass",
    summary: "Navigate tough choices, evaluate risk trade-offs, and maintain decision velocity under pressure.",
    strategy: "Balance data vs speed: identify reversible vs irreversible decisions, weigh downsides, and communicate reasoning.",
    questions: [
      {
        id: "q13_1",
        question: "1. Tell me about a difficult decision you had to make.",
        sampleAnswer: "I had to decide between [option A] and [option B] on [situation]. I weighed [key factors], ultimately chose [decision], and it led to [outcome].",
        whyItWorks: "Clear evaluation of trade-offs leading to decisive execution.",
        pitfallToAvoid: "Don't make the decision sound like a coin toss."
      },
      {
        id: "q13_2",
        question: "2. How do you approach decisions when there's no clearly right answer?",
        sampleAnswer: "I focus on which option is more reversible or lower-risk if it turns out wrong, and I make sure I'm deciding based on the actual priorities at stake rather than just personal preference.",
        whyItWorks: "Uses reversible vs irreversible (Type 1 vs Type 2) decision logic.",
        pitfallToAvoid: "Don't stall endlessly trying to find a non-existent perfect option."
      },
      {
        id: "q13_3",
        question: "3. Describe a time you had to decide something quickly, under pressure.",
        sampleAnswer: "During [situation], I had to decide [decision] with very little time. I quickly weighed [the key factor that mattered most] and went with [decision], which worked out because [outcome].",
        whyItWorks: "Highlights high decision velocity under high pressure.",
        pitfallToAvoid: "Don't sound reckless or haphazard."
      },
      {
        id: "q13_4",
        question: "4. How do you decide when to ask for help versus figuring it out yourself?",
        sampleAnswer: "If it's something with real stakes or time pressure and someone nearby has relevant experience, I'll ask. If it's lower-risk or something I can learn from trying, I'll usually attempt it myself first.",
        whyItWorks: "Balances self-reliance with strategic leverage of team wisdom.",
        pitfallToAvoid: "Don't struggle in isolation for days without raising a hand."
      },
      {
        id: "q13_5",
        question: "5. Tell me about a decision you later regretted. What did you learn?",
        sampleAnswer: "I decided to [decision] on [situation], which in hindsight wasn't the right call because [reason]. I learned [lesson], and now I [changed approach] before similar decisions.",
        whyItWorks: "Shows courage to admit wrong calls and update mental models.",
        pitfallToAvoid: "Don't blame faulty data or bad luck entirely."
      },
      {
        id: "q13_6",
        question: "6. How do you balance data and facts against gut instinct when deciding?",
        sampleAnswer: "I lead with data when it's available and reliable, but I use instinct as a signal to dig deeper rather than ignore it — if something feels off despite the numbers, I usually look for what the data might be missing.",
        whyItWorks: "Uses intuition as a diagnostic trigger while grounding decisions in data.",
        pitfallToAvoid: "Don't override hard facts with pure unverified emotion."
      },
      {
        id: "q13_7",
        question: "7. Describe a decision you made that affected other people. How did you handle that weight?",
        sampleAnswer: "I had to decide [decision], which affected [who it impacted]. I made sure to [how you handled the responsibility, e.g., gathered their input first, communicated clearly afterward], since I didn't want to make that call carelessly.",
        whyItWorks: "Shows empathy and sense of responsibility for impact on others.",
        pitfallToAvoid: "Avoid making decisions in an ivory tower without consulting affected parties."
      },
      {
        id: "q13_8",
        question: "8. Tell me about a time you made a call without sign-off from a manager or professor.",
        sampleAnswer: "[Situation] required a decision faster than I could get approval. I made the call based on [reasoning], informed [person] as soon as I could afterward, and it turned out [outcome].",
        whyItWorks: "Proves calculated risk-taking and operational autonomy.",
        pitfallToAvoid: "Don't bypass approval on irreversible, high-risk items."
      },
      {
        id: "q13_9",
        question: "9. How do you handle making a decision when your team disagrees with you?",
        sampleAnswer: "I make sure I've actually heard their concerns and haven't missed something. If I still believe my call is right after that, I'll go with it and explain my reasoning clearly, while staying open to revisiting it.",
        whyItWorks: "Balances active listening with decisive leadership posture.",
        pitfallToAvoid: "Don't ignore team concerns or force obedience arbitrarily."
      },
      {
        id: "q13_10",
        question: "10. What's your process for high-stakes decisions?",
        sampleAnswer: "I slow down, gather the most relevant information I can in the time available, talk it through with someone I trust, and think through the downside of each option — not just the upside — before deciding.",
        whyItWorks: "Methodical risk assessment for irreversible choices.",
        pitfallToAvoid: "Don't treat high-stakes decisions with casual carelessness."
      }
    ]
  },
  {
    id: "ch14",
    chapterNumber: 14,
    title: "Customer & Client Handling",
    category: "Customer & Client Handling",
    iconName: "User",
    summary: "De-escalate unhappy clients, set realistic expectations, and build lasting professional trust.",
    strategy: "Listen actively -> validate concerns -> propose concrete remediations -> follow up relentlessly.",
    questions: [
      {
        id: "q14_1",
        question: "1. Tell me about a time you dealt with an upset or difficult customer or client.",
        sampleAnswer: "[Client] was upset about [issue]. I let them fully explain their frustration first, acknowledged the specific problem, and proposed [concrete fix]. They calmed down once they felt heard and the issue was addressed.",
        whyItWorks: "Active de-escalation by validating feelings before pitching solutions.",
        pitfallToAvoid: "Don't interrupt or argue with an angry client."
      },
      {
        id: "q14_2",
        question: "2. How do you handle a client with unrealistic expectations?",
        sampleAnswer: "I'd explain clearly and specifically why the expectation isn't feasible, and offer the closest realistic alternative, rather than either overpromising or just saying no without options.",
        whyItWorks: "Replaces empty 'no's with transparent, feasible trade-offs.",
        pitfallToAvoid: "Never overpromise features or timelines you cannot deliver."
      },
      {
        id: "q14_3",
        question: "3. Describe a time you turned an unhappy customer into a satisfied one.",
        sampleAnswer: "[Client] was unhappy about [issue]. I owned the problem, fixed [specific action], and followed up afterward to confirm they were satisfied. They ended up [positive outcome, e.g., becoming a repeat client].",
        whyItWorks: "Shows ownership turning service failure into customer loyalty.",
        pitfallToAvoid: "Don't pass the blame to internal engineering or vendor teams."
      },
      {
        id: "q14_4",
        question: "4. How do you say no to a client request without damaging the relationship?",
        sampleAnswer: "I explain the reason clearly rather than just refusing, and offer an alternative that addresses their underlying need if possible — so it feels like a trade-off, not a dead end.",
        whyItWorks: "Focuses on underlying user intent rather than literal feature friction.",
        pitfallToAvoid: "Don't use blunt policy language without context."
      },
      {
        id: "q14_5",
        question: "5. Tell me about a time you went above and beyond for a customer or client.",
        sampleAnswer: "For [client], I noticed [need beyond the original request] and took care of it anyway, even though it wasn't strictly required. They appreciated it, and it strengthened the relationship going forward.",
        whyItWorks: "Proves proactive client care and relationship building.",
        pitfallToAvoid: "Don't break internal company rules or burn out team resources."
      },
      {
        id: "q14_6",
        question: "6. How do you handle it when a client's request conflicts with company policy?",
        sampleAnswer: "I explain the policy and the reason behind it honestly, and look for the closest thing I actually can offer within it, rather than just citing the policy and leaving them stuck.",
        whyItWorks: "Transparently explains rationale behind rules while seeking solutions.",
        pitfallToAvoid: "Don't act like a unhelpful bureaucrat."
      },
      {
        id: "q14_7",
        question: "7. Describe a time you managed a client relationship through a mistake or setback.",
        sampleAnswer: "After [mistake] affected [client], I told them directly rather than waiting for them to notice, explained the fix, and followed through on it. Being upfront actually strengthened their trust rather than damaging it.",
        whyItWorks: "Demonstrates integrity, transparency, and proactive fix execution.",
        pitfallToAvoid: "Never attempt to cover up client-facing errors."
      },
      {
        id: "q14_8",
        question: "8. How do you build trust with a new client quickly?",
        sampleAnswer: "I focus on clear communication and following through on small commitments early, so they see reliability quickly, rather than trying to impress them with big promises upfront.",
        whyItWorks: "Under-promises and over-delivers early on.",
        pitfallToAvoid: "Don't make grandiose claims you can't back up."
      },
      {
        id: "q14_9",
        question: "9. Tell me about a time you had to deliver disappointing news to a client.",
        sampleAnswer: "I had to tell [client] that [disappointing news]. I was direct about it, explained why, and came with [alternative or next step] already prepared, so the conversation moved toward solutions quickly.",
        whyItWorks: "Delivers direct news paired with immediate solution paths.",
        pitfallToAvoid: "Don't delay delivering time-sensitive bad news."
      },
      {
        id: "q14_10",
        question: "10. How do you handle several client demands landing at once?",
        sampleAnswer: "I quickly assess urgency and impact for each, communicate realistic timelines to everyone involved, and tackle the most time-sensitive or highest-impact one first — rather than letting all of them slip a little.",
        whyItWorks: "Maintains clear expectation setting across multiple clients.",
        pitfallToAvoid: "Don't silently let multiple client deadlines slip."
      }
    ]
  },
  {
    id: "ch15",
    chapterNumber: 15,
    title: "Adaptability & Learning Agility",
    category: "Adaptability & Learning",
    iconName: "GraduationCap",
    summary: "Thrive amidst shifts, unlearn outdated habits, and continuously acquire new domain capabilities.",
    strategy: "Embrace change as opportunity: anchor in baseline fundamentals -> learn by doing -> iterate fast.",
    questions: [
      {
        id: "q15_1",
        question: "1. Tell me about a time you adapted to a major change at work or school.",
        sampleAnswer: "When [change] happened, I adjusted by [specific action], even though it meant [what you had to give up or relearn]. Within [timeframe], I was fully up to speed.",
        whyItWorks: "Shows rapid mental flexibility and smooth transition velocity.",
        pitfallToAvoid: "Don't focus on how uncomfortable or unfair the change was."
      },
      {
        id: "q15_2",
        question: "2. How do you approach learning something completely new?",
        sampleAnswer: "I start with the fundamentals rather than jumping to advanced material, and I try to apply it on a small real task quickly, since I learn faster by doing than by just reading.",
        whyItWorks: "Combines foundational understanding with rapid hands-on execution.",
        pitfallToAvoid: "Don't get stuck reading theory forever without building anything."
      },
      {
        id: "q15_3",
        question: "3. Describe a time your role or responsibilities changed unexpectedly.",
        sampleAnswer: "My responsibilities shifted when [what happened], and I suddenly needed to [new responsibility]. I adapted by [specific action], and was contributing effectively within [timeframe].",
        whyItWorks: "Demonstrates resilience and versatility in evolving organizations.",
        pitfallToAvoid: "Avoid expressing resentment over unexpected role shifts."
      },
      {
        id: "q15_4",
        question: "4. How do you handle ambiguity when expectations aren't clearly defined?",
        sampleAnswer: "I make my best reasonable interpretation, move forward on it, and check in early rather than waiting until the end to find out if I got it right.",
        whyItWorks: "Shows bias for action coupled with early feedback loops.",
        pitfallToAvoid: "Don't wait passively for someone to give you step-by-step instructions."
      },
      {
        id: "q15_5",
        question: "5. Tell me about a time you had to unlearn an old habit or approach.",
        sampleAnswer: "I was used to [old habit], but [new context] required [different approach]. It took deliberate effort to change, mainly through [specific action, e.g., practice, reminders, feedback], but it eventually became natural.",
        whyItWorks: "Highlights cognitive flexibility and willingness to shed outdated mental models.",
        pitfallToAvoid: "Don't stubbornly defend obsolete habits."
      },
      {
        id: "q15_6",
        question: "6. How do you keep your skills relevant as your field changes?",
        sampleAnswer: "I follow [specific sources/communities], and I try to actually practice new skills through small projects rather than just staying aware of trends passively.",
        whyItWorks: "Active, continuous skill maintenance.",
        pitfallToAvoid: "Don't rely solely on what your employer teaches you."
      },
      {
        id: "q15_7",
        question: "7. Describe a time you had to adjust quickly to a new team, manager, or environment.",
        sampleAnswer: "When I joined [new team/environment], I focused early on understanding how things already worked before trying to change anything, which helped me adapt faster and build credibility.",
        whyItWorks: "Respects existing team culture while integrating quickly.",
        pitfallToAvoid: "Don't criticize existing workflows before understanding why they exist."
      },
      {
        id: "q15_8",
        question: "8. What's the biggest change you've had to adapt to recently?",
        sampleAnswer: "[Recent change] required me to [what you had to adjust]. I handled it by [specific action], and it's actually made me [positive outcome, e.g., more flexible, better at X].",
        whyItWorks: "Frames recent organizational or technical shifts as positive growth catalysts.",
        pitfallToAvoid: "Avoid sounding burnt out by recent changes."
      },
      {
        id: "q15_9",
        question: "9. How do you respond when a plan you were counting on falls apart?",
        sampleAnswer: "I take a moment to reassess rather than panicking, figure out what's still salvageable, and build a revised plan from there — usually informing anyone affected as soon as I have a new direction.",
        whyItWorks: "Shows composure, rapid reassessment, and transparent communication.",
        pitfallToAvoid: "Don't dwell on what could have been; pivot to Plan B."
      },
      {
        id: "q15_10",
        question: "10. Tell me about a time you sought out learning entirely on your own initiative.",
        sampleAnswer: "I noticed I needed [skill] that wasn't part of my formal training, so I [specific self-directed action — took a course, built a project, found a mentor] on my own time, and applied it to [outcome].",
        whyItWorks: "Proves intrinsic curiosity and self-driven skill development.",
        pitfallToAvoid: "Don't wait for your boss to assign learning modules."
      }
    ]
  },
  {
    id: "ch16",
    chapterNumber: 16,
    title: "Company & Role Alignment",
    category: "Company & Role-Specific",
    iconName: "Target",
    summary: "Demonstrate deep company research, mission alignment, and immediate 90-day value creation.",
    strategy: "Anchor in specifics: company mission/product -> specific role responsibilities -> your unique value fit.",
    questions: [
      {
        id: "q16_1",
        question: "1. Why do you want to work here?",
        sampleAnswer: "I'm drawn to [company] because of [specific reason — mission, product, culture, growth], and this role specifically lets me apply my background in [skill] toward [specific thing the company does].",
        whyItWorks: "Demonstrates genuine research and direct skill-to-mission match.",
        pitfallToAvoid: "Never give generic answers that could apply to any company."
      },
      {
        id: "q16_2",
        question: "2. What do you know about our company?",
        sampleAnswer: "I know [company] focuses on [core business/mission], and recently [specific recent development, e.g., a launch, expansion, or initiative]. That's part of what makes this role interesting to me.",
        whyItWorks: "Proves you did thorough homework beyond reading the homepage hero text.",
        pitfallToAvoid: "Don't just recite basic marketing slogans."
      },
      {
        id: "q16_3",
        question: "3. Why are you interested in this particular role?",
        sampleAnswer: "This role combines [aspect 1] and [aspect 2], which lines up with both what I'm good at and what I want to keep growing in — especially [specific responsibility from the job description].",
        whyItWorks: "Directly maps job description requirements to personal strengths and goals.",
        pitfallToAvoid: "Avoid making it sound like a temporary stepping stone."
      },
      {
        id: "q16_4",
        question: "4. What can you bring to this team that others might not?",
        sampleAnswer: "My combination of [skill/experience 1] and [skill/experience 2] is fairly specific — for example, [brief evidence]. That combination could help with [specific team need].",
        whyItWorks: "Highlights unique intersection of skills tailored to current team gaps.",
        pitfallToAvoid: "Don't claim superiority over other candidates."
      },
      {
        id: "q16_5",
        question: "5. How does this role fit into your career path?",
        sampleAnswer: "It's a natural next step from [current/previous experience], and it moves me toward [longer-term goal] while letting me build [specific skill] along the way.",
        whyItWorks: "Shows logical career progression and long-term commitment.",
        pitfallToAvoid: "Don't suggest you will leave in 6 months."
      },
      {
        id: "q16_6",
        question: "6. What excites you most about this industry?",
        sampleAnswer: "I'm especially excited about [specific trend or aspect of the industry], because [reason it matters to you].",
        whyItWorks: "Shows industry-level commercial awareness and genuine enthusiasm.",
        pitfallToAvoid: "Avoid expressing indifference toward the industry."
      },
      {
        id: "q16_7",
        question: "7. What do you think are the biggest challenges facing our company or industry right now?",
        sampleAnswer: "From what I've seen, [specific challenge, based on your research] is a major one, largely because [reason]. It's actually part of why this role interests me.",
        whyItWorks: "Demonstrates strategic commercial insight and problem-solving readiness.",
        pitfallToAvoid: "Don't criticize company leadership disrespectfully."
      },
      {
        id: "q16_8",
        question: "8. Why are you leaving your current job, or moving from school into this field?",
        sampleAnswer: "I've learned a lot at [current role/school], but I'm looking for [what you want next — more scope, a new challenge, a specific specialization], which is what drew me to this opportunity.",
        whyItWorks: "Focuses on running toward a new growth opportunity rather than running away.",
        pitfallToAvoid: "Never trash-talk your current employer, boss, or school."
      },
      {
        id: "q16_9",
        question: "9. What do you know about our products, services, or mission?",
        sampleAnswer: "[Company] provides [product/service] for [audience], with a focus on [mission/value]. I've used/researched [specific example], which gave me a good sense of how it fits together.",
        whyItWorks: "Proves hands-on familiarity with the company's core offerings.",
        pitfallToAvoid: "Don't guess what the product does if you haven't checked."
      },
      {
        id: "q16_10",
        question: "10. How does this role align with your skills and interests?",
        sampleAnswer: "My strongest skills are in [skill 1] and [skill 2], and this role's focus on [specific responsibility] plays directly to both, while connecting to my interest in [related interest].",
        whyItWorks: "Clean 1-to-1 match between skills and job responsibilities.",
        pitfallToAvoid: "Avoid highlighting unaligned interests."
      },
      {
        id: "q16_11",
        question: "11. What would you want to accomplish in your first 90 days here?",
        sampleAnswer: "I'd want to spend the first few weeks really understanding [team/systems/context], then start contributing on [specific early win], and by the 90-day mark have a clear sense of where I can add the most value long-term.",
        whyItWorks: "Structured 30-60-90 day value curve: Learn -> Contribute -> Scale.",
        pitfallToAvoid: "Don't promise to re-architect everything on week one."
      }
    ]
  },
  {
    id: "ch17",
    chapterNumber: 17,
    title: "Career Goals & Vision",
    category: "Career Goals",
    iconName: "Target",
    summary: "Articulate realistic 3-to-5 year growth trajectories and professional ambition.",
    strategy: "Balance ambition with realism: focus on skill mastery and business impact over title chasing.",
    questions: [
      {
        id: "q17_1",
        question: "1. Where do you see yourself in five years?",
        sampleAnswer: "I'd like to have grown into [specific direction — deeper expertise, more responsibility, a leadership track] in [field], building on the foundation I'd start here.",
        whyItWorks: "Shows commitment to growing within the domain and company.",
        pitfallToAvoid: "Don't say 'I want your job' or 'I want to start my own company'."
      },
      {
        id: "q17_2",
        question: "2. What are your short-term and long-term career goals?",
        sampleAnswer: "Short-term, I want to [specific near-term goal, e.g., deepen my skills in X]. Longer-term, I'm aiming toward [broader goal, e.g., a leadership role, deep specialization].",
        whyItWorks: "Clear distinction between immediate execution and future ambition.",
        pitfallToAvoid: "Don't set unrealistic short-term expectations."
      },
      {
        id: "q17_3",
        question: "3. What does career success look like to you?",
        sampleAnswer: "For me, it's [personal definition — doing meaningful work, growing skills, having impact, work-life balance], more than a specific title. [Brief supporting example].",
        whyItWorks: "Anchors success in intrinsic values and impact.",
        pitfallToAvoid: "Avoid defining success purely by salary or title."
      },
      {
        id: "q17_4",
        question: "4. How does this role fit into your longer-term plans?",
        sampleAnswer: "It's a strong step toward [longer-term goal], since it lets me build [specific skill/experience] that I'll need to get there.",
        whyItWorks: "Validates mutual alignment between candidate growth and role needs.",
        pitfallToAvoid: "Don't make the role sound like an unwanted pitstop."
      },
      {
        id: "q17_5",
        question: "5. What skills are you hoping to build over the next few years?",
        sampleAnswer: "I want to build [skill 1] and [skill 2], since they'll help me move toward [goal]. This role's focus on [related responsibility] would help with that directly.",
        whyItWorks: "Concrete learning agenda aligned with job responsibilities.",
        pitfallToAvoid: "Don't list skills that have no connection to this role."
      },
      {
        id: "q17_6",
        question: "6. What kind of work environment brings out your best work?",
        sampleAnswer: "I do my best work in an environment that's [description, e.g., collaborative but with room for independent ownership], with [specific factor, e.g., clear priorities, regular feedback].",
        whyItWorks: "Articulates working environment preferences clearly.",
        pitfallToAvoid: "Don't describe an environment opposite to the target company."
      },
      {
        id: "q17_7",
        question: "7. What comes next for you after you hit your current goals?",
        sampleAnswer: "Once I've [current goal], I'd want to move toward [next goal], likely building on [skill] I'll have developed by then.",
        whyItWorks: "Proves continuous ambition and forward momentum.",
        pitfallToAvoid: "Avoid sounding complacent once initial milestones are met."
      },
      {
        id: "q17_8",
        question: "8. How do you plan to grow professionally in this role?",
        sampleAnswer: "I plan to focus first on mastering [core responsibility], then look for opportunities to take on [stretch responsibility] as I get more comfortable.",
        whyItWorks: "Methodical crawl-walk-run approach to role expansion.",
        pitfallToAvoid: "Don't ask for stretch assignments before mastering core duties."
      },
      {
        id: "q17_9",
        question: "9. What would need to be true a year from now for this to feel like the right move?",
        sampleAnswer: "I'd want to have made real progress on [specific skill/goal], feel like I'm contributing meaningfully to [team/company goal], and feel like the environment supports how I like to work.",
        whyItWorks: "Evaluates success through mutual impact, growth, and team culture.",
        pitfallToAvoid: "Don't make it entirely about what the company does for you."
      },
      {
        id: "q17_10",
        question: "10. Are you drawn more toward going deep as a specialist, or toward growing into leadership?",
        sampleAnswer: "Right now I'm most drawn to [honest answer], mainly because [reason]. That said, I'm keeping both paths open depending on how things develop.",
        whyItWorks: "Honest trajectory clarity with open-minded flexibility.",
        pitfallToAvoid: "Don't claim to want leadership if you dislike managing people."
      }
    ]
  },
  {
    id: "ch18",
    chapterNumber: 18,
    title: "Salary & Negotiation",
    category: "Salary & Negotiation",
    iconName: "Award",
    summary: "Navigate salary expectations with benchmarked research, professionalism, and total compensation focus.",
    strategy: "Anchor on market research for your domain/location and evaluate total compensation package.",
    questions: [
      {
        id: "q18_1",
        question: "1. What are your salary expectations for this role?",
        sampleAnswer: "Based on my research into this role and the market for [industry/location], I'm looking at a range of [$X–$Y], though I'm flexible depending on the full compensation package.",
        whyItWorks: "Anchors on market data while maintaining professional flexibility.",
        pitfallToAvoid: "Don't give a single rigid number without market research."
      },
      {
        id: "q18_2",
        question: "2. Can you share your current or most recent compensation?",
        sampleAnswer: "I'd rather focus on the value I'd bring to this role and what's fair for the position itself, but I'm happy to discuss a target range based on my research.",
        whyItWorks: "Politely redirects focus to market rate for the target position.",
        pitfallToAvoid: "Don't get defensive or share underpaid historical numbers unnecessarily."
      },
      {
        id: "q18_3",
        question: "3. Is compensation the most important factor in this decision for you right now?",
        sampleAnswer: "It matters, but it's not the only factor — I'm also weighing [growth opportunity, team, mission, work style]. I want the full package to make sense, not just the number.",
        whyItWorks: "Evaluates total holistic job offer quality.",
        pitfallToAvoid: "Don't say money is the only thing that matters."
      },
      {
        id: "q18_4",
        question: "4. If we extended an offer, what would it take for you to say yes?",
        sampleAnswer: "A compensation package in line with [range/market rate], along with [1-2 other factors that matter to you, e.g., growth opportunity, team fit] — I'm optimistic we can find something that works for both sides.",
        whyItWorks: "Clear closing criteria that show high genuine intent to join.",
        pitfallToAvoid: "Don't move goalposts later if they meet your requested criteria."
      },
      {
        id: "q18_5",
        question: "5. How flexible are you on base salary versus other benefits?",
        sampleAnswer: "I have some flexibility on base if the overall package — [bonus, equity, benefits, growth path] — makes up for it in a meaningful way.",
        whyItWorks: "Demonstrates willingness to look at total compensation.",
        pitfallToAvoid: "Don't accept low base if total package lacks upside."
      },
      {
        id: "q18_6",
        question: "6. Besides salary, what other benefits matter most to you?",
        sampleAnswer: "[Specific benefits, e.g., growth opportunities, flexibility, health benefits, learning budget] matter a lot to me, sometimes as much as base salary itself.",
        whyItWorks: "Highlights non-monetary value drivers that demonstrate long-term orientation.",
        pitfallToAvoid: "Don't list superficial perks as dealbreakers."
      },
      {
        id: "q18_7",
        question: "7. Are you interviewing elsewhere, and how does the pay compare?",
        sampleAnswer: "I am exploring a couple of other opportunities, and the ranges are broadly similar to what I mentioned — I'm evaluating the whole picture, not just compensation, across all of them.",
        whyItWorks: "Establishes competitive market demand without sounding arrogant.",
        pitfallToAvoid: "Don't bluff about non-existent competing offers."
      },
      {
        id: "q18_8",
        question: "8. Would you consider a lower base salary for stronger bonus or equity upside?",
        sampleAnswer: "I'd consider it, depending on how realistic the upside is and the overall risk — I'd want to understand [specific detail, e.g., vesting schedule, historical payout] before deciding.",
        whyItWorks: "Pragmatic assessment of variable pay mechanics.",
        pitfallToAvoid: "Don't accept unvalidated variable bonuses blindly."
      },
      {
        id: "q18_9",
        question: "9. What does your ideal total compensation package look like?",
        sampleAnswer: "Ideally it includes a base around [$X], plus [bonus/equity/benefits], though I'm open to discussing the right mix based on what's standard for this role.",
        whyItWorks: "Provides clear baseline target while remaining open to negotiation.",
        pitfallToAvoid: "Don't demand compensation far above market cap without justification."
      },
      {
        id: "q18_10",
        question: "10. How do you feel about performance-based or commission-based pay?",
        sampleAnswer: "I'm comfortable with it, especially if the targets are clear and achievable — it can be a good way to be rewarded directly for the impact I have.",
        whyItWorks: "Shows confidence in personal output and impact.",
        pitfallToAvoid: "Avoid expressing fear of performance-based metrics."
      }
    ]
  },
  {
    id: "ch19",
    chapterNumber: 19,
    title: "Questions to Ask the Interviewer",
    category: "Reverse Interview",
    iconName: "HelpCircle",
    summary: "Turn the tables to evaluate culture, team dynamics, success metrics, and trajectory.",
    strategy: "Ask strategic questions that demonstrate high interest, business acumen, and proactive alignment.",
    questions: [
      {
        id: "q19_1",
        question: "1. What does success look like in this role after the first 6–12 months?",
        sampleAnswer: "[Question to ask interviewer]: 'What core metrics or milestones would tell you that you made the right hire 12 months from now?'",
        whyItWorks: "Shows immediate focus on deliverables and accountability.",
        pitfallToAvoid: "Don't ask basic questions answered on the homepage."
      },
      {
        id: "q19_2",
        question: "2. Can you tell me about the team I'd be working with?",
        sampleAnswer: "[Question to ask interviewer]: 'How is the team structured, and how do people usually collaborate on daily priorities?'",
        whyItWorks: "Helps you understand day-to-day team dynamics and collaboration structure.",
        pitfallToAvoid: "Don't sound skeptical of team capabilities."
      },
      {
        id: "q19_3",
        question: "3. What's the biggest challenge someone in this role would face?",
        sampleAnswer: "[Question to ask interviewer]: 'What is the most pressing technical or operational hurdle your team is tackling right now?'",
        whyItWorks: "Uncovers real pain points not mentioned in the job description.",
        pitfallToAvoid: "Don't sound intimidated by challenges."
      },
      {
        id: "q19_4",
        question: "4. How would you describe the company culture?",
        sampleAnswer: "[Question to ask interviewer]: 'How would you describe the culture here, especially around decision-making and cross-team collaboration?'",
        whyItWorks: "Evaluates cultural alignment beyond PR marketing speak.",
        pitfallToAvoid: "Avoid asking generic 'is it fun working here?' questions."
      },
      {
        id: "q19_5",
        question: "5. What do you personally enjoy most about working here?",
        sampleAnswer: "[Question to ask interviewer]: 'What has kept you engaged and excited during your time at the company?'",
        whyItWorks: "Generates authentic personal feedback from the interviewer.",
        pitfallToAvoid: "Don't put the interviewer on the spot uncomfortably."
      },
      {
        id: "q19_6",
        question: "6. What growth or development opportunities exist for this role?",
        sampleAnswer: "[Question to ask interviewer]: 'How does the company support professional development and career progression over time?'",
        whyItWorks: "Signals long-term commitment to skill mastery.",
        pitfallToAvoid: "Don't sound like you expect promotion on month 2."
      },
      {
        id: "q19_7",
        question: "7. How is performance evaluated here?",
        sampleAnswer: "[Question to ask interviewer]: 'What is the performance review cycle like, and what feedback loops exist day-to-day?'",
        whyItWorks: "Clarifies evaluation criteria and review cadence.",
        pitfallToAvoid: "Don't express fear of performance reviews."
      },
      {
        id: "q19_8",
        question: "8. What's the next step in the interview process?",
        sampleAnswer: "[Question to ask interviewer]: 'What are the next steps in your timeline for this role, and is there any additional info I can provide?'",
        whyItWorks: "Shows professional organization and proactive follow-up posture.",
        pitfallToAvoid: "Don't sound pushy or desperate."
      },
      {
        id: "q19_9",
        question: "9. Why is this role open — is it new, or a replacement?",
        sampleAnswer: "[Question to ask interviewer]: 'Is this position opening due to team expansion, or is it filling a previous role?'",
        whyItWorks: "Reveals team growth dynamics or turnover context.",
        pitfallToAvoid: "Don't pry inappropriately into past employee exits."
      },
      {
        id: "q19_10",
        question: "10. How does this team typically work with other departments?",
        sampleAnswer: "[Question to ask interviewer]: 'How cross-functional is this role, and which partner teams do you interface with most?'",
        whyItWorks: "Evaluates organizational complexity and stakeholder touchpoints.",
        pitfallToAvoid: "Don't express dislike for cross-functional collaboration."
      },
      {
        id: "q19_11",
        question: "11. What are the team's or company's top priorities for the next year?",
        sampleAnswer: "[Question to ask interviewer]: 'What are the top strategic goals the team is aiming to achieve over the next 12 months?'",
        whyItWorks: "Shows strategic commercial thinking and alignment readiness.",
        pitfallToAvoid: "Don't ask about 10-year plans if 1-year goals aren't clear."
      }
    ]
  }
];
