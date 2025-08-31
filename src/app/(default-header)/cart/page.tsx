import { ReduxProvider } from '@/shared/lib/redux/providers/ReduxProvider';
import { CartSection } from '@/widgets/cart-section';

export default function Cart() {
  return (
    <main>
      <ReduxProvider>
        <CartSection />
      </ReduxProvider>
    </main>
  );
}
