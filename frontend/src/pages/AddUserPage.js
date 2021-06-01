import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from '../design/muiStyles';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createUser } from '../redux/actions/userActions';
import { USER_CREATE_RESET } from '../redux/constants/userConstants';

const AddUserPage = ({ history }) => {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPrelevationWorker, setIsPrelevationWorker] = useState(false);
  const [isLabWorker, setIsLabWorker] = useState(false);
  const [value, setValue] = useState('');

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
        ? phoneNumber.length > 9 && phoneNumber.length < 16
          ? ''
          : 'Introduceți un număr de telefon corect'
        : '';
    temp.email = /\S+@\S+\.\S+/.test(email)
      ? ''
      : 'Adresa de email nu este validă';
    temp.role = value === '' ? 'Alegeți un rol utilizator' : '';

    setEmptyFieldError({ ...temp });

    return Object.values(temp).every((x) => x === '');
  };

  const handleRadioChange = (event) => {
    setValue(event.target.value);

    switch (event.target.value) {
      case 'isPrelevationWorker':
        setIsPrelevationWorker(true);
        setIsLabWorker(false);
        setIsAdmin(false);
        break;

      case 'isLabWorker':
        setIsPrelevationWorker(false);
        setIsLabWorker(true);
        setIsAdmin(false);
        break;

      case 'isAdmin':
        setIsPrelevationWorker(false);
        setIsLabWorker(false);
        setIsAdmin(true);
        break;

      default:
        break;
    }
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
      <FormContainer>
        <Typography variant='h4' gutterBottom className='my-4'>
          Adăugare utilizator
        </Typography>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='error'>{errorCreate}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <ThemeProvider theme={theme}>
              <TextField
                required
                variant='outlined'
                label='Nume'
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </ThemeProvider>
          </Form.Group>

          <Form.Group controlId='email'>
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
          </Form.Group>

          <Form.Group controlId='phoneNumber'>
            <ThemeProvider theme={theme}>
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
            </ThemeProvider>
          </Form.Group>

          <Grid container>
            <ThemeProvider theme={theme}>
              <FormControl
                component='fieldset'
                {...(emptyFieldError.role && {
                  error: true,
                })}
              >
                <FormLabel component='legend'>Rol utilizator</FormLabel>
                <RadioGroup
                  aria-label='role'
                  name='role'
                  value={value}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value='isPrelevationWorker'
                    control={<Radio color='primary' />}
                    label='Departament prelevare'
                  />
                  <FormControlLabel
                    value='isLabWorker'
                    control={<Radio color='primary' />}
                    label='Laborator'
                  />
                  <FormControlLabel
                    value='isAdmin'
                    control={<Radio color='primary' />}
                    label='Admin'
                  />
                </RadioGroup>
                <FormHelperText>
                  {emptyFieldError.role && emptyFieldError.role}
                </FormHelperText>
              </FormControl>
            </ThemeProvider>
          </Grid>

          <Grid container>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <ThemeProvider theme={theme}>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  className={classes.buttonHalf}
                >
                  Salvare
                </Button>
              </ThemeProvider>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <Button
                variant='outlined'
                color='primary'
                className={classes.buttonHalf}
                onClick={() => history.goBack()}
              >
                Anulare
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormContainer>
    </>
  );
};

export default AddUserPage;
