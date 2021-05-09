import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
} from '@material-ui/core';
import TableRowAdminLog from '../components/TableRowAdminLog';
import Message from '../components/Message';
import { getAdminLogList } from '../redux/actions/adminLogActions';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

const AdminLogPage = ({ history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminLogList = useSelector((state) => state.adminLogList);
  const { loading, error, adminLog } = adminLogList;

  useEffect(() => {
    console.log('here');
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAdminLogList());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Row>
        <Col>
          <Button onClick={() => history.goBack()}>Înapoi</Button>
        </Col>
      </Row>

      <Row>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Message variant='error'>A apărut o eroare!</Message>
        ) : (
          <Paper className={classes.root}>
            <Table className={classes.table} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell padding='checkbox' />
                  <TableCell>ID TEST</TableCell>
                  <TableCell align='right'>DATA MODIFICARE</TableCell>
                  <TableCell align='right'>MODIFICAT DE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminLog &&
                  adminLog.map((adminLogEntry) => (
                    <TableRowAdminLog
                      key={adminLogEntry._id}
                      adminLogEntry={adminLogEntry}
                    />
                  ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Row>
    </>
  );
};

export default AdminLogPage;
