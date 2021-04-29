import React, { useEffect } from 'react';
import Duo from 'react-duo-web';
import { useDispatch, useSelector } from 'react-redux';
import { confirmLogin } from '../redux/actions/userActions';

const SecondStepAuthPage = ({ history }) => {
  const dispatch = useDispatch();

  const userFirstStepAuth = useSelector((state) => state.userFirstStepAuth);
  const { userInfo: userInfoFirstStepAuth } = userFirstStepAuth;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  const handle2FAComplete = (sigResponse) => {
    dispatch(confirmLogin(sigResponse, userInfoFirstStepAuth.email));
  };

  return (
    <>
      <Duo
        style={{ width: 1000, height: 1000 }}
        host={process.env.REACT_APP_DUO_API_HOSTNAME}
        sigRequest={userInfoFirstStepAuth.sig_request}
        sigResponseCallback={handle2FAComplete}
      />
    </>
  );
};

export default SecondStepAuthPage;
