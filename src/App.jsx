import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ─── DATA ─────────────────────────────────────────────── */
const PROJECTS = [
  {
    id:'facilpos',
    title:'FacilPos',
    sub:'// sistema-pos-desktop',
    desc:'Software de Punto de Venta con inventario, turnos, cuadratura de caja y licencias. Electron + Node.js, 100% offline. Desplegado en negocios reales.',
    tags:['Electron','Node.js','SQLite','JavaScript','React'],
    banner: '/facilpos-logo.png',   // logo grande centrado como banner
    logo:   '/facilpos-icon.png',
    bannerStyle: 'contain',
    status:'prod', icon:'🏪', github:null,
  },
  {
    id:'metal',
    title:'Metal Golpe X',
    sub:'// videojuego-accion-2d',
    desc:'Arcade estilo Metal Slug ambientado en Santiago. Personajes históricos chilenos jugables, sistema de fichas arcade, parallax scrolling y jefes con IA.',
    tags:['Godot 4.5','GDScript','Pixel Art','Game Dev'],
    banner: '/metal-bg.jpg',        // fondo real de Santiago del juego
    logo:   '/metal-intro.png',     // pantalla intro del juego
    bannerStyle: 'cover',
    extraImgs: ['/metal-allende.png', '/metal-pinochet.png'],
    status:'dev', icon:'🎮', github:'https://github.com/FranciscoFariasDevs',
  },
  {
    id:'perro',
    title:'PC del Perro Cobarde',
    sub:'// ia-retro-chat',
    desc:'Emula la computadora de Courage the Cowardly Dog. Respuestas sarcásticas en tiempo real vía OpenAI, interfaz retro con scanlines y efectos CRT.',
    tags:['React','Node.js','OpenAI API','CSS3'],
    banner: '/perro-banner.png',    // imagen de la computadora real
    logo:   '/perro-bichito.png',   // el perro cobarde
    bannerStyle: 'contain',
    status:'done', icon:'🖥️', github:'https://github.com/FranciscoFariasDevs',
  },
  {
    id:'poxys',
    title:'Poxys',
    sub:'// red-social-deportiva',
    desc:'App Flutter tipo Strava para runners y ciclistas chilenos. GPS tracking, rutas, comunidad social y estadísticas en tiempo real. Backend Supabase.',
    tags:['Flutter','Dart','Supabase','GPS','Firebase'],
    banner: '/poxys-logo.png',      // logo oficial de Poxys
    logo:   '/poxys-icon.png',      // ícono de la app
    bannerStyle: 'contain',
    status:'dev', icon:'🚴', github:null,
  },
  {
    id:'rimi',
    title:'Rimificador',
    sub:'// herramienta-lirica',
    desc:'Web app para encontrar rimas, generar letras y asistir en la composición musical. Ideal para raperos, poetas y compositores.',
    tags:['JavaScript','Web App','NLP'],
    banner: '/rimificador.png',
    logo:   null,
    bannerStyle: 'cover',
    status:'done', icon:'🎤', github:'https://github.com/FranciscoFariasDevs',
  },
]
const WEB_WORKS = [
  { title:'Intranet Beach', url:'https://intranet.beach.cl', icon:'🏖️', img:'/intranet-beach.png', desc:'Intranet corporativa completa con autenticación, dashboards y módulos administrativos para empresa costera.', tags:['Intranet','Full Stack','Corporativo'] },
  { title:'Proimtec',       url:'https://www.proimtec.cl',    icon:'⚙️', img:'/proimtec.png',      desc:'Sitio web corporativo para empresa de tecnología e ingeniería. Diseño responsive y optimizado para SEO.', tags:['Web Corp','Diseño','SEO'] },
  { title:'Rimificador',    url:'https://github.com/FranciscoFariasDevs', icon:'🎤', img:'/rimificador2.png', desc:'Herramienta web lírica para encontrar rimas y componer letras. Desplegada y activa para usuarios reales.', tags:['JavaScript','NLP','Web App'] },
]
const SKILLS = [
  { name:'JavaScript / TypeScript', pct:90, color:'#f7df1e' },
  { name:'React + Node.js',         pct:87, color:'#00c8ff' },
  { name:'Python',                  pct:78, color:'#4b8bbe' },
  { name:'Flutter / Dart',          pct:72, color:'#54c5f8' },
  { name:'Godot / GDScript',        pct:70, color:'#478cbf' },
  { name:'SQL / PostgreSQL',        pct:82, color:'#336791' },
  { name:'Electron',                pct:75, color:'#9feaf9' },
]
const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const STACKS = [
  { cat:'// WEB & BACKEND', color:'#00c8ff', techs:[
    { name:'React',      icon:`${DI}/react/react-original.svg` },
    { name:'Node.js',    icon:`${DI}/nodejs/nodejs-original.svg` },
    { name:'TypeScript', icon:`${DI}/typescript/typescript-original.svg` },
    { name:'Python',     icon:`${DI}/python/python-original.svg` },
    { name:'Deno',       icon:`${DI}/denojs/denojs-original.svg` },
    { name:'JavaScript', icon:`${DI}/javascript/javascript-original.svg` },
    { name:'Electron',   icon:`${DI}/electron/electron-original.svg` },
    { name:'PostgreSQL', icon:`${DI}/postgresql/postgresql-original.svg` },
  ]},
  { cat:'// MÓVIL & CLOUD', color:'#bf5fff', techs:[
    { name:'Flutter',    icon:`${DI}/flutter/flutter-original.svg` },
    { name:'Dart',       icon:`${DI}/dart/dart-original.svg` },
    { name:'Firebase',   icon:`${DI}/firebase/firebase-original.svg` },
    { name:'Supabase',   icon:`${DI}/supabase/supabase-original.svg` },
    { name:'Node.js',    icon:`${DI}/nodejs/nodejs-original.svg` },
    { name:'SQLite',     icon:`${DI}/sqlite/sqlite-original.svg` },
  ]},
  { cat:'// JUEGOS & ARTE 3D', color:'#ff6b35', techs:[
    { name:'Godot',          icon:`${DI}/godot/godot-original.svg` },
    { name:'Unreal Engine',  icon:`${DI}/unrealengine/unrealengine-original.svg` },
    { name:'Python',         icon:`${DI}/python/python-original.svg` },
    { name:'Blender',        icon:`${DI}/blender/blender-original.svg` },
  ]},
]

const BOOT_MSGS = [
  'INICIANDO...',
  'CARGANDO PORTAFOLIO...',
  'LISTO ✓',
]

/* ─── ICONS ─────────────────────────────────────────────── */
const Ig   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
const Li   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
const Gh   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
const Mail    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
const Arr     = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
const Spotify = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>

/* ─── BOOT SCREEN ────────────────────────────────────────── */
function BootScreen({ onDone }) {
  const [pct, setPct]       = useState(0)
  const [msg, setMsg]       = useState(BOOT_MSGS[0])
  const [exiting, setExit]  = useState(false)
  const fillRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const total = 900
    const start = performance.now()
    let frame

    const tick = (now) => {
      const elapsed = now - start
      const p = Math.min((elapsed / total) * 100, 100)
      setPct(Math.floor(p))
      const idx = Math.min(Math.floor((p / 100) * (BOOT_MSGS.length - 1)), BOOT_MSGS.length - 1)
      setMsg(BOOT_MSGS[idx])
      if (fillRef.current) fillRef.current.style.width = p + '%'
      if (glowRef.current) glowRef.current.style.left  = (p - 5) + '%'
      if (p < 100) { frame = requestAnimationFrame(tick) }
      else {
        setTimeout(() => {
          setExit(true)
          setTimeout(onDone, 400)
        }, 150)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onDone])

  return (
    <div className={`boot-screen ${exiting ? 'boot-exit' : ''}`}>
      <div className="boot-scanlines" />
      <div className="boot-grid" />
      <div className="boot-corner tl" /><div className="boot-corner tr" />
      <div className="boot-corner bl" /><div className="boot-corner br" />

      <div className="boot-logo-area">
        <div className="boot-diamond" />
        <div className="boot-title">FRANCISCO FARÍAS</div>
        <div className="boot-subtitle">PORTFOLIO · 2026</div>
      </div>

      <div className="boot-bar-wrap">
        <div className="boot-bar-label">
          <span>{msg}</span>
          <span>{pct}%</span>
        </div>
        <div className="boot-bar-track">
          <div className="boot-bar-fill" ref={fillRef} />
          <div className="boot-bar-glow" ref={glowRef} />
        </div>
        <div className="boot-dots">
          {BOOT_MSGS.map((_, i) => (
            <div key={i} className={`boot-dot ${pct >= (i / (BOOT_MSGS.length - 1)) * 100 ? 'active' : ''}`} />
          ))}
        </div>
        <div className="boot-status">{msg}</div>
      </div>
    </div>
  )
}

/* ─── PARTICLES ─────────────────────────────────────────── */
function Particles() {
  return (
    <div className="particles">
      {Array.from({ length: 16 }, (_, i) => (
        <div key={i} className="particle" style={{
          width:  Math.random() * 3 + 1.5,
          height: Math.random() * 3 + 1.5,
          left:   `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 20 + 15}s`,
          animationDelay:    `${Math.random() * 20}s`,
          opacity: Math.random() * 0.35 + 0.05,
        }} />
      ))}
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
  const links = [['#hero','INICIO'],['#about','SOBRE MÍ'],['#stack','STACK'],['#projects','PROYECTOS'],['#webwork','CLIENTES'],['#contact','CONTACTO']]
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-brand">
        <div className="brand-icon" />
        <span className="brand-text">F.FARÍAS</span>
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
function Hero({ visible }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!visible) return
    import('animejs').then(({ animate, stagger }) => {
      if (!ref.current) return
      animate(ref.current.querySelectorAll('.ha'), {
        opacity: [0, 1], translateY: [30, 0],
        delay: stagger(90, { start: 80 }),
        duration: 800, easing: 'easeOutExpo',
      })
      animate('.hero-photo-frame', {
        opacity: [0, 1], translateX: [-40, 0],
        duration: 900, delay: 100, easing: 'easeOutExpo',
      })
    }).catch(() => {
      // fallback: make visible without animation
      if (ref.current) {
        ref.current.querySelectorAll('.ha').forEach(el => { el.style.opacity = '1'; el.style.transform = 'none' })
      }
      const f = document.querySelector('.hero-photo-frame')
      if (f) { f.style.opacity = '1'; f.style.transform = 'none' }
    })
  }, [visible])

  return (
    <section id="hero" className="hero-section">
      <div className="hero-stripe" />
      <div className="hero-inner">
        <div className="hero-photo-col">
          <div className="hero-photo-frame" style={{ opacity: 0 }}>
            <div className="hero-photo-inner">
              <img src="/profile.png" alt="Francisco Farías" className="hero-photo" />
              <div className="photo-scan" />
              <div className="photo-hud">
                <span>FRANCISCO FARÍAS E.</span>
                <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                  <div className="photo-hud-dot" />
                  <span>ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-text" ref={ref}>
          <div className="hero-badge ha" style={{ opacity:0 }}>
            <div className="badge-dot" /> DISPONIBLE PARA PROYECTOS
          </div>

          <h1 className="hero-name ha" style={{ opacity:0 }}>
            Francisco Javier<br />
            <span className="grad-text">Farías Espinoza</span>
          </h1>

          <div className="hero-role-box ha" style={{ opacity:0 }}>
            <div className="role-line"><span className="role-icon">🎓</span><span><strong>Ingeniero Civil en Informática</strong></span></div>
            <div className="role-line"><span className="role-icon">💻</span><span>Especialidad en <strong>Desarrollo de Software</strong></span></div>
            <div className="role-line"><span className="role-icon">🤖</span><span><strong>IA Engineer</strong> · ERP &amp; Intranets a medida</span></div>
            <div className="role-line"><span className="role-icon">🎮</span><span><strong>Diseñador de Videojuegos</strong></span></div>
            <div className="role-line"><span className="role-icon">🛠️</span><span>Técnico Computacional · <strong>Refresca Tu Nae</strong></span></div>
          </div>

          <div className="xp-panel ha" style={{ opacity:0 }}>
            <div className="xp-header">
              <span className="xp-level">⚔ LVL 29 · FULL STACK DEV</span>
              <span className="xp-pts">7200 / 10000 XP</span>
            </div>
            <div className="xp-track"><div className="xp-fill" /></div>
          </div>

          <p className="hero-desc ha" style={{ opacity:0 }}>
            Construyo <strong>ERP e intranets custom para empresas</strong>, apps de escritorio, web y móviles desde Chile 🇨🇱.
            Integro <strong>IA</strong> en sistemas reales, creo videojuegos con Godot y Unreal Engine, y soy artista bajo el alias <strong>nvdie_flow</strong>.
          </p>

          <div className="hero-ctas ha" style={{ opacity:0 }}>
            <a href="#projects" className="btn-ps">⚡ VER PROYECTOS</a>
            <a href="https://www.linkedin.com/in/francisco-javier-farias-espinoza-15153a27b/" target="_blank" rel="noreferrer" className="btn-outline">LINKEDIN</a>
          </div>

          <div className="hero-pills ha" style={{ opacity:0 }}>
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
      <div className="skill-head"><span className="skill-name">{name}</span><span className="skill-val">{pct}%</span></div>
      <div className="skill-track">
        <div className={`skill-bar ${go ? 'go' : ''}`} style={{ width:`${pct}%`, background:`linear-gradient(90deg,${color}66,${color})` }} />
      </div>
    </div>
  )
}

function About() {
  const skillRef = useRef(null)
  const [go, setGo] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true) }, { threshold: 0.2 })
    if (skillRef.current) obs.observe(skillRef.current)
    return () => obs.disconnect()
  }, [])
  return (
    <section id="about" className="section fade-up">
      <div className="sec-inner">
        <div className="sec-eyebrow"><div className="sec-eyebrow-line" /><span className="sec-label">SOBRE MÍ</span></div>
        <h2 className="sec-title">Mi <span>Historia</span></h2>
        <div className="sec-line" />
        <div className="about-grid">
          <div className="about-photo-sticky fade-up d1">
            <div className="about-photo-wrap">
              <img src="/profile.png" alt="Francisco Farías" className="about-photo" />
              <div className="about-photo-bar">ID: F.FARIAS.DEV · CL 🇨🇱</div>
            </div>
          </div>
          <div className="about-text-col fade-up d2">
            <p>Soy <strong>Francisco Farías</strong>, Ingeniero Civil en Informática con especialidad en Desarrollo de Software, IA Engineer y Diseñador de Videojuegos de Chile 🇨🇱.</p>
            <p>Actualmente me encuentro trabajando en <strong>soluciones empresariales robustas</strong>: ERP e intranets a medida, sistemas de gestión, automatizaciones con IA y aplicaciones multiplataforma para empresas reales.</p>
            <p>Desarrollo apps móviles con Flutter, sistemas web completos con React y Node.js, y dirijo el servicio técnico <strong>Refresca Tu Nae</strong>.</p>
            <p>Tengo una fuerte faceta creativa como artista bajo el alias <strong>nvdie_flow</strong> y estoy desarrollando <strong>Metal Golpe X</strong>, un videojuego arcade ambientado en Santiago de Chile.</p>
            <div className="about-chips">
              <span className="about-chip">▶ ERP EMPRESARIAL</span>
              <span className="about-chip">▶ IA ENGINEER</span>
              <span className="about-chip">▶ GAME DEV</span>
              <span className="about-chip">▶ ARTISTA DIGITAL</span>
              <span className="about-chip">▶ SERVICIO TÉC.</span>
            </div>
          </div>
          <div className="skills-col fade-up d3" ref={skillRef}>
            <h3>HABILIDADES</h3>
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
    <section id="stack" className="section">
      <div className="sec-inner">
        <div className="sec-eyebrow"><div className="sec-eyebrow-line" /><span className="sec-label">TECNOLOGÍAS</span></div>
        <h2 className="sec-title">Mi <span>Stack</span></h2>
        <div className="sec-line" />
        <div className="tech-cats">
          {STACKS.map((s, si) => (
            <div key={s.cat} className="fade-up" style={{ transitionDelay:`${si*.1}s` }}>
              <h3 className="tech-cat-title" style={{ color: s.color }}>{s.cat}</h3>
              <div className="tech-grid">
                {s.techs.map(t => (
                  <div key={t.name} className="tech-chip">
                    <img src={t.icon} alt={t.name} className="tech-icon" onError={e => { e.target.style.display='none' }} />
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
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        obs.disconnect()
        import('animejs').then(({ animate }) => {
          animate(el, { opacity:[0,1], translateY:[40,0], duration:750, delay: i*80, easing:'easeOutExpo' })
        }).catch(() => { el.style.opacity = '1'; el.style.transform = 'none' })
      }
    }, { threshold: 0.06 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [i])

  const sc = { prod:'s-prod', dev:'s-dev', done:'s-done' }[p.status]
  const sl = { prod:'PRODUCCIÓN', dev:'EN DESARROLLO', done:'COMPLETADO' }[p.status]

  return (
    <div className="pcard" ref={ref} style={{ opacity:0 }}>
      <div className="pcard-accent-line" />

      {/* ── MEDIA AREA ── */}
      <div className="pcard-media">
        {p.banner ? (
          <>
            <img
              src={p.banner}
              alt={`${p.title} preview`}
              className="pcard-banner"
              style={{ objectFit: p.bannerStyle || 'cover' }}
            />
            {/* overlay gradient */}
            <div className="pcard-media-overlay" />
            {/* logo badge bottom-left si existe y es distinto del banner */}
            {p.logo && p.logo !== p.banner && (
              <div className="pcard-logo-badge">
                <img src={p.logo} alt={`${p.title} logo`} />
              </div>
            )}
            {/* personajes flotantes para Metal Golpe */}
            {p.extraImgs && (
              <div className="pcard-chars">
                {p.extraImgs.map((src, idx) => (
                  <img key={idx} src={src} alt="character" className="pcard-char" style={{ animationDelay:`${idx * .3}s` }} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="pcard-media-empty">
            <span className="pcard-empty-icon">{p.icon}</span>
            <span className="pcard-empty-label">{p.title}</span>
          </div>
        )}
        {/* scan line */}
        <div className="pcard-scan" />
      </div>

      {/* ── BODY ── */}
      <div className="pcard-body">
        <div className="pcard-top">
          <div className="pcard-title-group">
            <h3 className="pcard-title">{p.title}</h3>
            <p className="pcard-sub">{p.sub}</p>
          </div>
          <span className={`pcard-status ${sc}`}>{sl}</span>
        </div>
        <p className="pcard-desc">{p.desc}</p>
        <div className="pcard-tags">{p.tags.map(t => <span key={t} className="ptag">{t}</span>)}</div>
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer" className="pcard-link">
            <Gh /> VER EN GITHUB <Arr />
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
        <div className="sec-eyebrow"><div className="sec-eyebrow-line" /><span className="sec-label">PORTFOLIO</span></div>
        <h2 className="sec-title">Mis <span>Proyectos</span></h2>
        <div className="sec-line" />
        <div className="projects-grid">{PROJECTS.map((p, i) => <PCard key={p.id} p={p} i={i} />)}</div>
      </div>
    </section>
  )
}

/* ─── WEB WORK ──────────────────────────────────────────── */
function WebWork() {
  return (
    <section id="webwork" className="section">
      <div className="sec-inner">
        <div className="sec-eyebrow"><div className="sec-eyebrow-line" /><span className="sec-label">CLIENTES WEB</span></div>
        <h2 className="sec-title">Sitios para <span>Clientes</span></h2>
        <div className="sec-line" />
        <div className="ww-list">
          {WEB_WORKS.map((w, i) => (
            <a key={w.title} href={w.url} target="_blank" rel="noreferrer" className={`ww-item fade-up ${i % 2 === 1 ? 'ww-item-reverse' : ''}`}>
              <div className="ww-item-img-wrap">
                <img src={w.img} alt={w.title} className="ww-item-img" />
                <div className="ww-item-img-overlay" />
                <div className="ww-top-line" />
              </div>
              <div className="ww-item-info">
                <div className="ww-item-eyebrow">{w.icon} ENTREGADO</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <div className="pcard-tags">{w.tags.map(t => <span key={t} className="ptag">{t}</span>)}</div>
                <span className="ww-url">↗ {w.url.replace('https://','')}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CONTACT ───────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', msg:'' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    const sub  = encodeURIComponent(`Portafolio · ${form.name}`)
    const body = encodeURIComponent(`Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.msg}`)
    window.open(`mailto:fariseodesarrollador@gmail.com?subject=${sub}&body=${body}`)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }
  return (
    <form className="cform" onSubmit={handleSubmit}>
      <div className="cform-row">
        <div className="cform-field">
          <label>Nombre</label>
          <input value={form.name} onChange={set('name')} placeholder="Tu nombre" required />
        </div>
        <div className="cform-field">
          <label>Email</label>
          <input type="email" value={form.email} onChange={set('email')} placeholder="tu@email.com" required />
        </div>
      </div>
      <div className="cform-field">
        <label>Mensaje</label>
        <textarea value={form.msg} onChange={set('msg')} placeholder="Cuéntame sobre tu proyecto..." rows={5} required />
      </div>
      <button type="submit" className="btn-ps" style={{ width:'100%', justifyContent:'center' }}>
        {sent ? '✅ MENSAJE PREPARADO — REVISA TU CLIENTE DE CORREO' : '📩 ENVIAR MENSAJE'}
      </button>
    </form>
  )
}

function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="sec-inner">
        <div className="sec-eyebrow" style={{ justifyContent:'center' }}><div className="sec-eyebrow-line" /><span className="sec-label">CONTACTO</span><div className="sec-eyebrow-line" /></div>
        <h2 className="sec-title">Hablemos <span>👾</span></h2>
        <div className="sec-line" />
        <p className="contact-desc">¿Tienes un proyecto? Estoy disponible para freelance, colaboraciones y trabajo remoto desde Chile.</p>

        {/* ── Redes sociales ── */}
        <div className="social-grid">
          <a href="https://www.instagram.com/nvdie_flow" target="_blank" rel="noreferrer" className="social-card sc-ig">
            <div className="social-card-icon"><Ig /></div>
            <div className="social-card-info">
              <span className="social-card-handle">@nvdie_flow</span>
              <span className="social-card-label">Arte · Música · Lifestyle</span>
            </div>
          </a>
          <a href="https://www.instagram.com/refresca_tu_nae" target="_blank" rel="noreferrer" className="social-card sc-ig">
            <div className="social-card-icon"><Ig /></div>
            <div className="social-card-info">
              <span className="social-card-handle">@refresca_tu_nae</span>
              <span className="social-card-label">Técnico Computacional</span>
            </div>
          </a>
          <a href="https://open.spotify.com/artist/nvdie-flow" target="_blank" rel="noreferrer" className="social-card sc-sp">
            <div className="social-card-icon"><Spotify /></div>
            <div className="social-card-info">
              <span className="social-card-handle">Nvdie Flow</span>
              <span className="social-card-label">Artista en Spotify</span>
            </div>
          </a>
          <a href="https://github.com/FranciscoFariasDevs" target="_blank" rel="noreferrer" className="social-card sc-gh">
            <div className="social-card-icon"><Gh /></div>
            <div className="social-card-info">
              <span className="social-card-handle">FranciscoFariasDevs</span>
              <span className="social-card-label">GitHub · Open Source</span>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/francisco-javier-farias-espinoza-15153a27b/" target="_blank" rel="noreferrer" className="social-card sc-li">
            <div className="social-card-icon"><Li /></div>
            <div className="social-card-info">
              <span className="social-card-handle">Francisco Farías E.</span>
              <span className="social-card-label">LinkedIn · Profesional</span>
            </div>
          </a>
        </div>

        {/* ── Formulario ── */}
        <div className="cform-wrap fade-up">
          <div className="cform-header">
            <Mail />
            <span>Envíame un mensaje directo</span>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} · <span>FRANCISCO JAVIER FARÍAS ESPINOZA</span> · ING. CIVIL EN INFORMÁTICA · CHILE 🇨🇱
    </footer>
  )
}

/* ─── FADE OBSERVER ─────────────────────────────────────── */
function useFadeObserver() {
  useEffect(() => {
    const show = (el) => el.classList.add('visible')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { show(e.target); obs.unobserve(e.target) } }),
      { threshold: 0.04, rootMargin: '0px 0px -40px 0px' }
    )
    const els = document.querySelectorAll('.fade-up')
    els.forEach(el => obs.observe(el))
    // fallback: show after 3s in case observer fails
    const t = setTimeout(() => els.forEach(show), 3000)
    return () => { obs.disconnect(); clearTimeout(t) }
  }, [])
}

/* ─── APP ───────────────────────────────────────────────── */
export default function App() {
  const [booted, setBooted] = useState(false)
  useFadeObserver()
  return (
    <>
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      <Particles />
      <div className="ps-grid-bg">
        <div className="ps-line" /><div className="ps-line" /><div className="ps-line" />
      </div>
      <ScrollProgress />
      <Navbar />
      <Hero visible={booted} />
      <About />
      <TechStack />
      <Projects />
      <WebWork />
      <Contact />
      <Footer />
    </>
  )
}
