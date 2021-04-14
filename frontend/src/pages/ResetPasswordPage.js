import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { resetPassword } from '../redux/actions/userActions';

const ResetPasswordPage = ({ history, match }) => {
  const userId = match.params.userId;
  const token = match.params.token;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { error: resetError, success: resetSuccess } = userResetPassword;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }

    if (resetSuccess) {
      history.push('/login');
    }
  }, [history, userInfo, resetSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Parolele nu se potrivesc!');
    } else {
      dispatch(resetPassword(userId, token, password));
    }
  };

  return (
    <FormContainer>
      <h1>Setați o nouă parolă</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {resetError && <Message variant='danger'>A apărut o eroare</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='password'>
          <Form.Control
            type='password'
            placeholder='Parolă nouă'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='my-3'
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Control
            type='password'
            placeholder='Repetă parola'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='my-3'
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='dark'>
          Schimbați parola
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ResetPasswordPage;
