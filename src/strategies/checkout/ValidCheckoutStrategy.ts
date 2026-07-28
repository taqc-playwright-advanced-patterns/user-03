import type { CheckoutFormData } from '../../pages/CheckoutPage';
import type { CheckoutDataStrategy } from './CheckoutDataStrategy';

/**
 * Strategy: valid data for a successful checkout.
 *
 * TODO (students): return a valid name and email.
 */
export class ValidCheckoutStrategy implements CheckoutDataStrategy {
  getData(): CheckoutFormData {
    throw new Error('ValidCheckoutStrategy.getData() is not implemented — see README, task 3');
  }
}
