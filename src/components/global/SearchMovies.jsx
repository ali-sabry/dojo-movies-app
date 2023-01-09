import React, { useState, useEffect } from 'react';
import classes from '../../styles/PagesStyles.module.css';
import { useParams } from 'react-router-dom';

import MoviesCards from './MoviesCards';

const SearchMovies = () => {
    const params = useParams();
    const searchValue = params.name;

    const [Details, setDetails] = useState([]);
    const [IsLoading, setIsLoading] = useState(true);
    const [IsError, setIsError] = useState(false);
    const [MessageError, setMessageError] = useState('');

    const FetchingDetails = async () => {
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchValue}&api_key=73359c4b09f4e0dfe498952de774e13a&include_adult=false`;
        try {
            const theFetch = await fetch(url);
            const response = await theFetch.json();
            setDetails(response.results)
            setIsLoading(false)
        } catch (error) {
            setIsError(true)
            setMessageError(`can't get the movies data try another search`)
        }
    }

    useEffect(() => {
        FetchingDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        FetchingDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    if (IsError) {
        return (
            <>
                <p className={classes.Message}>{MessageError}</p>
            </>
        )
    }

    if (IsLoading) {
        return (
            <>
                <p className={classes.Message}>Loading.....</p>
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
        <section className={classes.Target_Search_Movies}>
            {Details.map((movie, index) => {
                if (index === 0) return <h1 key={index} className={classes.Home_Heading}>your search result</h1>
                return <MoviesCards movies={movie} other={otherDetails(movie)} voted='false' key={movie.title} />
            })}
            {Details.length < 1 ? <>
                <h1 className={classes.Message_NotFound}>movies not found</h1>
            </> : false}
        </section>
    )

};

export default SearchMovies;