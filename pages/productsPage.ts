import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly addBackpackBtn: Locator;
  readonly addBikeLightBtn: Locator;
  readonly cartBadge: Locator;
  readonly bolttshirt:Locator;
  readonly fleecejacket:Locator;
  readonly onesia:Locator;
  readonly red:Locator;

  constructor(page: Page) {
    this.page = page;
    // Locators for sorting and specific products
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.addBackpackBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.addBikeLightBtn = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.bolttshirt=page.locator(`[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]`);
    this.fleecejacket=page.locator(`[data-test="add-to-cart-sauce-labs-fleece-jacket"]`);
    this.onesia=page.locator(`[data-test="add-to-cart-sauce-labs-onesie"]`);
    this.red=page.locator(`data-test="add-to-cart-test.allthethings()-t-shirt-(red)"`);
  }

  async sort() {
    // Select the "Price (low to high)" option
    await this.sortDropdown.selectOption('lohi');
  }

  async addSpecificItemsToCart() {
    await this.addBackpackBtn.click();
    await this.addBikeLightBtn.click();
    await this.bolttshirt.click();
  }
}