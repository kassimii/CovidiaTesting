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
  TEST_PATIENT_PDF_REQUEST,
  TEST_PATIENT_PDF_SUCCESS,
  TEST_PATIENT_PDF_FAIL,
  TEST_PATIENT_PDF_RESET,
  TEST_DSP_CSV_REQUEST,
  TEST_DSP_CSV_SUCCESS,
  TEST_DSP_CSV_FAIL,
  TEST_DSP_CSV_RESET,
  TEST_DSP_CSV_RESET_SUCCESS,
  TEST_VERIFY_REQUEST,
  TEST_VERIFY_SUCCESS,
  TEST_VERIFY_FAIL,
  TEST_VERIFY_RESET,
  TEST_DOWNLOAD_PDF_REQUEST,
  TEST_DOWNLOAD_PDF_SUCCESS,
  TEST_DOWNLOAD_PDF_FAIL,
  TEST_DOWNLOAD_PDF_RESET,
  TEST_EDIT_REQUEST,
  TEST_EDIT_SUCCESS,
  TEST_EDIT_FAIL,
  TEST_EDIT_RESET,
  TEST_PATIENT_SMS_REQUEST,
  TEST_PATIENT_SMS_SUCCESS,
  TEST_PATIENT_SMS_FAIL,
  TEST_PATIENT_SMS_RESET,
  TEST_STATS_REQUEST,
  TEST_STATS_SUCCESS,
  TEST_STATS_FAIL,
  TEST_STATS_RESET,
  TEST_ONE_WEEK_REQUEST,
  TEST_ONE_WEEK_SUCCESS,
  TEST_ONE_WEEK_FAIL,
  TEST_ONE_WEEK_RESET,
} from '../constants/testConstants';

export const testCreateReducer = (state = { test: {} }, action) => {
  switch (action.type) {
    case TEST_CREATE_REQUEST:
      return { loading: true };
    case TEST_CREATE_SUCCESS:
      return { loading: false, success: true, test: action.payload };
    case TEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TEST_CREATE_RESET:
      return { test: {} };
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
      };
    case TEST_LIST_ADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TEST_LIST_ADMIN_RESET:
      return { tests: [] };
    case TEST_PATIENT_PDF_SUCCESS: {
      const updatedTests = state.tests.map((test) => {
        if (test._id === action.payload._id)
          return {
            ...test,
            sentToPatient: action.payload.sentToPatient,
          };
        else return test;
      });
      return {
        loading: false,
        tests: updatedTests,
      };
    }
    case TEST_EDIT_SUCCESS: {
      const updatedTests = state.tests.map((test) => {
        if (test._id === action.payload._id)
          return {
            ...test,
            status: action.payload.status,
            resultDate: action.payload.resultDate,
            prelevationDate: action.payload.prelevationDate,
            testReportNumber: action.payload.testReportNumber,
          };
        else return test;
      });
      return {
        loading: false,
        tests: updatedTests,
      };
    }
    case TEST_PATIENT_SMS_SUCCESS: {
      const updatedTests = state.tests.map((test) => {
        if (test._id === action.payload._id)
          return {
            ...test,
            sentToPatientSMS: action.payload.sentToPatientSMS,
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

export const testPatientPdfReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_PATIENT_PDF_REQUEST:
      return {
        loading: true,
      };
    case TEST_PATIENT_PDF_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case TEST_PATIENT_PDF_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TEST_PATIENT_PDF_RESET:
      return {};

    default:
      return state;
  }
};

export const CSVFileReducer = (state = { fileUrl: {} }, action) => {
  switch (action.type) {
    case TEST_DSP_CSV_REQUEST:
      return {
        loading: true,
      };
    case TEST_DSP_CSV_SUCCESS:
      return {
        loading: false,
        successToast: true,
        success: true,
        fileUrl: action.payload,
      };
    case TEST_DSP_CSV_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TEST_DSP_CSV_RESET:
      return { fileUrl: {} };
    case TEST_DSP_CSV_RESET_SUCCESS:
      return { loading: false, success: true, fileUrl: action.payload };
    default:
      return state;
  }
};

export const verifyTestsReducer = (state = { status: '' }, action) => {
  switch (action.type) {
    case TEST_VERIFY_REQUEST:
      return {
        loading: true,
      };
    case TEST_VERIFY_SUCCESS:
      return {
        loading: false,
        status: action.payload,
      };
    case TEST_VERIFY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TEST_VERIFY_RESET:
      return { status: '' };
    default:
      return state;
  }
};

export const testDownloadPdfReducer = (state = { pdfLink: {} }, action) => {
  switch (action.type) {
    case TEST_DOWNLOAD_PDF_REQUEST:
      return {
        loading: true,
      };
    case TEST_DOWNLOAD_PDF_SUCCESS:
      return {
        loading: false,
        pdfLink: action.payload,
      };
    case TEST_DOWNLOAD_PDF_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TEST_DOWNLOAD_PDF_RESET:
      return { pdfLink: {} };

    default:
      return state;
  }
};

export const testEditReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_EDIT_REQUEST:
      return {
        loading: true,
      };
    case TEST_EDIT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case TEST_EDIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TEST_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const testPatientSMSReducer = (state = {}, action) => {
  switch (action.type) {
    case TEST_PATIENT_SMS_REQUEST:
      return {
        loading: true,
      };
    case TEST_PATIENT_SMS_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case TEST_PATIENT_SMS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TEST_PATIENT_SMS_RESET:
      return {};

    default:
      return state;
  }
};

export const testStatsReducer = (state = { stats: [] }, action) => {
  switch (action.type) {
    case TEST_STATS_REQUEST:
      return {
        loading: true,
      };
    case TEST_STATS_SUCCESS:
      return {
        loading: false,
        success: true,
        stats: action.payload.tests,
      };
    case TEST_STATS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TEST_STATS_RESET:
      return { stats: [] };
    default:
      return state;
  }
};

export const testOneWeekReducer = (
  state = { totalTests: 0, posTests: 0, negTests: 0, inconclusiveTests: 0 },
  action
) => {
  switch (action.type) {
    case TEST_ONE_WEEK_REQUEST:
      return {
        loading: true,
      };
    case TEST_ONE_WEEK_SUCCESS:
      return {
        loading: false,
        success: true,
        totalTests: action.payload.totalTests,
        posTests: action.payload.posTests,
        negTests: action.payload.negTests,
        inconclusiveTests: action.payload.inconclusiveTests,
      };
    case TEST_ONE_WEEK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TEST_ONE_WEEK_RESET:
      return { totalTests: 0, posTests: 0, negTests: 0, inconclusiveTests: 0 };
    default:
      return state;
  }
};
