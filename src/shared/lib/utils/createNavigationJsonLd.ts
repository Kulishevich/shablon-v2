import { navigation } from '@/shared/config/constants/navigation';

export const createNavigationJsonLd = () => {
  const navigationElements = navigation.slice(0, 6).map((nav) => ({
    '@type': 'SiteNavigationElement',
    name: nav.title,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}${nav.path}`,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: navigationElements.map((element, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: element,
    })),
  };
};
