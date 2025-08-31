import { getSetting } from '@/shared/api/design/getSetting';
import { PrivacyPolicyContent } from '@/widgets/privacy-policy-content';
import { SeoBlock } from '@/entities/seo-block';
import { cookies } from 'next/headers';

export default async function PrivacyPolicy() {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const setting = await getSetting({ variant });

  return (
    <main>
      <PrivacyPolicyContent content={setting?.privacy_policy?.text} />
      <SeoBlock page={`privacy-policy`} />
    </main>
  );
}
