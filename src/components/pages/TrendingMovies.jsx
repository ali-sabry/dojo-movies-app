import React from 'react';

import classes from './styles/Style.module.css';

import useFetchingApi from '../global/FetchingApi';

import MoviesCards from '../global/MoviesCards';


const TrendingMovies = ()=> {
    const url = 'https://api.themoviedb.org/3/trending/movie/week';
    const {IsLoading, IsError, MessageError, MoviesData} = useFetchingApi(url);
      
    if(IsLoading) {
        return (
            <div>
                <p className={classes.Message}>Loading.....</p>
            </div>
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
            released : <span>{movie.release_date}</span>
            </>
        ) 
    }

    return (
        <div className={classes.MainMarginTop}>
            <h1 className={classes.Home_Heading}>trending</h1>
            <section className={classes.Trending_Movies}>
                {MoviesData.map( (movie, index) => (
                    <MoviesCards movies={movie} other={otherDetails(movie)} voted='false' key={index}/>
                ))}
            </section>
        </div>
    )
};

export default TrendingMovies;