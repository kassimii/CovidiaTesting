import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import PatientFormPage from './pages/PatientFormPage';
import PatientListPage from './pages/PatientListPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import AddUserPage from './pages/AddUserPage';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/admin/utilizatori' component={UserListPage} exact />
          <Route path='/admin/utilizatori/adaugare' component={AddUserPage} />
          <Route
            path='/admin/utilizatori/:id/editare'
            component={UserEditPage}
          />
          <Route path='/login' component={LoginPage} />
          <Route path='/pacienti/adaugare' component={PatientFormPage} />
          <Route path='/pacienti' component={PatientListPage} exact />
          <Route path='/profil' component={ProfilePage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
