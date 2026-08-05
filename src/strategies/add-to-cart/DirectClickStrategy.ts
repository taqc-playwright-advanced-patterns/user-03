import type { Page } from '@playwright/test';
import type { AddToCartStrategy } from './AddToCartStrategy';

/**
 * Strategy: click a drink card in the menu.
 *
 * TODO (students):
 * 1. Find a stable product locator on https://seleniumbase.io/coffee/
 * 2. Implement a click on `productName`
 * 3. Wait for the cart counter to update if needed
 */
export class DirectClickStrategy implements AddToCartStrategy {
  async add(page: Page, productName?: string): Promise<void> {
    if (!productName) {
      throw new Error('DirectClickStrategy requires productName');
    }

    await page.getByLabel(productName, { exact: true }).click();
  }
}
