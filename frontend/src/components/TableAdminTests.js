import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Button,
  CircularProgress,
} from '@material-ui/core';
import {
  Edit,
  CheckCircle,
  RemoveCircleOutline,
  MoreVert,
} from '@material-ui/icons';
import { useStyles } from '../design/muiStyles';
import {
  sendTestPatientPDF,
  downloadPatientPDF,
} from '../redux/actions/testActions';
import { convertDate } from '../utils/commonFunctions';

const columns = [
  { id: '_id', label: 'Id test', align: 'left', minWidth: 200 },
  { id: 'testReportNumber', label: 'Nr.', align: 'center', minWidth: 20 },
  {
    id: 'patientCode',
    label: 'Cod pacient',
    align: 'center',
    minWidth: 120,
  },
  {
    id: 'prelevationDate',
    label: 'Dată recoltare',
    align: 'center',
    minWidth: 170,
  },
  {
    id: 'resultDate',
    label: 'Dată rezultat',
    align: 'center',
    minWidth: 170,
  },
  {
    id: 'status',
    label: 'Rezultat',
    align: 'center',
    minWidth: 120,
  },
  {
    id: 'labId',
    label: 'Lab ID',
    align: 'center',
    minWidth: 90,
  },
  {
    id: 'sentToDSP',
    label: 'Generat DSP',
    align: 'center',
    minWidth: 100,
  },
  {
    id: 'sentToPatient',
    label: 'Email pacient',
    align: 'center',
    minWidth: 100,
  },
];

const TableAdminTests = ({
  tests,
  doctor,
  setCurrentTest,
  setTestInfoShow,
  setTestEditShow,
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const testPatientPdf = useSelector((state) => state.testPatientPdf);
  const { loading: loadingPatientPdf } = testPatientPdf;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentSendingTest, setCurrentSendingTest] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const sentToPatientValue = (test) => {
    if (currentSendingTest === test._id && loadingPatientPdf)
      return <CircularProgress />;

    if (test.sentToPatient) return <CheckCircle className={classes.green} />;
    else {
      if (test.patient.email) {
        return (
          test.status !== '-' &&
          doctor !== '-' && (
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                setCurrentSendingTest(test._id);
                dispatch(sendTestPatientPDF(test._id, doctor));
              }}
            >
              TRIMITE
            </Button>
          )
        );
      } else {
        return <RemoveCircleOutline className={classes.red} />;
      }
    }
  };

  return (
    <>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell
                  key='info'
                  padding='checkbox'
                  className={classes.secondaryMediumColourBg}
                />
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                    }}
                    className={classes.secondaryMediumColourBg}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  key='addResult'
                  padding='checkbox'
                  className={classes.secondaryMediumColourBg}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {tests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((test) => {
                  return (
                    <TableRow hover role='checkbox' key={test._id}>
                      <TableCell align='center'>
                        <IconButton
                          onClick={() => {
                            if (
                              test.status !== '-' &&
                              test.sentToPatient === true
                            ) {
                              dispatch(downloadPatientPDF(test._id));
                            }
                            setCurrentTest(test);
                            setTestInfoShow(true);
                          }}
                        >
                          <MoreVert />
                        </IconButton>
                      </TableCell>

                      {columns.map((column) => {
                        var value;
                        switch (column.id) {
                          case 'patientCode':
                            value = test.patient.patientCode;
                            break;
                          case 'prelevationDate':
                            value = convertDate(test[column.id]);
                            break;
                          case 'resultDate':
                            value = test[column.id]
                              ? convertDate(test[column.id])
                              : '-';
                            break;
                          case 'sentToDSP':
                            if (test.sentToDSP)
                              value = <CheckCircle className={classes.green} />;
                            break;
                          case 'sentToPatient':
                            value = sentToPatientValue(test);
                            break;
                          default:
                            value = test[column.id];
                            break;
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}

                      <TableCell align='center'>
                        <IconButton
                          onClick={() => {
                            setCurrentTest(test);
                            setTestEditShow(true);
                          }}
                        >
                          <Edit className={classes.secondaryMediumColour} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
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

export default TableAdminTests;
