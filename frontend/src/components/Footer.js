import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Typography } from '@material-ui/core';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <Typography variant='body2'>Copyright &copy; Covidia</Typography>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
