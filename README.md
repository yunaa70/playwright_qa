# SauceDemo 웹 E2E 자동화 · Playwright

Playwright로 짠 SauceDemo(https://www.saucedemo.com) 웹 E2E 테스트입니다.
모바일 자동화(Appium + WebdriverIO)와 같은 커머스 플로우를 웹에서도 검증하는 것을 목표로,
같은 POM 구조로 설계했습니다.

## 테스트 범위 (15 케이스)

| 영역 | 케이스 | 내용 |
|------|--------|------|
| 01. 로그인 | 5 | 정상 / 빈 값 / 잠긴 계정 / 틀린 비밀번호 |
| 02. 상품 목록 | 4 | 표시 / 개수 / 정렬 |
| 03. 장바구니 | 3 | 담기 / 배지 / 표시 / 삭제 |
| 04. 결제 | 3 | 미입력 차단 / 검토 이동 / 주문 완료 |

정상 흐름뿐 아니라 빈 값·잠긴 계정·미입력 같은 예외(negative) 케이스를 함께 넣었습니다.

## 구조

```
pages/        BasePage + 화면별 Page Object (Login/Inventory/Cart/Checkout)
tests/        시나리오 + 단언 (TC-ID 부여)
data/         테스트 데이터 (계정/배송)
playwright.config.js   baseURL, 리포트, 실패 시 스크린샷/영상
```

설계하면서 신경 쓴 것들:

- **POM · 레이어 분리** — tests는 "무엇을 검증하는가", pages는 "화면을 어떻게 조작하는가"로 분리.
- **data-test 셀렉터** — SauceDemo가 제공하는 `data-test` 속성을 사용. 클래스명/텍스트보다 잘 안 바뀝니다.
- **테스트 독립성** — 각 테스트가 beforeEach에서 로그인부터 새로 시작해, 순서에 의존하지 않습니다.
- **Playwright auto-wait** — 액션에 대기가 내장돼 flaky가 줄어듭니다. (Appium에서 명시적 대기를 직접 넣던 것과 같은 목적)
- **실패 진단** — 실패 시 스크린샷·영상·trace를 남깁니다.

## 실행

```bash
npm install
npx playwright install chromium

npm test            # 전체 실행
npm run test:headed # 브라우저 보면서 실행
npm run test:ui     # Playwright UI 모드 (디버깅)
npm run report      # HTML 리포트 열기
```

CI: `main`에 push하면 GitHub Actions가 전체 테스트를 자동 실행합니다.
