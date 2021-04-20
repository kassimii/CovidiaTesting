import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { createTestEntry } from '../redux/actions/testActions';

const AddTestModal = (props) => {
  const [prelevationDate, setPrelevationDate] = useState(new Date());

  const dispatch = useDispatch();

  const patientDetails = useSelector((state) => state.patientDetails);
  const { patient } = patientDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const onAddHandler = () => {
    dispatch(
      createTestEntry({
        patient: patient._id,
        prelevationDate: prelevationDate,
        collectedBy: userInfo._id,
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
