import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  getTests,
  sendTestPatientPDF,
  generateCSVFileForDSP,
} from '../redux/actions/testActions';
import { TEST_DSP_CSV_RESET_SUCCESS } from '../redux/constants/testConstants';
import { convertDate } from '../utils/commonFunctions';

const TestListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const testListAdmin = useSelector((state) => state.testListAdmin);
  const { loading, error, tests, page, pages } = testListAdmin;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const CSVFile = useSelector((state) => state.CSVFile);
  const {
    successToast: successToastCSV,
    success: successCSV,
    fileUrl,
  } = CSVFile;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
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
          <Button
            className='my-3 mx-3'
            onClick={() => dispatch(generateCSVFileForDSP())}
          >
            <i className='far fa-file-excel' /> Generează CSV
          </Button>

          {successCSV && (
            <Button
              className='my-3 mx-3'
              variant='info'
              onClick={() => window.open(fileUrl, '_blank')}
            >
              <i className='fas fa-file-download' /> Descarcă CSV
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
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID TEST</th>
                <th>COD UTILIZATOR</th>
                <th>DATA RECOLTARE</th>
                <th>DATA REZULTAT</th>
                <th>STATUS</th>
                <th>LAB ID</th>
                <th>TRIMIS DSP</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test._id}>
                  <td>{test._id}</td>
                  <td>{test.patient.patientCode}</td>
                  <td>{convertDate(test.prelevationDate)}</td>
                  <td>
                    {test.resultDate ? convertDate(test.resultDate) : '-'}
                  </td>
                  <td>{test.status}</td>
                  <td>{test.labId}</td>
                  <td>
                    {test.sentToDSP && (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {test.sentToPatient ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      test.status !== '-' && (
                        <Button
                          variant='success'
                          className='btn-sm'
                          onClick={() => dispatch(sendTestPatientPDF(test._id))}
                        >
                          PACIENT
                        </Button>
                      )
                    )}
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
