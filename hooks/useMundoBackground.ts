'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMundoContext } from '@/context/MundoContext';

const MUNDO_IMAGES: Record<number, string> = {
  1: '/images/mundos/1-portal-magico.png',
  2: '/images/mundos/2-laboratorio-magico.png',
  3: '/images/mundos/3-arena-dos-guardioes.png',
  4: '/images/mundos/4-castelo-dourado.png',
  5: '/images/mundos/5-floresta-encantada.png',
  6: '/images/mundos/6-montanha-gelada.png',
  7: '/images/mundos/7-templo-antigo.png',
  8: '/images/mundos/8-tesouro-final.png',
};

export function useMundoBackground() {
  const searchParams = useSearchParams();
  const { mundoSelecionado } = useMundoContext();
  const [backgroundStyle, setBackgroundStyle] = useState<React.CSSProperties>({});
  const [mundoId, setMundoId] = useState(1);

  useEffect(() => {
    // Prioridade: contexto > URL params > default 1
    let id = 1;

    if (mundoSelecionado && mundoSelecionado > 0) {
      id = mundoSelecionado;
    } else if (searchParams?.get('mundoId')) {
      id = parseInt(searchParams.get('mundoId')!, 10);
    }

    console.log('🌍 useMundoBackground - mundoId:', id, 'contexto:', mundoSelecionado, 'url:', searchParams?.get('mundoId'));

    setMundoId(id);

    const backgroundImage = MUNDO_IMAGES[id] || MUNDO_IMAGES[1];

    console.log('🖼️ Background image path:', backgroundImage);

    if (backgroundImage) {
      const style = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${backgroundImage}")`,
        backgroundSize: 'cover' as const,
        backgroundPosition: 'center' as const,
        backgroundRepeat: 'no-repeat' as const,
        backgroundAttachment: 'fixed' as const,
        backgroundBlendMode: 'multiply' as const,
      };
      console.log('✅ Background style aplicado:', style);
      setBackgroundStyle(style);
    } else {
      console.log('❌ Nenhuma imagem encontrada para mundo:', id);
    }
  }, [searchParams, mundoSelecionado]);

  return {
    mundoId,
    backgroundImage: MUNDO_IMAGES[mundoId],
    backgroundStyle,
  };
}
