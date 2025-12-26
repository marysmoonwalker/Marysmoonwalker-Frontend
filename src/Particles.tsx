import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
  depth: number;
  isSparkle: boolean;
  sparklePhase: number;
}

export default function UniverseParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<Array<{
    x: number;
    y: number;
    length: number;
    speed: number;
    opacity: number;
    angle: number;
    active: boolean;
  }>>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      initStars();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);

    const initStars = () => {
      starsRef.current = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < starCount; i++) {
        const depth = Math.random();
        const sizeRoll = Math.random();
        
        let size;
        if (sizeRoll > 0.92) {
          size = 2.2 + Math.random() * 2.0;
        } else if (sizeRoll > 0.75) {
          size = 1.5 + Math.random() * 1.8;
        } else {
          size = 1.0 + Math.random() * 1.6;
        }
        
        const colorValue = Math.random();
        const color = colorValue > 0.96 ? '#a3d0ff' :
                      colorValue > 0.92 ? '#ffd8a3' :
                      '#ffffff';
        
        const isSparkle = Math.random() > 0.85;
        
        starsRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size,
          brightness: 0.3 + Math.random() * 0.7,
          twinkleSpeed: isSparkle ? 0.04 + Math.random() * 0.06 : 0.015 + Math.random() * 0.025,
          twinkleOffset: Math.random() * Math.PI * 2,
          color,
          depth,
          isSparkle,
          sparklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const initShootingStars = () => {
      shootingStarsRef.current = [
        {
          x: -100,
          y: Math.random() * window.innerHeight * 0.3,
          length: 80,
          speed: 12 + Math.random() * 8,
          opacity: 0,
          angle: Math.PI / 6 + Math.random() * Math.PI / 6,
          active: false,
        },
      ];
    };

    const drawStar = (star: Star, time: number) => {
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.6;
      let currentBrightness = star.brightness * twinkle;
      
      if (star.isSparkle) {
        const sparkle = Math.abs(Math.sin(time * 0.8 + star.sparklePhase));
        currentBrightness = currentBrightness * (0.4 + sparkle * 0.8);
      }
      
      const distanceToMouse = Math.sqrt(
        Math.pow(star.x - mouseRef.current.x, 2) + 
        Math.pow(star.y - mouseRef.current.y, 2)
      );
      const mouseInfluence = distanceToMouse < 120 ? 
        (1 - distanceToMouse / 120) * 0.25 : 0;
      
      const finalBrightness = Math.min(1, currentBrightness + mouseInfluence);
      const alpha = Math.floor(finalBrightness * 255).toString(16).padStart(2, '0');

      if (star.size > 1.8) {
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 2.5
        );
        gradient.addColorStop(0, `${star.color}${alpha}`);
        gradient.addColorStop(0.4, `${star.color}${Math.floor(finalBrightness * 80).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${star.color}00`);

        ctx.fillStyle = gradient;
        ctx.fillRect(
          star.x - star.size * 2.5,
          star.y - star.size * 2.5,
          star.size * 5,
          star.size * 5
        );
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `${star.color}${alpha}`;
      ctx.fill();

      if (star.isSparkle && finalBrightness > 0.6) {
        const sparkleIntensity = (finalBrightness - 0.6) * 2.5;
        const spikeAlpha = Math.floor(sparkleIntensity * 180).toString(16).padStart(2, '0');
        
        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.rotate(time * 0.001);
        
        ctx.beginPath();
        ctx.moveTo(-star.size * 3, 0);
        ctx.lineTo(star.size * 3, 0);
        ctx.moveTo(0, -star.size * 3);
        ctx.lineTo(0, star.size * 3);
        ctx.strokeStyle = `${star.color}${spikeAlpha}`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        
        ctx.restore();
      }
    };

    const drawShootingStar = (star: any) => {
      if (!star.active) {
        if (Math.random() < 0.0003) {
          star.active = true;
          star.x = -50;
          star.y = Math.random() * window.innerHeight * 0.6;
          star.opacity = 1;
          star.length = 60 + Math.random() * 80;
          star.speed = 10 + Math.random() * 12;
          star.angle = Math.PI / 6 + Math.random() * Math.PI / 8;
        }
        return;
      }

      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;
      star.opacity *= 0.96;
      
      if (star.x > window.innerWidth + 100 || 
          star.y > window.innerHeight + 100 || 
          star.opacity < 0.05) {
        star.active = false;
        return;
      }

      ctx.save();
      ctx.translate(star.x, star.y);
      ctx.rotate(star.angle);
      
      const gradient = ctx.createLinearGradient(0, 0, star.length, 0);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
      gradient.addColorStop(0.4, `rgba(200, 220, 255, ${star.opacity * 0.6})`);
      gradient.addColorStop(1, 'rgba(150, 180, 255, 0)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(star.length, 0);
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = (time: number) => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const currentTime = time * 0.001;

      starsRef.current.forEach(star => {
        drawStar(star, currentTime);
      });

      shootingStarsRef.current.forEach(star => {
        drawShootingStar(star);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    setCanvasSize();
    initShootingStars();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
      style={{
        opacity: 0.85,
        mixBlendMode: 'screen',
      }}
    />
  );
}