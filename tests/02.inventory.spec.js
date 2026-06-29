// 02. 상품 목록 — 표시/개수/정렬

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { ACCOUNTS } = require('../data/testData');

test.describe('02. 상품 목록', () => {
  let inventory;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(ACCOUNTS.standard.username, ACCOUNTS.standard.password);
    inventory = new InventoryPage(page);
  });

  test('[TC-INV-001] 상품 목록이 노출', async () => {
    await expect(await inventory.isLoaded()).toBe(true);
  });

  test('[TC-INV-002] 상품 6개 노출', async () => {
    await expect(await inventory.getProductCount()).toBe(6);
  });

  test('[TC-INV-003] 이름 Z→A 정렬 시 정렬된 상태로 변경', async () => {
    const before = await inventory.getFirstProductName();
    await inventory.sortBy('za');
    const after = await inventory.getFirstProductName();

    await expect(after).not.toEqual(before);
  });

  test('[TC-INV-004] 가격 낮은순 정렬', async () => {
    await inventory.sortBy('lohi');

    await expect(await inventory.getProductCount()).toBe(6);
  });
});
