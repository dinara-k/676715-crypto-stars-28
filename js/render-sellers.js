import {openModalBuy} from './modal-buy.js';

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
    contractorPaymentList.innerHTML = '';
    contractorPaymentList.appendChild(paymentListFragment);
    // }
    contractor.dataset.contractorId = id;
    // console.log(`id: ${id}`);

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
      // clickButton (evt);
      const elementId = evt.target.closest('[data-contractor-id]');
      evt.preventDefault();
      const element = data.find((item) => item.id === elementId.dataset.contractorId);
      // console.log(`element: ${element}, elementID: ${element.id}`);
      openModalBuy(element);
    });
  });

  // function clickButton (evt) {
  //   const elementId = evt.target.closest('[data-contractor-id]');
  //   evt.preventDefault();
  //   const element = data.find((item) => item.id === elementId.dataset.contractorId);
  //   // console.log(`element: ${element}, elementID: ${element.id}`);
  //   openModalBuy(element);
  // };
};

export {renderSellers};
