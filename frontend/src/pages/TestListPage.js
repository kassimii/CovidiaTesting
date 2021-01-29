import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { getTests } from '../redux/actions/testActions';

const TestListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const testListAdmin = useSelector((state) => state.testListAdmin);
  const { loading, error, tests, page, pages } = testListAdmin;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getTests(pageNumber));
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, pageNumber]);

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Teste</h1>
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
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test._id}>
                  <td>{test._id}</td>
                  <td>{test.patient.patientCode}</td>
                  <td>{test.prelevationDate}</td>
                  <td>{test.resultDate}</td>
                  <td>{test.status}</td>
                  <td>{test.labId}</td>
                  <td>
                    <Button variant='success' className='btn-sm'>
                      DSP
                    </Button>
                  </td>
                  <td>
                    <Button variant='light' className='btn-sm'>
                      PACIENT
                    </Button>
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
