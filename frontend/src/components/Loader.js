import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loader = () => {
  return (
    <CircularProgress
      style={{
        width: '50px',
        height: '50px',
        margin: 'auto',
        marginBottom: '10px',
        display: 'block',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </CircularProgress>
  );
};

export default Loader;
