import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import PatientFormPage from './pages/PatientFormPage';
import PatientListPage from './pages/PatientListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/inregistrare' component={RegisterPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/pacienti/adaugare' component={PatientFormPage} />
          <Route path='/pacienti/' component={PatientListPage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
