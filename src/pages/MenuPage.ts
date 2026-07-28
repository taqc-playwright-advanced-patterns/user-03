import type { Locator, Page } from '@playwright/test';

/**
 * Page Object for the coffee shop menu.
 * Locators verified against https://seleniumbase.io/coffee/
 */
export class MenuPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly totalButton: Locator;
  readonly promoBanner: Locator;
  readonly acceptPromoButton: Locator;
  readonly declinePromoButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByRole('link', { name: 'Cart page' });
    // Total button: aria-label="Proceed to checkout", data-test="checkout"
    this.totalButton = page.getByRole('button', { name: 'Proceed to checkout' });
    this.promoBanner = page.locator('.promo');
    this.acceptPromoButton = page.getByRole('button', { name: 'Yes, of course!' });
    this.declinePromoButton = page.getByRole('button', { name: "Nah, I'll skip." });
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Drink cup.
   * Use exact — otherwise "Espresso" also matches "Espresso Macchiato".
   * Alternative: getByTestId (config has testIdAttribute = "data-test").
   */
  productByName(name: string): Locator {
    return this.page.getByLabel(name, { exact: true });
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
