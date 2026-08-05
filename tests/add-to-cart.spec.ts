import { expect, test } from '@playwright/test';
import { CartPage } from '../src/pages/CartPage';
import { MenuPage } from '../src/pages/MenuPage';
import { CartContext } from '../src/strategies/add-to-cart/CartContext';
import { DirectClickStrategy } from '../src/strategies/add-to-cart/DirectClickStrategy';
import { DoubleAddStrategy } from '../src/strategies/add-to-cart/DoubleAddStrategy';
import { MultiItemStrategy } from '../src/strategies/add-to-cart/MultiItemStrategy';
import { PriceExtremumStrategy } from '../src/strategies/add-to-cart/PriceExtremumStrategy';
import { PromoMochaStrategy } from '../src/strategies/add-to-cart/PromoMochaStrategy';

/**
 * Add-to-cart tests using the Strategy pattern.
 *
 * Add-to-cart tests where a test chooses a strategy implementation,
 * while context and test flow remain the same.
 */
test.describe('Add to cart — Strategy', () => {
  let menuPage: MenuPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    menuPage = new MenuPage(page);
    cartPage = new CartPage(page);
    await menuPage.goto();
  });

  test('adds Espresso via DirectClickStrategy', async ({ page }) => {
    const context = new CartContext(new DirectClickStrategy());

    await context.addToCart(page, 'Espresso');
    expect(await menuPage.getCartCount()).toBe(1);
    await menuPage.openCart();

    await expect(cartPage.itemByName('Espresso')).toBeVisible();
  });

  test('adds Mocha via PromoMochaStrategy', async ({ page }) => {
    const context = new CartContext(new PromoMochaStrategy());

    await context.addToCart(page);
    expect(await menuPage.getCartCount()).toBe(4);
    await menuPage.openCart();

    await expect(cartPage.itemByName('Mocha')).toBeVisible();
  });

  test('adds several drinks via MultiItemStrategy', async ({ page }) => {
    const items = ['Espresso', 'Cappuccino', 'Americano'];
    const context = new CartContext(new MultiItemStrategy(items));

    await context.addToCart(page);
    expect(await menuPage.getCartCount()).toBe(items.length);
    await menuPage.openCart();

    for (const item of items) {
      await expect(cartPage.itemByName(item)).toBeVisible();
    }
  });

  test('can switch strategy mid-scenario (setStrategy)', async ({ page }) => {
    const context = new CartContext(new DirectClickStrategy());
    await context.addToCart(page, 'Espresso');

    context.setStrategy(new PromoMochaStrategy());
    await context.addToCart(page);
    expect(await menuPage.getCartCount()).toBe(4);
    await menuPage.openCart();

    await expect(cartPage.itemByName('Espresso')).toBeVisible();
    await expect(cartPage.itemByName('Mocha')).toBeVisible();
  });

  test('adds the same drink twice via double-click', async ({ page }) => {
    const context = new CartContext(new DoubleAddStrategy('double-click'));

    await context.addToCart(page, 'Americano');
    expect(await menuPage.getCartCount()).toBe(2);
    await menuPage.openCart();

    await expect(cartPage.itemByName('Americano')).toBeVisible();
  });

  test('adds the same drink twice via two clicks', async ({ page }) => {
    const context = new CartContext(new DoubleAddStrategy('two-clicks'));

    await context.addToCart(page, 'Cafe Latte');
    expect(await menuPage.getCartCount()).toBe(2);
    await menuPage.openCart();

    await expect(cartPage.itemByName('Cafe Latte')).toBeVisible();
  });

  test('adds the cheapest drink from the menu', async ({ page }) => {
    const strategy = new PriceExtremumStrategy('cheapest');
    const context = new CartContext(strategy);

    await context.addToCart(page);
    expect(await menuPage.getCartCount()).toBe(1);
    await menuPage.openCart();

    await expect(cartPage.itemByName('Americano')).toBeVisible();
  });

  test('adds the most expensive drink from the menu', async ({ page }) => {
    const strategy = new PriceExtremumStrategy('most-expensive');
    const context = new CartContext(strategy);

    await context.addToCart(page);
    expect(await menuPage.getCartCount()).toBe(1);
    await menuPage.openCart();

    await expect(cartPage.itemByName('Cappuccino')).toBeVisible();
  });
});
