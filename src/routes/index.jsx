import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Homepage from '../components/homepage/index';
import { MovieList, MoviesDetail, MoviesForm } from '../components/movies';

const Routes = () => (

    <Switch>>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/peliculas/crear' component={MoviesForm} />
        <Route exact path='/peliculas/editar/:movieId' component={MoviesForm} />
        <Route exact path='/peliculas/:movieId' component={MoviesDetail} />
        <Route exact path='/peliculas' component={MovieList} />
        { /* <Route render={ () => <p>Pagina no encontrada</p> } /> */ }
        <Redirect to='/' />

    </Switch>

);

export default Routes;
