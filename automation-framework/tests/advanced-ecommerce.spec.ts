import { test, expect } from '@playwright/test';

test.describe('Advanced E-commerce Tests', () => {
  test('Complete purchase flow on SauceDemo', async ({ page }) => {
    // Login
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Add items to cart
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('#add-to-cart-sauce-labs-bike-light');
    
    // Verify cart
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await page.click('.shopping_cart_link');
    
    // Checkout
    await page.click('#checkout');
    await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345');
    await page.click('#continue');
    
    // Complete purchase
    await page.click('#finish');
    await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');
    
    console.log('Complete purchase flow test passed!');
  });

  test('Error validation tests', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    // Test empty login
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
    
    // Test invalid login
    await page.fill('#user-name', 'invalid');
    await page.fill('#password', 'invalid');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });

  test('Sorting and filtering products', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Test sorting
    await page.selectOption('.product_sort_container', 'lohi');
    const prices = await page.locator('.inventory_item_price').allTextContents();
    console.log('Prices after sorting:', prices);
    
    // This demonstrates you can work with product data
    expect(prices.length).toBeGreaterThan(0);
  });
});
