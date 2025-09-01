import { test, expect } from '@playwright/test';
import { DemoSiteHelper } from '../utils/demo-site-helper';

test.describe('Multi-site Demo Tests', () => {
  test('Test SauceDemo login', async ({ page }) => {
    const site = DemoSiteHelper.getSiteConfig('saucedemo');
    
    await page.goto(site.url);
    
    // Login
    await page.fill(site.login.username, 'standard_user');
    await page.fill(site.login.password, 'secret_sauce');
    await page.click(site.login.button);
    
    // Verify login success
    await expect(page).toHaveURL(`${site.url}/inventory.html`);
  });

  test('Test nopCommerce demo', async ({ page }) => {
    const site = DemoSiteHelper.getSiteConfig('nopcommerce');
    
    await page.goto(site.url);
    
    // Verify homepage loaded
    await expect(page).toHaveTitle('nopCommerce demo store');
    await expect(page.locator('.header-logo')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'screenshots/nopcommerce-home.png' });
  });
});
