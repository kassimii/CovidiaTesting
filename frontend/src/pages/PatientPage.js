import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Table } from 'react-bootstrap';
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
      <Row>
        <Col>
          <Button
            className='btn btn-light my-3'
            onClick={() => history.goBack()}
          >
            Go Back
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
                  <th>DATA RECOLTARE</th>
                  <th>DATA REZULTAT</th>
                  <th>ID LAB</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr key={test._id}>
                    <td>{test._id}</td>
                    <td>{convertDate(test.prelevationDate)}</td>
                    <td>
                      {test.resultDate ? convertDate(test.resultDate) : '-'}
                    </td>
                    <td>{test.labId}</td>
                    <td>{test.status}</td>
                    {userInfo &&
                      (userInfo.isLabWorker ? (
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
                      ) : (
                        userInfo.isPrelevationWorker && (
                          <td>
                            <Button className='btn-sm' variant='light'>
                              Edit
                            </Button>
                          </td>
                        )
                      ))}
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
