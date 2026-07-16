import React, { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position for a subtle wind drift effect on dust
    const mouse = {
      x: null,
      y: null,
      active: false
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // 1. Slow, Giant Ambient Glow Lights (Light leaks in background)
    const glowLights = [
      {
        x: width * 0.25,
        y: height * 0.3,
        radius: Math.max(300, width * 0.3),
        color: 'rgba(224, 152, 36, 0.04)', // Soft Gold
        vx: 0.15,
        vy: 0.1
      },
      {
        x: width * 0.75,
        y: height * 0.7,
        radius: Math.max(350, width * 0.35),
        color: 'rgba(14, 165, 233, 0.035)', // Soft Blue/Cyan
        vx: -0.1,
        vy: -0.12
      },
      {
        x: width * 0.5,
        y: height * 0.5,
        radius: Math.max(250, width * 0.25),
        color: 'rgba(168, 85, 247, 0.02)', // Soft Purple accent
        vx: 0.08,
        vy: -0.08
      }
    ];

    // 2. Slow Gold Dust Particles
    const particles = [];
    const particleCount = 28; // Small number to prevent clutter and distraction

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5, // Tiny dot size
        speedY: -(Math.random() * 0.12 + 0.05), // Very slow upward float
        speedX: (Math.random() - 0.5) * 0.05,
        alpha: Math.random() * 0.4 + 0.1,
        baseAlpha: Math.random() * 0.3 + 0.1,
        fadeSpeed: Math.random() * 0.002 + 0.001,
        fadeVal: Math.random() * Math.PI
      });
    }

    // Animation Loop
    const render = () => {
      // Clear with very slight transparency to leave a minute, smooth motion trail
      ctx.fillStyle = '#06080a';
      ctx.fillRect(0, 0, width, height);

      // 1. Draw giant ambient glow leaks
      glowLights.forEach((light) => {
        // Move slowly
        light.x += light.vx;
        light.y += light.vy;

        // Bounce back from boundaries gently
        if (light.x < -light.radius * 0.2 || light.x > width + light.radius * 0.2) {
          light.vx = -light.vx;
        }
        if (light.y < -light.radius * 0.2 || light.y > height + light.radius * 0.2) {
          light.vy = -light.vy;
        }

        // Draw radial gradient light leak
        const grad = ctx.createRadialGradient(
          light.x,
          light.y,
          0,
          light.x,
          light.y,
          light.radius
        );
        grad.addColorStop(0, light.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Update and Draw Tiny Gold Dust Particles
      particles.forEach((p) => {
        // Upward float motion
        p.y += p.speedY;
        p.x += p.speedX;

        // Interaction with mouse: drift away slightly from cursor
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            p.x += (dx / dist) * force * 0.3;
            p.y += (dy / dist) * force * 0.3;
          }
        }

        // Wrap around screen boundaries
        if (p.y < -5) {
          p.y = height + 5;
          p.x = Math.random() * width;
        }
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;

        // Soft shimmer/pulse opacity
        p.fadeVal += p.fadeSpeed;
        const shimmerAlpha = p.baseAlpha + Math.sin(p.fadeVal) * 0.08;

        // Draw tiny golden dust mote
        ctx.save();
        ctx.fillStyle = `rgba(224, 152, 36, ${Math.max(0.05, shimmerAlpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
