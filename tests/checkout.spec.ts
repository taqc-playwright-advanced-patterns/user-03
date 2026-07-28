import { expect, test } from '@playwright/test';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { MenuPage } from '../src/pages/MenuPage';
import { CartContext } from '../src/strategies/add-to-cart/CartContext';
import { DirectClickStrategy } from '../src/strategies/add-to-cart/DirectClickStrategy';
import { InvalidCheckoutStrategy } from '../src/strategies/checkout/InvalidCheckoutStrategy';
import { ValidCheckoutStrategy } from '../src/strategies/checkout/ValidCheckoutStrategy';

/**
 * Checkout tests using a form-data strategy.
 *
 * Flow: menu → add item → Total → form → Submit.
 * After implementing strategies, remove `test.skip` from beforeEach.
 */
/* eslint-disable playwright/no-skipped-test -- intentional skip until students implement */
test.describe('Checkout — Strategy', () => {
  let menuPage: MenuPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    // TODO: remove this skip when strategies and assertions are ready
    test.skip(true, 'Implement strategies and assertions — see README, tasks 3 and 4');

    menuPage = new MenuPage(page);
    checkoutPage = new CheckoutPage(page);

    await menuPage.goto();
    const context = new CartContext(new DirectClickStrategy());
    await context.addToCart(page, 'Espresso');
  });

  test('successful checkout with ValidCheckoutStrategy', async () => {
    await menuPage.totalButton.click();

    const data = new ValidCheckoutStrategy().getData();
    await checkoutPage.fillForm(data);
    await checkoutPage.submit();

    // TODO: await expect(checkoutPage.successMessage).toBeVisible();
    expect(checkoutPage).toBeTruthy();
  });

  test('checkout with InvalidCheckoutStrategy does not succeed', async () => {
    await menuPage.totalButton.click();

    const data = new InvalidCheckoutStrategy().getData();
    await checkoutPage.fillForm(data);
    await checkoutPage.submit();

    // TODO: await expect(checkoutPage.successMessage).not.toBeVisible();
    expect(checkoutPage).toBeTruthy();
  });
});
