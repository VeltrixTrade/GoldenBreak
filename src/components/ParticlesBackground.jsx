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

    // Track mouse position and status
    const mouse = {
      x: null,
      y: null,
      active: false,
      radius: 120 // repulsion field size
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

    // Billiard / Gaming Ball class
    class Ball {
      constructor(x, y, radius, number, isGolden = false) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.number = number;
        this.isGolden = isGolden;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.mass = radius; // simplify mass as radius
        // Neon color schemes
        this.color = isGolden 
          ? '#e09824' 
          : (number % 3 === 0 
              ? '#0ea5e9' // Neon blue
              : (number % 3 === 1 
                  ? '#10b981' // Neon green
                  : '#f43f5e' // Neon pink
                )
            );
        this.glowColor = isGolden ? 'rgba(224, 152, 36, 0.4)' : 'rgba(14, 165, 233, 0.25)';
      }

      update() {
        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Apply slight drag to keep motion realistic and controlled
        this.vx *= 0.998;
        this.vy *= 0.998;

        // Keep velocities from stopping completely
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed < 0.2) {
          const angle = Math.random() * Math.PI * 2;
          this.vx += Math.cos(angle) * 0.1;
          this.vy += Math.sin(angle) * 0.1;
        }

        // Mouse interaction (Repulsion / Magnetic cue push)
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius; // stronger closer
            const angle = Math.atan2(dy, dx);
            const pushX = Math.cos(angle) * force * 0.4;
            const pushY = Math.sin(angle) * force * 0.4;
            this.vx += pushX;
            this.vy += pushY;
          }
        }

        // Boundary collision with elastic bounce
        if (this.x - this.radius < 0) {
          this.x = this.radius;
          this.vx = -this.vx * 0.9;
        }
        if (this.x + this.radius > width) {
          this.x = width - this.radius;
          this.vx = -this.vx * 0.9;
        }
        if (this.y - this.radius < 0) {
          this.y = this.radius;
          this.vy = -this.vy * 0.9;
        }
        if (this.y + this.radius > height) {
          this.y = height - this.radius;
          this.vy = -this.vy * 0.9;
        }
      }

      draw() {
        ctx.save();
        // 3D Spherical Radial Gradient
        const grad = ctx.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          this.radius * 0.1,
          this.x,
          this.y,
          this.radius
        );
        grad.addColorStop(0, '#ffffff'); // bright highlight reflection
        grad.addColorStop(0.2, this.color);
        grad.addColorStop(0.8, '#0b0c0f'); // shadow
        grad.addColorStop(1, '#000000');

        // Neon Glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;

        // Draw ball sphere
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw inner white label for number
        ctx.shadowBlur = 0; // reset shadow for text
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Draw number text
        ctx.fillStyle = '#0f172a';
        ctx.font = `bold ${Math.floor(this.radius * 0.45)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.number, this.x, this.y + (this.radius * 0.03));
        ctx.restore();
      }
    }

    // Shockwave Rings from collisions
    class Shockwave {
      constructor(x, y, maxRadius, color) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.maxRadius = maxRadius;
        this.color = color;
        this.opacity = 1;
      }

      update() {
        this.radius += 2.5;
        this.opacity = 1 - (this.radius / this.maxRadius);
      }

      draw() {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    }

    // Sparkle Particles from collisions
    class Spark {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3;
        this.size = Math.random() * 2 + 1;
        this.color = color;
        this.opacity = 1;
        this.decay = Math.random() * 0.02 + 0.015;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= this.decay;
      }

      draw() {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Setup entities
    const balls = [];
    const shockwaves = [];
    const sparks = [];

    const ballCount = Math.min(10, Math.floor((width * height) / 90000)) + 4;
    const baseRadius = width < 768 ? 16 : 24;

    for (let i = 0; i < ballCount; i++) {
      let x, y, overlap;
      let attempts = 0;
      do {
        x = Math.random() * (width - baseRadius * 2) + baseRadius;
        y = Math.random() * (height - baseRadius * 2) + baseRadius;
        overlap = false;
        // Avoid spawning overlapping balls
        for (let j = 0; j < balls.length; j++) {
          const dx = x - balls[j].x;
          const dy = y - balls[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < (baseRadius + balls[j].radius) + 10) {
            overlap = true;
            break;
          }
        }
        attempts++;
      } while (overlap && attempts < 100);

      const number = i + 1;
      balls.push(new Ball(x, y, baseRadius, number, number === 8));
    }

    // Elastic Billiard Ball collision resolution
    const resolveCollision = (b1, b2) => {
      const dx = b2.x - b1.x;
      const dy = b2.y - b1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < b1.radius + b2.radius) {
        // Prevent sticking by separating balls first
        const overlap = (b1.radius + b2.radius) - distance;
        const nx = dx / distance;
        const ny = dy / distance;
        
        b1.x -= nx * overlap * 0.5;
        b1.y -= ny * overlap * 0.5;
        b2.x += nx * overlap * 0.5;
        b2.y += ny * overlap * 0.5;

        // Vector math for elastic collision
        const kx = b1.vx - b2.vx;
        const ky = b1.vy - b2.vy;
        const p = 2 * (nx * kx + ny * ky) / (b1.mass + b2.mass);

        b1.vx -= p * b2.mass * nx;
        b1.vy -= p * b2.mass * ny;
        b2.vx += p * b1.mass * nx;
        b2.vy += p * b1.mass * ny;

        // Collision center point
        const cx = b1.x + nx * b1.radius;
        const cy = b1.y + ny * b1.radius;

        // Trigger effects
        shockwaves.push(new Shockwave(cx, cy, 60, b1.color));
        for (let s = 0; s < 6; s++) {
          sparks.push(new Spark(cx, cy, b2.color));
        }
      }
    };

    // Draw background technology grid nodes
    const drawTechGrid = () => {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 0.5;
      const gridSize = 120;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();
    };

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background tech grid
      drawTechGrid();

      // Mouse interactive visual cue ring
      if (mouse.active) {
        ctx.save();
        const radGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius);
        radGrad.addColorStop(0, 'rgba(224, 152, 36, 0.05)');
        radGrad.addColorStop(1, 'rgba(224, 152, 36, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw network connectors between nearby balls
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const dx = balls[i].x - balls[j].x;
          const dy = balls[i].y - balls[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.save();
            const opacity = (180 - dist) / 180 * 0.15;
            ctx.strokeStyle = balls[i].color;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[j].x, balls[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Resolve ball collisions
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          resolveCollision(balls[i], balls[j]);
        }
      }

      // Update & Draw Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        shockwaves[i].update();
        shockwaves[i].draw();
        if (shockwaves[i].opacity <= 0) {
          shockwaves.splice(i, 1);
        }
      }

      // Update & Draw Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        sparks[i].update();
        sparks[i].draw();
        if (sparks[i].opacity <= 0) {
          sparks.splice(i, 1);
        }
      }

      // Update & Draw Balls
      balls.forEach((ball) => {
        ball.update();
        ball.draw();
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
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
