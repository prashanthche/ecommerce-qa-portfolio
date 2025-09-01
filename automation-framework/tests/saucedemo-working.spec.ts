import { test, expect } from '@playwright/test';

test.describe('SauceDemo E-commerce Tests', () => {
  test('Successful login with valid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    // Fill login form
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Verify successful login
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toContainText('Products');
  });

  test('Login failure with invalid credentials', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    // Fill with invalid credentials
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');
    
    // Verify error message
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });

  test('Add product to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    // Login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Add item to cart
    await page.click('#add-to-cart-sauce-labs-backpack');
    
    // Verify item was added to cart
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Complete checkout process', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    // Login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Add item to cart
    await page.click('#add-to-cart-sauce-labs-backpack');
    
    // Go to cart
    await page.click('.shopping_cart_link');
    
    // Checkout
    await page.click('#checkout');
    
    // Fill checkout information
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');
    
    // Finish checkout
    await page.click('#finish');
    
    // Verify order completion
    await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');
  });
});
