import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  Grid,
  FormHelperText,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import locale from 'date-fns/locale/ro';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from '../design/muiStyles';
import { editTest } from '../redux/actions/testActions';
import { createAdminLogEntry } from '../redux/actions/adminLogActions';
import Message from './Message';

const TestEditModal = (props) => {
  const classes = useStyles();

  const [prevPrelevationDate, setPrevPrelevationDate] = useState(new Date());
  const [prevResultDate, setPrevResultDate] = useState(new Date());
  const [prevTestResult, setPrevTestResult] = useState('-');

  const [prelevationDate, setPrelevationDate] = useState(new Date());
  const [resultDate, setResultDate] = useState(new Date());
  const [testResult, setTestResult] = useState('-');

  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (props.test) {
      setPrelevationDate(new Date(props.test.prelevationDate));
      setPrevPrelevationDate(new Date(props.test.prelevationDate));

      if (props.test.resultDate) {
        setResultDate(new Date(props.test.resultDate));
        setPrevResultDate(new Date(props.test.resultDate));
      } else setResultDate(new Date());

      setTestResult(props.test.status);
      setPrevTestResult(props.test.status);
    }
  }, [props.test]);

  const setAdminLogEntryData = () => {
    let adminLogEntry = {
      testId: props.test._id,
      modifiedBy: userInfo._id,
    };

    if (prevPrelevationDate.getTime() !== prelevationDate.getTime()) {
      adminLogEntry.prevPrelevationDate = prevPrelevationDate;
      adminLogEntry.modifiedPrelevationDate = prelevationDate;
    }

    if (prevResultDate.getTime() !== resultDate.getTime()) {
      adminLogEntry.prevResultDate = prevResultDate;
      adminLogEntry.modifiedResultDate = resultDate;
    }

    if (prevTestResult !== testResult) {
      adminLogEntry.prevStatus = prevTestResult;
      adminLogEntry.modifiedStatus = testResult;
    }

    return adminLogEntry;
  };

  const handleClose = () => {
    setErrorMessage('');
    props.onClose();
  };

  const onUpdateHandler = () => {
    if (testResult === '-') {
      setErrorMessage('Adăgați rezultatul testului!');
    } else {
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

      const adminLogEntry = setAdminLogEntryData();

      dispatch(createAdminLogEntry(adminLogEntry));
      handleClose();
    }
  };

  return (
    <>
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        onExit={handleClose}
        onHide={handleClose}
      >
        <Modal.Header closeButton className={classes.testModalHeader}>
          <Typography variant='h5' display='inline' className='mr-2'>
            TEST
          </Typography>
          <Typography
            variant='h5'
            display='inline'
            style={{ fontStyle: 'italic' }}
          >
            {props.test._id}
          </Typography>
        </Modal.Header>

        <Modal.Body className='m-3 p-3'>
          {errorMessage && <Message variant='error'>{errorMessage}</Message>}
          <Grid container justify='space-between'>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Grid container direction='column' className='mb-4'>
                <InputLabel>Dată prelevare</InputLabel>

                <ThemeProvider theme={theme}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                    <KeyboardDatePicker
                      disableToolbar
                      autoOk={true}
                      variant='inline'
                      format='dd/MM/yyyy'
                      id='date-picker-inline-prelevation'
                      value={prelevationDate}
                      onChange={(date) => setPrelevationDate(date)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      style={{ width: '80%' }}
                    />
                  </MuiPickersUtilsProvider>
                </ThemeProvider>
              </Grid>

              <Grid container direction='column'>
                <InputLabel>Dată rezultat</InputLabel>
                <ThemeProvider theme={theme}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                    <KeyboardDatePicker
                      disableToolbar
                      autoOk={true}
                      variant='inline'
                      format='dd/MM/yyyy'
                      id='date-picker-inline-result'
                      value={resultDate}
                      onChange={(date) => setResultDate(date)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      style={{ width: '80%' }}
                    />
                  </MuiPickersUtilsProvider>
                </ThemeProvider>
                {!props.test.resultDate ? (
                  <FormHelperText>*necompletat</FormHelperText>
                ) : (
                  <br />
                )}
              </Grid>
            </Grid>

            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <ThemeProvider theme={theme}>
                <FormControl variant='outlined' style={{ width: '80%' }}>
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
              </ThemeProvider>
            </Grid>
          </Grid>
        </Modal.Body>

        <Modal.Footer>
          <ThemeProvider theme={theme}>
            <Button
              variant='outlined'
              color='primary'
              onClick={handleClose}
              className='mx-1'
            >
              Închide
            </Button>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
            <Button
              variant='contained'
              color='primary'
              onClick={onUpdateHandler}
              className='mx-1'
            >
              Actualizare
            </Button>
          </ThemeProvider>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TestEditModal;
