import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TypewriterText } from "./TypewriterText";
import { Code, Globe, Layers, Star, Eye } from "lucide-react";

export const Act2 = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1.02]);

  const skills = [
    { name: "HTML", icon: Code, color: "text-orange-400" },
    { name: "CSS", icon: Layers, color: "text-blue-400" },
    { name: "Paint.NET", icon: Globe, color: "text-green-400" },
    { name: "Blogger", icon: Globe, color: "text-red-400" }
  ];

  return (
    <section ref={ref} className="relative h-150vh min-h-[110vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900/20 to-cyan-900/30">
      {/* Subtle Discovery Background */}
      <div className="absolute inset-0">
        {/* Minimal starfield - slower and sparser */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-300 rounded-full"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
              style={{
                left: `${15 + (i * 7)}%`,
                top: `${20 + (i * 6)}%`,
              }}
            />
          ))}
        </div>

        {/* Subtle code elements - barely noticeable */}
        <div className="absolute inset-0 opacity-5">
          {['<div>', '{ }', '.class', 'function()'].map((text, i) => (
            <motion.div
              key={i}
              className="absolute text-cyan-200 font-mono text-xs"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut"
              }}
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
              }}
            >
              {text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Act 2 Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 1,
            ease: "easeOut"
          }}
          className="mb-12 sm:mb-14 lg:mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut"
            }}
            className="inline-flex items-center gap-2 sm:gap-3 lg:gap-4 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50 mb-6 sm:mb-7 lg:mb-8"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-base sm:text-lg text-gray-300 font-semibold tracking-wider">ACT 2</span>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-2 h-2 bg-cyan-400 rounded-full"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 sm:mb-5 lg:mb-6"
          >
            Discovery
          </motion.h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-7 lg:gap-8 items-start max-w-4xl mx-auto mb-10 sm:mb-12">
          {/* Left Column - The Awakening */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ 
              duration: 1,
              delay: 0.7,
              ease: "easeOut"
            }}
            className="text-left space-y-6"
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-700/50">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6,
                  delay: 0.9
                }}
                className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4"
              >
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <span className="text-xl sm:text-2xl text-cyan-400/40 font-serif">"</span>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-3 sm:mb-4">
              >
                The web became my <span className="text-cyan-400 font-semibold">universe</span>, 
                and view source was my telescope.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-gray-400 text-sm"
              >
                Every website was a galaxy to explore, every line of code a star to understand.
              </motion.p>
            </div>

            {/* Discovery Moments */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.7 }}
              className="space-y-2 sm:space-y-3 text-gray-400 text-xs sm:text-sm bg-gray-800/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-700/30"
            >
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 2 }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <p>"Right-click → View Source became my superpower"</p>
              </motion.div>
              
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.2 }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <p>"I was building worlds while others were browsing them"</p>
              </motion.div>
              
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.4 }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <p>"The browser was my canvas, the internet my inspiration"</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - The Tools */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ 
              duration: 1,
              delay: 0.9,
              ease: "easeOut"
            }}
            className="text-left"
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 border border-gray-700/50">
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="text-base sm:text-lg font-semibold text-gray-300 mb-3 sm:mb-4 flex items-center gap-2"
              >
                <Code className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                My First Digital Toolkit
              </motion.h3>
              
              {/* Skills Bubbles */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5 lg:mb-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.6,
                      delay: 1.3 + index * 0.1,
                      ease: "easeOut"
                    }}
                    className="bg-gray-700/50 rounded-xl p-3 sm:p-4 border border-gray-600/50 text-center"
                  >
                    <skill.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${skill.color} mx-auto mb-1.5 sm:mb-2`} />
                    <p className="text-white text-xs sm:text-sm font-medium">{skill.name}</p>
                  </motion.div>
                ))}
              </div>

              {/* First Creation */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                className="bg-gray-900/80 rounded-lg p-3 sm:p-4 font-mono text-left border border-cyan-500/30"
              >
                <div className="text-cyan-400 text-xs sm:text-sm flex items-center gap-2">
                  <span>📄</span>
                  <span>stars_website.html</span>
                </div>
                <div className="text-gray-300 text-sm ml-4 mt-2">
                  {'<h1>Welcome to My Universe</h1>'}
                </div>
                <div className="text-blue-400 text-sm ml-4">
                  {'<p>Exploring the cosmos, one div at a time</p>'}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Exploration Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 1,
            delay: 2.2,
            ease: "easeOut"
          }}
          className="mt-12 sm:mt-14 lg:mt-16"
        >
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 text-center">
            {[
              { label: "First Website", value: "Age 17", emoji: "🚀" },
              { label: "Sites Explored", value: "1000+", emoji: "🔍" },
              { label: "Code Experiments", value: "∞", emoji: "🧪" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 0.6,
                  delay: 2.5 + index * 0.2,
                  ease: "easeOut"
                }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 lg:px-6 lg:py-4 border border-gray-700/50 min-w-[120px] sm:min-w-[140px]"
              >
                <div className="text-xl sm:text-2xl mb-1">{stat.emoji}</div>
                <div className="text-xl sm:text-2xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};