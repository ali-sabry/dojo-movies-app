import React, { useState, useContext } from 'react';
import FavoritesContext from '../../store/Store';
import { ThemeAppContext } from '../../theme/Theme';

import { NavLink } from 'react-router-dom';
import classes from '../../styles/Navbar.module.css';

import { FaHome, FaAppStore, FaAccusoft, FaUps, FaAcquisitionsIncorporated, FaHeart, FaMoon } from 'react-icons/fa';
import { AiOutlineFundProjectionScreen, AiOutlineSearch } from 'react-icons/ai';
import { MdLightMode } from 'react-icons/md';


const Navbar = () => {
    const [SearchValue, setSearchValue] = useState();
    const favoriteCtx = useContext(FavoritesContext);
    const [{ IsDark }, toggleTheme] = useContext(ThemeAppContext);

    function EmptyInputField() {
        document.querySelector('#input').value = '';
    };

    return (
        <nav className={classes.nav}>
            <div className={classes.NavLinks}>
                <ul>
                    <li>
                        <NavLink to='/'
                            onClick={() => EmptyInputField()}
                            className={({ isActive }) => isActive || window.location.pathname === '/index.html' ? classes.active : ''}>
                            Home <FaHome />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Popular'
                            onClick={() => EmptyInputField()}
                            className={({ isActive }) => isActive ? classes.active : ''}>
                            Popular <FaAppStore />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Upcoming'
                            onClick={() => EmptyInputField()}
                            className={({ isActive }) => isActive ? classes.active : ''}>
                            Upcoming <FaAcquisitionsIncorporated />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Toprated'
                            onClick={() => EmptyInputField()}
                            className={({ isActive }) => isActive ? classes.active : ''}>
                            Toprated <FaUps />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Trending'
                            onClick={() => EmptyInputField()}
                            className={({ isActive }) => isActive ? classes.active : ''}>
                            Trending <FaAccusoft />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/Favorites'
                            onClick={() => EmptyInputField()}
                            className={({ isActive }) => isActive ? classes.active : ''}>
                            Favorites <FaHeart />
                            <span className={classes.badge}>
                                {favoriteCtx.TotalFavorites}
                            </span>
                        </NavLink>
                    </li>
                </ul>
                <div className={classes.Mode}>
                    <h4 onClick={() => toggleTheme()}>
                        {IsDark ? <MdLightMode /> : <FaMoon style={{ color: 'var(--main-color)' }} />}
                    </h4>
                </div>
            </div>
            <div className={classes.NavbarSearch}>
                <div className={classes.Brand}>
                    <NavLink to='/'>
                        <span>dojo</span><AiOutlineFundProjectionScreen />
                    </NavLink>
                </div>
                <div className={classes.SearchContainer}>
                    <input
                        type='search'
                        placeholder='Type Your Movie Name'
                        className={classes.input}
                        id='input'
                        onKeyUp={(e) => e.code === 'Enter' ? (document.getElementById('SearchBtn').click()) : false}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <NavLink to={`/Searched/${encodeURI(SearchValue)}`}
                        className={classes.SearchBtn} id='SearchBtn'
                        onClick={(e) => (SearchValue === undefined || SearchValue === '') ? (e.preventDefault()) : false}><AiOutlineSearch /></NavLink>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;
