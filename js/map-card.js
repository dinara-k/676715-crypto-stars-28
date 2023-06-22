// import {openModalBuy} from './modal-buy.js';

const cardTemplate = document.querySelector('#map-baloon__template').content.querySelector('.user-card');
const contractor = cardTemplate.cloneNode(true);
const contractorVerified = contractor.querySelector('.user-card__user-name svg');
const contractorName = contractor.querySelector('.user-card__user-name span');
const contractorExchangeRate = contractor.querySelector('.user-card__cash-data');
const contractorCashLimit = contractor.querySelector('.user-card__cash-cashlimit');
const contractorPaymentList = contractor.querySelector('.user-card__badges-list');
const contractorPaymentItem = contractorPaymentList.querySelector('.user-card__badges-item');
// const exchangeBuyButton = contractor.querySelector('.btn--greenborder');
const paymentListFragment = document.createDocumentFragment();

const showCard = ({id, isVerified, userName, exchangeRate, minAmount, balance, paymentMethods}) => {
  // const contractor = cardTemplate.cloneNode(true);
  // const contractorVerified = contractor.querySelector('.user-card__user-name svg');
  // const contractorName = contractor.querySelector('.user-card__user-name span');
  // const contractorExchangeRate = contractor.querySelector('.user-card__cash-data');
  // const contractorCashLimit = contractor.querySelector('.user-card__cash-cashlimit');
  // const contractorPaymentList = contractor.querySelector('.user-card__badges-list');
  // const contractorPaymentItem = contractorPaymentList.querySelector('.user-card__badges-item');
  // const exchangeBuyButton = contractor.querySelector('.btn--greenborder');
  // const paymentListFragment = document.createDocumentFragment();

  if (!isVerified) {
    // console.log(isVerified);
    // contractorVerified.remove();
    contractorVerified.style.display = 'none';
  }
  contractorName.textContent = userName;
  // console.log(userName);

  contractorExchangeRate.textContent = `${exchangeRate.toFixed(2)} ₽`;
  // contractorExchangeRate.textContent = `${exchangeRate} ₽`;
  // console.log(exchangeRate);

  // console.log(`minAmount в Р: ${minAmount}`);
  // console.log(`minAmount в KEKS: ${minAmount * exchangeRate}`);
  // console.log(`balance.amount в KEKS: ${balance.amount}`);
  // console.log(`balance.amount в Р: ${balance.amount * exchangeRate}`);
  // contractorCashLimit.textContent = `${(minAmount * exchangeRate).toFixed(2)} KEKS - ${(balance.amount * exchangeRate).toFixed(2)} KEKS`;
  // contractorCashLimit.textContent = `${minAmount} ₽ - ${(balance.amount * exchangeRate).toFixed(2)} ₽`;
  contractorCashLimit.textContent = `${minAmount} ₽ - ${(balance.amount * exchangeRate).toFixed(2)} ₽`;

  paymentMethods.forEach(({provider}) => {
    const paymentItemTemplate = contractorPaymentItem.cloneNode(true);
    paymentItemTemplate.textContent = provider;
    // console.log(provider);
    paymentListFragment.appendChild(paymentItemTemplate);
  });
  contractor.dataset.contractorId = id;
  contractorPaymentList.innerHTML = '';
  contractorPaymentList.appendChild(paymentListFragment);
  // exchangeBuyButton.addEventListener('click', (evt) => {
  //   // const elementId = evt.target.closest('[data-contractor-id]');
  //   evt.preventDefault();
  //   // const element = data.find((item) => item.id === elementId.dataset.contractorId);
  //   // console.log(`element: ${element}, elementID: ${element.id}`);
  //   openModalBuy(contractor);
  // });
  return contractor;
};

// exchangeBuyButton.addEventListener('click', (evt) => {
//   // const elementId = evt.target.closest('[data-contractor-id]');
//   evt.preventDefault();
//   // const element = data.find((item) => item.id === elementId.dataset.contractorId);
//   // console.log(`element: ${element}, elementID: ${element.id}`);
//   openModalBuy(contractor);
// });

export {showCard};
