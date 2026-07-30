'use client';
import { useState } from 'react';
import Image from 'next/image';
import { WORLD_ILLUSTRATIONS } from './world-illustrations';

interface WorldCardImageProps {
  mundoId: number;
  nome: string;
}

export function WorldCardImage({ mundoId, nome }: WorldCardImageProps) {
  const [useImage, setUseImage] = useState(true);
  const [imageError, setImageError] = useState(false);

  const imagePath = `/images/mundos/${mundoId}-${nome.toLowerCase().replace(/\s+/g, '-')}.png`;
  const IllustrationComponent = WORLD_ILLUSTRATIONS[mundoId];

  // Se a imagem deu erro, usa SVG
  if (imageError || !useImage) {
    return (
      <div className="absolute inset-0 p-4">
        {IllustrationComponent && <IllustrationComponent />}
      </div>
    );
  }

  return (
    <>
      {/* Tenta carregar imagem real primeiro */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={imagePath}
          alt={nome}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </div>

      {/* Fallback SVG (invisível mas pronto) */}
      {IllustrationComponent && (
        <div className="absolute inset-0 p-4 opacity-0 pointer-events-none">
          <IllustrationComponent />
        </div>
      )}
    </>
  );
}
