import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Routes = () => (

    <Switch>>
        <Route exact path='/' render={ () => <p>Este es la pagina inicial</p> } />
        <Route exact path='/peliculas' render={ () => <p>Este es la lista de peliculas</p> } />
        { /* <Route render={ () => <p>Pagina no encontrada</p> } /> */ }
        <Redirect to='/' />

    </Switch>

);

export default Routes;
