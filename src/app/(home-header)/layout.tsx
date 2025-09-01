import '@/shared/config/styles/index.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { getCategories } from '@/shared/api/category/getCategories';
import { HeaderDesktop } from '@/widgets/header-desktop';
import { HeaderMobile } from '@/widgets/header-mobile';
import { getContacts } from '@/shared/api/design/getContacts';
import { cookies } from 'next/headers';

export default async function HomeHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const [categories, contacts] = await Promise.all([
    getCategories({ variant }),
    getContacts({ variant }),
  ]);

  return (
    <>
      <HeaderDesktop categories={categories || []} contacts={contacts} variant={'home'} />
      <HeaderMobile categories={categories} contacts={contacts} variant={'home'} />
      {children}
    </>
  );
}
