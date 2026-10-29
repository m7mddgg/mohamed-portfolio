import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import gsap from 'gsap';
import {
  ArrowUpRight,
  ArrowRight,
  ExternalLink,
  FileText,
  Terminal,
  Trophy,
  Briefcase,
  Layers,
  Code2,
  X,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ChevronRight,
  Award
} from 'lucide-react';
import { cn } from './lib/utils';

/* ─── DATA CONFIGURATION ─── */
const PERSONAL_INFO = {
  name: 'Mohamed Abdalrasoul',
  initials: 'MA',
  location: 'Assiut, Egypt',
  email: 'mohamedabdalrasoul@gmail.com',
  phone: '+20 120 516 9491',
  github: 'https://github.com/m7mddgg',
  linkedin: 'https://linkedin.com/in/mohamedabdalrasoul00',
  codeforces: 'https://codeforces.com/profile/m7mddgg',
  roles: ['Backend .NET Developer', 'Competitive Programmer', 'ICPC Leader', 'CS Student'],
  bio: 'Specializing in robust backend systems, clean architecture, and competitive algorithmic optimization with an emphasis on high scalability and precision.',
};

const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Milestones', href: '#stats', id: 'stats' },
  { label: 'Certificates', href: '#certificates', id: 'certificates' },
];

const PROJECTS = [
  {
    title: 'Tafayyu (تفيُّؤ)',
    subtitle: 'Comprehensive Islamic Web App (PWA)',
    description: 'An interactive Quran and worship experience featuring real-time verse synchronization, instant global search, automated memorization tester, smart tasbeeh with haptic feedback, and offline PWA support.',
    image: '/media/templates/portfolio/work-automotive-motion.jpg',
    tags: ['Next.js 16', 'React', 'Tailwind CSS', 'PWA', 'REST APIs'],
    link: 'https://tafayyu-quran.vercel.app/',
    span: 'md:col-span-7',
    year: '2026',
    featured: true
  },
  {
    title: 'Cleano',
    subtitle: 'Housekeeping & Services Platform',
    description: 'Full-stack application with a dual-portal architecture: interactive customer booking engine and a high-performance administration dashboard with staff assignment and live revenue analytics.',
    image: '/media/templates/portfolio/work-urban-architecture.jpg',
    tags: ['React', 'Tailwind CSS', 'Dashboard', 'Admin Portal'],
    link: 'https://cleano-tf.vercel.app/',
    span: 'md:col-span-5',
    year: '2025',
    featured: true
  },
  {
    title: 'VISIONAID',
    subtitle: 'Assistive System for the Visually Impaired',
    description: 'Pioneered technical specifications and full Work Breakdown Structure (WBS) for an AI-powered assistive wearable, bridging computer vision models with real-world tactile interfaces.',
    image: '/media/templates/portfolio/work-human-perspective.jpg',
    tags: ['AI Vision', 'Systems Architecture', 'WBS', 'Binary Mind'],
    span: 'md:col-span-5',
    year: '2025',
    featured: false
  },
  {
    title: 'Community Automation Pipeline',
    subtitle: 'n8n Workflow Engine',
    description: 'Automated student registration, processing, and real-time syncing across Google Sheets and community tools, orchestrating data seamlessly for 560+ student records.',
    image: '/media/templates/portfolio/work-brand-identity.jpg',
    tags: ['n8n Engine', 'Workflow Automation', 'Integration'],
    span: 'md:col-span-7',
    year: '2025',
    featured: false
  },
];

const EXPERIENCES = [
  {
    role: 'Leader',
    organization: 'ICPC BUA',
    community: 'Competitive Programming Community',
    period: 'Sep. 2026 – Present',
    badge: 'Current Role',
    description: 'Directing the competitive programming community at Badr University in Assiut. Leading advanced curriculum strategies, algorithmic workshops, and coaching contest teams for national-level ECPC participation.',
    skills: ['Leadership', 'Algorithmic Coaching', 'Community Strategy', 'Curriculum Design']
  },
  {
    role: 'Co-Lead',
    organization: 'ICPC BUA',
    community: 'Competitive Programming Community',
    period: 'Oct. 2025 – Sep. 2026',
    badge: 'Completed',
    description: 'Co-led a core community of 80+ active problem solvers. Spearheaded the university annual orientation, mobilizing a 9-member instruction committee to introduce 560+ freshmen to competitive programming.',
    skills: ['Event Management', 'Public Speaking', 'Team Coordination', 'Mentorship']
  }
];

const SKILL_CATEGORIES = [
  {
    title: 'Programming Languages',
    icon: Terminal,
    skills: ['C#', 'C++', 'Python', 'Java', 'SQL']
  },
  {
    title: 'Backend & Web Technologies',
    icon: Code2,
    skills: ['.NET / ASP.NET Core', 'RESTful APIs', 'Next.js', 'React', 'Tailwind CSS']
  },
  {
    title: 'Core Concepts & Engineering',
    icon: Layers,
    skills: ['Data Structures & Algorithms', 'Object-Oriented Programming (OOP)', 'Database Design', 'Design Patterns']
  },
  {
    title: 'Tools & Methodologies',
    icon: Briefcase,
    skills: ['Git & GitHub', 'n8n Automation', 'Visual Studio', 'VS Code', 'Agile Planning']
  }
];

const STATS_DATA = [
  { value: 600, suffix: '+', label: 'Codeforces Solved Problems' },
  { textValue: 'Pupil', label: 'Codeforces Official Rank' },
  { value: 67, prefix: '#', label: 'ECPC 2026 Contest Day Rank' },
  { value: 560, suffix: '+', label: 'Students Mentored & Onboarded' }
];

const CERTIFICATES_DATA = [
  {
    id: 'ecpc-2026',
    title: 'The 2026 ICPC ECPC Qualifications',
    subtitle: 'Collegiate Programming Contest — Day 7',
    award: 'One-hundred Sixty-fifth Place',
    date: '19 August 2026',
    issuedBy: 'International Collegiate Programming Contest (ICPC Foundation)',
    university: 'Badr University in Assiut',
    image: '/certificates/ecpc-2026-certificate.png',
    pdf: '/certificates/ecpc-2026-certificate.pdf',
    badge: 'ECPC 2026'
  },
  {
    id: 'ecpc-2025',
    title: 'The 2025 ICPC ECPC Qualifications',
    subtitle: 'Collegiate Programming Contest — Day 7',
    award: 'Honorable Mention',
    date: '06 August 2025',
    issuedBy: 'International Collegiate Programming Contest (ICPC Foundation)',
    university: 'Badr University in Assiut',
    image: '/certificates/ecpc-2025-certificate.png',
    pdf: '/certificates/ecpc-2025-certificate.pdf',
    badge: 'ECPC 2025'
  }
];

/* ─── HELPER HOOKS & UTILITIES ─── */
const onAnchorClick = (event, href) => {
  if (!href.startsWith('#') || href.length < 2) return;
  const target = document.getElementById(href.slice(1));
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const useCountUp = (target, active, duration = 1400) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || typeof target !== 'number') return;
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
};

/* ─── PRIMITIVES & COMPONENTS ─── */
const RingLink = ({ href, children, ariaLabel, target, rel, outerClassName, innerClassName, onClick }) => {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={target}
      rel={rel ?? (target === '_blank' ? 'noreferrer' : undefined)}
      onClick={onClick ?? ((e) => onAnchorClick(e, href))}
      className={cn('group relative inline-flex shrink-0', outerClassName)}
    >
      <span
        aria-hidden="true"
        className="pf-gradient pointer-events-none absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        className={cn(
          'relative inline-flex items-center justify-center gap-1.5 rounded-full transition-colors duration-300',
          innerClassName,
        )}
      >
        {children}
      </span>
    </a>
  );
};

const SectionHeader = ({ eyebrow, lead, accent, trailing = '', subtext, viewAll, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-neutral-800" />
        <span className="text-xs tracking-[0.3em] text-neutral-400 uppercase font-mono">{eyebrow}</span>
      </div>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-[1.1] font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
            {lead} <span className="font-display font-normal italic text-neutral-300">{accent}</span> {trailing}
          </h2>
          <p className="mt-3 max-w-lg text-sm text-neutral-400 sm:text-base leading-relaxed">{subtext}</p>
        </div>
        {viewAll && (
          <RingLink
            href={viewAll.href}
            outerClassName="hidden md:inline-flex"
            innerClassName="bg-neutral-900 border border-neutral-800 px-4 py-2 text-xs text-white backdrop-blur-md hover:bg-neutral-800"
          >
            {viewAll.label}
            <ArrowRight className="size-3.5" />
          </RingLink>
        )}
      </div>
    </motion.div>
  );
};

/* ─── LOADING SCREEN ─── */
const LoadingScreen = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const WORDS = ['Architect', 'Optimize', 'Execute'];

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 2200;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      setExiting(true);
      setTimeout(onComplete, 400);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 700);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] flex flex-col justify-between p-8 bg-[#0a0a0a] text-white"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs tracking-[0.3em] text-neutral-400 uppercase font-mono">
          Mohamed Abdalrasoul • Portfolio '26
        </span>
        <span className="text-xs tracking-[0.2em] text-cyan-400 font-mono">INITIALIZING</span>
      </div>

      <div className="flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="font-display text-5xl md:text-7xl lg:text-8xl italic text-neutral-200"
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-neutral-500 font-mono tracking-wider">SYSTEM READY</span>
          <span className="font-display text-5xl md:text-7xl tabular-nums text-neutral-200">
            {String(count).padStart(3, '0')}
          </span>
        </div>
        <div className="h-[2px] w-full bg-neutral-900 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 transition-all duration-100 ease-out shadow-[0_0_12px_rgba(0,240,255,0.5)]"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

/* ─── NAVBAR ─── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    );
    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        className={cn(
          'inline-flex items-center rounded-full border border-white/10 bg-neutral-950/80 px-2.5 py-2 backdrop-blur-xl transition-all duration-300 shadow-2xl shadow-black/80',
          scrolled && 'border-white/20 bg-neutral-950/95 shadow-cyan-950/20',
        )}
      >
        {/* Monogram Logo */}
        <a
          href="#home"
          aria-label="Home"
          onClick={(e) => onAnchorClick(e, '#home')}
          className="group relative flex size-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
        >
          <span className="pf-gradient absolute inset-0 rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
          <span className="absolute inset-[1.5px] rounded-full bg-neutral-950" />
          <span className="font-display relative text-[14px] leading-none italic font-bold text-white tracking-wider">
            {PERSONAL_INFO.initials}
          </span>
        </a>

        <span className="mx-2 hidden h-4 w-px bg-neutral-800 sm:block" />

        <div className="flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => onAnchorClick(e, link.href)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm',
                  isActive
                    ? 'bg-neutral-800 text-white font-semibold shadow-inner'
                    : 'text-neutral-400 hover:bg-neutral-900 hover:text-white',
                )}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <span className="mx-2 hidden h-4 w-px bg-neutral-800 sm:block" />

        <a
          href="/cv.html"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex shrink-0"
        >
          <span className="pf-gradient pointer-events-none absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="relative inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-900 border border-neutral-800 px-3 py-1.5 text-xs text-white backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm hover:bg-neutral-800">
            <FileText className="size-3.5 text-cyan-400" />
            <span>CV</span>
          </span>
        </a>
      </div>
    </nav>
  );
};

/* ─── HERO SECTION ─── */
const Hero = ({ start = true }) => {
  const rootRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % PERSONAL_INFO.roles.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!start) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-badge', { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.1 })
        .fromTo('.name-reveal', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.1 }, '-=0.5')
        .fromTo('.lead-rise', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 }, '-=0.6')
        .fromTo('.hero-actions', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8 }, '-=0.4');
    }, rootRef);
    return () => ctx.revert();
  }, [start]);

  return (
    <section
      ref={rootRef}
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden pt-20 pb-16"
    >
      <Navbar />

      {/* Video Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          src="/media/templates/portfolio/background.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/75 backdrop-blur-[2px]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0a0a]/90 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-4xl mx-auto">
        {/* Status Pill Badge */}
        <div className="hero-badge mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-cyan-400" />
          </span>
          <span className="text-xs font-mono tracking-[0.2em] text-neutral-300 uppercase">
            Collection '26 • Open to Opportunities
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="name-reveal font-display mb-6 text-6xl leading-[0.92] tracking-tight italic text-white md:text-8xl lg:text-9xl drop-shadow-sm">
          {PERSONAL_INFO.name}
        </h1>

        {/* Dynamic Role Rotator */}
        <div className="lead-rise mb-4 flex items-center justify-center gap-2 text-xl sm:text-2xl text-neutral-200">
          <span className="text-neutral-400">A</span>
          <div className="relative h-8 sm:h-9 overflow-hidden flex items-center min-w-[240px] sm:min-w-[280px] justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="font-display absolute text-2xl sm:text-3xl italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-white font-medium"
              >
                {PERSONAL_INFO.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-neutral-400">based in {PERSONAL_INFO.location}.</span>
        </div>

        {/* Subtitle Bio */}
        <p className="lead-rise mb-10 max-w-xl text-sm sm:text-base text-neutral-400 leading-relaxed font-sans">
          {PERSONAL_INFO.bio}
        </p>

        {/* Call to Actions */}
        <div className="hero-actions inline-flex flex-wrap items-center justify-center gap-4 mb-12 sm:mb-16">
          <RingLink
            href="#work"
            outerClassName="transition-transform duration-300 hover:scale-105"
            innerClassName="bg-white px-7 py-3.5 text-sm font-semibold text-neutral-950 group-hover:bg-neutral-950 group-hover:text-white"
          >
            <span>Explore Works</span>
            <ArrowRight className="size-4" />
          </RingLink>

          <a
            href="/cv.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <span className="pf-gradient pointer-events-none absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative inline-flex items-center justify-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/80 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md group-hover:border-transparent group-hover:bg-neutral-900">
              <FileText className="size-4 text-cyan-400" />
              <span>Print / View Resume</span>
              <ArrowUpRight className="size-4 text-neutral-400 group-hover:text-white" />
            </span>
          </a>
        </div>

        {/* Scroll Down Indicator (in natural flow to prevent any overlap) */}
        <div className="flex flex-col items-center gap-2 pt-2 opacity-80">
          <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-500 uppercase">Scroll</span>
          <span className="relative block h-8 w-px overflow-hidden bg-neutral-800">
            <span className="pf-gradient animate-scroll-down absolute inset-x-0 top-0 block h-1/2 w-full" />
          </span>
        </div>
      </div>
    </section>
  );
};

/* ─── SELECTED WORKS (BENTO GRID) ─── */
const SelectedWorks = () => {
  return (
    <section id="work" className="bg-[#0a0a0a] py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Portfolio & Systems"
          lead="Featured"
          accent="projects"
          subtext="A curated selection of robust full-stack applications, system designs, and automation workflows engineered for performance."
          viewAll={{ label: 'View all repositories', href: PERSONAL_INFO.github }}
          className="mb-12 md:mb-16"
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-7"
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className={cn(
                'group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 md:p-8 transition-all duration-500 hover:border-neutral-700 hover:bg-neutral-900/70',
                project.span,
              )}
            >
              {/* Halftone / Gradient Background Texture */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="font-mono text-xs text-cyan-400 tracking-wider">
                    {project.year} • {project.subtitle}
                  </span>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-neutral-700 bg-neutral-800/80 px-3 py-1 text-xs text-neutral-300 hover:border-cyan-400 hover:text-white transition-colors"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="size-3 text-cyan-400" />
                    </a>
                  )}
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-white italic tracking-tight font-medium mb-3">
                  {project.title}
                </h3>

                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tags & Action Footer */}
              <div className="relative z-10 mt-auto pt-6 border-t border-neutral-800/60 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-neutral-800/70 px-3 py-1 text-xs text-neutral-300 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors"
                  >
                    <span>Launch</span>
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ) : (
                  <span className="text-xs text-neutral-500 font-mono">Architecture & Specs</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── LEADERSHIP & EXPERIENCE ─── */
const Experience = () => {
  return (
    <section id="experience" className="bg-[#0a0a0a] py-20 md:py-28 border-t border-neutral-900">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Leadership & Journey"
          lead="Community"
          accent="experience"
          subtext="Directing technical communities, organizing large-scale orientations, and mentoring hundreds of student developers in problem solving."
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.role + exp.period}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative flex flex-col justify-between rounded-3xl border border-neutral-800 bg-neutral-900/30 p-8 hover:border-neutral-700 hover:bg-neutral-900/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-2 rounded-full bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 text-xs font-mono text-cyan-300">
                    <Trophy className="size-3 text-cyan-400" />
                    <span>{exp.badge}</span>
                  </span>
                  <span className="text-xs font-mono text-neutral-400">{exp.period}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">
                  {exp.organization} <span className="font-display italic font-normal text-cyan-300">— {exp.role}</span>
                </h3>
                <p className="text-xs text-neutral-400 font-mono mb-4">{exp.community}</p>

                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  {exp.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800/60 flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-neutral-800/50 px-3 py-1 text-xs text-neutral-400 font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── SKILLS & EXPERTISE ─── */
const Skills = () => {
  return (
    <section id="skills" className="bg-[#0a0a0a] py-20 md:py-28 border-t border-neutral-900">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Technical Stack"
          lead="Core"
          accent="competencies"
          subtext="A breakdown of modern languages, frameworks, architecture standards, and tooling utilized in production."
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-3xl border border-neutral-800 bg-neutral-900/30 p-6 flex flex-col justify-between hover:border-neutral-700 hover:bg-neutral-900/50 transition-all duration-300"
              >
                <div>
                  <div className="mb-4 flex size-10 items-center justify-center rounded-2xl bg-neutral-800/80 text-cyan-400">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-4">{cat.title}</h3>
                  <ul className="space-y-2.5">
                    {cat.skills.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-neutral-400">
                        <span className="size-1.5 rounded-full bg-cyan-400" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─── VERIFIED STATS / MILESTONES ─── */
const Stats = () => {
  const [active, setActive] = useState(false);

  return (
    <section id="stats" className="bg-[#0a0a0a] py-20 md:py-28 border-t border-neutral-900">
      <motion.div
        onViewportEnter={() => setActive(true)}
        viewport={{ once: true, margin: '-60px' }}
        className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-16"
      >
        <SectionHeader
          eyebrow="Milestones"
          lead="Verified"
          accent="achievements"
          subtext="Measurable problem-solving milestones attained through consistent algorithmic training and national contests."
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS_DATA.map((item) => {
            const count = useCountUp(item.value, active);
            return (
              <div
                key={item.label}
                className="flex flex-col items-center sm:items-start border-t border-neutral-800 pt-8"
              >
                <span className="font-display text-5xl md:text-6xl text-white italic tabular-nums leading-none">
                  {item.prefix || ''}
                  {item.textValue ? item.textValue : count}
                  {item.suffix || ''}
                </span>
                <span className="mt-4 text-xs font-mono tracking-[0.2em] text-neutral-400 uppercase">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

/* ─── CERTIFICATES & HONORS ─── */
const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="bg-[#0a0a0a] py-20 md:py-28 border-t border-neutral-900">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Credentials & Honors"
          lead="Verified"
          accent="certificates"
          subtext="Official certificates of achievement awarded by the International Collegiate Programming Contest (ICPC Foundation)."
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CERTIFICATES_DATA.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/60"
            >
              <div>
                {/* Certificate Image Preview */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative aspect-[1.414/1] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 cursor-pointer shadow-lg group-hover:shadow-cyan-950/20"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="size-full object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-neutral-950 shadow-md">
                      <Sparkles className="size-3.5 text-cyan-600" />
                      <span>Click to Enlarge</span>
                    </span>
                  </div>
                </div>

                {/* Certificate Meta */}
                <div className="mt-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/50 px-3 py-1 text-xs font-mono text-cyan-300">
                      <Award className="size-3 text-cyan-400" />
                      <span>{cert.badge}</span>
                    </span>
                    <span className="text-xs font-mono text-neutral-400">{cert.date}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 mb-2">{cert.subtitle}</p>

                  <div className="my-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 p-3.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">Official Result</span>
                    <span className="font-display text-2xl italic font-medium text-cyan-300">{cert.award}</span>
                  </div>

                  <p className="text-xs text-neutral-400">
                    <span className="text-neutral-300">Institution:</span> {cert.university} • <span className="text-neutral-300">Issuer:</span> {cert.issuedBy}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-5 border-t border-neutral-800/70 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  <span>Preview Full Certificate</span>
                  <ArrowUpRight className="size-3.5" />
                </button>

                <a
                  href={cert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-neutral-800/70 border border-neutral-700/70 px-3.5 py-1.5 text-xs font-mono text-neutral-200 hover:bg-neutral-800 hover:text-white transition-colors"
                >
                  <FileText className="size-3 text-cyan-400" />
                  <span>Download PDF</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm font-mono text-neutral-400 inline-flex items-center gap-2 rounded-full border border-neutral-800/80 bg-neutral-900/40 px-5 py-2">
            <span className="size-1.5 rounded-full bg-cyan-400" />
            <span>Additional certifications and contest standings will be archived here as achieved.</span>
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-md"
          >
            <div className="relative max-h-[92vh] max-w-5xl w-full flex flex-col items-center">
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 p-2 rounded-full bg-neutral-800 text-white hover:bg-neutral-700 cursor-pointer"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[80vh] w-auto rounded-2xl object-contain border border-neutral-800 shadow-2xl bg-white"
              />
              <div
                onClick={(e) => e.stopPropagation()}
                className="mt-4 flex items-center gap-4 text-xs font-mono"
              >
                <a
                  href={selectedCert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 font-semibold text-black hover:bg-cyan-400 transition-colors"
                >
                  <FileText className="size-3.5" />
                  <span>Open Official PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* ─── MARQUEE ─── */
const Marquee = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 35,
        ease: 'none',
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex overflow-hidden py-4 border-y border-neutral-900 bg-neutral-950/60" aria-hidden="true">
      <div ref={trackRef} className="flex w-max shrink-0">
        {[0, 1].map((group) => (
          <div key={group} className="flex shrink-0">
            {['SCALABLE BACKEND ARCHITECTURES', 'ALGORITHMIC OPTIMIZATION', 'ASP.NET CORE & C#', 'HIGH-PERFORMANCE SYSTEMS', 'ICPC COMMUNITY LEADERSHIP'].map((phrase, i) => (
              <span
                key={i}
                className="font-display px-8 text-3xl md:text-5xl tracking-tight whitespace-nowrap text-neutral-500/80 italic font-medium"
              >
                {phrase} •
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── CONTACT & FOOTER ─── */
const Contact = () => {
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#0a0a0a] pt-16 pb-12">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          src="/media/templates/portfolio/background.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 -scale-y-100 object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/90" />
      </div>

      <Marquee />

      <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-16">
        <div className="flex flex-col items-center py-20 text-center">
          <span className="mb-4 text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase">
            Initiate Contact
          </span>
          <h2 className="text-4xl md:text-6xl font-medium text-white mb-6 tracking-tight">
            Let's build <span className="font-display italic font-normal text-neutral-300">something extraordinary</span>.
          </h2>
          <p className="max-w-md text-sm sm:text-base text-neutral-400 mb-8 leading-relaxed">
            Whether you have an upcoming project, a backend engineering opportunity, or wish to connect with competitive programming mentorship, feel free to reach out.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <RingLink
              href={`mailto:${PERSONAL_INFO.email}`}
              outerClassName="transition-transform duration-300 hover:scale-105"
              innerClassName="border border-neutral-700 bg-neutral-900/90 px-6 py-4 font-display text-xl sm:text-2xl italic text-white backdrop-blur-md group-hover:border-transparent"
            >
              <Mail className="size-5 text-cyan-400" />
              <span>{PERSONAL_INFO.email}</span>
              <ArrowUpRight className="size-4" />
            </RingLink>

            <a
              href="/cv.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-6 py-4 text-sm font-semibold text-white hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-300"
            >
              <FileText className="size-4 text-cyan-400" />
              <span>Download Formal CV (PDF)</span>
            </a>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col gap-6 border-t border-neutral-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400/70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-cyan-400" />
            </span>
            <span className="text-xs text-neutral-400 font-mono">Available for software engineering roles</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="flex size-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition-colors hover:border-white/20 hover:bg-neutral-800 hover:text-white"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex size-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition-colors hover:border-white/20 hover:bg-neutral-800 hover:text-white"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={PERSONAL_INFO.codeforces}
              target="_blank"
              rel="noreferrer"
              className="flex size-9 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition-colors hover:border-white/20 hover:bg-neutral-800 hover:text-white"
              aria-label="Codeforces"
            >
              <Terminal className="size-4" />
            </a>
          </div>

          <span className="text-xs text-neutral-500 font-mono">
            &copy; 2026 {PERSONAL_INFO.name}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

/* ─── MAIN PORTFOLIO COMPONENT ─── */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      data-slot="portfolio"
      className="min-h-screen bg-[#0a0a0a] text-neutral-100 antialiased selection:bg-cyan-500/30 selection:text-white"
    >
      <MotionConfig reducedMotion="user">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
        <Hero start={!isLoading} />
        <SelectedWorks />
        <Experience />
        <Skills />
        <Stats />
        <Certificates />
        <Contact />
      </MotionConfig>
    </div>
  );
}
