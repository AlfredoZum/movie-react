import React, { Component } from 'react';
import { getMovies } from '../../../services/index';
import './index.scss';
import moment from 'moment';

export default class MoviesList extends Component {

    constructor(){
        super();
        this.state = {
            movies : [],
            isReady: false,
            hasError : false,
            error : null
        }
    };

    componentDidMount = async () => {
        const data = await getMovies();
        if (!data.hasError) {
            this.setState({
                movies : data,
                isReady: true
            });
        } else {
            this.setState({
                hasError: true,
                error: data.error
            });
        };
    };

    render(){

        const {
            movies,
            isReady,
            hasError,
            error
        } = this.state

        return(
            <>
                {
                    isReady ? 
                    <ListComponent 
                        movies={movies}
                    />
                    :
                    hasError ?
                    <ErrorComponent 
                        error={error}
                    />
                    : <LoadingComponent />
                }
            </>
        )
    }

}

const ListComponent = ( props ) => (

    <>
        {
            props.movies.length > 0 ? 
                props.movies.map( (movie) => (
                    <MovieCard 
                        movie = { movie }
                    />
            ))
            : <p>No se encontro ninguna pelicula</p>
        }
    </>

);

const MovieCard = ( { movie } ) => (
    <>
        <div className="movie-card-container" >
            <div className="movie-card-info">
                <div className="movie-card-info-basic-info">
                    <p className="movie-card-title">{movie.title}</p>
                    <p className="movie-card-desc">{movie.description}</p>
                </div>
                <div className="movie-card-detail">
                    <p>
                        Costo de la entrada:
                        <span>
                            { movie.ticketPrice }
                        </span>
                    </p>
                    <p>
                        Duración:
                        <span>
                            { movie.duration } ( min. )
                        </span>
                    </p>
                    <p>
                        Dispoble en cines:
                        <span>
                            { movie.isOnCinema ? 'Si' : 'No' }
                        </span>
                    </p>
                </div>
            </div>
            <div className="movie-card-schedules-container">
                <p>Horarios disponibles</p>
                <div className="movie-card-schedules">
                    {
                        movie.schedules.length > 0 ? 
                            movie.schedules.map( schedule => (
                                <p>{ moment( schedule.time ).format('HH:mm') }</p>
                            ))
                        : <p>No hay horarios disponibles</p>

                    }
                </div>
            </div>
        </div>
    </>
);

const ErrorComponent = ( { error } ) => (
    <>
        <p>Ups! Alfo falló al obtener la lista de peliculas</p>
        <p>{ error }</p>
    </>
);

const LoadingComponent = () => (
    <>
        <p>Cargando...</p>
        <img src="https://i.pinimg.com/originals/a2/dc/96/a2dc9668f2cf170fe3efeb263128b0e7.gif" alt="" />
    </>
);