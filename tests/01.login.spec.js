// 01. 로그인 — 정상 로그인 + 입력 검증(빈 값/잠긴 계정)

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { ACCOUNTS } = require('../data/testData');

test.describe('01. 로그인', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('[TC-LOGIN-001] 유효한 계정으로 로그인 시 상품 목록으로 이동', async ({ page }) => {
    await loginPage.login(ACCOUNTS.standard.username, ACCOUNTS.standard.password);

    const inventory = new InventoryPage(page);
    await expect(await inventory.isLoaded()).toBe(true);
  });

  test('[TC-LOGIN-002] 아이디가 비어 있으면 에러 노출', async () => {
    await loginPage.login('', ACCOUNTS.standard.password);

    await expect(await loginPage.isErrorDisplayed()).toBe(true);
  });

  test('[TC-LOGIN-003] 비밀번호가 비어 있으면 에러 노출', async () => {
    await loginPage.login(ACCOUNTS.standard.username, '');

    await expect(await loginPage.isErrorDisplayed()).toBe(true);
  });

  test('[TC-LOGIN-004] 잠긴 계정으로 로그인 시 에러 노출', async () => {
    await loginPage.login(ACCOUNTS.locked.username, ACCOUNTS.locked.password);

    const error = await loginPage.getErrorMessage();
    await expect(error).toContain('locked out');
  });

  test('[TC-LOGIN-005] 틀린 비밀번호로 로그인 시 에러 노출', async () => {
    await loginPage.login(ACCOUNTS.standard.username, 'wrong_password');

    await expect(await loginPage.isErrorDisplayed()).toBe(true);
  });
});
