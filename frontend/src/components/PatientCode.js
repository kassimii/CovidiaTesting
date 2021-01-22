import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

const PatientCode = ({ patient }) => {
  return (
    <div>
      <Card className='my-3 p-3 rounded'>
        <Row>
          <Col xs={9} sm={9} md={9} lg={9}>
            <Card.Body>
              <Link to={`/pacienti/detalii/${patient._id}`}>
                <Card.Title as='div'>
                  <h4>{patient.patientCode}</h4>
                </Card.Title>
              </Link>
            </Card.Body>
          </Col>
          <Col>
            <LinkContainer to={`/pacienti/detalii/${patient._id}`}>
              <Button
                className='btn-block '
                type='button'
                xs={3}
                sm={3}
                md={3}
                lg={3}
              >
                Detalii
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default PatientCode;
