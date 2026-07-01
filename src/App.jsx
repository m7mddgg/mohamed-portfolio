import React, { useEffect, useState, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import {
  Mail, Code, Terminal, Cpu, Award, ChevronDown,
  Briefcase, FolderGit2, Wrench, Trophy, Phone,
  MapPin, Users, Zap, Brain, Database, GitBranch,
  ExternalLink, ArrowUp, GraduationCap, Workflow,
  Eye, BookOpen, Rocket, Send, Menu, X, FileText,
} from 'lucide-react';

/* ───────── Brand SVG Icons (removed from lucide v1.x) ───────── */
const Github = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);
const Linkedin = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

/* ───────── Animated Counter ───────── */
const Counter = ({ from = 0, to, duration = 2, decimals = 0 }) => {
  const [count, setCount] = useState(Number(from).toFixed(decimals));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(from, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setCount(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [isInView, from, to, duration, decimals]);

  return <span ref={ref}>{count}</span>;
};

/* ───────── Fade-In Wrapper ───────── */
const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const y = direction === 'up' ? 40 : direction === 'down' ? -40 : 0;
  const x = direction === 'left' ? 40 : direction === 'right' ? -40 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ───────── Section Title ───────── */
const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <FadeIn className="mb-12 text-center">
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyberCyan/5 border border-cyberCyan/20 text-cyberCyan text-xs font-mono uppercase tracking-widest mb-4">
      <Icon size={14} />
      {subtitle}
    </div>
    <h2 className="text-3xl md:text-4xl font-extrabold text-white">{title}</h2>
  </FadeIn>
);

/* ───────── Glass Card ───────── */
const GlassCard = ({ children, className = '', hover = true }) => (
  <div className={`bg-slate-900/40 border border-slate-800 rounded-2xl backdrop-blur-md overflow-hidden ${hover ? 'transition-all duration-300 hover:border-cyberCyan/30 hover:shadow-[0_0_30px_-10px_rgba(0,240,255,0.15)]' : ''} ${className}`}>
    {children}
  </div>
);

/* ═══════════════════════════════════════════════════════ */
/*                         DATA                          */
/* ═══════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
  { label: 'CV', href: '/cv.html', external: true },
];

const STATS = [
  { icon: Award, label: 'Academic GPA', value: 3.1, decimals: 1, color: 'cyan' },
  { icon: Code, label: 'Codeforces Problems', value: 600, prefix: '+', color: 'neon' },
  { icon: Users, label: 'Community Members', value: 80, prefix: '+', color: 'cyan' },
  { icon: Rocket, label: 'Students Oriented', value: 560, prefix: '+', color: 'neon' },
];

const EXPERIENCE = [
  {
    role: 'Co-Lead',
    org: 'ICPC BUA',
    type: 'Competitive Programming Community',
    period: 'Oct. 2025 – Present',
    location: 'Assiut, Egypt',
    points: [
      'Co-led a competitive programming community of 80+ active members at Badr University in Assiut, driving engagement in algorithmic problem-solving.',
      'Organized and led a major university orientation session, coordinating a team of 9 members to introduce over 560 new students to the ICPC environment.',
    ],
  },
];

const PROJECTS = [
  {
    title: 'Tafayyu (تفيُّؤ)',
    subtitle: 'Comprehensive Islamic Web App',
    year: '2026',
    icon: BookOpen,
    color: 'cyan',
    points: [
      'Developed a modern, interactive Quran reader with live recitation synchronization, smart search, and auto-scrolling.',
      'Engineered an interactive memorization tracker, daily adhkar module, and smart tasbeeh with haptic feedback.',
      'Integrated accurate prayer times, Qibla compass, Hijri calendar, and offline-ready PWA capabilities using Next.js and Tailwind CSS.',
    ],
    tags: ['Next.js', 'React', 'Tailwind', 'PWA'],
    link: 'https://tafayyu-quran.vercel.app/',
  },
  {
    title: 'Cleano',
    subtitle: 'Full-Stack Web Application',
    year: '2025',
    icon: Wrench,
    color: 'cyan',
    points: [
      'Developed a comprehensive web application for managing housekeeping and cleaning services, featuring a dual-interface structure (customer portal & admin dashboard).',
      'Implemented user authentication, database integration, and order tracking systems to manage service requests efficiently.',
      'Engineered admin dashboard features including staff assignment management, revenue tracking, data visualization tools, and automated invoice generation.',
    ],
    tags: ['Full-Stack', 'Auth', 'Dashboard', 'Database'],
    link: 'https://cleano-tf.vercel.app/',
  },
  {
    title: 'VISIONAID',
    subtitle: 'Team: Binary Mind',
    year: '2025',
    icon: Eye,
    color: 'neon',
    points: [
      'Contributed to the planning and technical documentation of an AI-based assistive system.',
      'Collaborated with team members to develop a comprehensive Work Breakdown Structure (WBS) and specify functional requirements, including hardware interface specifications.',
    ],
    tags: ['AI', 'Documentation', 'Team Project'],
  },
  {
    title: 'Community Automation Workflow',
    subtitle: 'n8n Platform',
    year: '2025',
    icon: Workflow,
    color: 'cyan',
    points: [
      'Built an automated workflow connecting community registration forms directly to Google Sheets using the n8n platform.',
      'Gained foundational experience in workflow automation and system integrations, improving community data management.',
    ],
    tags: ['n8n', 'Automation', 'Google Sheets'],
  },
  {
    title: 'Learn Competitive Programming',
    subtitle: 'Community Initiative',
    year: '2025',
    icon: BookOpen,
    color: 'neon',
    points: [
      'Launched a structured project to promote algorithmic problem-solving within the student community.',
      'Directed the creation of technical and visual branding assets to engage students and encourage participation in coding competitions.',
    ],
    tags: ['Community', 'Branding', 'Education'],
  },
];

const SKILLS = {
  'Languages': { items: ['C++', 'Python', 'Java', 'C#', 'SQL'], icon: Terminal },
  'Tools & Methodologies': { items: ['Workflow Automation (n8n)', 'Git', 'Software Engineering Principles'], icon: Wrench },
  'Concepts': { items: ['OOP', 'Data Structures & Algorithms', 'Competitive Programming', 'Databases'], icon: Brain },
  'Soft Skills': { items: ['Problem Solving', 'Leadership', 'Analytical Thinking', 'Self-Learning', 'Teamwork'], icon: Zap },
};

const ACHIEVEMENTS = [
  {
    icon: Code,
    title: 'Codeforces — 600+ Problems',
    description: 'Demonstrated advanced proficiency in data structures and algorithmic optimization through solving 600+ competitive programming problems.',
    color: 'cyan',
  },
  {
    icon: Trophy,
    title: 'ECPC 2025 Contestant',
    description: 'Competed in the Egyptian Collegiate Programming Contest (ECPC) 2025, applying advanced algorithms under strict time constraints at the national level.',
    color: 'neon',
  },
];

/* ═══════════════════════════════════════════════════════ */
/*                     MAIN APP                          */
/* ═══════════════════════════════════════════════════════ */
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-darkBg text-slate-100 relative">

      {/* ──── Background Glows ──── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-cyberCyan/8 rounded-full blur-[160px]" />
        <div className="absolute top-[40%] right-[-15%] w-[700px] h-[700px] bg-cyberNeon/6 rounded-full blur-[180px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] bg-cyberCyan/5 rounded-full blur-[140px]" />
      </div>

      {/* ═══════════ NAVBAR ═══════════ */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-darkBg/80 backdrop-blur-xl border-b border-slate-800/60 shadow-lg shadow-black/20' : ''}`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <a href="#hero" className="text-lg font-extrabold tracking-tight">
            <span className="text-cyberCyan">{'<'}</span>
            <span className="text-white">MA</span>
            <span className="text-cyberCyan">{'/>'}</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                className={l.external
                  ? 'px-3 py-1.5 text-sm font-semibold text-cyberCyan border border-cyberCyan/30 rounded-lg hover:bg-cyberCyan/10 transition-all duration-300 flex items-center gap-1.5 ml-1'
                  : 'px-3 py-1.5 text-sm text-slate-400 hover:text-cyberCyan transition-colors rounded-lg hover:bg-cyberCyan/5 font-medium'
                }
              >
                {l.external && <FileText size={14} />}
                {l.label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileNav(!mobileNav)}
            className="md:hidden text-slate-400 hover:text-white transition-colors p-2"
            aria-label="Toggle navigation"
          >
            {mobileNav ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileNav && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-darkBg/95 backdrop-blur-xl border-b border-slate-800"
          >
            <div className="flex flex-col px-4 pb-4 gap-1">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target={l.external ? '_blank' : undefined}
                  rel={l.external ? 'noopener noreferrer' : undefined}
                  onClick={() => setMobileNav(false)}
                  className={l.external
                    ? 'px-3 py-2.5 text-sm font-semibold text-cyberCyan border border-cyberCyan/30 rounded-lg hover:bg-cyberCyan/10 transition-all flex items-center gap-1.5'
                    : 'px-3 py-2.5 text-sm text-slate-400 hover:text-cyberCyan transition-colors rounded-lg hover:bg-cyberCyan/5'
                  }
                >
                  {l.external && <FileText size={14} />}
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* ═══════════ HERO ═══════════ */}
      <section id="hero" className="min-h-screen flex flex-col md:flex-row justify-center items-center relative z-10 px-4 gap-12 md:gap-20 max-w-6xl mx-auto pt-20 md:pt-0">
        
        {/* Profile Image (Left on Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-56 h-56 md:w-80 md:h-80 shrink-0"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full relative"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyberCyan to-cyberNeon blur-xl opacity-60 animate-pulse" />
            <img 
              src="/profile.jpg" 
              alt="Mohamed Abdalrasoul" 
              className="relative z-10 w-full h-full object-cover rounded-full border-4 border-slate-900 shadow-[0_0_50px_rgba(0,240,255,0.2)]"
            />
          </motion.div>
        </motion.div>

        {/* Text Content (Right on Desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="text-center md:text-left max-w-2xl"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Mohamed</span>
            <br />
            <span className="text-cyberCyan">Abdalrasoul</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 font-light mb-8 leading-relaxed">
            AI & Data Science Student • Competitive Programmer • Building high-performance systems and leading technical communities.
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-10">
            <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 bg-cyberCyan/10 border border-cyberCyan/30 text-cyberCyan rounded-xl font-semibold text-sm hover:bg-cyberCyan/20 hover:border-cyberCyan/50 transition-all duration-300 hover:shadow-[0_0_25px_-5px_rgba(0,240,255,0.3)]">
              <FolderGit2 size={16} />
              View Projects
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/60 border border-slate-700 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 hover:border-slate-600 transition-all duration-300">
              <Send size={16} />
              Contact Me
            </a>
          </div>

          <div className="flex gap-5 justify-center md:justify-start">
            {[
              { Icon: Github, href: 'https://github.com/m7mddgg', hoverColor: '#00f0ff' },
              { Icon: Linkedin, href: 'https://linkedin.com/in/mohamedabdalrasoul00', hoverColor: '#00f0ff' },
              { Icon: Mail, href: 'mailto:mohamedabdalrasoul@gmail.com', hoverColor: '#ff007f' },
              { Icon: Phone, href: 'tel:+201205169491', hoverColor: '#00f0ff' },
            ].map(({ Icon, href, hoverColor }) => (
              <motion.a
                key={href}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ scale: 1.2, color: hoverColor }}
                className="text-slate-500 p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-slate-600 transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 text-slate-600"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ═══════════ ABOUT + STATS ═══════════ */}
      <section id="about" className="relative z-10 py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={Terminal} title="About Me" subtitle="whoami" />

          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <FadeIn delay={0.1} className="md:col-span-2">
              <GlassCard className="p-8 h-full relative group">
                <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Cpu size={140} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <GraduationCap size={20} className="text-cyberCyan" /> Education
                  </h3>
                  <div className="border-l-2 border-cyberCyan/30 pl-5 space-y-1">
                    <h4 className="text-lg font-semibold text-slate-200">Badr University in Assiut (BUA)</h4>
                    <p className="text-sm text-cyberCyan font-mono">Bachelor's Degree • Oct. 2024 – Jul. 2028</p>
                    <p className="text-sm text-slate-400">School of Artificial Intelligence & Data Management</p>
                    <p className="text-sm text-slate-500 mt-2">GPA: <span className="text-white font-bold">3.1</span></p>
                  </div>
                  <p className="text-slate-400 text-sm mt-6 leading-relaxed">
                    Focused on computer science core disciplines, artificial intelligence principles, and high-performance algorithmic problem-solving. Active contributor to the ICPC competitive programming community.
                  </p>
                </div>
              </GlassCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-col gap-4 h-full">
                <GlassCard className="p-5 flex items-center gap-4 flex-1">
                  <div className="p-3 rounded-xl bg-cyberCyan/10 text-cyberCyan shrink-0"><MapPin size={22} /></div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-mono">Location</p>
                    <p className="text-white font-semibold">Assiut, Egypt</p>
                  </div>
                </GlassCard>
                <GlassCard className="p-5 flex items-center gap-4 flex-1">
                  <div className="p-3 rounded-xl bg-cyberNeon/10 text-cyberNeon shrink-0"><Phone size={22} /></div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-mono">Phone</p>
                    <p className="text-white font-semibold text-sm">+20 120 516 9491</p>
                  </div>
                </GlassCard>
                <GlassCard className="p-5 flex items-center gap-4 flex-1">
                  <div className="p-3 rounded-xl bg-cyberCyan/10 text-cyberCyan shrink-0"><Mail size={22} /></div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-mono">Email</p>
                    <p className="text-white font-semibold text-sm break-all">mohamedabdalrasoul@gmail.com</p>
                  </div>
                </GlassCard>
              </div>
            </FadeIn>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <FadeIn key={s.label} delay={0.1 * i}>
                <GlassCard className="p-6 text-center">
                  <div className={`inline-flex p-3 rounded-xl mb-3 ${s.color === 'cyan' ? 'bg-cyberCyan/10 text-cyberCyan' : 'bg-cyberNeon/10 text-cyberNeon'}`}>
                    <s.icon size={22} />
                  </div>
                  <h3 className="text-3xl font-black text-white font-mono">
                    {s.prefix || ''}<Counter from={0} to={s.value} decimals={s.decimals || 0} />
                  </h3>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-mono mt-1">{s.label}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ EXPERIENCE ═══════════ */}
      <section id="experience" className="relative z-10 py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={Briefcase} title="Experience" subtitle="work history" />

          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <FadeIn key={i} delay={0.15 * i}>
                <GlassCard className="p-8 relative group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyberCyan to-cyberNeon rounded-l-2xl" />
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="text-cyberCyan font-semibold">{exp.org}</p>
                      <p className="text-sm text-slate-500">{exp.type}</p>
                    </div>
                    <div className="mt-2 md:mt-0 md:text-right shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyberCyan bg-cyberCyan/10 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 md:justify-end">
                        <MapPin size={12} /> {exp.location}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {exp.points.map((p, j) => (
                      <li key={j} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                        <span className="text-cyberCyan mt-1 shrink-0">▹</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PROJECTS ═══════════ */}
      <section id="projects" className="relative z-10 py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={FolderGit2} title="Projects" subtitle="featured work" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((proj, i) => (
              <FadeIn key={proj.title} delay={0.1 * i}>
                <GlassCard className="p-7 h-full flex flex-col group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${proj.color === 'cyan' ? 'bg-cyberCyan/10 text-cyberCyan' : 'bg-cyberNeon/10 text-cyberNeon'}`}>
                      <proj.icon size={24} />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs font-mono text-slate-600">{proj.year}</span>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className={`p-1.5 rounded-lg transition-colors ${proj.color === 'cyan' ? 'text-cyberCyan hover:bg-cyberCyan/10' : 'text-cyberNeon hover:bg-cyberNeon/10'}`} title="Visit Project">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyberCyan transition-colors">{proj.title}</h3>
                  <p className={`text-xs font-mono mb-4 ${proj.color === 'cyan' ? 'text-cyberCyan/70' : 'text-cyberNeon/70'}`}>{proj.subtitle}</p>

                  <ul className="space-y-2 flex-1">
                    {proj.points.map((p, j) => (
                      <li key={j} className="flex gap-2 text-sm text-slate-400 leading-relaxed">
                        <span className={`mt-1 shrink-0 ${proj.color === 'cyan' ? 'text-cyberCyan' : 'text-cyberNeon'}`}>▹</span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-800">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SKILLS ═══════════ */}
      <section id="skills" className="relative z-10 py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={Wrench} title="Technical Skills" subtitle="tech stack" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(SKILLS).map(([category, { items, icon: Icon }], i) => (
              <FadeIn key={category} delay={0.1 * i}>
                <GlassCard className="p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`p-2.5 rounded-xl ${i % 2 === 0 ? 'bg-cyberCyan/10 text-cyberCyan' : 'bg-cyberNeon/10 text-cyberNeon'}`}>
                      <Icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {items.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`text-sm font-medium px-4 py-2 rounded-xl border transition-all duration-200 cursor-default ${
                          i % 2 === 0
                            ? 'bg-cyberCyan/5 border-cyberCyan/20 text-cyberCyan hover:bg-cyberCyan/10 hover:border-cyberCyan/40'
                            : 'bg-cyberNeon/5 border-cyberNeon/20 text-cyberNeon hover:bg-cyberNeon/10 hover:border-cyberNeon/40'
                        }`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ACHIEVEMENTS ═══════════ */}
      <section className="relative z-10 py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon={Trophy} title="Achievements" subtitle="milestones" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACHIEVEMENTS.map((a, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <GlassCard className="p-7 relative overflow-hidden group">
                  <div className={`absolute -top-6 -right-6 w-32 h-32 rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity ${a.color === 'cyan' ? 'bg-cyberCyan' : 'bg-cyberNeon'}`} />
                  <div className="relative z-10 flex gap-5">
                    <div className={`p-4 rounded-2xl shrink-0 self-start ${a.color === 'cyan' ? 'bg-cyberCyan/10 text-cyberCyan' : 'bg-cyberNeon/10 text-cyberNeon'}`}>
                      <a.icon size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{a.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{a.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="relative z-10 py-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle icon={Send} title="Get In Touch" subtitle="contact" />

          <FadeIn>
            <GlassCard className="p-10 md:p-14" hover={false}>
              <p className="text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed">
                I'm always open to new opportunities, collaborations, and interesting conversations. Feel free to reach out!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  { icon: Mail, label: 'Email', value: 'mohamedabdalrasoul@gmail.com', href: 'mailto:mohamedabdalrasoul@gmail.com', color: 'cyan' },
                  { icon: Phone, label: 'Phone', value: '+20 120 516 9491', href: 'tel:+201205169491', color: 'neon' },
                  { icon: Linkedin, label: 'LinkedIn', value: 'mohamedabdalrasoul00', href: 'https://linkedin.com/in/mohamedabdalrasoul00', color: 'cyan' },
                  { icon: Github, label: 'GitHub', value: 'm7mddgg', href: 'https://github.com/m7mddgg', color: 'neon' },
                ].map(({ icon: Icon, label, value, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group overflow-hidden ${
                      color === 'cyan'
                        ? 'bg-cyberCyan/5 border-cyberCyan/15 hover:border-cyberCyan/40 hover:bg-cyberCyan/10'
                        : 'bg-cyberNeon/5 border-cyberNeon/15 hover:border-cyberNeon/40 hover:bg-cyberNeon/10'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg shrink-0 ${color === 'cyan' ? 'bg-cyberCyan/10 text-cyberCyan' : 'bg-cyberNeon/10 text-cyberNeon'}`}>
                      <Icon size={18} />
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <p className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">{label}</p>
                      <p className="text-sm text-white font-medium group-hover:text-cyberCyan transition-colors truncate">{value}</p>
                    </div>
                    <ExternalLink size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors shrink-0" />
                  </a>
                ))}
              </div>

              <a
                href="mailto:mohamedabdalrasoul@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyberCyan/20 to-cyberNeon/20 border border-cyberCyan/30 text-white rounded-xl font-semibold text-sm hover:from-cyberCyan/30 hover:to-cyberNeon/30 hover:border-cyberCyan/50 transition-all duration-300 hover:shadow-[0_0_35px_-8px_rgba(0,240,255,0.3)]"
              >
                <Mail size={16} />
                Say Hello
              </a>
            </GlassCard>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="relative z-10 border-t border-slate-800/60 py-8 px-4 text-center">
        <p className="text-sm text-slate-600 font-mono">
          <span className="text-cyberCyan">{'<'}</span> Designed & Built by{' '}
          <span className="text-slate-400">Mohamed Abdalrasoul</span>{' '}
          <span className="text-cyberCyan">{'/>'}</span>
        </p>
        <p className="text-xs text-slate-700 mt-2">© {new Date().getFullYear()} • All rights reserved</p>
      </footer>

      {/* ═══════════ SCROLL TO TOP ═══════════ */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showTop ? 1 : 0, scale: showTop ? 1 : 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-xl bg-cyberCyan/10 border border-cyberCyan/30 text-cyberCyan hover:bg-cyberCyan/20 hover:border-cyberCyan/50 transition-all duration-300 shadow-lg shadow-black/20"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </div>
  );
}

export default App;