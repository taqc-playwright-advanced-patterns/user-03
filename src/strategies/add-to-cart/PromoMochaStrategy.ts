import type { Page } from '@playwright/test';
import type { AddToCartStrategy } from './AddToCartStrategy';

/**
 * Strategy: add Mocha via the "lucky day" promo.
 *
 * UI hint: the promo appears after every 3rd add to the cart
 * (count > 0 && count % 3 === 0). Text:
 * "It's your lucky day! Get an extra cup of Mocha for $4."
 * Confirm button: "Yes, of course!"
 *
 * TODO (students):
 * 1. Add drinks until the promo appears (e.g. 3 clicks)
 * 2. Click "Yes, of course!"
 * 3. `productName` can be ignored — this strategy is Mocha-specific
 */
export class PromoMochaStrategy implements AddToCartStrategy {
  async add(_page: Page, _productName?: string): Promise<void> {
    throw new Error('PromoMochaStrategy.add() is not implemented — see README, task 2');
  }
}
