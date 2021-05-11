import React from 'react';
import { Typography, Grid, Card, CardContent } from '@material-ui/core';
import { useStyles } from '../design/muiStyles';

const StatsCard = ({ oneWeekStats }) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.cardStats}>
        <CardContent>
          <Grid container justify='space-between'>
            <Grid
              item
              xs={10}
              sm={9}
              md={9}
              lg={9}
              xl={9}
              className={`${classes.borderRight} ${classes.paddingStatsCardRight}`}
            >
              <Grid container justify='center' className={classes.borderBottom}>
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
            </Grid>

            <Grid
              item
              xs={2}
              sm={3}
              md={3}
              lg={3}
              xl={3}
              className={classes.paddingStatsCardLeft}
            >
              <Grid container direction='column' justify='flex-end'>
                <Typography
                  variant='h4'
                  gutterBottom
                  align='right'
                  display='block'
                  className={classes.primaryMediumSoftColour}
                >
                  Total
                </Typography>

                <Typography
                  variant='h2'
                  align='left'
                  display='block'
                  className={classes.primaryMediumColour}
                >
                  {oneWeekStats.totalTests}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default StatsCard;
