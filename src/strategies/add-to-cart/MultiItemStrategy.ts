import type { Page } from '@playwright/test';
import type { AddToCartStrategy } from './AddToCartStrategy';

/**
 * Strategy: add several drinks in a row.
 *
 * TODO (students):
 * 1. Accept a list of names in the constructor (e.g. `string[]`)
 * 2. In `add()`, click each drink
 * 3. The `productName` parameter can be unused
 */
export class MultiItemStrategy implements AddToCartStrategy {
  constructor(private readonly productNames: string[]) {}

  async add(page: Page, _productName?: string): Promise<void> {
    for (const name of this.productNames) {
      await page.getByLabel(name, { exact: true }).click();
    }
  }
}
