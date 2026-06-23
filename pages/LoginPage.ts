import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly url: string;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.url = 'https://www.saucedemo.com/';
        // Mapping elements based on strict structural criteria
        this.usernameInput = page.locator('input[data-test="username"]');
        this.passwordInput = page.locator('input[data-test="password"]');
        this.loginButton = page.locator('input[data-test="login-button"]');
        this.errorContainer = page.locator('h3[data-test="error"]');
    }

    async navigate() {
        await this.page.goto(this.url);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}