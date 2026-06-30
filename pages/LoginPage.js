const { BasePage } = require('./BasePage');

// 로그인 화면 : SauceDemo는 진입 시 로그인 창이 노출됨
class LoginPage extends BasePage {
  async open() {
    await this.page.goto('https://www.saucedemo.com/');
    await this.page.locator('#user-name').waitFor({ state: 'visible' });
  }

  async login(username, password) {
    if (username !== '') await this.fillByTestId('username', username);
    if (password !== '') await this.fillByTestId('password', password);
    await this.clickByTestId('login-button');
  }

  async getErrorMessage() {
    return this.textByTestId('error');
  }

  async isErrorDisplayed() {
    return this.isVisibleByTestId('error');
  }
}

module.exports = { LoginPage };
