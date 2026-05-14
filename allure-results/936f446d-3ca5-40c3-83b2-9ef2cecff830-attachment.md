# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: products.spec.ts >> should sort by price and add specific items to cart
- Location: tests\products.spec.ts:5:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('.shopping_cart_badge')
Expected: "2"
Received: "3"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('.shopping_cart_badge')
    14 × locator resolved to <span class="shopping_cart_badge" data-test="shopping-cart-badge">3</span>
       - unexpected value "3"

```

```yaml
- text: "3"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../pages/LoginPage';
  3  | import { ProductsPage } from '../pages/productsPage';
  4  | 
  5  | test('should sort by price and add specific items to cart', async ({ page }) => {
  6  |   const loginPage = new LoginPage(page);
  7  |   const productsPage = new ProductsPage(page);
  8  | 
  9  |   // 1. Login
  10 |   await loginPage.navigate();
  11 |   await loginPage.login('standard_user', 'secret_sauce');
  12 | 
  13 |   // 2. Filter: Price (low to high)
  14 |   await productsPage.sort();
  15 | 
  16 |   // 3. Select Sauce Labs Backpack and Sauce Labs Bike Light
  17 |   await productsPage.addSpecificItemsToCart();
  18 | 
  19 |   // 4. Verification: Check if 2 items are in the cart
> 20 |   await expect(productsPage.cartBadge).toHaveText('2');
     |                                        ^ Error: expect(locator).toHaveText(expected) failed
  21 | });
```