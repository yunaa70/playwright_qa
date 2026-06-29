const { BasePage } = require('./BasePage');

// 상품 목록 화면. 로그인 성공 시 진입한다.
class InventoryPage extends BasePage {
  async isLoaded() {
    return this.page.getByTestId('inventory-list').isVisible();
  }

  async getProductCount() {
    return this.page.getByTestId('inventory-item').count();
  }

  // 첫 상품을 장바구니에 담는다 (담기 버튼은 .btn_inventory 안의 add-to-cart)
  async addFirstProductToCart() {
    await this.page.locator('[data-test^="add-to-cart"]').first().click();
  }

  async getCartBadgeCount() {
    const badge = this.page.getByTestId('shopping-cart-badge');
    return (await badge.isVisible()) ? badge.innerText() : '0';
  }

  async goToCart() {
    await this.clickByTestId('shopping-cart-link');
  }

  // 정렬: az, za, lohi, hilo
  async sortBy(value) {
    await this.page.getByTestId('product-sort-container').selectOption(value);
  }

  async getFirstProductName() {
    return this.page.getByTestId('inventory-item-name').first().innerText();
  }
}

module.exports = { InventoryPage };
