import type { NextConfig } from 'next';

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : null;

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      ...(supabaseHostname
        ? [
            {
              protocol: 'https' as const,
              hostname: supabaseHostname,
              pathname: '/storage/v1/object/public/**',
            },
          ]
        : []),
    ],
    qualities: [75, 85, 90, 95],
  },
  // Landing page autonome (HTML statique) accessible sur /a7zima
  async rewrites() {
    return [{ source: '/a7zima', destination: '/a7zima/index.html' }];
  },
  // Cache long sur les images de la landing : par defaut Next sert public/ en
  // must-revalidate, ce qui force un aller-retour reseau a chaque visite et
  // penalise le LCP sur mobile.
  // Le HTML lui-meme reste revalide : il porte l'offre et la cle Supabase.
  async headers() {
    return [
      {
        source: '/a7zima/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/a7zima',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }],
      },
    ];
  },
};

export default nextConfig;
