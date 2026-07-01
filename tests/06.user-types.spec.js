const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { ACCOUNTS } = require('../data/testData');

// 06. 사용자 유형별 검증
// problem_user는 결함 계정
test.describe('06. 사용자 유형별 검증', () => {
  test('[TC-USER-001] problem_user도 로그인 후 상품 목록에 진입', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(ACCOUNTS.problem.username, ACCOUNTS.problem.password);

    const inventory = new InventoryPage(page);
    await expect(await inventory.isLoaded()).toBe(true);
  });

  test('[TC-USER-002] problem_user의 상품 이미지가 모두 동일 (이미지 결함)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(ACCOUNTS.problem.username, ACCOUNTS.problem.password);

    // problem_user는 모든 상품 이미지가 깨진 이미지로 표시되는 결함이 있음
    const imgs = page.locator('.inventory_item img');
    const count = await imgs.count();
    const srcSet = new Set();
    for (let i = 0; i < count; i++) {
      srcSet.add(await imgs.nth(i).getAttribute('src'));
    }

    // 정상이라면 이미지가 제각각이어야 함
    // problem_user는 이미지가 전부 동일 -> srcSet 크기가 1 -> 결함
    expect(srcSet.size).toBe(1);
  });
});
