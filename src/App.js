import React from 'react';

import './App.scss';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/index';
import { Header, Footer } from './components/common/index';

const App = () => {

  return (
    <div className="main-container" >
      <BrowserRouter>
        <Header/>
        <Routes />
        <Footer/>
      </BrowserRouter>
    </div>
    
  );

};

export default App;