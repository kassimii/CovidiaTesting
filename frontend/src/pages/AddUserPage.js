import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createUser } from '../redux/actions/userActions';
import { USER_CREATE_RESET } from '../redux/constants/userConstants';

const AddUserPage = ({ match, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPrelevationWorker, setIsPrelevationWorker] = useState(false);
  const [isLabWorker, setIsLabWorker] = useState(false);

  const [emptyFieldError, setEmptyFieldError] = useState({});

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userCreate = useSelector((state) => state.userCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = userCreate;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (successCreate) {
        dispatch({ type: USER_CREATE_RESET });
        history.push('/admin/utilizatori');
      }
    }
  }, [userInfo, dispatch, history, successCreate]);

  const validateForm = () => {
    let temp = {};
    temp.phoneNumber =
      phoneNumber !== ''
        ? phoneNumber.length > 9
          ? ''
          : 'Introduceți un număr de telefon corect'
        : '';
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
        createUser({
          name,
          email,
          phoneNumber,
          isAdmin,
          isPrelevationWorker,
          isLabWorker,
        })
      );
  };

  return (
    <>
      <Link to='/admin/utilizatori' className='btn btn-light my-3'>
        Înapoi
      </Link>

      <FormContainer>
        <h1>Adăugare utilizator</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

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

          <Form.Group controlId='email'>
            <TextField
              required
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

          <Form.Group controlId='phoneNumber'>
            <TextField
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

          <Form.Group controlId='isAdmin'>
            <Form.Label>Rol utilizator</Form.Label>
            <Form.Check
              type='checkbox'
              label='Admin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Form.Group controlId='isPrelevationWorker'>
            <Form.Check
              type='checkbox'
              label='Departament Prelevare'
              checked={isPrelevationWorker}
              onChange={(e) => setIsPrelevationWorker(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Form.Group controlId='isLabWorker'>
            <Form.Check
              type='checkbox'
              label='Laborator'
              checked={isLabWorker}
              onChange={(e) => setIsLabWorker(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button type='submit' variant='dark'>
            Salvare
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default AddUserPage;
