// 모든 Page Object의 부모
// Playwright는 액션에 auto-wait이 포함되어 있어, 여기선 공통 동작만 작동한다.

class BasePage {

constructor(page) {

this.page = page;

}
async goto(url = 'https://www.saucedemo.com/') {
    await this.page.goto(url);
  }

  async click(selector) {
    await this.page.locator(selector).click();
  }

  async fill(selector, value) {
    await this.page.locator(selector).fill(value);
  }

  async text(selector) {
    return this.page.locator(selector).innerText();
  }

  async isVisible(selector) {
    return this.page.locator(selector).isVisible();
  }

  async waitVisible(selector) {
    await this.page.locator(selector).waitFor({ state: 'visible' });
  }

  async count(selector) {
    return this.page.locator(selector).count();
  }

}
module.exports = { BasePage };
