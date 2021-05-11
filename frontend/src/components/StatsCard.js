import React from 'react';
import { Typography, Grid, Card, CardContent } from '@material-ui/core';
import { useStyles } from '../design/muiStyles';

const StatsCard = ({ oneWeekStats }) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.cardStats}>
        <CardContent>
          <Grid container className={classes.borderBottom}>
            <Typography
              variant='subtitle1'
              gutterBottom
              align='center'
              className={classes.primaryMediumColour}
              style={{ fontWeight: 'bold' }}
            >
              Teste efectuate în ultima săptămână
            </Typography>
          </Grid>

          <Grid container justify='space-around'>
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              className={`${classes.borderRight} ${classes.paddingStatsCard}`}
            >
              <Typography
                variant='body2'
                gutterBottom
                align='right'
                className={classes.primaryMediumSoftColour}
              >
                Pozitive
              </Typography>

              <Typography
                variant='h3'
                align='left'
                className={classes.primaryMediumColour}
              >
                {oneWeekStats.posTests}
              </Typography>
            </Grid>

            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              className={`${classes.borderRight} ${classes.paddingStatsCard}`}
            >
              <Typography
                variant='body2'
                gutterBottom
                align='right'
                className={classes.primaryMediumSoftColour}
              >
                Negative
              </Typography>

              <Typography
                variant='h3'
                align='left'
                className={classes.primaryMediumColour}
              >
                {oneWeekStats.negTests}
              </Typography>
            </Grid>

            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              className={` ${classes.paddingStatsCard}  `}
            >
              <Typography
                variant='body2'
                gutterBottom
                align='right'
                className={classes.primaryMediumSoftColour}
              >
                Neconcludente
              </Typography>

              <Typography
                variant='h3'
                align='left'
                className={classes.primaryMediumColour}
              >
                {oneWeekStats.inconclusiveTests}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default StatsCard;
