import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDF from './PDF';

const PDFwrapper = () => {
  return (
    <div>
      <PDFDownloadLink document={<PDF />} fileName='somename.pdf'>
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Descarca-ma!'
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PDFwrapper;
