import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { addTestResult } from '../redux/actions/testActions';

const AddResultModal = (props) => {
  const [resultDate, setResultDate] = useState(new Date());
  const [testResult, setTestResult] = useState('Pozitiv');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const onAddHandler = () => {
    dispatch(
      addTestResult({
        testId: props.currenttest,
        test: {
          resultDate: resultDate,
          status: testResult,
          resultBy: userInfo._id,
        },
      })
    );

    props.onClose();
  };

  const dayPicker = { firstDayOfWeek: 1 };

  function parseDate(str, format, locale) {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  }

  function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }

  const FORMAT = 'dd-MM-yyyy';

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
            onDayChange={(date) => setResultDate(date)}
            value={resultDate}
            dayPickerProps={dayPicker}
            formatDate={formatDate}
            format={FORMAT}
            parseDate={parseDate}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
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
