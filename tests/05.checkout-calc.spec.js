const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { ACCOUNTS, CHECKOUT } = require('../data/testData');

// 05. 합계·세금 계산 검증
// 결제 검토 화면에서 Item total + Tax = Total 이 맞는지 검증
test.describe('05. 결제 금액 계산 검증', () => {
  let inventory, cart, checkout;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(ACCOUNTS.standard.username, ACCOUNTS.standard.password);
    inventory = new InventoryPage(page);
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);

    // 상품 2개 담고 결제 화면 진입
    await inventory.addProductByIndex(0);
    await inventory.addProductByIndex(1);
    await inventory.goToCart();
    await cart.checkout();
    await checkout.enterInfo(CHECKOUT.valid.firstName, CHECKOUT.valid.lastName, CHECKOUT.valid.zip);
    await checkout.continue();
  });

  test('[TC-CALC-001] Item total + Tax = Total 이 일치', async () => {
    const itemTotal = await checkout.getItemTotal();
    const tax = await checkout.getTax();
    const total = await checkout.getTotal();

    // 부동소수점 오차를 고려해 소수 둘째자리에서 비교
    expect(Number((itemTotal + tax).toFixed(2))).toEqual(total);
  });

  test('[TC-CALC-002] Item total이 0보다 큼 (상품 금액 반영 확인)', async () => {
    const itemTotal = await checkout.getItemTotal();
    expect(itemTotal).toBeGreaterThan(0);
  });
});
