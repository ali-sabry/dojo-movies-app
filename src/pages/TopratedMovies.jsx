import React from 'react';
import classes from '../styles/PagesStyles.module.css';
import useFetchingApi from '../components/customHook/FetchingApi';
import MoviesCards from '../components/global/MoviesCards';

const TopratedMovies = () => {
    const url = 'https://api.themoviedb.org/3/movie/top_rated';
    const { IsLoading, IsError, MessageError, MoviesData } = useFetchingApi(url);

    if (IsLoading) {
        return (
            <>
                <p className={classes.Message}>Loading.....</p>
            </>
        )
    }

    if (IsError) {
        return (
            <>
                <p className={classes.Message}>{MessageError}</p>
            </>
        )
    }

    return (
        <div className={classes.MainMarginTop}>
            <h1 className={classes.Home_Heading}>toprated</h1>
            <section className={classes.Toprated_Movies}>
                {MoviesData.map((movie, index) => (
                    <MoviesCards movies={movie} key={index} />
                ))}
            </section>
        </div>
    )
};

export default TopratedMovies;