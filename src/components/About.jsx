import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import bashVisual from '../assets/bash-visual-fgvEJptiKBI-unsplash-1024x683.jpg';
import { siteConfig } from '../data/config';

const RotatingCube = () => {
    const mesh = useRef();
    useFrame((state, delta) => {
        mesh.current.rotation.x += delta * 0.2;
        mesh.current.rotation.y += delta * 0.5;
    });
    return (
        <mesh ref={mesh}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#0d9488" wireframe />
        </mesh>
    );
}

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-24 px-4 bg-dark-900 relative overflow-hidden" id="about">
      {/* Small 3D decoration */}
      <div className="absolute -right-20 top-40 w-96 h-96 opacity-30 pointer-events-none">
          <Canvas>
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 5, 2]} />
              <Float speed={2}>
                  <RotatingCube />
              </Float>
          </Canvas>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Images Column */}
        <motion.div 
          className="w-full lg:w-1/2 flex flex-col gap-6"
          style={{ y }}
        >
          <img 
            src={siteConfig.about.image1 || bashVisual} 
            alt="Caribbean Visual" 
            className="rounded-3xl shadow-2xl shadow-teal-900/20 border border-white/5 object-cover h-80"
          />
          <div className="glass p-8 pl-12 border-l-4 border-l-teal-400">
             <h3 className="text-2xl font-bold mb-2">{siteConfig.about.highlightText}</h3>
             <p className="text-slate-400 text-sm">
                {siteConfig.about.highlightSubtext}
             </p>
          </div>
        </motion.div>

        {/* Text Column */}
        <motion.div 
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-teal-400 mb-6">{siteConfig.about.title}</h2>
          <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
            {siteConfig.about.paragraphs.map((p, idx) => (
               <p key={idx}>{p}</p>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
