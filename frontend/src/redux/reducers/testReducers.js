import {
  TEST_CREATE_REQUEST,
  TEST_CREATE_SUCCESS,
  TEST_CREATE_FAIL,
  TEST_CREATE_RESET,
  TEST_LIST_REQUEST,
  TEST_LIST_SUCCESS,
  TEST_LIST_FAIL,
  TEST_LIST_RESET,
  TEST_UPDATE_REQUEST,
  TEST_UPDATE_SUCCESS,
  TEST_UPDATE_FAIL,
  TEST_UPDATE_RESET,
  TEST_LIST_ADMIN_REQUEST,
  TEST_LIST_ADMIN_SUCCESS,
  TEST_LIST_ADMIN_FAIL,
  TEST_LIST_ADMIN_RESET,
  TEST_DSP_REQUEST,
  TEST_DSP_SUCCESS,
  TEST_DSP_FAIL,
  TEST_DSP_RESET,
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
    case TEST_CREATE_SUCCESS:
      return { loading: false, tests: [...state.tests, action.payload] };
    case TEST_UPDATE_SUCCESS: {
      const updatedTests = state.tests.map((test) => {
        if (test._id === action.payload._id)
          return {
            ...test,
            status: action.payload.status,
            resultDate: action.payload.resultDate,
          };
        else return test;
      });
      return {
        loading: false,
        tests: updatedTests,
      };
    }

    default:
      return state;
  }
};

export const testUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case TEST_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case TEST_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TEST_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const testListAdminReducer = (state = { tests: [] }, action) => {
  switch (action.type) {
    case TEST_LIST_ADMIN_REQUEST:
      return {
        loading: true,
      };
    case TEST_LIST_ADMIN_SUCCESS:
      return {
        loading: false,
        tests: action.payload.tests,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case TEST_LIST_ADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TEST_LIST_ADMIN_RESET:
      return { tests: [] };
    default:
      return state;
  }
};

export const testDSPReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_DSP_REQUEST:
      return {
        loading: true,
      };
    case TEST_DSP_SUCCESS:
      return {
        loading: false,
      };
    case TEST_DSP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TEST_DSP_RESET:
      return {};

    default:
      return state;
  }
};
