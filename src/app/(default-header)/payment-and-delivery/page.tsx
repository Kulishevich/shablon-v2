import { Feedback } from '@/widgets/feedback/Feedback';
import { DeliverySection } from '@/widgets/delivery-section';
import { SeoBlock } from '@/entities/seo-block';
import { cookies } from 'next/headers';
import { getDeliveryAndPayment } from '@/shared/api/delivery-and-payment/getDeliveryPayment';
import { getContacts } from '@/shared/api/design/getContacts';

export default async function PaymentAndDelivery() {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;
  const contacts = await getContacts({ variant });

  const content = await getDeliveryAndPayment({ variant });

  return (
    <main>
      <DeliverySection content={content} contacts={contacts} />
      <SeoBlock page="/payment-and-delivery" />
      <Feedback variant={variant} />
    </main>
  );
}
