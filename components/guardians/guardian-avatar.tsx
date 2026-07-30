'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Perfil, EquipSlots } from '@/types';
import { Lumis, Expressao } from './lumis';
import { Torrak } from './torrak';
import { getColecionavel } from '@/data/collection';
import { EquipItemDisplay } from './equip-item-display';

const CHARACTER_IMAGES: Record<string, string> = {
  lumis: '/images/characters/lumis.png',
  faisca: '/images/characters/faisca.png',
  verdor: '/images/characters/verdor.png',
  torrak: '/images/characters/torrak.png',
  eclipse: '/images/characters/eclipse.png',
};

interface GuardianAvatarProps {
  perfil: Perfil;
  size?: number;
  glow?: boolean;
  expressao?: Expressao;
  cosmeticos?: boolean;   // mostrar itens equipados
  float?: boolean;
  equipadoOverride?: EquipSlots; // para pré-visualização na loja/coleção
}

export function GuardianAvatar({
  perfil,
  size = 120,
  glow = false,
  expressao = 'feliz',
  cosmeticos = true,
  float = true,
  equipadoOverride,
}: GuardianAvatarProps) {
  const equip: EquipSlots = equipadoOverride ?? perfil?.equipado ?? {
    chapeu: null, capacete: null, oculos: null, capa: null, asas: null, efeito: null, cor: null, companheiro: null,
  };
  const corItem = getColecionavel(equip.cor);
  const corOverride = corItem?.cor ?? null;

  // Chapéu tem prioridade sobre capacete
  const cabecaItemId = equip.chapeu ?? equip.capacete;

  const guardianType = (perfil?.guardiao ?? 'LUMIS') as 'LUMIS' | 'TORRAK';

  // Se tem personagem específico, mostra a imagem PNG
  if (perfil?.personagem && CHARACTER_IMAGES[perfil.personagem]) {
    return (
      <motion.div
        animate={float ? { y: [0, -5, 0] } : {}}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: size, height: size, position: 'relative' }}
      >
        <div style={{ position: 'relative', width: size, height: size }}>
          <Image
            src={CHARACTER_IMAGES[perfil.personagem]}
            alt={perfil.personagem}
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>
    );
  }

  // Fallback para avatar SVG customizável (para compatibilidade com perfis antigos)
  return (
    <motion.div
      animate={float ? { y: [0, -5, 0] } : {}}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: size, height: size, position: 'relative' }}
    >
      {/* Asas (atrás) — zIndex 6 */}
      {cosmeticos && equip.asas && (
        <EquipItemDisplay
          itemId={equip.asas}
          guardianType={guardianType}
          size={size}
          animated={true}
          category="asas"
        />
      )}

      {/* Capa (atrás) — zIndex 5 */}
      {cosmeticos && equip.capa && (
        <EquipItemDisplay
          itemId={equip.capa}
          guardianType={guardianType}
          size={size}
          animated={false}
          category="capa"
        />
      )}

      {/* Guardião — zIndex 10 */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        {perfil?.guardiao === 'LUMIS' ? (
          <Lumis ano={perfil?.ano ?? 2} size={size} glow={glow} cor={corOverride} expressao={expressao} float={false} />
        ) : (
          <Torrak ano={perfil?.ano ?? 2} size={size} glow={glow} cor={corOverride} expressao={expressao} float={false} />
        )}
      </div>

      {/* Efeito (aura animada) — zIndex 20 */}
      {cosmeticos && equip.efeito && (
        <EquipItemDisplay
          itemId={equip.efeito}
          guardianType={guardianType}
          size={size}
          animated={true}
          category="efeito"
        />
      )}

      {/* Óculos (sobre rosto) — zIndex 35 */}
      {cosmeticos && equip.oculos && (
        <EquipItemDisplay
          itemId={equip.oculos}
          guardianType={guardianType}
          size={size}
          animated={false}
          category="oculos"
        />
      )}

      {/* Chapéu / Capacete (topo da cabeça) — zIndex 40 */}
      {cosmeticos && cabecaItemId && (
        <EquipItemDisplay
          itemId={cabecaItemId}
          guardianType={guardianType}
          size={size}
          animated={false}
          category={equip.chapeu ? 'chapeu' : 'capacete'}
        />
      )}

      {/* Companheiro (ao lado) — zIndex 25 */}
      {cosmeticos && equip.companheiro && (
        <EquipItemDisplay
          itemId={equip.companheiro}
          guardianType={guardianType}
          size={size}
          animated={true}
          category="companheiro"
        />
      )}
    </motion.div>
  );
}
