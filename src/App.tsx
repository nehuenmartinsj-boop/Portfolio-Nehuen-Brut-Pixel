/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Menu, ArrowRight, Github, Twitter, Linkedin, ExternalLink, Mail, X } from 'lucide-react';
import { useState, useEffect, FormEvent, useRef, MouseEvent } from 'react';

const PixelSmiley = ({ size = 48, className = "" }: { size?: number, className?: string }) => (
  <div 
    className={`bg-ink p-1 aspect-square flex flex-col justify-between ${className}`} 
    style={{ width: size, height: size }}
  >
    <div className="flex justify-between px-1 pt-1">
      <div className="w-2 h-2 bg-bg" />
      <div className="w-2 h-2 bg-bg" />
    </div>
    <div className="px-1 pb-1 flex justify-center">
      <div className="w-6 h-2 bg-bg relative">
        <div className="absolute -top-2 left-0 w-2 h-2 bg-bg" />
        <div className="absolute -top-2 right-0 w-2 h-2 bg-bg" />
      </div>
    </div>
  </div>
);

const SectionHeading = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-center gap-4 mb-12">
    <span className="font-mono text-accent text-sm opacity-60 tracking-tighter">[{number}]</span>
    <h2 className="text-xl md:text-2xl text-ink">{title}</h2>
  </div>
);

const ProjectCard = ({ title, tags, description }: { title: string; tags: string[]; description: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    
    // Set custom properties for the radial gradient
    cardRef.current.style.setProperty('--mouse-x', `${(e.clientX - rect.left) / rect.width * 100}%`);
    cardRef.current.style.setProperty('--mouse-y', `${(e.clientY - rect.top) / rect.height * 100}%`);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        whileHover={{ y: -8 }}
        className="pixel-border p-6 bg-bg flex flex-col justify-between group cursor-pointer h-full transform-gpu bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(178,255,89,0.05)_0%,transparent_100%)]"
      >
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg text-ink group-hover:text-accent transition-colors">{title}</h3>
            <ExternalLink size={20} className="text-ink group-hover:text-accent transition-colors" />
          </div>
          <p className="font-sans text-sm text-ink opacity-70 mb-6 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="font-mono text-[10px] uppercase border border-ink/30 px-2 py-0.5 opacity-60">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ProjectScreenshotStack = ({ title, images }: { title: string; images: string[]; key?: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <div className="py-20 flex flex-col items-center">
      <h3 className="font-mono text-sm uppercase opacity-40 mb-12 tracking-[0.2em]">{title}</h3>
      <div 
        className="relative cursor-pointer w-full max-w-[200px] h-[280px] md:max-w-[320px] md:h-[420px] group"
        onClick={() => setIsOpen(true)}
      >
        {images.map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, rotate: (i - 1.5) * 5 }}
            animate={{
              x: i * 6,
              y: i * 6,
              rotate: (i - 1.5) * 2,
              zIndex: images.length - i
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute inset-0 pixel-border bg-ink p-1.5 md:p-2 shadow-2xl"
          >
            <div className="w-full h-full bg-white overflow-hidden relative">
              <img 
                src={src} 
                alt={`${title} screenshot ${i}`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 right-2 bg-ink text-bg font-mono text-[8px] px-1 py-0.5">
                VER.0{i+1}
              </div>
            </div>
          </motion.div>
        ))}
        
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-accent whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          [ CLIC PARA DESPLEGAR ]
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-md p-6 overflow-y-auto"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto flex flex-col gap-12 py-24"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center gap-4 mb-8">
                <h2 className="font-mono text-xl uppercase tracking-widest text-ink">{title}</h2>
                <div className="w-20 h-px bg-accent" />
              </div>

              {images.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="pixel-border bg-ink p-2 md:p-4 shadow-[20px_20px_0px_rgba(0,0,0,0.1)]"
                >
                  <img 
                    src={src} 
                    alt="" 
                    className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex justify-between items-center mt-4 px-2">
                    <span className="font-mono text-[10px] opacity-40 uppercase">Captura de Transmisión // 0{i+1}</span>
                    <span className="font-mono text-[10px] text-accent uppercase">OK.STATUS</span>
                  </div>
                </motion.div>
              ))}

              <div className="flex justify-center mt-12">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="pixel-button !text-base"
                >
                  CERRAR PROTOCOLO
                </button>
              </div>
            </motion.div>

            <button 
              onClick={() => setIsOpen(false)}
              className="fixed top-8 right-8 p-4 pixel-border bg-ink text-bg hover:bg-accent hover:text-ink transition-all z-[110]"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectGallery = () => {
  const projects = [
    {
      title: "BRILLO SUREÑO // AUTOLAVADO",
      images: [
        "/img/OsornoWash/Screenshot%202026-05-07%20at%2023-08-32%20Brillo%20Sure%C3%B1o%20-%20Autolavado%20Oso%20Google%20AI%20Studio.png",
        "/img/OsornoWash/Screenshot%202026-05-07%20at%2023-09-50%20Brillo%20Sure%C3%B1o%20-%20Autolavado%20Oso%20Google%20AI%20Studio.png",
        "/img/OsornoWash/Screenshot%202026-05-07%20at%2023-10-10%20Brillo%20Sure%C3%B1o%20-%20Autolavado%20Oso%20Google%20AI%20Studio.png"
      ]
    },
    {
      title: "DENTAL ELITE // CLÍNICA DENTAL",
      images: [
        "/img/DentalElite/Screenshot%202026-05-07%20at%2023-15-38%20Cl%C3%ADnica%20Dental%20Osorno%20-%20Elite%20Google%20AI%20Studio.png",
        "/img/DentalElite/Screenshot%202026-05-07%20at%2023-15-51%20Cl%C3%ADnica%20Dental%20Osorno%20-%20Elite%20Google%20AI%20Studio.png",
        "/img/DentalElite/Screenshot%202026-05-07%20at%2023-16-10%20Cl%C3%ADnica%20Dental%20Osorno%20-%20Elite%20Google%20AI%20Studio.png",
        "/img/DentalElite/Screenshot%202026-05-07%20at%2023-16-22%20Cl%C3%ADnica%20Dental%20Osorno%20-%20Elite%20Google%20AI%20Studio.png"
      ]
    },
    {
      title: "AXIS MODULAR // ARQUITECTURA",
      images: [
        "/img/AxisModular/Screenshot%202026-05-07%20at%2023-18-55%20AXIS%20Modular%20Google%20AI%20Studio.png",
        "/img/AxisModular/Screenshot%202026-05-07%20at%2023-19-07%20AXIS%20Modular%20Google%20AI%20Studio.png",
        "/img/AxisModular/Screenshot%202026-05-07%20at%2023-19-29%20AXIS%20Modular%20Google%20AI%20Studio.png",
        "/img/AxisModular/Screenshot%202026-05-07%20at%2023-19-41%20AXIS%20Modular%20Google%20AI%20Studio.png"
      ]
    },
    {
      title: "VETORA // CUIDADO HOLÍSTICO",
      images: [
        "/img/Vetora/Screenshot%202026-05-07%20at%2023-21-38%20Vetora%20Cuidado%20Hol%C3%ADstico%20Google%20AI%20Studio.png",
        "/img/Vetora/Screenshot%202026-05-07%20at%2023-21-45%20Vetora%20Cuidado%20Hol%C3%ADstico%20Google%20AI%20Studio.png",
        "/img/Vetora/Screenshot%202026-05-07%20at%2023-21-53%20Vetora%20Cuidado%20Hol%C3%ADstico%20Google%20AI%20Studio.png",
        "/img/Vetora/Screenshot%202026-05-07%20at%2023-22-15%20Vetora%20Cuidado%20Hol%C3%ADstico%20Google%20AI%20Studio.png"
      ]
    },
    {
      title: "LAGO RANCO // TURISMO",
      images: [
        "/img/LagoRanco/Screenshot%202026-05-07%20at%2023-25-14%20Lago%20Ranco%202026%20Google%20AI%20Studio.png",
        "/img/LagoRanco/Screenshot%202026-05-07%20at%2023-25-46%20Lago%20Ranco%202026%20Google%20AI%20Studio.png",
        "/img/LagoRanco/Screenshot%202026-05-07%20at%2023-26-00%20Lago%20Ranco%202026%20Google%20AI%20Studio.png",
        "/img/LagoRanco/Screenshot%202026-05-07%20at%2023-26-11%20Lago%20Ranco%202026%20Google%20AI%20Studio.png"
      ]
    }
  ];

  return (
    <section id="gallery" className="scroll-mt-32 max-w-7xl mx-auto mb-40 px-6 overflow-hidden">
      <SectionHeading number="03" title="SHOWCASE DE TRANSMISIÓN" />
      <div className="flex flex-col gap-32">
        {projects.map((p, idx) => (
          <ProjectScreenshotStack key={idx} title={p.title} images={p.images} />
        ))}
      </div>
    </section>
  );
};

const Typewriter = ({ text, delay = 50 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(timer);
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);

  return (
    <span className="inline-flex items-center">
      {displayText}
      <span className="w-[2px] h-[1em] bg-accent ml-1 animate-blink" />
    </span>
  );
};

const ContactForm = () => {
  const [status, setStatus] = useState<'' | 'sending' | 'sent'>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  if (status === 'sent') {
    return (
       <div className="pixel-border p-8 bg-accent/5 flex flex-col items-center justify-center text-center gap-4">
          <PixelSmiley size={64} />
          <p className="font-mono text-sm uppercase tracking-widest text-accent">Transmisión Exitosa</p>
          <button onClick={() => setStatus('')} className="text-[10px] uppercase font-mono opacity-50 hover:opacity-100 transition-opacity underline">Nueva Transmisión</button>
       </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full md:max-w-[281px]">
      <div className="flex flex-col gap-2">
        <label className="font-mono text-[12px] uppercase opacity-40">Identidad</label>
        <input 
          required 
          type="text" 
          placeholder="TU NOMBRE" 
          className="pixel-border bg-bg p-3 font-mono text-xs text-ink placeholder:opacity-20 focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-mono text-[12px] uppercase opacity-40">Canal</label>
        <input 
          required 
          type="email" 
          placeholder="TU@EMAIL.COM" 
          className="pixel-border bg-bg p-3 font-mono text-xs text-ink placeholder:opacity-20 focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-mono text-[12px] uppercase opacity-40">Mensaje</label>
        <textarea 
          required 
          rows={4}
          placeholder="ESCRIBE TU MENSAJE..." 
          className="pixel-border bg-bg p-3 font-mono text-xs text-ink placeholder:opacity-20 focus:outline-none focus:border-accent transition-colors resize-none"
        ></textarea>
      </div>
      <button 
        type="submit" 
        className="pixel-button !text-[12px] w-full flex items-center justify-center gap-2 group relative overflow-hidden h-[46px]"
        disabled={status === 'sending'}
      >
        <AnimatePresence mode="wait">
          {status === 'sending' ? (
            <motion.div 
              key="sending"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 w-full justify-center relative"
            >
              {/* Scanline Effect */}
              <motion.div 
                animate={{ top: ['-20%', '120%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-accent/40 blur-[1px] z-10"
              />
              
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      height: [4, 12, 4],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ 
                      duration: 0.6, 
                      repeat: Infinity, 
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                    className="w-[3px] bg-accent"
                  />
                ))}
              </div>
              
              <motion.span 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="font-mono tracking-[0.2em]"
              >
                TRANSMITIENDO...
              </motion.span>
              
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-3 h-3 border border-accent/30 border-t-accent rounded-full" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              INICIAR PROTOCOLO
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </form>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  const slamVariants = {
    hidden: { scale: 1.5, opacity: 0, y: 50 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.34, 1.56, 0.64, 1] 
      } 
    }
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-bg">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 py-8 md:px-12 md:py-10 flex justify-between items-center bg-bg border-b border-ink/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-mono text-base uppercase tracking-tighter"
        >
          <Typewriter text="Nehuen M. Portfolio // 2025" />
        </motion.div>
        
        <nav className="hidden md:flex gap-10 font-mono text-base uppercase tracking-widest items-center font-light">
          <a href="#work" className="hover:text-accent transition-colors">Sistemas</a>
          <a href="#about" className="hover:text-accent transition-colors">Estrategia</a>
          <a href="#gallery" className="hover:text-accent transition-colors">Trabajos</a>
          <a href="#contact" className="pixel-button !text-base">Colaborar</a>
        </nav>

        <button className="md:hidden text-ink" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </header>

      <main className="pt-32 pb-24 px-6 md:px-12">
        {/* Hero Section */}
        <section className="min-h-[85vh] flex flex-col justify-center items-center text-center py-20 px-4 overflow-hidden">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-4 w-full max-w-5xl"
          >
            <motion.div variants={slamVariants} className="flex flex-col gap-6 md:gap-10 items-center w-full">
              <h1 className="text-[23px] md:text-[70px] leading-none tracking-tighter font-bold uppercase text-center w-full break-words">
                DISEÑADOR
              </h1>
              <div className="flex items-center justify-center gap-2 md:gap-10 w-full flex-wrap">
                <PixelSmiley size={20} className="md:w-12 md:h-12 shrink-0 md:block" />
                <h1 className="text-[23px] md:text-[70px] leading-none tracking-tighter font-bold uppercase text-center break-words">
                  NEHUEN
                </h1>
                <PixelSmiley size={20} className="md:w-12 md:h-12 shrink-0 md:block" />
              </div>
              <h1 className="text-[23px] md:text-[70px] leading-none text-accent tracking-tighter uppercase text-center w-full break-words">
                DESARROLLADOR
              </h1>
            </motion.div>
            
            <motion.div 
              variants={itemVariants} 
              className="mt-12 md:mt-20 max-w-2xl text-center px-4"
            >
              <p className="font-mono text-[10px] md:text-sm opacity-50 leading-relaxed uppercase tracking-widest font-extra-light mb-12">
                Desarrollo de soluciones digitales enfocadas en la conversión. Especialista en SEO, embudos de venta (funnels) y CTAs estratégicos para maximizar resultados.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 w-full sm:w-auto">
                <a href="#work" className="pixel-button !text-sm md:text-lg flex items-center justify-center gap-2 py-4 px-8 w-full sm:w-auto uppercase">
                  Proyectos <ArrowRight size={18} />
                </a>
                <a href="#contact" className="pixel-border px-8 py-4 font-mono text-sm md:text-lg hover:bg-ink hover:text-bg transition-all text-center w-full sm:w-auto uppercase">
                  Agendar Consulta
                </a>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Marquee Section */}
        <div className="py-12 -mx-6 md:-mx-12 overflow-hidden border-y-2 border-ink/20 mb-32 bg-accent/5">
          <div className="flex animate-marquee whitespace-nowrap gap-12">
            {[...Array(12)].map((_, i) => (
              <span key={i} className="font-mono text-accent text-2xl md:text-5xl opacity-40 font-thin uppercase tracking-tighter italic">
                ESTRATEGIA • SEO • FUNNELS • CONVERSIÓN • GOOGLE AI • 
              </span>
            ))}
          </div>
        </div>

        {/* Work Section */}
        <section id="work" className="scroll-mt-32 max-w-7xl mx-auto mb-40 px-6">
          <SectionHeading number="01" title="SOLUCIONES FUNCIONALES" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="BRILLO SUREÑO // AUTOLAVADO" 
              tags={["Web", "SEO", "Vite"]}
              description="Plataforma para autolavado con enfoque en conversión y optimización SEO local para captación de clientes."
            />
            <ProjectCard 
              title="DENTAL ELITE // CLÍNICA" 
              tags={["Health", "React", "Forms"]}
              description="Sistema de gestión y aterrizaje para clínica dental, optimizado para agendamiento y retención de pacientes."
            />
            <ProjectCard 
              title="AXIS MODULAR // ARQUITECTURA" 
              tags={["B2B", "Portfolio", "Design"]}
              description="Catálogo digital de estructuras modulares con visualización de alta calidad y funnel de presupuesto."
            />
             <ProjectCard 
              title="VETORA // CUIDADO HOLÍSTICO" 
              tags={["Wellness", "Landing", "SEO"]}
              description="Ecosistema digital para servicios de salud holística, integrando blog y captación de leads estratégicos."
            />
            <ProjectCard 
              title="LAGO RANCO // TURISMO" 
              tags={["Travel", "Landing", "UX"]}
              description="Landing page de alto impacto para destino turístico, enfocada en la experiencia visual y conversión directa."
            />
            <ProjectCard 
              title="SISTEMA DE GESTIÓN" 
              tags={["Python", "Automatización"]}
              description="Automatización de procesos internos utilizando Python y herramientas de Google para ahorrar horas de trabajo manual."
            />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="scroll-mt-32 max-w-4xl mx-auto mb-40 px-6">
          <SectionHeading number="02" title="ESTRATEGIA" />
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div className="pixel-border w-full max-w-[418px] aspect-[418/363] bg-accent/5 flex items-center justify-center relative overflow-hidden group">
              <PixelSmiley size={100} />
              <div className="absolute inset-x-0 bottom-0 py-3 bg-ink text-bg font-mono text-[11px] text-center uppercase tracking-widest font-bold">
                RESULTADOS MEDIBLES
              </div>
            </div>
            <div className="font-sans space-y-6 text-ink/70 leading-relaxed font-light">
              <p className="text-lg md:text-xl italic font-thin border-l-2 border-accent pl-6">
                "El diseño debe ser invisible si no es funcional. Mi prioridad es que tu web trabaje para ti, maximizando cada visita."
              </p>
              <p className="text-sm">
                Soy Nehuen M., y me especializo en crear herramientas digitales que convierten. No me enfoco solo en la estética; mi objetivo es el <strong>SEO</strong> de alto rendimiento y la creación de <strong>funnels</strong> efectivos que guíen al usuario hacia el éxito.
              </p>
              <p className="text-sm">
                Utilizo <strong>Vibecoding</strong> para prototipar con agilidad en Google AI Studio y Claude Code, integrando el ecosistema de Google (Firebase, Sheets, Forms) para ofrecer soluciones robustas y fáciles de autogestionar.
              </p>
              <p className="text-sm">
                Actualmente estudio Python para llevar mis automatizaciones al siguiente nivel, asegurando que cada línea de código aporte valor real al negocio de mis clientes.
              </p>
              <div className="pt-6 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-mono text-[12px] uppercase text-accent mb-3 font-bold">Protocolos</h4>
                  <ul className="font-mono text-[12px] space-y-1.5 opacity-50 font-light">
                    <li>→ JS / REACT / TS</li>
                    <li>→ PYTHON / DATA</li>
                    <li>→ FIREBASE / SHEETS</li>
                    <li>→ GOOGLE AI ECOSYSTEM</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-[12px] uppercase text-accent mb-3 font-bold">Estado</h4>
                  <ul className="font-mono text-[12px] space-y-1.5 opacity-50 font-light">
                    <li>→ UBIC: ARGENTINA</li>
                    <li>→ ROL: JUNIOR DEV ST.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <ProjectGallery />

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-32 max-w-7xl mx-auto border-t border-ink/20 pt-20 px-6">
          <div className="flex flex-col md:flex-row justify-between gap-16 w-full">
            <div className="w-full md:w-1/2">
              <SectionHeading number="04" title="PROTOCOLO" />
              <h2 className="text-[28px] sm:text-4xl md:text-[51px] font-display leading-[1.1] md:leading-[1.2] mb-8 pb-1 tracking-tighter text-left uppercase italic font-normal">
                LISTO PARA <br className="hidden sm:block" /> TRANSMITIR.
              </h2>
            </div>
            <div className="flex flex-col gap-6 w-full md:w-[400px] lg:w-[450px]">
              <ContactForm />
              <div className="flex gap-4 mt-6">
                {[Github, Twitter, Linkedin].map((Icon, i) => (
                  <button key={i} className="p-3 border border-ink/20 hover:border-accent hover:text-accent transition-all">
                    <Icon size={16} strokeWidth={1.5} />
                  </button>
                ))}
              </div>
              <p className="mt-8 font-mono text-[9px] uppercase opacity-40 tracking-widest font-light">
                Directo: <a href="mailto:hello@nehuen.design" className="underline">HELLO@NEHUEN.DESIGN</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 md:px-12 py-10 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center bg-bg/80 backdrop-blur-sm text-base">
        <span className="font-mono text-[12px] opacity-30 uppercase tracking-[0.2em] mb-4 md:mb-0 font-light">
          Diseñado con intención. Optimizado para la velocidad.
        </span>
        <div className="flex gap-8 font-mono text-[12px] opacity-40 uppercase tracking-tighter font-light">
          <span className="text-[12px]">ARG // 2025</span>
          <span className="text-[12px]">© NEHUEN M.</span>
        </div>
      </footer>

      {/* Mobile Overlay Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-bg z-[100] flex flex-col items-center justify-center gap-12 p-12"
        >
          <button className="absolute top-12 right-12 text-ink" onClick={() => setIsMenuOpen(false)}>
            <ArrowRight size={32} className="rotate-180" />
          </button>
          <nav className="flex flex-col items-center gap-8 font-display text-2xl uppercase text-center">
            <a href="#work" onClick={() => setIsMenuOpen(false)}>Trabajo</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>Sobre mí</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contacto</a>
          </nav>
          <button className="pixel-button mt-12">Currículum</button>
        </motion.div>
      )}
    </div>
  );
}
