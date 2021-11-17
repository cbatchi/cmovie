import React from 'react';
import 'swiper/swiper.min.css';
import { BrowserRouter, Route } from 'react-router-dom';

import './styles/app.scss';
import Header from './components/header/Header';
import Routes from './config/route.config';
import Footer from './components/footer/Footer';

const App = () => {
  return <BrowserRouter>
    <Route render={props => (
      <>
        <Header {...props} />
        <Routes />
        <Footer />
      </>
    )} />
  </BrowserRouter>
};

export default App;
