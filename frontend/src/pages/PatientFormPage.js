import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import axios from 'axios';

const PatientFormPage = ({ history }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [cnp, setCnp] = useState('');
  const [addressID, setAddressID] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [differentResidenceAddress, setDifferentResidenceAddress] = useState(
    false
  );

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
      phoneNumber.length > 9 ? '' : 'Introduceți un număr de telefon corect';
    temp.email = /$^|.+@+..+/.test(email)
      ? ''
      : 'Adresa de email nu este validă';

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
        setMessage(error);
      }
    };

    if (validateForm()) makePostRequest();
  };

  return (
    <FormContainer>
      <h1>Date pacient</h1>
      {message && <Message variant='danger'>A apărut o problemă!</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <TextField
            required
            variant='outlined'
            label='Nume'
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='surname'>
          <TextField
            required
            variant='outlined'
            label='Prenume'
            fullWidth
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='cnp'>
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
        </Form.Group>

        <Form.Group controlId='addressID'>
          <TextField
            required
            variant='outlined'
            label='Adresa'
            fullWidth
            value={addressID}
            onChange={(e) => setAddressID(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='phoneNumber'>
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
        </Form.Group>

        <Form.Group controlId='email'>
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
        </Form.Group>

        <Form.Group controlId='formBasicCheckbox'>
          <Form.Check
            type='checkbox'
            label='Adresa de domiciliu diferita'
            checked={differentResidenceAddress}
            onChange={() =>
              setDifferentResidenceAddress(!differentResidenceAddress)
            }
          />
        </Form.Group>
        {differentResidenceAddress && (
          <Form.Group controlId='addressResidence'>
            <TextField
              variant='outlined'
              label='Adresa de domiciliu'
              fullWidth
              value={addressResidence}
              onChange={(e) => setAddressResidence(e.target.value)}
            />
          </Form.Group>
        )}

        <Button type='submit' variant='primary' className='py-3 '>
          Adauga pacient
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PatientFormPage;
