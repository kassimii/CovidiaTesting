import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import {
  TextField,
  Typography,
  Button,
  Paper,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from '../design/muiStyles';
import Message from '../components/Message';
import Loader from '../components/Loader';
import TablePatientTests from '../components/TablePatientTests';
import AddTestModal from '../components/AddTestModal';
import AddResultModal from '../components/AddResultModal';
import {
  updatePatient,
  getPatientDetails,
} from '../redux/actions/patientActions';
import { getTestsForPatient } from '../redux/actions/testActions';
import { PATIENT_UPDATE_RESET } from '../redux/constants/patientConstants';

const PatientPage = ({ history, match }) => {
  const classes = useStyles();

  const patientId = match.params.id;

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [cnp, setCnp] = useState('');
  const [addressID, setAddressID] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [passportId, setPassportId] = useState('');
  const [differentResidenceAddress, setDifferentResidenceAddress] = useState(
    false
  );
  const [addressResidence, setAddressResidence] = useState(null);

  const [addTestModalShow, setAddTestModalShow] = useState(false);
  const [addResultModalShow, setAddResultModalShow] = useState(false);

  const [currentTest, setCurrentTest] = useState('');

  const [emptyFieldError, setEmptyFieldError] = useState({});

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patientDetails = useSelector((state) => state.patientDetails);
  const { loading, error, patient } = patientDetails;

  const testList = useSelector((state) => state.testList);
  const { loading: loadingTests, error: errorTests, tests } = testList;

  const patientUpdate = useSelector((state) => state.patientUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = patientUpdate;

  const testCreate = useSelector((state) => state.testCreate);
  const { error: errorTestCreate } = testCreate;

  const testUpdate = useSelector((state) => state.testUpdate);
  const { error: errorTestUpdate } = testUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (successUpdate) {
        setName(patient.name);
        setSurname(patient.surname);
        setCnp(patient.cnp);
        setAddressID(patient.addressID);
        setPhoneNumber(patient.phoneNumber);
        setEmail(patient.email);
        setPassportId(patient.passportId);
        setAddressResidence(patient.addressResidence);
        if (patient.addressResidence && patient.addressResidence !== '') {
          setDifferentResidenceAddress(true);
        } else {
          setDifferentResidenceAddress(false);
        }

        dispatch({ type: PATIENT_UPDATE_RESET });
      } else {
        if (!patient.name || patient._id !== patientId) {
          dispatch(getPatientDetails(patientId));
          dispatch(getTestsForPatient(patientId));
        } else {
          setName(patient.name);
          setSurname(patient.surname);
          setCnp(patient.cnp);
          setAddressID(patient.addressID);
          setPhoneNumber(patient.phoneNumber);
          setEmail(patient.email);
          setPassportId(patient.passportId);
          setAddressResidence(patient.addressResidence);
          if (patient.addressResidence) {
            setDifferentResidenceAddress(true);
          }
        }
      }
    }
  }, [dispatch, history, userInfo, patientId, patient, successUpdate, tests]);

  const validateForm = () => {
    let temp = {};
    temp.cnp = cnp.length === 13 ? '' : 'Introduceți un CNP valid';
    temp.phoneNumber =
      phoneNumber.length > 9 ? '' : 'Introduceți un număr de telefon corect';
    temp.email =
      email !== ''
        ? /\S+@\S+\.\S+/.test(email)
          ? ''
          : 'Adresa de email nu este validă'
        : '';

    setEmptyFieldError({ ...temp });

    return Object.values(temp).every((x) => x === '');
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const upadtedAddressResidence =
      !differentResidenceAddress || addressResidence === ''
        ? ''
        : addressResidence;

    if (validateForm())
      dispatch(
        updatePatient({
          _id: patientId,
          name,
          surname,
          cnp,
          addressID,
          phoneNumber,
          email,
          passportId,
          addressResidence: upadtedAddressResidence,
        })
      );
  };

  return (
    <>
      <Grid container className={classes.patientPageHeader}>
        <Grid item xs={2} sm={2}>
          <ThemeProvider theme={theme}>
            <Button
              variant='outlined'
              color='secundary'
              className={classes.buttonBack}
              onClick={() => history.goBack()}
            >
              Înapoi
            </Button>
          </ThemeProvider>
        </Grid>
        <Grid item>
          <Paper elevation={15} className={classes.cardPatientCode}>
            <Box p={1}>
              <Typography
                variant='h5'
                gutterBottom
                className={classes.secondaryLightColour}
                style={{ fontWeight: 600, paddingRight: '30px' }}
                display='inline'
              >
                Cod pacient
              </Typography>
              <Typography
                variant='h6'
                gutterBottom
                className={classes.secondaryLightColour}
                display='inline'
              >
                {patient.patientCode}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container className={classes.patientTestTable}>
        {userInfo && userInfo.isPrelevationWorker && (
          <Grid item className='mx-3'>
            <Typography variant='h5' gutterBottom className='mb-3'>
              Date pacient
            </Typography>
            {loadingUpdate && <Loader />}
            {errorUpdate && (
              <Message variant='error'>A apărut o eroare!</Message>
            )}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='error'>A apărut o eroare!</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      required
                      variant='outlined'
                      color='primary'
                      label='Nume'
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </ThemeProvider>
                </Form.Group>

                <Form.Group controlId='surname'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      required
                      variant='outlined'
                      label='Prenume'
                      fullWidth
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                    />
                  </ThemeProvider>
                </Form.Group>

                <Form.Group controlId='cnp'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      required
                      variant='outlined'
                      label='CNP'
                      fullWidth
                      value={cnp}
                      onChange={(e) => setCnp(e.target.value)}
                      {...(emptyFieldError.cnp && {
                        error: true,
                        helperText: emptyFieldError.cnp,
                      })}
                    />
                  </ThemeProvider>
                </Form.Group>

                <Form.Group controlId='addressID'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      required
                      variant='outlined'
                      label='Adresa'
                      fullWidth
                      value={addressID}
                      onChange={(e) => setAddressID(e.target.value)}
                    />
                  </ThemeProvider>
                </Form.Group>

                <Form.Group controlId='phoneNumber'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      required
                      variant='outlined'
                      label='Număr de telefon'
                      fullWidth
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      {...(emptyFieldError.phoneNumber && {
                        error: true,
                        helperText: emptyFieldError.phoneNumber,
                      })}
                    />
                  </ThemeProvider>
                </Form.Group>

                <Form.Group controlId='email'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      variant='outlined'
                      label='Adresă email'
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      {...(emptyFieldError.email && {
                        error: true,
                        helperText: emptyFieldError.email,
                      })}
                    />
                  </ThemeProvider>
                </Form.Group>

                <Form.Group controlId='passportId'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      variant='outlined'
                      label='Observații(CI/Pașaport)'
                      fullWidth
                      value={passportId}
                      onChange={(e) => setPassportId(e.target.value)}
                    />
                  </ThemeProvider>
                </Form.Group>

                <Form.Group controlId='formBasicCheckbox'>
                  <FormControlLabel
                    value='end'
                    control={
                      <Checkbox
                        checked={differentResidenceAddress}
                        onChange={() => {
                          setDifferentResidenceAddress(
                            !differentResidenceAddress
                          );
                          setAddressResidence('');
                        }}
                        color='primary'
                      />
                    }
                    label='Adresa de domiciliu diferită'
                    labelPlacement='end'
                  />
                </Form.Group>

                {differentResidenceAddress && (
                  <Form.Group controlId='addressResidence'>
                    <ThemeProvider theme={theme}>
                      <TextField
                        variant='outlined'
                        label='Adresa de domiciliu'
                        fullWidth
                        value={addressResidence}
                        onChange={(e) => setAddressResidence(e.target.value)}
                      />
                    </ThemeProvider>
                  </Form.Group>
                )}

                <div className='mb-5'>
                  <Button
                    type='submit'
                    className={classes.buttonMdPrimaryMedium}
                  >
                    Actualizare
                  </Button>
                </div>
              </Form>
            )}
          </Grid>
        )}

        <Grid item className='mx-4'>
          <Grid container justify='space-between' className='mb-3 ml-3 pr-3'>
            <Grid item>
              <Typography variant='h5'>Istoric teste</Typography>
            </Grid>
            {errorTestCreate && (
              <Message variant='error'>{errorTestCreate}</Message>
            )}
            {errorTestUpdate && (
              <Message variant='error'>{errorTestUpdate}</Message>
            )}
            {userInfo && userInfo.isPrelevationWorker && (
              <Grid item>
                <Button
                  className={classes.buttonMdSecondaryMedium}
                  startIcon={<Add />}
                  onClick={() => setAddTestModalShow(true)}
                >
                  Adaugă test
                </Button>
              </Grid>
            )}
          </Grid>

          <Grid container>
            {loadingTests ? (
              <Loader />
            ) : errorTests ? (
              <Message variant='error'>{errorTests}</Message>
            ) : (
              <div>
                <TablePatientTests
                  tests={tests}
                  setAddResultModalShow={setAddResultModalShow}
                  setCurrentTest={setCurrentTest}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>

      <AddTestModal
        show={addTestModalShow}
        onClose={() => setAddTestModalShow(false)}
      />

      <AddResultModal
        show={addResultModalShow}
        onClose={() => {
          setAddResultModalShow(false);
          setCurrentTest('');
        }}
        currenttest={currentTest}
      />
    </>
  );
};

export default PatientPage;
