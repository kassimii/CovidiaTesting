import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import PatientFormPage from './pages/PatientFormPage';
import PatientListPage from './pages/PatientListPage';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/pacienti/adaugare' component={PatientFormPage} />
          <Route path='/pacienti/' component={PatientListPage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
