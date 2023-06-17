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

const renderContractors = (array) => {
  const tableBodyContainer = document.querySelector('.users-list__table-body');
  const tableRowTemplate = document.querySelector('#user-table-row__template').content.querySelector('.users-list__table-row');
  const contractorsFragment = document.createDocumentFragment();

  array.forEach(({isVerified, userName, exchangeRate, minAmount, balance, paymentMethods}) => {
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

    contractorExchangeRate.textContent = exchangeRate.toFixed();
    console.log(exchangeRate);

    console.log(`minAmount в Р: ${minAmount}`);
    console.log(`minAmount в KEKS: ${minAmount * exchangeRate}`);
    console.log(`balance.amount в Р: ${balance.amount}`);
    console.log(`balance в KEKS: ${balance.amount * exchangeRate}`);
    contractorCashLimit.textContent = `${(minAmount * exchangeRate).toFixed()} ₽ - ${(balance.amount * exchangeRate).toFixed()} ₽`;

    // --- ! добавить проверку для покупателей - у них нет paymentMethods
    // if (paymentMethods === undefined) {
    paymentMethods.forEach(({provider}) => {
      const paymentItemTemplate = contractorPaymentItem.cloneNode(true);
      paymentItemTemplate.textContent = provider;
      console.log(provider);
      paymentListFragment.appendChild(paymentItemTemplate);
    });
    contractorPaymentList.innerHTML = '';
    contractorPaymentList.appendChild(paymentListFragment);
    // }

    contractorsFragment.appendChild(contractor);
  });
  tableBodyContainer.appendChild(contractorsFragment);
};

const createLists = (data) => {
  const sellers = data.filter((seller) => seller.status === 'seller');
  console.log(`sellers.length: ${sellers.length}, sellers: ${sellers}`);

  const buyers = data.filter((buyer) => buyer.status === 'buyer');
  console.log(`buyers.length: ${buyers.length}, buyers: ${buyers}`);

  renderContractors(sellers);
};

export {createLists};
