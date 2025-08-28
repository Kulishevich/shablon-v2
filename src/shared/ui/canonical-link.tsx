import Script from 'next/script';
import { getSiteBaseUrl } from '../lib/utils/getBaseUrl';
import { cookies } from 'next/headers';

interface CanonicalLinkProps {
  href: string;
}

export const CanonicalLink = async ({ href }: CanonicalLinkProps) => {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  return (
    <Script
      id="canonical-link"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          if (!document.querySelector('link[rel="canonical"]')) {
            const link = document.createElement('link');
            link.rel = 'canonical';
            link.href = '${getSiteBaseUrl(variant)}/${href}';
            document.head.appendChild(link);
          }
        `,
      }}
    />
  );
};
