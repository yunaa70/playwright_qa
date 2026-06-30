const { BasePage } = require('./BasePage');

// 로그인 화면 : SauceDemo는 진입 시 로그인 창이 노출됨
class LoginPage extends BasePage {

async open() {

await this.goto('https://www.saucedemo.com/');

await this.waitVisible('#user-name');

}
async login(username, password) {

if (username !== '') await this.fill('#user-name', username);

if (password !== '') await this.fill('#password', password);

await this.click('#login-button');

}
async getErrorMessage() {

return this.text('[data-test="error"]');

}
async isErrorDisplayed() {

return this.isVisible('[data-test="error"]');

}

}
module.exports = { LoginPage };
