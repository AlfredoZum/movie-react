import React, { Component } from 'react';
import { createMovie, getMovieDetail, updateMovie } from '../../../services/index';
import { schedulesOptions as SOptions } from '../../../consts/index';
import './index.scss';
import moment from 'moment';
import { toast } from 'react-toastify';

export default class MovieForm extends Component{

    constructor( props ){
        super( props );
        this.state = {
            newMovie : {
                title       : '',
                description : '',
                duration    : 0,
                ticketPrice : '',
                isOnCinemas : false,
                schedules   : []
            },
            schedulesOptions : [],
            isCreate : false,
            isReady : false
        }
    }

    componentDidMount = () => {

        if( this.props.match.params.movieId ){
            try {
                
                const { movieId } = this.props.match.params;
                const data = getMovieDetail( movieId );

                if( !data.hasError ){
                    data.schedules = this.unFormatSchedulesOptions( data.schedule );
                    this.setState({
                        newMovie : data,
                        isReady : true,
                        schedulesOptions : this.filterSchedulesOptions( data.schedules )
                    });
                }

            } catch (error) {
                console.log( error );
            }
        }else{
            this.setState({
                schedulesOptions : SOptions,
                isReady : true,
                isCreate : true,
            });
        }

       
    }

    unFormatSchedulesOptions = ( schedules ) => {
        return schedules.map(schedule => moment( schedule ).format( 'HH:mm' ) );
    }

    handleChange = ( event ) => {
        const { name, value } = event.target;
        const { newMovie } = this.state;
        newMovie[name] = value;
        this.setState({
            newMovie
        });
    } 

    handleChangeIsOnCinemas = ( event ) => {

        const { newMovie } = this.state;
        newMovie.isOnCinemas = event.target.value === 'true' ? true : false;
        this.setState({ newMovie });

    }

    filterSchedulesOptions = ( schedules ) => {
        let { schedulesOptions } = this.state;
        schedulesOptions = SOptions.filter( 
            schedule => !schedules.includes( schedule )
        );
        return schedulesOptions;
    }

    addSchedule = value => {

        const { newMovie } = this.state;
        newMovie.schedules.push( value );
        this.setState({ 
            newMovie,
            schedulesOptions: this.filterSchedulesOptions( newMovie.schedules )
        });

    }

    deleteSchedule = index => {

        const { newMovie } = this.state;
        newMovie.schedules.splice( index, 1 );
        this.setState({ 
            newMovie,
            schedulesOptions: this.filterSchedulesOptions( newMovie.schedules )
        });

    }

    formatSchedulesTime = schedules => {

        return schedules.map( schedule => {
            return {
                time : moment(`${ moment().format( 'YYYY-MM-DD' ) } ${ schedule }`).format( 'YYYY-MM-DD HH:mm' )
            }
        });

    }

    resetForm = () => {
        const { newMovie } = this.state;
        this.setState({ 
            newMovie: {
                title       : '',
                description : '',
                duration    : 0,
                ticketPrice : '',
                isOnCinemas : false,
                schedules   : []
            }
        });
    }

    handleSubmit = async () => {

        const { newMovie, isCreate } = this.state;
        
        try{

            newMovie.schedules = this.formatSchedulesTime( newMovie.schedules );
            newMovie.ticketPrice = parseFloat( newMovie.ticketPrice ).toFixed( 2 );
            newMovie.duration = parseInt( newMovie.duration );

            const result = await createMovie( newMovie );

            if( !result.hasError ){
                toast.success( 'Pelicula creada con exito' );
                this.resetForm();
            }else{
                toast.error( "Ocurrio un error al guardar la pelicula" );
                console.log( result );
            }

        }catch( error ){
            toast.error( "Ocurrio un error al guardar la pelicula" );
            console.log( error );
        }

    }

    render() {
        const {
            title,
            description,
            duration,
            ticketPrice,
            isOnCinemas,
            schedules,
        } = this.state.newMovie;

        const {
            schedulesOptions,
            isCreate,
            isReady
        } = this.state;

        const formTitle = isCreate ? 'Crear película' : 'Editar película';

        const textButton = isCreate ? 'Guardar pelicula' : 'Guardar cambios';

        return(
            <>
                {
                    isReady &&
                        <div className="movies-form-container">
                            <p>{formTitle}</p>
                            <div className="input-data-container">
                                <div className="input-data-container-left">
                                    <input 
                                        type="text"
                                        name="title"
                                        value = {title}
                                        onChange={ (event) => this.handleChange(event) }
                                        placeholder = "Titulo de la pelicula"
                                    />

                                    <textarea
                                        name="description"
                                        value = {description}
                                        onChange={ (event) => this.handleChange(event) }
                                        placeholder = "Description de la pelicula"
                                    ></textarea>

                                    <input 
                                        type="number"
                                        name="duration"
                                        value = {duration}
                                        onChange={ (event) => this.handleChange( event ) }
                                        placeholder = "Duracion de la pelicula (min)"
                                    />
                                    
                                </div>

                                <div className="input-data-container-right">
                                    <input 
                                        type="text"
                                        name="ticketPrice"
                                        value = {ticketPrice}
                                        onChange={ (event) => this.handleChange( event ) }
                                        placeholder = "Precio de la entrada"
                                    />

                                    <select
                                        name="isOnCinemas"
                                        defaultValue = {isOnCinemas}
                                        onChange={ ( event ) => this.handleChangeIsOnCinemas( event )  }
                                    >
                                        <option value="" disabled >Dispoble en cines</option>
                                        <option value="true" >Dispoble</option>
                                        <option value="false" >No dispoble</option>
                                    </select>

                                    <select
                                        name="schedules"
                                        onChange = { ( event ) => this.addSchedule( event.target.value ) }
                                    >
                                        <option value="" defaultValue >Selecciona horarios dispobles</option>
                                        {
                                            schedulesOptions.map( ( schedule ) => (
                                                <option value={schedule} >
                                                    {schedule}
                                                </option>
                                            ))
                                        }
                                    </select>

                                    <div className="schedules-selected-container">
                                        {
                                            schedules.length > 0 ? 
                                                schedules.map( ( schedule, index ) => (
                                                    <div
                                                        key={index}
                                                        className="schedule-item"   
                                                        onClick={ () => this.deleteSchedule( index ) }
                                                    >
                                                        <p className="schedule-front">{schedule}</p>
                                                        <p className="schedule-back">Eliminar</p>

                                                    </div>
                                                ))
                                                : <p>No se han seleccionado horarios</p>
                                        }
                                    </div>

                                </div>
                            </div>
                            <button
                                onClick={ () => this.handleSubmit() }
                            >
                                {textButton}
                            </button>
                        </div>
                }
                
            </>
        );
    }

}