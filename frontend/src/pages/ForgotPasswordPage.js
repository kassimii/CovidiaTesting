import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { TextField, InputLabel } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Recaptcha from 'react-recaptcha';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { sendResetPasswordLink } from '../redux/actions/userActions';
import { USER_FORGOT_PASSWORD_RESET } from '../redux/constants/userConstants';

const { REACT_APP_RECAPTCHA_SITE_KEY } = process.env;

const ForgotPasswordPage = ({ history }) => {
  const [email, setEmail] = useState('');
  const [isHuman, setIsHuman] = useState(false);
  const [message, setMessage] = useState('');
  const [emptyFieldError, setEmptyFieldError] = useState({});

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
      setMessage('');
    };
  }, [history, userInfo, dispatch]);

  const validateForm = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(email)
      ? ''
      : 'Adresa de email nu este validă';

    setEmptyFieldError({ ...temp });

    return Object.values(temp).every((x) => x === '');
  };

  const verifyCallback = (response) => {
    if (response) {
      setIsHuman(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (isHuman) {
      if (validateForm()) {
        setMessage('');
        dispatch(sendResetPasswordLink(email));
      }
    } else {
      setMessage('Vă rugăm să confirmați că sunteți o persoană reală.');
    }
  };

  return (
    <FormContainer>
      <h1>Modificare parolă</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {resetError && (
        <Message variant='danger'>
          Nu există un utilizator cu această adresă de email.
        </Message>
      )}
      {resetSuccess && (
        <Message variant='success'>Verificați-vă emailul!</Message>
      )}
      <Form onSubmit={submitHandler}>
        <InputLabel>
          Veți primi un link de resetare a parolei pe adresa de email introdusă.
        </InputLabel>

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

        <Recaptcha
          sitekey={REACT_APP_RECAPTCHA_SITE_KEY}
          render='explicit'
          onloadCallback={() => {
            console.log('reCAPTCHA successfully loaded');
          }}
          verifyCallback={verifyCallback}
        />

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
