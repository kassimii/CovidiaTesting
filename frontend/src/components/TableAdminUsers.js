import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
} from '@material-ui/core';
import { Edit, Delete, CheckCircle } from '@material-ui/icons';
import { useStyles } from '../design/muiStyles';
import { deleteUser } from '../redux/actions/userActions';

const columns = [
  { id: 'name', label: 'Nume', align: 'left', minWidth: 200 },
  {
    id: 'email',
    label: 'Email',
    align: 'left',
    minWidth: 200,
  },
  {
    id: 'isAdmin',
    label: 'Admin',
    align: 'center',
    minWidth: 20,
  },
  {
    id: 'isPrelevationWorker',
    label: 'Prelevare',
    align: 'center',
    minWidth: 20,
  },
  {
    id: 'isLabWorker',
    label: 'Laborator',
    align: 'center',
    minWidth: 20,
  },
];

const TableAdminUsers = ({ users, history }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteHandler = (name, id) => {
    if (window.confirm(`Doriți să stergeți utilizatorul ${name}?`)) {
      dispatch(deleteUser(id));
    }
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
                  align='center'
                  style={{ minWidth: 20 }}
                  className={classes.secondaryMediumColourBg}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={user._id}
                    >
                      {columns.map((column) => {
                        var value;

                        if (
                          (column.id === 'isAdmin' && user.isAdmin) ||
                          (column.id === 'isPrelevationWorker' &&
                            user.isPrelevationWorker) ||
                          (column.id === 'isLabWorker' && user.isLabWorker)
                        )
                          value = <CheckCircle className={classes.green} />;
                        else value = user[column.id];

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}

                      <TableCell align='center'>
                        <IconButton
                          onClick={() =>
                            history.push(
                              `/admin/utilizatori/${user._id}/editare`
                            )
                          }
                        >
                          <Edit />
                        </IconButton>

                        <IconButton
                          onClick={() => deleteHandler(user.name, user._id)}
                        >
                          <Delete className={classes.red} />
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default TableAdminUsers;
