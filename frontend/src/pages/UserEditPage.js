import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../redux/actions/userActions';
import { USER_UPDATE_RESET } from '../redux/constants/userConstants';

const UserEditPage = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPrelevationWorker, setIsPrelevationWorker] = useState(false);
  const [isLabWorker, setIsLabWorker] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/utilizatori');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        setIsPrelevationWorker(user.isPrelevationWorker);
        setIsLabWorker(user.isLabWorker);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
        isPrelevationWorker,
        isLabWorker,
      })
    );
  };

  return (
    <>
      <Link to='/admin/utilizatori' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit user</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isAdmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='isPrelevationWorker'>
              <Form.Check
                type='checkbox'
                label='Is Prelevation Worker'
                checked={isPrelevationWorker}
                onChange={(e) => setIsPrelevationWorker(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='isLabWorker'>
              <Form.Check
                type='checkbox'
                label='Is Lab Worker'
                checked={isLabWorker}
                onChange={(e) => setIsLabWorker(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primar'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditPage;
