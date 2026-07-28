import type { Locator, Page } from '@playwright/test';

export type CheckoutFormData = {
  name: string;
  email: string;
};

/**
 * Page Object for the Payment details modal.
 */
export class CheckoutPage {
  readonly page: Page;
  readonly paymentForm: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.paymentForm = page.getByRole('form', { name: 'Payment form' });
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.submitButton = page.locator('#submit-payment');
    this.successMessage = page.locator('.snackbar.success');
  }

  async fillForm(data: CheckoutFormData): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}
