import { Splide, SplideSlide } from "@splidejs/react-splide";
import classes from '../../styles/PagesStyles.module.css';
import CustomCard from "./CustomCard";
import MoviesCards from "./MoviesCards";



const PuplicSplide = ({ Movies, type = '', pagePath, easing = 'cubic-bezier(.17,.67,.83,.67)' }) => {
    return (
        <Splide className={classes.slider} options={{
            perPage: 3,
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
                Movies.map((mv, index) => (
                    index < 10 ? (
                        <SplideSlide key={`key_${index}`}>
                            <MoviesCards movies={mv} />
                        </SplideSlide>
                    ) : false
                ))

            }
            {/* Last Card */}
            <SplideSlide>
                <CustomCard pagePath={pagePath} />
            </SplideSlide>
        </Splide>
    )
};

export default PuplicSplide;