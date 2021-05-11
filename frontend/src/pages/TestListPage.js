import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Typography,
  Grid,
} from '@material-ui/core';
import { NoteAdd, GetApp, ViewList } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from '../design/muiStyles';
import Message from '../components/Message';
import Loader from '../components/Loader';
import TestInfoModal from '../components/TestInfoModal';
import TestEditModal from '../components/TestEditModal';
import TableAdminTests from '../components/TableAdminTests';
import { getTests, generateCSVFileForDSP } from '../redux/actions/testActions';
import { getAdminLogList } from '../redux/actions/adminLogActions';
import {
  TEST_DSP_CSV_RESET_SUCCESS,
  TEST_DOWNLOAD_PDF_RESET,
} from '../redux/constants/testConstants';

const TestListPage = ({ history }) => {
  const classes = useStyles();

  const [testInfoShow, setTestInfoShow] = useState(false);
  const [testEditShow, setTestEditShow] = useState(false);
  const [currentTest, setCurrentTest] = useState('');
  const [doctor, setDoctor] = useState('-');

  const dispatch = useDispatch();

  const testListAdmin = useSelector((state) => state.testListAdmin);
  const { loading, error, tests } = testListAdmin;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const verifyTests = useSelector((state) => state.verifyTests);
  const { status: statusTests } = verifyTests;

  const testEdit = useSelector((state) => state.testEdit);
  const { success: successTestEdit } = testEdit;

  const CSVFile = useSelector((state) => state.CSVFile);
  const {
    successToast: successToastCSV,
    success: successCSV,
    fileUrl,
  } = CSVFile;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getTests());
      dispatch(getAdminLogList());

      if (successToastCSV) {
        toast.success('Fisier CSV generat cu success!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });

        dispatch({ type: TEST_DSP_CSV_RESET_SUCCESS, payload: fileUrl });
      }
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successToastCSV, fileUrl, successTestEdit]);

  const adminLogHandler = () => {
    history.push('/admin/log');
  };

  return (
    <>
      <ToastContainer />
      <Grid container className='my-2'>
        <Typography variant='h4' gutterBottom>
          Teste
        </Typography>
      </Grid>

      <Grid container justify='space-between' className='mb-2'>
        <Grid item xs={5} sm={5} md={5} lg={3} xl={3}>
          <ThemeProvider theme={theme}>
            <FormControl
              required
              variant='outlined'
              className={classes.dropdownAdmin}
            >
              <InputLabel htmlFor='doctor-native-required'>Medic</InputLabel>
              <Select
                native
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                label='Medic'
                inputProps={{
                  name: 'medic',
                  id: 'doctor-native-required',
                }}
              >
                <option aria-label='None' value='-'>
                  Alegeți un medic
                </option>
                <option value='1'>Doctor 1</option>
                <option value='2'>Doctor 2</option>
              </Select>
              <FormHelperText>Obligatoriu</FormHelperText>
            </FormControl>
          </ThemeProvider>
        </Grid>

        <Grid item xs={5} sm={5} md={5} lg={3} xl={3}>
          <ThemeProvider theme={theme}>
            <Button
              variant='contained'
              startIcon={<ViewList />}
              className={`${classes.buttonAdmin} ${classes.secondaryUltraDarkColour}`}
              onClick={adminLogHandler}
            >
              Admin Log
            </Button>
          </ThemeProvider>
        </Grid>

        <Grid item xs={5} sm={5} md={5} lg={3} xl={3}>
          <ThemeProvider theme={theme}>
            <Button
              variant='contained'
              color='primary'
              startIcon={<NoteAdd />}
              className={classes.buttonAdmin}
              onClick={() => dispatch(generateCSVFileForDSP())}
            >
              Generează CSV
            </Button>
          </ThemeProvider>
        </Grid>

        <Grid item xs={5} sm={5} md={5} lg={3} xl={3}>
          {successCSV && (
            <ThemeProvider theme={theme}>
              <Button
                variant='contained'
                color='primary'
                startIcon={<GetApp />}
                className={`${classes.buttonAdmin} ${classes.buttonDownloadCSV}`}
                onClick={() => window.open(fileUrl, '_blank')}
              >
                Descarcă CSV
              </Button>
            </ThemeProvider>
          )}
        </Grid>
      </Grid>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='error'>A apărut o eroare!</Message>
      ) : (
        <Grid container justify='center'>
          <Grid item xs={12} sm={12} md={12} lg='auto' xl='auto'>
            <TableAdminTests
              tests={tests}
              doctor={doctor}
              setCurrentTest={setCurrentTest}
              setTestInfoShow={setTestInfoShow}
              setTestEditShow={setTestEditShow}
            />
          </Grid>
          <TestInfoModal
            show={testInfoShow}
            onClose={() => {
              setTestInfoShow(false);
              dispatch({ type: TEST_DOWNLOAD_PDF_RESET });
            }}
            test={currentTest}
          />
          <TestEditModal
            show={testEditShow}
            onClose={() => setTestEditShow(false)}
            test={currentTest}
          />
        </Grid>
      )}
    </>
  );
};

export default TestListPage;
