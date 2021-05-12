import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from '../design/muiStyles';
import Loader from '../components/Loader';
import TestsChart from '../components/TestsChart';
import StatsCard from '../components/StatsCard';
import { getOneWeekTests, getTestStats } from '../redux/actions/testActions';

const HomePage = ({ history }) => {
  const classes = useStyles();

  const [period, setPeriod] = useState('7');
  const [age, setAge] = useState('1');
  const [gender, setGender] = useState('0');

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

  const handleShowStatsButton = () => {
    dispatch(getTestStats(period, age, gender));
  };

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(getOneWeekTests());
      dispatch(getTestStats(7, 1, 0));
    }
  }, [history, userInfo, dispatch]);

  return (
    <>
      <Grid container justify='flex-end'>
        <Grid item xs={11} sm={10} md={7} lg={7} xl={7}>
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

      <Grid container justify='center' className={classes.statsButtonsAlign}>
        <Grid item xs={4} sm={4} md={4} lg={3} xl={3}>
          <ThemeProvider theme={theme}>
            <FormControl variant='outlined' className={classes.dropdownAdmin}>
              <InputLabel htmlFor='outlined-period-native-simple'>
                Perioadă
              </InputLabel>
              <Select
                native
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                label='Perioadă'
                inputProps={{
                  name: 'period',
                  id: 'outlined-period-native-simple',
                }}
              >
                <option value='7'>1 săptămână</option>
                <option value='14'>2 săptămâni</option>
                <option value='30'>1 lună</option>
                <option value='90'>3 luni</option>
                <option value='180'>6 luni</option>
                <option value='365'>1 an</option>
              </Select>
            </FormControl>
          </ThemeProvider>
        </Grid>

        <Grid item xs={4} sm={4} md={4} lg={3} xl={3}>
          <ThemeProvider theme={theme}>
            <FormControl variant='outlined' className={classes.dropdownAdmin}>
              <InputLabel htmlFor='outlined-age-native-simple'>
                Vârstă
              </InputLabel>
              <Select
                native
                value={age}
                onChange={(e) => setAge(e.target.value)}
                label='Vârstă'
                inputProps={{
                  name: 'age',
                  id: 'outlined-age-native-simple',
                }}
              >
                <option aria-label='None' value='1'>
                  Toate
                </option>
                <option value='2'>&lt;30</option>
                <option value='3'>30-40</option>
                <option value='4'>40-50</option>
                <option value='5'>50-60</option>
                <option value='6'>60-70</option>
                <option value='7'>&gt;70</option>
              </Select>
            </FormControl>
          </ThemeProvider>
        </Grid>

        <Grid item xs={4} sm={4} md={4} lg={3} xl={3}>
          <ThemeProvider theme={theme}>
            <FormControl variant='outlined' className={classes.dropdownAdmin}>
              <InputLabel htmlFor='outlined-gender-native-simple'>
                Sex
              </InputLabel>
              <Select
                native
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label='Sex'
                inputProps={{
                  name: 'gender',
                  id: 'outlined-gender-native-simple',
                }}
              >
                <option aria-label='None' value='0'>
                  Toate
                </option>
                <option value='1'>Masculin</option>
                <option value='2'>Feminim</option>
              </Select>
            </FormControl>
          </ThemeProvider>
        </Grid>

        <Grid item xs={5} sm={5} md={5} lg={3} xl={3}>
          <ThemeProvider theme={theme}>
            <Button
              variant='outlined'
              color='primary'
              className={`${classes.buttonAdmin} ${classes.buttonDownloadCSV}`}
              onClick={handleShowStatsButton}
            >
              Afișează statistica
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>

      <Grid container justify='center' className={classes.statsGraph}>
        {loadingStats ? <Loader /> : <TestsChart stats={stats} />}
      </Grid>
    </>
  );
};

export default HomePage;
