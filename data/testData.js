// 계정/배송 데이터를 테스트에서 분리.
// SauceDemo는 공개 데모라 계정이 사이트 첫 화면에 공개돼 있다.

const ACCOUNTS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' }, // 잠긴 계정
};

const CHECKOUT = {
  valid: { firstName: 'Yuna', lastName: 'Kang', zip: '12345' },
};

module.exports = { ACCOUNTS, CHECKOUT };
