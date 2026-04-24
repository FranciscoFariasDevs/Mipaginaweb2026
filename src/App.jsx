import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ── Data ─────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'facilpos', title: 'FacilPos', subtitle: 'Sistema POS de escritorio',
    desc: 'Software de Punto de Venta completo con gestión de inventario, turnos, cuadratura de caja y sistema de licencias. Electron + Node.js, funciona sin internet.',
    tags: ['Electron', 'Node.js', 'SQLite', 'JavaScript'], image: '/project-facilpos.png',
    status: 'prod', icon: '🏪', github: null,
  },
  {
    id: 'metal', title: 'Metal Golpe X', subtitle: 'Videojuego de acción 2D — Chile',
    desc: 'Juego estilo Metal Slug ambientado en Santiago. Godot 4.5 con mecánicas de arcade, sistema de fichas, personajes históricos jugables y parallax scrolling.',
    tags: ['Godot 4.5', 'GDScript', 'Pixel Art', 'Game Dev'], image: '/project-metal.png',
    status: 'dev', icon: '🎮', github: 'https://github.com/FranciscoFariasDevs',
  },
  {
    id: 'perro', title: 'PC del Perro Cobarde', subtitle: 'App interactiva con IA',
    desc: 'Emula la icónica computadora de Courage the Cowardly Dog. Respuestas sarcásticas en tiempo real con OpenAI, interfaz retro con scanlines y glow verde.',
    tags: ['React', 'Node.js', 'OpenAI API', 'CSS3'], image: '/project-perro.png',
    status: 'done', icon: '🖥️', github: 'https://github.com/FranciscoFariasDevs',
  },
  {
    id: 'poxys', title: 'Poxys', subtitle: 'Red social deportiva móvil',
    desc: 'App Flutter tipo Strava para runners y ciclistas chilenos. Tracking GPS, rutas, estadísticas y comunidad social. Backend Supabase con tiempo real.',
    tags: ['Flutter', 'Dart', 'Supabase', 'GPS'], image: null,
    status: 'dev', icon: '🚴', github: null,
  },
  {
    id: 'rimificador', title: 'Rimificador', subtitle: 'Herramienta para artistas',
    desc: 'Web app para encontrar rimas, generar letras y asistir en la creación lírica. Perfecta para raperos, poetas y compositores.',
    tags: ['JavaScript', 'Web App', 'NLP'], image: null,
    status: 'done', icon: '🎤', github: 'https://github.com/FranciscoFariasDevs',
  },
]

const WEB_WORKS = [
  {
    title: 'Intranet Beach', url: 'https://intranet.beach.cl',
    desc: 'Intranet corporativa completa para empresa costera. Sistema de gestión interna con autenticación, dashboards y módulos administrativos.',
    tags: ['Intranet', 'Corporativo', 'Full Stack'], icon: '🏖️',
  },
  {
    title: 'Proimtec', url: 'https://www.proimtec.cl',
    desc: 'Sitio web corporativo para empresa de tecnología e ingeniería. Diseño profesional, responsive y optimizado para SEO.',
    tags: ['Web Corporativa', 'Diseño Web', 'SEO'], icon: '⚙️',
  },
]

const SKILLS = [
  { name: 'JavaScript / TypeScript', level: 90, color: '#f7df1e' },
  { name: 'React + Node.js', level: 87, color: '#61dafb' },
  { name: 'Python', level: 78, color: '#3776ab' },
  { name: 'Flutter / Dart', level: 72, color: '#54c5f8' },
  { name: 'Godot / GDScript', level: 70, color: '#478cbf' },
  { name: 'SQLite / PostgreSQL', level: 82, color: '#336791' },
  { name: 'Electron', level: 75, color: '#9feaf9' },
]

/* ── Icons ────────────────────────────────────────────── */
function IgIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
}
function LiIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
}
function GhIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
}
function MailIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
}
function ArrowIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
}

/* ── Scroll progress bar ──────────────────────────────── */
function ScrollProgress() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const fn = () => setW(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div className="scroll-progress" style={{ width: `${w}%` }} />
}

/* ── Navbar ───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = [
    ['#hero', 'Inicio'], ['#about', 'Sobre mí'], ['#projects', 'Proyectos'],
    ['#webwork', 'Trabajos Web'], ['#contact', 'Contacto'],
  ]
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-brand">
        <div className="brand-dot" />
        <span className="brand-text">Francisco Farías</span>
      </a>
      <button className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
        <span /><span /><span />
      </button>
      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {links.map(([href, label]) => (
          <li key={href}><a href={href} onClick={() => setOpen(false)}>{label}</a></li>
        ))}
      </ul>
    </nav>
  )
}

/* ── Hero ─────────────────────────────────────────────── */
function Hero() {
  const nameRef = useRef(null)

  useEffect(() => {
    // Anime.js text reveal
    import('animejs').then(({ default: anime }) => {
      if (!nameRef.current) return
      anime({
        targets: nameRef.current,
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 200,
      })
    })
  }, [])

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
      </div>

      <div className="hero-grid">
        <div className="hero-photo-container">
          <div className="hero-photo-wrapper">
            <img src="/profile.png" alt="Francisco Farías" className="hero-photo" />
            <div className="photo-ring-anim" />
          </div>
        </div>

        <div className="hero-text" ref={nameRef} style={{ opacity: 0 }}>
          <div className="hero-badge">
            <div className="badge-pulse" />
            Disponible para proyectos
          </div>

          <h1 className="hero-name">
            Francisco Javier<br />
            <span className="hero-name-accent">Farías Espinoza</span>
          </h1>

          <div className="hero-roles">
            <span className="role-chip">Ing. en Software</span>
            <span className="role-chip cyan">Game Developer</span>
            <span className="role-chip amber">Técnico Computacional</span>
          </div>

          <p className="hero-desc">
            Construyo <strong>aplicaciones de escritorio, web y móviles</strong> desde Chile 🇨🇱
            También desarrollo videojuegos y mantengo un servicio técnico de computadoras.
          </p>

          <div className="hero-ctas">
            <a href="#projects" className="btn-primary">Ver proyectos</a>
            <a href="https://www.linkedin.com/in/francisco-javier-farias-espinoza-15153a27b/" target="_blank" rel="noreferrer" className="btn-outline">LinkedIn</a>
          </div>

          <div className="hero-socials">
            <a href="https://www.instagram.com/nvdie_flow" target="_blank" rel="noreferrer" className="social-pill"><IgIcon />nvdie_flow</a>
            <a href="https://www.instagram.com/refresca_tu_nae" target="_blank" rel="noreferrer" className="social-pill"><IgIcon />refresca_tu_nae</a>
            <a href="https://github.com/FranciscoFariasDevs" target="_blank" rel="noreferrer" className="social-pill"><GhIcon />GitHub</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── About ────────────────────────────────────────────── */
function SkillBar({ name, level, color, visible }) {
  return (
    <div className="skill-item">
      <div className="skill-top">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{level}%</span>
      </div>
      <div className="skill-track">
        <div
          className={`skill-fill ${visible ? 'animated' : ''}`}
          style={{ width: `${level}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }}
        />
      </div>
    </div>
  )
}

function About() {
  const skillsRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.3 })
    if (skillsRef.current) obs.observe(skillsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" className="section fade-up">
      <div className="section-inner">
        <span className="section-label">Sobre mí</span>
        <h2 className="section-title">Mi <span>Historia</span></h2>
        <div className="section-line" />

        <div className="about-grid">
          <div className="about-text">
            <p>Soy <strong>Francisco Farías</strong>, Ingeniero en Software y Técnico Computacional de Chile. Me apasiona crear soluciones tecnológicas que resuelvan problemas reales, desde sistemas POS para negocios locales hasta videojuegos de acción.</p>
            <p>Trabajo tanto en <strong>desarrollo de software</strong> (apps de escritorio con Electron, web con React y móvil con Flutter) como en <strong>servicio técnico de computadoras</strong> bajo la marca <strong>Refresca Tu Nae</strong>.</p>
            <p>También tengo una faceta artística y creativa bajo el alias <strong>nvdie_flow</strong>, donde mezclo música, arte y tecnología. Actualmente desarrollo <strong>Metal Golpe X</strong>, un videojuego ambientado en Santiago de Chile.</p>
            <p>Mi objetivo es seguir creciendo como desarrollador full-stack y llevar mis proyectos a producción, impactando a personas reales con tecnología hecha en Chile.</p>
          </div>

          <div className="skills-panel" ref={skillsRef}>
            <h3>Stack Tecnológico</h3>
            {SKILLS.map(s => <SkillBar key={s.name} {...s} visible={visible} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Projects ─────────────────────────────────────────── */
function ProjectCard({ p, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    import('animejs').then(({ default: anime }) => {
      if (!cardRef.current) return
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          anime({ targets: cardRef.current, opacity: [0, 1], translateY: [40, 0], duration: 700, delay: index * 100, easing: 'easeOutExpo' })
          obs.disconnect()
        }
      }, { threshold: 0.1 })
      obs.observe(cardRef.current)
      return () => obs.disconnect()
    })
  }, [index])

  const statusClass = p.status === 'prod' ? 'status-prod' : p.status === 'dev' ? 'status-dev' : 'status-done'
  const statusLabel = p.status === 'prod' ? 'Producción' : p.status === 'dev' ? 'En desarrollo' : 'Completado'

  return (
    <div className="project-card" ref={cardRef} style={{ opacity: 0 }}>
      <div className="card-glow" />
      {p.image
        ? <div className="card-img-box"><img src={p.image} alt={p.title} /></div>
        : <div className="card-img-placeholder">{p.icon}</div>
      }
      <div className="card-body">
        <div className="card-top">
          <span className="card-icon">{p.icon}</span>
          <span className={`card-status ${statusClass}`}>{statusLabel}</span>
        </div>
        <h3 className="card-title">{p.title}</h3>
        <p className="card-subtitle">{p.subtitle}</p>
        <p className="card-desc">{p.desc}</p>
        <div className="card-tags">{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer" className="card-link">
            <GhIcon /> Ver en GitHub <ArrowIcon />
          </a>
        )}
      </div>
    </div>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <span className="section-label">Portfolio</span>
        <h2 className="section-title">Mis <span>Proyectos</span></h2>
        <div className="section-line" />
        <div className="projects-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}

/* ── Web Work ─────────────────────────────────────────── */
function WebWork() {
  return (
    <section id="webwork" className="section webwork-section">
      <div className="section-inner">
        <span className="section-label">Trabajos Web</span>
        <h2 className="section-title">Sitios para <span>Clientes</span></h2>
        <div className="section-line" />
        <div className="webwork-grid">
          {WEB_WORKS.map(w => (
            <a key={w.title} href={w.url} target="_blank" rel="noreferrer" className="webwork-card">
              <div className="card-glow" />
              <div className="ww-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
              <div className="card-tags">{w.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              <span className="ww-url">{w.url.replace('https://', '')}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Contact ──────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-inner">
        <span className="section-label">Contacto</span>
        <h2 className="section-title">Hablemos <span>👋</span></h2>
        <div className="section-line" />
        <p className="contact-desc">¿Tienes un proyecto en mente? Estoy disponible para freelance, colaboraciones y trabajo remoto desde Chile.</p>
        <div className="contact-grid">
          <a href="https://www.linkedin.com/in/francisco-javier-farias-espinoza-15153a27b/" target="_blank" rel="noreferrer" className="contact-btn linkedin"><LiIcon /> LinkedIn</a>
          <a href="https://www.instagram.com/nvdie_flow" target="_blank" rel="noreferrer" className="contact-btn instagram"><IgIcon /> nvdie_flow</a>
          <a href="https://www.instagram.com/refresca_tu_nae" target="_blank" rel="noreferrer" className="contact-btn instagram"><IgIcon /> refresca_tu_nae</a>
          <a href="https://github.com/FranciscoFariasDevs" target="_blank" rel="noreferrer" className="contact-btn github"><GhIcon /> GitHub</a>
          <a href="mailto:fariseodesarrollador@gmail.com" className="contact-btn email"><MailIcon /> fariseodesarrollador@gmail.com</a>
        </div>
      </div>
    </section>
  )
}

/* ── Footer ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} <span>Francisco Javier Farías Espinoza</span> · Ingeniero en Software · Chile 🇨🇱
    </footer>
  )
}

/* ── Scroll fade observer ─────────────────────────────── */
function useFadeObserver() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up')
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ── App ──────────────────────────────────────────────── */
export default function App() {
  useFadeObserver()
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <WebWork />
      <Contact />
      <Footer />
    </>
  )
}
