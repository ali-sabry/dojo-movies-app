import React from 'react';
import classes from '../styles/PagesStyles.module.css';
import useFetchingApi from '../components/customHook/FetchingApi';
import MoviesCards from '../components/global/MoviesCards';
import PuplicSplide from '../components/global/PuplicSplide';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const Home = () => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing';
    const { IsLoading, IsError, MessageError, MoviesData } = useFetchingApi(url);

    const { MoviesData: Popular } = useFetchingApi('https://api.themoviedb.org/3/movie/popular');
    const { MoviesData: Upcoming } = useFetchingApi('https://api.themoviedb.org/3/movie/upcoming');
    const { MoviesData: Toprated } = useFetchingApi('https://api.themoviedb.org/3/movie/top_rated');
    const { MoviesData: Trending } = useFetchingApi('https://api.themoviedb.org/3/trending/movie/week');

    if (IsLoading) {
        return (
            <>
                <p className={classes.Message}>Loading.....</p>
            </>
        )
    };

    if (IsError) {
        return (
            <>
                <p className={classes.Message}>{MessageError}</p>
            </>
        )
    };

    return (
        <section className={classes.HomePage} style={{ paddingBottom: '50px' }}>
            <div className={classes.Nowplaying_Movies}>
                <h1 className={classes.Home_Heading}>now playing movies</h1>
                <Splide className={classes.slider}
                    options={{
                        perPage: 3,
                        pagination: false,
                        type: 'loop',
                        autoplay: true,
                        gap: '1rem',
                        height: 'auto',
                        easing: 'cubic-bezier(.17,.67,.83,.67)',
                        lazyLoad: 'nearby',
                        breakpoints: {
                            530: {
                                perPage: 1,
                            },
                            768: {
                                perPage: 2,
                            }
                        }
                    }}>
                    {MoviesData.map((movie, index) => (
                        <SplideSlide key={index}>
                            <MoviesCards movies={movie} key={index} />
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
            <div className={classes.Popular_Slides}>
                <h1 className={classes.Home_Heading}>popular movies</h1>
                <PuplicSplide Movies={Popular} pagePath='/Popular' />
            </div>
            <div className={classes.Upcoming_Slides}>
                <h1 className={classes.Home_Heading}>upcoming movies</h1>
                <PuplicSplide Movies={Upcoming} pagePath='/Upcoming' />
            </div>
            <div className={classes.Toprated_Slides}>
                <h1 className={classes.Home_Heading}>Toprated movies</h1>
                <PuplicSplide Movies={Toprated} pagePath='/Toprated' />
            </div>
            <div className={classes.Trending_Slides}>
                <h1 className={classes.Home_Heading}>Trending movies</h1>
                <PuplicSplide Movies={Trending} pagePath='/Trending' />
            </div>
        </section>
    )
};

export default Home;