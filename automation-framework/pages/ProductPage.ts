import { Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly sizeDropdown: Locator;
  readonly colorOptions: Locator;
  readonly addToCartButton: Locator;
  readonly viewCartButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('.product-title');
    this.productPrice = page.locator('.product-price');
    this.sizeDropdown = page.locator('#size-select');
    this.colorOptions = page.locator('.color-option');
    this.addToCartButton = page.locator('#add-to-cart');
    this.viewCartButton = page.locator('a[href="/cart"]');
    this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
  }

  async selectSize(size: string) {
    await this.sizeDropdown.selectOption({ label: size });
  }

  async selectColor(color: string) {
    await this.colorOptions.filter({ hasText: color }).click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async viewCart() {
    await this.viewCartButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
