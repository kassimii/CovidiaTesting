import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
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
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

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
      }
    }

    setTimeout(function () {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }, 20000);
  }, [dispatch, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: userInfo._id, name, email, password }));
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
          <Form.Label>Nume</Form.Label>
          <Form.Control
            type='name'
            placeholder='Introduceti numele'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Introduceti adresa de email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Parola</Form.Label>
          <Form.Control
            type='password'
            placeholder='Parola noua'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirmare parola</Form.Label>
          <Form.Control
            type='password'
            placeholder='Repeta parola'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='dark'>
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfilePage;
