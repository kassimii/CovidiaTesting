import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import TestsChart from '../components/TestsChart';
import { getOneWeekTests } from '../redux/actions/testActions';

const HomePage = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const testsOneWeek = useSelector((state) => state.testsOneWeek);
  const { oneWeek, loading: loadingOneWeek } = testsOneWeek;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getOneWeekTests());
    }
  }, [history, userInfo, dispatch]);

  return <>{loadingOneWeek ? <Loader /> : <TestsChart oneWeek={oneWeek} />}</>;
};

export default HomePage;
