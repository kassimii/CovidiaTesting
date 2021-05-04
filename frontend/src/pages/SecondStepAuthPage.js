import React, { useEffect } from 'react';
import Duo from 'react-duo-web';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { confirmLogin } from '../redux/actions/userActions';
import { USER_LOGIN_RESET_SUCCESS } from '../redux/constants/userConstants';

const SecondStepAuthPage = ({ history }) => {
  const dispatch = useDispatch();

  const userFirstStepAuth = useSelector((state) => state.userFirstStepAuth);
  const { userInfo: userInfoFirstStepAuth } = userFirstStepAuth;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/home');
    }
  }, [history, userInfo, dispatch]);

  const handle2FAComplete = (sigResponse) => {
    dispatch(confirmLogin(sigResponse, userInfoFirstStepAuth.email));
  };

  const cancelLoginHandler = () => {
    dispatch({
      type: USER_LOGIN_RESET_SUCCESS,
      payload: userInfoFirstStepAuth,
    });
    history.push('/login');
  };

  return (
    <>
      <Row>
        {userInfoFirstStepAuth && (
          <Duo
            style={{ width: 1000, height: 500 }}
            host={process.env.REACT_APP_DUO_API_HOSTNAME}
            sigRequest={userInfoFirstStepAuth.sig_request}
            sigResponseCallback={handle2FAComplete}
          />
        )}
      </Row>
      <Row>
        <Button variant='contained' onClick={cancelLoginHandler}>
          Anulare
        </Button>
      </Row>
    </>
  );
};

export default SecondStepAuthPage;
