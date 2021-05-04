import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const HomePage = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  return <div>home page</div>;
};

export default HomePage;
