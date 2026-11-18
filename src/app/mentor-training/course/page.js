'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Footer } from '@/components';

export default function CoursePage() {
  const router = useRouter();
  
  // 10-Module Complete Mentor Training Course
  const modules = [
    {
      id: 1,
      name: "The Mentor's Foundation – Role, Mindset & Impact",
      caption: "Definition of mentorship, core roles, growth mindset & WES mission",
      duration: "7 min",
      videoPath: "/course/modual01.mp4",
      description: "Learn what mentorship truly means and the three core roles of a WES mentor.",
      topics: [
        "Definition of mentorship (vs. coaching, teaching, advising)",
        "3 core roles: Guide, Connector, Advocate",
        "Growth mindset & empathy in action",
        "Boundaries: what mentors don't do",
        "Introduction to WES mission"
      ]
    },
    {
      id: 2,
      name: "Building the Bond – Psychological Safety, Trust & Rapport",
      caption: "Create psychological safety and establish trust in your first meeting",
      duration: "8 min",
      videoPath: "/course/modual02.mp4",
      description: "Understand psychological safety and learn the first meeting checklist for building rapport.",
      topics: [
        "What is psychological safety (Amy Edmondson's concept)",
        "First meeting checklist: icebreakers, confidentiality, preferences",
        "Setting ground rules: frequency, cancellation policy, feedback",
        "Avoiding common trust-breakers",
        "Building lasting rapport"
      ]
    },
    {
      id: 3,
      name: "The Art of Connection – Advanced Communication Skills",
      caption: "Master active listening, powerful questions & constructive feedback",
      duration: "9 min",
      videoPath: "/course/modual03.mp4",
      description: "Develop advanced communication skills including active listening and the SBI feedback model.",
      topics: [
        "Active listening: paraphrasing, summarizing, non-verbal cues",
        "Powerful questions: open-ended, future-focused, strength-based",
        "Constructive feedback: SBI model (Situation – Behavior – Impact)",
        "Avoiding leading or closed questions",
        "Creating space for mentee's voice"
      ]
    },
    {
      id: 4,
      name: "Navigating the Journey – Goal Setting, Planning & Support",
      caption: "Set SMART goals, use GROW model & distinguish mentorship types",
      duration: "10 min",
      videoPath: "/course/modual04.mp4",
      description: "Learn goal-setting frameworks and how to support your mentee's journey.",
      topics: [
        "SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)",
        "GROW model (Goal – Reality – Options – Will)",
        "Anchor vs Special mentorship differences",
        "Sample session agenda template",
        "Creating actionable plans together"
      ]
    },
    {
      id: 5,
      name: "When Things Get Challenging – Conflict Resolution & Problem-Solving",
      caption: "Handle challenges with empathy & know when to escalate",
      duration: "8 min",
      videoPath: "/course/modual05.mp4",
      description: "Learn conflict resolution and motivational interviewing techniques.",
      topics: [
        "Common challenges: missed meetings, mismatched expectations, low motivation",
        "Conflict resolution framework: listen, acknowledge, explore, agree",
        "Motivational interviewing: OARS (Open, Affirmations, Reflections, Summaries)",
        "When to escalate to WES coordinators",
        "Supporting mentee through difficulties"
      ]
    },
    {
      id: 6,
      name: "Mentoring for All – Cultural Competence, Equity & Inclusion",
      caption: "Understand diversity, unconscious bias & inclusive mentoring",
      duration: "9 min",
      videoPath: "/course/modual06.mp4",
      description: "Develop cultural competence and create inclusive mentoring relationships.",
      topics: [
        "multicultural reality (170+ nationalities)",
        "Unconscious bias: similarity bias, halo effect",
        "Inclusive language: avoid stereotypes, use preferred pronouns",
        "Accommodations for different learning/communication styles",
        "Creating welcoming spaces for all mentees"
      ]
    },
    {
      id: 7,
      name: "Putting Theory into Practice – Structured Activities & Simulation",
      caption: "Apply SWOT analysis, vision boards & role-play scenarios",
      duration: "10 min",
      videoPath: "/course/modual07.mp4",
      description: "Learn practical tools and activities to use in your mentoring sessions.",
      topics: [
        "SWOT analysis for career planning",
        "Career vision board exercise",
        "Role-play scenarios: mock interview, networking, salary negotiation",
        "Using WES Mentorship Toolkit",
        "Making sessions engaging and actionable"
      ]
    },
    {
      id: 8,
      name: "The Ethical & Responsible Mentor – Safeguarding & Professionalism",
      caption: "Maintain confidentiality, report concerns & prevent burnout",
      duration: "7 min",
      videoPath: "/course/modual08 (1).mp4",
      description: "Learn ethical practices, safeguarding protocols, and self-care strategies.",
      topics: [
        "Confidentiality limits (GDPR compliance for WES ASBL)",
        "Reporting safeguarding concerns: child protection, harassment",
        "Avoiding conflicts of interest",
        "Mentor self-care and burnout prevention",
        "Professional boundaries"
      ]
    },
    {
      id: 9,
      name: "The Complete Journey – Closure, Reflection & Continuous Growth",
      caption: "Close relationships gracefully, celebrate wins & join alumni network",
      duration: "6 min",
      videoPath: "/course/modual09.mp4",
      description: "Learn how to close mentoring relationships and continue growing as a mentor.",
      topics: [
        "How to close a mentorship relationship: final reflection, celebrating wins",
        "Transferring ownership of goals",
        "Alumni network: mentees can become future mentors",
        "Mentor peer support groups (monthly calls)",
        "Advanced training opportunities"
      ]
    }
  ];

  // Quiz questions for each module
  const moduleQuizzes = {
    1: [ // Module 1 - The Mentor's Foundation
      {
        id: 1,
        question: "Which of the following is NOT a primary role of a mentor in the WES program?",
        options: ["Guide", "Therapist", "Connector", "Advocate"],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "A mentor's main purpose is to:",
        options: [
          "Provide answers to all problems",
          "Help mentees discover their own solutions",
          "Guarantee a job after graduation",
          "Evaluate mentee's grades"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Which mindset is most important for a mentor?",
        options: ["Fixed mindset", "Competitive mindset", "Growth mindset", "Authoritative mindset"],
        correctAnswer: 2
      },
      {
        id: 4,
        question: "True or False: A WES mentor can provide career counseling but must avoid psychological therapy.",
        options: ["True", "False"],
        correctAnswer: 0
      },
      {
        id: 5,
        question: "What is the first step a mentor should take to align with WES's mission?",
        options: [
          "Share their salary",
          "Understand education-to-career challenges",
          "Immediately assign homework",
          "Ask for mentee's bank details"
        ],
        correctAnswer: 1
      }
    ],
    2: [ // Module 2 - Building the Bond
      {
        id: 1,
        question: "Psychological safety means:",
        options: [
          "No disagreements allowed",
          "Mentee feels safe to take risks and be vulnerable",
          "Mentor always agrees with mentee",
          "Meetings are recorded for safety"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Which is the best way to build rapport in the first session?",
        options: [
          "Ask personal financial details",
          "Share your own failures appropriately",
          "Deliver a lecture on your expertise",
          "Avoid eye contact"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "A mentor should establish confidentiality except when:",
        options: [
          "Mentee shares a hobby",
          "There is risk of harm to self or others",
          "Mentee gets a low grade",
          "Mentor wants to share a funny story"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "True or False: Setting a recurring meeting time and sticking to it builds trust.",
        options: ["True", "False"],
        correctAnswer: 0
      }
    ],
    3: [ // Module 3 - The Art of Connection
      {
        id: 1,
        question: "Which is an example of a powerful question?",
        options: [
          "Did you finish your assignment?",
          "What obstacles are you facing and how might you overcome them?",
          "Why are you always late?",
          "Don't you think you should study more?"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "In the SBI feedback model, 'I noticed you interrupted twice during our call' represents:",
        options: ["Situation", "Behavior", "Impact", "Suggestion"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Active listening includes:",
        options: [
          "Planning your next response while mentee speaks",
          "Paraphrasing what mentee said to confirm understanding",
          "Checking your phone for messages",
          "Finishing mentee's sentences"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "True or False: Giving feedback should always start with 'I think you did wrong.'",
        options: ["True", "False"],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "Which question is most likely to empower a mentee?",
        options: [
          "Why didn't you apply for that internship?",
          "What strengths can you use to move forward?",
          "When will you finally decide?",
          "Are you sure you can do it?"
        ],
        correctAnswer: 1
      }
    ],
    4: [ // Module 4 - Navigating the Journey
      {
        id: 1,
        question: "A SMART goal must be:",
        options: ["Specific and Measurable", "Subjective and Vague", "Assigned by mentor", "Irrelevant to career"],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "In the GROW model, 'What have you tried so far?' belongs to which phase?",
        options: ["Goal", "Reality", "Options", "Will"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Which WES program is best suited for a mentee who wants a 6-month deep relationship?",
        options: ["Special mentorship", "Anchor mentorship", "Industrial Visit", "Global Tech Connect"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "True or False: A mentor should set goals for the mentee without their input.",
        options: ["True", "False"],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "What is the recommended frequency of meetings for Anchor mentorship?",
        options: ["Once a week", "At least twice a month", "Once per semester", "Daily"],
        correctAnswer: 1
      }
    ],
    5: [ // Module 5 - When Things Get Challenging
      {
        id: 1,
        question: "A mentee misses two meetings without notice. The mentor should:",
        options: [
          "Immediately report to WES and drop the mentee",
          "Send a supportive message asking what's going on and restate expectations",
          "Ignore the behavior",
          "Publicly shame the mentee"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Which is a sign of low mentee motivation?",
        options: [
          "Asking for feedback",
          "Cancelling last minute repeatedly with no explanation",
          "Sharing career goals",
          "Completing action items early"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "In motivational interviewing, an 'Affirmation' sounds like:",
        options: [
          "You are lazy.",
          "You showed great persistence by reapplying after rejection.",
          "Why can't you be more like others?",
          "Let me tell you what to do."
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "True or False: If a mentee discloses a serious mental health crisis, the mentor should provide therapy.",
        options: ["True", "False"],
        correctAnswer: 1
      }
    ],
    6: [ // Module 6 - Mentoring for All
      {
        id: 1,
        question: "Which statement shows cultural competence?",
        options: [
          "All international students struggle the same way.",
          "Tell me how your background might influence your career preferences.",
          "You should adapt completely to culture.",
          "I don't see color or culture."
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Similarity bias occurs when a mentor:",
        options: [
          "Favorably evaluates a mentee who shares their alma mater",
          "Treats all mentees identically",
          "Avoids any personal disclosure",
          "Uses a checklist for every session"
        ],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "True or False: It is acceptable to ask a mentee 'Where are you really from?' as an icebreaker.",
        options: ["True", "False"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "Which action promotes inclusion?",
        options: [
          "Using only written communication for all mentees",
          "Offering both synchronous and asynchronous options for sharing updates",
          "Assuming all mentees prefer the same meeting platform",
          "Avoiding any discussion of cultural differences"
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "Gender-neutral pronouns (e.g., they/them) should be:",
        options: [
          "Ignored if not legally recognized",
          "Used if the mentee requests them",
          "Replaced with 'he' for simplicity",
          "Never asked about"
        ],
        correctAnswer: 1
      }
    ],
    7: [ // Module 7 - Putting Theory into Practice
      {
        id: 1,
        question: "In a SWOT analysis for career development, 'lack of internship opportunities is an example of:",
        options: ["Strength", "Weakness", "Opportunity", "Threat"],
        correctAnswer: 3
      },
      {
        id: 2,
        question: "Which activity is most appropriate for a mentee preparing for a job interview?",
        options: [
          "Watching a movie together",
          "Mock interview with feedback",
          "Writing a personal diary entry",
          "Analyzing stock markets"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "True or False: The WES Mentorship Toolkit includes session templates and activity worksheets.",
        options: ["True", "False"],
        correctAnswer: 0
      },
      {
        id: 4,
        question: "A mentee is unsure about their career direction. Which tool would be best?",
        options: [
          "SWOT analysis focused on strengths and interests",
          "Immediate job application",
          "Asking the mentor to choose a career for them",
          "Skipping the session"
        ],
        correctAnswer: 0
      }
    ],
    8: [ // Module 8 - The Ethical & Responsible Mentor
      {
        id: 1,
        question: "Which situation requires a mentor to break confidentiality?",
        options: [
          "Mentee says they dislike their professor",
          "Mentee reports planning to harm themselves",
          "Mentee fails an exam",
          "Mentee changes their major"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "A mentor is also a hiring manager at a company. Their mentee applies for a job. The mentor should:",
        options: [
          "Hire them immediately",
          "Recuse themselves from the hiring decision and inform WES",
          "Give the mentee the questions beforehand",
          "Ignore the application"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Which is a sign of mentor burnout?",
        options: [
          "Feeling energized after sessions",
          "Dreading meetings and feeling exhausted",
          "Asking for supervisor feedback",
          "Taking vacation time"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "True or False: It is acceptable to meet a mentee alone in a private, non-public location without informing anyone.",
        options: ["True", "False"],
        correctAnswer: 1
      }
    ],
    9: [ // Module 9 - The Complete Journey
      {
        id: 1,
        question: "The best way to close a mentorship is:",
        options: [
          "Stop responding to messages",
          "Schedule a final session to review progress and next steps",
          "Tell the mentee they failed",
          "Immediately delete them from the app"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "After completing the mentorship, a mentee can:",
        options: [
          "Never contact WES again",
          "Apply to become a WES mentor after gaining experience",
          "Demand a refund",
          "Automatically get a job"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "True or False: WES encourages mentors to join peer support groups to share challenges and best practices.",
        options: ["True", "False"],
        correctAnswer: 0
      }
    ]
  };

  // Final Comprehensive Quiz - After all 9 modules
  const finalQuiz = [
    {
      id: 1,
      question: "Which of the following is NOT a responsibility of a WES mentor?",
      options: [
        "Providing career guidance",
        "Guaranteeing a job offer",
        "Building trust and rapport",
        "Helping set SMART goals"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: "A mentee says, 'I feel lost and don't know which career to choose.' Which response demonstrates active listening and powerful questioning?",
      options: [
        "You should become an engineer like me.",
        "It sounds like you're feeling uncertain. What aspects of work have you enjoyed in the past?",
        "Stop complaining and send out 100 applications.",
        "That's a common problem, next."
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "According to the SBI feedback model, 'During our team meeting yesterday' represents:",
      options: ["Situation", "Behavior", "Impact", "Goal"],
      correctAnswer: 0
    },
    {
      id: 4,
      question: "A mentor notices their mentee consistently misses deadlines for action items. What should the mentor do first?",
      options: [
        "Report to WES and request a new mentee",
        "Explore barriers with curiosity: 'What's making it hard to complete these tasks?'",
        "Shame the mentee publicly",
        "Complete the tasks for the mentee"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      question: "Which WES program is designed for a shorter, goal-specific engagement (approx. 3 months)?",
      options: [
        "Anchor mentorship",
        "Special mentorship",
        "Global Tech Connect",
        "Industrial Visit"
      ],
      correctAnswer: 1
    },
    {
      id: 6,
      question: "What is the primary limit to confidentiality in mentoring?",
      options: [
        "Mentor can share anything with their spouse",
        "Risk of serious harm to mentee or others",
        "Mentor can post on social media if names are hidden",
        "There are no limits"
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      question: "A mentor wants to help a mentee explore career options. Which tool is most suitable?",
      options: [
        "SWOT analysis focused on strengths and opportunities",
        "Salary negotiation script",
        "Mock job rejection letter",
        "Tax calculation worksheet"
      ],
      correctAnswer: 0
    },
    {
      id: 8,
      question: "Which of the following is an example of inclusive mentoring behavior?",
      options: [
        "Assuming all mentees have the same religious holidays",
        "Asking 'What are your preferred pronouns?' during the first meeting",
        "Speaking only in technical jargon",
        "Avoiding any mention of cultural background"
      ],
      correctAnswer: 1
    },
    {
      id: 9,
      question: "A mentor feels exhausted and resentful before sessions. This is a sign of:",
      options: [
        "Effective mentoring",
        "Need for more training",
        "Mentor burnout",
        "High mentee motivation"
      ],
      correctAnswer: 2
    },
    {
      id: 10,
      question: "What should a mentor do during the final closure session?",
      options: [
        "Immediately delete the mentee's contact",
        "Celebrate achievements, review progress, and agree on next steps",
        "Give the mentee a grade",
        "Never speak again without explanation"
      ],
      correctAnswer: 1
    }
  ];

  const [currentModule, setCurrentModule] = useState(0);
  const [currentStep, setCurrentStep] = useState('video'); // 'video', 'quiz', or 'final-quiz'
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false); // Track if video actually ended
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [allQuizScores, setAllQuizScores] = useState({}); // Store all module scores
  const [coursecompleted, setCourseCompleted] = useState(false);
  const [isFinalQuiz, setIsFinalQuiz] = useState(false);

  const currentModuleData = modules[currentModule];
  const currentQuizQuestions = moduleQuizzes[currentModule + 1] || [];

  const handleVideoComplete = () => {
    // Only set videoCompleted if video has actually ended
    setVideoCompleted(true);
  };

  const handleVideoEnded = () => {
    // This is called when video naturally ends
    setVideoEnded(true);
    setVideoCompleted(true);
  };

  const handleAnswerChange = (questionId, selectedIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: selectedIndex
    }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    const questionsToCheck = isFinalQuiz ? finalQuiz : currentQuizQuestions;
    
    questionsToCheck.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    const calculatedScore = Math.round((correctCount / questionsToCheck.length) * 100);
    setScore(calculatedScore);
    
    // For final quiz, store it separately
    if (isFinalQuiz) {
      sessionStorage.setItem('finalQuizScore', calculatedScore);
    } else {
      // Store this module's quiz score
      setAllQuizScores(prev => ({
        ...prev,
        [currentModule + 1]: calculatedScore
      }));
    }
    
    setQuizSubmitted(true);
  };

  const handleContinue = () => {
    // Check if there are more modules
    if (currentModule < modules.length - 1) {
      // Go to next module - increment first, then reset states
      const nextModule = currentModule + 1;
      setCurrentModule(nextModule);
      setCurrentStep('video');
      setVideoCompleted(false);
      setVideoEnded(false);
      setQuizAnswers({});
      setQuizSubmitted(false);
      setScore(0);
      setIsFinalQuiz(false);
      // Scroll to top
      setTimeout(() => window.scrollTo(0, 0), 0);
    } else {
      // All modules completed - show final comprehensive quiz
      setIsFinalQuiz(true);
      setCurrentStep('final-quiz');
      setQuizAnswers({});
      setQuizSubmitted(false);
      setScore(0);
      setTimeout(() => window.scrollTo(0, 0), 0);
    }
  };

  const calculateOverallScore = async () => {
    // Calculate average of all quiz scores
    const scoresArray = Object.values(allQuizScores);
    if (scoresArray.length === 0) {
      setCourseCompleted(true);
      return;
    }
    
    const overallScore = Math.round(
      scoresArray.reduce((a, b) => a + b, 0) / scoresArray.length
    );
    
    // Store overall score and redirect
    sessionStorage.setItem('overallScore', overallScore);
    sessionStorage.setItem('moduleScores', JSON.stringify(allQuizScores));
    
    if (overallScore >= 70) {
      // Certificate eligible - store mentor email for completion page
      const mentorEmail = sessionStorage.getItem('mentorEmail');
      if (mentorEmail) {
        sessionStorage.setItem('mentorEmail', mentorEmail);
        
        // Update mentor status in database
        try {
          await fetch('/api/mentor-training/update-certificate-status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: mentorEmail,
              certificateEarned: true,
              finalQuizScore: score,
              overallScore: overallScore,
            }),
          });
        } catch (error) {
          console.error('Error updating certificate status:', error);
        }
      }
      router.push('/mentor-training/completion');
    } else {
      // Show failure message - redirect to failure page or show on current page
      setCourseCompleted(true);
      sessionStorage.setItem('certificateEligible', 'false');
      sessionStorage.setItem('overallScore', overallScore);
    }
  };

  return (
    <div className="min-h-screen flex flex-col sitePage">
      <Header />
      
      <main className="flex-grow bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="container mx-auto px-4 py-12">
          {/* Progress Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Mentorship Training Course
              </h1>
              <div className="text-sm font-bold text-gray-600">
                Module {currentModule + 1} of {modules.length}
              </div>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 to-orange-600 transition-all duration-500"
                style={{
                  width: `${((currentModule + (currentStep === 'quiz' ? 1 : 0.5)) / modules.length) * 100}%`
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Modules Completed: {currentModule} / {modules.length}
            </p>
          </div>

          {/* Video Section */}
          {currentStep === 'video' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">📹 Module {currentModule + 1}: {currentModuleData.name}</h2>
                  <p className="text-lg text-gray-600 italic">{currentModuleData.caption}</p>
                  <p className="text-sm text-gray-500 mt-2">⏱️ {currentModuleData.duration}</p>
                </div>
                
                {/* Video Player */}
                <div className="relative w-full bg-black rounded-xl overflow-hidden mb-6" style={{ paddingBottom: '56.25%' }}>
                  <video
                    className="absolute top-0 left-0 w-full h-full"
                    controls
                    onEnded={handleVideoEnded}
                  >
                    <source src={currentModuleData.videoPath} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                {/* Video Info */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-2">📖 About this module:</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {currentModuleData.description}
                  </p>
                  <p className="font-semibold text-gray-900 mb-3">Key topics covered:</p>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    {currentModuleData.topics.map((topic, idx) => (
                      <li key={idx}>✓ {topic}</li>
                    ))}
                  </ul>
                </div>

                {/* Completion Section */}
                <div className="space-y-4">
                  <div className={`flex items-center gap-3 p-4 rounded-lg border-2 ${videoEnded ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                    <svg className={`w-6 h-6 flex-shrink-0 ${videoEnded ? 'text-green-600' : 'text-yellow-600'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className={`font-bold ${videoEnded ? 'text-green-900' : 'text-yellow-900'}`}>
                        {videoEnded ? '✓ Video Completed!' : '📺 Watch the entire video'}
                      </p>
                      <p className={`text-sm ${videoEnded ? 'text-green-800' : 'text-yellow-800'}`}>
                        {videoEnded 
                          ? 'Click below to proceed to the quiz' 
                          : 'The video must play to completion before you can proceed'}
                      </p>
                    </div>
                  </div>

                  {!videoEnded && (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>💡 Note:</strong> This ensures you understand all the key concepts before taking the quiz. You can rewind and rewatch any part of the video.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleVideoComplete}
                    disabled={!videoEnded}
                    className={`w-full px-6 py-4 font-bold rounded-lg transition-all shadow-lg text-white ${
                      videoEnded 
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 cursor-pointer' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {videoEnded ? '✓ Video Completed - Ready for Quiz' : '⏳ Waiting for video to complete...'}
                  </button>

                  {!videoEnded && (
                    <p className="text-xs text-center text-gray-500">
                      ⏱️ Play the video to the end to unlock the quiz
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quiz Section */}
          {currentStep === 'video' && videoCompleted && (
            <div className="max-w-4xl mx-auto mt-8 mb-8">
              <button
                onClick={() => setCurrentStep('quiz')}
                className="w-full px-6 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all shadow-2xl text-lg flex items-center justify-center gap-2"
              >
                <span>📝</span>
                <span>Proceed to Quiz</span>
              </button>
            </div>
          )}

          {/* Quiz Questions */}
          {currentStep === 'quiz' && (
            <div className="max-w-4xl mx-auto">
              {!quizSubmitted ? (
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Module {currentModule + 1} Quiz</h2>
                  <p className="text-gray-600 mb-8">
                    Answer the following questions based on the video you just watched. Your score will be calculated as part of your overall course performance.
                  </p>

                  <div className="space-y-8">
                    {currentQuizQuestions.map((question, qIndex) => (
                      <div key={question.id} className="border-2 border-gray-200 rounded-xl p-6">
                        <h3 className="font-bold text-gray-900 mb-4">
                          Question {qIndex + 1} of {currentQuizQuestions.length}
                        </h3>
                        <p className="text-gray-700 font-semibold mb-4">{question.question}</p>
                        
                        <div className="space-y-3">
                          {question.options.map((option, optIndex) => (
                            <label 
                              key={optIndex}
                              className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-amber-50 hover:border-amber-400 transition-all"
                            >
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={optIndex}
                                checked={quizAnswers[question.id] === optIndex}
                                onChange={() => handleAnswerChange(question.id, optIndex)}
                                className="w-5 h-5 text-amber-600 cursor-pointer"
                              />
                              <span className="ml-4 text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(quizAnswers).length !== currentQuizQuestions.length}
                    className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg text-lg"
                  >
                    Submit Quiz
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                  <div className="text-center mb-8">
                    {score >= 70 ? (
                      <>
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">✅ Quiz Completed!</h3>
                        <p className="text-gray-600 mb-6">Great effort! Your score will be counted toward your overall course performance.</p>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <svg className="w-12 h-12 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed</h3>
                        <p className="text-gray-600 mb-6">Your score will be calculated in your overall course performance at the end.</p>
                      </>
                    )}
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">Your Score for This Module</p>
                      <p className="text-4xl font-bold text-blue-600 mt-2">{score}%</p>
                      <p className="text-sm text-gray-600 mt-2">
                        {score >= 70 
                          ? 'Strong performance! Keep up the good work.' 
                          : 'Consider reviewing this module to strengthen your understanding.'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        setQuizSubmitted(false);
                        setQuizAnswers({});
                      }}
                      className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
                    >
                      📝 Retake This Quiz
                    </button>
                    <button
                      onClick={handleContinue}
                      className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-lg transition-all shadow-lg"
                    >
                      {currentModule < modules.length - 1 
                        ? '▶ Continue to Next Module' 
                        : '✓ Complete Course & View Results'}
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep('video');
                        setVideoCompleted(false);
                        setQuizAnswers({});
                        setQuizSubmitted(false);
                      }}
                      className="w-full px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
                    >
                      Back to Video
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Final Comprehensive Quiz */}
          {isFinalQuiz && (
            <div className="max-w-4xl mx-auto">
              {!quizSubmitted ? (
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">🏆 Final Comprehensive Quiz</h2>
                  <p className="text-gray-600 mb-2">Assessment across all 9 modules</p>
                  <p className="text-gray-600 mb-8">
                    Answer all 10 questions from across the course. You need 80% (8/10) to pass and earn your certificate.
                  </p>

                  <div className="space-y-8">
                    {finalQuiz.map((question, qIndex) => (
                      <div key={question.id} className="border-2 border-gray-200 rounded-xl p-6">
                        <h3 className="font-bold text-gray-900 mb-4">
                          Question {qIndex + 1} of {finalQuiz.length}
                        </h3>
                        <p className="text-gray-700 font-semibold mb-4">{question.question}</p>
                        
                        <div className="space-y-3">
                          {question.options.map((option, optIndex) => (
                            <label 
                              key={optIndex}
                              className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-amber-50 hover:border-amber-400 transition-all"
                            >
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={optIndex}
                                checked={quizAnswers[question.id] === optIndex}
                                onChange={() => {
                                  setQuizAnswers(prev => ({
                                    ...prev,
                                    [question.id]: optIndex
                                  }));
                                }}
                                className="w-5 h-5 text-amber-600 cursor-pointer"
                              />
                              <span className="ml-4 text-gray-700">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(quizAnswers).length !== finalQuiz.length}
                    className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg text-lg"
                  >
                    Submit Final Quiz
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                  <div className="text-center mb-8">
                    {score >= 80 ? (
                      <>
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">🎉 Congratulations!</h3>
                        <p className="text-gray-600 mb-6">You passed the final comprehensive quiz!</p>
                      </>
                    ) : (
                      <>
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">Not Yet</h3>
                        <p className="text-gray-600 mb-6">You need 80% (8/10) to earn your certificate. Score: {score}%</p>
                      </>
                    )}
                  </div>

                  <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-8">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">Final Quiz Score</p>
                      <p className="text-4xl font-bold text-purple-600 mt-2">{score}%</p>
                      <p className="text-sm text-gray-600 mt-2">
                        {score >= 80 
                          ? 'Excellent! You demonstrated mastery of the course material.' 
                          : 'Review the modules and retake the final quiz.'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {score < 80 && (
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setQuizAnswers({});
                        }}
                        className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
                      >
                        📝 Retake Final Quiz
                      </button>
                    )}
                    {score >= 80 && (
                      <button
                        onClick={calculateOverallScore}
                        className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-lg transition-all shadow-lg"
                      >
                        ✓ Get Certificate
                      </button>
                    )}
                    {score < 80 && (
                      <button
                        onClick={() => {
                          setIsFinalQuiz(false);
                          setCurrentModule(0);
                          setCurrentStep('video');
                          setVideoCompleted(false);
                          setQuizAnswers({});
                          setQuizSubmitted(false);
                          window.scrollTo(0, 0);
                        }}
                        className="w-full px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
                      >
                        Back to Modules
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Course Completion - Certificate Ineligible Screen */}
      {coursecompleted && (
        <main className="flex-grow bg-gradient-to-br from-red-50 via-white to-orange-50">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">Certificate Not Eligible</h2>
                
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                  <p className="text-lg font-bold text-gray-900 mb-4">Your Course Performance</p>
                  <p className="text-4xl font-bold text-blue-600 mb-4">
                    {sessionStorage.getItem('overallScore')}%
                  </p>
                  <p className="text-gray-600 mb-4">
                    You need a score of 70% or higher to receive the course certificate.
                  </p>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-gray-900 mb-3">📚 Recommended Actions:</h3>
                  <ul className="space-y-2 text-gray-700 text-left">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      <span>Review the course modules and key concepts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      <span>Retake the quizzes you found challenging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      <span>Focus on the topics covered in lower-scoring modules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      <span>Take the course again from the beginning</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setCourseCompleted(false);
                      setCurrentModule(0);
                      setCurrentStep('video');
                      setVideoCompleted(false);
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                      setAllQuizScores({});
                      window.scrollTo(0, 0);
                    }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all shadow-lg"
                  >
                    🔄 Restart Course
                  </button>
                  <button
                    onClick={() => router.push('/mentor-training/training')}
                    className="w-full px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
                  >
                    Back to Training Overview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}
