import type { AddToCartStrategy } from './AddToCartStrategy';
import type { Page } from '@playwright/test';

/**
 * Strategy pattern context: client code depends on the interface,
 * not on a concrete implementation.
 *
 * TODO (students): extend if needed (e.g. `setStrategy` is already provided).
 */
export class CartContext {
  constructor(private strategy: AddToCartStrategy) {}

  setStrategy(strategy: AddToCartStrategy): void {
    this.strategy = strategy;
  }

  async addToCart(page: Page, productName?: string): Promise<void> {
    await this.strategy.add(page, productName);
  }
}
