import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/productsPage';

test('should sort by price and add specific items to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  // 1. Login
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  // 2. Filter: Price (low to high)
  await productsPage.sort();

  // 3. Select Sauce Labs Backpack and Sauce Labs Bike Light
  await productsPage.addSpecificItemsToCart();

  // 4. Verification: Check if 2 items are in the cart
  await expect(productsPage.cartBadge).toHaveText('2');
});