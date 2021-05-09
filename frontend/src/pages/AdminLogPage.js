import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import { useStyles } from '../design/muiStyles';
import Loader from '../components/Loader';
import Message from '../components/Message';
import TableAdminLog from '../components/TableAdminLog';
import { getAdminLogList } from '../redux/actions/adminLogActions';

const AdminLogPage = ({ history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminLogList = useSelector((state) => state.adminLogList);
  const { loading, error, adminLog } = adminLogList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAdminLogList());
    } else {
      history.push('/login');
    }
  }, [dispatch, userInfo, history]);

  return (
    <>
      <Grid container className='my-3'>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Button
            className={classes.buttonBack}
            onClick={() => history.goBack()}
          >
            Înapoi
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='error'>A apărut o eroare!</Message>
        ) : (
          <TableAdminLog adminLog={adminLog} />
        )}
      </Grid>
    </>
  );
};

export default AdminLogPage;
