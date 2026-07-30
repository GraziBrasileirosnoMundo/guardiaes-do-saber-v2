'use client';
import { motion } from 'framer-motion';

export type Expressao = 'feliz' | 'muito_feliz' | 'animado' | 'calmo' | 'surpreso' | 'pensativo';

interface LumisProps {
  ano: 2 | 5;
  size?: number;
  glow?: boolean;
  dourado?: boolean;
  cor?: string | null;
  expressao?: Expressao;
  float?: boolean;
}

export function Lumis({ ano, size = 120, glow = false, dourado = false, cor = null, expressao = 'feliz', float = true }: LumisProps) {
  const is2 = ano === 2;
  const base = dourado ? '#f59e0b' : (is2 ? '#60a5fa' : '#818cf8');
  const mainColor = cor ?? base;
  const capeColor = dourado ? '#fbbf24' : (cor ?? (is2 ? '#3b82f6' : '#6366f1'));
  const starColor = dourado ? '#fef3c7' : '#fde68a';

  return (
    <motion.div
      animate={glow ? { scale: [1, 1.08, 1] } : (float ? { y: [0, -6, 0] } : {})}
      transition={glow ? { duration: 0.4, ease: 'easeInOut' } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: size, height: size, position: 'relative' }}
    >
      <svg viewBox="0 0 120 120" width={size} height={size}>
        {glow && (
          <circle cx="60" cy="60" r="55" fill="none" stroke={starColor} strokeWidth="3" opacity="0.6">
            <animate attributeName="r" values="50;58;50" dur="0.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="0.6s" repeatCount="indefinite" />
          </circle>
        )}
        {/* Cape */}
        <path d={is2 ? 'M35 55 L25 95 L60 85 L95 95 L85 55 Z' : 'M30 50 L20 100 L60 88 L100 100 L90 50 Z'}
          fill={capeColor} opacity="0.8" />
        {/* Body */}
        <ellipse cx="60" cy="60" rx={is2 ? 28 : 25} ry={is2 ? 30 : 28} fill={mainColor} />
        {/* Stars on body */}
        <circle cx="48" cy="52" r="2" fill={starColor}>
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="72" cy="48" r="2.5" fill={starColor}>
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="55" cy="70" r="1.8" fill={starColor}>
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
        </circle>
        {/* Eyes + mouth (expression) */}
        <FaceLumis is2={is2} expressao={expressao} />
        {/* Crown/hat for 5th year */}
        {!is2 && (
          <>
            <polygon points="60,15 48,38 72,38" fill={capeColor} />
            <circle cx="60" cy="15" r="4" fill={starColor}>
              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>
    </motion.div>
  );
}

function FaceLumis({ is2, expressao }: { is2: boolean; expressao: Expressao }) {
  const eyeR = is2 ? 3 : 2.5;
  const happyEyes = expressao === 'muito_feliz';
  const surprised = expressao === 'surpreso';
  return (
    <>
      {happyEyes ? (
        <>
          <path d="M44 55 Q50 49 56 55" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M64 55 Q70 49 76 55" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="50" cy="55" rx={is2 ? 6 : 5} ry={surprised ? (is2 ? 8 : 7) : (is2 ? 7 : 6)} fill="white" />
          <ellipse cx="70" cy="55" rx={is2 ? 6 : 5} ry={surprised ? (is2 ? 8 : 7) : (is2 ? 7 : 6)} fill="white" />
          <circle cx="51" cy="55" r={eyeR} fill="#1e1b4b" />
          <circle cx="71" cy="55" r={eyeR} fill="#1e1b4b" />
          <circle cx="52" cy="53" r="1" fill="white" />
          <circle cx="72" cy="53" r="1" fill="white" />
        </>
      )}
      {/* Mouth */}
      {expressao === 'muito_feliz' && <path d="M48 64 Q60 78 72 64 Q60 70 48 64 Z" fill="#1e1b4b" />}
      {expressao === 'animado' && <ellipse cx="60" cy="67" rx="7" ry="6" fill="#1e1b4b" />}
      {expressao === 'feliz' && <path d="M50 65 Q60 73 70 65" fill="none" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round" />}
      {expressao === 'calmo' && <path d="M52 66 Q60 71 68 66" fill="none" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round" />}
      {expressao === 'pensativo' && <path d="M52 67 L68 67" fill="none" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round" />}
      {expressao === 'surpreso' && <ellipse cx="60" cy="68" rx="4" ry="5" fill="#1e1b4b" />}
    </>
  );
}
