// import {openModalSell} from './modal-sell.js';

const renderBuyersTableRows = (array) => {
  const tableBodyContainer = document.querySelector('.users-list__table-body');
  const tableRowTemplate = document.querySelector('#user-table-row__template').content.querySelector('.users-list__table-row');
  const contractorsFragment = document.createDocumentFragment();

  console.log('ПОКУПАТЕЛИ:');
  array.forEach(({id, isVerified, userName, exchangeRate, minAmount, balance}) => {
    const contractor = tableRowTemplate.cloneNode(true);
    const contractorVerified = contractor.querySelector('.users-list__table-name svg');
    const contractorName = contractor.querySelector('.users-list__table-name span');
    // const exchangeRateName = contractor.querySelector('.users-list__table-currency');
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

    // exchangeRateName.textContent = 'RUB';
    contractorExchangeRate.textContent = `${exchangeRate.toFixed(2)} ₽`;
    // contractorExchangeRate.textContent = `${parseFloat((1 / parseFloat(exchangeRate)).toFixed(2))} ₽`;
    console.log(exchangeRate);

    console.log(`minAmount в Р: ${minAmount}`);
    console.log(`minAmount в KEKS: ${(minAmount / exchangeRate).toFixed(2)}`);
    console.log(`balance.amount в Р: ${balance.amount}`);
    console.log(`balance в KEKS: ${(balance.amount / exchangeRate).toFixed(2)}`);
    contractorCashLimit.textContent = `${(minAmount / exchangeRate).toFixed(2)} KEKS - ${(balance.amount / exchangeRate).toFixed(2)} KEKS`;
    contractorPaymentList.innerHTML = '';

    contractor.dataset.contractorId = id;
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
  const buyersTable = document.querySelector('.users-list__table');
  const exchangeSellButtons = buyersTable.querySelectorAll('.btn--greenborder');

  // отслеживание клика на кнопку "Обменять"
  exchangeSellButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      const elementId = evt.target.closest('[data-contractor-id]');
      evt.preventDefault();
      const element = data.find((item) => item.id === elementId.dataset.contractorId);
      console.log(`element: ${element}, elementID: ${element.id}`);
      // openModalSell(element);
    });
  });
};

export {renderBuyers};
