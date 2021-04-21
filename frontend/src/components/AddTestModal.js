import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Input } from '@material-ui/core';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { createTestEntry } from '../redux/actions/testActions';
import Message from '../components/Message';

const AddTestModal = (props) => {
  const [prelevationDate, setPrelevationDate] = useState(new Date());
  const [testReportNumber, setTestReportNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const patientDetails = useSelector((state) => state.patientDetails);
  const { patient } = patientDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const onAddHandler = () => {
    if (testReportNumber === 0) {
      setErrorMessage('Introduceți numărul buletinului de analize!');
      return;
    }
    dispatch(
      createTestEntry({
        patient: patient._id,
        prelevationDate,
        collectedBy: userInfo._id,
        testReportNumber,
      })
    );

    setErrorMessage('');
    setTestReportNumber(0);
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
        {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
        <Modal.Body>
          <h4>Data prelevare</h4>
          <DayPickerInput
            onDayChange={(date) => setPrelevationDate(date)}
            value={prelevationDate}
            dayPickerProps={dayPicker}
            formatDate={formatDate}
            format={FORMAT}
            parseDate={parseDate}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
          />
          <h4>Nr. buletin analize</h4>
          <Input
            type='number'
            placeholder='0'
            value={testReportNumber}
            onChange={(e) => setTestReportNumber(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onClose}>Închide</Button>
          <Button onClick={onAddHandler}>Adaugă</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTestModal;
