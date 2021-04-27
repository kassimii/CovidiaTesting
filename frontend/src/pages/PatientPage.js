import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import AddTestModal from '../components/AddTestModal';
import AddResultModal from '../components/AddResultModal';
import {
  updatePatient,
  getPatientDetails,
} from '../redux/actions/patientActions';
import { getTestsForPatient } from '../redux/actions/testActions';
import { PATIENT_UPDATE_RESET } from '../redux/constants/patientConstants';
import { convertDate } from '../utils/commonFunctions';

const PatientPage = ({ history, match }) => {
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
    temp.email = /\S+@\S+\.\S+/.test(email)
      ? ''
      : 'Adresa de email nu este validă';

    setEmptyFieldError({ ...temp });

    return Object.values(temp).every((x) => x === '');
  };

  const submitHandler = (e) => {
    e.preventDefault();
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
          addressResidence,
        })
      );
  };

  return (
    <>
      <Row>
        <Col>
          <Button
            className='btn btn-light my-3'
            onClick={() => history.goBack()}
          >
            Înapoi
          </Button>
        </Col>
        <Col>
          <Card className='my-3 p-3 rounded'>
            <Col>
              <Card.Header>
                <Row>
                  <Col>
                    <h6>Cod pacient</h6>
                  </Col>
                  <Col>
                    <h6>{patient.patientCode}</h6>
                  </Col>
                </Row>
              </Card.Header>
            </Col>
          </Card>
        </Col>
      </Row>

      <Row>
        {userInfo && userInfo.isPrelevationWorker && (
          <Col md={3}>
            <h2>Date pacient</h2>
            {loadingUpdate && <Loader />}
            {errorUpdate && (
              <Message variant='danger'>A apărut o eroare!</Message>
            )}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>A apărut o eroare!</Message>
            ) : (
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

                <Button type='submit' variant='primary' className='py-3'>
                  Update
                </Button>
              </Form>
            )}
          </Col>
        )}

        <Col>
          <Row>
            <Col>
              <h2>Istoric teste</h2>
            </Col>
            {errorTestCreate && (
              <Message variant='danger'>{errorTestCreate}</Message>
            )}
            {errorTestUpdate && (
              <Message variant='danger'>{errorTestUpdate}</Message>
            )}
            {userInfo && userInfo.isPrelevationWorker && (
              <Col className='text-right'>
                <Button
                  className='my-3'
                  onClick={() => setAddTestModalShow(true)}
                >
                  <i className='fas fa-plus' /> Adauga test
                </Button>
              </Col>
            )}
          </Row>

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

          {loadingTests ? (
            <Loader />
          ) : errorTests ? (
            <Message variant='danger'>{errorTests}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NR.</th>
                  <th>DATA RECOLTARE</th>
                  <th>DATA REZULTAT</th>
                  <th>ID LAB</th>
                  <th>STATUS</th>
                  {userInfo && userInfo.isLabWorker && <th></th>}
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr key={test._id}>
                    <td>{test._id}</td>
                    <td>{test.testReportNumber}</td>
                    <td>{convertDate(test.prelevationDate)}</td>
                    <td>
                      {test.resultDate ? convertDate(test.resultDate) : '-'}
                    </td>
                    <td>{test.labId}</td>
                    <td>{test.status}</td>
                    {userInfo && userInfo.isLabWorker && !test.resultDate && (
                      <td>
                        <Button
                          className='btn-sm'
                          variant='light'
                          onClick={() => {
                            setAddResultModalShow(true);
                            setCurrentTest(test._id);
                          }}
                        >
                          Add result
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default PatientPage;
