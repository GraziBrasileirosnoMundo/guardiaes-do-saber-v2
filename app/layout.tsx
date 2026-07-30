import { Fredoka, Nunito } from 'next/font/google';
import './globals.css';
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler';
import { MundoProvider } from '@/context/MundoContext';

const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-display', weight: ['400', '500', '600', '700'] });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '500', '600', '700', '800'] });

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Guardiões do Saber',
  description: 'Jogo educativo de aventura para crianças portuguesas',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Guardiões do Saber',
    description: 'Jogo educativo de aventura para crianças portuguesas',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className={`${fredoka.variable} ${nunito.variable} font-sans bg-[#0f0e1a] text-[#f8fafc] min-h-screen`}>
        <MundoProvider>
          {children}
        </MundoProvider>
        <ChunkLoadErrorHandler />
      </body>
    </html>
  );
}
