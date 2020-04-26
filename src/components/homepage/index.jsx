import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';

const Homepage = () => (
    <>
        <div className="welcome-container" >
            <img src={Logo} className="welcome-logo"  alt="Logo movie" />
            <p className="welcome-test" >
                Bienvenid@ a este tu cine en casa
            </p>
            <button className="welcome-button" >
                <Link to="/peliculas" >
                Ver peliculas
                </Link>
            </button>
        </div>
    </>
);

export default Homepage;