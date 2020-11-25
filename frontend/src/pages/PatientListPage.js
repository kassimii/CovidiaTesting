import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import Patient from '../components/Patient';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listPatients } from '../redux/actions/patientActions';

const PatientListPage = () => {
  const dispatch = useDispatch();

  const patientList = useSelector((state) => state.patientList);
  const { loading, error, patients } = patientList;

  useEffect(() => {
    dispatch(listPatients());
  }, [dispatch]);

  return (
    <>
      <h1 className='my-3'>Pacienti</h1>
      <Row>
        <Col xs={10} sm={10} md={10} lg={10}>
          <InputGroup className='mb-3 mt-2'>
            <InputGroup.Prepend>
              <InputGroup.Text id='inputGroup-sizing-default'>
                Cauta pacient
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label='Default'
              aria-describedby='inputGroup-sizing-default'
              style={{ backgroundColor: 'lightgray' }}
            />
          </InputGroup>
        </Col>

        <Col>
          <Button
            variant='outline-secondary'
            type='button'
            xs={2}
            sm={2}
            md={2}
            lg={2}
          >
            <i class='fas fa-search'></i>
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {patients.map((patient) => (
            <Col key={patient._id} sm={12}>
              <Patient patient={patient} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default PatientListPage;
