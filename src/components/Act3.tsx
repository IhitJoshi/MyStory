import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TypewriterText } from "./TypewriterText";
import { Flame, Zap, Sparkles, Cpu, Rocket, Brain } from "lucide-react";

export const Act3 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1.02]);

  const techs = ["React", "GSAP", "Figma", "Generative AI", "Three.js"];

  return (
    <section
      ref={ref}
      className="relative h-150vh min-h-[108vh] flex items-center justify-center 
      overflow-hidden text-gray-200
      bg-gradient-to-b from-black via-red-950/40 to-black"
    >
      {/* FIRE BACKGROUND EFFECTS - OPTIMIZED */}
      <div className="absolute inset-0">
        {/* Rising Fire Embers - Reduced */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-500 rounded-full"
              animate={{
                y: [0, -200],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-20px',
                boxShadow: '0 0 10px rgba(255, 153, 0, 0.8)',
              }}
            />
          ))}
        </div>

        {/* Flickering Fire Glow Orbs - Reduced */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-3xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1,
                ease: "linear"
              }}
              style={{
                width: '200px',
                height: '200px',
                background: i % 2 === 0 
                  ? 'radial-gradient(circle, rgba(255,69,0,0.4) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(255,140,0,0.3) 0%, transparent 70%)',
                left: `${(i * 25) + 15}%`,
                top: `${30 + Math.sin(i) * 30}%`,
              }}
            />
          ))}
        </div>

        {/* Floating Sparks - Reduced */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              animate={{
                y: [0, -100],
                x: [0, Math.sin(i) * 30],
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 20}%`,
                filter: 'blur(0.5px)',
              }}
            />
          ))}
        </div>

        {/* Flame Waves - Reduced */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-32 bg-gradient-to-t from-orange-600 to-transparent"
              animate={{
                opacity: [0.1, 0.4, 0.1],
                scaleY: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 2.5,
                ease: "linear"
              }}
              style={{
                bottom: `${i * 40}%`,
                transformOrigin: 'bottom',
              }}
            />
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center max-w-6xl mx-auto px-6"
      >
        {/* HEADER */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="inline-flex items-center gap-4 px-6 py-3 
            bg-black/70 backdrop-blur-md 
            rounded-full border border-orange-500/60 mb-8 shadow-lg shadow-orange-500/20"
          >
            <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
            <span className="text-lg text-gray-100 font-semibold tracking-wider">
              ACT 3
            </span>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold 
            bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent mb-6
            drop-shadow-lg"
          >
            Obsession
          </motion.h2>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto mb-12">

          {/* LEFT COLUMN */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-left space-y-6"
          >
            <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-orange-500/40 shadow-xl shadow-orange-500/10">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-center gap-3 mb-4"
              >
                <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
                <span className="text-2xl text-orange-500/60 font-serif">"</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="text-lg md:text-xl text-gray-100 leading-relaxed mb-4"
              >
                Suddenly, nothing else made sense except{" "}
                <span className="text-orange-400 font-semibold">making things move.</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.3 }}
                className="text-gray-200 text-sm"
              >
                Every animation felt like a heartbeat, every interaction a conversation with the user.
              </motion.p>
            </div>

            {/* MANIFESTO */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="space-y-3 text-gray-200 text-sm 
              bg-black/70 backdrop-blur-md rounded-xl p-4 border border-orange-500/30 shadow-lg"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
                className="flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-yellow-400" />
                <p>"I dreamed in keyframes and easings..."</p>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-orange-400" />
                <p>"Every scroll became an opportunity for magic..."</p>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.2 }}
                className="flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-red-400" />
                <p>"Code became my paint, the browser my canvas."</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-orange-500/40 shadow-xl shadow-orange-500/10">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2"
              >
                <Rocket className="w-5 h-5 text-orange-400" />
                Creative Arsenal
              </motion.h3>

              {/* TECH STACK */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {techs.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 140, 0, 0.4)' }}
                    transition={{
                      duration: 0.5,
                      delay: 1.2 + index * 0.1,
                      ease: "easeOut"
                    }}
                    className="bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 text-white 
                    px-4 py-3 rounded-xl font-semibold text-center border border-orange-400/50
                    shadow-lg shadow-orange-500/30 cursor-pointer"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>

              {/* DECLARATION */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.8 }}
                className="bg-black/90 rounded-lg p-4 border border-orange-500/50 shadow-lg shadow-orange-500/20"
              >
                <div className="text-xl md:text-2xl font-bold 
                text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text">
                  <TypewriterText
                    text="I created worlds, not just websites."
                    delay={2200}
                    speed={60}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* STATS */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 2.2,
            ease: "easeOut"
          }}
          className="mt-16"
        >
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {[
              { label: "Systems Designed", value: "30+", emoji: "🎨" },
              { label: "Late Nights", value: "Countless", emoji: "🌙" },
              { label: "Moments of Innovation", value: "∞", emoji: "✨" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 2.5 + index * 0.15,
                  ease: "easeOut"
                }}
                className="bg-black/80 backdrop-blur-md 
                rounded-xl px-6 py-4 border border-orange-500/50 min-w-[140px]
                shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 transition-shadow duration-300"
              >
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="text-2xl font-bold text-orange-400">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-200 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};
