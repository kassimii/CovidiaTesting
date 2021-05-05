import {
  ADMIN_LOG_CREATE_REQUEST,
  ADMIN_LOG_CREATE_SUCCESS,
  ADMIN_LOG_CREATE_FAIL,
  ADMIN_LOG_LIST_REQUEST,
  ADMIN_LOG_LIST_SUCCESS,
  ADMIN_LOG_LIST_FAIL,
} from '../constants/adminLogConstants';
import axios from 'axios';

export const createAdminLogEntry = (adminLogEntry) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ADMIN_LOG_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/admin-log`, adminLogEntry, config);

    dispatch({
      type: ADMIN_LOG_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LOG_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAdminLogList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_LOG_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/admin-log`, config);

    dispatch({
      type: ADMIN_LOG_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LOG_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
