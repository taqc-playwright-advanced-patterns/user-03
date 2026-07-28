# Playwright + Strategy: Coffee Cart

**English** | [Українська](./README.uk.md)

A learning project for practicing the **Strategy** pattern in UI automation tests on [Coffee Cart](https://seleniumbase.io/coffee/).

Students **implement strategies** and **write / complete tests** in this repository.

## What's included

| Path                          | Purpose                                  |
| ----------------------------- | ---------------------------------------- |
| `playwright.config.ts`        | baseURL = Coffee Cart, Chromium, reports |
| `src/pages/`                  | Page Object stubs (Menu, Cart, Checkout) |
| `src/strategies/add-to-cart/` | interface + add-to-cart strategy stubs   |
| `src/strategies/checkout/`    | interface + checkout data strategy stubs |
| `tests/*.spec.ts`             | test skeletons with `TODO`s              |

Strategies currently throw `Error` on purpose. Your job is to replace the stubs with working code and make the tests green.

## Quick start

```bash
npm install
npx playwright install chromium
npm test
```

Useful commands:

```bash
npm run test:headed   # headed browser
npm run test:ui       # Playwright UI mode
npm run lint
npm run format
npm run typecheck
```

## Strategy pattern (short)

**Goal:** one action (add to cart / prepare checkout data), several interchangeable algorithms.

```
Test → CartContext → AddToCartStrategy
                         ├─ DirectClickStrategy
                         ├─ PromoMochaStrategy
                         └─ MultiItemStrategy
```

The context depends on the **interface**, not a concrete implementation. You can swap the strategy via `setStrategy()` without changing the context code.

---

## Student tasks

### Task 0. Explore the UI (required)

1. Open https://seleniumbase.io/coffee/
2. Add several drinks by clicking the cups
3. Find the Mocha promo: add 3 drinks in a row → "It's your lucky day…" → "Yes, of course!"
4. Optional: right-click a cup → "Add … to the cart?" dialog (Yes / No)
5. Open payment via the **Total** button (`Proceed to checkout`) and complete the form
6. Note the locators (or adjust them in `src/pages/` — some are already refined)

### Task 1. Page Objects

In `MenuPage`, `CartPage`, `CheckoutPage`:

- [ ] Refine locators to match the real markup
- [ ] Add methods if needed (`getCartCount()`, `expectItemInCart()`, etc.)
- [ ] Do not duplicate selectors in tests — keep them in Page Objects

### Task 2. Add-to-cart strategies

Implement `add()` in:

| Class                 | Behavior                                            |
| --------------------- | --------------------------------------------------- |
| `DirectClickStrategy` | click the drink named `productName`                 |
| `PromoMochaStrategy`  | Mocha promo after every 3rd add → "Yes, of course!" |
| `MultiItemStrategy`   | constructor takes `string[]`, clicks each item      |

Checks:

- [ ] Classes implement `AddToCartStrategy`
- [ ] `CartContext` keeps no business logic (only delegates)
- [ ] After implementation, tests in `tests/add-to-cart.spec.ts` can run

### Task 3. Checkout data strategies

Implement `getData()` in:

- [ ] `ValidCheckoutStrategy` — valid name and email
- [ ] `InvalidCheckoutStrategy` — empty / invalid data

In the test: `strategy.getData()` → `checkoutPage.fillForm(data)`. Adjust form locators if needed.

### Task 4. Tests

In `tests/add-to-cart.spec.ts` and `tests/checkout.spec.ts`:

- [ ] Remove `test.skip(...)` from `beforeEach`
- [ ] Replace temporary `expect(...).toBeTruthy()` with meaningful assertions (cart count, items, success / no success)
- [ ] Keep the idea: the **test chooses the strategy**, it does not contain `if (type === ...)`

Minimum scenarios (already sketched in the files):

1. Direct click → Espresso in cart
2. Promo → Mocha in cart
3. Multi item → several items
4. `setStrategy` mid-scenario
5. Valid checkout → success
6. Invalid checkout → no successful confirmation

### Task 5. (optional) Your own strategy

Add another strategy, for example:

- add a drink twice (double click / two clicks)
- add the cheapest / most expensive drink
- a strategy driven by `test.each` parameters

Explain in a comment **why** this is a separate strategy, not a Page Object method.

### Task 6. (optional) Code quality

- [ ] `npm run lint` with no errors
- [ ] `npm run format`
- [ ] `npm run typecheck`
- [ ] No hard-coded `waitForTimeout` unless necessary

---

## Acceptance criteria

1. All required tests (`add-to-cart`, `checkout`) pass on Chromium.
2. There are at least **three** `AddToCartStrategy` implementations and **two** `CheckoutDataStrategy` implementations.
3. Tests do not know strategy internals — only the interface / context.
4. Locators live in Page Objects.
5. README does not need changes (except an optional description of your own strategy at the end).

## Project structure

```text
playwright-strategy-coffee/
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── .prettierrc
├── src/
│   ├── pages/
│   │   ├── MenuPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   └── strategies/
│       ├── add-to-cart/
│       │   ├── AddToCartStrategy.ts
│       │   ├── CartContext.ts
│       │   ├── DirectClickStrategy.ts      ← implement
│       │   ├── PromoMochaStrategy.ts       ← implement
│       │   └── MultiItemStrategy.ts        ← implement
│       └── checkout/
│           ├── CheckoutDataStrategy.ts
│           ├── ValidCheckoutStrategy.ts    ← implement
│           └── InvalidCheckoutStrategy.ts  ← implement
└── tests/
    ├── add-to-cart.spec.ts                 ← complete expects
    └── checkout.spec.ts                    ← complete expects
```

In tests, use plain `test` / `expect` from `@playwright/test`. Create Page Objects and `CartContext` manually (`new MenuPage(page)`, `new CartContext(strategy)`).

## Coffee Cart UI tips

- Drinks: `getByLabel('Espresso', { exact: true })` or `getByTestId('Espresso')` (`data-test`).
- Without `{ exact: true }`, "Espresso" also matches Espresso Macchiato / Con Panna.
- Navbar counter: `Cart page` link, text like `cart (N)`.
- Payment: Total button = `getByRole('button', { name: 'Proceed to checkout' })` / `data-test="checkout"`.
- Form: `#name`, `#email`, `#submit-payment`; success — `.snackbar.success` ("Thanks for your purchase…").
- Mocha promo: after every 3rd add; buttons `Yes, of course!` / `Nah, I'll skip.`
- Right-click a cup opens `<dialog data-sb="add-to-cart-modal">` with Yes / No.

Good luck! If a test fails, check locators in DevTools first, then the strategy logic.
