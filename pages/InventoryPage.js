const { BasePage } = require('./BasePage');

// 상품 목록 화면 : 로그인 성공 시 진입
class InventoryPage extends BasePage {
  async isLoaded() {
    return this.page.locator('.inventory_list').isVisible();
  }

  async getProductCount() {
    return this.page.locator('.inventory_item').count();
  }

  // 장바구니에 상품 담기 (담기 버튼은 .btn_inventory 안의 add-to-cart)
  async addFirstProductToCart() {
    await this.page.locator('[data-test^="add-to-cart"]').first().click();
  }

  async getCartBadgeCount() {
    const badge = this.page.locator('.shopping_cart_badge');
    return (await badge.isVisible()) ? badge.innerText() : '0';
  }

  async goToCart() {
    await this.click('.shopping_cart_link');
  }

  // 정렬: az, za, lohi, hilo
  async sortBy(value) {
    await this.page.locator('.product_sort_container').selectOption(value);
  }

  async getFirstProductName() {
    return this.page.locator('.inventory_item_name').first().innerText();
  }
}

module.exports = { InventoryPage };
