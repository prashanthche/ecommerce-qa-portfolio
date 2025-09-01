import { test, expect } from '@playwright/test';

test.describe('Checkout Flow - SauceDemo', () => {
  test('Complete checkout process as guest user', async ({ page }) => {
    // Navigate to SauceDemo
    await page.goto('https://www.saucedemo.com/');
    
    // Login (SauceDemo doesn't have guest checkout, so we use standard flow)
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Add product to cart
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

  test('Validate page elements exist', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    // Verify essential page elements exist
    await expect(page.locator('#user-name')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
    
    // Login to see more elements
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Verify inventory page elements
    await expect(page.locator('.inventory_list')).toBeVisible();
    await expect(page.locator('.shopping_cart_link')).toBeVisible();
    
    // Take a screenshot for documentation
    await page.screenshot({ path: 'screenshots/saucedemo-inventory.png' });
  });
});
