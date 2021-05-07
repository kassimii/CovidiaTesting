import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Typography, Grid } from '@material-ui/core';
import { useStyles } from '../design/muiStyles';
import Patient from '../components/Patient';
import PatientCode from '../components/PatientCode';
import Message from '../components/Message';
import Loader from '../components/Loader';
import SearchBox from '../components/SearchBox';
import Paginate from '../components/Paginate';
import { listPatients } from '../redux/actions/patientActions';

const PatientListPage = ({ history, match }) => {
  const classes = useStyles();

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
      <div>
        <Grid id='top-row' container justify='space-between'>
          <Grid item>
            <Typography
              variant='h4'
              gutterBottom
              className='my-3'
              onClick={() => history.push('/pacienti')}
            >
              Pacienți
            </Typography>
          </Grid>
          <Grid item>
            <SearchBox history={history} />
          </Grid>
        </Grid>
      </div>

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
