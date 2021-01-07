import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createUser } from '../redux/actions/userActions';
import { USER_CREATE_RESET } from '../redux/constants/userConstants';

const AddUserPage = ({ match, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPrelevationWorker, setIsPrelevationWorker] = useState(false);
  const [isLabWorker, setIsLabWorker] = useState(false);

  const dispatch = useDispatch();

  const userCreate = useSelector((state) => state.userCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = userCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: USER_CREATE_RESET });
      history.push('/admin/utilizatori');
    }
  }, [dispatch, history, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createUser({
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
        <h1>Adaugare utilizator</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

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
            Salvare
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default AddUserPage;
