import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

const Header = () => (
    <>
        <header className="header-container" >
            <ul>
                <li><Link to='/'>Inicio</Link></li>
                <li><Link to='/movie'>Películas</Link></li>
                <li><Link to='/movie/create'>Crear Película</Link></li>
            </ul> 
            <div className="search-container" >
                <input type="text" name="search" placeholder="Buscar pelicula" />
                <button>Buscar</button>    
            </div>   
        </header> 
    </>
);

export default Header;