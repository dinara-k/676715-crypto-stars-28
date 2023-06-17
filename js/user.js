// Пользователь
// {
//   "userName": "Андрей",
//   "balances": [
//     {
//       "currency": "RUB",
//       "amount": 929128
//     },
//     {
//       "currency": "KEKS",
//       "amount": 94.28
//     }
//   ],
//   "wallet": {
//     "currency": "KEKS",
//     "address": "o6j428495spjy20pwwer0elobwz8lvwksk2ffwxd"
//   },
//   "paymentMethods": [
//     {
//       "currency": "RUB",
//       "provider": "Sberbank",
//       "accountNumber": "0000 0000 0000 5691"
//     },
//     {
//       "currency": "RUB",
//       "provider": "QIWI",
//       "accountNumber": "0000 0000 0000 4880"
//     }
//   ]
//   }

const userProfile = document.querySelector('.user-profile');
const userCryptoBalance = document.querySelector('#user-crypto-balance');
const userFiatBalance = document.querySelector('#user-fiat-balance');
const userProfileName = document.querySelector('.user-profile__name span');

const showUserProfile = ({userName, balances}) => {
  balances.forEach(({currency, amount}) => {
    if (currency === 'KEKS') {
      userCryptoBalance.textContent = amount;
    } else {
      userFiatBalance.textContent = amount;
    }
  });

  userProfileName.textContent = userName;
};

const hideUserProfile = () => userProfile.remove();

export {showUserProfile, hideUserProfile};
