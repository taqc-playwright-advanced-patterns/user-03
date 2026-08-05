import type { CheckoutFormData } from '../../pages/CheckoutPage';
import type { CheckoutDataStrategy } from './CheckoutDataStrategy';

/**
 * Strategy: valid data for a successful checkout.
 *
 * TODO (students): return a valid name and email.
 */
export class ValidCheckoutStrategy implements CheckoutDataStrategy {
  getData(): CheckoutFormData {
    return {
      name: 'Anton Tester',
      email: 'anton.tester@example.com',
    };
  }
}
