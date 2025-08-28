import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Поиск',
  description: 'Поиск товаров',
  openGraph: {
    title: 'Поиск',
    description: 'Поиск товаров',
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
