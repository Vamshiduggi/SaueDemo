import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test('should login successfully to e-commerce store', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Navigate and perform login
  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  // Validation: Check if we reached the products page
  await expect(page).toHaveURL(/inventory.html/);
  const title = await page.locator('.title').textContent();
  expect(title).toBe('Products');
});