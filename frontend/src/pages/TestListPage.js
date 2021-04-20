import React, { useState, useEffect } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Button } from '@material-ui/core';
import { Edit, NoteAdd, GetApp } from '@material-ui/icons';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
} from '../redux/actions/testActions';
import { TEST_DSP_CSV_RESET_SUCCESS } from '../redux/constants/testConstants';
import { convertDate } from '../utils/commonFunctions';
import '../index.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const TestListPage = ({ history, match }) => {
  const classes = useStyles();

  const [testInfoShow, setTestInfoShow] = useState(false);
  const [testEditShow, setTestEditShow] = useState(false);
  const [currentTest, setCurrentTest] = useState('');

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const testListAdmin = useSelector((state) => state.testListAdmin);
  const { loading, error, tests, page, pages } = testListAdmin;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const verifyTests = useSelector((state) => state.verifyTests);
  const { status: statusTests } = verifyTests;

  const CSVFile = useSelector((state) => state.CSVFile);
  const {
    successToast: successToastCSV,
    success: successCSV,
    fileUrl,
  } = CSVFile;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(verifyTodaysTests());
      dispatch(getTests(pageNumber));

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
  }, [dispatch, history, userInfo, pageNumber, successToastCSV, fileUrl]);

  return (
    <>
      <ToastContainer />
      <Row className='align-items-center'>
        <Col>
          <h1>Teste</h1>
        </Col>
        <Col className='text-right'>
          {statusTests !== 'No tests today' && (
            <Button
              variant='contained'
              startIcon={<NoteAdd />}
              className={classes.button}
              onClick={() => dispatch(generateCSVFileForDSP())}
            >
              Generează CSV
            </Button>
          )}

          {successCSV && (
            <Button
              variant='contained'
              color='secondary'
              startIcon={<GetApp />}
              className={classes.button}
              onClick={() => window.open(fileUrl, '_blank')}
            >
              Descarcă CSV
            </Button>
          )}
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <TestInfoModal
            show={testInfoShow}
            onClose={() => setTestInfoShow(false)}
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
                <th>COD UTILIZATOR</th>
                <th>DATA RECOLTARE</th>
                <th>DATA REZULTAT</th>
                <th>STATUS</th>
                <th>LAB ID</th>
                <th>GENERAT DSP</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test._id}>
                  <td
                    onClick={() => {
                      setCurrentTest(test);
                      setTestInfoShow(true);
                    }}
                  >
                    {test._id}
                  </td>
                  <td>{test.patient.patientCode}</td>
                  <td>{convertDate(test.prelevationDate)}</td>
                  <td>
                    {test.resultDate ? convertDate(test.resultDate) : '-'}
                  </td>
                  <td>{test.status}</td>
                  <td>{test.labId}</td>
                  <td>
                    {test.sentToDSP && (
                      <CheckCircleIcon
                        style={{
                          color: 'green',
                        }}
                      />
                    )}
                  </td>
                  <td>
                    {test.sentToPatient ? (
                      <CheckCircleIcon
                        style={{
                          color: 'green',
                        }}
                      />
                    ) : (
                      test.status !== '-' && (
                        <Button
                          variant='contained'
                          color='primary'
                          className='btn-sm'
                          onClick={() => dispatch(sendTestPatientPDF(test._id))}
                        >
                          PACIENT
                        </Button>
                      )
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
