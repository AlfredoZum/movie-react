import React, { Component } from 'react';
import { getMovieDetail } from '../../../services/index';
import './index.scss';

export default class MoviesDetail extends Component {

    constructor( props ){
        super( props );
        this.state = {
            movie : {},
            isReady: false,
            hasError : false,
            error : null
        }
    };

    componentDidMount = async () => {
        try{
            const movieId = this.props.match.params.movieId;
        if( !movieId ){
            this.setState({
                hasError : true,
                error : 'No se encontro identificador de la pelicula'
            });
        }else{
            const response = await getMovieDetail( movieId );
            if( !response.hasError ){
                this.setState({
                    movie : response,
                    isReady: true
                });
            }else{
                throw Error( '' );
            }
        }
        }catch( error ){
            this.setState({
                hasError : true,
                error : `No se encontro identificador de la pelicula: ${error}`
            });
        }
        //const data = await getMovies();
    }

    render(){

        const {
            movie,
            isReady,
            hasError,
            error
        } = this.state

        return(
            <>
              {
                    isReady ? 
                        <DetailMovie 
                            movie = { movie }
                        />
                    : hasError ? 
                        <ErrorComponent 
                            error = { error }
                        />
                    : <LoadingComponent />
              }  
            </>
        );
    }

}

const DetailMovie = ( { movie } ) => (
    <>
        <div className="movie-detail-container">
            <div className="movie-detail-header">
                <img src="https://media.comicbook.com/files/img/default-movie.png" alt="default" />
                <p>{ movie.title }</p>
            </div>
            <div className="movie-detail-body">
                <div className="movie-detail-body-left">
                    <p className="sinopsis">Sinopsis:</p>
                    <p className="movie-description">
                        { movie.description }
                    </p>
                </div>
                <div className="movie-detail-body-right">
                    <p>
                        Costo de la entrada
                        <span> { parseFloat( movie.ticketPrice ).toFixed( 2 ) } </span>
                    </p>
                    <p>
                        Duración ( min )
                        <span> { movie.duraction } </span>
                    </p>
                    <p className="isOnCinema" >
                        {
                            movie.isOnCinemas ? 
                                'En Cartelera' 
                                : 'No dispopnible en la cartelera'
                        }
                    </p>
                </div>
            </div>
            <div className="movie-detail-actions">
                <button className="action-button edit-movie" >
                    Editar pelicula
                </button>
                <button className="action-button delete-movie"  >
                    Eliminar pelicula
                </button>
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