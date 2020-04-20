import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

const Header = () => (
    <div>
        <header className="header-container" >
            <ul>
                <li to='/' ><Link>Inicio</Link></li>
                <li to='/movie'><Link>Películas</Link></li>
                <li to='/movie/create'><Link>Crear Película</Link></li>
            </ul> 
            <div className="search-container" >
                <input type="text" name="search" placeholder="Buscar pelicula" />
                <button>Buscar</button>    
            </div>   
        </header> 
    </div>
);

export default Header;