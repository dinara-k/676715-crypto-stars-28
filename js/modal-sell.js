import {isEscapeKey} from './util.js';
import {userData} from './main.js';
import {sendData} from './api.js';

// const PAYMENT_SELECT_ERROR_TEXT = 'Не выбрана плaтёжная система';

const body = document.querySelector('body');
const modalSellContainer = document.querySelector('.modal--sell');
const modalSellClose = modalSellContainer.querySelector('.modal__close-btn');
const modalSellForm = document.querySelector('.modal-sell');
const inputErrorText = modalSellForm.querySelector('.custom-input__error');
const formErrorBlock = modalSellForm.querySelector('.modal__validation-message--error');
const formSuccessBlock = modalSellForm.querySelector('.modal__validation-message--success');
const idField = modalSellForm.querySelector('[name="contractorId"]');
const rateField = modalSellForm.querySelector('[name="exchangeRate"]');
const sendingCurrencyField = modalSellForm.querySelector('[name="sendingCurrency"]');
const receivingCurrencyField = modalSellForm.querySelector('[name="receivingCurrency"]');
const contractorVerified = modalSellForm.querySelector('.transaction-info__item--name svg');
const contractorName = modalSellForm.querySelector('.transaction-info__item--name').querySelector('.transaction-info__data span');
const exchangeRateText = modalSellForm.querySelector('.transaction-info__item--exchangerate').querySelector('.transaction-info__data');
const contractorCashLimitText = modalSellForm.querySelector('.transaction-info__item--cashlimit').querySelector('.transaction-info__data');
const paymentField = modalSellForm.querySelector('[name="sendingAmount"]');
const receivingField = modalSellForm.querySelector('[name="receivingAmount"]');
const paymentExchangeAllButton = modalSellForm.querySelector('.custom-input__payment').querySelector('.custom-input__btn');
const receivingExchangeAllButton = modalSellForm.querySelector('.custom-input__receiving').querySelector('.custom-input__btn');
const paymentSelect = modalSellForm.querySelector('[name="paymentMethod"]');
const paymentSelectItems = modalSellForm.querySelectorAll('[name="paymentMethod"] option');
const paymentListFragment = document.createDocumentFragment();
const numberCardField = modalSellForm.querySelector('.custom-input__number-card [type="number"]');
const userWalletField = modalSellForm.querySelector('.custom-input__address-wallet [type="number"]');
const passwordField = modalSellForm.querySelector('.custom-input__password [type="password"]');
const modalSellSubmitButton = modalSellForm.querySelectorAll('.modal__submit');

const firstItemPaymentSelect = paymentSelect[0];

const SubmitButtonText = {
  IDLE: 'Обменять',
  SENDING: 'Обмениваю...'
};

let paymentMinAmount;
let paymentMaxAmount;
let receivingMinAmount;
let receivingMaxAmount;

// Модалка "Продажа" - установка данных покупателя
const setContractorData = ({id, isVerified, userName, exchangeRate, minAmount, balance, paymentMethods}) => {
  idField.value = id;
  rateField.value = exchangeRate;
  sendingCurrencyField.value = 'RUB';
  receivingCurrencyField.value = 'KEKS';
  if (!isVerified) {
    contractorVerified.style.display = 'none';
  }
  contractorName.textContent = userName;
  exchangeRateText.textContent = `${exchangeRate} ₽`;
  // exchangeRateText.textContent = `${12345678901234} ₽`;
  // exchangeRateText.innerHTML = `${exchangeRate}` + {' '} + `₽`;
  // exchangeRateText.innerHTML = exchangeRate + {' '} + '₽';
  contractorCashLimitText.textContent = `${minAmount} ₽ - ${(balance.amount * exchangeRate).toFixed(2)} ₽`;

  paymentMethods.forEach((method) => {
    const paymentItemTemplate = paymentSelectItems[1].cloneNode(true);
    paymentItemTemplate.textContent = method.provider;
    paymentItemTemplate.value = method.provider;
    paymentListFragment.appendChild(paymentItemTemplate);
  });

  paymentSelect.innerHTML = '';
  firstItemPaymentSelect.value = '';
  paymentSelect.appendChild(firstItemPaymentSelect);
  paymentSelect.appendChild(paymentListFragment);
};

// Модалка "Продажа" - установка данных пользователя
const setUserData = ({wallet, paymentMethods}) => {
  let numberCard;
  paymentMethods.forEach(({accountNumber}) => {
    numberCard = accountNumber;
  });
  if (!numberCard) {
    numberCard = '';
  }
  numberCardField.placeholder = numberCard;

  // Функция выбора пунктов select-а "Плaтёжная система" и подстановки данных в поле "Номер банковской карты пользователя"
  paymentSelect.onchange = function () {
    if (paymentSelect.value === 'Cash in person') {
      // console.log('Cash in person active');
      numberCardField.placeholder = '';
    } else {
      numberCardField.placeholder = numberCard;
    }
  };

  userWalletField.placeholder = wallet.address;
};

// Pristine - подключение
const pristine = new Pristine(modalSellForm, {
  classTo: 'custom-input',
  errorTextParent: 'custom-input',
  errorTextTag: 'div',
  errorTextClass: 'custom-input__error'
});

// Pristine - функция валидации селекта "Плaтёжная система"
// const validatepaymentSelect = () => {
//   // let selectedOption = paymentSelect.options[paymentSelect.selectedIndex].value;
//   const selectedOption = paymentSelect.options[paymentSelect.selectedIndex].value;
//   console.log(`selectedOption: ${selectedOption}`);
//   if (selectedOption === '') {
//   // if (selectedOption.value === '0') {
//     return false;
//   }
// };

// // ошибка заполнения данных
// pristine.addValidator(paymentSelect, validatepaymentSelect, showErrorMessage);

// -------- // Модалка "Продажа" - функция обмена из рублей в Кексы и подстановка значений c toFixed(2) у всех значений ------
const checkExchangeRubInKeks = (sellerData, buyerData) => {
  const {exchangeRate, minAmount, balance} = sellerData;
  const {balances} = buyerData;
  const exchangeRateNumber = parseFloat(exchangeRate);
  // console.log(`exchangeRateNumber type: ${typeof(exchangeRateNumber)}`);

  const minAmountNumber = parseFloat(minAmount);
  // console.log(`minAmountNumber type: ${typeof(minAmountNumber)}`);

  const balanceAmountNumber = parseFloat(balance.amount);
  // console.log(`balanceAmountNumber type: ${typeof(balanceAmountNumber)}`);

  // const paymentFieldNumber = parseFloat(paymentField.value);
  // const receivingFieldNumber = parseFloat(receivingField.value);

  paymentMinAmount = minAmountNumber;
  // console.log(`paymentMinAmount type: ${typeof(paymentMinAmount)}`);

  paymentMaxAmount = parseFloat((balanceAmountNumber * exchangeRateNumber).toFixed(2));
  // console.log(`balanceAmountNumber type: ${typeof(balanceAmountNumber)}, exchangeRateNumber type: ${typeof(exchangeRateNumber)}, paymentMaxAmount type: ${typeof(paymentMaxAmount)}, paymentMaxAmount value: ${paymentMaxAmount}`);
  // console.log(`paymentMaxAmount / 100: ${paymentMaxAmount / 100}`);

  receivingMinAmount = parseFloat((paymentMinAmount / exchangeRateNumber).toFixed(2));
  // console.log(`paymentMinAmount type: ${typeof(paymentMinAmount)}, exchangeRateNumber type: ${typeof(exchangeRateNumber)}, receivingMinAmount type: ${typeof(receivingMinAmount)}`);

  receivingMaxAmount = balanceAmountNumber;
  // console.log(`receivingMaxAmount type: ${typeof(receivingMaxAmount)}`);

  let buyerRubBalance;
  let sellerKeksBalance;

  // paymentField.min = paymentMinAmount;
  // paymentField.max = paymentMaxAmount;

  // Обмен из рублей в Кексы
  function exchangeRubInKeks () {
    receivingField.value = parseFloat((parseFloat(paymentField.value) / exchangeRateNumber).toFixed(2));
    // receivingField.value = (paymentField.value / sellerData.exchangeRate).toFixed(2);
  }

  // Обмен из Кексов в рубли
  function exchangeKeksInRub () {
    paymentField.value = parseFloat((parseFloat(receivingField.value) * exchangeRateNumber).toFixed(2));
    // paymentField.value = (receivingField.value * sellerData.exchangeRate).toFixed(2);
  }

  // рабочий вариант - paymentExchangeAllButton.addEventListener в paymentField.oninput
  // Модалка "Продажа" - проверка инпута "Оплата"
  // paymentField.oninput = function () {
  //   // console.log('ввели данные в поле Оплата - oninput');
  //   exchangeRubInKeks();
  //   paymentExchangeAllButton.style.display = 'block';

  //   paymentExchangeAllButton.addEventListener('click', () => {
  //     debugger;
  //     balances.forEach(({currency, amount}) => {
  //       if (currency === 'RUB') {
  //         buyerRubBalance = amount;
  //       }
  //     });
  //     paymentField.value = buyerRubBalance.toFixed(2);
  //     exchangeRubInKeks();
  //   });
  // };

  paymentField.oninput = function () {
    // paymentField.addEventListener('input', () => {
    // console.log('ввели данные в поле Оплата - oninput');
    paymentExchangeAllButton.style.display = 'block';

    paymentExchangeAllButton.addEventListener('click', () => {
      // debugger;
      balances.forEach(({currency, amount}) => {
        if (currency === 'RUB') {
          buyerRubBalance = amount;
          // buyerRubBalance = parseFloat(amount.toFixed(2));
        }
      });
      // paymentFieldNumber = parseFloat((buyerRubBalance).toFixed(2));
      // paymentField.value = buyerRubBalance;
      paymentField.value = parseFloat((buyerRubBalance).toFixed(2));
      // console.log(`значение paymentFieldNumber type после нажатия на "Обменять все": ${typeof(paymentFieldNumber)}`);
      // exchangeRubInKeks();
    });
    // if ((paymentMinAmount <= paymentFieldNumber) && (paymentFieldNumber <= paymentMaxAmount)) {
    //   exchangeRubInKeks();
    // }
    exchangeRubInKeks();
  };
  // });

  // -- Pristine - функция валидации инпута "Оплата" вне paymentField.oninput
  // Pristine - функция валидации инпута "Оплата"
  const validatePaymentField = () => ((paymentMinAmount <= parseFloat(paymentField.value)) && (parseFloat(paymentField.value) <= paymentMaxAmount));
  // {
  // debugger;
  // console.log((paymentMinAmount <= paymentField.value) && (paymentField.value <= paymentMaxAmount));
  // console.log(`(paymentMinAmount <= paymentField.value) && (paymentField.value <= paymentMaxAmount): ${(paymentMinAmount <= paymentField.value) && (paymentField.value <= paymentMaxAmount)}`);
  // console.log(`paymentField.value type: ${typeof(paymentField.value)}`);
  // return ((paymentMinAmount <= paymentFieldNumber) && (paymentFieldNumber <= paymentMaxAmount));
  // console.log(`(paymentMinAmount <= paymentField.value) || (paymentField.value <= paymentMaxAmount): ${(paymentMinAmount <= paymentField.value) && (paymentField.value <= paymentMaxAmount)}`);
  // if (paymentMinAmount <= paymentField.value) {
  //   console.log(`paymentMinAmount: ${paymentMinAmount}, paymentField.value: ${paymentField.value}, paymentMinAmount <= paymentField.value: ${paymentMinAmount <= paymentField.value}`);
  //   return true;
  // } else if (paymentField.value <= paymentMaxAmount) {
  //   console.log(`paymentMaxAmount: ${paymentMaxAmount}, paymentField.value: ${paymentField.value}, paymentField.value <= paymentMaxAmount: ${paymentField.value <= paymentMaxAmount}`);
  //   return true;
  // } else {
  //   return false;

  // Pristine - отображение сообщения об ошибке
  const getValidatePaymentMessage = () => {
    if (parseFloat(paymentField.value) < paymentMinAmount) {
      // console.log(`paymentField.value: ${paymentFieldNumber}, paymentMinAmount: ${paymentMinAmount}, paymentField.value < paymentMinAmount: ${paymentFieldNumber < paymentMinAmount}`);
      return `Минимальная сумма - ${paymentMinAmount} ₽`;
    } else if (parseFloat(paymentField.value) > paymentMaxAmount) {
      // console.log(`paymentField.value: ${paymentFieldNumber}, paymentMaxAmount: ${paymentMaxAmount}, paymentField.value > paymentMaxAmount: ${paymentFieldNumber > paymentMaxAmount}`);
      return `Максимальная сумма - ${paymentMaxAmount} ₽`;
    }
  };

  pristine.addValidator(paymentField, validatePaymentField, getValidatePaymentMessage);

  // Модалка "Продажа" - проверка инпута "Зачисление"
  receivingField.oninput = function () {
    // console.log('ввели данные в поле Зачисление - oninput');
    // exchangeKeksInRub();
    receivingExchangeAllButton.style.display = 'block';

    receivingExchangeAllButton.addEventListener('click', () => {
      if (balance.currency === 'KEKS') {
        // sellerKeksBalance = balance.amount;
        // sellerKeksBalance = balanceAmountNumber;
        sellerKeksBalance = parseFloat(balanceAmountNumber.toFixed(2));
      }
      receivingField.value = sellerKeksBalance;
      // exchangeKeksInRub();
    });
    // if ((receivingMinAmount <= paymentFieldNumber) && (paymentFieldNumber <= receivingMaxAmount)) {
    //   exchangeKeksInRub();
    // }
    exchangeKeksInRub();
    // }
  };

  // Pristine - функция валидации инпута "Зачисление"
  const validateReceivingField = () => ((receivingMinAmount <= parseFloat(receivingField.value)) && (parseFloat(receivingField.value) <= receivingMaxAmount));
  // {
  // console.log((receivingMinAmount <= receivingFieldNumber) && (receivingFieldNumber <= receivingMaxAmount));
  // return ((receivingMinAmount <= receivingFieldNumber) && (receivingFieldNumber <= receivingMaxAmount));
  // };

  // Pristine - отображение сообщения об ошибке в поле "Зачисление"
  const getValidateReceivingMessage = () => {
    if (parseFloat(receivingField.value) < receivingMinAmount) {
      return `Минимальная сумма - ${receivingMinAmount} KEKS`;
    } else if (parseFloat(receivingField.value) > receivingMaxAmount) {
      return `Максимальная сумма - ${receivingMaxAmount} KEKS`;
    }
  };

  pristine.addValidator(receivingField, validateReceivingField, getValidateReceivingMessage);
};

// Модалка "Продажа" - заполнение всех данных
const setDataModalSell = (contractorData) => {
  // exchangeAllButtons.forEach((button) => {
  //   button.style.display = 'none';
  // });
  // debugger;
  // paymentExchangeAllButton.style.display = 'none';
  // receivingExchangeAllButton.style.display = 'none';
  // inputErrorText.style.display = 'none';
  // formErrorBlock.style.display = 'none';
  // formSuccessBlock.style.display = 'none';
  // passwordField.value = '';

  setContractorData(contractorData);
  setUserData(userData);
  checkExchangeRubInKeks(contractorData, userData);
};

// Модалка "Продажа" - открытие модалки
const openModalSell = (element) => {
  // debugger;
  body.classList.add('scroll-lock');
  modalSellContainer.style.display = 'block';
  paymentExchangeAllButton.style.display = 'none';
  receivingExchangeAllButton.style.display = 'none';
  inputErrorText.style.display = 'none';
  // formErrorBlock.style.display = 'none';
  // formSuccessBlock.style.display = 'none';
  hideErrorMessage();
  hideSuccessMessage();
  passwordField.value = '';

  setDataModalSell(element);

  document.addEventListener('keydown', onDocumentKeydown);
  // !!! включить после окончания проверки
  modalSellContainer.addEventListener('click', onClickOutside);
};

// modalSellForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const isValid = pristine.validate();
//   if (isValid) {
//     console.log('Можно отправлять');
//   } else {
//     console.log('Форма невалидна');
//   }
// });

// Кнопка отправки формы
const blockSubmitButton = () => {
  modalSellSubmitButton.disabled = true;
  modalSellSubmitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  modalSellSubmitButton.disabled = false;
  modalSellSubmitButton.textContent = SubmitButtonText.IDLE;
};

// Отправка формы
const setOnFormSubmit = (onSuccess) => {
  modalSellForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await onSuccess(new FormData(modalSellForm));
      unblockSubmitButton();
      showSuccessMessage();
    } else {
      showErrorMessage();
    }
  });
};

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    resetForm();
    if (formErrorBlock.style.display === 'flex') {
      hideErrorMessage();
    }
    showSuccessMessage();
  } catch (err) {
    showErrorMessage();
  }
});

const closeModalBuy = () => {
  resetForm();
  body.classList.remove('scroll-lock');
  modalSellContainer.style.display = 'none';
  contractorVerified.style.display = 'block';
  document.removeEventListener('keydown', onDocumentKeydown);
  modalSellContainer.removeEventListener('click', onClickOutside);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    closeModalBuy();
  }
}

function onClickOutside (evt) {
  const isEvent = evt.target.closest('.modal__content');
  if (!isEvent) {
    closeModalBuy();
    document.removeEventListener('keydown', onDocumentKeydown);
    modalSellContainer.removeEventListener('click', onClickOutside);
  }
}

function showSuccessMessage() {
  formSuccessBlock.style.display = 'flex';
}

function hideSuccessMessage() {
  formSuccessBlock.style.display = 'none';
}

function showErrorMessage() {
  formErrorBlock.style.display = 'flex';
}

function hideErrorMessage() {
  formErrorBlock.style.display = 'none';
}

function resetForm () {
  modalSellForm.reset();
  paymentField.value = '';
  receivingField.value = '';
  pristine.reset();
}

modalSellClose.addEventListener('click', () => {
  closeModalBuy();
});

export {openModalSell};

// // Модалка "Продажа" - функция обмена из рублей в Кексы и подстановка значений без toFixed почти у всех значений и с округлением exchangeRate
// const checkExchangeRubInKeks = (sellerData, buyerData) => {
//   const {exchangeRate, minAmount, balance} = sellerData;
//   const {balances} = buyerData;
//   const exchangeRateNumber = parseFloat(exchangeRate.toFixed());
//   // console.log(`exchangeRateNumber type: ${typeof(exchangeRateNumber)}`);

//   const minAmountNumber = parseFloat(minAmount);
//   // console.log(`minAmountNumber type: ${typeof(minAmountNumber)}`);

//   const balanceAmountNumber = parseFloat(balance.amount);
//   // console.log(`balanceAmountNumber type: ${typeof(balanceAmountNumber)}`);

//   // const paymentFieldNumber = parseFloat(paymentField.value);
//   // const receivingFieldNumber = parseFloat(receivingField.value);

//   paymentMinAmount = minAmountNumber;
//   // console.log(`paymentMinAmount type: ${typeof(paymentMinAmount)}`);

//   paymentMaxAmount = parseFloat((balanceAmountNumber * exchangeRateNumber).toFixed());
//   // paymentMaxAmount = parseFloat((balanceAmountNumber * exchangeRateNumber).toFixed(2));
//   // console.log(`balanceAmountNumber type: ${typeof(balanceAmountNumber)}, exchangeRateNumber type: ${typeof(exchangeRateNumber)}, paymentMaxAmount type: ${typeof(paymentMaxAmount)}, paymentMaxAmount value: ${paymentMaxAmount}`);
//   // console.log(`paymentMaxAmount / 100: ${paymentMaxAmount / 100}`);

//   receivingMinAmount = parseFloat((paymentMinAmount / exchangeRateNumber).toFixed());
//   // receivingMinAmount = parseFloat((paymentMinAmount / exchangeRateNumber).toFixed(2));
//   // console.log(`paymentMinAmount type: ${typeof(paymentMinAmount)}, exchangeRateNumber type: ${typeof(exchangeRateNumber)}, receivingMinAmount type: ${typeof(receivingMinAmount)}`);

//   receivingMaxAmount = balanceAmountNumber;
//   // console.log(`receivingMaxAmount type: ${typeof(receivingMaxAmount)}`);

//   let buyerRubBalance;
//   let sellerKeksBalance;

//   // paymentField.min = paymentMinAmount;
//   // paymentField.max = paymentMaxAmount;

//   // Обмен из рублей в Кексы
//   function exchangeRubInKeks () {
//     receivingField.value = parseFloat((parseFloat(paymentField.value) / exchangeRateNumber).toFixed());
//     // receivingField.value = parseFloat((parseFloat(paymentField.value) / exchangeRateNumber).toFixed(2));
//     // receivingField.value = (paymentField.value / sellerData.exchangeRate).toFixed(2);
//   }

//   // Обмен из Кексов в рубли
//   function exchangeKeksInRub () {
//     paymentField.value = parseFloat((parseFloat(receivingField.value) * exchangeRateNumber).toFixed());
//     // paymentField.value = parseFloat((parseFloat(receivingField.value) * exchangeRateNumber).toFixed(2));
//     // paymentField.value = (receivingField.value * sellerData.exchangeRate).toFixed(2);
//   }

//   // рабочий вариант - paymentExchangeAllButton.addEventListener в paymentField.oninput
//   // Модалка "Продажа" - проверка инпута "Оплата"
//   // paymentField.oninput = function () {
//   //   // console.log('ввели данные в поле Оплата - oninput');
//   //   exchangeRubInKeks();
//   //   paymentExchangeAllButton.style.display = 'block';

//   //   paymentExchangeAllButton.addEventListener('click', () => {
//   //     debugger;
//   //     balances.forEach(({currency, amount}) => {
//   //       if (currency === 'RUB') {
//   //         buyerRubBalance = amount;
//   //       }
//   //     });
//   //     paymentField.value = buyerRubBalance.toFixed(2);
//   //     exchangeRubInKeks();
//   //   });
//   // };

//   paymentField.oninput = function () {
//     // paymentField.addEventListener('input', () => {
//     // console.log('ввели данные в поле Оплата - oninput');
//     paymentExchangeAllButton.style.display = 'block';

//     paymentExchangeAllButton.addEventListener('click', () => {
//       // debugger;
//       balances.forEach(({currency, amount}) => {
//         if (currency === 'RUB') {
//           buyerRubBalance = amount;
//           // buyerRubBalance = parseFloat(amount.toFixed(2));
//         }
//       });
//       // paymentFieldNumber = parseFloat((buyerRubBalance).toFixed(2));
//       // paymentField.value = buyerRubBalance;
//       paymentField.value = parseFloat((buyerRubBalance).toFixed());
//       // paymentField.value = parseFloat((buyerRubBalance).toFixed(2));
//       // console.log(`значение paymentFieldNumber type после нажатия на "Обменять все": ${typeof(paymentFieldNumber)}`);
//       // exchangeRubInKeks();
//     });
//     // if ((paymentMinAmount <= paymentFieldNumber) && (paymentFieldNumber <= paymentMaxAmount)) {
//     //   exchangeRubInKeks();
//     // }
//     exchangeRubInKeks();
//   };
//   // });

//   // -- Pristine - функция валидации инпута "Оплата" вне paymentField.oninput
//   // Pristine - функция валидации инпута "Оплата"
//   const validatePaymentField = () => ((paymentMinAmount <= parseFloat(paymentField.value)) && (parseFloat(paymentField.value) <= paymentMaxAmount));
//   // {
//   // debugger;
//   // console.log((paymentMinAmount <= paymentField.value) && (paymentField.value <= paymentMaxAmount));
//   // console.log(`(paymentMinAmount <= paymentField.value) && (paymentField.value <= paymentMaxAmount): ${(paymentMinAmount <= paymentField.value) && (paymentField.value <= paymentMaxAmount)}`);
//   // console.log(`paymentField.value type: ${typeof(paymentField.value)}`);
//   // return ((paymentMinAmount <= paymentFieldNumber) && (paymentFieldNumber <= paymentMaxAmount));
//   // console.log(`(paymentMinAmount <= paymentField.value) || (paymentField.value <= paymentMaxAmount): ${(paymentMinAmount <= paymentField.value) && (paymentField.value <= paymentMaxAmount)}`);
//   // if (paymentMinAmount <= paymentField.value) {
//   //   console.log(`paymentMinAmount: ${paymentMinAmount}, paymentField.value: ${paymentField.value}, paymentMinAmount <= paymentField.value: ${paymentMinAmount <= paymentField.value}`);
//   //   return true;
//   // } else if (paymentField.value <= paymentMaxAmount) {
//   //   console.log(`paymentMaxAmount: ${paymentMaxAmount}, paymentField.value: ${paymentField.value}, paymentField.value <= paymentMaxAmount: ${paymentField.value <= paymentMaxAmount}`);
//   //   return true;
//   // } else {
//   //   return false;

//   // Pristine - отображение сообщения об ошибке
//   const getValidatePaymentMessage = () => {
//     if (parseFloat(paymentField.value) < paymentMinAmount) {
//       // console.log(`paymentField.value: ${paymentFieldNumber}, paymentMinAmount: ${paymentMinAmount}, paymentField.value < paymentMinAmount: ${paymentFieldNumber < paymentMinAmount}`);
//       return `Минимальная сумма - ${paymentMinAmount} ₽`;
//     } else if (parseFloat(paymentField.value) > paymentMaxAmount) {
//       // console.log(`paymentField.value: ${paymentFieldNumber}, paymentMaxAmount: ${paymentMaxAmount}, paymentField.value > paymentMaxAmount: ${paymentFieldNumber > paymentMaxAmount}`);
//       return `Максимальная сумма - ${paymentMaxAmount} ₽`;
//     }
//   };

//   pristine.addValidator(paymentField, validatePaymentField, getValidatePaymentMessage);

//   // Модалка "Продажа" - проверка инпута "Зачисление"
//   receivingField.oninput = function () {
//     // console.log('ввели данные в поле Зачисление - oninput');
//     // exchangeKeksInRub();
//     receivingExchangeAllButton.style.display = 'block';

//     receivingExchangeAllButton.addEventListener('click', () => {
//       if (balance.currency === 'KEKS') {
//         // sellerKeksBalance = balance.amount;
//         // sellerKeksBalance = balanceAmountNumber;
//         // sellerKeksBalance = parseFloat(balanceAmountNumber.toFixed(2));
//         sellerKeksBalance = balanceAmountNumber;
//       }
//       receivingField.value = sellerKeksBalance;
//       // exchangeKeksInRub();
//     });
//     // if ((receivingMinAmount <= paymentFieldNumber) && (paymentFieldNumber <= receivingMaxAmount)) {
//     //   exchangeKeksInRub();
//     // }
//     exchangeKeksInRub();
//     // }
//   };

//   // Pristine - функция валидации инпута "Зачисление"
//   const validateReceivingField = () => ((receivingMinAmount <= parseFloat(receivingField.value)) && (parseFloat(receivingField.value) <= receivingMaxAmount));
//   // {
//   // console.log((receivingMinAmount <= receivingFieldNumber) && (receivingFieldNumber <= receivingMaxAmount));
//   // return ((receivingMinAmount <= receivingFieldNumber) && (receivingFieldNumber <= receivingMaxAmount));
//   // };

//   // Pristine - отображение сообщения об ошибке в поле "Зачисление"
//   const getValidateReceivingMessage = () => {
//     if (parseFloat(receivingField.value) < receivingMinAmount) {
//       return `Минимальная сумма - ${receivingMinAmount} KEKS`;
//     } else if (parseFloat(receivingField.value) > receivingMaxAmount) {
//       return `Максимальная сумма - ${receivingMaxAmount} KEKS`;
//     }
//   };

//   pristine.addValidator(receivingField, validateReceivingField, getValidateReceivingMessage);
// };
