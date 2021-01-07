import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  patientListReducer,
  patientUpdateReducer,
  patientDetailsReducer,
} from './reducers/patientReducers';
import {
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userCreateReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  patientList: patientListReducer,
  patientDetails: patientDetailsReducer,
  patientUpdate: patientUpdateReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userCreate: userCreateReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
