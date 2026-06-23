import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly url: string;
    readonly productSortDropdown: Locator;
    readonly inventoryItemCards: Locator;
    readonly inventoryItemName: Locator;
    readonly addToCartButtons: Locator;
    readonly removeFromCartButtons: Locator;
    readonly shoppingCartBadge: Locator;
    readonly burgerMenuButton: Locator;
    readonly burgerMenuCrossBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = 'https://www.saucedemo.com/inventory.html';
        this.productSortDropdown = page.locator('select[data-test="product-sort-container"]');
        this.inventoryItemCards = page.locator('.inventory_item');
        this.inventoryItemName = page.locator('.inventory_item_name');
        this.addToCartButtons = page.locator('button[id^="add-to-cart"]');
        this.removeFromCartButtons = page.locator('button[id^="remove"]');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.burgerMenuButton = page.locator('#react-burger-menu-btn');
        this.burgerMenuCrossBtn = page.locator('#react-burger-cross-btn');
    }

    async navigateDirectly() {
        await this.page.goto(this.url);
    }

    async sortProductsBy(optionValue: string) {
        await this.productSortDropdown.selectOption({ value: optionValue });
    }

    async addFirstItemToCart() {
        await this.addToCartButtons.first().click();
    }

    async removeFirstItemFromCart() {
        await this.removeFromCartButtons.first().click();
    }
}