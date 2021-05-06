import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Typography, Button, Card, CardContent, Grid } from '@material-ui/core';
import { AddBox, List, Group, FormatListBulleted } from '@material-ui/icons';
import { useStyles } from '../design/muiStyles';

const HomePage = ({ history }) => {
  const classes = useStyles();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
  }, [history, userInfo]);

  return (
    <>
      {userInfo && (
        <>
          <Grid
            container
            spacing={24}
            style={{ height: window.innerHeight * (4 / 5) }}
          >
            <Card className={classes.cardMenu} variant='outlined'>
              <CardContent>
                <Grid container spacing={24} className={classes.center}>
                  <Grid item>
                    {userInfo && userInfo.isPrelevationWorker ? (
                      <Typography variant='h4' gutterBottom>
                        Prelevare
                      </Typography>
                    ) : userInfo.isLabWorker ? (
                      <Typography variant='h4' gutterBottom>
                        Laborator
                      </Typography>
                    ) : (
                      userInfo.isAdmin && (
                        <Typography variant='h4' gutterBottom>
                          Admin
                        </Typography>
                      )
                    )}
                  </Grid>
                </Grid>
                {userInfo.isPrelevationWorker && (
                  <LinkContainer to='/pacienti/adaugare'>
                    <Grid container spacing={24}>
                      <Grid item className={classes.center}>
                        <Button
                          className={classes.buttonMdSecondaryLight}
                          startIcon={<AddBox />}
                        >
                          Adaugă pacienți
                        </Button>
                      </Grid>
                    </Grid>
                  </LinkContainer>
                )}

                {(userInfo.isPrelevationWorker || userInfo.isLabWorker) && (
                  <LinkContainer to='/pacienti'>
                    <Grid container spacing={24}>
                      <Grid item className={classes.center}>
                        <Button
                          className={classes.buttonMdSecondaryLight}
                          startIcon={<List />}
                        >
                          Pacienți
                        </Button>
                      </Grid>
                    </Grid>
                  </LinkContainer>
                )}

                {userInfo.isAdmin && (
                  <>
                    <LinkContainer to='/admin/utilizatori'>
                      <Grid container spacing={24}>
                        <Grid item className={classes.center}>
                          <Button
                            className={classes.buttonMdSecondaryLight}
                            startIcon={<Group />}
                          >
                            Utilizatori
                          </Button>
                        </Grid>
                      </Grid>
                    </LinkContainer>
                    <LinkContainer to='/admin/teste'>
                      <Grid container spacing={24}>
                        <Grid item className={classes.center}>
                          <Button
                            className={classes.buttonMdSecondaryLight}
                            startIcon={<FormatListBulleted />}
                          >
                            Teste
                          </Button>
                        </Grid>
                      </Grid>
                    </LinkContainer>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
    </>
  );
};

export default HomePage;
