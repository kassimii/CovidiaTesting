import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  updatePatient,
  getPatientDetails,
} from '../redux/actions/patientActions';
import { PATIENT_UPDATE_RESET } from '../redux/constants/patientConstants';

const PatientEditPage = ({ history, match }) => {
  const patientId = match.params.id;

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

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patientDetails = useSelector((state) => state.patientDetails);
  const { loading, error, patient } = patientDetails;

  const patientUpdate = useSelector((state) => state.patientUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = patientUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (successUpdate) {
        dispatch({ type: PATIENT_UPDATE_RESET });
        history.push('/pacienti');
      } else {
        if (!patient.name || patient._id !== patientId) {
          dispatch(getPatientDetails(patientId));
        } else {
          setName(patient.name);
          setSurname(patient.surname);
          setCnp(patient.cnp);
          setAddressID(patient.addressID);
          setPhoneNumber(patient.phoneNumber);
          setEmail(patient.email);
          setAddressResidence(patient.addressResidence);
          if (patient.addressResidence) {
            setDifferentResidenceAddress(true);
          }
        }
      }
    }
  }, [dispatch, history, userInfo, patientId, patient, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePatient({
        _id: patientId,
        name,
        surname,
        cnp,
        addressID,
        phoneNumber,
        email,
        addressResidence,
      })
    );
  };

  return (
    <>
      <Link to='/pacienti' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Date pacient</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default PatientEditPage;
