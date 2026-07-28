import type { CheckoutFormData } from '../../pages/CheckoutPage';
import type { CheckoutDataStrategy } from './CheckoutDataStrategy';

/**
 * Strategy: invalid / empty data for a negative scenario.
 *
 * TODO (students):
 * 1. Return empty or deliberately invalid values
 * 2. In the test, assert that the order is NOT confirmed
 *    (or that a validation error appears — explore the UI)
 */
export class InvalidCheckoutStrategy implements CheckoutDataStrategy {
  getData(): CheckoutFormData {
    throw new Error('InvalidCheckoutStrategy.getData() is not implemented — see README, task 3');
  }
}
