import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles } from '../design/muiStyles';

const PatientCode = ({ patient }) => {
  const classes = useStyles();

  return (
    <div className={classes.center}>
      <Card className={classes.cardPatient} variant='outlined'>
        <CardContent className={classes.flexDisplay}>
          <Typography variant='h5' gutterBottom>
            {patient.patientCode}
          </Typography>
        </CardContent>
        <CardActions>
          <ThemeProvider theme={theme}>
            <LinkContainer
              to={`/pacienti/detalii/${patient._id}`}
              style={{ height: 45 }}
            >
              <Button
                className='btn-block'
                color='primary'
                variant='contained'
                type='button'
                xs={3}
                sm={3}
                md={3}
                lg={3}
              >
                Detalii
              </Button>
            </LinkContainer>
          </ThemeProvider>
        </CardActions>
      </Card>
    </div>
  );
};

export default PatientCode;
