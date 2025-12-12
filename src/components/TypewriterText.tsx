import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export const TypewriterText = ({ 
  text, 
  className = "", 
  delay = 0, 
  speed = 50 
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    let typeInterval: NodeJS.Timeout;
    
    const timer = setTimeout(() => {
      if (!isMountedRef.current) return;
      
      setIsTyping(true);
      let index = 0;
      
      typeInterval = setInterval(() => {
        if (!isMountedRef.current) {
          clearInterval(typeInterval);
          return;
        }
        
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, speed);
    }, delay);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
      if (typeInterval) {
        clearInterval(typeInterval);
      }
    };
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {displayText}
      {isTyping && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-0.5 h-6 bg-white ml-1"
        />
      )}
    </span>
  );
};
