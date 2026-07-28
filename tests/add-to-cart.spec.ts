import { expect, test } from '@playwright/test';
import { MenuPage } from '../src/pages/MenuPage';
import { CartContext } from '../src/strategies/add-to-cart/CartContext';
import { DirectClickStrategy } from '../src/strategies/add-to-cart/DirectClickStrategy';
import { MultiItemStrategy } from '../src/strategies/add-to-cart/MultiItemStrategy';
import { PromoMochaStrategy } from '../src/strategies/add-to-cart/PromoMochaStrategy';

/**
 * Add-to-cart tests using the Strategy pattern.
 *
 * Strategy stubs throw Error. After implementing them (README, tasks 2 and 4),
 * remove `test.skip` from beforeEach and replace the temporary expects.
 */
/* eslint-disable playwright/no-skipped-test -- intentional skip until students implement */
test.describe('Add to cart — Strategy', () => {
  let menuPage: MenuPage;

  test.beforeEach(async ({ page }) => {
    // TODO: remove this skip when strategies and assertions are ready
    test.skip(true, 'Implement strategies and assertions — see README, tasks 2 and 4');

    menuPage = new MenuPage(page);
    await menuPage.goto();
  });

  test('adds Espresso via DirectClickStrategy', async ({ page }) => {
    const context = new CartContext(new DirectClickStrategy());

    await context.addToCart(page, 'Espresso');

    // TODO: await expect(menuPage.cartLink).toContainText('1');
    expect(menuPage).toBeTruthy();
  });

  test('adds Mocha via PromoMochaStrategy', async ({ page }) => {
    const context = new CartContext(new PromoMochaStrategy());

    await context.addToCart(page);

    // TODO: assert Mocha / cart (1)
    expect(menuPage).toBeTruthy();
  });

  test('adds several drinks via MultiItemStrategy', async ({ page }) => {
    // TODO: pass a drink list to the constructor after implementing it
    const context = new CartContext(new MultiItemStrategy());

    await context.addToCart(page);

    // TODO: expect cart (N)
    expect(menuPage).toBeTruthy();
  });

  test('can switch strategy mid-scenario (setStrategy)', async ({ page }) => {
    const context = new CartContext(new DirectClickStrategy());
    await context.addToCart(page, 'Espresso');

    context.setStrategy(new PromoMochaStrategy());
    await context.addToCart(page);

    // TODO: expect cart (2) — Espresso + Mocha
    expect(menuPage).toBeTruthy();
  });
});
