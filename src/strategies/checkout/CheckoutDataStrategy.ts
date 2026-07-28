import type { CheckoutFormData } from '../../pages/CheckoutPage';

/**
 * Strategy for preparing checkout form data.
 * Same form — different data sets (valid / invalid).
 */
export interface CheckoutDataStrategy {
  /** Returns the data used to fill the form. */
  getData(): CheckoutFormData;
}
