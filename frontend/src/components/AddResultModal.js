import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { addTestResult } from '../redux/actions/testActions';

const AddResultModal = (props) => {
  const [resultDate, setResultDate] = useState(new Date());
  const [testResult, setTestResult] = useState('Pozitiv');

  const dispatch = useDispatch();

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
    return parts[2] + '-' + months[parts[1]] + '-' + parts[3];
  };

  const onAddHandler = () => {
    const resultDateConverted = convertDate(resultDate);

    dispatch(
      addTestResult({
        testId: props.currenttest,
        test: {
          resultDate: resultDateConverted,
          status: testResult,
        },
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
          <h4>Data rezultat</h4>
          <DayPickerInput
            format={'dd-MM-yyyy'}
            onDayChange={(date) => setResultDate(date)}
            value={resultDate}
          />

          <h4>Rezultat</h4>
          <Form.Control
            as='select'
            onChange={(e) => setTestResult(e.target.value)}
          >
            <option value='Pozitiv'>Pozitiv</option>
            <option value='Negativ'>Negativ</option>
            <option value='Neconcludent'>Neconcludent</option>
          </Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onClose}>Inchide</Button>
          <Button onClick={onAddHandler}>Adauga</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddResultModal;
