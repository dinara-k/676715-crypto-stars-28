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

// import {openModalBuy} from './modal-buy.js';
import {renderSellers} from './render-sellers.js';
import {renderBuyers} from './render-buyers.js';
import {resetMapSize, resetMarkers, renderMap, createMarkers} from './map.js';

const usersListContainer = document.querySelector('.users-list');
const buySellTabsContainer = document.querySelector('.tabs--toggle-buy-sell');
const buySellTabsButtons = buySellTabsContainer.querySelectorAll('.tabs__control');
// const buySellTabsButton = buySellTabsContainer.querySelector('.tabs__control');
const tableBodyContainer = document.querySelector('.users-list__table-body');
const verifiedUsersToggle = document.querySelector('.users-nav__custom-toggle input');
const listMapTabsContainer = document.querySelector('.tabs--toggle-list-map');
const listMapTabsButtons = listMapTabsContainer.querySelectorAll('.tabs__control');
const mapContainer = document.querySelector('#map-container');

let activeTableListId;
let activeVerifiedUsersToggle;
let activeMap;

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
  const buyers = data.filter((buyer) => buyer.status === 'buyer');
  // const withCashSellers = sellers.filter(({paymentMethods}) => paymentMethods.provider === 'Cash in person');
  let withCashSellers;
  let verifiedBuyers;
  let verifiedSellers;

  // Отображение списка "Купить" (по умолчанию)
  renderSellers(sellers);
  activeTableListId = 'list-sellers';

  // Переключение списка "Купить" / "Продать"
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
    } else if (id === 'list-buyers') {
      tableBodyContainer.innerHTML = '';
      activeTableListId = 'list-buyers';
      if (activeVerifiedUsersToggle === 1) {
        onVerifiedUsersToggle();
      } else {
        renderBuyers(buyers);
      }
    }
  };

  function getWithCashSellers () {
    let array;
    if (((verifiedUsersToggle.checked) && (activeTableListId === 'list-sellers'))) {
      array = getVerifiedSellers();
    } else if (verifiedUsersToggle.checked === false) {
      array = sellers;
    }
    withCashSellers = array.filter(({paymentMethods}) => {
      const element = paymentMethods.some(({provider}) => provider === 'Cash in person');
      if (element) {
        return true;
      } else {
        return false;
      }
    });
    // withCashSellers.forEach(({userName}) => {
    //   console.log(`data.Name: ${userName}`);
    // });
  }


  // let verifiedSellers;
  function getVerifiedSellers () {
    verifiedSellers = sellers.filter((seller) => seller.isVerified === true);
    return verifiedSellers;
  }

  // let verifiedBuyers;
  function getVerifiedBuyers () {
    verifiedBuyers = buyers.filter((buyer) => buyer.isVerified === true);
    return verifiedBuyers;
  }

  function onVerifiedUsersToggle () {
    if (((verifiedUsersToggle.checked) && (activeTableListId === 'list-sellers'))) {
      tableBodyContainer.innerHTML = '';
      if (activeMap === 1) {
        resetMarkers();
        getWithCashSellers();
        createMarkers(withCashSellers);
      } else {
        renderSellers(getVerifiedSellers());
      }
      activeVerifiedUsersToggle = 1;
    } else if ((verifiedUsersToggle.checked === false) && (activeTableListId === 'list-sellers')) {
      tableBodyContainer.innerHTML = '';
      if (activeMap === 1) {
        getWithCashSellers();
        createMarkers(withCashSellers);
        // getWithCashSellers();
      } else {
        renderSellers(sellers);
      }
      activeVerifiedUsersToggle = 0;
    }

    if ((verifiedUsersToggle.checked) && (activeTableListId === 'list-buyers')) {
      tableBodyContainer.innerHTML = '';
      renderBuyers(getVerifiedBuyers());
      activeVerifiedUsersToggle = 1;
    } else if ((verifiedUsersToggle.checked === false) && (activeTableListId === 'list-buyers')) {
      tableBodyContainer.innerHTML = '';
      renderBuyers(buyers);
      activeVerifiedUsersToggle = 0;
    }
  }

  // Активация чекбокса "Только проверенные пользователи"
  verifiedUsersToggle.addEventListener('change', onVerifiedUsersToggle);

  // Переключение списка / карты
  listMapTabsContainer.onclick = (evt) => {
    const id = evt.target.dataset.id;

    if (id) {
      listMapTabsButtons.forEach((button) => {
        button.classList.remove('is-active');
      });
      evt.target.classList.add('is-active');
    }

    if (id === 'list-view') {
      mapContainer.style.display = 'none';
      // usersListContainer.innerHTML = '';
      usersListContainer.style.display = 'block';
      tableBodyContainer.innerHTML = '';
      activeTableListId = 'list-sellers';
      if (activeVerifiedUsersToggle === 1) {
        renderSellers(getVerifiedSellers());
      } else {
        renderSellers(sellers);
      }
      // if (activeVerifiedUsersToggle === 0) {
      //   renderSellers(sellers);
      // } else {
      //   onVerifiedUsersToggle();
      // }
    } else if (id === 'map-view') {
      activeMap = 1;
      // usersListContainer.innerHTML = '';
      usersListContainer.style.display = 'none';
      mapContainer.style.display = 'block';
      // mapContainer.style.display = null;
      resetMapSize();
      renderMap();
      getWithCashSellers();
      // console.log(`withCashSellers.length: ${withCashSellers.length}`);
      createMarkers(withCashSellers);

      // createMarkers(data);
      // console.log('print map');
      // activeTableListId = 'list-buyers';
      // if (activeVerifiedUsersToggle === 1) {
      //   onVerifiedUsersToggle();
      // } else {
      //   renderBuyers(buyers);
      // }
    }
  };

  // // renderSellers(sellers);
  // // renderBuyers(buyers);
};

export {createLists};

