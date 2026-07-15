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

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    // Calculate particle count based on screen size (denser on desktop, lighter on mobile)
    const particleCount = Math.min(30, Math.floor((width * height) / 45000));

    // Create glowing particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 90 + 30, // Large glowing circles
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        // Theme colors: golden-yellow and very soft blue
        color: Math.random() > 0.3
          ? `rgba(255, 227, 0, ${Math.random() * 0.04 + 0.01})` // Brand Yellow
          : `rgba(14, 165, 233, ${Math.random() * 0.03 + 0.01})`, // Soft Blue
        pulseSpeed: Math.random() * 0.003 + 0.001,
        pulseValue: Math.random() * Math.PI,
        baseAlpha: Math.random() * 0.03 + 0.01
      });
    }

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Boundary collision / wrapping
        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;

        // Glow pulse
        p.pulseValue += p.pulseSpeed;
        const currentAlpha = p.baseAlpha + Math.sin(p.pulseValue) * 0.01;

        // Draw radial gradient (soft glow)
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        const colorBase = p.color.substring(0, p.color.lastIndexOf(','));
        gradient.addColorStop(0, `${colorBase}, ${Math.max(0.005, currentAlpha)})`);
        gradient.addColorStop(1, `${colorBase}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
