import {
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_SUCCESS,
  PATIENT_LIST_FAIL,
  PATIENT_DETAILS_REQUEST,
  PATIENT_DETAILS_SUCCESS,
  PATIENT_DETAILS_FAIL,
  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_SUCCESS,
  PATIENT_UPDATE_FAIL,
} from '../constants/patientConstants';
import axios from 'axios';

export const listPatients = (keyword = '') => async (dispatch, getState) => {
  try {
    dispatch({ type: PATIENT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/patients?keyword=${keyword}`,
      config
    );

    dispatch({
      type: PATIENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPatientDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/patients/${id}`, config);

    dispatch({
      type: PATIENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PATIENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePatient = (patient) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/patients/${patient._id}`,
      patient,
      config
    );

    dispatch({ type: PATIENT_UPDATE_SUCCESS });
    dispatch({ type: PATIENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PATIENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
