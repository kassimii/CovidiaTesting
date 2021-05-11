import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Typography,
  Button,
  Paper,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from '../design/muiStyles';
import Loader from '../components/Loader';
import TestsChart from '../components/TestsChart';
import StatsCard from '../components/StatsCard';
import { getOneWeekTests, getTestStats } from '../redux/actions/testActions';

const HomePage = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const testStats = useSelector((state) => state.testStats);
  const { stats, loading: loadingStats } = testStats;

  const testOneWeek = useSelector((state) => state.testOneWeek);
  const {
    totalTests,
    posTests,
    negTests,
    inconclusiveTests,
    loading: loadingOneWeek,
  } = testOneWeek;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getOneWeekTests());
      dispatch(getTestStats(7));
    }
  }, [history, userInfo, dispatch]);

  return (
    <>
      <Grid container justify='flex-end'>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          {loadingOneWeek ? (
            <Loader />
          ) : (
            <StatsCard
              oneWeekStats={{
                totalTests,
                posTests,
                negTests,
                inconclusiveTests,
              }}
            />
          )}
        </Grid>
      </Grid>

      <Grid container className={classes.statsGraph}>
        {loadingStats ? <Loader /> : <TestsChart stats={stats} />}
      </Grid>
    </>
  );
};

export default HomePage;
