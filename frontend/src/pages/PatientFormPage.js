import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import {
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from '../design/muiStyles';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import axios from 'axios';

const PatientFormPage = ({ history }) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [cnp, setCnp] = useState('');
  const [addressID, setAddressID] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [passportId, setPassportId] = useState('');
  const [differentResidenceAddress, setDifferentResidenceAddress] =
    useState(false);
  const [addressResidence, setAddressResidence] = useState('');
  const [message, setMessage] = useState('');
  const [emptyFieldError, setEmptyFieldError] = useState({});

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  const validateForm = () => {
    let temp = {};
    temp.cnp = cnp.length === 13 ? '' : 'Introduceți un CNP valid';
    temp.phoneNumber =
      phoneNumber.length > 9 && phoneNumber.length < 16
        ? ''
        : 'Introduceți un număr de telefon corect';
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

    const patient = {
      name,
      surname,
      cnp,
      addressID,
      phoneNumber,
      email,
      passportId,
      addressResidence,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const makePostRequest = async () => {
      try {
        const { data } = await axios.post('/api/patients', patient, config);
        history.push(`/pacienti/detalii/${data._id}`);
      } catch (error) {
        error.response && error.response.data.message
          ? setMessage(error.response.data.message)
          : setMessage(error.message);
      }
    };

    if (validateForm()) makePostRequest();
  };

  return (
    <FormContainer>
      <Typography variant='h4' gutterBottom className='my-3'>
        Date pacient
      </Typography>
      {message && <Message variant='error'>{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <ThemeProvider theme={theme}>
            <TextField
              required
              variant='outlined'
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
          <ThemeProvider theme={theme}>
            <FormControlLabel
              value='end'
              control={
                <Checkbox
                  checked={differentResidenceAddress}
                  onChange={() =>
                    setDifferentResidenceAddress(!differentResidenceAddress)
                  }
                  color='primary'
                />
              }
              label='Adresa de domiciliu diferită'
              labelPlacement='end'
            />
          </ThemeProvider>
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

        <Button type='submit' className={classes.buttonMdPrimaryMedium}>
          Adaugă pacient
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PatientFormPage;
