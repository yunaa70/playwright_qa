const { BasePage } = require('./BasePage');

// 장바구니 화면
class CartPage extends BasePage {
  async getItemCount() {
    return this.page.locator('.cart_item').count();
  }

  async isItemDisplayed() {
    return this.page.locator('.inventory_item_name').first().isVisible();
  }

  async removeFirstItem() {
    await this.page.locator('[data-test^="remove"]').first().click();
  }

  async checkout() {
    await this.click('#checkout');
  }

  async continueShopping() {
    await this.click('#continue-shopping');
  }
}

module.exports = { CartPage };
