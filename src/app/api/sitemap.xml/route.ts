import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const res = await fetch(`${getApiBaseUrl(variant)}/v1/seo/sitemap.xml`);
  const xml = await res.text();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
