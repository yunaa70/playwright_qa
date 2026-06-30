const { BasePage } = require('./BasePage');

// 결제 화면 : 배송정보 입력 -> 검토 -> 완료
class CheckoutPage extends BasePage {
  async enterInfo(firstName, lastName, zip) {
    if (firstName !== '') await this.fill('#first-name', firstName);
    if (lastName !== '') await this.fill('#last-name', lastName);
    if (zip !== '') await this.fill('#postal-code', zip);
  }

  async continue() {
    await this.click('#continue');
  }

  async finish() {
    await this.click('#finish');
  }

  async isErrorDisplayed() {
    return this.isVisible('[data-test="error"]');
  }

  async isOverviewDisplayed() {
    return this.page.locator('.checkout_summary_container').isVisible();
  }

  async isOrderComplete() {
    return this.page.locator('.complete-header').isVisible();
  }

  async getCompleteText() {
    return this.text('.complete-header');
  }
}

module.exports = { CheckoutPage };
