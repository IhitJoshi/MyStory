import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Globe, Layers, Star, Eye } from "lucide-react";
import { TypewriterText } from "./TypewriterText";

// ACT 2 — DISCOVERY
// Shader theme: Nebula + soft galaxy particles + exploration flow
// Colors: blue, cyan, teal
// Interaction: mouse gravity pulls nebula + ripples

export default function Act2() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1.02]);

  // SHADER SETUP
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    
    // Responsive pixel ratio based on screen size
    const getPixelRatio = () => {
      const width = window.innerWidth;
      if (width < 640) return 1; // mobile
      if (width < 1024) return 1.25; // tablet
      return Math.min(window.devicePixelRatio, 1.5); // desktop
    };
    
    renderer.setPixelRatio(getPixelRatio());
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = 0;
    renderer.domElement.style.left = 0;
    renderer.domElement.style.zIndex = 0;
    container.appendChild(renderer.domElement);
    canvasRef.current = renderer.domElement;

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

    const geometry = new THREE.PlaneGeometry(container.clientWidth, container.clientHeight);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // *DISCOVERY SHADER* (Nebula + Galaxy Flow)
    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = vUv;
        vec2 st = uv * u_resolution / min(u_resolution.x, u_resolution.y);

        float t = u_time * 0.15;

        // nebula
        float n = fbm(st * 1.2 + vec2(t));
        float n2 = fbm(st * 0.7 - vec2(t * 0.7));

        // mouse gravity disabled
vec2 mouseUV = u_mouse / u_resolution;
float dist = distance(uv, mouseUV);
float gravity = 0.0;

        // final displacement
        vec2 displaced = uv + vec2((n - 0.5) * 0.12, (n2 - 0.5) * 0.12) + (mouseUV - uv) * gravity;

        // color palette
        vec3 nebulaA = vec3(0.0, 0.8, 1.0);      // cyan
        vec3 nebulaB = vec3(0.1, 0.2, 0.6);      // deep blue
        vec3 nebulaC = vec3(0.0, 1.0, 0.9);      // teal

        float mix1 = smoothstep(0.2, 0.8, n);
        float mix2 = smoothstep(0.1, 0.9, n2);

        vec3 color = mix(nebulaA, nebulaB, mix1);
        color = mix(color, nebulaC, mix2);

        // galaxy sparkles
        float stars = pow(noise(st * 20.0), 20.0);
        color += stars * 1.4;

        // subtle vignette toward edges
        float vign = smoothstep(0.9, 0.3, distance(uv, vec2(0.5)));
        color *= 0.35;

        // darken overall
        color = color * 0.22;

        // subtle vignette
        float vignette = smoothstep(0.75, 0.3, distance(uv, vec2(0.5)));
        color *= vignette;(0.8, 1.0, vign);

        // apply displaced UV for animation
vec2 uv2 = displaced;

// recompute nebula with displaced UV for visible motion
vec2 st2 = uv2 * u_resolution / min(u_resolution.x, u_resolution.y);
float dn = fbm(st2 * 1.2 + vec2(t * 1.5));
float dn2 = fbm(st2 * 0.6 - vec2(t * 1.2));

vec3 cA = vec3(0.0, 0.7, 1.0);
vec3 cB = vec3(0.1, 0.2, 0.5);
vec3 cC = vec3(0.0, 1.0, 0.9);

float mx1 = smoothstep(0.2, 0.8, dn);
float mx2 = smoothstep(0.1, 0.9, dn2);

vec3 finalColor = mix(cA, cB, mx1);
finalColor = mix(finalColor, cC, mx2);

float stars2 = pow(noise(st2 * 20.0), 18.0);
finalColor += stars2 * 1.2;

finalColor *= 0.23;

float vign2 = smoothstep(0.85, 0.3, distance(uv2, vec2(0.5)));
finalColor *= vign2;

gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        u_mouse: { value: new THREE.Vector2(container.clientWidth * 0.5, container.clientHeight * 0.5) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    function handleResize(){
      const w = container.clientWidth;
      const h = container.clientHeight;
      
      // Update pixel ratio on resize
      renderer.setPixelRatio(getPixelRatio());
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

    function onMove(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = rect.height - (e.clientY - rect.top);
      material.uniforms.u_mouse.value.set(x, y);
    }
    renderer.domElement.addEventListener("pointermove", onMove);

    let start = performance.now();
    let raf;
    const animate = (now) => {
      material.uniforms.u_time.value = (now - start) / 1000;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      renderer.domElement.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      scene.remove(mesh);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Act 2 original content
  const skills = [
    { name: "HTML", icon: Code, color: "text-orange-400" },
    { name: "CSS", icon: Layers, color: "text-blue-400" },
    { name: "Paint.NET", icon: Globe, color: "text-green-400" },
    { name: "Blogger", icon: Globe, color: "text-red-400" }
  ];

  return (
    <section ref={ref} className="relative h-150vh min-h-[110vh] flex items-center justify-center overflow-hidden bg-black" style={{ position: "relative", isolation: "isolate", zIndex: 2 }}>
      <div ref={containerRef} className="absolute inset-0" style={{ zIndex: 0 }} />

      <motion.div style={{ opacity, scale, zIndex: 20 }} className="relative text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="mb-16">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="inline-flex items-center gap-4 px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50 mb-8">
            <Eye className="w-5 h-5 text-cyan-400" />
            <span className="text-lg text-gray-300 font-semibold">ACT 2</span>
          </motion.div>

          <motion.h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4 sm:mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
            Discovery
          </motion.h2>
        </motion.div>

        {/* MAIN GRID CONTENT (kept from your original) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start max-w-4xl mx-auto mb-8 sm:mb-12">
          {/* Left Column - The Awakening */}
          <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.7, ease: "easeOut" }} className="text-left space-y-6">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.9 }} className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-yellow-400" />
                <span className="text-2xl text-cyan-400/40 font-serif">"</span>
              </motion.div>

              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }} className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
                The web became my <span className="text-cyan-400 font-semibold">universe</span>, 
                and view source was my telescope.
              </motion.p>

              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.4 }} className="text-gray-400 text-sm">
                Every website was a galaxy to explore, every line of code a star to understand.
              </motion.p>
            </div>

            {/* Discovery Moments */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 1.7 }} className="space-y-3 text-gray-400 text-sm bg-gray-800/20 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30">
              <motion.div initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 2 }} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <p>"Right-click → View Source became my superpower"</p>
              </motion.div>

              <motion.div initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 2.2 }} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <p>"I was building worlds while others were browsing them"</p>
              </motion.div>

              <motion.div initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 2.4 }} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <p>"The browser was my canvas, the internet my inspiration"</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - The Tools */}
          <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.9, ease: "easeOut" }} className="text-left">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
              <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.1 }} className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400" />
                My First Digital Toolkit
              </motion.h3>

              {/* Skills Bubbles */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {skills.map((skill, index) => (
                  <motion.div key={skill.name} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 1.3 + index * 0.1, ease: "easeOut" }} className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50 text-center">
                    <skill.icon className={`w-6 h-6 ${skill.color} mx-auto mb-2`} />
                    <p className="text-white text-sm font-medium">{skill.name}</p>
                  </motion.div>
                ))}
              </div>

              {/* First Creation */}
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 1.8 }} className="bg-gray-900/80 rounded-lg p-4 font-mono text-left border border-cyan-500/30">
                <div className="text-cyan-400 text-sm flex items-center gap-2">
                  <span>📄</span>
                  <span>stars_website.html</span>
                </div>
                <div className="text-gray-300 text-sm ml-4 mt-2">{'<h1>Welcome to My Universe</h1>'}</div>
                <div className="text-blue-400 text-sm ml-4">{'<p>Exploring the cosmos, one div at a time</p>'}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Exploration Stats */}
        <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 2.2, ease: "easeOut" }} className="mt-16">
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {[{ label: "First Website", value: "Age 17", emoji: "🚀" }, { label: "Sites Explored", value: "1000+", emoji: "🔍" }, { label: "Code Experiments", value: "∞", emoji: "🧪" }].map((stat, index) => (
              <motion.div key={stat.label} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 2.5 + index * 0.2, ease: "easeOut" }} className="bg-gray-800/50 backdrop-blur-sm rounded-xl px-6 py-4 border border-gray-700/50 min-w-[140px]">
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
