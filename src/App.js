import React from 'react';

import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/index';
import { Header, Footer } from './components/common/index';

const App = () => {

  return (
    <BrowserRouter>
      <Header/>
      <Routes />
      <Footer/>
    </BrowserRouter>
  );

};

export default App;