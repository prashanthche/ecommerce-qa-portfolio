import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResults: Locator;
  readonly userProfileIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginLink = page.locator('a[href="/login"]');
    this.searchInput = page.locator('#search-input');
    this.searchButton = page.locator('#search-button');
    this.searchResults = page.locator('.search-results li');
    this.userProfileIcon = page.locator('.user-profile');
  }

  async navigate() {
    // Use the base URL from environment or default to SauceDemo
    const baseURL = process.env.BASE_URL || 'https://www.saucedemo.com';
    await this.page.goto(baseURL);
  }

  async clickLoginLink() {
    await this.loginLink.click();
  }

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async selectProductFromSearchResults(index: number = 0) {
    await this.searchResults.nth(index).click();
  }
}
