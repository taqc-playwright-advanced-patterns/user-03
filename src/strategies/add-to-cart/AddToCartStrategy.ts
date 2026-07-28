import type { Page } from '@playwright/test';

/**
 * Strategy for adding item(s) to the cart.
 * Different implementations = different ways to perform the same action.
 */
export interface AddToCartStrategy {
  /**
   * Adds item(s) according to the concrete strategy.
   * @param page — current Playwright page
   * @param productName — drink name (for strategies that need it)
   */
  add(page: Page, productName?: string): Promise<void>;
}
