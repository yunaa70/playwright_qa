const { BasePage } = require('./BasePage');

// 장바구니 화면
class CartPage extends BasePage {
  async getItemCount() {
    return this.page.getByTestId('inventory-item').count();
  }

  async isItemDisplayed() {
    return this.page.getByTestId('inventory-item-name').first().isVisible();
  }

  async removeFirstItem() {
    await this.page.locator('[data-test^="remove"]').first().click();
  }

  async checkout() {
    await this.clickByTestId('checkout');
  }

  async continueShopping() {
    await this.clickByTestId('continue-shopping');
  }
}

module.exports = { CartPage };
