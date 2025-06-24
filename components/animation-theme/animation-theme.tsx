"use client";
import { Theme } from "@/types/theme";
import React, { ReactNode, useEffect, useRef, useState } from "react";

const themes = [
  "winter",
  "autumn",
  "spring",
  "green",
  "rain",
  "hearts",
  "eggs",
  "default",
];

interface Particle {
  type: "snow" | "leaf" | "raindrop" | "heart" | "egg";
  x: number;
  y: number;
  r?: number;
  speed: number;
  wind: number;
  rotation?: number;
  rotationSpeed?: number;
  length?: number;
  color: string;
  settled?: boolean;
}

export default function AnimationThemeLayout({
  children,
  activeTheme,
}: {
  children: ReactNode;
  activeTheme: Theme | undefined;
}) {
  const theme = activeTheme?.name || "default";
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const elemsCount = 100;
  const [elemsQuantity, setElemsQuantity] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setElemsQuantity(window.innerWidth > 768 ? elemsCount : elemsCount / 2);
    }
  }, [elemsCount]);

  useEffect(() => {
    if (theme === "default" || elemsQuantity === 0 || !themes.includes(theme))
      return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: elemsQuantity }, () =>
      createParticle(canvas, theme)
    );

    function createParticle(
      canvas: HTMLCanvasElement,
      theme: string
    ): Particle {
      if (theme === "winter") {
        return {
          type: "snow",
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 4 + 1,
          speed: Math.random() * 2 + 0.5,
          wind: Math.random() * 1 - 0.5,
          color: "white",
        };
      }
      if (theme === "autumn" || theme === "spring" || theme === "green") {
        const colors =
          theme === "autumn"
            ? ["#FF4500", "#FF8C00", "#FFD700", "#CD853F"]
            : theme === "spring"
            ? ["#FFC0CB", "#FF69B4", "#FFB6C1"]
            : ["#EEFB8F", "#8FB25C", "#447804", "#346E05", "#243C07"];

        return {
          type: "leaf",
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 5 + 5,
          speed: Math.random() * 0.5 + 0.2,
          wind: Math.random() * 1.5 - 0.75,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 3 - 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          settled: false,
        };
      }
      if (theme === "rain") {
        return {
          type: "raindrop",
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 20 + 10,
          speed: Math.random() * 6 + 4,
          wind: Math.random() * 0.5 - 0.25,
          color: "#87CEEB",
        };
      }
      if (theme === "hearts") {
        return {
          type: "heart",
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 6 + 4,
          speed: Math.random() * 1.5 + 0.5,
          wind: Math.random() * 1 - 0.5,
          color: "red",
        };
      }
      if (theme === "eggs") {
        const colors = [
          "#FFD1DC",
          "#FFF5BA",
          "#C1E1C1",
          "#AEC6CF",
          "#F4C2C2",
          "#FFB347",
          "#B39EB5",
          "#FF6961",
          "#FDFD96",
          "#77DD77",
        ];
        return {
          type: "egg",
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 8 + 6,
          speed: Math.random() * 0.6 + 0.3,
          wind: Math.random() * 1 - 0.5,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 2 - 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        };
      }

      return {
        type: "snow",
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
        wind: Math.random() * 1 - 0.5,
        color: "white",
      };
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = particle.color || "white";

        if (particle.type === "snow") {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.r ?? 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.type === "leaf") {
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(((particle.rotation ?? 0) * Math.PI) / 180);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(
            -(particle.r ?? 3),
            -(particle.r ?? 3),
            0,
            -(particle.r ?? 3) * 2
          );
          ctx.quadraticCurveTo(particle.r ?? 3, -(particle.r ?? 3), 0, 0);
          ctx.fill();
          ctx.restore();
        } else if (particle.type === "raindrop") {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(
            particle.x + particle.wind,
            particle.y + (particle.length ?? 10)
          );
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2;
          ctx.stroke();
        } else if (particle.type === "heart") {
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.beginPath();
          const size = particle.r ?? 5;
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-size, -size, -size * 1.5, size / 2, 0, size * 1.1);
          ctx.bezierCurveTo(size * 1.5, size / 2, size, -size, 0, 0);
          ctx.fill();
          ctx.restore();
        } else if (particle.type === "egg") {
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(((particle.rotation ?? 0) * Math.PI) / 180);
          ctx.beginPath();
          const width = particle.r ?? 8;
          const height = width * 1.4;
          ctx.ellipse(0, 0, width, height, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      update();
      animationFrameId.current = requestAnimationFrame(draw);
    }

    function update() {
      particles.forEach((particle) => {
        particle.y += particle.speed;
        particle.x += particle.wind;

        if (!canvas) return;

        if (particle.type === "leaf" || particle.type === "egg") {
          particle.rotation =
            (particle.rotation ?? 0) + (particle.rotationSpeed ?? 0);
        }

        if (particle.y > canvas.height) {
          Object.assign(particle, createParticle(canvas, theme));
        }
      });
    }

    draw();

    return () => {
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [elemsQuantity, theme]);

  return (
    <div className="h-full">
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: theme === "winter" ? 9999 : -1,
        }}
      />
      {children}
    </div>
  );
}
