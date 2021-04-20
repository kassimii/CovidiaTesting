import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { downloadPatientPDF } from '../redux/actions/testActions';

const TestInfoModal = (props) => {
  const dispatch = useDispatch();

  const testDownloadPdf = useSelector((state) => state.testDownloadPdf);
  const { loading: loadingPDF, error: errorPDF, pdfLink } = testDownloadPdf;

  const downloadHandler = () => {
    dispatch(downloadPatientPDF(props.test._id));
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
          {errorPDF && <Message variant='danger'>{errorPDF}</Message>}
          {props.test && (
            <>
              <h6 style={{ display: 'inline' }}>Prelevat: </h6>
              <p style={{ display: 'inline' }}>{props.test.collectedBy.name}</p>
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
        </Modal.Body>

        <Modal.Footer>
          <Button variant='outline-secondary' onClick={props.onClose}>
            Inchide
          </Button>
          {props.test && props.test.resultDate && props.test.sentToPatient && (
            <Button variant='success' onClick={downloadHandler}>
              Descarcă PDF
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TestInfoModal;
