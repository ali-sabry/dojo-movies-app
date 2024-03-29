import React, { useContext } from 'react';
import FavoritesContext from '../store/Store';
import MoviesCards from '../components/global/MoviesCards';
import classes from '../styles/PagesStyles.module.css';



const FavoritesMovies = () => {
    const favoriteCtx = useContext(FavoritesContext);

    return (
        <div className={classes.MainMarginTop}>
            <h1 className={classes.Home_Heading}>favorites</h1>

            <section className={classes.Favorites}>
                {favoriteCtx.Favorites.length === 0 ? <>
                    <p className={classes.Message_NotFound}>add somthing to the favorites</p>
                </> :
                    favoriteCtx.Favorites.map((movie, index) => (
                        <MoviesCards movies={movie} key={index} />
                    ))
                }
            </section>
        </div>
    )
};

export default FavoritesMovies;