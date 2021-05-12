import {
  TEST_CREATE_REQUEST,
  TEST_CREATE_SUCCESS,
  TEST_CREATE_FAIL,
  TEST_LIST_REQUEST,
  TEST_LIST_SUCCESS,
  TEST_LIST_FAIL,
  TEST_UPDATE_REQUEST,
  TEST_UPDATE_SUCCESS,
  TEST_UPDATE_FAIL,
  TEST_LIST_ADMIN_REQUEST,
  TEST_LIST_ADMIN_SUCCESS,
  TEST_LIST_ADMIN_FAIL,
  TEST_PATIENT_PDF_REQUEST,
  TEST_PATIENT_PDF_SUCCESS,
  TEST_PATIENT_PDF_FAIL,
  TEST_DSP_CSV_REQUEST,
  TEST_DSP_CSV_SUCCESS,
  TEST_DSP_CSV_FAIL,
  TEST_VERIFY_REQUEST,
  TEST_VERIFY_SUCCESS,
  TEST_VERIFY_FAIL,
  TEST_DOWNLOAD_PDF_REQUEST,
  TEST_DOWNLOAD_PDF_SUCCESS,
  TEST_DOWNLOAD_PDF_FAIL,
  TEST_EDIT_REQUEST,
  TEST_EDIT_SUCCESS,
  TEST_EDIT_FAIL,
  TEST_PATIENT_SMS_REQUEST,
  TEST_PATIENT_SMS_SUCCESS,
  TEST_PATIENT_SMS_FAIL,
  TEST_STATS_REQUEST,
  TEST_STATS_SUCCESS,
  TEST_STATS_FAIL,
  TEST_ONE_WEEK_REQUEST,
  TEST_ONE_WEEK_SUCCESS,
  TEST_ONE_WEEK_FAIL,
} from '../constants/testConstants';
import axios from 'axios';

export const createTestEntry = (test) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEST_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/tests`, test, config);

    dispatch({
      type: TEST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTestsForPatient = (patientId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEST_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tests/patient/${patientId}`, config);

    dispatch({
      type: TEST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addTestResult = (test) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEST_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/tests/${test.testId}`,
      test.test,
      config
    );

    dispatch({
      type: TEST_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTests = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEST_LIST_ADMIN_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tests`, config);

    dispatch({
      type: TEST_LIST_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_LIST_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendTestPatientPDF =
  (testId, doctor) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEST_PATIENT_PDF_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/tests/pdf/${testId}`,
        { doctor },
        config
      );

      dispatch({
        type: TEST_PATIENT_PDF_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TEST_PATIENT_PDF_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const generateCSVFileForDSP = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEST_DSP_CSV_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tests/dsp`, config);

    dispatch({
      type: TEST_DSP_CSV_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_DSP_CSV_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const verifyTodaysTests = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEST_VERIFY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tests/verifytests`, config);

    dispatch({
      type: TEST_VERIFY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_VERIFY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const downloadPatientPDF = (testId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEST_DOWNLOAD_PDF_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tests/pdf/${testId}`, config);

    dispatch({
      type: TEST_DOWNLOAD_PDF_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_DOWNLOAD_PDF_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editTest = (test) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEST_EDIT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/tests/edit-test/${test.testId}`,
      test.test,
      config
    );

    dispatch({
      type: TEST_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendPatientSMS = (testId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEST_PATIENT_SMS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/tests/sms-test-result/${testId}`,
      {},
      config
    );

    dispatch({
      type: TEST_PATIENT_SMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_PATIENT_SMS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTestStats =
  (days, age, gender) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TEST_STATS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/tests/stats?days=${days}&age=${age}&gender=${gender}`,
        config
      );

      dispatch({
        type: TEST_STATS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TEST_STATS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getOneWeekTests = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TEST_ONE_WEEK_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tests/last-week-stats`, config);

    dispatch({
      type: TEST_ONE_WEEK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEST_ONE_WEEK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
