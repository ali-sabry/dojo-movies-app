import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import { GrFavorite } from 'react-icons/gr';

import FavoritesContext from './Store';
import {ThemeAppContext} from './Theme';

import classes from './MoviesCards.module.css';


const MoviesCards = ({ movies, voted = 'true', other }) => {
    
    const favoritesCtx = useContext(FavoritesContext);
    const DarkStatus   = useContext(ThemeAppContext)
    const ItemIsFavorite = favoritesCtx.ItemIsFavorite(movies.id);
    
    const HandlerFavStatus = ()=> {
        if(ItemIsFavorite) {
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
    
    console.log(DarkStatus[0].IsDark);

    return (
    <div className={classes.movie_card} style={{ boxShadow: DarkStatus[0].IsDark ?'0 0 20px rgb(255 255 255 / 34%)' :'0 0 20px rgb(0 0 0 / 50%)' }}>
        <div className={classes.movie_media}>
            <div className={classes.overlay}>
                    <NavLink 
                    to={`/Details/${movies.id}`}
                    onClick={()=> setTimeout(() => {
                        window.scrollTo(0, 0)
                    }, 10)}>
                        more details
                    </NavLink>
                </div>
                <img src={movies.poster_path === null ?`https://via.placeholder.com/600` :`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt={movies.title} height={movies.poster_path === null?'530': 'auto'} loading='lazy'  />
            </div>
        <div className={classes.movie_details}>
            <p>Title: <span>{movies.title}</span></p>
            {
            voted === 'true' ? <p>Vote Average : <span>{movies.vote_average}</span></p>
            : false
            }
            {other && <p>{other}</p>}
            <button type='button' onClick={ ()=> HandlerFavStatus()} className=
            {
                ItemIsFavorite?classes.Active_Icon :''
            }>
                <GrFavorite title='Add To Favorite' />
            </button>
        </div>
    </div> 
    )
};

export default MoviesCards;