import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@material-ui/core';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

import { convertDate } from '../utils/commonFunctions';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(3),
    minWidth: 170,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputLabel: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

const TestEditModal = (props) => {
  const classes = useStyles();

  const [prelevationDate, setPrelevationDate] = useState(new Date());
  const [resultDate, setResultDate] = useState(new Date());
  const [testResult, setTestResult] = useState('-');

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.test) {
      setPrelevationDate(convertDate(props.test.prelevationDate));
      if (props.test.resultDate)
        setResultDate(convertDate(props.test.resultDate));
      else setResultDate(new Date());
      setTestResult(props.test.status);
    }
  }, [props.test]);

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
        <Modal.Header className='m-1'>
          <Modal.Title>TEST {props.test._id}</Modal.Title>
        </Modal.Header>

        <Modal.Body className='mx-3'>
          <InputLabel className={classes.inputLabel}>Dată prelevare</InputLabel>
          <DayPickerInput
            onDayChange={(date) => setPrelevationDate(date)}
            value={prelevationDate}
            dayPickerProps={dayPicker}
            formatDate={formatDate}
            format={FORMAT}
            parseDate={parseDate}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
          />

          <InputLabel className={classes.inputLabel}>Dată rezultat</InputLabel>
          <DayPickerInput
            onDayChange={(date) => setResultDate(date)}
            value={resultDate}
            dayPickerProps={dayPicker}
            formatDate={formatDate}
            format={FORMAT}
            // parseDate={parseDate}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
          />
          {!props.test.resultDate ? (
            <FormHelperText>*necompletat</FormHelperText>
          ) : (
            <br />
          )}

          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel htmlFor='outlined-age-native-simple'>
              Rezultat
            </InputLabel>
            <Select
              native
              value={testResult}
              onChange={(e) => setTestResult(e.target.value)}
              label='Rezultat'
              inputProps={{
                name: 'rezulat',
                id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label='None' value='-'>
                -
              </option>
              <option value='Pozitiv'>Pozitiv</option>
              <option value='Negativ'>Negativ</option>
              <option value='Neconcludent'>Neconcludent</option>
            </Select>
          </FormControl>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='outline-secondary' onClick={props.onClose}>
            Închide
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TestEditModal;
