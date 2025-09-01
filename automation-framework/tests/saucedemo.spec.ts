import { test, expect } from '@playwright/test';

test('SauceDemo Login Test', async ({ page }) => {
  // Navigate to SauceDemo
  await page.goto('https://www.saucedemo.com/');
  
  // Fill in login credentials
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  
  // Verify login was successful
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('.title')).toContainText('Products');
  
  console.log('Login test passed!');
});

test('SauceDemo Add to Cart Test', async ({ page }) => {
  // Navigate to SauceDemo
  await page.goto('https://www.saucedemo.com/');
  
  // Login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  
  // Add item to cart
  await page.click('#add-to-cart-sauce-labs-backpack');
  
  // Verify item was added to cart
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  
  // Go to cart
  await page.click('.shopping_cart_link');
  
  // Verify cart page
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  await expect(page.locator('.cart_item')).toHaveCount(1);
  
  console.log('Add to cart test passed!');
});
