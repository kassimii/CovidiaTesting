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
import { getUserDetails, updateUser } from '../redux/actions/userActions';
import { USER_UPDATE_RESET } from '../redux/constants/userConstants';

const UserEditPage = ({ match, history }) => {
  const classes = useStyles();

  const userId = match.params.id;

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

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

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

  const setRadioValue = () => {
    if (user.isPrelevationWorker) {
      setValue('isPrelevationWorker');
    }
    if (user.isLabWorker) {
      setValue('isLabWorker');
    }
    if (user.isAdmin) {
      setValue('isAdmin');
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validateForm())
      dispatch(
        updateUser({
          _id: userId,
          name,
          email,
          phoneNumber,
          isAdmin,
          isPrelevationWorker,
          isLabWorker,
        })
      );
  };

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
      return;
    } else {
      if (successUpdate) {
        dispatch({ type: USER_UPDATE_RESET });
        history.push('/admin/utilizatori');
      } else {
        if (!user.name || user._id !== userId) {
          dispatch(getUserDetails(userId));
        } else {
          setName(user.name);
          setEmail(user.email);
          setPhoneNumber(user.phoneNumber);
          setIsAdmin(user.isAdmin);
          setIsPrelevationWorker(user.isPrelevationWorker);
          setIsLabWorker(user.isLabWorker);
          setRadioValue();
        }
      }
    }
  }, [userInfo, dispatch, history, userId, user, successUpdate]);

  return (
    <>
      <FormContainer>
        <Typography variant='h4' gutterBottom className='my-4'>
          Editare utilizator
        </Typography>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='error'>A apărut o eroare!</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='error'>A apărut o eroare!</Message>
        ) : (
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
        )}
      </FormContainer>
    </>
  );
};

export default UserEditPage;
