import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import { AppShell } from '@/components/layout/AppShell';
import { Trackers } from '@/components/analytics/Trackers';
import { WhatsAppFloatingButton } from '@/components/layout/WhatsAppFloatingButton';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AtlasTrends — L'Élite Technologique · COD Maroc",
  description:
    "AtlasTrends General Store — gadgets, cosmétique, cuisine et tendances. Paiement à la livraison partout au Maroc.",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('atlastrends-theme');var theme=t==='dark'?'dark':'light';var r=document.documentElement;r.classList.remove('dark','light');r.classList.add(theme);r.style.colorScheme=theme==='dark'?'dark':'light';}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${cairo.variable} light h-full`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Trackers />
        <ThemeProvider>
          <LanguageProvider>
            <CartProvider>
              <AppShell>{children}</AppShell>
              <WhatsAppFloatingButton />
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
