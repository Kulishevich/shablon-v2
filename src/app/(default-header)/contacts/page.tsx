import { ContactsSection } from '@/widgets/contacts-section';
import { CompanyDetails } from '@/widgets/company-details';
import { getContacts } from '@/shared/api/design/getContacts';
import { SeoBlock } from '@/entities/seo-block';
import { Feedback } from '@/widgets/feedback/Feedback';
import { cookies } from 'next/headers';

export default async function Contacts() {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const contacts = await getContacts({ variant });

  return (
    <main>
      <ContactsSection contacts={contacts} />
      <CompanyDetails contacts={contacts} />
      <SeoBlock page="/contacts" />
      <Feedback variant={variant} />
    </main>
  );
}
