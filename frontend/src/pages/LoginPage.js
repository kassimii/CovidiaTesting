import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../redux/actions/userActions';
import { USER_RESET_PASSWORD_RESET } from '../redux/constants/userConstants';

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userFirstStepAuth = useSelector((state) => state.userFirstStepAuth);
  const { loading, error, userInfo: userInfoFirstStepAuth } = userFirstStepAuth;

  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { success: resetSuccess } = userResetPassword;

  useEffect(() => {
    if (userInfoFirstStepAuth) {
      history.push('/confirmare-autentificare');
    }

    return function resetState() {
      dispatch({ type: USER_RESET_PASSWORD_RESET });
    };
  }, [history, userInfoFirstStepAuth, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Login</h1>
      {error && (
        <Message variant='danger'>
          Adresa de email sau parola sunt incorecte.
        </Message>
      )}
      {resetSuccess && (
        <Message variant='success'>Parola a fost resetată cu succes!</Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Introduceti email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Parola</Form.Label>
          <Form.Control
            type='password'
            placeholder='Introduceti parola'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='dark'>
          Login
        </Button>

        <Row className='py-3'>
          <Col>
            <Link to={`/parola`}>Parolă uitată?</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
