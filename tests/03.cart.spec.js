// 03. 장바구니 — 담기/배지/표시/삭제

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { ACCOUNTS } = require('../data/testData');

test.describe('03. 장바구니', () => {
  let inventory, cart;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(ACCOUNTS.standard.username, ACCOUNTS.standard.password);
    inventory = new InventoryPage(page);
    cart = new CartPage(page);
  });

  test('[TC-CART-001] 상품 담기 시 배지 수 1 노출', async () => {
    await inventory.addFirstProductToCart();

    await expect(await inventory.getCartBadgeCount()).toBe('1');
  });

  test('[TC-CART-002] 담은 상품이 장바구니에 노출', async () => {
    await inventory.addFirstProductToCart();
    await inventory.goToCart();

    await expect(await cart.isItemDisplayed()).toBe(true);
  });

  test('[TC-CART-003] 장바구니에서 상품을 삭제하면 상품 미노출', async () => {
    await inventory.addFirstProductToCart();
    await inventory.goToCart();
    await cart.removeFirstItem();

    await expect(await cart.getItemCount()).toBe(0);
  });
});
