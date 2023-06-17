// console.log('Привет, мир!');
// import {userGetData, contractorsGetData, sendData} from './api.js';
import {userGetData, contractorsGetData} from './api.js';
import {showAlert} from './util.js';
import {showUserProfile, hideUserProfile} from './user.js';
import {createLists} from './contractors.js';

async function start () {
  // рабочий вариант - объединенный
  // try {
  //   const userData = await userGetData();
  //   // const userDataObject = JSON.parse(userData);
  //   console.log(`userGetData: ${userData}`);
  //   showUserProfile(userData);
  //   const contractorsData = await contractorsGetData();
  //   console.log(`contractorsData: ${contractorsData}`);
  // } catch (err) {
  //   // console.log
  //   showAlert(err.message);
  // }

  try {
    const userData = await userGetData();
    // console.log(`userGetData: ${userData}`);
    showUserProfile(userData);
  } catch (err) {
    hideUserProfile();
  }

  try {
    const contractorsData = await contractorsGetData();
    console.log(`contractorsData: ${contractorsData}`);
    createLists(contractorsData);
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
