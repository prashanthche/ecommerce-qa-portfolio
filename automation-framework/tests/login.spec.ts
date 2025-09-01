import { test, expect } from '@playwright/test';

test.describe('Login Functionality - SauceDemo', () => {
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

  test('Login form validation - empty fields', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    // Try to login with empty fields
    await page.click('#login-button');
    
    // Verify error message
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
  });
});
