import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { sendResetPasswordLink } from '../redux/actions/userActions';
import { USER_FORGOT_PASSWORD_RESET } from '../redux/constants/userConstants';

const ForgotPasswordPage = ({ history }) => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { error: resetError, success: resetSuccess } = userForgotPassword;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }

    return function resetState() {
      dispatch({ type: USER_FORGOT_PASSWORD_RESET });
    };
  }, [history, userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sendResetPasswordLink(email));
  };

  return (
    <FormContainer>
      <h1>Modificare parolă</h1>
      {resetError && (
        <Message variant='danger'>
          Nu există un utilizator cu această adresă de email.
        </Message>
      )}
      {resetSuccess && (
        <Message variant='success'>Verificați-vă emailul!</Message>
      )}
      <Form onSubmit={submitHandler}>
        <p>
          Veți primi un link de resetare a parolei pe adresa de mail introdusă.
        </p>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Introduceti email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='dark'>
          Resetează
        </Button>

        <Row className='py-3'>
          <Col>
            <Link to={`/login`}>Anulare</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default ForgotPasswordPage;
