import React, { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from '../../motion';

const SERVICES = [
  'Wedding',
  'Meetings / Conferences',
  'Birthday Celebrations',
  'Food / Restaurant',
  'AC Stay Rooms',
  'Anniversaries & Ceremonies',
  'Corporate Meets & Events',
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxLife: number;
  life: number;
  type: 'star' | 'dot' | 'diamond';
  color: string;
  baseAlpha: number;
  rotation: number;
  vRot: number;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

function lerpColor(c1: RGB, c2: RGB, t: number): RGB {
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * t),
    g: Math.round(c1.g + (c2.g - c1.g) * t),
    b: Math.round(c1.b + (c2.b - c1.b) * t),
  };
}

/**
 * Calculates dynamic color stops for the diagonal bar and active letters
 * as it sweeps from left (p=0) to right (p=1).
 * Keyframes:
 * - 0.0 -> 0.35: Brilliant Diamond Platinum / Pale Champagne
 * - 0.35 -> 0.70: Radiant Imperial Gold (Amrit signature)
 * - 0.70 -> 1.0: Warm Sunset Twilight Amber & Dusk Gold
 */
function getGradientColorAt(progress: number): {
  primary: RGB;
  secondary: RGB;
  glow: string;
  hex: string;
} {
  const p = Math.max(0, Math.min(1, progress));
  let primary: RGB;
  let secondary: RGB;
  let glow: string;

  if (p < 0.35) {
    const t = p / 0.35;
    // Diamond Platinum (255, 255, 255) -> Pale Champagne (255, 242, 195)
    primary = lerpColor({ r: 255, g: 255, b: 255 }, { r: 255, g: 242, b: 195 }, t);
    secondary = lerpColor({ r: 235, g: 245, b: 255 }, { r: 248, g: 189, b: 92 }, t);
    glow = `rgba(${Math.round(255 - t * 7)}, ${Math.round(255 - t * 66)}, ${Math.round(255 - t * 163)}, 0.9)`;
  } else if (p < 0.72) {
    const t = (p - 0.35) / 0.37;
    // Pale Champagne (255, 242, 195) -> Radiant Imperial Gold (248, 189, 92)
    primary = lerpColor({ r: 255, g: 242, b: 195 }, { r: 248, g: 189, b: 92 }, t);
    secondary = lerpColor({ r: 248, g: 189, b: 92 }, { r: 255, g: 155, b: 58 }, t);
    glow = `rgba(${Math.round(248 + t * 7)}, ${Math.round(189 - t * 34)}, ${Math.round(92 - t * 34)}, 0.95)`;
  } else {
    const t = (p - 0.72) / 0.28;
    // Radiant Imperial Gold (248, 189, 92) -> Warm Sunset Twilight Amber (255, 140, 50)
    primary = lerpColor({ r: 248, g: 189, b: 92 }, { r: 255, g: 140, b: 50 }, t);
    secondary = lerpColor({ r: 255, g: 155, b: 58 }, { r: 255, g: 105, b: 65 }, t);
    glow = `rgba(255, ${Math.round(155 - t * 45)}, ${Math.round(58 + t * 7)}, 0.95)`;
  }

  const hex = `#${primary.r.toString(16).padStart(2, '0')}${primary.g.toString(16).padStart(2, '0')}${primary.b.toString(16).padStart(2, '0')}`;
  return { primary, secondary, glow, hex };
}

export const KineticServices: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<'enter' | 'hold' | 'travel' | 'exit'>('enter');
  const [activeCharIndex, setActiveCharIndex] = useState<number>(-1);
  const [strokeProgress, setStrokeProgress] = useState<number>(0);
  const isReducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const currentService = SERVICES[currentIndex];

  // Lifecycle orchestrator
  useEffect(() => {
    if (isReducedMotion) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % SERVICES.length);
      }, 4000);
      return () => clearInterval(timer);
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === 'enter') {
      particlesRef.current = [];
      // Hold for 0.7s during reveal, then go to 'hold'
      timeoutId = setTimeout(() => {
        setPhase('hold');
      }, 700);
    } else if (phase === 'hold') {
      // Hold readable for ~2.8 seconds
      timeoutId = setTimeout(() => {
        setPhase('travel');
      }, 2800);
    } else if (phase === 'travel') {
      // Pacing calibrated precisely to letter count:
      // In "Wedding" (7 chars), duration was ~1150ms (~165ms/char).
      // Scale duration proportionally so all words have the exact same per-letter dwell time!
      const MS_PER_CHAR = 165;
      const duration = Math.max(1150, currentService.length * MS_PER_CHAR);
      const startTime = performance.now();

      const animateTravel = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / duration);
        setStrokeProgress(p);

        // Determine which character is crossed using nearest center distance
        if (textRef.current) {
          const letterSpans = textRef.current.querySelectorAll<HTMLSpanElement>('[data-char]');
          const textRect = textRef.current.getBoundingClientRect();
          // currentX runs from 0 to textRect.width
          const currentX = p * textRect.width;

          let closestIndex = -1;
          let minDistance = Infinity;

          letterSpans.forEach((span, i) => {
            const spanCenter = span.offsetLeft + span.offsetWidth / 2;
            const dist = Math.abs(currentX - spanCenter);
            if (dist < minDistance) {
              minDistance = dist;
              closestIndex = i;
            }
          });

          // Activate when stroke is within direct proximity of the letter
          if (closestIndex !== -1 && minDistance <= 20) {
            setActiveCharIndex(closestIndex);
          } else {
            setActiveCharIndex(-1);
          }

          // Emit sparkles along the diagonal stroke with evolving color
          if (p < 0.96 && canvasRef.current) {
            const PAD_X = 32;
            const PAD_Y = 16;
            const strokeHeight = 34;
            const spawnCount = Math.random() < 0.7 ? 2 : 1;
            const currentColor = getGradientColorAt(p);
            const canvasCurrentX = PAD_X + currentX;
            const canvasCenterY = PAD_Y + textRect.height / 2;

            for (let k = 0; k < spawnCount; k++) {
              const yOffset = (Math.random() - 0.5) * strokeHeight;
              // Slanted offset corresponding to line angle ~24deg (dx = dy * 0.45)
              const lineX = canvasCurrentX - yOffset * 0.45;
              const types: ('star' | 'dot' | 'diamond')[] = ['star', 'dot', 'diamond', 'dot', 'dot'];
              const chosenType = types[Math.floor(Math.random() * types.length)];
              const colorPalette = [
                '#FFFFFF',
                currentColor.hex,
                `rgb(${currentColor.secondary.r}, ${currentColor.secondary.g}, ${currentColor.secondary.b})`,
                '#FAF7F2',
              ];

              particlesRef.current.push({
                x: lineX + (Math.random() - 0.5) * 4,
                y: canvasCenterY + yOffset + (Math.random() - 0.5) * 3,
                vx: -0.2 - Math.random() * 0.4, // subtle trail behind stroke
                vy: -0.15 - Math.random() * 0.35,  // gentle upward float
                size: chosenType === 'star' ? 1.8 + Math.random() * 1.6 : (chosenType === 'diamond' ? 1.4 + Math.random() * 1.3 : 0.8 + Math.random() * 0.9),
                maxLife: 28 + Math.floor(Math.random() * 20),
                life: 0,
                type: chosenType,
                color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
                baseAlpha: 0.45 + Math.random() * 0.4,
                rotation: Math.random() * Math.PI,
                vRot: (Math.random() - 0.5) * 0.08,
              });
            }
          }

          // Flourish shimmer at the word completion
          if (p >= 0.97 && p < 0.99 && particlesRef.current.length < 40 && canvasRef.current) {
            const PAD_X = 32;
            const PAD_Y = 16;
            const canvasCenterY = PAD_Y + textRect.height / 2;
            const finalColor = getGradientColorAt(1.0);

            for (let s = 0; s < 5; s++) {
              particlesRef.current.push({
                x: PAD_X + textRect.width + (Math.random() - 0.2) * 10,
                y: canvasCenterY + (Math.random() - 0.5) * 20,
                vx: (Math.random() - 0.2) * 0.4,
                vy: -0.2 - Math.random() * 0.35,
                size: s % 2 === 0 ? 2.0 + Math.random() * 1.4 : 1.0 + Math.random() * 0.8,
                maxLife: 30 + Math.floor(Math.random() * 14),
                life: 0,
                type: s % 2 === 0 ? 'star' : 'dot',
                color: finalColor.hex,
                baseAlpha: 0.8,
                rotation: Math.random() * Math.PI,
                vRot: 0.05,
              });
            }
          }
        }

        if (p < 1) {
          animFrameRef.current = requestAnimationFrame(animateTravel);
        } else {
          setActiveCharIndex(-1);
          setPhase('exit');
        }
      };

      animFrameRef.current = requestAnimationFrame(animateTravel);
    } else if (phase === 'exit') {
      timeoutId = setTimeout(() => {
        setActiveCharIndex(-1);
        setStrokeProgress(0);
        setCurrentIndex((prev) => (prev + 1) % SERVICES.length);
        setPhase('enter');
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [phase, currentIndex, currentService.length, isReducedMotion]);

  // Particle Canvas Render Loop
  useEffect(() => {
    if (isReducedMotion) return;

    let canvasAnimId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (phase === 'travel' && textRef.current) {
        const PAD_X = 32;
        const PAD_Y = 16;
        const textRect = textRef.current.getBoundingClientRect();
        const currentX = strokeProgress * textRect.width;
        const canvasCurrentX = PAD_X + currentX;
        const canvasCenterY = PAD_Y + textRect.height / 2;
        const strokeHeight = 36;
        const dx = (strokeHeight / 2) * 0.45; // ~24 deg slant

        ctx.save();
        ctx.scale(dpr, dpr);

        // Dynamic evolving gradient stops based on strokeProgress (0 -> 1)
        const { primary, secondary, glow } = getGradientColorAt(strokeProgress);

        const x1 = canvasCurrentX + dx;
        const y1 = canvasCenterY - strokeHeight / 2;
        const x2 = canvasCurrentX - dx;
        const y2 = canvasCenterY + strokeHeight / 2;

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, 0)`);
        grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.98)');
        grad.addColorStop(0.5, `rgba(${primary.r}, ${primary.g}, ${primary.b}, 1)`);
        grad.addColorStop(0.8, `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, 0.95)`);
        grad.addColorStop(1, `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.lineCap = 'round';
        ctx.shadowColor = glow;
        ctx.shadowBlur = 6;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.restore();
      }

      // Draw Active Glitter Particles
      if (particlesRef.current.length > 0) {
        ctx.save();
        ctx.scale(dpr, dpr);

        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.life++;
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.vRot;

          const lifeRatio = p.life / p.maxLife;
          const alpha = p.baseAlpha * (1 - lifeRatio);

          if (alpha <= 0 || p.life >= p.maxLife) {
            particlesRef.current.splice(i, 1);
            continue;
          }

          if (p.type === 'star') {
            // Draw 4-point sparkle star
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
            ctx.beginPath();
            const r = p.size;
            for (let s = 0; s < 4; s++) {
              const ang = (s * Math.PI) / 2;
              ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r);
              const innerAng = ang + Math.PI / 4;
              ctx.lineTo(Math.cos(innerAng) * (r * 0.22), Math.sin(innerAng) * (r * 0.22));
            }
            ctx.closePath();
            ctx.fill();

            // Luminous center speck
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(0, 0, r * 0.25, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          } else if (p.type === 'diamond') {
            // Draw tiny diamond glint
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
            ctx.beginPath();
            const r = p.size;
            ctx.moveTo(0, -r);
            ctx.lineTo(r * 0.5, 0);
            ctx.lineTo(0, r);
            ctx.lineTo(-r * 0.5, 0);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          } else {
            // Draw tiny dot / speck
            ctx.save();
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }

        ctx.restore();
      }

      canvasAnimId = requestAnimationFrame(render);
    };

    canvasAnimId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(canvasAnimId);
  }, [phase, strokeProgress, isReducedMotion]);

  // Adjust canvas pixel dimensions to match DOM container with DPR support
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      // Canvas is padded by 32px on left/right and 16px on top/bottom
      canvasRef.current.width = Math.round((rect.width + 64) * dpr);
      canvasRef.current.height = Math.round((rect.height + 32) * dpr);
    };

    handleResize();
    const timer = setTimeout(handleResize, 50);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentService, phase]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center min-h-[48px] overflow-visible select-none"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Editorial typography container */}
      <div
        ref={textRef}
        className={`relative z-10 inline-flex items-center text-xl sm:text-2xl md:text-[1.85rem] font-['Plus_Jakarta_Sans',sans-serif] tracking-wide transition-all duration-500 ease-out ${
          phase === 'enter'
            ? 'opacity-100 translate-y-0'
            : phase === 'exit'
            ? 'opacity-0 -translate-y-2'
            : 'opacity-100 translate-y-0'
        }`}
        style={{
          transitionProperty: 'opacity, transform',
          transitionDuration: phase === 'enter' ? '700ms' : phase === 'exit' ? '450ms' : '0ms',
        }}
      >
        {currentService.split('').map((char, i) => {
          const isActive = i === activeCharIndex;

          if (char === ' ') {
            return (
              <span key={i} data-char="space" className="inline-block w-2 sm:w-2.5">
                &nbsp;
              </span>
            );
          }

          // Calculate character's relative position in the word for matching gradient glow
          const charProgress = currentService.length > 1 ? i / (currentService.length - 1) : 0.5;
          const charColor = getGradientColorAt(charProgress);

          return (
            <span
              key={i}
              data-char={char}
              className={`inline-block select-none ${
                isActive
                  ? 'font-[900] text-white scale-[1.12]'
                  : 'font-normal text-neutral-300/85 scale-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]'
              }`}
              style={{
                textShadow: isActive
                  ? `0 0 12px ${charColor.glow}, 0 0 24px ${charColor.glow}, 0 2px 4px rgba(0,0,0,0.95)`
                  : undefined,
                transition: isActive
                  ? 'transform 80ms cubic-bezier(0.16, 1, 0.3, 1), font-weight 60ms ease-out, color 80ms ease-out, text-shadow 80ms ease-out'
                  : 'transform 260ms ease-out, font-weight 200ms ease-out, color 260ms ease-out, text-shadow 260ms ease-out',
                willChange: 'transform, font-weight, color',
              }}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Particle & Diagonal Line Canvas Overlay */}
      {!isReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute -inset-x-8 -inset-y-4 pointer-events-none z-20"
          style={{ width: 'calc(100% + 64px)', height: 'calc(100% + 32px)' }}
        />
      )}
    </div>
  );
};

