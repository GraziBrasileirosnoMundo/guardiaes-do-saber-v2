'use client';
import { motion } from 'framer-motion';
import type { Expressao } from './lumis';

interface TorrakProps {
  ano: 2 | 5;
  size?: number;
  glow?: boolean;
  cristalino?: boolean;
  cor?: string | null;
  expressao?: Expressao;
  float?: boolean;
}

export function Torrak({ ano, size = 120, glow = false, cristalino = false, cor = null, expressao = 'feliz', float = true }: TorrakProps) {
  const is2 = ano === 2;
  const base = cristalino ? '#a78bfa' : (is2 ? '#4ade80' : '#166534');
  const mainColor = cor ?? base;
  const crystalColor = cristalino ? '#c4b5fd' : (is2 ? '#f97316' : '#b45309');
  const stoneColor = is2 ? '#86efac' : '#15803d';

  return (
    <motion.div
      animate={glow ? { scale: [1, 1.08, 1] } : (float ? { y: [0, -4, 0] } : {})}
      transition={glow ? { duration: 0.4, ease: 'easeInOut' } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: size, height: size, position: 'relative' }}
    >
      <svg viewBox="0 0 120 120" width={size} height={size}>
        {glow && (
          <circle cx="60" cy="60" r="55" fill="none" stroke={crystalColor} strokeWidth="3" opacity="0.6">
            <animate attributeName="r" values="50;58;50" dur="0.6s" repeatCount="indefinite" />
          </circle>
        )}
        {/* Body */}
        {is2 ? (
          <ellipse cx="60" cy="62" rx="32" ry="34" fill={mainColor} />
        ) : (
          <polygon points="60,25 30,55 35,95 85,95 90,55" fill={mainColor} />
        )}
        {/* Stone texture */}
        <circle cx="45" cy="70" r="4" fill={stoneColor} opacity="0.5" />
        <circle cx="75" cy="68" r="3" fill={stoneColor} opacity="0.5" />
        {/* Crystals */}
        <polygon points="42,38 38,50 46,50" fill={crystalColor}>
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
        </polygon>
        <polygon points="78,35 74,48 82,48" fill={crystalColor}>
          <animate attributeName="opacity" values="1;0.7;1" dur="2.5s" repeatCount="indefinite" />
        </polygon>
        <polygon points="60,28 56,42 64,42" fill={crystalColor}>
          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.8s" repeatCount="indefinite" />
        </polygon>
        {/* Face */}
        <FaceTorrak is2={is2} expressao={expressao} />
        {/* Arms for 5th year */}
        {!is2 && (
          <>
            <rect x="22" y="60" width="12" height="6" rx="3" fill={mainColor} />
            <rect x="86" y="60" width="12" height="6" rx="3" fill={mainColor} />
          </>
        )}
      </svg>
    </motion.div>
  );
}

function FaceTorrak({ is2, expressao }: { is2: boolean; expressao: Expressao }) {
  const eyeR = is2 ? 3 : 2.5;
  const happyEyes = expressao === 'muito_feliz';
  const surprised = expressao === 'surpreso';
  return (
    <>
      {happyEyes ? (
        <>
          <path d="M42 58 Q48 52 54 58" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M66 58 Q72 52 78 58" fill="none" stroke="#1e1b4b" strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="48" cy="58" rx={is2 ? 6 : 5} ry={surprised ? (is2 ? 8 : 7) : (is2 ? 6 : 5)} fill="white" />
          <ellipse cx="72" cy="58" rx={is2 ? 6 : 5} ry={surprised ? (is2 ? 8 : 7) : (is2 ? 6 : 5)} fill="white" />
          <circle cx="49" cy="58" r={eyeR} fill="#1e1b4b" />
          <circle cx="73" cy="58" r={eyeR} fill="#1e1b4b" />
          <circle cx="50" cy="56" r="1" fill="white" />
          <circle cx="74" cy="56" r="1" fill="white" />
        </>
      )}
      {/* Mouth */}
      {expressao === 'muito_feliz' && <path d="M48 67 Q60 80 72 67 Q60 73 48 67 Z" fill="#1e1b4b" />}
      {expressao === 'animado' && <ellipse cx="60" cy="69" rx="7" ry="6" fill="#1e1b4b" />}
      {expressao === 'feliz' && <path d="M52 68 Q60 75 68 68" fill="none" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round" />}
      {expressao === 'calmo' && <path d="M53 68 Q60 72 67 68" fill="none" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round" />}
      {expressao === 'pensativo' && <path d="M53 69 L67 69" fill="none" stroke="#1e1b4b" strokeWidth="2" strokeLinecap="round" />}
      {expressao === 'surpreso' && <ellipse cx="60" cy="70" rx="4" ry="5" fill="#1e1b4b" />}
    </>
  );
}
