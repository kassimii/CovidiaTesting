import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import Patient from '../components/Patient';
import PatientCode from '../components/PatientCode';
import Message from '../components/Message';
import Loader from '../components/Loader';
import SearchBox from '../components/SearchBox';
import Paginate from '../components/Paginate';
import { listPatients } from '../redux/actions/patientActions';

const PatientListPage = ({ history, match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patientList = useSelector((state) => state.patientList);
  const { loading, error, patients, page, pages } = patientList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(listPatients(keyword, pageNumber));
    }
  }, [dispatch, history, userInfo, keyword, pageNumber]);

  return (
    <>
      <LinkContainer to={`/pacienti`}>
        <Typography variant='h4' gutterBottom className='my-3'>
          Pacienți
        </Typography>
      </LinkContainer>
      <SearchBox history={history} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='error'>{error}</Message>
      ) : (
        <>
          <Row>
            {patients.map((patient) => (
              <Col key={patient._id} sm={12}>
                {userInfo && userInfo.isPrelevationWorker && (
                  <Patient patient={patient} />
                )}
                {userInfo && userInfo.isLabWorker && (
                  <PatientCode patient={patient} />
                )}
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} scope='patients' />
        </>
      )}
    </>
  );
};

export default PatientListPage;
