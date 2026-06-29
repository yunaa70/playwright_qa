const { BasePage } = require('./BasePage');

// 로그인 화면. SauceDemo는 진입 시 바로 로그인 폼이 뜬다.
class LoginPage extends BasePage {
  async open() {
    await this.goto('/');
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
