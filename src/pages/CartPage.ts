import type { Locator, Page } from '@playwright/test';

/**
 * Page Object for the cart page (/coffee/cart).
 */
export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Same Total button as on the menu: data-test="checkout"
    this.checkoutButton = page.getByRole('button', { name: 'Proceed to checkout' });
  }

  /** Cart line item (e.g. "Espresso"). */
  itemByName(name: string): Locator {
    return this.page.locator('.list-item').filter({ hasText: name });
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
