import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  Grid,
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
import { addTestResult } from '../redux/actions/testActions';

const AddResultModal = (props) => {
  const classes = useStyles();

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
          resultDate,
          status: testResult,
          resultBy: userInfo._id,
        },
      })
    );

    props.onClose();
  };

  const onCloseHandler = () => {
    setResultDate(new Date());
    props.onClose();
  };

  const handleDateChange = (date) => {
    setResultDate(date);
  };

  return (
    <>
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        onExit={props.onClose}
        onHide={props.onClose}
      >
        <Modal.Header closeButton className={classes.testModalHeader}>
          <Modal.Title id='contained-modal-title-vcenter'>
            <Typography variant='h5'>Detalii test</Typography>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className='m-3 p-3'>
          <Grid container direction='column' className='mb-4'>
            <InputLabel>Dată rezultat</InputLabel>
            <ThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk={true}
                  variant='inline'
                  format='dd/MM/yyyy'
                  id='date-picker-inline'
                  value={resultDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  style={{ width: '40%' }}
                />
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </Grid>

          <Grid container direction='column'>
            <ThemeProvider theme={theme}>
              <InputLabel>Rezultat</InputLabel>
              <FormControl className={classes.formControl}>
                <Select
                  native
                  value={testResult}
                  onChange={(e) => setTestResult(e.target.value)}
                  label='Rezultat'
                  style={{ width: '40%' }}
                >
                  <option value='Pozitiv'>Pozitiv</option>
                  <option value='Negativ'>Negativ</option>
                  <option value='Neconcludent'>Neconcludent</option>
                </Select>
              </FormControl>
            </ThemeProvider>
          </Grid>
        </Modal.Body>

        <Modal.Footer>
          <ThemeProvider theme={theme}>
            <Button
              variant='contained'
              color='secondary'
              onClick={onCloseHandler}
              className='mx-1'
            >
              Închide
            </Button>
          </ThemeProvider>

          <ThemeProvider theme={theme}>
            <Button
              variant='contained'
              color='primary'
              onClick={onAddHandler}
              className='mx-1'
            >
              Adaugă
            </Button>
          </ThemeProvider>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddResultModal;
