import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import axios from 'axios';

const PatientFormPage = () => {
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

    const makePostRequest = async () => {
      const { data } = await axios.post('/api/patients', patient);
      console.log(data);
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
        <Form.Group controlId='name'>
          <Form.Label>Prenume</Form.Label>
          <Form.Control
            type='text'
            placeholder='Introduceti prenume'
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='name'>
          <Form.Label>CNP</Form.Label>
          <Form.Control
            type='text'
            placeholder='Introduceti CNP'
            value={cnp}
            onChange={(e) => setCnp(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='name'>
          <Form.Label>Adresa</Form.Label>
          <Form.Control
            type='text'
            placeholder='Introduceti adresa'
            value={addressID}
            onChange={(e) => setAddressID(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='name'>
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
          <Form.Group controlId='name'>
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
