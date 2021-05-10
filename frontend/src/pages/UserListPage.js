import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Button, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from '../design/muiStyles';
import Message from '../components/Message';
import Loader from '../components/Loader';
import TableAdminUsers from '../components/TableAdminUsers';
import { listUsers, createUser } from '../redux/actions/userActions';
import { USER_CREATE_RESET } from '../redux/constants/userConstants';

const UserListPage = ({ history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = userDelete;

  const userCreate = useSelector((state) => state.userCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = userCreate;

  useEffect(() => {
    dispatch({ type: USER_CREATE_RESET });
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/utilizatori/${createUser._id}/editare`);
    }
  }, [dispatch, history, userInfo, successDelete, successCreate]);

  return (
    <>
      <Grid container justify='space-between' className='my-4'>
        <Grid item>
          <Typography variant='h4' gutterBottom className='my-2'>
            Utilizatori
          </Typography>
        </Grid>
        <Grid item>
          <ThemeProvider theme={theme}>
            <Button
              variant='contained'
              color='primary'
              className={classes.buttonLg}
              onClick={() => history.push('/admin/utilizatori/adaugare')}
            >
              Adaugă utilizator
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='error'>A apărut o eroare!</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='error'>A apărut o eroare!</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='error'>A apărut o eroare!</Message>
      ) : (
        <>
          <TableAdminUsers users={users} history={history} />
        </>
      )}
    </>
  );
};

export default UserListPage;
