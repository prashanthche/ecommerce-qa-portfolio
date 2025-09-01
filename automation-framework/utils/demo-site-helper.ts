export class DemoSiteHelper {
  static sites = {
    saucedemo: {
      url: 'https://www.saucedemo.com',
      login: {
        username: '#user-name',
        password: '#password',
        button: '#login-button'
      },
      products: {
        container: '.inventory_list',
        item: '.inventory_item',
        addToCart: '.btn_inventory'
      }
    },
    nopcommerce: {
      url: 'https://demo.nopcommerce.com',
      login: {
        email: '#Email',
        password: '#Password',
        button: 'button[type=submit]'
      }
    }
  };

  static getSiteConfig(siteName: string) {
    return this.sites[siteName] || this.sites.saucedemo;
  }
}
