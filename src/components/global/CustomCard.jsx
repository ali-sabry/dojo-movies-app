import { NavLink } from 'react-router-dom';

import { FaLink } from 'react-icons/fa';

import classes from '../../styles/MoviesCards.module.css';

const CustomCard = ({ pagePath }) => {
  return (
    <div className={classes.customCard}>
      <div className={classes.movie_media}>
        <div className={classes.overlay}>
          <NavLink to={pagePath}>
            <FaLink />  more movies
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default CustomCard;