// 모든 Page Object의 부모
// Playwright는 액션에 auto-wait이 포함되어 있어, 여기선 공통 동작만 작동한다.

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async clickByTestId(testId) {
    await this.page.getByTestId(testId).click();
  }

  async fillByTestId(testId, value) {
    await this.page.getByTestId(testId).fill(value);
  }

  async textByTestId(testId) {
    return this.page.getByTestId(testId).innerText();
  }

  async isVisibleByTestId(testId) {
    return this.page.getByTestId(testId).isVisible();
  }
}

module.exports = { BasePage };
