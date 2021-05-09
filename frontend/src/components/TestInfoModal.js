import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Button, CircularProgress, Typography, Grid } from '@material-ui/core';
import { DoneAll } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from '../design/muiStyles';
import Message from '../components/Message';
import { sendPatientSMS } from '../redux/actions/testActions';
import { TEST_PATIENT_SMS_RESET } from '../redux/constants/testConstants';

const TestInfoModal = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const testDownloadPdf = useSelector((state) => state.testDownloadPdf);
  const { loading: loadingPDF, error: errorPDF, pdfLink } = testDownloadPdf;

  const testPatientSMS = useSelector((state) => state.testPatientSMS);
  const {
    loading: loadingSMS,
    error: errorSMS,
    success: successSMS,
  } = testPatientSMS;

  const sendSMSPatientHandler = () => {
    dispatch(sendPatientSMS(props.test._id));
  };

  const downloadHandler = () => {
    if (pdfLink) {
      window.open(pdfLink, '_blank');
    }
  };

  const handleClose = () => {
    dispatch({ type: TEST_PATIENT_SMS_RESET });
    props.onClose();
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
          {errorPDF && <Message variant='error'>A apărut o eroare!</Message>}
          {errorSMS && <Message variant='error'>A apărut o eroare!</Message>}
          <Grid container justify='space-between'>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              {props.test && (
                <Grid container>
                  <Grid container className='mb-3'>
                    <Typography
                      variant='body1'
                      display='inline'
                      className='mr-2'
                      style={{ fontWeight: 'bold' }}
                    >
                      Prelevat:
                    </Typography>
                    <Typography variant='body1' display='inline'>
                      {props.test.collectedBy.name}
                    </Typography>
                  </Grid>

                  {props.test.resultBy && (
                    <Grid container className='mb-3'>
                      <Typography
                        variant='body1'
                        display='inline'
                        className='mr-2'
                        style={{ fontWeight: 'bold' }}
                      >
                        Rezultat:
                      </Typography>
                      <Typography variant='body1' display='inline'>
                        {props.test.resultBy.name}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>

            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Grid container className='mb-1'>
                <Typography variant='body1' style={{ fontWeight: 'bold' }}>
                  SMS pacient
                </Typography>
              </Grid>
              <Grid container>
                <Grid item>
                  {loadingSMS ? (
                    <ThemeProvider theme={theme}>
                      <CircularProgress />
                    </ThemeProvider>
                  ) : successSMS || props.test.sentToPatientSMS ? (
                    <>
                      <DoneAll className={classes.green} fontSize='large' />
                      <Typography
                        variant='body1'
                        display='inline'
                        style={{ fontStyle: 'italic' }}
                      >
                        Livrat
                      </Typography>
                    </>
                  ) : (
                    <ThemeProvider theme={theme}>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={sendSMSPatientHandler}
                      >
                        Trimite
                      </Button>
                    </ThemeProvider>
                  )}
                </Grid>
              </Grid>
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

          {props.test &&
            props.test.resultDate &&
            props.test.sentToPatient &&
            (loadingPDF ? (
              <ThemeProvider theme={theme}>
                <CircularProgress />
              </ThemeProvider>
            ) : (
              <ThemeProvider theme={theme}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={downloadHandler}
                  className='mx-1'
                >
                  Descarcă PDF
                </Button>
              </ThemeProvider>
            ))}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TestInfoModal;
