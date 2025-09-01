import { Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly showPasswordToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.locator('#email');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('.alert-error');
    this.emailError = page.locator('#email-error');
    this.passwordError = page.locator('#password-error');
    this.showPasswordToggle = page.locator('.password-toggle');
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async enterEmail(email: string) {
    await this.emailField.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async togglePasswordVisibility() {
    await this.showPasswordToggle.click();
  }
}
