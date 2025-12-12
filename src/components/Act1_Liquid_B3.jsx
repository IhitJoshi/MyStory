import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypewriterText } from "./TypewriterText";

// Full single-file React component that renders your Act1 section
// with a Three.js WebGL canvas behind it producing a B3-style
// liquid displacement + color flow + displacement map reacting to mouse.

export default function Act1() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [startTyping, setStartTyping] = useState(false);
  const typeRef = useRef(null);

  // -- Framer Motion scroll (kept from original) --
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start end", "end start"] 
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1.02]);

  // Start typing when the typeRef is in view using a simple IntersectionObserver
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setStartTyping(true);
        });
      },
      { threshold: 0.3 }
    );
    if (typeRef.current) io.observe(typeRef.current);
    return () => io.disconnect();
  }, []);

  // -------------------------------
  // THREE.JS + SHADER CANVAS (B3)
  // -------------------------------
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Renderer
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
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.zIndex = 0; // Behind content (content z-index will be higher)
    container.appendChild(renderer.domElement);
    canvasRef.current = renderer.domElement;

    // Scene + Camera
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

    // Plane geometry covering the screen
    const geometry = new THREE.PlaneGeometry(container.clientWidth, container.clientHeight, 1, 1);

    // Shader: vertex shader simply passes UV
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    // Fragment shader: noise / flow + displacement + mouse ripples + color flow
    // Includes a small 2D noise implementation (hash + fbm) to avoid external libs.
    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_mouse_strength;

      // Hash / noise
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        // four corners in 2D of a tile
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 3; i++) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      // ripple function from mouse
      float ripple(vec2 p, vec2 origin, float t) {
        float d = distance(p, origin);
        float wave = sin(20.0 * d - 4.0 * t);
        float falloff = 1.0 / (1.0 + 40.0 * d);
        return wave * falloff;
      }

      void main() {
        vec2 uv = vUv;
        vec2 st = uv * u_resolution.xy / min(u_resolution.x, u_resolution.y);

        // time-based moving field
        float t = u_time * 0.2;
        float n = fbm(st * 0.6 + t);

        // create a displacement field
        float flow = fbm(st * 0.8 + vec2(0.0, -u_time * 0.15));
        vec2 disp = vec2(
          fbm(st * 0.7 + vec2(1.3, 0.5) + t),
          fbm(st * 0.7 + vec2(2.1, 1.7) + t)
        );

        // Mouse ripple
        vec2 mouseNorm = u_mouse / u_resolution;
        float r = ripple(uv, mouseNorm, u_time) * u_mouse_strength;

        // Combine displacement
        vec2 displacedUv = uv + (disp - 0.5) * 0.06 + vec2(r * 0.02);

        // color flow using palette and flow values
        float hueA = 0.65 + 0.2 * sin(u_time * 0.4 + n * 5.0);
        float hueB = 0.85 + 0.2 * cos(u_time * 0.35 - n * 5.0);
        float mixAmt = smoothstep(0.0, 1.0, flow);

        // simple palette function (HSV-ish approximation)
        vec3 colA = vec3(0.4, 0.25, 0.9) * (0.6 + 0.4 * n);
        vec3 colB = vec3(0.1, 0.6, 1.0) * (0.6 + 0.6 * flow);
        vec3 color = mix(colA, colB, mixAmt);

        // add bright veins
        float veins = smoothstep(0.4, 0.6, fbm(st * 6.0 - u_time * 0.8));
        color += veins * 0.12;

        // dark vignette
        float vign = smoothstep(0.8, 0.2, distance(uv, vec2(0.5)));
        color *= mix(0.8, 1.0, vign);

        // final brightness modulation and gamma
        color = pow(color, vec3(0.9));

        // Reduce overall brightness and opacity for better text visibility
        color *= 0.35;

        gl_FragColor = vec4(color, 0.4);
      }
    `;

    // Shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_mouse_strength: { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // handle resizing
    function handleResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      material.uniforms.u_resolution.value.set(w, h);

      // update camera & plane to cover new size
      camera.left = w / -2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = h / -2;
      camera.updateProjectionMatrix();

      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(w, h, 1, 1);
    }

    window.addEventListener("resize", handleResize);

    // Mouse interaction
    let mouseStrength = 0.0;
    function onPointerMove(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = (e.clientX - rect.left);
      const y = rect.height - (e.clientY - rect.top); // flip Y so shader uses same orientation
      material.uniforms.u_mouse.value.set(x, y);
      mouseStrength = 1.0;
      material.uniforms.u_mouse_strength.value = mouseStrength;
    }

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerMove);

    // animate
    let start = performance.now();
    let raf = null;

    const animate = (now) => {
      const elapsed = (now - start) / 1000;
      material.uniforms.u_time.value = elapsed;

      // decay mouse strength gradually
      mouseStrength *= 0.96;
      material.uniforms.u_mouse_strength.value = mouseStrength;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // cleanup
    return () => {
      cancelAnimationFrame(raf);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      scene.remove(mesh);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // -------------------------------
  // JSX: your original Act1 content placed on top of the canvas
  // -------------------------------
  return (
    <section
      ref={containerRef}
      className="h-150vh relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black"
      style={{ position: "relative", isolation: "isolate", zIndex: 1 }}
    >
      {/* zIndex: 0 is the canvas; we put content in zIndex: 10 */}
      <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <motion.div style={{ opacity, scale }} className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} className="mb-16">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} className="inline-flex items-center gap-4 px-6 py-3 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50 mb-8">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-lg text-gray-300 font-semibold tracking-wider">ACT 1</span>
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="w-2 h-2 bg-green-500 rounded-full" />
            </motion.div>

            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4 sm:mb-6">
              The Spark
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start max-w-4xl mx-auto">
            <motion.div initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.7, ease: "easeOut" }} className="text-left space-y-6">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.9 }} className="text-4xl text-purple-400/40 font-serif mb-4">"</motion.div>

                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }} className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
                  It didn't begin with ambition... it began with confusion.  
                  A moment when something small broke—  
                  and I couldn't stand not knowing <span className="text-yellow-400 font-semibold">why.</span>
                </motion.p>

                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.4 }} className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4">
                  I wasn't trying to build the future.  
                  I was just trying to understand the present.  
                  A loose screw here, a cracked circuit there—  
                  every failure whispering <span className="text-yellow-400 font-semibold">"try again."</span>
                </motion.p>

                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.7 }} className="text-gray-400 text-sm">
                  And somewhere between breaking things and fixing them,  
                  curiosity stopped being a hobby...  
                  and became the first spark of who I was meant to become.
                </motion.p>
              </div>
            </motion.div>

            <motion.div initial={{ x: 20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.9, ease: "easeOut" }} className="text-left" ref={typeRef}>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.1 }} className="flex items-center gap-2 mb-4">
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

          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 2.5, ease: "easeOut" }} className="mt-16">
            <div className="flex flex-wrap justify-center gap-6 text-center">
              {[{ label: "Questions Asked", value: "10,000+" }, { label: "Failures Faced", value: "Countless" }, { label: "Where It Began", value: "1 Spark" }].map((stat, index) => (
                <motion.div key={stat.label} initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 2.8 + index * 0.2, ease: "easeOut" }} className="bg-gray-800/50 backdrop-blur-sm rounded-xl px-6 py-4 border border-gray-700/50 min-w-[120px]">
                  <div className="text-2xl font-bold text-purple-400">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
