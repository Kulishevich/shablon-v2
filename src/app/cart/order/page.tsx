import { getDeliveryMethods } from '@/shared/api/delivery-methods/getDeliveryMethods';
import { getPaymentMethods } from '@/shared/api/payment-methods/getPaymentMethods';
import { ReduxProvider } from '@/shared/lib/redux/providers/ReduxProvider';
import { OrderSection } from '@/widgets/order-section';
import { cookies } from 'next/headers';

export default async function Order() {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const paymentMethods = await getPaymentMethods({ variant });
  const deliveryMethods = await getDeliveryMethods({ variant });

  console.log(deliveryMethods);

  return (
    <main>
      <ReduxProvider>
        <OrderSection paymentMethods={paymentMethods} deliveryMethods={deliveryMethods} />
      </ReduxProvider>
    </main>
  );
}
