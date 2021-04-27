import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Row, Col } from 'react-bootstrap';
import { Button, InputLabel, CircularProgress } from '@material-ui/core';
import { DoneAll } from '@material-ui/icons';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { sendPatientSMS } from '../redux/actions/testActions';

const TestInfoModal = (props) => {
  const dispatch = useDispatch();

  const testDownloadPdf = useSelector((state) => state.testDownloadPdf);
  const { loading: loadingPDF, error: errorPDF, pdfLink } = testDownloadPdf;

  const testPatientSMS = useSelector((state) => state.testPatientSMS);
  const {
    loading: loadingSMS,
    error: errorSMS,
    success: successSMS,
  } = testPatientSMS;

  const sendSMSPatientHandler = () => {
    dispatch(sendPatientSMS(props.test._id));
  };

  const downloadHandler = () => {
    if (pdfLink) {
      window.open(pdfLink, '_blank');
    }
  };

  return (
    <>
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header className='m-1'>
          <Modal.Title>TEST {props.test._id}</Modal.Title>
        </Modal.Header>

        <Modal.Body className='m-3'>
          {loadingPDF && <Loader />}
          {errorPDF && <Message variant='danger'>A apărut o eroare!</Message>}
          {errorSMS && <Message variant='danger'>A apărut o eroare!</Message>}
          <Row>
            <Col>
              {props.test && (
                <>
                  <h6 style={{ display: 'inline' }}>Prelevat: </h6>
                  <p style={{ display: 'inline' }}>
                    {props.test.collectedBy.name}
                  </p>
                  <br />
                  {props.test.resultBy && (
                    <>
                      <h6 style={{ display: 'inline' }}>Rezultat: </h6>
                      <p style={{ display: 'inline' }}>
                        {props.test.resultBy.name}
                      </p>
                    </>
                  )}
                </>
              )}
            </Col>
          </Row>

          <>
            <Row>
              <InputLabel className='m-3'>Trimite SMS pacient</InputLabel>
            </Row>
            <Row className=''>
              <Col>
                {loadingSMS ? (
                  <CircularProgress color='secondary' />
                ) : successSMS || props.test.sentToPatientSMS ? (
                  <DoneAll
                    style={{
                      color: 'green',
                    }}
                  />
                ) : (
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={sendSMSPatientHandler}
                  >
                    Trimite
                  </Button>
                )}
              </Col>
            </Row>
          </>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='outlined' onClick={props.onClose}>
            Inchide
          </Button>
          {props.test && props.test.resultDate && props.test.sentToPatient && (
            <Button
              variant='contained'
              color='primary'
              onClick={downloadHandler}
            >
              Descarcă PDF
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TestInfoModal;
