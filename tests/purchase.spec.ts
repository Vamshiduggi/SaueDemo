import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/productsPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

test('Full checkout flow: Sort, Add to Cart, and Purchase', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Login and Product Selection
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.sort();
  await productsPage.addSpecificItemsToCart();

  // 2. Click Cart Icon and Proceed
  await productsPage.cartBadge.click();
  await cartPage.proceedToCheckout();

  // 3. Checkout Information and Completion
  await checkoutPage.fillInformation('Vamshi', 'Duggi', '60096');
  await checkoutPage.completeOrder();

  // 4. Final Verification
  await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');
});