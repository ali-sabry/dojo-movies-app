import React from 'react';

import classes from './styles/Style.module.css';

import useFetchingApi from '../global/FetchingApi';

import MoviesCards from '../global/MoviesCards';


const UpcomingMovies = ()=> {
    const url = 'https://api.themoviedb.org/3/movie/upcoming';
    const {IsLoading, IsError, MessageError, MoviesData} = useFetchingApi(url);

    if(IsLoading) {
        return (
            <>
                <p className={classes.Message}>Loading.....</p>
            </>
        )
    }
    if(IsError) {
        return (
            <>
                <p className={classes.Message}>{MessageError}</p>
            </>
        )
    }

    function otherDetails(movie) {
        return (
            <>
            release : <span>{movie.release_date}</span>
            </>
        ) 
    }

    return (
        <div className={classes.MainMarginTop}> 
            <h1 className={classes.Home_Heading}>upcoming</h1>
            <section className={classes.Upcoming_Movies}>
                {MoviesData.map( (movie, index) => (
                    <MoviesCards movies={movie} other={otherDetails(movie)} voted='true' key={index}/>
                ))}
            </section>
        </div>
    )
};

export default UpcomingMovies;