import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import { useStyles } from '../design/muiStyles';
import { logout } from '../redux/actions/userActions';

const Header = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar className={classes.navbar} expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to={userInfo ? '/home' : '/'}>
            <Navbar.Brand>
              <Typography variant='h6' className={classes.lightLettering}>
                Covidia
              </Typography>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            {userInfo && (
              <Nav className='mr-auto'>
                {userInfo.isPrelevationWorker && (
                  <LinkContainer to='/pacienti/adaugare'>
                    <Nav.Link>
                      <i className='fas fa-plus-square px-1'></i>
                      Adauga pacient
                    </Nav.Link>
                  </LinkContainer>
                )}

                {(userInfo.isPrelevationWorker || userInfo.isLabWorker) && (
                  <LinkContainer to='/pacienti'>
                    <Nav.Link>
                      <i className='fas fa-list'></i>Pacienti
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            )}

            <Nav className='ml-auto'>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profil'>
                    <NavDropdown.Item>Profil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i>
                    Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/utilizatori'>
                    <NavDropdown.Item>Utilizatori</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/teste'>
                    <NavDropdown.Item>Teste</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
