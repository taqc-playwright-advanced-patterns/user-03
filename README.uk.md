# Playwright + Strategy: Coffee Cart

[English](./README.md) | **Українська**

Навчальний проєкт для практики патерну **Strategy** у UI-автотестах на [Coffee Cart](https://seleniumbase.io/coffee/).

Студенти **реалізують стратегії** та **пишуть / дописують тести** у цьому репозиторії.

## Що вже є

| Шлях                          | Призначення                                 |
| ----------------------------- | ------------------------------------------- |
| `playwright.config.ts`        | baseURL = Coffee Cart, Chromium, звіти      |
| `src/pages/`                  | Page Object-заглушки (Menu, Cart, Checkout) |
| `src/strategies/add-to-cart/` | інтерфейс + заглушки стратегій додавання    |
| `src/strategies/checkout/`    | інтерфейс + заглушки стратегій даних форми  |
| `tests/*.spec.ts`             | каркаси тестів із `TODO`                    |

Стратегії зараз кидають `Error` — це навмисно. Ваше завдання — замінити заглушки робочим кодом і зробити тести зеленими.

## Швидкий старт

```bash
npm install
npx playwright install chromium
npm test
```

Корисні команди:

```bash
npm run test:headed   # з браузером
npm run test:ui       # Playwright UI mode
npm run lint
npm run format
npm run typecheck
```

## Патерн Strategy (коротко)

**Мета:** одна дія (додати в кошик / підготувати дані checkout), кілька взаємозамінних алгоритмів.

```
Test → CartContext → AddToCartStrategy
                         ├─ DirectClickStrategy
                         ├─ PromoMochaStrategy
                         └─ MultiItemStrategy
```

Контекст залежить від **інтерфейсу**, а не від конкретної реалізації. Стратегію можна підмінити через `setStrategy()` без зміни коду контексту.

---

## Завдання для студентів

### Завдання 0. Дослідження UI (обов’язково)

1. Відкрийте https://seleniumbase.io/coffee/
2. Додайте кілька напоїв кліком по чашках
3. Знайдіть промо Mocha: додайте 3 напої підряд → "It's your lucky day…" → "Yes, of course!"
4. Опційно: right-click по чашці → діалог "Add … to the cart?" (Yes / No)
5. Відкрийте оплату через кнопку **Total** (`Proceed to checkout`) і пройдіть форму
6. Занотуйте локатори (або одразу поправте їх у `src/pages/` — частина вже уточнена)

### Завдання 1. Page Objects

У файлах `MenuPage`, `CartPage`, `CheckoutPage`:

- [ ] Уточніть локатори під реальну розмітку
- [ ] За потреби додайте методи (`getCartCount()`, `expectItemInCart()` тощо)
- [ ] Не дублюйте селектори в тестах — тримайте їх у Page Object

### Завдання 2. Стратегії додавання в кошик

Реалізуйте `add()` у:

| Клас                  | Поведінка                                              |
| --------------------- | ------------------------------------------------------ |
| `DirectClickStrategy` | клік по напою `productName`                            |
| `PromoMochaStrategy`  | промо Mocha після кожного 3-го add → "Yes, of course!" |
| `MultiItemStrategy`   | конструктор приймає `string[]`, клікає всі             |

Перевірки:

- [ ] Класи реалізують `AddToCartStrategy`
- [ ] `CartContext` залишається без змін бізнес-логіки (лише делегує)
- [ ] Після реалізації тести в `tests/add-to-cart.spec.ts` можна запускати

### Завдання 3. Стратегії checkout-даних

Реалізуйте `getData()` у:

- [ ] `ValidCheckoutStrategy` — коректні ім’я та email
- [ ] `InvalidCheckoutStrategy` — порожні / некоректні дані

У тесті: `strategy.getData()` → `checkoutPage.fillForm(data)`. За потреби підправте локатори форми.

### Завдання 4. Тести

У `tests/add-to-cart.spec.ts` та `tests/checkout.spec.ts`:

- [ ] Приберіть `test.skip(...)` у `beforeEach`
- [ ] Замініть тимчасові `expect(...).toBeTruthy()` на осмислені перевірки (лічильник кошика, товари, success / відсутність success)
- [ ] Збережіть ідею: **тест обирає стратегію**, а не містить `if (type === ...)`

Мінімальний набір сценаріїв (уже намічений у файлах):

1. Direct click → Espresso в кошику
2. Promo → Mocha в кошику
3. Multi item → кілька позицій
4. `setStrategy` посеред сценарію
5. Valid checkout → успіх
6. Invalid checkout → без успішного підтвердження

### Завдання 5. (опційно) Своя стратегія

Додайте ще одну стратегію, наприклад:

- додати напій двічі (подвійний клік / два кліки)
- додати найдешевший / найдорожчий напій
- стратегія через data-driven параметри з `test.each`

Опишіть у коментарі, **чому** це окрема стратегія, а не метод Page Object.

### Завдання 6. (опційно) Якість коду

- [ ] `npm run lint` без помилок
- [ ] `npm run format`
- [ ] `npm run typecheck`
- [ ] Немає захардкожених `waitForTimeout` без потреби

---

## Критерії прийому

1. Усі обов’язкові тести (`add-to-cart`, `checkout`) проходять на Chromium.
2. Є мінімум **три** реалізації `AddToCartStrategy` і **дві** `CheckoutDataStrategy`.
3. Тести не знають внутрішньої реалізації стратегій — лише інтерфейс / контекст.
4. Локатори зібрані в Page Objects.
5. README не потрібно змінювати (окрім опційного опису своєї стратегії в кінці файлу).

## Структура проєкту

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
│       │   ├── DirectClickStrategy.ts      ← реалізувати
│       │   ├── PromoMochaStrategy.ts       ← реалізувати
│       │   └── MultiItemStrategy.ts        ← реалізувати
│       └── checkout/
│           ├── CheckoutDataStrategy.ts
│           ├── ValidCheckoutStrategy.ts    ← реалізувати
│           └── InvalidCheckoutStrategy.ts  ← реалізувати
└── tests/
    ├── add-to-cart.spec.ts                 ← дописати expect
    └── checkout.spec.ts                    ← дописати expect
```

У тестах використовуйте звичайні `test` / `expect` з `@playwright/test`. Page Object і `CartContext` створюйте вручну (`new MenuPage(page)`, `new CartContext(strategy)`).

## Підказки по UI Coffee Cart

- Напої: `getByLabel('Espresso', { exact: true })` або `getByTestId('Espresso')` (`data-test`).
- Без `{ exact: true }` «Espresso» також знайде Espresso Macchiato / Con Panna.
- Лічильник у навбарі: лінк `Cart page`, текст на кшталт `cart (N)`.
- Оплата: кнопка Total = `getByRole('button', { name: 'Proceed to checkout' })` / `data-test="checkout"`.
- Форма: `#name`, `#email`, `#submit-payment`; успіх — `.snackbar.success` («Thanks for your purchase…»).
- Промо Mocha: після кожного 3-го додавання; кнопки `Yes, of course!` / `Nah, I'll skip.`
- Right-click по чашці відкриває `<dialog data-sb="add-to-cart-modal">` з Yes / No.

Успіхів! Якщо тест падає — спочатку перевірте локатори в DevTools, потім логіку стратегії.
