import React, { useContext } from 'react';
import classes from '../../styles/MoviesCards.module.css';

import { NavLink, useLocation } from 'react-router-dom';
import { GrFavorite } from 'react-icons/gr';
import { ThemeAppContext } from '../../theme/Theme';
import FavoritesContext from '../../store/Store';


const MoviesCards = ({ movies, voted = 'true', other }) => {

    const favoritesCtx = useContext(FavoritesContext);
    const DarkStatus = useContext(ThemeAppContext)
    const ItemIsFavorite = favoritesCtx.ItemIsFavorite(movies.id);
    const { pathname } = useLocation();

    const HandlerFavStatus = () => {
        if (ItemIsFavorite) {
            favoritesCtx.RemoveFavorite(movies.id);
        } else {
            favoritesCtx.AddFavorites({
                id: movies.id,
                poster_path: movies.poster_path,
                title: movies.title,
                vote_average: movies.vote_average
            });
        };
    };

    return (
        <div className={classes.movie_card} style={{ boxShadow: DarkStatus[0].IsDark ? '0 0 20px rgb(255 255 255 / 34%)' : '0 0 20px rgb(0 0 0 / 50%)', width: pathname === '/' ? '100%' : false }}>
            <div className={classes.movie_media}>
                <div className={classes.overlay}>
                    <NavLink
                        to={`/Details/${movies.id}`}
                        onClick={() => setTimeout(() => {
                            window.scrollTo(0, 0)
                        }, 10)}>
                        more details
                    </NavLink>
                </div>
                <img src={movies.poster_path === null ? `https://via.placeholder.com/600` : `https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt={movies.title} height={movies.poster_path === null ? '530' : 'auto'} loading='lazy' />
            </div>
            <div className={classes.movie_details}>
                <p>Title:  <NavLink to={`/Details/${movies.id}`} onClick={() => window.scrollTo(0, 0)}>
                    <span>{movies.title.length < 12 ? movies.title : `${movies.title.slice(0, 12)}...`}</span> </NavLink>
                </p>
                {
                    voted === 'true' ? <p>Vote Average : <span>{movies.vote_average}</span></p>
                        : false
                }
                {other && <p>{other}</p>}
                <button type='button' onClick={() => HandlerFavStatus()} className=
                    {
                        ItemIsFavorite ? classes.Active_Icon : ''
                    }>
                    <GrFavorite title='Add To Favorite' />
                </button>
            </div>
        </div>
    )
};

export default MoviesCards;