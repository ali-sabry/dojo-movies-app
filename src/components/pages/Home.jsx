import React from 'react';

import classes from './styles/Style.module.css';

import useFetchingApi from '../global/FetchingApi';
// import MoviesCards from '../global/MoviesCards';
// import CustomCard from '../global/CustomCard';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const Home = ()=> {
    const url ='https://api.themoviedb.org/3/movie/now_playing';
    const {IsLoading, IsError, MessageError, MoviesData} = useFetchingApi(url);
    
    const {MoviesData: Popular}  = useFetchingApi('https://api.themoviedb.org/3/movie/popular');
    const {MoviesData: Upcoming} = useFetchingApi('https://api.themoviedb.org/3/movie/upcoming');
    const {MoviesData: Toprated} = useFetchingApi('https://api.themoviedb.org/3/movie/top_rated');
    const {MoviesData: Trending} = useFetchingApi('https://api.themoviedb.org/3/trending/movie/week');
    
    if(IsLoading) {
        return (
            <>
                <p className={classes.Message}>Loading.....</p>
            </>
        )
    };
    
    if(IsError) {
        return (
            <>
                <p className={classes.Message}>{MessageError}</p>
            </>
        )
    };
    
    const ShowData = ({ Movies, type = '', pagePath, easing = 'cubic-bezier(.17,.67,.83,.67)' }) => {
        return (
            <Splide className={classes.slider} options={{
                perPage : 3,
                pagination: false,
                type: type,
                gap: '2rem',
                easing: easing,
                lazyLoad: 'nearby',
                breakpoints: {
                    576: {
                        perPage: 1,
                    }
                } 
            }}>
                {
                    !IsLoading && console.log(Movies)
                    // Movies && (
                    //     Movies.map((mv, index)=> (
                    //         index < 10 ? (
                    //             <SplideSlide key={`key_${index}`}>
                    //                 <MoviesCards movies={mv} />
                    //             </SplideSlide>
                    //         ) : false
                    //     )) 
                    // )
                }
                {/*<SplideSlide>
                    <CustomCard pagePath={pagePath} />
                </SplideSlide>*/}
            </Splide>
        )
    };

    return (
        <section className={classes.HomePage} style={{paddingBottom: '50px'}}>
            <div className={classes.Nowplaying_Movies}> 
                <h1 className={classes.Home_Heading}>now playing movies</h1>
                    <Splide className={classes.slider} 
                        options={{
                        perPage : 3,
                        pagination: false,
                        type: 'loop',
                        autoplay: true,
                        gap: '1rem',
                        height: 'auto',
                        easing: 'cubic-bezier(.17,.67,.83,.67)',
                        lazyLoad: 'nearby',
                        breakpoints: {
                            640: {
                            perPage: 1,
                            }
                        } 
                     }}>
                {
                    !IsLoading && (
                        <>
                            {console.log(MoviesData)}
                        </>
                    )
                    // (
                    //     MoviesData.map( (movie, index) => (
                    //         <>
                    //             {console.log(MoviesData)}
                    //             <SplideSlide key={index}>
                    //                 <MoviesCards movies={movie} key={index} />
                    //             </SplideSlide>
                    //         </>
                    //     ))
                    // )
                }
                </Splide>
            </div>
            <div className={classes.Popular_Slides}>
                <h1 className={classes.Home_Heading}>popular movies</h1>
                <ShowData Movies={ Popular } pagePath='/Popular' />
            </div>
            <div className={classes.Upcoming_Slides}>
                <h1 className={classes.Home_Heading}>upcoming movies</h1>
                <ShowData Movies={ Upcoming } pagePath='/Upcoming' />
            </div>
            <div className={classes.Toprated_Slides}>
                <h1 className={classes.Home_Heading}>Toprated movies</h1>
                <ShowData Movies={ Toprated } pagePath='/Toprated'  />
            </div>
            <div className={classes.Trending_Slides}>
                <h1 className={classes.Home_Heading}>Trending movies</h1>
                <ShowData Movies={ Trending } pagePath='/Trending'  />
            </div>
        </section>
    )
};

export default Home;