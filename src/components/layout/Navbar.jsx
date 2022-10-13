
import React, { useState, useContext } from 'react';
import FavoritesContext from '../global/Store';
import { ThemeAppContext } from '../global/Theme';

import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';

import { FaHome, FaAppStore, FaAccusoft, FaUps, FaAcquisitionsIncorporated, FaHeart, FaMoon } from 'react-icons/fa';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';
import { MdLightMode } from 'react-icons/md';


const Navbar = ()=> {
    const [SearchTerm, setSearchTerm] = useState();
    const favoriteCtx = useContext(FavoritesContext);
    const [{IsDark}, toggleTheme] = useContext(ThemeAppContext);

    function EmptyInputField() {
        document.querySelector('#input').value = '';
    };

    return (
        <nav className={classes.nav}>
            <div className={classes.NavLinks}>
                <ul>
                    <li>
                        <NavLink to='/' 
                        onClick={ ()=> EmptyInputField() }
                        className={({isActive}) => isActive || window.location.pathname === '/index.html' ?classes.active :''}>
                            Home <FaHome/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Popular' 
                        onClick={ ()=> EmptyInputField() }
                        className={({isActive}) => isActive ?classes.active :''}>
                            Popular <FaAppStore/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Upcoming'
                        onClick={ ()=> EmptyInputField() } 
                        className={({isActive}) => isActive ?classes.active :''}>
                            Upcoming <FaAcquisitionsIncorporated/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Toprated' 
                        onClick={ ()=> EmptyInputField() }
                        className={({isActive}) => isActive ?classes.active :''}>
                            Toprated <FaUps/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Trending'
                        onClick={ ()=> EmptyInputField() }
                        className={({isActive}) => isActive ?classes.active :''}>
                            Trending <FaAccusoft/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Favorites'
                        onClick={ ()=> EmptyInputField() }
                        className={({isActive}) => isActive ?classes.active :''}>
                            Favorites <FaHeart/>
                            <span className={classes.badge}>
                                {favoriteCtx.TotalFavorites}
                            </span>
                        </NavLink>
                    </li>
                </ul>
                <div className={classes.Mode}>
                    <h4 onClick={()=>toggleTheme()}> 
                         { IsDark ?<MdLightMode /> :<FaMoon style={{color: 'var(--main-color)'}} /> }
                    </h4>
                </div>
            </div>
            <div className={classes.NavbarSearch}>
            <div className={classes.Brand}>
                <h1>
                    <NavLink to='/'>
                    dojo<AiOutlineFundProjectionScreen />
                    </NavLink>
                </h1>
            </div>
            <input
                type = 'search'
                placeholder = 'Type Your Movie Name'
                className = {classes.input}
                id = 'input'
                onKeyUp = {(e) => e.code === 'Enter'?(document.getElementById('SearchBtn').click()) :false}
                onChange = {(e) => setSearchTerm(e.target.value)}
            />
            <NavLink to={`/Searched/${encodeURI(SearchTerm)}`}
            className={classes.SearchBtn} id='SearchBtn'
            onClick={ (e)=> (SearchTerm === undefined || SearchTerm === '') ?( e.preventDefault() ) :false}>search</NavLink>
            </div>
        </nav>
    )
};

export default Navbar;
