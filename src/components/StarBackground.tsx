"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
}

interface Planet {
  x: number;
  y: number;
  radius: number;
  color: string;
  orbitRadius: number;
  angle: number;
  speed: number;
}

interface Comet {
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
}

interface Constellation {
  stars: { x: number; y: number; size: number }[];
  connections: [number, number][];
  offsetX: number;
  offsetY: number;
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    // Sun Position (Top Right) - More realistic size
    const sun = {
      x: width * 0.9,
      y: height * 0.15,
      radius: 50, // Smaller, more realistic
      color: "#FDB813",
      glowColor: "rgba(253, 184, 19, 0.3)",
    };

    // Stars
    let stars: Star[] = [];
    const initStars = () => {
      stars = [];
      const numStars = Math.floor((width * height) / 6000);
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * width,
          y: (Math.random() * height) - 80,
          radius: Math.random() * 1.5,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.005,
        });
      }
    };

    // Constellations - Multiple patterns, randomly selected
    const constellationPatterns = [
      {
        // Big Dipper
        name: "Big Dipper",
        stars: [
          { x: 0, y: 0, size: 2 },
          { x: 40, y: 10, size: 1.8 },
          { x: 80, y: 5, size: 2.2 },
          { x: 120, y: 15, size: 1.5 },
          { x: 140, y: 50, size: 2 },
          { x: 100, y: 80, size: 1.8 },
          { x: 60, y: 75, size: 2 },
        ],
        connections: [
          [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]
        ] as [number, number][],
      },
      {
        // Orion's Belt and surrounding stars
        name: "Orion",
        stars: [
          { x: 50, y: 0, size: 2.2 },      // Betelgeuse
          { x: 30, y: 40, size: 1.5 },     // Belt star 1
          { x: 50, y: 45, size: 1.8 },     // Belt star 2
          { x: 70, y: 50, size: 1.5 },     // Belt star 3
          { x: 50, y: 90, size: 2 },       // Rigel
          { x: 10, y: 20, size: 1.6 },     // Shoulder
          { x: 90, y: 25, size: 1.6 },     // Shoulder
        ],
        connections: [
          [5, 0], [0, 6], [5, 1], [1, 2], [2, 3], [6, 3], [1, 4], [3, 4]
        ] as [number, number][],
      },
      {
        // Cassiopeia (W shape)
        name: "Cassiopeia",
        stars: [
          { x: 0, y: 40, size: 2 },
          { x: 30, y: 10, size: 1.8 },
          { x: 60, y: 35, size: 2.2 },
          { x: 90, y: 5, size: 1.8 },
          { x: 120, y: 30, size: 2 },
        ],
        connections: [
          [0, 1], [1, 2], [2, 3], [3, 4]
        ] as [number, number][],
      },
    ];

    // Randomly select a constellation pattern
    const selectedPattern = constellationPatterns[Math.floor(Math.random() * constellationPatterns.length)];

    const constellation: Constellation = {
      stars: selectedPattern.stars,
      connections: selectedPattern.connections,
      // Random position (avoiding edges and sun area)
      offsetX: Math.random() * (width * 0.5) + width * 0.05,
      offsetY: Math.random() * (height * 0.5) + height * 0.25,
    };

    // Planets - 7 planets with larger, more realistic orbits
    const planets: Planet[] = [
      { x: 0, y: 0, radius: 6, color: "#8B7355", orbitRadius: 300, angle: 0, speed: 0.003 }, // Mercury (brown)
      { x: 0, y: 0, radius: 9, color: "#FDB813", orbitRadius: 450, angle: 1.2, speed: 0.0024 }, // Venus (golden)
      { x: 0, y: 0, radius: 10, color: "#4FD0E9", orbitRadius: 600, angle: 2.4, speed: 0.002 }, // Earth (cyan)
      { x: 0, y: 0, radius: 7, color: "#F87171", orbitRadius: 800, angle: 3.6, speed: 0.0016 }, // Mars (red)
      { x: 0, y: 0, radius: 20, color: "#D4A574", orbitRadius: 1000, angle: 4.8, speed: 0.0012 }, // Jupiter (tan)
      { x: 0, y: 0, radius: 18, color: "#FBBF24", orbitRadius: 1200, angle: 0.6, speed: 0.001 }, // Saturn (amber)
      { x: 0, y: 0, radius: 12, color: "#A78BFA", orbitRadius: 1400, angle: 1.8, speed: 0.0008 }, // Uranus (violet)
    ];

    // Comet
    let comet: Comet | null = null;
    let cometTimer = 0;

    const spawnComet = () => {
      // Spawn from farther away
      const startSide = Math.random() > 0.5 ? "left" : "bottom";
      let x, y, angle;

      if (startSide === "left") {
        x = -200; // Farther off-screen
        y = Math.random() * height * 1.5; // Wider range
      } else {
        x = Math.random() * width * 1.5; // Wider range
        y = height + 200; // Farther off-screen
      }

      // Calculate angle towards sun area (with some randomness)
      const targetX = sun.x + (Math.random() - 0.5) * 500; // Wider target area
      const targetY = sun.y + (Math.random() - 0.5) * 500;
      angle = Math.atan2(targetY - y, targetX - x);

      comet = {
        x,
        y,
        length: 150,
        angle,
        speed: 2 + Math.random() * 2, // Reduced speed (was 4 + random*3)
        opacity: 1,
      };
    };

    const drawSun = () => {
      // Update Sun position on resize
      sun.x = width * 0.85;
      sun.y = height * 0.2;

      // Glow
      const gradient = ctx.createRadialGradient(sun.x, sun.y, sun.radius * 0.5, sun.x, sun.y, sun.radius * 4);
      gradient.addColorStop(0, "rgba(253, 184, 19, 0.8)");
      gradient.addColorStop(0.1, "rgba(253, 184, 19, 0.3)");
      gradient.addColorStop(0.4, "rgba(253, 184, 19, 0.05)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, sun.radius * 4, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = sun.color;
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawStars = () => {
      ctx.fillStyle = "#FFF";
      stars.forEach((star) => {
        ctx.globalAlpha = Math.abs(Math.sin(Date.now() * 0.001 + star.x)) * 0.5 + 0.3; // Twinkle
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    };

    const drawConstellation = () => {
      // Draw connections
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 1;
      constellation.connections.forEach(([start, end]) => {
        const startStar = constellation.stars[start];
        const endStar = constellation.stars[end];
        ctx.beginPath();
        ctx.moveTo(
          constellation.offsetX + startStar.x,
          constellation.offsetY + startStar.y
        );
        ctx.lineTo(
          constellation.offsetX + endStar.x,
          constellation.offsetY + endStar.y
        );
        ctx.stroke();
      });

      // Draw stars
      ctx.fillStyle = "#FFF";
      constellation.stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(
          constellation.offsetX + star.x,
          constellation.offsetY + star.y,
          star.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });
    };

    const drawPlanets = () => {
      planets.forEach((planet) => {
        planet.angle += planet.speed;
        planet.x = sun.x + Math.cos(planet.angle) * planet.orbitRadius;
        planet.y = sun.y + Math.sin(planet.angle) * planet.orbitRadius;

        // Planet
        ctx.fillStyle = planet.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = planet.color;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const drawComet = () => {
      if (!comet) {
        cometTimer++;
        if (cometTimer > 200 && Math.random() < 0.01) { // Random spawn chance
          spawnComet();
          cometTimer = 0;
        }
        return;
      }

      // Move comet
      comet.x += Math.cos(comet.angle) * comet.speed;
      comet.y += Math.sin(comet.angle) * comet.speed;

      // Distance to sun
      const dx = comet.x - sun.x;
      const dy = comet.y - sun.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Fade out near sun
      if (dist < 300) {
        comet.opacity = Math.max(0, (dist - 100) / 200);
      }

      // Remove if off screen or faded out - Allow to go further off screen
      if (comet.opacity <= 0.01 || (comet.x > width + 500 || comet.y < -500)) {
        comet = null;
        return;
      }

      // Draw Comet
      const gradient = ctx.createLinearGradient(
        comet.x,
        comet.y,
        comet.x - Math.cos(comet.angle) * comet.length,
        comet.y - Math.sin(comet.angle) * comet.length
      );
      gradient.addColorStop(0, `rgba(255, 255, 255, ${comet.opacity})`);
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      ctx.strokeStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(comet.x, comet.y);
      ctx.lineTo(
        comet.x - Math.cos(comet.angle) * comet.length,
        comet.y - Math.sin(comet.angle) * comet.length
      );
      ctx.stroke();

      // Head
      ctx.fillStyle = `rgba(255, 255, 255, ${comet.opacity})`;
      ctx.beginPath();
      ctx.arc(comet.x, comet.y, 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Background gradient (deep space)
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, "#0f172a"); // slate-900
      bgGradient.addColorStop(1, "#020617"); // slate-950

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      drawStars();
      drawConstellation();
      drawSun();
      drawPlanets();
      drawComet();

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />;
}
