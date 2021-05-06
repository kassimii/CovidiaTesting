import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { TextField, Typography, Button, Card, Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from '../design/muiStyles';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { resetPassword, verifyResetLink } from '../redux/actions/userActions';

const ResetPasswordPage = ({ history, match }) => {
  const classes = useStyles();

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

  const userVerifyResetLink = useSelector((state) => state.userVerifyResetLink);
  const {
    error: resetLinkError,
    success: resetLinkSuccess,
  } = userVerifyResetLink;

  useEffect(() => {
    if (userInfo) {
      history.push('/home');
    }

    dispatch(verifyResetLink(userId, token));

    if (resetSuccess) {
      history.push('/login');
    }
  }, [history, userInfo, resetSuccess, dispatch, token, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Parolele nu se potrivesc!');
    } else {
      dispatch(resetPassword(userId, token, password));
    }
  };

  return (
    <>
      {resetLinkError && (
        <Message variant='error'>
          Linkul de resetare a parolei a expirat
        </Message>
      )}

      {resetLinkSuccess && (
        <Box display='flex' justifyContent='center' m={1} p={1}>
          <FormContainer>
            <Card variant='outlined' className={classes.card}>
              <Typography variant='h4' gutterBottom>
                Setați o nouă parolă
              </Typography>

              {message && <Message variant='error'>{message}</Message>}
              {resetError && (
                <Message variant='error'>A apărut o eroare</Message>
              )}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='password'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      required
                      variant='outlined'
                      type='password'
                      label='Parolă nouă'
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </ThemeProvider>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                  <ThemeProvider theme={theme}>
                    <TextField
                      required
                      variant='outlined'
                      type='password'
                      label='Repetă parola'
                      fullWidth
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </ThemeProvider>
                </Form.Group>

                <ThemeProvider theme={theme}>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    className={classes.buttonMd}
                  >
                    Schimbați parola
                  </Button>
                </ThemeProvider>
              </Form>
            </Card>
          </FormContainer>
        </Box>
      )}
    </>
  );
};

export default ResetPasswordPage;
