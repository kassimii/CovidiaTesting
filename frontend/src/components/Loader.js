import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../design/muiStyles';

const Loader = () => {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
};

export default Loader;
