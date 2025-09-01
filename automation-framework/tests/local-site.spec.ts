import { test, expect } from '@playwright/test';
import * as path from 'path';

test.describe('Local Test Site', () => {
  test('Test local HTML file', async ({ page }) => {
    const filePath = path.join(__dirname, '../test-site.html');
    await page.goto(`file://${filePath}`);
    
    // Test login form exists
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#login-button')).toBeVisible();
    
    // Test search form exists
    await expect(page.locator('#search-input')).toBeVisible();
    await expect(page.locator('#search-button')).toBeVisible();
    
    console.log('Local test site loaded successfully');
  });

  test('Fill login form', async ({ page }) => {
    const filePath = path.join(__dirname, '../test-site.html');
    await page.goto(`file://${filePath}`);
    
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('#login-button');
    
    // For demo purposes, just verify the values were entered
    await expect(page.locator('#email')).toHaveValue('test@example.com');
    await expect(page.locator('#password')).toHaveValue('password123');
    
    console.log('Login form test completed');
  });
});
