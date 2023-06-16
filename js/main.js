// console.log('Привет, мир!');
// import {userGetData, contractorsGetData, sendData} from './api.js';
import {userGetData, contractorsGetData} from './api.js';
import {showAlert} from './util.js';

async function start () {
  try {
    const userData = await userGetData();
    // const userDataObject = JSON.parse(userData);
    console.log(`userGetData: ${userData}`);
    const contractorsData = await contractorsGetData();
    console.log(`contractorsData: ${contractorsData}`);
  } catch (err) {
    // console.log
    showAlert(err.message);
  }
}

start();

// setOnFormSubmit(async (data) => {
//   try {
//     await sendData(data);
//     resetForm();
//     openSuccessMessage();
//   } catch {
//     openErrorMessage();
//   }
// });
