"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  accent: boolean;
}

/**
 * Decorative research-network backdrop: drifting nodes joined by proximity
 * links, drawn on a canvas sized to its container. The animation is skipped
 * entirely for reduced-motion users (a static frame is drawn instead) and is
 * paused when the canvas leaves the viewport or the tab is hidden.
 */
export function NetworkCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let frame = 0;
    let running = true;
    const pointer = { x: 0, y: 0, active: false };

    const seed = (() => {
      let a = 0x2f6a2b1;
      return () => {
        a = (a * 1664525 + 1013904223) % 4294967296;
        return a / 4294967296;
      };
    })();

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.round((width * height) / 17000);
      const count = Math.max(28, Math.min(110, density));
      nodes = Array.from({ length: count }, (_, index) => ({
        x: seed() * width,
        y: seed() * height,
        vx: (seed() - 0.5) * 0.16,
        vy: (seed() - 0.5) * 0.16,
        r: 0.9 + seed() * 1.7,
        accent: index % 9 === 0,
      }));
    };

    const linkDistance = () => (width < 640 ? 108 : 148);

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const maxDistance = linkDistance();

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          if (distance > maxDistance) continue;
          const strength = 1 - distance / maxDistance;
          const accentLink = a.accent || b.accent;
          context.strokeStyle = accentLink
            ? `rgba(16, 192, 127, ${strength * 0.42})`
            : `rgba(199, 214, 232, ${strength * 0.26})`;
          context.lineWidth = accentLink ? 0.9 : 0.7;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      nodes.forEach((node) => {
        context.beginPath();
        context.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        context.fillStyle = node.accent ? "rgba(16, 192, 127, 0.92)" : "rgba(226, 235, 246, 0.68)";
        context.fill();
      });
    };

    const step = () => {
      if (!running) return;
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (pointer.active) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 130 && distance > 0.5) {
            node.x += (dx / distance) * 0.22;
            node.y += (dy / distance) * 0.22;
          }
        }

        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      });
      draw();
      frame = requestAnimationFrame(step);
    };

    const start = () => {
      if (reduceMotion) {
        draw();
        return;
      }
      cancelAnimationFrame(frame);
      running = true;
      frame = requestAnimationFrame(step);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    build();
    start();

    const resizeObserver = new ResizeObserver(() => {
      build();
      if (reduceMotion) draw();
    });
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible) start();
        else stop();
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(canvas);

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    if (!reduceMotion) {
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibilityChange);
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
