const { BasePage } = require('./BasePage');

// 결제: 배송정보 입력 → 검토 → 완료
class CheckoutPage extends BasePage {
  async enterInfo(firstName, lastName, zip) {
    if (firstName !== '') await this.fillByTestId('firstName', firstName);
    if (lastName !== '') await this.fillByTestId('lastName', lastName);
    if (zip !== '') await this.fillByTestId('postalCode', zip);
  }

  async continue() {
    await this.clickByTestId('continue');
  }

  async finish() {
    await this.clickByTestId('finish');
  }

  async isErrorDisplayed() {
    return this.isVisibleByTestId('error');
  }

  async isOverviewDisplayed() {
    return this.page.getByTestId('checkout-summary-container').isVisible();
  }

  async isOrderComplete() {
    return this.page.getByTestId('complete-header').isVisible();
  }

  async getCompleteText() {
    return this.textByTestId('complete-header');
  }
}

module.exports = { CheckoutPage };
