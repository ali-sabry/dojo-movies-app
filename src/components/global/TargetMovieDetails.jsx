import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';


import classes from '../../styles/MovieDetails.module.css';
import MoviesCards from './MoviesCards';


const TargetMovieDetails = () => {
    const Navigate = useNavigate();
    const params = useParams();

    const TargetMovieInfo = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_Movies_Api_Key}`;
    const TargetMovieRecomnd = `https://api.themoviedb.org/3/movie/${params.id}/recommendations?api_key=${process.env.REACT_APP_Movies_Api_Key}`;

    const [MovieInfo, setMovieInfo] = useState([]);
    const [Recomded, setRecomded] = useState([]);

    const [IsLoading, setIsLoading] = useState(true);
    const [IsError, setIsError] = useState(false);
    const [MessageError, setMessageError] = useState('');

    const FetchingDetails = async (url) => {
        try {
            const theFetch = await fetch(url);
            const response = await theFetch.json();
            setIsLoading(false)
            url === TargetMovieInfo ? setMovieInfo(response) : setRecomded(response.results);
        } catch (error) {
            setIsError(true)
            setMessageError(error)
        }
    };

    useEffect(() => {
        FetchingDetails(TargetMovieInfo);
        FetchingDetails(TargetMovieRecomnd);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        FetchingDetails(TargetMovieInfo);
        FetchingDetails(TargetMovieRecomnd);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);


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
        <section className={classes.Details}>
            <button
                className={classes.Back_Btn}
                onClick={() => Navigate(-1)}>
                <BiArrowBack /> back
            </button>
            <div className={classes.Movie_Details}>
                <div className={classes.Image}>
                    <img src={
                        MovieInfo.poster_path === null ? (`https://via.placeholder.com/600`) : `https://image.tmdb.org/t/p/w500/${MovieInfo.poster_path}`
                    } alt={`${MovieInfo.title}`} />
                </div>
                <div className={classes.Info}>
                    <h2>movie name : {MovieInfo.title}</h2>
                    <h3>status : {MovieInfo.status}</h3>
                    <h4>released : {MovieInfo.release_date}</h4>
                    <p>
                        <span>overview : </span> {MovieInfo.overview}
                    </p>
                </div>
            </div>
            <div className={classes.RecomndBlock}>
                {Recomded.length > 0 ?
                    <>
                        <h1 className={classes.Home_Heading}>recommendations</h1>
                        <div className={classes.Recommendations} >
                            {Recomded.map((mv, index) => (
                                <MoviesCards movies={mv} key={index} />
                            ))}
                        </div>
                    </>
                    :
                    <h1 className={classes.Home_Heading}>
                        no recommendations found for this movie .
                    </h1>}
            </div>
        </section>
    )
}

export default TargetMovieDetails;