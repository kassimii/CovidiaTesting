import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { convertDate } from '../utils/commonFunctions';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const TableRowAdminLog = ({ adminLogEntry }) => {
  const classes = useRowStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {adminLogEntry._id}
        </TableCell>
        <TableCell align='center'>
          {convertDate(adminLogEntry.createdAt)}
        </TableCell>
        <TableCell align='center'>{adminLogEntry.modifiedBy.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>
                Modificări
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align='center'>Valoare anterioară</TableCell>
                    <TableCell align='center'>Modificare</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adminLogEntry.prevPrelevationDate && (
                    <TableRow>
                      <TableCell>Dată prelevare</TableCell>
                      <TableCell align='center'>
                        {convertDate(adminLogEntry.prevPrelevationDate)}
                      </TableCell>
                      <TableCell align='center'>
                        {convertDate(adminLogEntry.modifiedPrelevationDate)}
                      </TableCell>
                    </TableRow>
                  )}
                  {adminLogEntry.prevResultDate && (
                    <TableRow>
                      <TableCell>Dată rezultat</TableCell>
                      <TableCell align='center'>
                        {convertDate(adminLogEntry.prevResultDate)}
                      </TableCell>
                      <TableCell align='center'>
                        {convertDate(adminLogEntry.modifiedResultDate)}
                      </TableCell>
                    </TableRow>
                  )}
                  {adminLogEntry.prevStatus && (
                    <TableRow>
                      <TableCell>Rezultat</TableCell>
                      <TableCell align='center'>
                        {adminLogEntry.prevStatus}
                      </TableCell>
                      <TableCell align='center'>
                        {adminLogEntry.modifiedStatus}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableRowAdminLog;
