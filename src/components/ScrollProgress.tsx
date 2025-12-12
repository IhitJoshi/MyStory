
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20">
      <motion.div
        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};
