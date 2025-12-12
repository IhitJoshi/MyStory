import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { Flame, Zap, Sparkles, Cpu, Rocket, Brain } from "lucide-react";
import { TypewriterText } from "./TypewriterText";

// ACT 3 — OBSESSION (Fire / Energy Pulse Shader)
// Theme: fast, intense, creative explosion
// Colors: orange / red / yellow - FIRE THEME
// Notes: dark-themed, high-contrast, no mouse interaction

export default function Act3() {
  const containerRef = useRef(null);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1.02]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = 0;
    renderer.domElement.style.left = 0;
    renderer.domElement.style.zIndex = 0;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      container.clientWidth / -2,
      container.clientWidth / 2,
      container.clientHeight / 2,
      container.clientHeight / -2,
      -1000,
      1000
    );
    camera.position.z = 1;

    let geometry = new THREE.PlaneGeometry(container.clientWidth, container.clientHeight);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // Fast plasma + pulsing veins shader
    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform float u_time;
      uniform vec2 u_resolution;

      // -----------------------------
      // RED FIRE-ASH FLOATING PARTICLES
      // -----------------------------

      float hash(float n) { return fract(sin(n) * 43758.5453); }
      float rand(vec2 p) { return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }

      // circular particle
      float particle(vec2 uv, vec2 pos, float radius) {
        float d = length(uv - pos);
        return smoothstep(radius, 0.0, d);
      }

      void main(){
        vec2 uv = vUv;
        float t = u_time * 0.45; // speed

        // BASE DARK BACKGROUND
        // base dark red gradient
        float baseGrad = smoothstep(0.0, 1.0, uv.y);
        vec3 col = mix(vec3(0.08, 0.01, 0.01), vec3(0.16, 0.02, 0.02), baseGrad);

        // -----------------------------
        // FIRE REFLECTION AT BOTTOM (softer, not overpowering)
        // -----------------------------
        float fireArea = smoothstep(0.0, 0.45, uv.y);
        float firePulse = 0.25 + 0.15 * sin(t * 3.0);
        col += vec3(0.55, 0.07, 0.02) * (1.0 - fireArea) * firePulse * 0.7;

        // -----------------------------
        // FLOATING RED FIRE PARTICLES - OPTIMIZED
        // -----------------------------

        const int COUNT = 15;
        for (int i = 0; i < COUNT; i++) {
          float fi = float(i);

          // random horizontal
          float x = hash(fi * 12.345) * 1.1 - 0.05;

          // rising motion
          float speed = 0.20 + hash(fi * 98.123) * 0.35;
          float y = mod(hash(fi * 54.321) + t * speed, 1.15) - 0.1;

          vec2 pos = vec2(x, y);

          // small glowing circle
          float radius = 0.004 + hash(fi * 5.123) * 0.009;
          float p = particle(uv, pos, radius);

          // RED–ORANGE FIRE ASH COLOR
          vec3 pCol = vec3(1.0, 0.25, 0.1) * p * 1.4;

          col += pCol;
        }

        // VIGNETTE
        float vign = smoothstep(1.15, 0.28, distance(uv, vec2(0.5)));
        col *= vign;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
      },
      vertexShader,
      fragmentShader,
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function handleResize(){
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w,h);
      material.uniforms.u_resolution.value.set(w,h);
      camera.left = w / -2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = h / -2;
      camera.updateProjectionMatrix();
      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(w,h);
    }
    window.addEventListener("resize", handleResize);

    let start = performance.now();
    let raf;
    const animate = (now) => {
      material.uniforms.u_time.value = (now - start) / 1000;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // cleanup
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      scene.remove(mesh);
      if(renderer.domElement && container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const techs = ["React", "GSAP", "Figma", "Generative AI", "Three.js"];

  return (
    <section ref={ref} className="relative h-150vh min-h-[108vh] flex items-center justify-center overflow-hidden bg-black" style={{ position: "relative" }}>
      <div ref={containerRef} className="absolute inset-0" />

      <motion.div style={{ opacity, scale }} className="relative z-10 text-center max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="mb-16">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }} className="inline-flex items-center gap-4 px-6 py-3 bg-black/70 backdrop-blur-md rounded-full border border-orange-500/60 mb-8 shadow-lg shadow-orange-500/20">
            <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
            <span className="text-lg text-gray-100 font-semibold tracking-wider">ACT 3</span>
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50" />
          </motion.div>

          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent mb-6 drop-shadow-lg">
            Obsession
          </motion.h2>
        </motion.div>

        {/* Grid content (kept from your original) */}
        <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto mb-12">
          {/* Left Column */}
          <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }} className="text-left space-y-6">
            <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-orange-500/40 shadow-xl shadow-orange-500/10">
              <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.8 }} className="flex items-center gap-3 mb-4">
                <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
                <span className="text-2xl text-orange-500/60 font-serif">"</span>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7, delay: 1 }} className="text-lg md:text-xl text-gray-100 leading-relaxed mb-4">Suddenly, nothing else made sense except <span className="text-orange-400 font-semibold">making things move.</span></motion.p>

              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7, delay: 1.3 }} className="text-gray-200 text-sm">Every animation felt like a heartbeat, every interaction a conversation with the user.</motion.p>
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.6 }} className="space-y-3 text-gray-200 text-sm bg-black/70 backdrop-blur-md rounded-xl p-4 border border-orange-500/30 shadow-lg">
              <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 1.8 }} className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-400" /><p>"I dreamed in keyframes and easings..."</p></motion.div>
              <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 2 }} className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-orange-400" /><p>"Every scroll became an opportunity for magic..."</p></motion.div>
              <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 2.2 }} className="flex items-center gap-2"><Cpu className="w-4 h-4 text-red-400" /><p>"Code became my paint, the browser my canvas."</p></motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }} className="text-left">
            <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-orange-500/40 shadow-xl shadow-orange-500/10">
              <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1 }} className="text-lg font-semibold text-gray-100 mb-4 flex items-center gap-2"><Rocket className="w-5 h-5 text-orange-400" />Creative Arsenal</motion.h3>
              <div className="grid grid-cols-2 gap-3 mb-6">{techs.map((tech, index) => (<motion.div key={tech} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 140, 0, 0.4)' }} transition={{ duration: 0.5, delay: 1.2 + index * 0.1, ease: "easeOut" }} className="bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 text-white px-4 py-3 rounded-xl font-semibold text-center border border-orange-400/50 shadow-lg shadow-orange-500/30 cursor-pointer">{tech}</motion.div>))}</div>
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 1.8 }} className="bg-black/90 rounded-lg p-4 border border-orange-500/50 shadow-lg shadow-orange-500/20"><div className="text-xl md:text-2xl font-bold text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text"><TypewriterText text="I created worlds, not just websites." delay={2200} speed={60} /></div></motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }} className="mt-16">
          <div className="flex flex-wrap justify-center gap-6 text-center">{[{ label: "Systems Designed", value: "30+", emoji: "🎨" }, { label: "Late Nights", value: "Countless", emoji: "🌙" }, { label: "Moments of Innovation", value: "∞", emoji: "✨" }].map((stat, index) => (<motion.div key={stat.label} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 2.5 + index * 0.15, ease: "easeOut" }} className="bg-black/80 backdrop-blur-md rounded-xl px-6 py-4 border border-orange-500/50 min-w-[140px] shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 transition-shadow duration-300"><div className="text-2xl mb-1">{stat.emoji}</div><div className="text-2xl font-bold text-orange-400">{stat.value}</div><div className="text-sm text-gray-200 mt-1">{stat.label}</div></motion.div>))}</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
