import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ─── DATA ─────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'facilpos', title: 'FacilPos', sub: 'Sistema POS de escritorio',
    desc: 'Software de Punto de Venta completo: inventario, turnos, cuadratura de caja y sistema de licencias. Electron + Node.js, funciona 100% sin internet.',
    tags: ['Electron', 'Node.js', 'SQLite', 'JavaScript'],
    logo: '/logo-facilpos.png', status: 'prod', icon: '🏪', github: null,
  },
  {
    id: 'metal', title: 'Metal Golpe X', sub: 'Videojuego de acción 2D — Chile',
    desc: 'Arcade estilo Metal Slug ambientado en Santiago. Godot 4.5, sistema de fichas, personajes históricos jugables, parallax scrolling y jefes con IA.',
    tags: ['Godot 4.5', 'GDScript', 'Pixel Art', 'Game Dev'],
    logo: '/logo-metal.png', status: 'dev', icon: '🎮', github: 'https://github.com/FranciscoFariasDevs',
  },
  {
    id: 'perro', title: 'PC del Perro Cobarde', sub: 'App interactiva con IA',
    desc: 'Emula la computadora de Courage the Cowardly Dog con respuestas sarcásticas vía OpenAI. Interfaz retro con scanlines, glow verde y efectos CRT.',
    tags: ['React', 'Node.js', 'OpenAI API', 'CSS3'],
    logo: '/logo-perro.png', banner: '/bichito.png', status: 'done', icon: '🖥️', github: 'https://github.com/FranciscoFariasDevs',
  },
  {
    id: 'poxys', title: 'Poxys', sub: 'Red social deportiva móvil',
    desc: 'App Flutter tipo Strava para runners y ciclistas. GPS tracking, rutas, comunidad social y estadísticas en tiempo real. Backend Supabase.',
    tags: ['Flutter', 'Dart', 'Supabase', 'GPS'],
    logo: '/logo-poxys.png', status: 'dev', icon: '🚴', github: null,
  },
  {
    id: 'rimificador', title: 'Rimificador', sub: 'Herramienta lírica para artistas',
    desc: 'Web app para encontrar rimas, generar letras y asistir en la creación de contenido musical. Ideal para raperos, poetas y compositores.',
    tags: ['JavaScript', 'Web App', 'NLP'],
    logo: null, status: 'done', icon: '🎤', github: 'https://github.com/FranciscoFariasDevs',
  },
]

const WEB_WORKS = [
  {
    title: 'Intranet Beach', url: 'https://intranet.beach.cl', icon: '🏖️',
    desc: 'Intranet corporativa completa con autenticación, dashboards y módulos administrativos para empresa costera.',
    tags: ['Intranet', 'Full Stack', 'Corporativo'],
  },
  {
    title: 'Proimtec', url: 'https://www.proimtec.cl', icon: '⚙️',
    desc: 'Sitio web corporativo para empresa de tecnología e ingeniería. Diseño responsive y optimizado para SEO.',
    tags: ['Web Corporativa', 'Diseño', 'SEO'],
  },
]

const SKILLS = [
  { name: 'JavaScript / TypeScript', pct: 90, color: '#f7df1e' },
  { name: 'React + Node.js',         pct: 87, color: '#61dafb' },
  { name: 'Python',                  pct: 78, color: '#4b8bbe' },
  { name: 'Flutter / Dart',          pct: 72, color: '#54c5f8' },
  { name: 'Godot / GDScript',        pct: 70, color: '#478cbf' },
  { name: 'SQL / PostgreSQL',        pct: 82, color: '#336791' },
  { name: 'Electron',                pct: 75, color: '#9feaf9' },
]

const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

const TECH_STACKS = [
  {
    cat: '🌐 Web & Backend',
    color: '#818cf8',
    techs: [
      { name: 'React',       icon: `${DI}/react/react-original.svg` },
      { name: 'Node.js',     icon: `${DI}/nodejs/nodejs-original.svg` },
      { name: 'TypeScript',  icon: `${DI}/typescript/typescript-original.svg` },
      { name: 'Python',      icon: `${DI}/python/python-original.svg` },
      { name: 'Deno',        icon: `${DI}/denojs/denojs-original.svg` },
      { name: 'JavaScript',  icon: `${DI}/javascript/javascript-original.svg` },
      { name: 'Electron',    icon: `${DI}/electron/electron-original.svg` },
      { name: 'PostgreSQL',  icon: `${DI}/postgresql/postgresql-original.svg` },
    ],
  },
  {
    cat: '📱 Móvil & Cloud',
    color: '#38bdf8',
    techs: [
      { name: 'Flutter',     icon: `${DI}/flutter/flutter-original.svg` },
      { name: 'Dart',        icon: `${DI}/dart/dart-original.svg` },
      { name: 'Firebase',    icon: `${DI}/firebase/firebase-original.svg` },
      { name: 'Supabase',    icon: `${DI}/supabase/supabase-original.svg` },
      { name: 'Node.js',     icon: `${DI}/nodejs/nodejs-original.svg` },
      { name: 'SQLite',      icon: `${DI}/sqlite/sqlite-original.svg` },
    ],
  },
  {
    cat: '🎮 Juegos & Arte 3D',
    color: '#fb923c',
    techs: [
      { name: 'Godot',         icon: `${DI}/godot/godot-original.svg` },
      { name: 'Unreal Engine', icon: `${DI}/unrealengine/unrealengine-original.svg` },
      { name: 'Python',        icon: `${DI}/python/python-original.svg` },
      { name: 'Blender',       icon: `${DI}/blender/blender-original.svg` },
    ],
  },
]

/* ─── SVG ICONS ────────────────────────────────────────── */
const Ig = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
const Li = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
const Gh = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
const Mail = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
const Arrow = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>

/* ─── PARTICLES ─────────────────────────────────────────── */
function Particles() {
  const count = 18
  return (
    <div className="particles">
      {Array.from({ length: count }, (_, i) => {
        const size = Math.random() * 4 + 2
        const left = Math.random() * 100
        const delay = Math.random() * 20
        const dur   = Math.random() * 20 + 15
        return (
          <div key={i} className="particle" style={{
            width: size, height: size,
            left: `${left}%`, bottom: '-10px',
            animationDuration: `${dur}s`,
            animationDelay: `${delay}s`,
            opacity: Math.random() * 0.4 + 0.1,
          }} />
        )
      })}
    </div>
  )
}

/* ─── SCROLL PROGRESS ───────────────────────────────────── */
function ScrollProgress() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const fn = () => setW(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div className="scroll-progress" style={{ width: `${w}%` }} />
}

/* ─── NAVBAR ────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const links = [['#hero','Inicio'],['#about','Sobre mí'],['#projects','Proyectos'],['#webwork','Trabajos Web'],['#contact','Contacto']]
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-brand">
        <div className="brand-dot" />
        <span className="brand-text">Francisco Farías</span>
      </a>
      <button className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="menú">
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

/* ─── HERO ──────────────────────────────────────────────── */
function Hero() {
  const textRef = useRef(null)
  useEffect(() => {
    import('animejs').then(({ default: anime }) => {
      if (!textRef.current) return
      anime({
        targets: textRef.current.querySelectorAll('.hero-name, .hero-titles, .hero-desc, .hero-ctas, .hero-pills, .hero-badge, .level-badge, .xp-bar-wrap'),
        opacity: [0, 1], translateY: [30, 0],
        delay: anime.stagger(90, { start: 300 }),
        duration: 800, easing: 'easeOutExpo',
      })
    })
  }, [])

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
      </div>
      <div className="hero-inner">
        <div className="hero-photo-col">
          <div className="photo-frame">
            <div className="photo-border-glow" />
            <img src="/profile.png" alt="Francisco Farías" />
            <div className="photo-glow" />
          </div>
        </div>

        <div className="hero-text" ref={textRef}>
          <div className="hero-badge" style={{ opacity: 0 }}>
            <div className="pulse-dot" /> Disponible para proyectos
          </div>

          <h1 className="hero-name" style={{ opacity: 0 }}>
            Francisco Javier<br />
            <span className="grad-text">Farías Espinoza</span>
          </h1>

          <div className="hero-titles" style={{ opacity: 0 }}>
            <span className="hero-title-line">Ingeniero Civil en Informática</span>
            <span className="hero-title-line">Especialidad en Desarrollo de Software</span>
            <span className="hero-title-line">Diseñador de Videojuegos</span>
          </div>

          <div className="level-badge" style={{ opacity: 0 }}>
            ⚔️ LVL 26 · Desarrollador Full Stack
          </div>
          <div className="xp-bar-wrap" style={{ opacity: 0 }}>
            <div className="xp-track"><div className="xp-fill" /></div>
            <div className="xp-label">XP: 7200 / 10000 · Próximo nivel: Senior Dev</div>
          </div>

          <p className="hero-desc" style={{ opacity: 0 }}>
            Construyo <strong>apps de escritorio, web y móviles</strong> desde Chile 🇨🇱.
            También creo videojuegos con Godot y dirijo el servicio técnico <strong>Refresca Tu Nae</strong>.
          </p>

          <div className="hero-ctas" style={{ opacity: 0 }}>
            <a href="#projects" className="btn-glow">⚡ Ver proyectos</a>
            <a href="https://www.linkedin.com/in/francisco-javier-farias-espinoza-15153a27b/" target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn</a>
          </div>

          <div className="hero-pills" style={{ opacity: 0 }}>
            <a href="https://www.instagram.com/nvdie_flow" target="_blank" rel="noreferrer" className="pill"><Ig /> nvdie_flow</a>
            <a href="https://www.instagram.com/refresca_tu_nae" target="_blank" rel="noreferrer" className="pill"><Ig /> refresca_tu_nae</a>
            <a href="https://github.com/FranciscoFariasDevs" target="_blank" rel="noreferrer" className="pill"><Gh /> GitHub</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── ABOUT ─────────────────────────────────────────────── */
function SkillBar({ name, pct, color, go }) {
  return (
    <div className="skill-row">
      <div className="skill-head">
        <span className="skill-name">{name}</span>
        <span className="skill-val">{pct}%</span>
      </div>
      <div className="skill-track">
        <div className={`skill-bar ${go ? 'go' : ''}`} style={{ width: `${pct}%`, background: `linear-gradient(90deg,${color}77,${color})` }} />
      </div>
    </div>
  )
}

function About() {
  const skillRef = useRef(null)
  const [go, setGo] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true) }, { threshold: 0.25 })
    if (skillRef.current) obs.observe(skillRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" className="section fade-up">
      <div className="sec-inner">
        <span className="sec-label">Sobre mí</span>
        <h2 className="sec-title">Mi <span>Historia</span></h2>
        <div className="sec-line" />
        <div className="about-grid">
          <div className="about-photo-col fade-up d1">
            <img src="/profile.png" alt="Francisco Farías" className="about-photo" />
          </div>

          <div className="about-text-col fade-up d2">
            <p>Soy <strong>Francisco Farías</strong>, Ingeniero Civil en Informática con especialidad en Desarrollo de Software y Diseñador de Videojuegos de Chile 🇨🇱.</p>
            <p>Trabajo en <strong>desarrollo de aplicaciones de escritorio</strong> con Electron, apps móviles con Flutter y sistemas web con React. También dirijo un <strong>servicio técnico de computadoras</strong> bajo la marca <strong>Refresca Tu Nae</strong>.</p>
            <p>Tengo una fuerte faceta creativa: soy artista bajo el alias <strong>nvdie_flow</strong> y actualmente desarrollo <strong>Metal Golpe X</strong>, videojuego arcade ambientado en Santiago de Chile con Godot 4.5.</p>
            <p>Mi misión es llevar tecnología de calidad a personas reales, combinando ingeniería, arte y pasión por los juegos.</p>
            <div className="about-chips">
              <span className="about-chip">🏆 5+ Proyectos reales</span>
              <span className="about-chip">🎮 Game Dev</span>
              <span className="about-chip">🎨 Artista Digital</span>
              <span className="about-chip">🛠️ Servicio Técnico</span>
            </div>
          </div>

          <div className="skills-col fade-up d3" ref={skillRef}>
            <h3>⚔️ Stack Tecnológico</h3>
            {SKILLS.map(s => <SkillBar key={s.name} {...s} go={go} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── TECH STACK ────────────────────────────────────────── */
function TechStack() {
  return (
    <section id="stack" className="section tech-section">
      <div className="sec-inner">
        <span className="sec-label">Tecnologías</span>
        <h2 className="sec-title">Mi <span>Stack</span></h2>
        <div className="sec-line" />
        <div className="tech-cats">
          {TECH_STACKS.map((cat, ci) => (
            <div key={cat.cat} className="tech-cat fade-up" style={{ transitionDelay: `${ci * 0.1}s` }}>
              <h3 className="tech-cat-title" style={{ color: cat.color }}>{cat.cat}</h3>
              <div className="tech-grid">
                {cat.techs.map((t, ti) => (
                  <div key={t.name} className="tech-chip" style={{ animationDelay: `${ci * 0.1 + ti * 0.05}s` }}>
                    <img
                      src={t.icon}
                      alt={t.name}
                      className="tech-icon"
                      onError={e => { e.target.style.display = 'none' }}
                    />
                    <span>{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── PROJECT CARD ──────────────────────────────────────── */
function PCard({ p, i }) {
  const ref = useRef(null)
  useEffect(() => {
    import('animejs').then(({ default: anime }) => {
      if (!ref.current) return
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) {
          anime({ targets: ref.current, opacity: [0,1], translateY: [40,0], duration: 700, delay: i * 90, easing: 'easeOutExpo' })
          obs.disconnect()
        }
      }, { threshold: 0.1 })
      obs.observe(ref.current)
    })
  }, [i])

  const sc = p.status === 'prod' ? 's-prod' : p.status === 'dev' ? 's-dev' : 's-done'
  const sl = p.status === 'prod' ? 'Producción' : p.status === 'dev' ? 'En desarrollo' : 'Completado'

  return (
    <div className="pcard" ref={ref} style={{ opacity: 0 }}>
      <div className="pcard-shine" />
      <div className="pcard-xpbar" />

      {p.logo ? (
        <div className="pcard-media">
          <img src={p.logo} alt={p.title} />
        </div>
      ) : (
        <div className="pcard-media-placeholder">
          <span className="pcard-emoji">{p.icon}</span>
        </div>
      )}

      <div className="pcard-body">
        <div className="pcard-top">
          <span className="pcard-icon">{p.icon}</span>
          <span className={`pcard-status ${sc}`}>{sl}</span>
        </div>
        <h3 className="pcard-title">{p.title}</h3>
        <p className="pcard-sub">{p.sub}</p>
        <p className="pcard-desc">{p.desc}</p>
        <div className="pcard-tags">{p.tags.map(t => <span key={t} className="ptag">{t}</span>)}</div>
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer" className="pcard-link">
            <Gh /> GitHub <Arrow />
          </a>
        )}
      </div>
    </div>
  )
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="sec-inner">
        <span className="sec-label">Portfolio</span>
        <h2 className="sec-title">Mis <span>Proyectos</span></h2>
        <div className="sec-line" />
        <div className="projects-grid">
          {PROJECTS.map((p, i) => <PCard key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}

/* ─── WEB WORK ──────────────────────────────────────────── */
function WebWork() {
  return (
    <section id="webwork" className="section ww-section">
      <div className="sec-inner">
        <span className="sec-label">Trabajos Web</span>
        <h2 className="sec-title">Sitios para <span>Clientes</span></h2>
        <div className="sec-line" />
        <div className="ww-grid">
          {WEB_WORKS.map(w => (
            <a key={w.title} href={w.url} target="_blank" rel="noreferrer" className="ww-card fade-up">
              <div className="ww-shine" />
              <div className="ww-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
              <div className="pcard-tags">{w.tags.map(t => <span key={t} className="ptag">{t}</span>)}</div>
              <span className="ww-url">{w.url.replace('https://','')}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT ───────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="sec-inner">
        <span className="sec-label">Contacto</span>
        <h2 className="sec-title">Hablemos <span>👋</span></h2>
        <div className="sec-line" />
        <p className="contact-desc">¿Tienes un proyecto? Estoy disponible para freelance, colaboraciones y trabajo remoto desde Chile.</p>
        <div className="contact-wrap">
          <a href="https://www.linkedin.com/in/francisco-javier-farias-espinoza-15153a27b/" target="_blank" rel="noreferrer" className="cbtn cbtn-li"><Li /> LinkedIn</a>
          <a href="https://www.instagram.com/nvdie_flow" target="_blank" rel="noreferrer" className="cbtn cbtn-ig"><Ig /> nvdie_flow</a>
          <a href="https://www.instagram.com/refresca_tu_nae" target="_blank" rel="noreferrer" className="cbtn cbtn-ig"><Ig /> refresca_tu_nae</a>
          <a href="https://github.com/FranciscoFariasDevs" target="_blank" rel="noreferrer" className="cbtn cbtn-gh"><Gh /> GitHub</a>
          <a href="mailto:fariseodesarrollador@gmail.com" className="cbtn cbtn-em"><Mail /> fariseodesarrollador@gmail.com</a>
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} <span>Francisco Javier Farías Espinoza</span> · Ing. Civil en Informática · Chile 🇨🇱
    </footer>
  )
}

/* ─── FADE OBSERVER ─────────────────────────────────────── */
function useFadeObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.fade-up').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ─── APP ───────────────────────────────────────────────── */
export default function App() {
  useFadeObserver()
  return (
    <>
      <Particles />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <WebWork />
      <Contact />
      <Footer />
    </>
  )
}
