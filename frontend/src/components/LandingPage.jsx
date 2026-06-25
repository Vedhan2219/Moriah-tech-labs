/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Briefcase, 
  FileText, 
  Users, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Check, 
  Code, 
  Layers, 
  GraduationCap, 
  ArrowRight, 
  Download, 
  MessageSquare, 
  Cpu, 
  PhoneCall, 
  Monitor, 
  MapPin, 
  Star,
  ExternalLink,
  Smartphone,
  Sparkles,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LeadStatus, TrainingMode } from '../types';

// High-fidelity responsive branded PNG Logo Component
function MoriahLogo({ className = "h-11" }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <img 
        src="/src/assets/images/logo.png" 
        alt="Moriah Tech Labs" 
        className={`${className} h-25 w-auto object-contain`} 
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default function LandingPage({ onSubmitLead, onNavigateToAdmin, successLeadName, onClearSuccess, theme = 'dark', onToggleTheme }) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [qualification, setQualification] = useState('B.Tech');
  const [interestedTechnology, setInterestedTechnology] = useState('Java');
  const [trainingMode, setTrainingMode] = useState(TrainingMode.ONLINE);
  const [message, setMessage] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [submittedMobile, setSubmittedMobile] = useState('');
  
  // Interactive States
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [selectedTechInfo, setSelectedTechInfo] = useState(null);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isJoinedWhatsApp, setIsJoinedWhatsApp] = useState(false);
  const [isCounselingBooked, setIsCounselingBooked] = useState(false);
  const [isBrochureDownloaded, setIsBrochureDownloaded] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);
  const [isCallbackRequested, setIsCallbackRequested] = useState(false);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setCaptchaInput("");
    setCaptchaError(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Typewriter effect for the "Real-Time" heading section
  const headingWords = ["Real-Time", "Hands-On", "Project-Led", "Advanced", "Full-Stack"];
  const [headingWordIndex, setHeadingWordIndex] = useState(0);
  const [typedHeadingWord, setTypedHeadingWord] = useState("Real-Time");
  const [headingCharIdx, setHeadingCharIdx] = useState(9);
  const [isHeadingDeleting, setIsHeadingDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = headingWords[headingWordIndex];

    if (!isHeadingDeleting) {
      if (headingCharIdx < currentWord.length) {
        timer = setTimeout(() => {
          setTypedHeadingWord(currentWord.substring(0, headingCharIdx + 1));
          setHeadingCharIdx(prev => prev + 1);
        }, 100);
      } else {
        timer = setTimeout(() => {
          setIsHeadingDeleting(true);
        }, 2550);
      }
    } else {
      if (headingCharIdx > 0) {
        timer = setTimeout(() => {
          setTypedHeadingWord(currentWord.substring(0, headingCharIdx - 1));
          setHeadingCharIdx(prev => prev - 1);
        }, 60);
      } else {
        setIsHeadingDeleting(false);
        setHeadingWordIndex(prev => (prev + 1) % headingWords.length);
      }
    }
    return () => clearTimeout(timer);
  }, [headingCharIdx, isHeadingDeleting, headingWordIndex]);

  // Subheading Typing Animation
  const typingLines = [
    { line2: "Assemble Production Level Microservices.", line3: "Deploy Scalable Containers on AWS Cloud." },
    { line2: "Create High-Performance React Web Interfaces.", line3: "Master Concurrency & Safe Lock Ledgers." },
    { line2: "Earn Digitally-Verifiable Project Certificates.", line3: "Accelerate Placement with 50+ Partners." }
  ];

  const [typingIndex, setTypingIndex] = useState(0);
  const [typedLine2, setTypedLine2] = useState('');
  const [typedLine3, setTypedLine3] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = typingLines[typingIndex];
    let timer;

    if (!isDeleting) {
      if (charIndex < current.line2.length) {
        timer = setTimeout(() => {
          setTypedLine2(current.line2.substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        }, 30);
      } else if (charIndex < current.line2.length + current.line3.length) {
        const line3CharIndex = charIndex - current.line2.length;
        timer = setTimeout(() => {
          setTypedLine3(current.line3.substring(0, line3CharIndex + 1));
          setCharIndex(prev => prev + 1);
        }, 30);
      } else {
        // Fully written, pause before deletion
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 4000);
      }
    } else {
      // Deleting letters backwards
      if (charIndex > 0) {
        timer = setTimeout(() => {
          const newCharIdx = charIndex - 1;
          setCharIndex(newCharIdx);
          if (newCharIdx >= current.line2.length) {
            setTypedLine3(current.line3.substring(0, newCharIdx - current.line2.length));
          } else {
            setTypedLine3('');
            setTypedLine2(current.line2.substring(0, newCharIdx));
          }
        }, 15);
      } else {
        setIsDeleting(false);
        setTypingIndex(prev => (prev + 1) % typingLines.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, typingIndex]);

  // Form Submission Handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !mobileNumber) {
      alert("Please fill in all required fields (Name, Email, Mobile).");
      return;
    }
    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);

    // Track Google Analytics Action
    if (typeof window !== 'undefined') {
      console.log(`[Google Analytics Tag] Event logged: "lead_form_submitted"`, {
        fullName,
        interestedTechnology,
        trainingMode
      });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'lead_form_submitted',
        leadName: fullName,
        techInterest: interestedTechnology,
        mode: trainingMode
      });
    }

    const cleanedMobile = mobileNumber.replace(/[\s\-]/g, '');
    onSubmitLead({
      fullName,
      email,
      mobileNumber: cleanedMobile,
      qualification,
      interestedTechnology,
      trainingMode,
      message
    });
    // Snapshot submitted values for PDF before clearing
    setSubmittedName(fullName);
    setSubmittedEmail(email);
    setSubmittedMobile(cleanedMobile);
    // Reset inputs
    setFullName('');
    setEmail('');
    setMobileNumber('');
    setMessage('');
    setCaptchaInput('');
    generateCaptcha();
  };

  const technologies = [
    { 
      name: 'Java', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 11C4 11 5 15 9 15H13C17 15 18 11 18 11H4Z" stroke="#F89820" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18 11C20 11 21 12 21 13C21 14 20 15 18 15" stroke="#F89820" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 19C10 19.5 14 19.5 16 19" stroke="#E22E26" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M8 8C9 6 10 5 10 3" stroke="#5382A1" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M11 8C12 6 13 5 13 3" stroke="#5382A1" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14 8C14.5 7 15 6 15 4" stroke="#5382A1" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ), 
      desc: 'Core OOP, Collections, Multithreading, stream API', 
      bg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=400',
      fullDesc: 'Master advanced Object Oriented Programming concepts from the ground up. You will deep-dive into collection performance, concurrency, streams, garbage collection, and safe transaction thread locks.',
      duration: '8 Weeks (~120 Hours)',
      syllabus: [
        'JVM Internal Architecture, Classloaders & Stack/Heap Memory allocation models',
        'Java Collections Framework with custom comparators and performance indices',
        'Concurrency pipelines, thread synchronization, and locking guards',
        'Stream automation APIs, functional interface schemas, and Lambdas'
      ],
      roles: ['Core Java Developer', 'Systems Software Engineer']
    },
    { 
      name: 'Spring Boot', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" fill="#6DB33F" fillOpacity="0.15" />
          <path d="M12 4C14 6 18.5 9 18.5 13.5C18.5 18 14.5 20 12 20C9.5 20 5.5 18 5.5 13.5C5.5 9 10 6 12 4" stroke="#6DB33F" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 4V20" stroke="#6DB33F" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 9C13.5 10.5 16 11 17 12" stroke="#6DB33F" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 13C10.5 14.5 8 15 7 16" stroke="#6DB33F" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ), 
      desc: 'REST APIs, Microservices, Security, JPA/Hibernate', 
      bg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400',
      fullDesc: 'Build performant, highly-scalable enterprise REST API networks and secure microservices with safe database connection pooling, caching strategies, and JWT authentication.',
      duration: '10 Weeks (~150 Hours)',
      syllabus: [
        'Spring Core Injections, IOC Container, and Beans profiles',
        'Spring Web REST Service controllers & unified global exception handler blueprints',
        'Spring Data JPA, Hibernate ORM entity relationships, and transaction scopes',
        'Spring Security setups with Stateful tokens, CORS blocks, and interceptors'
      ],
      roles: ['Backend Software Engineer', 'Microservices Technical Architect']
    },
    { 
      name: 'React', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(30 12 12)" stroke="#149ECA" strokeWidth="1.8" />
          <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(90 12 12)" stroke="#149ECA" strokeWidth="1.8" />
          <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(150 12 12)" stroke="#149ECA" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="1.5" fill="#149ECA" />
        </svg>
      ), 
      desc: 'Hooks, Context, State management, custom components', 
      bg: 'bg-blue-400/10 text-blue-300 border-blue-400/20',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600&h=400',
      fullDesc: 'Create responsive, blazingly fast client portals using modern hook compositions, state management, customizable styled components, and Framer Motion layouts.',
      duration: '6 Weeks (~90 Hours)',
      syllabus: [
        'Virtual DOM, JSX layouts, and synthetic event mappings',
        'React Hooks lifecycle (useState, useEffect, useMemo, useRef, useCallback)',
        'React Context systems, state managers & custom Redux architecture',
        'High-density UI layouts integrated with Tailwind CSS variables and custom motion sets'
      ],
      roles: ['Frontend Web Developer', 'UI Engineer']
    },
    { 
      name: 'Angular', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L21 5L19.5 17L12 22L4.5 17L3 5L12 2Z" fill="#DD0031" />
          <path d="M12 2V22L19.5 17L21 5L12 2Z" fill="#C3002F" />
          <path d="M12 5.5L7.5 15.5H9.5L10.5 13H13.5L14.5 15.5H16.5L12 5.5ZM12 8.5L13 11H11L12 8.5Z" fill="white" />
        </svg>
      ), 
      desc: 'TypeScript, Directives, RxJS, state, modular router', 
      bg: 'bg-red-500/10 text-red-305 border-red-500/20',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400',
      fullDesc: 'Engineer robust, strictly-typed corporate web consoles utilizing modular components, RxJS stream operators, lazy loaded routes, and automated forms.',
      duration: '8 Weeks (~120 Hours)',
      syllabus: [
        'TypeScript basics, typings, decorators, and abstract class models',
        'Angular Component composition, input/output bonds, and element lifecycles',
        'RxJS asynchronous streams, reactive observables, and HTTP filters',
        'Dynamic form validator groups and enterprise-grade router configurations'
      ],
      roles: ['Angular UI Developer', 'Enterprise Frontend Architect']
    },
    { 
      name: 'AWS', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 17.5C7 19.5 12 20.5 17 18.5" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M17 18.5L14 17M17 18.5L16 21" stroke="#FF9900" strokeWidth="1.8" />
          <path d="M4 11C4 7.5 7 5.5 10 5.5C13 5.5 14 7.5 14 11" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 11C15.5 11 17.5 12 18.5 14.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="11" r="1" fill="#FF9900" />
          <circle cx="14" cy="11" r="1" fill="#FF9900" />
        </svg>
      ), 
      desc: 'EC2, RDS, S3, IAM, CloudWatch deployments', 
      bg: 'bg-orange-400/10 text-orange-300 border-orange-400/20',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600&h=400',
      fullDesc: 'Deploy enterprise-grade code structures to real AWS virtual resources. Learn network isolation, database persistence hooks, and identity permissions schemes.',
      duration: '8 Weeks (~120 Hours)',
      syllabus: [
        'EC2 instances configurations, security group profiles, and SSH connectivity',
        'Virtual Private Clouds (VPC) configurations, subnet route mappings, and Internet Gateways',
        'RDS SQL configurations, database connections, and auto-backup triggers',
        'IAM role authentications, S3 content containers, and CloudWatch performance logs'
      ],
      roles: ['Cloud Operations Architect', 'AWS Solutions Consultant']
    },
    { 
      name: 'Docker', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="6" width="2.5" height="2.5" rx="0.5" fill="#0db7ed" />
          <rect x="8.5" y="6" width="2.5" height="2.5" rx="0.5" fill="#0db7ed" />
          <rect x="12" y="6" width="2.5" height="2.5" rx="0.5" fill="#0db7ed" />
          <rect x="6.5" y="2.5" width="2.5" height="2.5" rx="0.5" fill="#0db7ed" />
          <rect x="10" y="2.5" width="2.5" height="2.5" rx="0.5" fill="#0db7ed" />
          <path d="M2.5 11.5C2.5 11.5 4 10 8 10C13 10 14.5 13 18.5 13C22 13 20.5 8.5 20.5 8.5C20.5 8.5 18.5 11 16.5 10.5C14.5 10 14.5 9 13 9H4C2.5 9 2.5 11.5 2.5 11.5Z" fill="#0db7ed" />
          <path d="M18.5 13C16 16 12 17 8 17C4.5 17 2.5 15.5 2.5 15.5" stroke="#0db7ed" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ), 
      desc: 'Containerization, volumes, compose structures', 
      bg: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/20',
      image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=600&h=400',
      fullDesc: 'Containerize local developer code blocks to match exact production environments, resolving deployment mismatches and optimizing host server resources.',
      duration: '4 Weeks (~60 Hours)',
      syllabus: [
        'Docker Engine mechanics, namespace controls, and file caching layers',
        'Authoring optimized multi-stage build Dockerfiles for Java and React micro-systems',
        'Docker network bridging and volume persistence layouts for named data repositories',
        'Compose multi-container assemblies to run full stacks locally with one command'
      ],
      roles: ['Devops Integration Engineer', 'Platforms Operations Specialist']
    },
    { 
      name: 'DevOps', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 16C9.5 16 11 14 12 12C13 10 14.5 8 16.5 8C19 8 21 10 21 12C21 14 19 16 16.5 16C14.5 16 13 14 12 12C11 10 9.5 8 7.5 8C5 8 3 10 3 12C3 14 5 16 7.5 16Z" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ), 
      desc: 'CI/CD Pipelines, GitHub Actions, Jenkins, Ansible', 
      bg: 'bg-indigo-400/10 text-indigo-305 border-indigo-400/20',
      image: '/src/assets/images/devops_track.png',
      fullDesc: 'Automate modern build-and-deploy processes. Configure hands-free software delivery pipelines with automatic tests, lint checks, and container releases.',
      duration: '8 Weeks (~120 Hours)',
      syllabus: [
        'Continuous Integration guidelines and Github Actions workflow YAML coding',
        'Jenkins pipelines orchestration with Docker build agents and testing scripts',
        'Ansible playbook tasks for hands-free automated production setups configuration',
        'Deployments monitoring, load balancing rules, and live blue-green configurations'
      ],
      roles: ['DevOps System Administrator', 'Release Support Engineer']
    },
    { 
      name: 'Python', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.5 2C10 2 8.5 3 8.5 5V7.5H12V8.5H7C5.3 8.5 4 9.8 4 11.5C4 13.2 5.3 14.5 7 14.5H8.5V13C8.5 11 10 9.5 12 9.5H15.5C17 9.5 18 8.5 18 7V3.5C18 2 16.5 2 15 2H11.5ZM10 4C10.5 4 11 4.5 11 5C11 5.5 10.5 6 10 6C9.5 6 9 5.5 9 5C9 4.5 9.5 4 10 4Z" fill="#3776AB" />
          <path d="M12.5 22C14 22 15.5 21 15.5 19V16.5H12V15.5H17C18.7 15.5 20 14.2 20 12.5C20 10.8 18.7 9.5 17 9.5H15.5V11C15.5 13 14 14.5 12 14.5H8.5C7 14.5 6 15.5 6 17V20.5C6 22 7.5 22 9 22H12.5ZM14 20C13.5 20 13 19.5 13 19C13 18.5 13.5 18 14 18C14.5 18 15 18.5 15 19C15 19.5 14.5 20 14 20Z" fill="#FFD343" />
        </svg>
      ), 
      desc: 'Flask, Django REST, scripting, automation scripts', 
      bg: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=400',
      fullDesc: 'Master dynamic developer scripts, task automation triggers, file parsing engines, and agile web service structures using standard web APIs.',
      duration: '6 Weeks (~90 Hours)',
      syllabus: [
        'Python syntax foundations, data structures, and comprehensions classes',
        'Fast REST APIs designs using Flask and Django REST Framework blueprints',
        'SQLAlchemy and Django ORM models for structured PostgreSQL queries',
        'Automated file processing, data scraping modules, and CSV reports logger'
      ],
      roles: ['Python Services Developer', 'Automation Scripting Specialist']
    },
  ];

  // Specific Mentor detailed profiles data for clicking preview
  const mentors = [
    {
      id: 'john-smith',
      name: 'John Smith',
      role: 'Senior Java Architect',
      experience: '12+ Years Experience | Ex-Oracle Tech Lead',
      initials: 'JS',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=350&h=350',
      bio: 'John has over a decade of enterprise design history. He led the JDBC driver team components at Oracle Bangalore, specializing in double-entry transactional security ledger layers and high-concurrency multi-tenant software models.',
      skills: ['Core Java Enterprise', 'Spring Security OAuth2', 'Hibernate Core', 'High Volume PostgreSQL'],
      rating: '4.95/5.0',
      studentsNum: '1,450+ Graduates',
      nextClassSlot: 'Thursday, 6:00 PM IST (Java Microservices Masterclass)'
    },
    {
      id: 'rahul-mehta',
      name: 'Rahul Mehta',
      role: 'DevOps & Systems Specialist',
      experience: '10+ Years Experience | Ex-Microsoft DevOps',
      initials: 'RM',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=350&h=350',
      bio: 'Rahul spent 5 years inside Microsoft Azure developer groups. He specializes in setting up continuous deployment systems, containerized cloud load balancers, secure credential structures, and automated server testing logs.',
      skills: ['Docker Orchestration', 'Jenkins CI/CD Automations', 'Ansible Server Plays', 'AWS Multi-region Cloud'],
      rating: '4.91/5.0',
      studentsNum: '1,120+ Graduates',
      nextClassSlot: 'Friday, 4:00 PM IST (AWS Deployment Pipelines Walkthrough)'
    },
    {
      id: 'priya-sharma',
      name: 'Priya Sharma',
      role: 'Lead Frontend Developer',
      experience: '8+ Years Experience | Ex-Wipro Frontend Lead',
      initials: 'PS',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=350&h=350',
      bio: 'Priya is passionate about performant reactive web frameworks. She built core banking dashboards at Wipro digital, mastering React custom hook abstractions, client state routers, state caches, and responsive layouts.',
      skills: ['React Hooks Core', 'Angular State Managers', 'TypeScript Designs', 'Responsive Tailwind Styling'],
      rating: '4.98/5.0',
      studentsNum: '1,860+ Graduates',
      nextClassSlot: 'Saturday, 11:00 AM IST (Scalable Client State Masterclass)'
    }
  ];

  const benefits = [
    { 
      title: 'Live Projects', 
      icon: <Layers className="w-6 h-6 text-blue-400" />, 
      desc: 'Work on production-ready systems mirroring the core architectural requirements of active digital enterprises.',
      fullDesc: 'Immerse yourself inside agile coding squads. You will build and scale double-entry transaction ledgers, write unit test suites, deploy container clusters, and learn core backend security modules from day one.',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600&h=400',
      slogan: 'Real-world tech stacks, zero boilerplate copy.',
      features: [
        'Implement production-ready double-entry ledger safety rules',
        'Build real-time cache structures using Redis streams',
        'Configure Dockerized microservice integration platforms',
        'Achieve massive coverage with structured JUnit and integration test suites'
      ]
    },
    { 
      title: 'Industry Mentors', 
      icon: <Users className="w-6 h-6 text-emerald-400" />, 
      desc: 'Receive direct daily guidance from veteran Software Architects with 10+ years of engineering experience.',
      fullDesc: 'Learn straight from industry veterans who have architected high-scale systems at Oracle, Microsoft, and top digital agencies. Get daily code reviews, backend system optimization logs, and architectural mentorship.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600&h=400',
      slogan: 'Direct 1-on-1 mentorship, daily standups.',
      features: [
        'Engage in direct face-to-face code debugging and optimization sessions',
        'Formulate production-grade systems architectures with custom diagrams',
        'Participate in agile review cycles and sprint planning boards',
        'Receive direct mock code review pull requests from Senior Architects'
      ]
    },
    { 
      title: 'Certification', 
      icon: <Award className="w-6 h-6 text-indigo-400" />, 
      desc: 'Earn an industry-vetted project training certificate with a unique verifiable token for resume matching.',
      fullDesc: 'Obtain a digitally verifiable, token-stamped training certificate of merit detailing your capstone project architectures, verified microservices metrics, and cloud repository footprints. Perfect for sharing directly onto LinkedIn or candidate portals.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600&h=400',
      slogan: 'Verified project credits to boost candidate rank.',
      features: [
        'Secure a custom-signed digital credential verified via blockchain hash',
        'Document and represent 120+ hours of physical platform construction workload',
        'Showcase dynamic architecture blueprints directly tied to your credential link',
        'Integrate project credentials to bypass standardized initial vetting gates'
      ]
    },
    { 
      title: 'Placement Support', 
      icon: <Briefcase className="w-6 h-6 text-purple-400" />, 
      desc: 'Benefit from dedicated profile matching, 50+ hiring partner linkages, and ongoing job placement pipeline alerts.',
      fullDesc: "Accelerate your career path with Moriah's direct placement grid. We sync your final verified capstone code profiles directly with 50+ hiring partners and product-based corporations actively scouting for hands-on technical talent.",
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600&h=400',
      slogan: 'Direct recruitment paths with 50+ partner firms.',
      features: [
        'Directly submit live project repositories to talent advisors and team leads',
        'Receive exclusive referrals to top-tier enterprise product engineering teams',
        'Access a dedicated internal hiring dashboard updated daily',
        'Get custom placement counseling matching you with optimal roles'
      ]
    },
    { 
      title: 'Resume Building', 
      icon: <FileText className="w-6 h-6 text-pink-400" />, 
      desc: 'Transform your resume with dedicated technical writeups of complex microservices and cloud deployments.',
      fullDesc: 'Upgrade your professional portfolio. Our mentors guide you in translating complex engineering efforts (e.g. JWT filters, AWS RDS replicas, Redis caches) into clear, standard technical bullet points that pass automated recruiting screens with flying colors.',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600&h=400',
      slogan: 'Optimized candidate profiles highlighting robust features.',
      features: [
        'Author highly targeted project entries for your LinkedIn and Github resume',
        'Quantify architecture outcomes with solid scale metrics (e.g., TPS throughput, query times)',
        'Design portfolio landing pages displaying your live running system previews',
        'Receive expert layout critiques from professional engineering recruiters'
      ]
    },
    { 
      title: 'Interview Prep', 
      icon: <GraduationCap className="w-6 h-6 text-amber-400" />, 
      desc: 'Participate in weekly mock interview drills, code challenges, and live whiteboard DSA problem-solving sessions.',
      fullDesc: 'Shatter recruiter evaluations with massive confidence. We simulate real corporate coding loops, standard security design assessments, behavioral standups, and live whiteboard algorithms drills to ensure you are outstanding under pressure.',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600&h=400',
      slogan: 'Simulated tech loops, continuous feedback.',
      features: [
        'Simulate high-pressure whiteboard code walkthroughs with senior leads',
        'Formulate production-tier systems patterns regarding latency and memory',
        'Optimize answers for standard situational behavioral frameworks (STAR methodology)',
        'Participate in live DSA challenges covering dynamic programming'
      ]
    },
  ];

   const projectPortfolios = {
    'banking': {
      title: 'Retail Banking System',
      subtitle: 'Transactional Safety & Audit Engine',
      desc: 'A robust online banking engine handling authenticated customer portals, account transaction ledgers, interest run schedules, and instant wire transfers.',
      arch: 'Three-tier architecture with a REST API layer, JPA transaction context managers, and Spring Security method-level access control.',
      tech: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'JUnit 5'],
      features: ['Double-entry transactional ledger database consistency', 'OAuth2 login integration', 'Scheduled job automation for end-of-day balances', 'PDF Statement generators'],
      image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=600&h=400'
    },
    'ecommerce': {
      title: 'E-Commerce Platform',
      subtitle: 'High-Concurrency Product Catalog & Orders',
      desc: 'A multi-vendor ecommerce system managing real-time inventory adjustments, compound pricing structures, dynamic checkout systems, and integration pipelines.',
      arch: 'Microservice-oriented containing decoupled inventory, order processing, and payment validation pipelines.',
      tech: ['React', 'Spring Boot', 'Docker', 'Redis Cache', 'MySQL'],
      features: ['Distributed lock prevention for flash inventory', 'Search & filter caching using Redis', 'Responsive shopping cart state sync', 'Structured invoice generation'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=400'
    },
    'crm': {
      title: 'Enterprise CRM Application',
      subtitle: 'Customer Engagement & Pipeline Tracker',
      desc: 'An automated workflow system tracking customer touchpoints, lead assignment queues, communication timelines, and interactive statistics.',
      arch: 'Service-driven application featuring an event dispatcher for instant notification alert alerts.',
      tech: ['React', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Chart.js'],
      features: ['Dynamic counselor assignment queues', 'Interactive follow-up activity logs', 'Bulk CSV parsing and CSV lead exporter', 'Live template engines for automated emails'],
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600&h=400'
    },
    'hrms': {
      title: 'HR Management System',
      subtitle: 'Staff Allocation & Payroll Tracker',
      desc: 'An administrative workspace designed to handle employee rosters, leave request approvals, visual department hierarchy indexes, and monthly payroll slips.',
      arch: 'Enterprise structure implementing clean MVC patterns with rigorous layer validation and domain object mapping.',
      tech: ['Angular', 'Java', 'Spring Web', 'AWS RDS', 'Hibernate'],
      features: ['Unified role-restricted workspace controls', 'Salary calculating engines and dynamic payroll triggers', 'Drag and drop team structural mapper', 'Comprehensive attendance logging audits'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=400'
    }
  };

  const testimonials = [
    {
      text: "This training program helped me gain practical knowledge and build real confidence. I learned more in 2 months than in my entire college degree. I got placed as a Software Developer in a top MNC with a great salary package!",
      name: "Ankit Verma",
      role: "Software Developer at TCS",
      tech: "Java Full Stack Graduate",
      stars: 5,
    },
    {
      text: "The mentor-guided capstones gave my resume huge credibility. When interviewers asked about AWS deployments and microservices concurrency, I could explain my Retail Banking project in deep architectural detail. Highly recommended!",
      name: "Prerna Sharma",
      role: "Cloud Engineer at Cognizant",
      tech: "AWS & DevOps Graduate",
      stars: 5,
    },
    {
      text: "The placement support and mock interviews were exceptional. Amit Verma, my dedicated counselor, scheduled 3 mock drills that aligned exactly with my actual technical evaluations. The training is 100% practical.",
      name: "Rajesh Soni",
      role: "React developer at Wipro",
      tech: "React Core Graduate",
      stars: 5,
    },
  ];

  const faqs = [
    { q: "What is the duration of the Project Training Program?", a: "The duration ranges from 6 to 12 weeks depending on the selected stream. Most courses are structured to offer 4 hours of intensive practical logs per day, including coding sprints and live project deployments." },
    { q: "Will I receive an industry-recognized certificate?", a: "Yes. Upon completing your final milestone evaluations and successfully presenting your capstone project, you will be issued a verifiable digital Training Certificate which can be embedded in your professional profiles." },
    { q: "Is job placement support guaranteed?", a: "While we do not offer simulated guarantees, we provide authentic placement support including resume audits, mock interviews, and direct matching with our roster of 50+ partner companies. Our graduates successfully maintain an 85% career conversion rate." },
    { q: "What are the prerequisites for enrollment?", a: "A basic understanding of introductory programming structures is recommended. No specialized advanced degree is required. Our program includes a 1-week pre-course package designed to build foundational programming concepts." },
    { q: "Do you offer online and offline hybrid classes?", a: "Yes! You can choose between 100% Online interactive live lectures or hands-on Physical Classroom training at our state-of-the-art labs. Both modes follow the same intensive, mentor-led curriculum." }
  ];

  // Smooth scroll helper
  const scrollToForm = () => {
    document.getElementById('lead-form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen text-[#f1f5f9] font-sans overflow-x-hidden cyber-grid pt-[76px]">
      
      {/* Dynamic Static Ambient Glow Circles */}
      <div className="absolute top-1/4 left-1/10 w-[450px] h-[450px] bg-blue-500/8 rounded-full blur-[100px] pointer-events-none -z-28" />
      <div className="absolute top-2/3 right-1/10 w-[550px] h-[550px] bg-purple-500/8 rounded-full blur-[110px] pointer-events-none -z-28" />
      <div className="absolute bottom-10 left-1/3 w-[350px] h-[350px] bg-cyan-500/8 rounded-full blur-[90px] pointer-events-none -z-28" />

      {/* 1. Bulletproof Fixed Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-header shadow-lg shadow-black/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800/40 rounded-lg transition-all focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-300" />
              ) : (
                <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <MoriahLogo />
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            <a href="#about" className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors">Overview</a>
            <a href="#benefits" className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors">Benefits</a>
            <a href="#technologies" className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors">Technologies</a>
            <a href="#projects" className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors">Projects</a>
            <a href="#mentors" className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors">Mentors</a>
            {/* <a href="#testimonials" className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors">Testimonial</a> */}
            {/* <a href="#faq" className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors">FAQ</a> */}
            <a href="#contact" className="text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              id="header_admin_portal_btn"
              onClick={onNavigateToAdmin}
              className="text-xs font-bold px-2.5 sm:px-3.5 py-2 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 flex items-center gap-1.5 transition-all shadow-md bg-slate-900/60"
            >
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Admin Center</span>
            </button>
            <button 
              onClick={scrollToForm}
              className="text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg shadow-md transition-all shadow-blue-500/10 cursor-pointer"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </header>

      {/* Floating Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[76px] left-0 right-0 z-40 bg-[#0a0f1c]/90 border-b border-white/10 overflow-hidden lg:hidden shadow-2xl backdrop-blur-xl"
          >
            <div className="px-6 py-5 flex flex-col gap-3 text-left">
              <a 
                href="#about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>Overview</span>
                <span className="text-[10px] text-slate-500 font-mono">01</span>
              </a>
              <a 
                href="#benefits" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>Benefits</span>
                <span className="text-[10px] text-slate-500 font-mono">02</span>
              </a>
              <a 
                href="#technologies" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>Technologies</span>
                <span className="text-[10px] text-slate-500 font-mono">03</span>
              </a>
              <a 
                href="#projects" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>Projects</span>
                <span className="text-[10px] text-slate-500 font-mono">04</span>
              </a>
              <a 
                href="#mentors" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>Mentors</span>
                <span className="text-[10px] text-slate-500 font-mono">05</span>
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>Testimonial</span>
                <span className="text-[10px] text-slate-500 font-mono">06</span>
              </a>
              <a 
                href="#faq" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>FAQ</span>
                <span className="text-[10px] text-slate-500 font-mono">07</span>
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-blue-400 transition-colors py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>Contact Us</span>
                <span className="text-[10px] text-slate-500 font-mono">08</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Notification (If registered successfully) */}
      <AnimatePresence>
        {successLeadName && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl bg-emerald-600 text-white py-3.5 px-5 rounded-xl shadow-2xl z-50 font-medium text-sm flex flex-col sm:flex-row items-center justify-between gap-3 border border-emerald-500"
          >
            <span className="flex items-center gap-2 text-left">
              <CheckCircle className="w-5 h-5 flex-shrink-0 text-white" />
              <span>Registered Successfully! Thank you <strong>{successLeadName}</strong>. Our counselors will contact you shortly.</span>
            </span>
            <div className="flex gap-2.5">
              <a href="#thank-you-screen" className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-xs transition-colors font-semibold">Next Steps</a>
              <button onClick={onClearSuccess} className="text-white/80 hover:text-white text-xs underline">Dismiss</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6 text-left" id="hero_content_block">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack &amp; Cloud Specializations</span>
            </div>
            
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-5.5xl tracking-tight text-white leading-[1.3] text-left">
              <span className="text-gradient">Become Industry Ready with</span>{" "}
              <span className="inline-flex items-center bg-blue-600 border border-blue-400 text-white rounded-xl px-3.5 py-1 mx-1 font-mono text-2xl sm:text-3xl lg:text-4xl shadow-lg shadow-blue-500/35 select-none relative z-10 whitespace-nowrap [-webkit-text-fill-color:white] align-middle mt-1.5 mb-1.5">
                {typedHeadingWord}
                <span className="inline-block w-1 h-5 sm:h-7 bg-white ml-2 animate-pulse" />
              </span>{" "}
              <span className="text-gradient font-extrabold">Project Training</span>
            </h1>

            {/* Typing animation for 2nd and 3rd lines */}
            <div className="bg-slate-900/40 border border-white/5 rounded-xl p-4 min-h-[96px] backdrop-blur-md flex flex-col justify-center">
              <div className="font-mono text-sm sm:text-base text-blue-400 flex items-center gap-1.5 font-semibold">
                <span className="text-slate-500"></span>
                <span>{typedLine2}</span>
                {typedLine2.length > 0 && typedLine3.length === 0 && (
                  <span className="w-2 h-4 bg-blue-400 animate-pulse inline-block" />
                )}
              </div>
              <div className="font-mono text-[13px] sm:text-sm text-cyan-400 flex items-center gap-1.5 mt-2 font-medium">
                {typedLine3.length > 0 ? (
                  <>
                    <span className="text-slate-600"></span>
                    <span>{typedLine3}</span>
                    <span className="w-1.5 h-3.5 bg-cyan-400 animate-pulse inline-block" />
                  </>
                ) : (
                  <span className="text-slate-600 italic text-xs">...</span>
                )}
              </div>
            </div>
            
            <p className="text-base text-slate-400 max-w-xl leading-relaxed">
              Build production capstones (double-entry audit engines, flash inventory eCommerce, fully real-time pipelines) under ex-Oracle, ex-Microsoft system architects guidance. Obtain verified training credits.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                id="hero_cta_enroll"
                onClick={scrollToForm}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all"
              >
                Enroll Now
              </button>
              <button 
                id="hero_cta_consult"
                onClick={scrollToForm}
                className="px-6 py-3.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-bold hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>Free Consultation</span>
                <ArrowRight className="w-4 h-4 text-blue-400" />
              </button>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-6 border-t border-white/5 flex items-center gap-6">
              <div className="flex -space-x-2.5">
                <div className="w-10 h-10 rounded-full border-2 border-[#070a13] bg-blue-600 flex items-center justify-center font-bold text-xs text-white">S</div>
                <div className="w-10 h-10 rounded-full border-2 border-[#070a13] bg-purple-600 text-purple-100 flex items-center justify-center font-semibold text-xs text-white">A</div>
                <div className="w-10 h-10 rounded-full border-2 border-[#070a13] bg-emerald-600 text-emerald-100 flex items-center justify-center font-semibold text-xs text-white">M</div>
                <div className="w-10 h-10 rounded-full border-2 border-[#070a13] bg-amber-600 text-amber-100 flex items-center justify-center font-semibold text-xs text-white">R</div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-white text-base">5000+</span>
                  <div className="flex text-amber-500"><Star className="w-4 h-4 fill-current animate-pulse" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current animate-pulse" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
                </div>
                <p className="text-xs text-slate-400 font-medium">Engineers trained under professional mentorship</p>
              </div>
            </div>
          </div>

          {/* Hero Illustration (Desktop Mockup upgraded with Custom Generated Asset) */}
          <div className="lg:col-span-5 relative" id="hero_illustration_block">
            <div className="relative mx-auto max-w-[440px] lg:max-w-none">
              {/* Blur backdrop plate */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-3xl rotate-2 scale-102 blur-2xl" />
              
              <div className="relative rounded-2xl border border-white/10 p-2 shadow-2xl overflow-hidden bg-slate-950 flex flex-col">
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 text-[10px] text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-blue-400 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Moriah Sandbox Live
                  </span>
                  <div className="w-3" />
                </div>
                
                {/* Real-time generated image card instead of mock text */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img 
                    src="/src/assets/images/moriah_hero_dashboard_1782197908322.jpg" 
                    alt="Moriah Tech Labs Dashboard Mockup" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  {/* Floating Tech overlays */}
                  <div className="absolute top-3 left-3 bg-slate-900/90 border border-white/10 rounded px-2 py-1 text-[9px] font-mono text-cyan-300">
                    Spring Boot &amp; AWS Managed
                  </div>
                </div>

                {/* Interactive log simulation panel underneath */}
                <div className="p-3.5 bg-slate-950/80 font-mono text-[10px] text-slate-400 border-t border-white/5 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-400 font-semibold">&gt;_ MORIAH ENGINE STATUS:</span>
                    <span className="text-emerald-400 font-bold">ONLINE (100% SECURE)</span>
                  </div>
                  <p className="text-slate-500 text-[9px] leading-relaxed">
                    Active container groups synchronized seamlessly. Connect with 50+ recruiting firms instantly.
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -right-3 bg-slate-900/95 rounded-xl shadow-2xl p-3.5 border border-white/10 flex items-center gap-2.5 max-w-[210px]">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white leading-tight">100% Practical</h4>
                  <p className="text-[9.5px] text-cyan-400 font-mono leading-none mt-0.5">Job Ready Sprints</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Program Overview Section */}
      <section id="about" className="py-16 bg-slate-950/15 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-blue-400">Program Overview</h2>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white text-gradient">Why Core Practical Projects?</h3>
            <p className="text-slate-400 text-sm">
              Our framework is specifically designed to bridge the structural gap between classical academic theory and modern industry requirements. Learn standard enterprise software patterns.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Visual Classroom elements / Training Program Image */}
            <div className="lg:col-span-12 xl:col-span-5 relative group overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-slate-950/20 p-2 text-left flex flex-col justify-between">
              <div className="relative h-64 sm:h-80 lg:h-full min-h-[340px] w-full rounded-xl overflow-hidden select-none">
                <img 
                  src="/src/assets/images/team_discussion.png" 
                  alt="Team discussion session during project training" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-left">
                  <span className="text-[10px] font-mono font-bold uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full">Active Training Labs</span>
                  <h4 className="font-heading font-extrabold text-white text-base mt-2">Team Discussion &amp; Architecture</h4>
                  <p className="text-[11px] text-slate-300 leading-snug mt-1">Our candidates mapping microservice schemas, database logs, and deployment networks directly alongside technical team leads.</p>
                </div>
              </div>
            </div>

            {/* Practical learning details cards */}
            <div className="lg:col-span-12 xl:col-span-7 flex flex-col justify-between gap-6">
              <div className="bg-slate-900/60 p-6 sm:p-7 rounded-2xl border border-white/10 shadow-xl space-y-5 text-left backdrop-blur-md">
                <h4 className="font-heading font-extrabold text-lg text-white">What makes our academy different?</h4>
                
                <ul className="space-y-3">
                  <li className="flex gap-3 items-start">
                    <div className="w-5.5 h-5.5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-500/20">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white leading-snug">Strict Anti-Copy Environment</h5>
                      <p className="text-xs text-slate-400">Every student builds their code block from scratch. Zero boilerplate copy-paste allowed.</p>
                    </div>
                  </li>

                  <li className="flex gap-3 items-start">
                    <div className="w-5.5 h-5.5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-500/20">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white leading-snug">Comprehensive Code Reviews</h5>
                      <p className="text-xs text-slate-400">Get line-by-line developer pull reviews directly from real team architects.</p>
                    </div>
                  </li>

                  <li className="flex gap-3 items-start">
                    <div className="w-5.5 h-5.5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-500/20">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white leading-snug">Continuous Cloud Deployments</h5>
                      <p className="text-xs text-slate-400">Learn to build, containerize, script, and launch real-world digital solutions to AWS clusters.</p>
                    </div>
                  </li>
                </ul>

                <button 
                  onClick={scrollToForm}
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Book Free Career Orientation Call</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="p-5 bg-slate-900/40 rounded-xl border border-white/5 shadow-sm flex items-start gap-4 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-500/25 mt-0.5">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-sm">10% Theory &amp; 90% Practice</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                      We ditch boring slides. Learning happens strictly inside active IDEs compiling rest schemas daily.
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-slate-900/40 rounded-xl border border-white/5 shadow-sm flex items-start gap-4 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/25 mt-0.5">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-white text-sm">Daily Scrums &amp; Standups</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                      Adopt enterprise project team patterns. Coordinate integration blocker dependencies daily.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Benefits Section */}
      <section id="benefits" className="py-16 bg-slate-900/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-blue-400">Why choose us?</h2>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white text-gradient">Benefits of Project Training</h3>
            <p className="text-slate-400 text-sm">
              Elevate your software profile from static learner to competent project contributor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((b, i) => (
              <button 
                key={i} 
                type="button"
                onClick={() => setSelectedBenefit(b)}
                className="glow-card p-6 rounded-xl flex flex-col items-start text-left cursor-pointer group w-full relative transition-all duration-300 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="flex justify-between items-center w-full mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/10 group-hover:scale-110 transition-transform duration-300">
                    {b.icon}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold opacity-80 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                    <span>Explore Benefit</span>
                    <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
                <h4 className="font-heading font-bold text-white text-base mb-2">{b.title}</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed flex-grow">{b.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Technologies Section with PREVIEW AND DESCRIPTION WITH IMAGE */}
      <section id="technologies" className="py-16 bg-slate-950/15 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-cyan-400">Syllabus Ecosystem</h2>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white text-gradient">Technologies You Will Master</h3>
            <p className="text-slate-400 text-sm">
              Our program covers industry-standard modern software stacks. <strong>Click any technology card</strong> to view its comprehensive curriculum, developer career paths, and syllabus preview with illustration!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {technologies.map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedTechInfo(t);
                }}
                className="p-4.5 rounded-xl text-left bg-slate-900/50 border border-white/5 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all group cursor-pointer flex flex-col h-full items-start"
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="p-2.5 bg-white/5 rounded-lg group-hover:bg-blue-600/15 group-hover:scale-110 transition-all border border-white/5">
                    {t.icon}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold opacity-80 group-hover:opacity-100 flex items-center gap-1">
                    <span>Review</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
                <h4 className="font-heading font-bold text-white text-sm sm:text-base mb-1">{t.name}</h4>
                <p className="text-[11px] text-slate-400 leading-snug flex-grow">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Modal for Technology Preview with Illustration, Description, and Details */}
        <AnimatePresence>
          {selectedTechInfo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTechInfo(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-[#0d1222] rounded-2xl shadow-2xl border border-white/10 p-5 sm:p-7 max-w-xl w-full text-left overflow-hidden z-10"
              >
                {/* Header Section */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/10">
                      {selectedTechInfo.icon}
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-cyan-300 uppercase tracking-widest bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-800/20">Specialization Details</span>
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mt-1">{selectedTechInfo.name} Core Track</h3>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedTechInfo(null)}
                    className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Main Image, Description and Curriculum */}
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden h-[160px] border border-white/5 shadow-md">
                    <img 
                      src={selectedTechInfo.image} 
                      alt={selectedTechInfo.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1222] to-transparent opacity-60" />
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-2 bg-slate-900/90 border border-white/10 px-2.5 py-1 rounded text-[10.5px] font-mono text-white">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>{selectedTechInfo.duration}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedTechInfo.fullDesc}
                  </p>

                  <div>
                    <h5 className="font-semibold text-xs tracking-wider text-slate-400 font-mono uppercase mb-2">Curriculum Syllabus Overview</h5>
                    <ul className="space-y-2">
                      {selectedTechInfo.syllabus.map((topic, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 stroke-[2] mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-white/5">
                    <h5 className="font-semibold text-xs tracking-wider text-slate-400 font-mono uppercase mb-2">Targeted Career Roles</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTechInfo.roles.map((role, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-900 text-cyan-300 text-[10px] font-mono rounded border border-white/5">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5.5 flex gap-3 h-12">
                  <button 
                    onClick={() => setSelectedTechInfo(null)}
                    className="flex-1 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-xs font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setInterestedTechnology(selectedTechInfo.name);
                      setSelectedTechInfo(null);
                      scrollToForm();
                    }}
                    className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 6. Capstone Projects Showcase */}
      <section id="projects" className="py-16 bg-slate-900/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-blue-400">Capstone Portfolio</h2>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-gradient text-white">Live Project Experience</h3>
            <p className="text-slate-400 text-sm">
              Discover the high-scale enterprise modules you will design, assemble, write test specs, and deploy in the course modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
            {Object.entries(projectPortfolios).map(([key, proj]) => (
              <div 
                key={key} 
                className="rounded-2xl border border-white/5 overflow-hidden flex flex-col bg-slate-950/20 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
              >
                {/* Image preview */}
                <div className="relative h-48 w-full overflow-hidden border-b border-white/5">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] font-mono font-bold uppercase text-blue-400 bg-slate-950/80 backdrop-blur border border-blue-500/30 px-3 py-1 rounded-full">
                    {key === 'banking' ? 'Spring Boot + Security' : key === 'ecommerce' ? 'React + Cache Layer' : key === 'crm' ? 'Enterprise React CRM' : 'Angular + DB Schema'}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow items-start">
                  <h4 className="font-heading font-bold text-white text-xl mb-1">{proj.title}</h4>
                  <p className="text-xs font-mono text-cyan-400 mb-3">{proj.subtitle}</p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">{proj.desc}</p>
                  <button 
                    onClick={() => setSelectedPortfolio(key)}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 hover:underline cursor-pointer group/btn mt-auto"
                  >
                    <span>View Live Project</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for detail views of Capstone Specifications */}
        <AnimatePresence>
          {selectedPortfolio && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPortfolio(null)}
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative bg-[#0d1222] rounded-2xl shadow-2xl border border-white/10 p-6 max-w-lg w-full overflow-y-auto max-h-[90vh] text-left z-10"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 font-bold tracking-wider uppercase bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/15">Specs Sheet</span>
                    <h3 className="font-heading font-bold text-xl text-white mt-1.5">{projectPortfolios[selectedPortfolio].title}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{projectPortfolios[selectedPortfolio].subtitle}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedPortfolio(null)}
                    className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Portfolio Image Preview */}
                <div className="h-44 w-full rounded-xl overflow-hidden border border-white/10 mb-4 select-none">
                  <img 
                    src={projectPortfolios[selectedPortfolio].image} 
                    alt={projectPortfolios[selectedPortfolio].title} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                  <p className="text-slate-300">{projectPortfolios[selectedPortfolio].desc}</p>
                  
                  <div className="p-3.5 bg-slate-900 border border-white/5 rounded-lg">
                    <h5 className="font-semibold text-[11px] uppercase tracking-wider text-slate-400 font-mono mb-1">Architectural Layer</h5>
                    <p className="text-xs text-slate-350">{projectPortfolios[selectedPortfolio].arch}</p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-xs tracking-wider text-slate-400 font-mono uppercase mb-2">Core Features Developed</h5>
                    <ul className="space-y-2">
                      {projectPortfolios[selectedPortfolio].features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex gap-2 items-start text-xs text-slate-300">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 stroke-[3]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                    {projectPortfolios[selectedPortfolio].tech.map((tc, tIdx) => (
                      <span key={tIdx} className="px-2 py-1 bg-slate-900 text-slate-300 text-[10px] font-mono rounded border border-white/10">
                        {tc}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setInterestedTechnology(projectPortfolios[selectedPortfolio].tech[0]);
                    setSelectedPortfolio(null);
                    
                  }}
                  className="w-full mt-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all text-center cursor-pointer"
                >
                  Close
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal for detail views of Benefits Spotlight */}
        <AnimatePresence>
          {selectedBenefit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedBenefit(null)}
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="relative bg-[#0d1222] rounded-2xl shadow-2xl border border-white/10 p-6 max-w-lg w-full overflow-y-auto max-h-[90vh] text-left z-10"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider uppercase bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/15">Benefit Spotlight</span>
                    <h3 className="font-heading font-bold text-xl text-white mt-1.5">{selectedBenefit.title}</h3>
                    <p className="text-xs text-slate-450 font-mono mt-0.5">{selectedBenefit.slogan}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedBenefit(null)}
                    className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Modal Benefit Image Preview */}
                <div className="h-44 w-full rounded-xl overflow-hidden border border-white/10 mb-4 select-none">
                  <img 
                    src={selectedBenefit.image} 
                    alt={selectedBenefit.title} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                  <p className="text-slate-300">{selectedBenefit.fullDesc}</p>
                  
                  <div>
                    <h5 className="font-semibold text-xs tracking-wider text-slate-400 font-mono uppercase mb-2">Why This Matters For Your Career</h5>
                    <ul className="space-y-2">
                      {selectedBenefit.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex gap-2 items-start text-xs text-slate-300">
                          <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 stroke-[3]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedBenefit(null);
                    scrollToForm();
                  }}
                  className="w-full mt-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all text-center cursor-pointer"
                >
                  Schedule A Call To Discuss Your Goals
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 7. Enhanced Mentors Profiles with real professional photos and PREVIEW MODALS */}
      <section id="mentors" className="py-16 bg-slate-950/15 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-cyan-400">Our Experts</h2>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-gradient text-white">Meet Your Mentors</h3>
            <p className="text-slate-400 text-sm">
              Learn directly from veteran software development managers. Click a mentor's portrait card to preview their background and class schedules!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {mentors.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMentor(m)}
                className="bg-slate-900/40 hover:bg-slate-900/70 rounded-xl border border-white/5 p-5 text-center flex flex-col items-center hover:border-blue-500/40 transition-all cursor-pointer group"
              >
                {/* Real high-fidelity avatar image */}
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-blue-500/20 group-hover:border-blue-500 transition-all shadow-md relative">
                  <img 
                    src={m.image} 
                    alt={m.name} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="font-heading font-bold text-white text-base sm:text-lg leading-tight group-hover:text-blue-400 transition-colors">{m.name}</h4>
                <p className="text-xs text-blue-400 font-semibold mb-1 mt-0.5">{m.role}</p>
                <p className="text-[10px] text-slate-400 font-mono mb-3">{m.experience}</p>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {m.bio}
                </p>
                <div className="mt-4 pt-3 border-t border-white/5 w-full text-[10.5px] text-cyan-400 font-mono font-bold flex items-center justify-center gap-1">
                  <span>View Profile</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Modal for Mentor Profile Preview */}
        <AnimatePresence>
          {selectedMentor && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedMentor(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              />
              
              {/* Content Panel */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-[#0d1222] rounded-2xl shadow-2xl border border-white/10 p-5 sm:p-6 max-w-md w-full text-left overflow-y-auto max-h-[90vh] z-10"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-heading font-bold text-lg text-white">Mentor Credentials Review</h3>
                  <button 
                    onClick={() => setSelectedMentor(null)}
                    className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-5 text-xs sm:text-sm">
                  <div className="flex items-center gap-3.5 pb-4 border-b border-white/5">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/30">
                      <img 
                        src={selectedMentor.image} 
                        alt={selectedMentor.name} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-white text-base">{selectedMentor.name}</h4>
                      <p className="text-xs text-blue-400 font-semibold">{selectedMentor.role}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{selectedMentor.experience}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h5 className="font-semibold text-xs tracking-wider text-slate-400 font-mono uppercase text-left">Biography</h5>
                    <p className="text-slate-300 leading-relaxed text-left text-xs sm:text-sm">
                      {selectedMentor.bio}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-semibold text-xs tracking-wider text-slate-400 font-mono uppercase text-left">Core Domain Expertise</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMentor.skills.map((skill, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-900 text-cyan-300 text-[10px] font-mono rounded border border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 bg-blue-500/10 border border-blue-500/15 rounded-lg space-y-1">
                    <h5 className="font-semibold text-[10.5px] uppercase tracking-wider text-blue-400 font-mono flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Next Interactive Doubt Class Slot</span>
                    </h5>
                    <p className="text-xs text-slate-300 font-semibold leading-relaxed">
                      {selectedMentor.nextClassSlot}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 font-mono text-[11px] text-slate-400">
                    <span>Performance Rating: <strong className="text-amber-400">{selectedMentor.rating}</strong></span>
                    <span>Trained: <strong className="text-white">{selectedMentor.studentsNum}</strong></span>
                  </div>
                </div>

                <div className="mt-6 flex gap-2.5 h-10.5">
                  <button 
                    onClick={() => setSelectedMentor(null)}
                   className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
                  >
                    Close
                  </button>
                  {/* <button 
                    onClick={() => {
                      setSelectedMentor(null);
                      scrollToForm();
                    }}
                    className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
                  >
                    <span>Schedule 1:1 Orientation</span>
                  </button> */}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* 8. Testimonials Section */}
      <section id="testimonials" className="py-16 bg-slate-900/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-blue-400">Reviews</h2>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-gradient text-white">What Our Students Say</h3>
            <p className="text-slate-400 text-sm">
              True, verifiable placement transformations. Read experiences from our recent cohorts.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-slate-900/40 border border-white/10 rounded-2xl p-6 sm:p-8 relative backdrop-blur-md">
            <div className="flex gap-0.5 text-amber-500 mb-4">
              {Array.from({ length: testimonials[currentTestimonialIndex].stars }).map((_, idx) => (
                <Star key={idx} className="w-5 h-5 fill-current" />
              ))}
            </div>

            <p className="text-slate-300 italic text-base sm:text-lg leading-relaxed mb-6 text-left">
              &ldquo;{testimonials[currentTestimonialIndex].text}&rdquo;
            </p>

            <div className="flex items-center justify-between text-left">
              <div>
                <h4 className="font-heading font-bold text-white text-sm sm:text-base">{testimonials[currentTestimonialIndex].name}</h4>
                <p className="text-xs text-slate-400">{testimonials[currentTestimonialIndex].role}</p>
                <span className="text-[10px] font-mono text-cyan-300 font-bold mt-1.5 inline-block bg-[#070a13] border border-white/5 px-2.5 py-0.5 rounded">
                  {testimonials[currentTestimonialIndex].tech}
                </span>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentTestimonialIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="w-11 h-11 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/5 text-slate-300 transition-all cursor-pointer"
                >
                  ← 
                </button>
                <button 
                  onClick={() => setCurrentTestimonialIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="w-11 h-11 border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/5 text-slate-300 transition-all cursor-pointer"
                >
                  → 
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Statistics Counter Section */}
      <section className="py-12 bg-slate-950/20 text-white border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center" id="statistics_widget">
          <div>
            <span className="block font-heading font-extrabold text-3xl sm:text-4xl text-blue-400">5000+</span>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-mono mt-1">Students Trained</p>
          </div>
          <div>
            <span className="block font-heading font-extrabold text-3xl sm:text-4xl text-emerald-400">1200+</span>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-mono mt-1">Projects Launched</p>
          </div>
          <div>
            <span className="block font-heading font-extrabold text-3xl sm:text-4xl text-amber-500">85%</span>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-mono mt-1">Placement rate</p>
          </div>
          <div>
            <span className="block font-heading font-extrabold text-3xl sm:text-4xl text-purple-400">50+</span>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-mono mt-1">partner Employers</p>
          </div>
        </div>
      </section>

      {/* 10. FAQ Section */}
      <section id="faq" className="py-16 bg-slate-900/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <h2 className="text-xs font-bold font-mono tracking-widest uppercase text-blue-400">Information Desk</h2>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-gradient text-white">Frequently Asked Questions</h3>
            <p className="text-slate-400 text-sm">
              Find answers to details concerning career conversions, timelines, evaluations, and certification.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, i) => (
              <div 
                key={i} 
                className="bg-slate-900/40 border border-white/8 rounded-xl overflow-hidden transition-all text-left"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                  className="w-full px-5 py-4 flex items-center justify-between text-slate-200 hover:text-white font-medium text-sm sm:text-base cursor-pointer"
                >
                  <span>{f.q}</span>
                  {activeFAQ === i ? <ChevronUp className="w-5 h-5 text-blue-400" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                </button>
                
                <AnimatePresence>
                  {activeFAQ === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3 bg-slate-950/20">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Lead Capture Form Section */}
      <section id="lead-form-section" className="py-16 bg-slate-950/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest">Apply Today</span>
            <h3 className="font-heading font-bold text-2xl sm:text-4xl text-gradient text-white">Get Program Details </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              Please declare your qualifications and preferred technology track. Registered leads trigger notification logs in the administrator counselor cockpit instantly!
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-slate-900/60 p-6 sm:p-9 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md text-left">
            
            {/* Form Tag */}
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Full name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black font-mono tracking-widest uppercase text-slate-200">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your first and last name"
                    className="w-full bg-slate-950 border border-white/12 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors h-11 font-medium"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black font-mono tracking-widest uppercase text-slate-200">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@yourtechdomain.com"
                    className="w-full bg-slate-950 border border-white/12 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors h-11 font-medium"
                  />
                </div>

                {/* Mobile number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black font-mono tracking-widest uppercase text-slate-200">Contact Number *</label>
                  <input 
                    type="tel" 
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="Provide active cell number (+91 xxxxx xxxxx)"
                    className="w-full bg-slate-950 border border-white/12 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors h-11 font-medium"
                  />
                </div>

                {/* Academic qualification qualification */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black font-mono tracking-widest uppercase text-slate-200">Academic Qualification</label>
                  <select 
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full bg-slate-950 border border-white/12 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors h-11 font-medium"
                  >
                    <option value="B.Tech">B.Tech / AMIE / BE</option>
                    <option value="M.Tech">M.Tech / ME</option>
                    <option value="BCA">BCA / MCA</option>
                    <option value="B.Sc">B.Sc / M.Sc Computer Science</option>
                    <option value="Other">Other Non-CS Stream Degree</option>
                  </select>
                </div>

                {/* Technology Track selection */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black font-mono tracking-widest uppercase text-slate-200">Interested Specialization Technology</label>
                  <select 
                    value={interestedTechnology}
                    onChange={(e) => setInterestedTechnology(e.target.value)}
                    className="w-full bg-slate-950 border border-white/12 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors h-11 font-medium"
                  >
                    <option value="Java">Java Advanced track</option>
                    <option value="Spring Boot">Spring Boot &amp; Microservices</option>
                    <option value="React">React Core Frontend special</option>
                    <option value="Angular">Angular Enterprise modular</option>
                    <option value="AWS">AWS Cloud infrastructure</option>
                    <option value="Docker">Docker Containers deployment</option>
                    <option value="DevOps">DevOps CI/CD automation</option>
                    <option value="Python">Python REST backend utilities</option>
                  </select>
                </div>

                {/* Preferred format */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black font-mono tracking-widest uppercase text-slate-200">Format Modality Mode</label>
                  <div className="grid grid-cols-2 gap-2 h-11">
                    <button
                      type="button"
                      onClick={() => setTrainingMode(TrainingMode.ONLINE)}
                      className={`rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${trainingMode === TrainingMode.ONLINE ? 'bg-blue-600 border-blue-500 text-white shadow-md' : 'bg-slate-950 border-white/10 text-slate-300 hover:bg-slate-800'}`}
                    >
                      Online Sprints
                    </button>
                    <button
                      type="button"
                      onClick={() => setTrainingMode(TrainingMode.OFFLINE)}
                      className={`rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${trainingMode === TrainingMode.OFFLINE ? 'bg-blue-600 border-blue-500 text-white shadow-md' : 'bg-slate-950 border-white/10 text-slate-300 hover:bg-slate-800'}`}
                    >
                      Physical Labs
                    </button>
                  </div>
                </div>

              </div>

              {/* Remarks messaging */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black font-mono tracking-widest uppercase text-slate-200">Candidate Message Remarks (Optional)</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Declare any specific background details or learning speed requirements..."
                  rows={2}
                  className="w-full bg-slate-950 border border-white/12 rounded-xl p-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors font-medium"
                />
              </div>

              {/* Simulated CAPTCHA protection */}
              <div className="space-y-2 pt-4 border-t border-white/5">
                <label className="block text-xs font-black font-mono tracking-widest uppercase text-slate-200">CAPTCHA Security verification *</label>
                <p className="text-[10px] text-slate-400 mb-1 leading-relaxed">Please enter the security verification characters shown below:</p>
                
                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                  <div className="bg-slate-950 border border-white/12 rounded-xl px-4 py-2 flex items-center justify-between select-none sm:w-48 h-11">
                    <span className="font-mono text-base font-black tracking-widest text-[#38bdf8] line-through select-none skew-x-12 pr-2">
                      {captchaCode}
                    </span>
                    <button 
                      type="button" 
                      onClick={generateCaptcha}
                      className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer pl-3 border-l border-white/10 font-mono font-bold"
                    >
                      Refresh
                    </button>
                  </div>
                  
                  <div className="flex-grow space-y-1">
                    <input 
                      type="text" 
                      required
                      value={captchaInput}
                      onChange={(e) => {
                        setCaptchaInput(e.target.value);
                        setCaptchaError(false);
                      }}
                      placeholder="Enter Code"
                      className={`w-full bg-slate-950 border rounded-xl px-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors h-11 font-semibold ${captchaError ? 'border-red-500 focus:border-red-500' : 'border-white/12'}`}
                    />
                    {captchaError && (
                      <p className="text-[10px] font-mono font-bold text-red-500 mt-1">
                        ✕ Incorrect security code. Please try again!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit CTA button */}
              <button
                type="submit"
                id="submit_lead_form_btn"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/10 transition-all flex items-center justify-center gap-2 cursor-pointer pt-3"
              >
                <CheckCircle className="w-4 h-4 text-white" />
                <span>Submit Enroll Form</span>
              </button>
            </form>

            {/* Quick Action Desk at the bottom */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
              <div className="text-center">
                <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-400 font-bold">Quick Contact Assistance Desk</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* WhatsApp Support Inquiry */}
                <a 
                  href="https://wa.me/919876543210?text=Hi%20Moriah%20Academy%20Advisors,%20I'm%20interested%20in%20advanced%20project%20training!"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    setIsJoinedWhatsApp(true);
                    if (typeof window !== 'undefined') {
                      console.log('[Google Analytics Tag] Action tracked: "whatsapp_inquiry_clicked"');
                    }
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 select-none shadow-md shadow-emerald-500/10 cursor-pointer text-center"
                  id="whatsapp_inquiry_action"
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  <span>{isJoinedWhatsApp ? "WhatsApp Chat Triggered" : "WhatsApp Inquiry Support"}</span>
                </a>

                {/* Brochure download */}
                <button 
                  onClick={() => {
                    setIsBrochureDownloaded(true);
                    if (typeof window !== 'undefined') {
                      console.log('[Google Analytics Tag] Action tracked: "brochure_downloaded"');
                    }

                    // Capture current React state values directly (guaranteed to be current)
                    const pdfName = submittedName || fullName || '—';
                    const pdfEmail = submittedEmail || email || '—';
                    const pdfMobile = submittedMobile || mobileNumber || '—';
                    const pdfQual = qualification || '—';
                    const pdfTech = interestedTechnology || '—';
                    const pdfMode = trainingMode || '—';
                    const pdfMsg = message || '';

                    // Generate PDF with user's filled form details
                    const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
                    const refId = `MTL-${Date.now().toString().slice(-8)}`;

                    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Moriah Tech Labs – Enrollment Summary</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6fb; color: #1a1a2e; }
    .page { max-width: 720px; margin: 0 auto; background: #fff; padding: 0 0 40px 0; }

    /* Header */
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 60%, #0ea5e9 100%); padding: 36px 40px 28px; color: #fff; }
    .header-top { display: flex; justify-content: space-between; align-items: flex-start; }
    .brand { font-size: 22px; font-weight: 800; letter-spacing: 0.5px; }
    .brand span { color: #93c5fd; }
    .ref-badge { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); padding: 5px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; letter-spacing: 1px; }
    .header-title { margin-top: 18px; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; }
    .header-sub { margin-top: 6px; font-size: 13px; color: #bfdbfe; font-weight: 500; }

    /* Status bar */
    .status-bar { background: #0f172a; color: #fff; padding: 12px 40px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; }
    .status-pill { background: #10b981; color: #fff; padding: 3px 10px; border-radius: 20px; font-weight: 700; font-size: 10px; letter-spacing: 0.5px; }

    /* Body */
    .body { padding: 36px 40px 0; }

    /* Section */
    .section { margin-bottom: 28px; }
    .section-title { font-size: 10px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #2563eb; border-bottom: 2px solid #dbeafe; padding-bottom: 8px; margin-bottom: 16px; }

    /* Fields grid */
    .fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .field { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 14px; }
    .field.full { grid-column: 1 / -1; }
    .field-label { font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #64748b; margin-bottom: 4px; }
    .field-value { font-size: 14px; font-weight: 600; color: #0f172a; word-break: break-word; }
    .field-value.highlight { color: #1d4ed8; }

    /* Info box */
    .info-box { background: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #2563eb; border-radius: 8px; padding: 16px 18px; margin-bottom: 28px; }
    .info-box-title { font-size: 12px; font-weight: 700; color: #1e40af; margin-bottom: 6px; }
    .info-box p { font-size: 12px; color: #3b82f6; line-height: 1.6; }

    /* Next steps */
    .steps { list-style: none; }
    .step { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #374151; }
    .step:last-child { border-bottom: none; }
    .step-num { background: #2563eb; color: #fff; width: 22px; height: 22px; border-radius: 50%; font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }

    /* Footer */
    .footer { background: #0f172a; color: #94a3b8; padding: 20px 40px; text-align: center; font-size: 11px; line-height: 1.8; margin-top: 36px; }
    .footer strong { color: #e2e8f0; }
    .footer .disclaimer { margin-top: 8px; font-size: 10px; color: #64748b; }
  </style>
</head>
<body>
<div class="page">

  <div class="header">
    <div class="header-top">
      <div class="brand">Moriah <span>Tech Labs</span></div>
      <div class="ref-badge">REF: ${refId}</div>
    </div>
    <div class="header-title">Enrollment Registration Summary</div>
    <div class="header-sub">Project-Based Training Program · Industry-Ready Curriculum</div>
  </div>

  <div class="status-bar">
    <span>Submitted: ${submittedAt} IST</span>
    <span class="status-pill">✓ REGISTERED</span>
  </div>

  <div class="body">

    <div class="section">
      <div class="section-title">Personal Information</div>
      <div class="fields-grid">
        <div class="field full">
          <div class="field-label">Full Name</div>
          <div class="field-value highlight">${pdfName}</div>
        </div>
        <div class="field">
          <div class="field-label">Email Address</div>
          <div class="field-value">${pdfEmail}</div>
        </div>
        <div class="field">
          <div class="field-label">Contact Number</div>
          <div class="field-value">${pdfMobile}</div>
        </div>
        <div class="field">
          <div class="field-label">Academic Qualification</div>
          <div class="field-value">${pdfQual}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Program Preferences</div>
      <div class="fields-grid">
        <div class="field">
          <div class="field-label">Interested Technology</div>
          <div class="field-value highlight">${pdfTech}</div>
        </div>
        <div class="field">
          <div class="field-label">Training Mode</div>
          <div class="field-value">${pdfMode}</div>
        </div>
        ${pdfMsg ? `<div class="field full">
          <div class="field-label">Candidate Message / Remarks</div>
          <div class="field-value">${pdfMsg}</div>
        </div>` : ''}
      </div>
    </div>

    <div class="info-box">
      <div class="info-box-title">📌 What Happens Next?</div>
      <p>Our counseling team will review your registration and contact you within <strong>24 hours</strong> on your provided email and phone number. Please keep your phone available for a brief orientation call.</p>
    </div>

    <div class="section">
      <div class="section-title">Your Journey — Next Steps</div>
      <ul class="steps">
        <li class="step"><span class="step-num">1</span><span><strong>Confirmation Call</strong> — A counselor will call you within 24 hours to discuss your goals and program fit.</span></li>
        <li class="step"><span class="step-num">2</span><span><strong>Orientation Session</strong> — Attend a free live demo class to experience our teaching methodology.</span></li>
        <li class="step"><span class="step-num">3</span><span><strong>Batch Allocation</strong> — Get placed in the right batch based on your schedule and technology preference.</span></li>
        <li class="step"><span class="step-num">4</span><span><strong>Project Training Begins</strong> — Start building real-world projects from Day 1 with industry mentors.</span></li>
      </ul>
    </div>

  </div>

  <div class="footer">
    <strong>Moriah Tech Labs</strong> · Project-Based Training Program<br/>
    📧 info@moriahtechlabs.com · 📞 +91 98765 43210<br/>
    <div class="disclaimer">This document is an auto-generated enrollment confirmation. Keep it for your records. Reference ID: ${refId}</div>
  </div>

</div>
</body>
</html>`;

                    // Open in new tab and trigger print-to-PDF
                    const printWindow = window.open('', '_blank');
                    printWindow.document.write(htmlContent);
                    printWindow.document.close();
                    printWindow.onload = () => {
                      setTimeout(() => {
                        printWindow.focus();
                        printWindow.print();
                      }, 400);
                    };
                  }}
                  className={`w-full py-3 px-4 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${isBrochureDownloaded ? 'bg-slate-800 border-emerald-500/20 text-emerald-400' : 'bg-slate-950 hover:bg-slate-900 border-white/10 text-slate-300'}`}
                  id="brochure_download_action"
                  type="button"
                >
                  <Download className={`w-4 h-4 ${isBrochureDownloaded ? 'text-emerald-400 animate-bounce' : 'text-slate-500'}`} />
                  <span>{isBrochureDownloaded ? "PDF Generated!" : "Download PDF"}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12. Thank You Screen Overlay Segment */}
      <AnimatePresence>
        {successLeadName && (
          <section id="thank-you-screen" className="py-16 bg-[#0a0f1c]/80 border-b border-white/5 font-sans relative z-10 text-left">
            <div className="absolute top-0 inset-x-0 w-full h-[1px] bg-gradient-to-r from-blue-500 via-emerald-500 to-transparent" />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900/60 p-6 sm:p-10 rounded-2xl border border-white/10 shadow-2xl relative">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">Priority Pipeline Logged</span>
              
              <div className="mt-4 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 flex-shrink-0 animate-pulse">
                  <CheckCircle2 className="w-9 h-9 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">Next Steps for Candidate: {successLeadName}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                    Our enrollment counselors have received your technical specifications. Your dossier is placed inside the active counselor routing queue under SARAH JENKINS.
                  </p>
                </div>
              </div>

              {/* Dynamic steps breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                <div className="p-4 bg-slate-950 border border-white/5 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-blue-400 font-mono text-[10px] block">STEP 01: PROFILE COMPILATION</span>
                  <p className="text-slate-300 font-semibold mt-1">Counselor Validation</p>
                  <p className="text-slate-400">Sarah Jenkins will inspect your declared qualifications for class fits.</p>
                </div>
                <div className="p-4 bg-slate-950 border border-white/5 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-amber-400 font-mono text-[10px] block">STEP 02: TECHNICAL AUDIT PORTAL</span>
                  <p className="text-slate-300 font-semibold mt-1">Doubt Orientation Call</p>
                  <p className="text-slate-400">Receive a phone callback to configure coding requirements &amp; batch availability.</p>
                </div>
                <div className="p-4 bg-slate-950 border border-white/5 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-purple-400 font-mono text-[10px] block">STEP 03: CLUSTER COMMENCES</span>
                  <p className="text-slate-300 font-semibold mt-1">Code Compilation Sprints</p>
                  <p className="text-slate-400">Access dynamic developer credentials and start building microservice repositories.</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => {
                    setIsCounselingBooked(true);
                    alert("Immediate callback logged. Standby!");
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-lg shadow-md transition-all text-center h-11 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-white" />
                  <span>{isCounselingBooked ? "Orientation Callback Placed!" : "Schedule Callback Instantly"}</span>
                </button>
                <button 
                  onClick={onClearSuccess}
                  className="sm:px-6 py-3 border border-white/12 text-slate-400 hover:text-white rounded-lg text-xs font-bold transition-all h-11 cursor-pointer"
                >
                  Dismiss Overlay Screen
                </button>
              </div>

              {/* Tip highlight */}
              <div className="text-xs text-slate-400 pt-5 font-mono flex items-center justify-center gap-1.5 border-t border-white/5 mt-6">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Admin Sandbox active! Toggle <strong>"Admin Center"</strong> at top to review full lead dossiers details!</span>
              </div>
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* 20. Dedicated Contact Us Section */}
      <section id="contact" className="py-20 bg-[#0a0f1c]/70 relative border-b border-white/5 z-10 text-left">
        <div className="absolute inset-0 bg-blue-600/2 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold font-mono text-blue-400 uppercase tracking-widest">Connect with Us</span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-gradient text-white">We'd Love to Hear From You</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
              Have questions regarding curriculum, physical lab access, or live sandbox deployments? Get in touch with our team today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Left: Contact Info Info Cards */}
            <div className="space-y-4 flex flex-col justify-between">
              
              <div className="p-6 bg-slate-900/60 rounded-xl border border-white/10 shadow-sm flex items-start gap-4 backdrop-blur-md">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0 border border-blue-500/25">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-base">Office Headquarters</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Moriah Tech Labs Tower, Sector 3, HSR Layout, Bengaluru, Karnataka - 560102
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-900/60 rounded-xl border border-white/10 shadow-sm flex items-start gap-4 backdrop-blur-md">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/25">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-base">Call Support</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Office Hotline: +91 98765 43210 <br />
                    Counselors Desk: +91 98765 43211
                  </p>
                </div>
              </div>

              <div className="p-6 bg-slate-900/40 rounded-xl border border-white/5 shadow-sm flex items-start gap-4 backdrop-blur-md">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0 border border-cyan-500/25">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-base">Email Inquiry</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Corporate: orientation@moriahtechlabs.com <br />
                    Admissions Support: registrar@moriahtechlabs.com
                  </p>
                </div>
              </div>

            </div>

            {/* Right: Quick Callback request desk */}
            <div className="bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md flex flex-col justify-between text-left relative overflow-hidden">
              {isCallbackRequested ? (
                <div className="py-12 text-center space-y-4 flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-white text-lg">Proposal Registered!</h4>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
                      Thank you! Your phone callback proposal is locked in. A senior academic advisor will reach out to you within the next 2 hours.
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsCallbackRequested(false)}
                    className="text-xs text-blue-400 hover:text-blue-300 underline font-semibold font-mono"
                  >
                    Submit another callback request
                  </button>
                </div>
              ) : (
                <div className="flex flex-col justify-between h-full gap-4">
                  <div>
                    <h4 className="font-heading font-extrabold text-white text-lg mb-2">Request a Callback</h4>
                    <p className="text-xs text-slate-400 mb-4 leading-normal">
                      Leave your details and our student coordinator will map you with a technical mentor on active duty.
                    </p>
                    
                    <div className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black tracking-widest text-slate-200 block text-left">Your Contact No. *</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="e.g. +91 98765 43210" 
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 h-10 font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black tracking-widest text-slate-200 block text-left">Technology of Interest *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Java, Full Stack, DevOps" 
                          className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 h-10 font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setIsCallbackRequested(true);
                      if (typeof window !== 'undefined') {
                        console.log('[Google Analytics Tag] Action tracked: "callback_priority_requested"');
                      }
                    }}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                  >
                    <span>Submit Priority Callback Proposal</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 13. Public Footer with upgraded brand */}
      <footer className="bg-slate-950 border-t border-white/5 text-white py-12 relative z-10 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo brand footer description */}
          <div className="space-y-4">
            <MoriahLogo />
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Accelerating professional technical capability with structured containers, double-entry transactional ledgers, and comprehensive codebase audits.
            </p>
            <p className="text-xs font-mono text-cyan-400/80 pt-1">
              Currently: Bengaluru, IN | Network Nodes: Online
            </p>
          </div>

          {/* Programs quick links */}
          <div className="space-y-3">
            <h5 className="text-xs uppercase tracking-widest font-mono text-slate-400 font-bold">Programs Tracks</h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><button onClick={() => { setInterestedTechnology('Java'); scrollToForm(); }} className="hover:text-white hover:underline transition-colors text-left">Java Enterprise Track</button></li>
              <li><button onClick={() => { setInterestedTechnology('Spring Boot'); scrollToForm(); }} className="hover:text-white hover:underline transition-colors text-left">Spring Boot JPA Microservices</button></li>
              <li><button onClick={() => { setInterestedTechnology('React'); scrollToForm(); }} className="hover:text-white hover:underline transition-colors text-left">React Performance Client SPA</button></li>
              <li><button onClick={() => { setInterestedTechnology('DevOps'); scrollToForm(); }} className="hover:text-white hover:underline transition-colors text-left">CI/CD &amp; DevOps Pipelines</button></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3" id="footer_contact_info">
            <h5 className="text-xs uppercase tracking-widest font-mono text-slate-400 font-bold">Contact Details</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex gap-2 items-center">
                <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                <span>Call Center: +91 98765 43210</span>
              </li>
              <li className="flex gap-2 items-center">
                <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
                <span>Support: orientation@moriahtechlabs.com</span>
              </li>
              <li className="flex gap-2 items-start">
                <MapPin className="w-3.5 h-3.5 text-slate-500 mt-0.5" />
                <span>Moriah Tech Labs Tower, Sector 3, HSR Layout, Bengaluru, Karnataka - 560102</span>
              </li>
            </ul>
          </div>

          {/* Developer shortcut details override links */}
          <div className="space-y-4">
            <h5 className="text-xs uppercase tracking-widest font-mono text-slate-400 font-bold">Admin Management</h5>
            <p className="text-xs text-slate-400 leading-relaxed font-sans font-medium">
              counselor workspace and interactive follow-up tools are ready inside.
            </p>
            <button 
              onClick={onNavigateToAdmin}
              className="text-xs font-bold w-full py-2.5 bg-slate-900 text-white hover:bg-slate-800 transition-all border border-white/10 rounded-lg text-center"
            >
              Access Admin CRM Cockpit
            </button>
          </div>
        </div>

        {/* Legal copyright and disclaimer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/5 text-center text-xs text-slate-500">
          <p>© 2026 Moriah Tech Labs. All Rights Reserved. Spring Boot architecture and PostgreSQL logs are simulated securely.</p>
        </div>
      </footer>
    </div>
  );
}
