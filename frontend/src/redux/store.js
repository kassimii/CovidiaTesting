import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  adminLogCreateReducer,
  adminLogListReducer,
} from './reducers/adminLogReducers';
import {
  patientListReducer,
  patientUpdateReducer,
  patientDetailsReducer,
} from './reducers/patientReducers';
import {
  userFirstStepAuthReducer,
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userCreateReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
  userVerifyResetLinkReducer,
} from './reducers/userReducers';
import {
  testCreateReducer,
  testListReducer,
  testUpdateReducer,
  testListAdminReducer,
  testPatientPdfReducer,
  CSVFileReducer,
  verifyTestsReducer,
  testDownloadPdfReducer,
  testEditReducer,
  testPatientSMSReducer,
  testsOneWeekReducer,
} from './reducers/testReducers';

const reducer = combineReducers({
  adminLogCreate: adminLogCreateReducer,
  adminLogList: adminLogListReducer,
  patientList: patientListReducer,
  patientDetails: patientDetailsReducer,
  patientUpdate: patientUpdateReducer,
  userFirstStepAuth: userFirstStepAuthReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userCreate: userCreateReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  userVerifyResetLink: userVerifyResetLinkReducer,
  testCreate: testCreateReducer,
  testList: testListReducer,
  testUpdate: testUpdateReducer,
  testListAdmin: testListAdminReducer,
  testPatientPdf: testPatientPdfReducer,
  CSVFile: CSVFileReducer,
  verifyTests: verifyTestsReducer,
  testDownloadPdf: testDownloadPdfReducer,
  testEdit: testEditReducer,
  testPatientSMS: testPatientSMSReducer,
  testsOneWeek: testsOneWeekReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
