import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import {
  ArrowDropDown,
  Person,
  Add,
  Group,
  FormatListBulleted,
} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from '../design/muiStyles';
import { logout } from '../redux/actions/userActions';

const MUIHeader = ({ history }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [anchorUserMenu, setAnchorUserMenu] = useState(null);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleUserMenu = (event) => {
    setAnchorUserMenu(event.currentTarget);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setOpen(false);
    setOpenMenu(false);
  };

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  function handleListKeyDownMenu(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenMenu(false);
    }
  }

  const logoutHandler = () => {
    setOpen(false);
    dispatch(logout());
  };

  const prevOpen = useRef(open);
  const prevOpenMenu = useRef(openMenu);

  useEffect(() => {
    prevOpen.current = open;
    prevOpenMenu.current = openMenu;
  }, [open, openMenu]);

  const menuItemsPrelevation = [
    {
      menuTitle: 'Adaugă pacient',
      pageURL: '/pacienti/adaugare',
    },
    {
      menuTitle: 'Pacienți',
      pageURL: '/pacienti',
    },
  ];

  const menuItemsLab = [
    {
      menuTitle: 'Pacienți',
      pageURL: '/pacienti',
    },
  ];

  const menuItemsAdmin = [
    {
      menuTitle: 'Utilizatori',
      pageURL: '/admin/utilizatori',
    },
    {
      menuTitle: 'Teste',
      pageURL: '/admin/teste',
    },
  ];

  return (
    <div className={classes.flexDisplay}>
      <AppBar position='static'>
        <Toolbar className={classes.navbar}>
          <Typography
            variant='h6'
            color='inherit'
            className={
              !userInfo ? classes.navbarTitle : classes.navbarTitleLoggedIn
            }
            onClick={() => {
              userInfo ? history.push('/home') : history.push('/login');
            }}
          >
            Covidia
          </Typography>

          {userInfo && (
            <>
              {isSmallScreen ? (
                <>
                  <div className={classes.flexDisplay}>
                    <Button
                      ref={anchorUserMenu}
                      aria-controls={openMenu ? 'menu-list-grow' : undefined}
                      aria-haspopup='true'
                      onClick={handleMenu}
                    >
                      <MenuIcon />
                    </Button>
                    <Popper
                      open={openMenu}
                      anchorEl={anchorMenu}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === 'bottom'
                                ? 'center top'
                                : 'center bottom',
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleMenuClick}>
                              <MenuList
                                autoFocusItem={openMenu}
                                id='menu-list-grow'
                                onKeyDown={handleListKeyDownMenu}
                              >
                                {userInfo.isPrelevationWorker &&
                                  menuItemsPrelevation.map((menuItem) => {
                                    const { menuTitle, pageURL } = menuItem;
                                    return (
                                      <MenuItem
                                        key={menuTitle}
                                        onClick={() => handleMenuClick(pageURL)}
                                      >
                                        {menuTitle}
                                      </MenuItem>
                                    );
                                  })}

                                {userInfo.isLabWorker &&
                                  menuItemsLab.map((menuItem) => {
                                    const { menuTitle, pageURL } = menuItem;
                                    return (
                                      <MenuItem
                                        key={menuTitle}
                                        onClick={() => handleMenuClick(pageURL)}
                                      >
                                        {menuTitle}
                                      </MenuItem>
                                    );
                                  })}

                                {userInfo.isAdmin &&
                                  menuItemsAdmin.map((menuItem) => {
                                    const { menuTitle, pageURL } = menuItem;
                                    return (
                                      <MenuItem
                                        key={menuTitle}
                                        onClick={() => handleMenuClick(pageURL)}
                                      >
                                        {menuTitle}
                                      </MenuItem>
                                    );
                                  })}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                </>
              ) : (
                <div className={classes.flexDisplay}>
                  <>
                    {userInfo.isPrelevationWorker && (
                      <Button
                        startIcon={<Add />}
                        className={classes.navbarButton}
                        onClick={() => handleButtonClick('/pacienti/adaugare')}
                      >
                        Adaugă pacienți
                      </Button>
                    )}

                    {(userInfo.isPrelevationWorker || userInfo.isLabWorker) && (
                      <Button
                        startIcon={<FormatListBulleted />}
                        className={classes.navbarButton}
                        onClick={() => handleButtonClick('/pacienti')}
                      >
                        Pacienți
                      </Button>
                    )}

                    {userInfo.isAdmin && (
                      <>
                        <Button
                          startIcon={<Group />}
                          className={classes.navbarButton}
                          onClick={() =>
                            handleButtonClick('/admin/utilizatori')
                          }
                        >
                          Utilizatori
                        </Button>

                        <Button
                          startIcon={<FormatListBulleted />}
                          className={classes.navbarButton}
                          onClick={() => handleButtonClick('/admin/teste')}
                        >
                          Teste
                        </Button>
                      </>
                    )}
                  </>
                </div>
              )}
            </>
          )}

          {userInfo ? (
            <div>
              <Button
                ref={anchorUserMenu}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                startIcon={
                  <ArrowDropDown className={classes.secondaryLightColour} />
                }
                onClick={handleUserMenu}
              >
                <Typography
                  variant='body2'
                  className={classes.secondaryLightColour}
                >
                  {userInfo.name}
                </Typography>
              </Button>
              <Popper
                open={open}
                anchorEl={anchorUserMenu}
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
                      <ClickAwayListener onClickAway={handleMenuClick}>
                        <MenuList
                          autoFocusItem={open}
                          id='menu-list-grow'
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={() => handleMenuClick('/profil')}>
                            Profil
                          </MenuItem>

                          <MenuItem onClick={logoutHandler}>
                            Deconectare
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          ) : (
            <Button
              color='inherit'
              startIcon={<Person />}
              onClick={() => {
                history.push('/login');
              }}
            >
              Autentificare
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(MUIHeader);
