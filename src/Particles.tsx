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
  isLensFlare: boolean;
  lensFlareSize: 'small' | 'medium' | 'large';
  sparklePhase: number;
  rotation: number;
  rotationSpeed: number;
}

export default function Particles() {
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
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      // Only initialize stars on first load, not on every resize
      if (starsRef.current.length === 0) {
        initStars();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);

    const initStars = () => {
      // Only initialize if stars don't already exist
      if (starsRef.current.length > 0) return;
      
      starsRef.current = [];
      // Adjusted star count for optimal density
      const starCount = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < starCount; i++) {
        const depth = Math.random();
        const sizeRoll = Math.random();
        
        // More dramatic size variations
        let size;
        let isLensFlare = false;
        let lensFlareSize: 'small' | 'medium' | 'large' = 'small';
        
        if (sizeRoll > 0.98) {
          // Very large dramatic stars with lens flares
          size = 3.5 + Math.random() * 2.5;
          isLensFlare = true;
          lensFlareSize = 'large';
        } else if (sizeRoll > 0.94) {
          // Large stars with medium lens flares
          size = 2.5 + Math.random() * 1.5;
          isLensFlare = true;
          lensFlareSize = 'medium';
        } else if (sizeRoll > 0.85) {
          // Medium stars with small lens flares
          size = 1.8 + Math.random() * 1.2;
          isLensFlare = Math.random() > 0.4;
          lensFlareSize = 'small';
        } else if (sizeRoll > 0.65) {
          // Small visible stars
          size = 1.2 + Math.random() * 0.8;
          isLensFlare = false;
        } else {
          // Tiny pinprick stars
          size = 0.6 + Math.random() * 0.6;
          isLensFlare = false;
        }
        
        // Mostly pure white stars like Moonwalker
        const colorValue = Math.random();
        const color = colorValue > 0.97 ? '#e8f4ff' :  // Slight blue tint (rare)
                      colorValue > 0.94 ? '#fff5e8' :  // Slight warm tint (rare)
                      '#ffffff';  // Pure white (most common)
        
        starsRef.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size,
          brightness: 0.4 + Math.random() * 0.6,
          twinkleSpeed: isLensFlare ? 0.02 + Math.random() * 0.04 : 0.01 + Math.random() * 0.02,
          twinkleOffset: Math.random() * Math.PI * 2,
          color,
          depth,
          isLensFlare,
          lensFlareSize,
          sparklePhase: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.0005,
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
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.4 + 0.7;
      let currentBrightness = star.brightness * twinkle;
      
      // Enhanced sparkle for lens flare stars
      if (star.isLensFlare) {
        const sparkle = Math.abs(Math.sin(time * 0.5 + star.sparklePhase));
        currentBrightness = currentBrightness * (0.5 + sparkle * 0.7);
      }
      
      // Mouse interaction
      const distanceToMouse = Math.sqrt(
        Math.pow(star.x - mouseRef.current.x, 2) + 
        Math.pow(star.y - mouseRef.current.y, 2)
      );
      const mouseInfluence = distanceToMouse < 150 ? 
        (1 - distanceToMouse / 150) * 0.3 : 0;
      
      const finalBrightness = Math.min(1, currentBrightness + mouseInfluence);
      const alpha = Math.floor(finalBrightness * 255).toString(16).padStart(2, '0');

      // Draw glow for larger stars
      if (star.size > 1.5) {
        const glowSize = star.isLensFlare ? star.size * 4 : star.size * 3;
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, glowSize
        );
        gradient.addColorStop(0, `${star.color}${alpha}`);
        gradient.addColorStop(0.3, `${star.color}${Math.floor(finalBrightness * 100).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${star.color}00`);

        ctx.fillStyle = gradient;
        ctx.fillRect(
          star.x - glowSize,
          star.y - glowSize,
          glowSize * 2,
          glowSize * 2
        );
      }

      // Draw core star
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `${star.color}${alpha}`;
      ctx.fill();

      // Draw dramatic lens flare/starburst effect (Moonwalker style)
      if (star.isLensFlare && finalBrightness > 0.5) {
        const flareIntensity = (finalBrightness - 0.5) * 2;
        const flareAlpha = Math.floor(flareIntensity * 220).toString(16).padStart(2, '0');
        
        // Determine spike length based on lens flare size
        let spikeLength;
        let spikeWidth;
        if (star.lensFlareSize === 'large') {
          spikeLength = star.size * 12;
          spikeWidth = 1.2;
        } else if (star.lensFlareSize === 'medium') {
          spikeLength = star.size * 8;
          spikeWidth = 0.9;
        } else {
          spikeLength = star.size * 5;
          spikeWidth = 0.6;
        }
        
        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.rotate(star.rotation + time * star.rotationSpeed);
        
        // Draw 4-pointed star (cross pattern)
        ctx.beginPath();
        // Horizontal spike
        ctx.moveTo(-spikeLength, 0);
        ctx.lineTo(spikeLength, 0);
        // Vertical spike
        ctx.moveTo(0, -spikeLength);
        ctx.lineTo(0, spikeLength);
        
        ctx.strokeStyle = `${star.color}${flareAlpha}`;
        ctx.lineWidth = spikeWidth;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = star.lensFlareSize === 'large' ? 8 : 4;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Optional: Add diagonal spikes for 6-pointed star effect on largest stars
        if (star.lensFlareSize === 'large' && Math.random() > 0.5) {
          ctx.rotate(Math.PI / 4);
          ctx.beginPath();
          ctx.moveTo(-spikeLength * 0.7, 0);
          ctx.lineTo(spikeLength * 0.7, 0);
          ctx.moveTo(0, -spikeLength * 0.7);
          ctx.lineTo(0, spikeLength * 0.7);
          ctx.strokeStyle = `${star.color}${Math.floor(flareIntensity * 150).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = spikeWidth * 0.6;
          ctx.stroke();
        }
        
        ctx.restore();
      }
    };

    const drawShootingStar = (star: any) => {
      if (!star.active) {
        if (Math.random() < 0.0002) {
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
      gradient.addColorStop(0.4, `rgba(220, 230, 255, ${star.opacity * 0.6})`);
      gradient.addColorStop(1, 'rgba(180, 200, 255, 0)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.8;
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
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
      aria-hidden="true"
      style={{
        opacity: 0.9,
        mixBlendMode: 'screen',
        touchAction: 'none',
        willChange: 'transform',
      }}
    />
  );
}