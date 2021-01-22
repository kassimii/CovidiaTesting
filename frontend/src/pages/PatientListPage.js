import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Patient from '../components/Patient';
import PatientCode from '../components/PatientCode';
import Message from '../components/Message';
import Loader from '../components/Loader';
import SearchBox from '../components/SearchBox';
import { listPatients } from '../redux/actions/patientActions';

const PatientListPage = ({ history, match }) => {
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patientList = useSelector((state) => state.patientList);
  const { loading, error, patients } = patientList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(listPatients(keyword));
    }
  }, [dispatch, history, userInfo, keyword]);

  return (
    <>
      <h1 className='my-3'>Pacienti</h1>
      <SearchBox history={history} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
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
      )}
    </>
  );
};

export default PatientListPage;
