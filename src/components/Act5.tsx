import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { TypewriterText } from "./TypewriterText";
import { Send, Mail, Github, Linkedin, Twitter, Heart, ArrowRight } from "lucide-react";
import { useInViewOnce } from "../lib/utils";

export const Act5 = () => {
  const ref = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1.02]);

  const L1 = useInViewOnce();
  const L2 = useInViewOnce();
  const L3 = useInViewOnce();
  const L4 = useInViewOnce();

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/IhitJoshi" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ihit-joshi-a82859300/" },
    { icon: Twitter, label: "Twitter", href: "https://x.com/JoshiC77939" },
    { icon: Mail, label: "Email", href: "mailto:joshiihitc@gmail.com" },
  ];

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <section
      ref={ref}
      className="relative h-150vh min-h-[150vh] flex items-center justify-center overflow-hidden 
      bg-gradient-to-b from-[#0a0f14] via-[#0c1b22] to-[#0a0f14]"
      style={{ isolation: "isolate", zIndex: 5 }}
    >

      {/* BACKGROUND ANIMATION */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_80%,rgba(56,189,248,0.25),transparent_70%)]" />

      <div className="absolute inset-0">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-300/40"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -70],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <motion.div style={{ opacity, scale }} className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-4 px-6 py-3
          bg-black/40 backdrop-blur-sm rounded-full border border-teal-400/30 mb-8">
            <Heart className="w-5 h-5 text-teal-400" />
            <span className="text-lg text-gray-300 font-semibold tracking-wider">ACT 5</span>

            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-2 h-2 bg-teal-400 rounded-full"
            />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold 
          bg-gradient-to-r from-blue-300 to-teal-300 bg-clip-text text-transparent">
            Connection
          </h2>
        </div>

        {/* STORY */}
        <div className="bg-black/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-teal-400/20 max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <div className="text-4xl text-blue-300/40 font-serif mb-6">"</div>

          <div className="space-y-6 sm:space-y-8 lg:space-y-10 text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            <div ref={L1.ref}>
              {L1.hasBeenInView && <TypewriterText text="If you've read this far, maybe you're part of the journey too." speed={50} />}
            </div>

            <div ref={L2.ref} className="flex justify-center gap-2 text-blue-300">
              <ArrowRight className="w-5 h-5" />
              {L2.hasBeenInView && <TypewriterText text="So... where do we go from here?" speed={55} />}
            </div>

            <div ref={L3.ref}>
              {L3.hasBeenInView && <TypewriterText text="I'm building more ideas, more tools, more experiences." speed={50} />}
            </div>

            <div
              ref={L4.ref}
              className="text-transparent bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text font-semibold text-xl"
            >
              {L4.hasBeenInView && <TypewriterText text="And I'd love to hear what you're creating too." speed={55} />}
            </div>
          </div>
        </div>

        {/* CONTACT + SOCIAL */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto mb-12 sm:mb-16">

          {/* FORM */}
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 border border-teal-400/20">
            {!isSubmitted ? (
              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input type="hidden" name="access_key" value="2b9991cf-f65e-4fb9-b028-6ded887bc278" />
                <input type="hidden" name="subject" value="New Portfolio Message" />
                <input type="hidden" name="from_name" value="Portfolio Form" />

                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-gray-700/50 rounded-xl text-sm sm:text-base text-white"
                  required
                />

                <textarea
                  name="message"
                  placeholder="Your message"
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-black/40 border border-gray-700/50 rounded-xl text-sm sm:text-base text-white resize-none"
                  required
                />

                <button className="w-full bg-gradient-to-r from-blue-500 to-teal-400 
                text-white font-semibold py-2 sm:py-3 text-sm sm:text-base rounded-xl flex justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full 
                flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                <p className="text-gray-400">I'll get back to you soon.</p>
              </div>
            )}
          </div>

          {/* SOCIAL LINKS */}
          <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 border border-teal-400/20">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">Find Me Online</h3>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="flex items-center gap-3 p-4 bg-black/30 rounded-xl 
                  border border-gray-600/50 hover:bg-black/50 transition"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg 
                  flex items-center justify-center">
                    <social.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium">{social.label}</span>
                </a>
              ))}
            </div>

          </div>

        </div>

      </motion.div>
    </section>
  );
};
