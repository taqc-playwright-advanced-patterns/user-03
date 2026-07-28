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
  // TODO: add a field for the drink list and a constructor

  async add(_page: Page, _productName?: string): Promise<void> {
    throw new Error('MultiItemStrategy.add() is not implemented — see README, task 2');
  }
}
