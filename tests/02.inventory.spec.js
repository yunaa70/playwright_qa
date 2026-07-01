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


  test('[TC-INV-003] 이름 A→Z 정렬 시 모든 상품명 오름차순 적용', async () => {
    await inventory.sortBy('az');

    const names = await inventory.getAllProductNames();
    const expected = [...names].sort((a, b) => a.localeCompare(b));

    expect(names).toEqual(expected);
  });

  test('[TC-INV-004] 가격 낮은순 정렬 시 모든 가격 오름차순 적용', async () => {
    await inventory.sortBy('lohi');

    const prices = await inventory.getAllPrices();
    const expected = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(expected);
  });

  test('[TC-INV-005] 가격 높은순 정렬 시 모든 가격 내림차순 적용', async () => {
    await inventory.sortBy('hilo');

    const prices = await inventory.getAllPrices();
    const expected = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(expected);
  });
});
