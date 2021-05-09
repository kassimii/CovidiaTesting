import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Input, Typography, Button, Grid, InputLabel } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';
import locale from 'date-fns/locale/ro';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from '../design/muiStyles';
import Message from '../components/Message';
import { createTestEntry } from '../redux/actions/testActions';

const AddTestModal = (props) => {
  const classes = useStyles();

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
    setPrelevationDate(new Date());
    props.onClose();
  };

  const onCloseHandler = () => {
    setErrorMessage('');
    setTestReportNumber(0);
    setPrelevationDate(new Date());
    props.onClose();
  };

  const handleDateChange = (date) => {
    setPrelevationDate(date);
  };

  return (
    <>
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        onExit={onCloseHandler}
        onHide={onCloseHandler}
      >
        <Modal.Header closeButton className={classes.testModalHeader}>
          <Modal.Title id='contained-modal-title-vcenter'>
            <Typography variant='h5'>Detalii test</Typography>
          </Modal.Title>
        </Modal.Header>

        {errorMessage && <Message variant='error'>{errorMessage}</Message>}
        <Modal.Body className='m-3 p-3'>
          <Grid container direction='column' className='mb-4'>
            <InputLabel>Dată prelevare</InputLabel>
            <ThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                <KeyboardDatePicker
                  disableToolbar
                  autoOk={true}
                  variant='inline'
                  format='dd/MM/yyyy'
                  id='date-picker-inline'
                  value={prelevationDate}
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
            <InputLabel>Nr. buletin analize</InputLabel>
            <ThemeProvider theme={theme}>
              <Input
                type='number'
                placeholder='0'
                onChange={(e) => setTestReportNumber(e.target.value)}
                style={{ width: '40%' }}
              />
            </ThemeProvider>
          </Grid>
        </Modal.Body>

        <Modal.Footer>
          <ThemeProvider theme={theme}>
            <Button
              variant='outlined'
              color='primary'
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

export default AddTestModal;
