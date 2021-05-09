import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Typography,
  Grid,
} from '@material-ui/core';
import {
  Edit,
  NoteAdd,
  GetApp,
  RemoveCircleOutline,
  CheckCircle,
  ViewList,
} from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from '../design/muiStyles';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import TestInfoModal from '../components/TestInfoModal';
import TestEditModal from '../components/TestEditModal';
import {
  getTests,
  sendTestPatientPDF,
  generateCSVFileForDSP,
  verifyTodaysTests,
  downloadPatientPDF,
} from '../redux/actions/testActions';
import { getAdminLogList } from '../redux/actions/adminLogActions';
import {
  TEST_DSP_CSV_RESET_SUCCESS,
  TEST_DOWNLOAD_PDF_RESET,
} from '../redux/constants/testConstants';
import { convertDate } from '../utils/commonFunctions';

const TestListPage = ({ history, match }) => {
  const classes = useStyles();

  const [testInfoShow, setTestInfoShow] = useState(false);
  const [testEditShow, setTestEditShow] = useState(false);
  const [currentTest, setCurrentTest] = useState('');
  const [doctor, setDoctor] = useState('-');

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const testListAdmin = useSelector((state) => state.testListAdmin);
  const { loading, error, tests, page, pages } = testListAdmin;

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
      dispatch(getTests(pageNumber));
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
  }, [
    dispatch,
    history,
    userInfo,
    pageNumber,
    successToastCSV,
    fileUrl,
    successTestEdit,
  ]);

  const adminLogHandler = () => {
    history.push('/admin/log');
  };

  return (
    <>
      <ToastContainer />
      <Grid container className='my-4'>
        <Typography variant='h4' gutterBottom>
          Teste
        </Typography>
      </Grid>

      <Grid container justify='space-around' className='my-4'>
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
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </ThemeProvider>
        </Grid>

        <Grid item xs={5} sm={5} md={5} lg={3} xl={3}>
          <ThemeProvider theme={theme}>
            <Button
              variant='contained'
              color='secondary'
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
        <Message variant='error'>{error}</Message>
      ) : (
        <>
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
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID TEST</th>
                <th>NR.</th>
                <th>COD UTILIZATOR</th>
                <th>DATA RECOLTARE</th>
                <th>DATA REZULTAT</th>
                <th>STATUS</th>
                <th>LAB ID</th>
                <th>GENERAT DSP</th>
                <th>EMAIL PACIENT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test._id}>
                  <td
                    onClick={() => {
                      if (test.status !== '-' && test.sentToPatient === true) {
                        dispatch(downloadPatientPDF(test._id));
                      }
                      setCurrentTest(test);
                      setTestInfoShow(true);
                    }}
                  >
                    {test._id}
                  </td>
                  <td>{test.testReportNumber}</td>
                  <td>{test.patient.patientCode}</td>
                  <td>{convertDate(test.prelevationDate)}</td>
                  <td>
                    {test.resultDate ? convertDate(test.resultDate) : '-'}
                  </td>
                  <td>{test.status}</td>
                  <td>{test.labId}</td>
                  <td>
                    {test.sentToDSP && (
                      <CheckCircle
                        style={{
                          color: 'green',
                        }}
                      />
                    )}
                  </td>
                  <td>
                    {test.sentToPatient ? (
                      <CheckCircle
                        style={{
                          color: 'green',
                        }}
                      />
                    ) : test.patient.email ? (
                      test.status !== '-' &&
                      doctor !== '-' && (
                        <Button
                          variant='contained'
                          color='primary'
                          className='btn-sm'
                          onClick={() =>
                            dispatch(sendTestPatientPDF(test._id, doctor))
                          }
                        >
                          TRIMITE
                        </Button>
                      )
                    ) : (
                      <RemoveCircleOutline
                        style={{
                          color: 'red',
                        }}
                      />
                    )}
                  </td>
                  <td>
                    <IconButton
                      onClick={() => {
                        setCurrentTest(test);
                        setTestEditShow(true);
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} scope='tests' />
        </>
      )}
    </>
  );
};

export default TestListPage;
