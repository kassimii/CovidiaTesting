import {
  TEST_CREATE_REQUEST,
  TEST_CREATE_SUCCESS,
  TEST_CREATE_FAIL,
  TEST_LIST_REQUEST,
  TEST_LIST_SUCCESS,
  TEST_LIST_FAIL,
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

    const { data } = await axios.get(`/api/tests/${patientId}`, config);

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
