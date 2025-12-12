import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TypewriterText } from "./TypewriterText";
import { Zap } from "lucide-react";

export const Act1 = () => {
  const ref = useRef(null);
  const typeRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // When typewriter enters view
  const typeInView = useInView(typeRef, { amount: 0.3, once: true });

  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (typeInView) setStartTyping(true);
  }, [typeInView]);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1.02]);

  return (
    <section
      ref={ref}
      className="h-150vh relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(124,58,237,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.1)_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Slow particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                y: [0, -40],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeOut",
              }}
              style={{
                left: `${10 + i * 12}%`,
                top: `${30 + i * 5}%`,
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
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: "easeOut",
            }}
            className="inline-flex items-center gap-4 px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50 mb-8"
          >
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-lg text-gray-300 font-semibold tracking-wider">
              ACT 1
            </span>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6"
          >
            The Spark
          </motion.h2>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
          {/* TEXT */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.7,
              ease: "easeOut",
            }}
            className="text-left space-y-6"
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.9,
                }}
                className="text-4xl text-purple-400/40 font-serif mb-4"
              >
                "
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4"
              >
                It didn't begin with ambition... it began with confusion.  
                A moment when something small broke—  
                and I couldn't stand not knowing{" "}
                <span className="text-yellow-400 font-semibold">why.</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4"
              >
                I wasn't trying to build the future.  
                I was just trying to understand the present.  
                A loose screw here, a cracked circuit there—  
                every failure whispering  
                <span className="text-yellow-400 font-semibold">"try again."</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.7 }}
                className="text-gray-400 text-sm"
              >
                And somewhere between breaking things and fixing them,  
                curiosity stopped being a hobby...  
                and became the first spark of who I was meant to become.
              </motion.p>
            </div>
          </motion.div>

          {/* TYPEWRITER — only starts when IN VIEW */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.9,
              ease: "easeOut",
            }}
            className="text-left"
            ref={typeRef}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              {/* Window indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500 ml-2">terminal</span>
              </motion.div>

              <div className="font-mono text-gray-200">
                {startTyping && (
                  <TypewriterText
                    text="Before I ever wrote a single line of code, I was decoding life itself. I didn't have tools, mentors, or a roadmap—just questions. Why does this work? Why does it break? Why do I feel the need to understand everything around me? That restless curiosity became my first superpower, long before I knew how to use it."
                    delay={0}
                    speed={40}
                    className="text-lg leading-relaxed"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* STATS */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            delay: 2.5,
            ease: "easeOut",
          }}
          className="mt-16"
        >
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {[  
              { label: "Questions Asked", value: "10,000+" },
              { label: "Failures Faced", value: "Countless" },
              { label: "Where It Began", value: "1 Spark" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 2.8 + index * 0.2,
                  ease: "easeOut",
                }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl px-6 py-4 border border-gray-700/50 min-w-[120px]"
              >
                <div className="text-2xl font-bold text-purple-400">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">
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
