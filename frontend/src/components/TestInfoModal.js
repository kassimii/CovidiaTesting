import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TestInfoModal = (props) => {
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
          <p>informatii</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='outline-secondary' onClick={props.onClose}>
            Inchide
          </Button>
          <Button variant='success'>Descarcă PDF</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TestInfoModal;
