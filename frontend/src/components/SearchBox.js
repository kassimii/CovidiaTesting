import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Message from '../components/Message';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      (userInfo.isPrelevationWorker && keyword.length === 13) ||
      (userInfo.isLabWorker && keyword.length === 8)
    ) {
      if (keyword.trim()) {
        history.push(`/pacienti/cautare/${keyword}`);
      } else {
        history.push('/');
      }
    } else {
      if (userInfo.isPrelevationWorker)
        setErrorMessage('Introduceți un CNP valid');
      else setErrorMessage('Introduceți un Cod Pacient valid');
    }
  };

  return (
    <>
      {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
      <Form onSubmit={submitHandler} inline>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Cauta pacient'
        ></Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'>
          <i className='fas fa-search'></i>
        </Button>
      </Form>
    </>
  );
};

export default SearchBox;
