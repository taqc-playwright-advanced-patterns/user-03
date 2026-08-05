import type { Page } from '@playwright/test';
import type { AddToCartStrategy } from './AddToCartStrategy';

export type PriceExtremum = 'cheapest' | 'most-expensive';

type PricedDrink = {
  name: string;
  price: number;
};

/**
 * Strategy: add either the cheapest or the most expensive drink from the menu.
 */
export class PriceExtremumStrategy implements AddToCartStrategy {
  private lastSelectedDrinkName: string | null = null;

  constructor(private readonly extremum: PriceExtremum) {}

  getLastSelectedDrinkName(): string | null {
    return this.lastSelectedDrinkName;
  }

  async add(page: Page, _productName?: string): Promise<void> {
    const drinks = await page
      .locator('[data-test]:not([data-test="checkout"])')
      .evaluateAll((nodes) => {
        return nodes
          .map((node) => {
            const cup = node as HTMLElement;
            const name = cup.getAttribute('aria-label') ?? '';
            const card = cup.closest('li');
            const priceText = card?.querySelector('h4 small')?.textContent ?? '';
            const price = Number(priceText.replace(/[^0-9.]/g, ''));

            return { name, price };
          })
          .filter((drink) => drink.name.length > 0 && Number.isFinite(drink.price));
      });

    if (drinks.length === 0) {
      throw new Error('PriceExtremumStrategy: no drinks with prices found');
    }

    const selected = this.selectDrink(drinks);
    this.lastSelectedDrinkName = selected.name;

    await page.getByLabel(selected.name, { exact: true }).click();
  }

  private selectDrink(drinks: PricedDrink[]): PricedDrink {
    return drinks.reduce((best, current) => {
      if (this.extremum === 'cheapest') {
        return current.price < best.price ? current : best;
      }

      return current.price > best.price ? current : best;
    });
  }
}
