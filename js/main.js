// console.log('Привет, мир!');
// import {userGetData, contractorsGetData, sendData} from './api.js';
import {userGetData, contractorsGetData} from './api.js';
import {showAlert} from './util.js';
import {showUserProfile, hideUserProfile} from './user.js';
import {createLists} from './contractors.js';

let userData;

async function start () {

  try {
    userData = await userGetData();
    // const userData = await userGetData();
    // console.log(`userGetData: ${userData}`);
    showUserProfile(userData);
  } catch (err) {
    hideUserProfile();
  }

  try {
    const contractorsData = await contractorsGetData();
    // console.log(`contractorsData: ${contractorsData}`);
    createLists(contractorsData);
  } catch (err) {
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

export {userData};
