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
  async add(page: Page, _productName?: string): Promise<void> {
    const cartText = (await page.getByRole('link', { name: 'Cart page' }).textContent()) ?? '';
    const countMatch = cartText.match(/\((\d+)\)/);
    const currentCount = countMatch ? Number(countMatch[1]) : 0;

    let clicksUntilPromo = 3 - (currentCount % 3);
    if (clicksUntilPromo === 0) {
      clicksUntilPromo = 3;
    }

    for (let i = 0; i < clicksUntilPromo; i += 1) {
      await page.getByLabel('Espresso', { exact: true }).click();
    }

    await page.getByRole('button', { name: 'Yes, of course!' }).click();
  }
}
