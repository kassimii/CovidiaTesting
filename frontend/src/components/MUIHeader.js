import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from '../design/muiStyles';
import { LinkContainer } from 'react-router-bootstrap';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from '@material-ui/core';
import { Menu, ArrowDropDown } from '@material-ui/icons';
import { logout } from '../redux/actions/userActions';

const MUIHeader = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const logoutHandler = () => {
    handleClose();
    dispatch(logout());
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.flexDisplay}>
      <AppBar position='static'>
        <Toolbar>
          <Menu className={classes.menuButton} />
          <LinkContainer to={userInfo ? '/home' : '/'}>
            <Typography variant='h6' className={classes.title} color='inherit'>
              Covidia
            </Typography>
          </LinkContainer>

          {userInfo ? (
            <div>
              <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                startIcon={<ArrowDropDown />}
                onClick={handleToggle}
              >
                {userInfo.name}
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id='menu-list-grow'
                          onKeyDown={handleListKeyDown}
                        >
                          <LinkContainer to='/profil'>
                            <MenuItem onClick={handleClose}>Profil</MenuItem>
                          </LinkContainer>
                          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          ) : (
            <LinkContainer to='/login'>
              <Button color='inherit'>Login</Button>
            </LinkContainer>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MUIHeader;
