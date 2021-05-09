import {
  ADMIN_LOG_CREATE_REQUEST,
  ADMIN_LOG_CREATE_SUCCESS,
  ADMIN_LOG_CREATE_FAIL,
  ADMIN_LOG_CREATE_RESET,
  ADMIN_LOG_LIST_REQUEST,
  ADMIN_LOG_LIST_SUCCESS,
  ADMIN_LOG_LIST_FAIL,
  ADMIN_LOG_LIST_RESET,
} from '../constants/adminLogConstants';

export const adminLogCreateReducer = (
  state = { adminLogEntry: {} },
  action
) => {
  switch (action.type) {
    case ADMIN_LOG_CREATE_REQUEST:
      return { loading: true };
    case ADMIN_LOG_CREATE_SUCCESS:
      return { loading: false, success: true, adminLogEntry: action.payload };
    case ADMIN_LOG_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LOG_CREATE_RESET:
      return { adminLogEntry: {} };
    default:
      return state;
  }
};

export const adminLogListReducer = (state = { adminLog: [] }, action) => {
  switch (action.type) {
    case ADMIN_LOG_LIST_REQUEST:
      return { loading: true };
    case ADMIN_LOG_LIST_SUCCESS:
      return { loading: false, success: true, adminLog: action.payload };
    case ADMIN_LOG_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LOG_LIST_RESET:
      return { adminLog: [] };
    default:
      return state;
  }
};
