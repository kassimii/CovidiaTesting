import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  getUserDetails,
  updateUserProfile,
} from '../redux/actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstants';

const ProfilePage = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const [emptyFieldError, setEmptyFieldError] = useState({});

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: successUpdate } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!userInfo.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPhoneNumber(userInfo.phoneNumber);
      }
    }

    setTimeout(function () {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }, 20000);
  }, [dispatch, history, userInfo]);

  const validateForm = () => {
    let temp = {};
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
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      if (validateForm())
        dispatch(
          updateUserProfile({
            id: userInfo._id,
            name,
            email,
            phoneNumber,
            password,
          })
        );
    }
  };

  return (
    <FormContainer>
      <h2 className='py-3'>User profile</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {successUpdate && <Message variant='success'>Profil actualizat!</Message>}
      {loading && <Loader />}
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

        <Form.Group controlId='password'>
          <TextField
            variant='outlined'
            type='password'
            label='Parolă nouă'
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <TextField
            variant='outlined'
            type='password'
            label='Confirmă parola'
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button type='submit' variant='dark'>
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfilePage;
