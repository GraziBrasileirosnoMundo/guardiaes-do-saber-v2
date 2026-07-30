'use client';
import { motion } from 'framer-motion';

interface MonsterProps {
  tipo: string;
  size?: number;
  shake?: boolean;
}

function Neblus({ size, shake }: { size: number; shake: boolean }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      <ellipse cx="60" cy="65" rx="40" ry="35" fill="#1e3a5f" opacity="0.8">
        <animate attributeName="rx" values="38;42;38" dur="3s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="60" cy="65" rx="30" ry="25" fill="#2563eb" opacity="0.5" />
      {/* Eyes */}
      <ellipse cx="47" cy="58" rx="7" ry="8" fill="#bfdbfe" />
      <ellipse cx="73" cy="58" rx="7" ry="8" fill="#bfdbfe" />
      <circle cx="48" cy="58" r="4" fill="#1e1b4b" />
      <circle cx="74" cy="58" r="4" fill="#1e1b4b" />
      {/* Mouth */}
      <path d="M48 75 Q60 82 72 75" fill="none" stroke="#93c5fd" strokeWidth="2" />
      {/* Mist tendrils */}
      <ellipse cx="30" cy="80" rx="15" ry="8" fill="#1e3a5f" opacity="0.4">
        <animate attributeName="cx" values="28;35;28" dur="4s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="90" cy="78" rx="12" ry="7" fill="#1e3a5f" opacity="0.4">
        <animate attributeName="cx" values="92;85;92" dur="3.5s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}

function Grogmar({ size, shake }: { size: number; shake: boolean }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      {/* Body */}
      <ellipse cx="60" cy="70" rx="35" ry="30" fill="#78350f" />
      <ellipse cx="60" cy="70" rx="28" ry="24" fill="#92400e" />
      {/* Horns */}
      <polygon points="40,42 35,25 45,38" fill="#a16207" />
      <polygon points="80,42 85,25 75,38" fill="#a16207" />
      {/* Eyes */}
      <circle cx="48" cy="62" r="6" fill="#fef3c7" />
      <circle cx="72" cy="62" r="6" fill="#fef3c7" />
      <circle cx="49" cy="62" r="3" fill="#451a03" />
      <circle cx="73" cy="62" r="3" fill="#451a03" />
      {/* Mouth */}
      <path d="M48 78 Q60 84 72 78" fill="#451a03" />
      {/* Mud drops */}
      <circle cx="35" cy="88" r="4" fill="#78350f" opacity="0.6">
        <animate attributeName="cy" values="88;92;88" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="85" cy="90" r="3" fill="#78350f" opacity="0.5">
        <animate attributeName="cy" values="90;94;90" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function Voltix({ size, shake }: { size: number; shake: boolean }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size}>
      {/* Body */}
      <ellipse cx="60" cy="65" rx="30" ry="28" fill="#eab308" />
      <ellipse cx="60" cy="65" rx="24" ry="22" fill="#facc15" />
      {/* Antennae */}
      <line x1="45" y1="40" x2="35" y2="20" stroke="#ca8a04" strokeWidth="3" />
      <circle cx="35" cy="18" r="5" fill="#fde68a">
        <animate attributeName="fill" values="#fde68a;#ef4444;#fde68a" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <line x1="75" y1="40" x2="85" y2="20" stroke="#ca8a04" strokeWidth="3" />
      <circle cx="85" cy="18" r="5" fill="#fde68a">
        <animate attributeName="fill" values="#ef4444;#fde68a;#ef4444" dur="1.5s" repeatCount="indefinite" />
      </circle>
      {/* Eyes */}
      <circle cx="50" cy="60" r="6" fill="white" />
      <circle cx="70" cy="60" r="6" fill="white" />
      <circle cx="51" cy="60" r="3" fill="#1e1b4b" />
      <circle cx="71" cy="60" r="3" fill="#1e1b4b" />
      {/* Lightning bolt mouth */}
      <polygon points="55,72 58,76 54,78 60,85 56,78 60,76 57,72" fill="#ca8a04" />
      {/* Sparks */}
      <line x1="25" y1="55" x2="15" y2="50" stroke="#facc15" strokeWidth="2" opacity="0.6">
        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="0.8s" repeatCount="indefinite" />
      </line>
      <line x1="95" y1="60" x2="105" y2="55" stroke="#facc15" strokeWidth="2" opacity="0.6">
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

export function MonsterSVG({ tipo, size = 100, shake = false }: MonsterProps) {
  return (
    <motion.div
      animate={shake ? { x: [-5, 5, -5, 5, 0], opacity: [1, 0.5, 1] } : {}}
      transition={shake ? { duration: 0.4 } : {}}
    >
      {tipo === 'NEBLUS' && <Neblus size={size} shake={shake} />}
      {tipo === 'GROGMAR' && <Grogmar size={size} shake={shake} />}
      {tipo === 'VOLTIX' && <Voltix size={size} shake={shake} />}
    </motion.div>
  );
}
