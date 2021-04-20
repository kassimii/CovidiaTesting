import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Row, Col } from 'react-bootstrap';
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

import { editTest } from '../redux/actions/testActions';

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
      setPrelevationDate(new Date(props.test.prelevationDate));
      if (props.test.resultDate) setResultDate(new Date(props.test.resultDate));
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

  const onUpdateHandler = () => {
    dispatch(
      editTest({
        testId: props.test._id,
        test: {
          prelevationDate: prelevationDate,
          resultDate: resultDate,
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
        <Modal.Header className='m-1'>
          <Modal.Title>TEST {props.test._id}</Modal.Title>
        </Modal.Header>

        <Modal.Body className='mx-3'>
          <Row>
            <Col>
              <InputLabel className={classes.inputLabel}>
                Dată prelevare
              </InputLabel>
              <DayPickerInput
                onDayChange={(date) => setPrelevationDate(date)}
                value={prelevationDate}
                dayPickerProps={dayPicker}
                formatDate={formatDate}
                format={FORMAT}
                parseDate={parseDate}
                placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
              />

              <InputLabel className={classes.inputLabel}>
                Dată rezultat
              </InputLabel>
              <DayPickerInput
                onDayChange={(date) => setResultDate(date)}
                value={resultDate}
                dayPickerProps={dayPicker}
                formatDate={formatDate}
                format={FORMAT}
                parseDate={parseDate}
                placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
              />
              {!props.test.resultDate ? (
                <FormHelperText>*necompletat</FormHelperText>
              ) : (
                <br />
              )}
            </Col>

            <Col>
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
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='outline-secondary' onClick={props.onClose}>
            Închide
          </Button>
          <Button onClick={onUpdateHandler}>Adaugă</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TestEditModal;
