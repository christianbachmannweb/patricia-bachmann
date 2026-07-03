import type { APIRoute } from 'astro';

// Bild-Sitemap: hilft Google, die Fotos den Seiten zuzuordnen (Google Bilder).
// Es werden die WebP-URLs gelistet (= der indexierbare <img src>-Fallback).
// Hinweis: Google hat die Zusatz-Tags (caption/title/geo/license) 2022 abgekündigt,
// daher nur noch <image:loc>.
const BASE = 'https://www.patricia-bachmann.de';

const pages: { url: string; images: string[] }[] = [
  {
    url: '/',
    images: [
      '68f68f4a2cb959ad0eeeaa3b_Vavrova-Photography-6-von-132',
      '68f5d97ee5fc6b9192115130_Vavrova-Photography-1',
      '68f68f4afaf2bd81bdb18c89_Vavrova-Photography-105-von-250',
      '68fdf8f5e79a1b8bcd591a8e_PHOTO-2025-10-22-10-27-56-3',
      '68f68f49083ef945245f7dbd_Vavrova-Photography-68-von-284',
      '6901d149a95c48ea51e96e4c_Vavrova-Photography-63-von-330',
      '68f68f4952e4761f0c43db9f_vavrova-photography-140-von-284-1',
      '68f68f491fc5d5861ffa4d73_Vavrova-Photography-134-von-284',
      '68f5d97f50a691f540134fe5_Vavrova_Photography-207',
    ],
  },
  {
    url: '/kindergartenfotografie',
    images: [
      '6901d36ddf64124568a0ca7a_vavrova-photography-138-3',
      '6901d36f04c20ac7dc14b02e_vavrova-photography-64-von-330',
      '6901d36d5d887a52ad888ff5_vavrova-photography-140-2',
      '6901d1e9c1b15448359c947f_madi-13',
      '6901d36ff503918c7a0c3276_vavrova-photography-73-von-330',
      '6901d3703b687b2e5af29995_vavrova-photography-164-von-285',
      '6901d36d38ee12a28599286f_madi-19-1',
      '6901d36db64f6528c284a3af_vavrova-photography-139-4',
    ],
  },
  {
    url: '/schulfotografie',
    images: [
      '68fdf8f5c5066938e747a02a_photo-2025-10-22-10-27-55-2',
      '68fdf8f5eb82e8017099a60c_PHOTO-2025-10-22-10-27-54-2',
      '68fdf8f5e79a1b8bcd591a8e_PHOTO-2025-10-22-10-27-56-3',
      '68fdf8f565e23b84dc4d427e_PHOTO-2025-10-22-10-27-55',
      '68fdf8f5309d6ced6a86a9ec_photo-2025-10-22-10-27-55-3',
      '68fdf8f5c4cb7cec3af1423c_photo-2025-10-22-10-27-56-4',
      '68fdf8f5e6a825faf56b694b_PHOTO-2025-10-22-10-27-54',
      '68f68f4ae1996d2c9ea33683_Vavrova-Photography-116-von-250',
    ],
  },
];

export const GET: APIRoute = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .map(
    (p) => `  <url>
    <loc>${BASE}${p.url}</loc>
${p.images.map((img) => `    <image:image>
      <image:loc>${BASE}/images/${img}.webp</image:loc>
    </image:image>`).join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>
`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
