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

    // Sun Position (Top Left Corner) - Smaller
    const sun = {
      x: 0,     // Left edge
      y: 0,     // Top edge
      radius: 150, // Smaller
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

    // Planets - 7 planets with larger, more realistic orbits
    const planets: Planet[] = [
      { x: 0, y: 0, radius: 6, color: "#8B7355", orbitRadius: 400, angle: 0, speed: 0.003 }, // Mercury (brown)
      { x: 0, y: 0, radius: 9, color: "#FDB813", orbitRadius: 550, angle: 1.2, speed: 0.0024 }, // Venus (golden)
      { x: 0, y: 0, radius: 10, color: "#4FD0E9", orbitRadius: 700, angle: 2.4, speed: 0.002 }, // Earth (cyan)
      { x: 0, y: 0, radius: 7, color: "#F87171", orbitRadius: 900, angle: 3.6, speed: 0.0016 }, // Mars (red)
      { x: 0, y: 0, radius: 20, color: "#D4A574", orbitRadius: 1100, angle: 4.8, speed: 0.0012 }, // Jupiter (tan)
      { x: 0, y: 0, radius: 18, color: "#FBBF24", orbitRadius: 1300, angle: 0.6, speed: 0.001 }, // Saturn (amber)
      { x: 0, y: 0, radius: 12, color: "#A78BFA", orbitRadius: 1500, angle: 1.8, speed: 0.0008 }, // Uranus (violet)
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
      // Update Sun position on resize - Keep it at top left corner
      sun.x = 0;
      sun.y = 0;

      // Pulsating effect
      const time = Date.now() * 0.001;
      const pulsation = Math.sin(time) * 0.05 + 1;
      const glowRadius = sun.radius * 4 * pulsation;

      // Glow
      const gradient = ctx.createRadialGradient(sun.x, sun.y, sun.radius * 0.5, sun.x, sun.y, glowRadius);
      gradient.addColorStop(0, "rgba(253, 184, 19, 0.8)");
      gradient.addColorStop(0.2, "rgba(253, 184, 19, 0.2)");
      gradient.addColorStop(0.5, "rgba(253, 184, 19, 0.05)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = sun.color;
      ctx.shadowBlur = 50;
      ctx.shadowColor = "rgba(253, 184, 19, 0.5)";
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Sun Texture (Photosphere Granules)
      ctx.save();
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
      ctx.clip(); // Clip to sun circle

      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2 + time * 0.1; // Rotate slowly
        const dist = Math.random() * sun.radius * 0.8; // Random distance from center
        const spotX = sun.x + Math.cos(angle) * dist;
        const spotY = sun.y + Math.sin(angle) * dist;
        const spotRadius = 10 + Math.random() * 20;

        ctx.fillStyle = `rgba(255, 200, 50, ${0.1 + Math.sin(time * 2 + i) * 0.05})`; // Pulsating opacity
        ctx.beginPath();
        ctx.arc(spotX, spotY, spotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
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
