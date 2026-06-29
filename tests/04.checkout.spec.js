// 04. 결제 — 배송정보 입력 + 주문 완료 
// 미입력 차단도 검증

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { ACCOUNTS, CHECKOUT } = require('../data/testData');

test.describe('04. 결제', () => {
  let inventory, cart, checkout;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(ACCOUNTS.standard.username, ACCOUNTS.standard.password);
    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);

    // 공통 : 상품 담고 장바구니 -> 결제 진입
    await inventory.addFirstProductToCart();
    await inventory.goToCart();
    await cart.checkout();
  });

  test('[TC-CHECK-001] 배송정보 미입력 시 다음으로 넘어가지 않음', async () => {
    await checkout.enterInfo('', '', '');
    await checkout.continue();

    await expect(await checkout.isErrorDisplayed()).toBe(true);
  });

  test('[TC-CHECK-002] 배송정보 입력 후 주문 검토 화면으로 이동', async () => {
    await checkout.enterInfo(CHECKOUT.valid.firstName, CHECKOUT.valid.lastName, CHECKOUT.valid.zip);
    await checkout.continue();

    await expect(await checkout.isOverviewDisplayed()).toBe(true);
  });

  test('[TC-CHECK-003] 전체 결제 플로우 완료', async () => {
    await checkout.enterInfo(CHECKOUT.valid.firstName, CHECKOUT.valid.lastName, CHECKOUT.valid.zip);
    await checkout.continue();
    await checkout.finish();

    await expect(await checkout.isOrderComplete()).toBe(true);
    const msg = await checkout.getCompleteText();
    await expect(msg).toContain('Thank you');
  });
});
