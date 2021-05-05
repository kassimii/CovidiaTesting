import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import {
  TextField,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  Box,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from '../design/buttonStyles';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../redux/actions/userActions';
import { USER_RESET_PASSWORD_RESET } from '../redux/constants/userConstants';

const LoginPage = ({ history }) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userFirstStepAuth = useSelector((state) => state.userFirstStepAuth);
  const {
    loading,
    error,
    success: successFirstStepAuth,
    userInfo: userInfoFirstStepAuth,
  } = userFirstStepAuth;

  const userResetPassword = useSelector((state) => state.userResetPassword);
  const { success: resetSuccess } = userResetPassword;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userInfoLogin } = userLogin;

  useEffect(() => {
    if (successFirstStepAuth) {
      history.push('/confirmare-autentificare');
    }

    if (userInfoLogin) {
      history.push('/home');
    }

    return function resetState() {
      dispatch({ type: USER_RESET_PASSWORD_RESET });
    };
  }, [
    history,
    successFirstStepAuth,
    dispatch,
    userInfoFirstStepAuth,
    userInfoLogin,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Box display='flex' justifyContent='center' m={1} p={1}>
      <FormContainer>
        <Card variant='outlined' className={classes.card}>
          <Typography variant='h4' gutterBottom>
            Login
          </Typography>
          {error && (
            <Message variant='error'>
              Adresa de email sau parola sunt incorecte.
            </Message>
          )}
          {resetSuccess && (
            <Message variant='success'>
              Parola a fost resetată cu succes!
            </Message>
          )}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <ThemeProvider theme={theme}>
                <TextField
                  required
                  variant='outlined'
                  label='Email'
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </ThemeProvider>
            </Form.Group>
            <Form.Group controlId='password'>
              <ThemeProvider theme={theme}>
                <TextField
                  required
                  variant='outlined'
                  type='password'
                  label='Parola'
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </ThemeProvider>
            </Form.Group>

            <ThemeProvider theme={theme}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.button}
              >
                Login
              </Button>
            </ThemeProvider>

            <Row className='py-3'>
              <Col>
                <Link to={`/parola`}>
                  <Typography variant='body2' gutterBottom>
                    Parolă uitată?
                  </Typography>
                </Link>
              </Col>
            </Row>
          </Form>
        </Card>
      </FormContainer>
    </Box>
  );
};

export default LoginPage;
