import React from 'react';

import './App.scss';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/index';
import { Header, Footer } from './components/common/index';

const App = () => {

  return (
    
      <BrowserRouter>
        <Header/>
        <div className="main-container" >
          <Routes />
        </div>
        <Footer/>
      </BrowserRouter>
    
    
  );

};

export default App;