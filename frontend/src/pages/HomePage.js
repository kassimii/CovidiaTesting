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
import { getOneWeekTests } from '../redux/actions/testActions';

const HomePage = ({ history }) => {
  const classes = useStyles();
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

  return (
    <>
      <Grid container justify='flex-end'>
        <Grid item xs={12} sm={8} md={6} lg={5} xl={5}>
          <StatsCard oneWeekStats={testsOneWeek} />
        </Grid>
      </Grid>

      <Grid container className={classes.statsGraph}>
        {loadingOneWeek ? <Loader /> : <TestsChart oneWeek={oneWeek} />}
      </Grid>
    </>
  );
};

export default HomePage;
