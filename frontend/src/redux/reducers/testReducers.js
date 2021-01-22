import {
  TEST_CREATE_REQUEST,
  TEST_CREATE_SUCCESS,
  TEST_CREATE_FAIL,
  TEST_CREATE_RESET,
  TEST_LIST_REQUEST,
  TEST_LIST_SUCCESS,
  TEST_LIST_FAIL,
  TEST_LIST_RESET,
} from '../constants/testConstants';

export const testCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_CREATE_REQUEST:
      return { loading: true };
    case TEST_CREATE_SUCCESS:
      return { loading: false, success: true, test: action.payload };
    case TEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TEST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const testListReducer = (state = { tests: [] }, action) => {
  switch (action.type) {
    case TEST_LIST_REQUEST:
      return {
        loading: true,
      };
    case TEST_LIST_SUCCESS:
      return {
        loading: false,
        tests: action.payload,
      };
    case TEST_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TEST_LIST_RESET:
      return { tests: [] };
    default:
      return state;
  }
};
