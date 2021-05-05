import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import PatientFormPage from './pages/PatientFormPage';
import PatientListPage from './pages/PatientListPage';
import LoginPage from './pages/LoginPage';
import SecondStepAuthPage from './pages/SecondStepAuthPage';
import ProfilePage from './pages/ProfilePage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import AddUserPage from './pages/AddUserPage';
import PatientPage from './pages/PatientPage';
import TestListPage from './pages/TestListPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import HomePage from './pages/HomePage';
import AdminLogPage from './pages/AdminLogPage';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={LoginPage} exact />
          <Route path='/admin/log' component={AdminLogPage} />
          <Route path='/admin/teste' component={TestListPage} exact />
          <Route
            path='/admin/teste/pagina/:pageNumber'
            component={TestListPage}
          />
          <Route path='/admin/utilizatori' component={UserListPage} exact />
          <Route
            path='/admin/utilizatori/pagina/:pageNumber'
            component={UserListPage}
            exact
          />
          <Route
            path='/admin/utilizatori/adaugare'
            component={AddUserPage}
            exact
          />
          <Route
            path='/admin/utilizatori/:id/editare'
            component={UserEditPage}
          />
          <Route
            path='/confirmare-autentificare'
            component={SecondStepAuthPage}
          />
          <Route path='/home' component={HomePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/pacienti/adaugare' component={PatientFormPage} exact />
          <Route path='/pacienti' component={PatientListPage} exact />
          <Route
            path='/pacienti/pagina/:pageNumber'
            component={PatientListPage}
          />
          <Route path='/pacienti/detalii/:id' component={PatientPage} exact />
          <Route
            path='/pacienti/cautare/:keyword'
            component={PatientListPage}
          />
          <Route path='/parola' component={ForgotPasswordPage} />
          <Route path='/profil' component={ProfilePage} />
          <Route
            path='/resetare-parola/:userId/:token'
            component={ResetPasswordPage}
          />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
