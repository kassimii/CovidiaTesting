import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
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

  const [addressResidence, setAddressResidence] = useState(null);
  const [message, setMessage] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

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
      const { data } = await axios.post('/api/patients', patient, config);
      history.push(`/pacienti/detalii/${data._id}`);
    };

    makePostRequest();
  };

  return (
    <FormContainer>
      <h1>Date pacient</h1>
      {message && <Message variant='danger'>{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Nume</Form.Label>
          <Form.Control
            type='text'
            placeholder='Introduceti nume'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='surname'>
          <Form.Label>Prenume</Form.Label>
          <Form.Control
            type='text'
            placeholder='Introduceti prenume'
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='cnp'>
          <Form.Label>CNP</Form.Label>
          <Form.Control
            type='text'
            placeholder='Introduceti CNP'
            value={cnp}
            onChange={(e) => setCnp(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='addressID'>
          <Form.Label>Adresa</Form.Label>
          <Form.Control
            type='text'
            placeholder='Introduceti adresa'
            value={addressID}
            onChange={(e) => setAddressID(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='phoneNumber'>
          <Form.Label>Numar de telefon</Form.Label>
          <Form.Control
            placeholder='Introduceti numarul de telefon'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Adresa email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Introduceti adresa email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
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
            <Form.Label>Adresa de domiciliu</Form.Label>
            <Form.Control
              type='text'
              placeholder='Introduceti adresa de domiciliu'
              value={addressResidence}
              onChange={(e) => setAddressResidence(e.target.value)}
            ></Form.Control>
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
