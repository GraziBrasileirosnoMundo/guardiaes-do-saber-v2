'use client';

export function PortalMagicoIllustration() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: '#00FFFF', stopOpacity: 0.8 }} />
          <stop offset="50%" style={{ stopColor: '#0099FF', stopOpacity: 0.5 }} />
          <stop offset="100%" style={{ stopColor: '#0033FF', stopOpacity: 0.2 }} />
        </radialGradient>
      </defs>
      <rect width="300" height="300" fill="url(#portalGlow)" opacity="0.3" />
      <circle cx="150" cy="150" r="70" fill="none" stroke="#00FFFF" strokeWidth="3" opacity="0.8" />
      <circle cx="150" cy="150" r="60" fill="none" stroke="#0099FF" strokeWidth="2" opacity="0.6" />
      <circle cx="150" cy="150" r="50" fill="url(#portalGlow)" opacity="0.5" />
      <circle cx="150" cy="150" r="40" fill="#001166" opacity="0.8" />
      <path d="M 150 110 Q 180 130 170 150 Q 180 170 150 190 Q 120 170 130 150 Q 120 130 150 110" fill="#00FFFF" opacity="0.4" />
    </svg>
  );
}

export function LaboratorioIllustration() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="potionGreen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00FF00', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#003300', stopOpacity: 0.9 }} />
        </linearGradient>
        <linearGradient id="potionBlue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00CCFF', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#000066', stopOpacity: 0.9 }} />
        </linearGradient>
      </defs>
      {/* Bottle 1 */}
      <rect x="60" y="100" width="30" height="80" rx="3" fill="url(#potionGreen)" />
      <rect x="60" y="90" width="30" height="15" fill="#004400" />
      {/* Bottle 2 */}
      <rect x="135" y="80" width="30" height="100" rx="3" fill="url(#potionBlue)" />
      <rect x="135" y="70" width="30" height="15" fill="#000044" />
      {/* Bottle 3 */}
      <rect x="210" y="110" width="30" height="70" rx="3" fill="url(#potionGreen)" />
      <rect x="210" y="100" width="30" height="15" fill="#004400" />
      {/* Glow */}
      <circle cx="75" cy="140" r="25" fill="#00FF00" opacity="0.15" />
      <circle cx="150" cy="130" r="30" fill="#00CCFF" opacity="0.15" />
      <circle cx="225" cy="145" r="20" fill="#00FF00" opacity="0.15" />
    </svg>
  );
}

export function ArenaIllustration() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="fireGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: '#FFAA00', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#CC3300', stopOpacity: 0.3 }} />
        </radialGradient>
      </defs>
      {/* Arena walls */}
      <ellipse cx="150" cy="150" rx="80" ry="60" fill="none" stroke="#FF6600" strokeWidth="4" />
      <ellipse cx="150" cy="150" rx="70" ry="52" fill="none" stroke="#FF8800" strokeWidth="2" />
      {/* Columns */}
      <rect x="100" y="100" width="12" height="100" fill="#AA4400" />
      <rect x="188" y="100" width="12" height="100" fill="#AA4400" />
      {/* Fire effect */}
      <path d="M 130 200 Q 120 180 130 160 L 140 200" fill="#FF4400" opacity="0.7" />
      <path d="M 170 200 Q 160 180 170 160 L 180 200" fill="#FF4400" opacity="0.7" />
      <circle cx="150" cy="180" r="40" fill="url(#fireGlow)" opacity="0.4" />
    </svg>
  );
}

export function CasteloIllustration() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="castleBlue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0099FF', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#000066', stopOpacity: 0.9 }} />
        </linearGradient>
      </defs>
      {/* Main tower */}
      <rect x="120" y="120" width="60" height="90" fill="url(#castleBlue)" />
      {/* Roof */}
      <polygon points="120,120 150,80 180,120" fill="#003366" />
      {/* Left tower */}
      <rect x="70" y="150" width="30" height="60" fill="#004488" />
      <polygon points="70,150 85,120 100,150" fill="#002244" />
      {/* Right tower */}
      <rect x="200" y="150" width="30" height="60" fill="#004488" />
      <polygon points="200,150 215,120 230,150" fill="#002244" />
      {/* Door */}
      <rect x="140" y="170" width="20" height="40" fill="#001133" />
      {/* Windows */}
      <circle cx="135" cy="140" r="5" fill="#00CCFF" opacity="0.8" />
      <circle cx="165" cy="140" r="5" fill="#00CCFF" opacity="0.8" />
      <circle cx="135" cy="160" r="5" fill="#00CCFF" opacity="0.8" />
      <circle cx="165" cy="160" r="5" fill="#00CCFF" opacity="0.8" />
    </svg>
  );
}

export function Florestailustration() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="treeGreen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#00FF88', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#003311', stopOpacity: 0.9 }} />
        </linearGradient>
      </defs>
      {/* Trees */}
      <circle cx="80" cy="120" r="35" fill="url(#treeGreen)" opacity="0.7" />
      <rect x="70" y="150" width="20" height="50" fill="#663300" />
      <circle cx="150" cy="100" r="40" fill="url(#treeGreen)" opacity="0.8" />
      <rect x="140" y="140" width="20" height="60" fill="#663300" />
      <circle cx="220" cy="130" r="35" fill="url(#treeGreen)" opacity="0.7" />
      <rect x="210" y="160" width="20" height="40" fill="#663300" />
      {/* Glow particles */}
      <circle cx="100" cy="100" r="8" fill="#00FF88" opacity="0.6" />
      <circle cx="180" cy="80" r="6" fill="#00FFAA" opacity="0.5" />
      <circle cx="240" cy="100" r="7" fill="#00FF88" opacity="0.5" />
    </svg>
  );
}

export function MontanhaIllustration() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="iceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#CCFFFF', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#003366', stopOpacity: 0.9 }} />
        </linearGradient>
      </defs>
      {/* Mountains */}
      <polygon points="50,200 120,80 150,200" fill="url(#iceGradient)" opacity="0.8" />
      <polygon points="140,200 200,100 240,200" fill="url(#iceGradient)" opacity="0.7" />
      <polygon points="220,200 260,130 290,200" fill="url(#iceGradient)" opacity="0.6" />
      {/* Snow caps */}
      <polygon points="120,80 110,100 130,100" fill="#FFFFFF" opacity="0.9" />
      <polygon points="200,100 190,120 210,120" fill="#FFFFFF" opacity="0.9" />
      <polygon points="260,130 250,150 270,150" fill="#FFFFFF" opacity="0.8" />
      {/* Ice crystals */}
      <circle cx="150" cy="150" r="4" fill="#00FFFF" opacity="0.6" />
      <circle cx="180" cy="160" r="3" fill="#00FFFF" opacity="0.5" />
    </svg>
  );
}

export function TemploIllustration() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="temploGold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: '#FFDD00', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#996600', stopOpacity: 0.3 }} />
        </radialGradient>
      </defs>
      {/* Main structure */}
      <rect x="80" y="120" width="140" height="100" fill="#AA8844" />
      {/* Columns */}
      <rect x="100" y="100" width="15" height="120" fill="#995533" />
      <rect x="185" y="100" width="15" height="120" fill="#995533" />
      {/* Roof */}
      <polygon points="80,120 150,60 220,120" fill="#663322" />
      {/* Door */}
      <rect x="135" y="160" width="30" height="60" fill="#221111" />
      {/* Light glow */}
      <circle cx="150" cy="100" r="50" fill="url(#temploGold)" opacity="0.3" />
      {/* Windows */}
      <circle cx="120" cy="130" r="6" fill="#FFDD00" opacity="0.7" />
      <circle cx="180" cy="130" r="6" fill="#FFDD00" opacity="0.7" />
    </svg>
  );
}

export function TesourailustrationIllustration() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="chestGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: '#FFAA00', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#CC3300', stopOpacity: 0.3 }} />
        </radialGradient>
      </defs>
      {/* Chest */}
      <rect x="80" y="120" width="140" height="100" rx="20" fill="#CC8844" />
      {/* Top of chest */}
      <ellipse cx="150" cy="120" rx="70" ry="20" fill="#DD9955" />
      {/* Treasure glow */}
      <circle cx="150" cy="140" r="60" fill="url(#chestGlow)" opacity="0.5" />
      {/* Gold coins */}
      <circle cx="120" cy="140" r="8" fill="#FFDD00" />
      <circle cx="150" cy="130" r="10" fill="#FFDD00" />
      <circle cx="180" cy="140" r="8" fill="#FFDD00" />
      <circle cx="140" cy="160" r="7" fill="#FFDD00" />
      <circle cx="160" cy="160" r="7" fill="#FFDD00" />
      {/* Gems */}
      <polygon points="150,100 160,115 140,115" fill="#00FFFF" />
      <polygon points="130,120 140,130 125,130" fill="#FF00FF" />
      <polygon points="170,120 180,130 165,130" fill="#FF00FF" />
    </svg>
  );
}

export const WORLD_ILLUSTRATIONS: Record<number, React.ComponentType> = {
  1: PortalMagicoIllustration,
  2: LaboratorioIllustration,
  3: ArenaIllustration,
  4: CasteloIllustration,
  5: Florestailustration,
  6: MontanhaIllustration,
  7: TemploIllustration,
  8: TesourailustrationIllustration,
};
