import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect, useRef, useState } from "react"

// -------------------------
// 1) Tailwind utility
// -------------------------
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// -------------------------
// 2) useInViewOnce Hook
// -------------------------
export const useInViewOnce = (options: IntersectionObserverInit = {}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [hasBeenInView, setHasBeenInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger once
        if (entry.isIntersecting && !hasBeenInView) {
          setHasBeenInView(true)
        }
      },
      { threshold: 0.3, ...options }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [hasBeenInView, options])

  return { ref, hasBeenInView }
}
