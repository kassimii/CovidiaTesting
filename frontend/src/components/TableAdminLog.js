import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { useStyles } from '../design/muiStyles';
import TableRowAdminLog from '../components/TableRowAdminLog';

const TableAdminLog = ({ adminLog }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.fullWidth}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell
              padding='checkbox'
              className={classes.secondaryMediumColourBg}
            />
            <TableCell className={classes.secondaryMediumColourBg}>
              ID TEST
            </TableCell>
            <TableCell
              align='center'
              className={classes.secondaryMediumColourBg}
            >
              DATA MODIFICARE
            </TableCell>
            <TableCell
              align='center'
              className={classes.secondaryMediumColourBg}
            >
              MODIFICAT DE
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminLog.map((adminLogEntry) => {
            return (
              <TableRowAdminLog
                key={adminLogEntry._id}
                adminLogEntry={adminLogEntry}
              />
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TableAdminLog;
