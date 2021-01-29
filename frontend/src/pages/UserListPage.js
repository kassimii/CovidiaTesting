import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listUsers,
  deleteUser,
  createUser,
} from '../redux/actions/userActions';
import { USER_CREATE_RESET } from '../redux/constants/userConstants';

const UserListPage = ({ history }) => {
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

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Utilizatori</h1>
        </Col>
        <Col className='text-right'>
          <LinkContainer to={`/admin/utilizatori/adaugare`}>
            <Button className='my-3'>
              <i className='fas fa-plus' /> Adauga utilizator
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NUME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>LAB WORKER</th>
              <th>PRELEVATION WORKER</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin && (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  )}
                </td>
                <td>
                  {user.isLabWorker && (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  )}
                </td>
                <td>
                  {user.isPrelevationWorker && (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/utilizatori/${user._id}/editare`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListPage;
