import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from '@material-ui/core';
import { useStyles } from '../design/muiStyles';
import { convertDate } from '../utils/commonFunctions';
const columns = [
  { id: '_id', label: 'Id', minWidth: 220 },
  { id: 'testReportNumber', label: 'Nr.', align: 'center', minWidth: 50 },
  {
    id: 'prelevationDate',
    label: 'Dată prelevare',
    align: 'center',
    minWidth: 140,
  },
  {
    id: 'resultDate',
    label: 'Dată rezultat',
    align: 'center',
    minWidth: 140,
  },
  {
    id: 'labId',
    label: 'Id Lab',
    align: 'center',
    minWidth: 70,
  },
  {
    id: 'status',
    label: 'Rezultat',
    align: 'center',
    minWidth: 110,
  },
];

const TablePatientTests = ({
  tests,
  setAddResultModalShow,
  setCurrentTest,
}) => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className={classes.secondaryMediumColourBg}
                  >
                    {column.label}
                  </TableCell>
                ))}
                {userInfo && userInfo.isLabWorker && (
                  <TableCell
                    key='addResult'
                    align='center'
                    style={{ minWidth: 250 }}
                    className={classes.secondaryMediumColourBg}
                  ></TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {tests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((test) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={test._id}
                    >
                      {columns.map((column) => {
                        var value;

                        if (column.id === 'prelevationDate')
                          value = convertDate(test[column.id]);
                        else if (column.id === 'resultDate')
                          value = test[column.id]
                            ? convertDate(test[column.id])
                            : '-';
                        else value = test[column.id];

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                      {userInfo && userInfo.isLabWorker && !test.resultDate && (
                        <TableCell>
                          <Button
                            variant='contained'
                            className={classes.buttonTable}
                            onClick={() => {
                              setAddResultModalShow(true);
                              setCurrentTest(test._id);
                            }}
                          >
                            Adaugă rezultat
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[8, 16, 32]}
          component='div'
          count={tests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default TablePatientTests;
