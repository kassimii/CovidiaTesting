import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { InputBase } from '@material-ui/core';
import { useStyles } from '../design/muiStyles';
import { Search } from '@material-ui/icons';
import Message from '../components/Message';

const SearchBox = ({ history }) => {
  const classes = useStyles();

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
      {errorMessage && <Message variant='error'>{errorMessage}</Message>}
      <Form onSubmit={submitHandler} inline className='my-3'>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <InputBase
            placeholder='Căutare...'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </Form>
    </>
  );
};

export default SearchBox;
