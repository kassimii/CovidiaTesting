import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

const Patient = ({ patient }) => {
  return (
    <div>
      <Card className='my-3 p-3 rounded'>
        <Row>
          <Col xs={9} sm={9} md={9} lg={9}>
            <Card.Body>
              <Link to={`/pacienti/${patient._id}`}>
                <Card.Title as='div'>
                  <h4>
                    {patient.name} {patient.surname}
                  </h4>
                </Card.Title>
              </Link>
              <Card.Text as='div'>
                <strong>{patient.cnp}</strong>
              </Card.Text>
            </Card.Body>
          </Col>
          <Col>
            <Button
              className='btn-block '
              type='button'
              xs={3}
              sm={3}
              md={3}
              lg={3}
            >
              Editeaza pacient
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Patient;
