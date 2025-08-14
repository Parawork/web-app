import { useState, useEffect } from "react";
const SLIDESHOW_IMAGES = [
  "/images/slideshow/1.jpg",
  "/images/slideshow/2.jpg",
  "/images/slideshow/3.jpg",
  "/images/slideshow/4.jpg",
  "/images/slideshow/5.jpg",
];

export default function SlideshowBackground({ isDarkMode }: { isDarkMode: boolean }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-2]">
      {SLIDESHOW_IMAGES.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt="Construction site slideshow"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${current === idx ? "opacity-70" : "opacity-0"}`}
          style={{
            filter: isDarkMode
              ? "brightness(0.5) grayscale(0.2)"
              : "brightness(0.8) grayscale(0.1)",
            transitionProperty: "opacity",
          }}
        />
      ))}
      {/* Overlay for readability */}
      <div
        className={`absolute inset-0 ${isDarkMode ? "bg-slate-900/60" : "bg-white/40"}`}
      ></div>
      {/* Animated Blobs Overlay */}
      <div className="absolute inset-0">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
            isDarkMode ? "bg-cyan-500/10" : "bg-cyan-500/5"
          }`}
        ></div>
        <div
          className={`absolute top-3/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 ${
            isDarkMode ? "bg-purple-500/10" : "bg-purple-500/5"
          }`}
        ></div>
        <div
          className={`absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl animate-pulse delay-2000 ${
            isDarkMode ? "bg-emerald-500/10" : "bg-emerald-500/5"
          }`}
        ></div>
      </div>
    </div>
  );
}