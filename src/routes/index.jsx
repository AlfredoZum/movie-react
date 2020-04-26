import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from '../components/homepage/index';

const Routes = () => (

    <Switch>>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/peliculas' render={ () => <p>Este es la lista de peliculas</p> } />
        { /* <Route render={ () => <p>Pagina no encontrada</p> } /> */ }
        <Redirect to='/' />

    </Switch>

);

export default Routes;
