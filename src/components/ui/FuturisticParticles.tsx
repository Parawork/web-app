
import React from "react";

// Utility for random float in range
function randomFloat(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Utility for random int in range
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Particle color palette (futuristic gradients)
const PARTICLE_COLORS = [
  "from-cyan-400 to-purple-500",
  "from-emerald-400 to-cyan-400",
  "from-purple-400 to-pink-500",
  "from-yellow-400 to-orange-500",
  "from-pink-400 to-cyan-400",
  "from-blue-400 to-fuchsia-500",
  "from-emerald-400 to-blue-400",
  "from-purple-400 to-emerald-400",
];

// Particle shapes
const SHAPES = ["rounded-full", "rounded-2xl", "rounded-md"];

const PARTICLE_COUNT = 28;

const FuturisticParticles: React.FC = () => {
  // Generate a fixed set of random properties for each particle
  const particles = React.useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
      const size = randomFloat(18, 54); // px
      const blur = randomFloat(4, 18); // px, less blur for more vibrancy
      const left = randomFloat(0, 100);
      const top = randomFloat(0, 100);
      const duration = randomFloat(7, 16); // seconds
      const delay = randomFloat(0, 8); // seconds
      const color = PARTICLE_COLORS[i % PARTICLE_COLORS.length];
      const shape = SHAPES[i % SHAPES.length];
      const opacity = randomFloat(0.16, 0.32);
      const reverse = i % 2 === 0;
      const glow = randomInt(0, 1) === 1;
      const orbit = randomInt(0, 1) === 1;
      const scale = randomFloat(0.85, 1.18);
      return {
        size,
        blur,
        left,
        top,
        duration,
        delay,
        color,
        shape,
        opacity,
        reverse,
        glow,
        orbit,
        scale,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p, i) => (
        <div
          key={i}
          className={
            [
              "absolute",
              p.shape,
              "bg-gradient-to-br",
              p.color,
              "transition-transform duration-1000",
              p.glow ? "shadow-[0_0_32px_8px_rgba(0,255,255,0.18)]" : "",
              p.orbit ? "animate-orbit-particle" : "animate-float-particle",
              p.reverse ? "reverse-float" : "",
            ].join(" ")
          }
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            filter: `blur(${p.blur}px)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `scale(${p.scale})`,
            zIndex: 0,
          }}
        />
      ))}
    </div>
  );
};

export default FuturisticParticles;
