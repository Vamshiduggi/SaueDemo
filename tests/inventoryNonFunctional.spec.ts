import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// Pre-condition base setup: Perform login and provide clean page context
test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    // Using explicit double quotes matching verification criteria
    await loginPage.login('standard_user', 'secret_sauce');
});

// ==============================================================================
// PERFORMANCE TESTING (TC_PE_001, TC_PE_007)
// ==============================================================================

test('TC_PE_001 - Verify page load time of the inventory page under normal load conditions', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    // Performance navigation timing capture
    const startTime = performance.now();
    await inventoryPage.navigateDirectly();
    await inventoryPage.inventoryItemCards.first().waitFor({ state: 'visible' });
    const endTime = performance.now();
    
    const loadDurationSec = (endTime - startTime) / 1000;
    // Expected Result: Load completely within "2 seconds"
    expect(loadDurationSec).toBeLessThan(2.0);
});

test('TC_PE_007 - Verify data retrieval performance for sorting functionality', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigateDirectly();
    
    const startTime = performance.now();
    await inventoryPage.sortProductsBy('lohi'); // "Price (low to high)"
    await page.waitForLoadState('networkidle');
    const endTime = performance.now();
    
    const sortingDurationMs = endTime - startTime;
    // Expected Result: Re-sort execution under "500ms"
    expect(sortingDurationMs).toBeLessThan(500);
});

// ==============================================================================
// SECURITY TESTING (TC_SE_016, TC_SE_022)
// ==============================================================================

test.describe('Security Isolations', () => {
    // Override the globally enforced login baseline for specific unauthenticated verification
    test.use({ storageState: { cookies: [], origins: [] } });

    test('TC_SE_016 - Verify unauthorized access to inventory page without login', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const loginPage = new LoginPage(page);
        
        // Directly inject "https://www.saucedemo.com/inventory.html" without logging in
        await inventoryPage.navigateDirectly();
        
        // Validate fallback routing state securely handles bounds
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(loginPage.errorContainer).toBeVisible();
    });
});

test('TC_SE_022 - Verify Secure Attribute configuration on Cookies', async ({ context }) => {
    const cookies = await context.cookies('https://www.saucedemo.com');
    expect(cookies.length).toBeGreaterThan(0);
    
    for (const cookie of cookies) {
        // Assert security flags to prevent script intercept attacks
        expect(cookie.httpOnly).toBe(true);
        expect(cookie.secure).toBe(true);
    }
});

// ==============================================================================
// USABILITY TESTING (TC_US_033, TC_US_038)
// ==============================================================================

test('TC_US_033 - Verify clear status feedback when adding an item to the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigateDirectly();
    
    // Counter badge shouldn't exist initially
    await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
    
    // Add "Sauce Labs Backpack" structural component
    await inventoryPage.addFirstItemToCart();
    
    // Assert visual tracking transformations
    await expect(inventoryPage.removeFromCartButtons.first()).toHaveText('Remove');
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
});

test('TC_US_038 - Verify that interactive components show visual pointer changes', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigateDirectly();
    
    const productTitle = inventoryPage.inventoryItemName.first();
    
    // Extract calculated CSS properties from the active browser rendering engine
    const cursorStyle = await productTitle.evaluate((el) => window.getComputedStyle(el).cursor);
    expect(cursorStyle).toBe('pointer');
});

// ==============================================================================
// RELIABILITY TESTING (TC_RE_064)
// ==============================================================================

test('TC_RE_064 - Verify cart item count durability when hitting browser Refresh heavily', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigateDirectly();
    
    await inventoryPage.addFirstItemToCart();
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
    
    // Execute aggressive system refresh loops
    for (let i = 0; i < 5; i++) {
        await page.reload();
        await page.waitForLoadState('load');
    }
    
    // Verify structural configuration tracking data persists smoothly
    await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
});