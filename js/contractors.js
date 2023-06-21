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

// import {openModalBuy} from './modal-buy.js';
// import {openModalSell} from './modal-sell.js';
import {renderSellers} from './render-sellers.js';
import {renderBuyers} from './render-buyers.js';

// const usersTable = document.querySelector('.users-list__table');
const buySellTabsContainer = document.querySelector('.tabs--toggle-buy-sell');
const buySellTabsButtons = buySellTabsContainer.querySelectorAll('.tabs__control');
// const buySellTabsButton = buySellTabsContainer.querySelector('.tabs__control');
const tableBodyContainer = document.querySelector('.users-list__table-body');
const verifiedUsersToggle = document.querySelector('.users-nav__custom-toggle input');

let activeTableListId;
let activeVerifiedUsersToggle;

// const renderSellersTableRows = (array) => {
//   const tableBodyContainer = document.querySelector('.users-list__table-body');
//   const tableRowTemplate = document.querySelector('#user-table-row__template').content.querySelector('.users-list__table-row');
//   const contractorsFragment = document.createDocumentFragment();

//   array.forEach(({id, isVerified, userName, exchangeRate, minAmount, balance, paymentMethods}) => {
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

//     contractorExchangeRate.textContent = `${exchangeRate.toFixed(2)} ₽`;
//     // contractorExchangeRate.textContent = `${exchangeRate} ₽`;
//     console.log(exchangeRate);

//     console.log(`minAmount в Р: ${minAmount}`);
//     // console.log(`minAmount в KEKS: ${minAmount * exchangeRate}`);
//     console.log(`balance.amount в KEKS: ${balance.amount}`);
//     console.log(`balance.amount в Р: ${balance.amount * exchangeRate}`);
//     // contractorCashLimit.textContent = `${(minAmount * exchangeRate).toFixed(2)} KEKS - ${(balance.amount * exchangeRate).toFixed(2)} KEKS`;
//     // contractorCashLimit.textContent = `${minAmount} ₽ - ${(balance.amount * exchangeRate).toFixed(2)} ₽`;
//     contractorCashLimit.textContent = `${minAmount} ₽ - ${(balance.amount * exchangeRate).toFixed(2)} ₽`;

//     paymentMethods.forEach(({provider}) => {
//       const paymentItemTemplate = contractorPaymentItem.cloneNode(true);
//       paymentItemTemplate.textContent = provider;
//       console.log(provider);
//       paymentListFragment.appendChild(paymentItemTemplate);
//     });
//     contractorPaymentList.innerHTML = '';
//     contractorPaymentList.appendChild(paymentListFragment);
//     // }
//     contractor.dataset.contractorId = id;
//     console.log(`id: ${id}`);

//     contractorsFragment.appendChild(contractor);
//   });
//   tableBodyContainer.appendChild(contractorsFragment);
// };

// const renderSellers = (data) => {
//   renderSellersTableRows(data);
//   // const usersTable = document.querySelector('.users-list__table');
//   // const exchangeBuyButtons = usersTable.querySelectorAll('.btn--greenborder');
//   const sellersTable = document.querySelector('.users-list__table');
//   const exchangeBuyButtons = sellersTable.querySelectorAll('.btn--greenborder');

//   // отслеживание клика на кнопку "Обменять"
//   exchangeBuyButtons.forEach((button) => {
//     button.addEventListener('click', (evt) => {
//       const elementId = evt.target.closest('[data-contractor-id]');
//       evt.preventDefault();
//       const element = data.find((item) => item.id === elementId.dataset.contractorId);
//       // console.log(`element: ${element}, elementID: ${element.id}`);
//       openModalBuy(element);
//     });
//   });
// };

// const renderBuyersTableRows = (array) => {
//   const tableBodyContainer = document.querySelector('.users-list__table-body');
//   const tableRowTemplate = document.querySelector('#user-table-row__template').content.querySelector('.users-list__table-row');
//   const contractorsFragment = document.createDocumentFragment();

//   console.log('ПОКУПАТЕЛИ:');
//   array.forEach(({id, isVerified, userName, exchangeRate, minAmount, balance}) => {
//     const contractor = tableRowTemplate.cloneNode(true);
//     const contractorVerified = contractor.querySelector('.users-list__table-name svg');
//     const contractorName = contractor.querySelector('.users-list__table-name span');
//     const contractorExchangeRate = contractor.querySelector('.users-list__table-exchangerate');
//     const contractorCashLimit = contractor.querySelector('.users-list__table-cashlimit');
//     const contractorPaymentList = contractor.querySelector('.users-list__badges-list');

//     if (!isVerified) {
//       console.log(isVerified);
//       // contractorVerified.remove();
//       contractorVerified.style.display = 'none';
//     }
//     contractorName.textContent = userName;
//     console.log(userName);

//     contractorExchangeRate.textContent = `${exchangeRate.toFixed(2)} ₽`;
//     console.log(exchangeRate);

//     console.log(`minAmount в Р: ${minAmount}`);
//     console.log(`minAmount в KEKS: ${(minAmount / exchangeRate).toFixed(2)}`);
//     console.log(`balance.amount в Р: ${balance.amount}`);
//     console.log(`balance в KEKS: ${(balance.amount / exchangeRate).toFixed(2)}`);
//     contractorCashLimit.textContent = `${(minAmount / exchangeRate).toFixed(2)} KEKS - ${(balance.amount / exchangeRate).toFixed(2)} KEKS`;
//     contractorPaymentList.innerHTML = '';

//     contractor.dataset.buyerId = id;
//     console.log(`id: ${id}`);

//     contractorsFragment.appendChild(contractor);
//   });
//   tableBodyContainer.appendChild(contractorsFragment);
// };

// const renderBuyers = (data) => {
//   renderBuyersTableRows(data);
//   // const usersTable = document.querySelector('.users-list__table');
//   // const exchangeSellButtons = usersTable.querySelectorAll('.btn--greenborder');

//   // временно закомментированны строки из-за возможных конфликтов
//   // const buyersTable = document.querySelector('.users-list__table');
//   // const exchangeSellButtons = buyersTable.querySelectorAll('.btn--greenborder');

//   // отслеживание клика на кнопку "Обменять"
//   // exchangeSellButtons.forEach((button) => {
//   //   button.addEventListener('click', (evt) => {
//   //     const elementId = evt.target.closest('[data-contractor-id]');
//   //     evt.preventDefault();
//   //     const element = data.find((item) => item.id === elementId.dataset.contractorId);
//   //     console.log(`element: ${element}, elementID: ${element.id}`);
//   //     openModalSell(element);
//   //   });
//   // });
// };

const createLists = (data) => {
  const sellers = data.filter((seller) => seller.status === 'seller');
  // console.log(`sellers.length: ${sellers.length}, sellers: ${sellers}`);
  console.log(`sellers.length: ${sellers.length}`);

  const buyers = data.filter((buyer) => buyer.status === 'buyer');
  // console.log(`buyers.length: ${buyers.length}, buyers: ${buyers}`);

  // Отображение списка "Купить" (по умолчанию)
  renderSellers(sellers);
  activeTableListId = 'list-sellers';

  // // Переключение списка "Купить" / "Продать" - рабочий вариант (оригинал)!!!
  // buySellTabsContainer.onclick = (evt) => {
  //   const id = evt.target.dataset.id;

  //   if (id) {
  //     buySellTabsButtons.forEach((button) => {
  //       button.classList.remove('is-active');
  //     });
  //     evt.target.classList.add('is-active');
  //   }

  //   if (id === 'list-sellers') {
  //     tableBodyContainer.innerHTML = '';
  //     renderSellers(sellers);
  //     // if (activeVerifiedUsersToggle === 0) {
  //     //   renderSellers(sellers);
  //     // } else {
  //     //   onVerifiedUsersToggle();
  //     // }
  //     // activeTableListId = 'list-sellers';
  //     // console.log(`activeTableListId: ${activeTableListId}`);
  //     // console.log(`activeVerifiedUsersToggle: ${activeVerifiedUsersToggle}`);
  //   } else if (id === 'list-buyers') {
  //     tableBodyContainer.innerHTML = '';
  //     renderBuyers(buyers);
  //     // if (activeVerifiedUsersToggle === 0) {
  //     //   renderBuyers(buyers);
  //     // } else {
  //     //   onVerifiedUsersToggle();
  //     // }
  //     // activeTableListId = 'list-buyers';
  //     // console.log(`activeTableListId: ${activeTableListId}`);
  //     // console.log(`activeVerifiedUsersToggle: ${activeVerifiedUsersToggle}`);
  //   }
  // };

  // Переключение списка "Купить" / "Продать" - дополненный сырой вариант
  // buySellTabsContainer.onclick = (evt) => {
  //   const id = evt.target.dataset.id;

  //   if (id) {
  //     buySellTabsButtons.forEach((button) => {
  //       button.classList.remove('is-active');
  //     });
  //     evt.target.classList.add('is-active');
  //   }

  //   if (id === 'list-sellers') {
  //     tableBodyContainer.innerHTML = '';
  //     if (activeVerifiedUsersToggle === 0) {
  //       renderSellers(sellers);
  //     } else {
  //       onVerifiedUsersToggle();
  //     }
  //     activeTableListId = 'list-sellers';
  //     console.log(`activeTableListId: ${activeTableListId}`);
  //     console.log(`activeVerifiedUsersToggle: ${activeVerifiedUsersToggle}`);
  //   } else if (id === 'list-buyers') {
  //     tableBodyContainer.innerHTML = '';
  //     if (activeVerifiedUsersToggle === 0) {
  //       renderBuyers(buyers);
  //     } else {
  //       onVerifiedUsersToggle();
  //     }
  //     activeTableListId = 'list-buyers';
  //     console.log(`activeTableListId: ${activeTableListId}`);
  //     console.log(`activeVerifiedUsersToggle: ${activeVerifiedUsersToggle}`);
  //   }
  // };

  // Переключение списка "Купить" / "Продать" - вариант 2 оригинал
  buySellTabsContainer.onclick = (evt) => {
    const id = evt.target.dataset.id;

    if (id) {
      buySellTabsButtons.forEach((button) => {
        button.classList.remove('is-active');
      });
      evt.target.classList.add('is-active');
    }

    if (id === 'list-sellers') {
      tableBodyContainer.innerHTML = '';
      renderSellers(sellers);
      activeTableListId = 'list-sellers';
      if (activeVerifiedUsersToggle === 0) {
        renderSellers(sellers);
      } else {
        onVerifiedUsersToggle();
      }
      // activeTableListId = 'list-sellers';
      // console.log(`activeTableListId: ${activeTableListId}`);
      // console.log(`activeVerifiedUsersToggle: ${activeVerifiedUsersToggle}`);
    } else if (id === 'list-buyers') {
      tableBodyContainer.innerHTML = '';
      // renderBuyers(buyers);
      activeTableListId = 'list-buyers';
      if (activeVerifiedUsersToggle === 1) {
        onVerifiedUsersToggle();
      } else {
        renderBuyers(buyers);
      }
      // activeTableListId = 'list-buyers';
      // console.log(`activeTableListId: ${activeTableListId}`);
      // console.log(`activeVerifiedUsersToggle: ${activeVerifiedUsersToggle}`);
    }
  };

  let verifiedSellers;
  // const getverifiedSellers = () => verifiedSellers = sellers.filter((seller) => seller.isVerified === true);
  function getVerifiedSellers () {
    verifiedSellers = sellers.filter((seller) => seller.isVerified === true);
    // activeTableListId = 'list-sellers';
    return verifiedSellers;
  }

  let verifiedBuyers;
  function getVerifiedBuyers () {
    verifiedBuyers = buyers.filter((buyer) => buyer.isVerified === true);
    // activeTableListId = 'list-buyers';
    return verifiedBuyers;
  }

  // // console.log(`verifiedSellers.length: ${verifiedSellers.length}`);

  // // const verifiedBuyers = buyers.filter((buyer) => buyer.isVerified === true);
  // // console.log(`verifiedBuyers.length: ${verifiedBuyers.length}`);

  // const onVerifiedUsersToggle = () => {
  function onVerifiedUsersToggle () {
    // const verifiedSellers = sellers.filter((seller) => seller.isVerified === true);
    // // console.log(`verifiedSellers.length: ${verifiedSellers.length}`);

    // const verifiedBuyers = buyers.filter((buyer) => buyer.isVerified === true);
    // // console.log(`verifiedBuyers.length: ${verifiedBuyers.length}`);

    // рабочий вариант только с одной влкдакой?
    // if (verifiedUsersToggle.checked) {
    //   if (activeTableListId === 'list-buyers') {
    //     tableBodyContainer.innerHTML = '';
    //     renderBuyers(verifiedBuyers);
    //     console.log('print verified Buyers');
    //   } else if (!activeTableListId) {
    //     tableBodyContainer.innerHTML = '';
    //     renderSellers(verifiedSellers);
    //     console.log('print verified Sellers');
    //   }
    // else {
    //   tableBodyContainer.innerHTML = '';
    //   renderSellers(sellers);
    //   console.log('print all Sellers');
    // }
    // }

    // if (((verifiedUsersToggle.checked) && (activeTableListId)) || ((verifiedUsersToggle.checked) && (activeTableListId === 'list-sellers'))) {
    // // if (((verifiedUsersToggle.checked) && (activeTableListId === 'list-sellers'))) {
    //   tableBodyContainer.innerHTML = '';
    //   // renderSellers(verifiedSellers);
    //   renderSellers(getVerifiedSellers());
    //   activeVerifiedUsersToggle = 1;
    //   console.log('print verified Sellers');
    //   console.log(`verifiedSellers.length: ${verifiedSellers.length}`);
    // } else {
    //   tableBodyContainer.innerHTML = '';
    //   renderSellers(sellers);
    //   activeVerifiedUsersToggle = 0;
    //   console.log('print all Sellers');
    //   console.log(`Sellers.length: ${sellers.length}`);
    // }

    // if ((verifiedUsersToggle.checked) && (activeTableListId === 'list-buyers')) {
    //   tableBodyContainer.innerHTML = '';
    //   // renderBuyers(verifiedBuyers);
    //   renderBuyers(getVerifiedBuyers());
    //   activeVerifiedUsersToggle = 1;
    //   console.log('print verified Buyers');
    //   console.log(`verifiedBuyers.length: ${verifiedBuyers.length}`);
    // } else {
    //   tableBodyContainer.innerHTML = '';
    //   renderBuyers(buyers);
    //   activeVerifiedUsersToggle = 0;
    //   console.log('print all Buyers');
    //   console.log(`Buyers.length: ${buyers.length}`);
    // }

    // полурабочий вариант
    // if (((verifiedUsersToggle.checked) && (!activeTableListId)) || ((verifiedUsersToggle.checked) && (activeTableListId === 'list-sellers'))) {
    if (((verifiedUsersToggle.checked) && (activeTableListId === 'list-sellers'))) {
      tableBodyContainer.innerHTML = '';
      // renderSellers(verifiedSellers);
      renderSellers(getVerifiedSellers());
      activeVerifiedUsersToggle = 1;
      // console.log('print verified Sellers');
      // console.log(`verifiedSellers.length: ${verifiedSellers.length}`);
    // } else if ((activeTableListId === 'list-sellers') || (!activeTableListId)) {
    } else if ((verifiedUsersToggle.checked === false) && (activeTableListId === 'list-sellers')) {
      tableBodyContainer.innerHTML = '';
      renderSellers(sellers);
      activeVerifiedUsersToggle = 0;
      // console.log('print all Sellers');
      // console.log(`Sellers.length: ${sellers.length}`);
    }

    if ((verifiedUsersToggle.checked) && (activeTableListId === 'list-buyers')) {
      tableBodyContainer.innerHTML = '';
      // renderBuyers(verifiedBuyers);
      renderBuyers(getVerifiedBuyers());
      activeVerifiedUsersToggle = 1;
      // console.log('print verified Buyers');
      // console.log(`verifiedBuyers.length: ${verifiedBuyers.length}`);
    // } else if ((activeTableListId === 'list-buyers')) {
    // } else if ((verifiedUsersToggle.checked === 'false') && (activeTableListId === 'list-buyers')) {
    } else if ((verifiedUsersToggle.checked === false) && (activeTableListId === 'list-buyers')) {
      tableBodyContainer.innerHTML = '';
      renderBuyers(buyers);
      activeVerifiedUsersToggle = 0;
      // console.log('print all Buyers');
      // console.log(`Buyers.length: ${buyers.length}`);
    }
  }

  // Активация чекбокса "Только проверенные пользователи"
  verifiedUsersToggle.addEventListener('change', onVerifiedUsersToggle);
  // // if (justVerifiedUsersToggle.checked) {
  // //   tableBodyContainer.innerHTML = '';
  // //   const verifiedSellers = sellers.filter((seller) => seller.isVerified === true);
  // //   console.log(`verifiedSellers.length: ${verifiedSellers.length}`);
  // // }
  // // justVerifiedUsersToggle.checked = (evt) => {
  // //   tableBodyContainer.innerHTML = '';
  // //   const verifiedSellers = sellers.filter((seller) => seller.isVerified === true);
  // //   console.log(`verifiedSellers.length: ${verifiedSellers.length}`);
  // // };

  // // renderSellers(sellers);
  // // renderBuyers(buyers);

  // // Активация чекбокса "Только проверенные пользователи"
  // verifiedUsersToggle.addEventListener('change', onVerifiedUsersToggle);
};

export {createLists};

