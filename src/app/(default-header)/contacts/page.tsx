import { ContactsSection } from '@/widgets/contacts-section';
import { getContacts } from '@/shared/api/design/getContacts';
import { SeoBlock } from '@/entities/seo-block';
import { Feedback } from '@/widgets/feedback/Feedback';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function Contacts() {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const contacts = await getContacts({ variant });

  if (!contacts) {
    return notFound();
  }

  return (
    <main>
      <ContactsSection contacts={contacts} />
      <SeoBlock page="/contacts" />
      <Feedback variant={variant} />
    </main>
  );
}
