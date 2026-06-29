// 계정/배송 데이터
// SauceDemo는 공개 데모라 계정이 사이트 화면에 공개되어 있음

const ACCOUNTS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' }, // 잠긴 계정
};

const CHECKOUT = {
  valid: { firstName: 'Yuna', lastName: 'Kang', zip: '12345' },
};

module.exports = { ACCOUNTS, CHECKOUT };
