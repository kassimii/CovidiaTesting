import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { createTestEntry } from '../redux/actions/testActions';

const AddTestModal = (props) => {
  const [prelevationDate, setPrelevationDate] = useState(new Date());

  const dispatch = useDispatch();

  const patientDetails = useSelector((state) => state.patientDetails);
  const { patient } = patientDetails;

  const convertDate = (str) => {
    str = str.toString();
    let parts = str.split(' ');
    let months = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };
    return parts[2] + '.' + months[parts[1]] + '.' + parts[3];
  };

  const onAddHandler = () => {
    const prelevationDateConverted = convertDate(prelevationDate);
    dispatch(
      createTestEntry({
        patient: patient._id,
        prelevationDate: prelevationDateConverted,
      })
    );

    props.onClose();
  };

  return (
    <>
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header>
          <Modal.Title id='contained-modal-title-vcenter'>
            Detalii test
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Data prelevare</h4>
          <DayPickerInput
            format={'dd-MM-yyyy'}
            onDayChange={(date) => setPrelevationDate(date)}
            value={prelevationDate}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onClose}>Inchide</Button>
          <Button onClick={onAddHandler}>Adauga</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTestModal;
