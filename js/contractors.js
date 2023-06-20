// --- Контрагенты
// [
// 	{
// 		"id": "0CsQ60w3M-RTyumLjjlfN",
// 		"balance": {
// 			"currency": "KEKS",
// 			"amount": 4.94
// 		},
// 		"exchangeRate": 2517204.54,
// 		"isVerified": false,
// 		"status": "seller",
// 		"userName": "Зинаида",
// 		"paymentMethods": [
// 			{
// 				"currency": "RUB",
// 				"provider": "Sberbank",
// 				"accountNumber": "0000 0000 0000 4991"
// 			},
// 			{
// 				"currency": "RUB",
// 				"provider": "Cash in person"
// 			}
// 		],
// 	"coords": {
// 		"lat": 59.65203,
// 		"lng": 30.24462
// 	},
// 	"minAmount": 7906
// 	},
// 	{
// 		"id": "1ctUkL5VGbv5x126ypZ0n",
// 		"balance": {
// 			"currency": "RUB",
// 			"amount": 120064,
// 		},
// 		"exchangeRate": 109485.34,
// 		"isVerified": false,
// 		"status": "buyer",
// 		"userName": "Пётр",
// 		"wallet": {
// 			"currency": "KEKS",
// 			"address": "je9dnx2c04l2tgmm1fsxphw2pikdcuksni663wn8"
// 		},
// 		"minAmount": 18290
// 	}
// ]

// --- рабочий вариант renderContractors - подходит только для sellers
//
// const renderContractors = (array) => {
//   const tableBodyContainer = document.querySelector('.users-list__table-body');
//   const tableRowTemplate = document.querySelector('#user-table-row__template').content.querySelector('.users-list__table-row');
//   const contractorsFragment = document.createDocumentFragment();

//   array.forEach(({isVerified, userName, exchangeRate, minAmount, balance, paymentMethods}) => {
//     const contractor = tableRowTemplate.cloneNode(true);
//     const contractorVerified = contractor.querySelector('.users-list__table-name svg');
//     const contractorName = contractor.querySelector('.users-list__table-name span');
//     const contractorExchangeRate = contractor.querySelector('.users-list__table-exchangerate');
//     const contractorCashLimit = contractor.querySelector('.users-list__table-cashlimit');
//     const contractorPaymentList = contractor.querySelector('.users-list__badges-list');
//     const contractorPaymentItem = contractorPaymentList.querySelector('.users-list__badges-item');
//     const paymentListFragment = document.createDocumentFragment();

//     if (!isVerified) {
//       console.log(isVerified);
//       contractorVerified.remove();
//     }
//     contractorName.textContent = userName;
//     console.log(userName);

//     contractorExchangeRate.textContent = exchangeRate.toFixed();
//     console.log(exchangeRate);

//     console.log(`minAmount в Р: ${minAmount}`);
//     console.log(`minAmount в KEKS: ${minAmount * exchangeRate}`);
//     console.log(`balance.amount в Р: ${balance.amount}`);
//     console.log(`balance в KEKS: ${balance.amount * exchangeRate}`);
//     contractorCashLimit.textContent = `${(minAmount * exchangeRate).toFixed()} ₽ - ${(balance.amount * exchangeRate).toFixed()} ₽`;

//     // --- ! добавить проверку для покупателей - у них нет paymentMethods
//     // if (paymentMethods === undefined) {
//     paymentMethods.forEach(({provider}) => {
//       const paymentItemTemplate = contractorPaymentItem.cloneNode(true);
//       paymentItemTemplate.textContent = provider;
//       console.log(provider);
//       paymentListFragment.appendChild(paymentItemTemplate);
//     });
//     contractorPaymentList.innerHTML = '';
//     contractorPaymentList.appendChild(paymentListFragment);
//     // }

//     contractorsFragment.appendChild(contractor);
//   });
//   tableBodyContainer.appendChild(contractorsFragment);
// };

import {openModalBuy} from './modal-buy.js';
// import {openModalSell} from './modal-sell.js';

// const usersTable = document.querySelector('.users-list__table');

const renderSellersTableRows = (array) => {
  const tableBodyContainer = document.querySelector('.users-list__table-body');
  const tableRowTemplate = document.querySelector('#user-table-row__template').content.querySelector('.users-list__table-row');
  const contractorsFragment = document.createDocumentFragment();

  array.forEach(({id, isVerified, userName, exchangeRate, minAmount, balance, paymentMethods}) => {
    const contractor = tableRowTemplate.cloneNode(true);
    const contractorVerified = contractor.querySelector('.users-list__table-name svg');
    const contractorName = contractor.querySelector('.users-list__table-name span');
    const contractorExchangeRate = contractor.querySelector('.users-list__table-exchangerate');
    const contractorCashLimit = contractor.querySelector('.users-list__table-cashlimit');
    const contractorPaymentList = contractor.querySelector('.users-list__badges-list');
    const contractorPaymentItem = contractorPaymentList.querySelector('.users-list__badges-item');
    const paymentListFragment = document.createDocumentFragment();

    if (!isVerified) {
      console.log(isVerified);
      contractorVerified.remove();
    }
    contractorName.textContent = userName;
    console.log(userName);

    contractorExchangeRate.textContent = `${exchangeRate.toFixed(2)} ₽`;
    // contractorExchangeRate.textContent = `${exchangeRate} ₽`;
    console.log(exchangeRate);

    console.log(`minAmount в Р: ${minAmount}`);
    // console.log(`minAmount в KEKS: ${minAmount * exchangeRate}`);
    console.log(`balance.amount в KEKS: ${balance.amount}`);
    console.log(`balance.amount в Р: ${balance.amount * exchangeRate}`);
    // contractorCashLimit.textContent = `${(minAmount * exchangeRate).toFixed(2)} KEKS - ${(balance.amount * exchangeRate).toFixed(2)} KEKS`;
    // contractorCashLimit.textContent = `${minAmount} ₽ - ${(balance.amount * exchangeRate).toFixed(2)} ₽`;
    contractorCashLimit.textContent = `${minAmount} ₽ - ${(balance.amount * exchangeRate).toFixed(2)} ₽`;

    paymentMethods.forEach(({provider}) => {
      const paymentItemTemplate = contractorPaymentItem.cloneNode(true);
      paymentItemTemplate.textContent = provider;
      console.log(provider);
      paymentListFragment.appendChild(paymentItemTemplate);
    });
    contractorPaymentList.innerHTML = '';
    contractorPaymentList.appendChild(paymentListFragment);
    // }
    contractor.dataset.contractorId = id;
    console.log(`id: ${id}`);

    contractorsFragment.appendChild(contractor);
  });
  tableBodyContainer.appendChild(contractorsFragment);
};

const renderSellers = (data) => {
  renderSellersTableRows(data);
  // const usersTable = document.querySelector('.users-list__table');
  // const exchangeBuyButtons = usersTable.querySelectorAll('.btn--greenborder');
  const sellersTable = document.querySelector('.users-list__table');
  const exchangeBuyButtons = sellersTable.querySelectorAll('.btn--greenborder');

  // отслеживание клика на кнопку "Обменять"
  exchangeBuyButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const elementId = evt.target.closest('[data-contractor-id]');
      evt.preventDefault();
      const element = data.find((item) => item.id === elementId.dataset.contractorId);
      // console.log(`element: ${element}, elementID: ${element.id}`);
      openModalBuy(element);
    });
  });
};
const renderBuyersTableRows = (array) => {
  const tableBodyContainer = document.querySelector('.users-list__table-body');
  const tableRowTemplate = document.querySelector('#user-table-row__template').content.querySelector('.users-list__table-row');
  const contractorsFragment = document.createDocumentFragment();

  console.log('ПОКУПАТЕЛИ:');
  array.forEach(({id, isVerified, userName, exchangeRate, minAmount, balance}) => {
    const contractor = tableRowTemplate.cloneNode(true);
    const contractorVerified = contractor.querySelector('.users-list__table-name svg');
    const contractorName = contractor.querySelector('.users-list__table-name span');
    const contractorExchangeRate = contractor.querySelector('.users-list__table-exchangerate');
    const contractorCashLimit = contractor.querySelector('.users-list__table-cashlimit');
    const contractorPaymentList = contractor.querySelector('.users-list__badges-list');

    if (!isVerified) {
      console.log(isVerified);
      // contractorVerified.remove();
      contractorVerified.style.display = 'none';
    }
    contractorName.textContent = userName;
    console.log(userName);

    contractorExchangeRate.textContent = `${exchangeRate.toFixed(2)} ₽`;
    console.log(exchangeRate);

    console.log(`minAmount в Р: ${minAmount}`);
    console.log(`minAmount в KEKS: ${(minAmount / exchangeRate).toFixed(2)}`);
    console.log(`balance.amount в Р: ${balance.amount}`);
    console.log(`balance в KEKS: ${(balance.amount / exchangeRate).toFixed(2)}`);
    contractorCashLimit.textContent = `${(minAmount / exchangeRate).toFixed(2)} KEKS - ${(balance.amount / exchangeRate).toFixed(2)} KEKS`;
    contractorPaymentList.innerHTML = '';

    contractor.dataset.buyerId = id;
    console.log(`id: ${id}`);

    contractorsFragment.appendChild(contractor);
  });
  tableBodyContainer.appendChild(contractorsFragment);
};

const renderBuyers = (data) => {
  renderBuyersTableRows(data);
  // const usersTable = document.querySelector('.users-list__table');
  // const exchangeSellButtons = usersTable.querySelectorAll('.btn--greenborder');

  // временно закомментированны строки из-за возможных конфликтов
  // const buyersTable = document.querySelector('.users-list__table');
  // const exchangeSellButtons = buyersTable.querySelectorAll('.btn--greenborder');

  // отслеживание клика на кнопку "Обменять"
  // exchangeSellButtons.forEach((button) => {
  //   button.addEventListener('click', (evt) => {
  //     const elementId = evt.target.closest('[data-contractor-id]');
  //     evt.preventDefault();
  //     const element = data.find((item) => item.id === elementId.dataset.contractorId);
  //     console.log(`element: ${element}, elementID: ${element.id}`);
  //     openModalSell(element);
  //   });
  // });
};

const createLists = (data) => {
  const sellers = data.filter((seller) => seller.status === 'seller');
  // console.log(`sellers.length: ${sellers.length}, sellers: ${sellers}`);

  const buyers = data.filter((buyer) => buyer.status === 'buyer');
  // console.log(`buyers.length: ${buyers.length}, buyers: ${buyers}`);

  renderSellers(sellers);
  renderBuyers(buyers);
};

export {createLists};

