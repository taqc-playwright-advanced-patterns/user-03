import type { Page } from '@playwright/test';
import type { AddToCartStrategy } from './AddToCartStrategy';

export type DoubleAddMode = 'double-click' | 'two-clicks';

/**
 * Strategy: add the same drink twice.
 *
 * Use either a true double click or two separate clicks.
 */
export class DoubleAddStrategy implements AddToCartStrategy {
  constructor(private readonly mode: DoubleAddMode = 'two-clicks') {}

  async add(page: Page, productName?: string): Promise<void> {
    if (!productName) {
      throw new Error('DoubleAddStrategy requires productName');
    }

    const cup = page.getByLabel(productName, { exact: true });

    if (this.mode === 'double-click') {
      await cup.dblclick();
      return;
    }

    await cup.click();
    await cup.click();
  }
}
