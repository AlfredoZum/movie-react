import { API_URL, moviesEndpoint } from '../../consts/index.jsx';
import axios from 'axios';

export const getMovies = async () => {

    try{
        const response = await axios.get(`${API_URL}${moviesEndpoint}`);
        if( response.data ){
            return response.data;
        }
    }catch( error ){
        return {
            hasError : true,
            error
        }     
    }

}

export const getMovieDetail = async ( movieId ) => {

    try{
        const response = await axios.get(`${API_URL}${moviesEndpoint}/${movieId}`);
        if( response.data ){
            return response.data;
        }
    }catch( error ){
        return {
            hasError : true,
            error
        }     
    }

}