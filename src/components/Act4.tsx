import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Zap } from "lucide-react";

export const Act4 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1.02]);

  const projects = [
    {
      title: "Excalidraw Clone",
      year: "2024",
      role: "Frontend Developer",
      description:
        "A smooth and functional drawing experience inspired by Excalidraw, featuring custom canvas logic and a clean UI.",
      tech: ["JavaScript", "TSX", "HTML", "Tailwind CSS"],
      icon: "✏️",
      challenge: "Building a fluid canvas with precise drawing and zero lag.",
    },
    {
      title: "CMIS - College Management Portal",
      year: "2024",
      role: "Student Developer",
      description:
        "A complete portal for managing students, departments, attendance, workflows and internal data.",
      tech: ["JavaScript", "TSX", "HTML", "Tailwind CSS"],
      icon: "🏫",
      challenge: "Creating simple navigation flows for complex data and roles.",
    },
    {
      title: "My Personal Portfolio",
      year: "2025",
      role: "Creative Developer",
      description:
        "A cinematic portfolio showcasing storytelling, depth and smooth scroll-based animations.",
      tech: ["TSX", "Tailwind CSS", "JavaScript", "Framer Motion"],
      icon: "✨",
      challenge: "Balancing performance with heavy animations.",
    },
    {
      title: "Stock Search Engine",
      year: "2025",
      role: "Full-Stack Developer",
      description:
        "A minimal search engine for stock data, price updates and company information.",
      tech: ["JavaScript", "JSX", "Tailwind CSS", "Python"],
      icon: "🔍",
      challenge: "Delivering instant search + optimized rendering.",
    },
  ];

  return (
    <section
      ref={ref}
      className="
      relative h-150vh min-h-[120vh] flex items-center justify-center overflow-hidden 
      bg-[#02060c] px-4 sm:px-6"
      style={{ isolation: "isolate", zIndex: 4 }}
    >

      {/* 🔵 MOVING BLUEPRINT GRID */}
      <div className="absolute inset-0 opacity-[0.15]">
        <motion.div
          className="absolute inset-0 
          bg-[linear-gradient(rgba(0,150,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,150,255,0.3)_1px,transparent_1px)]
          bg-[size:80px_80px]"
          animate={{
            backgroundPositionX: ["0px", "80px"],
            backgroundPositionY: ["0px", "80px"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* 🔷 SCANNING VERTICAL LINES */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[200px] bg-gradient-to-b 
              from-transparent via-cyan-400/40 to-transparent"
            style={{
              left: `${5 + i * 10}%`,
            }}
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: [0, 1, 0], y: [0, 150] }}
            transition={{
              duration: 4,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 🔹 FLOATING BLUEPRINT NODES */}
      <div className="absolute inset-0">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-300 
              shadow-[0_0_6px_2px_rgba(0,255,255,0.5)]"
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              y: [-10, -50],
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
            }}
            style={{
              left: `${10 + (i * 5) % 80}%`,
              top: `${30 + (i * 8) % 50}%`,
            }}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center max-w-6xl mx-auto px-6"
      >
        {/* Header */}
        <div className="mb-16">
          <div
            className="
            inline-flex items-center gap-4 px-6 py-3 
            bg-blue-900/30 backdrop-blur-sm border border-cyan-400/30 rounded-full mb-8"
          >
            <Sparkles className="w-5 h-5 text-cyan-300" />
            <span className="text-lg text-cyan-200 font-semibold tracking-wider">
              ACT 4
            </span>
          </div>

          <h2
            className="text-4xl md:text-6xl font-bold 
            bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent mb-4"
          >
            Architecture
          </h2>

          <p className="text-lg md:text-xl text-blue-200/70 max-w-3xl mx-auto leading-relaxed">
            "From components to systems — this is where everything connected."
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 max-w-5xl mx-auto mb-8 sm:mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4 + index * 0.2,
                ease: "easeOut",
              }}
              className="
              group relative bg-blue-900/20 backdrop-blur-md 
              border border-cyan-400/20 rounded-2xl p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{project.icon}</div>

                  <div>
                    <h3 className="text-xl font-bold text-cyan-100">
                      {project.title}
                    </h3>
                    <p className="text-cyan-200/60 text-sm">{project.role}</p>
                  </div>
                </div>

                <span className="text-sm text-cyan-100 bg-blue-900/40 px-2 py-1 rounded-full border border-cyan-400/20">
                  {project.year}
                </span>
              </div>

              {/* Description */}
              <p className="text-blue-100/80 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="
                    text-xs bg-blue-900/40 text-cyan-200
                    px-2 py-1 rounded-full border border-cyan-400/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Challenge */}
              <div className="border-t border-cyan-400/20 pt-3 flex items-start gap-2 text-blue-200/70 text-sm">
                <Zap className="w-4 h-4 text-cyan-300 mt-0.5" />
                <div>
                  <span className="font-medium text-cyan-200">Challenge: </span>
                  <span>{project.challenge}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
