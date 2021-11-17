import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import tmdbApi, { category, movieType } from '../../config/tmdbApi';
import apiConfig from '../../config/api.config';

import './hero_slide.scss';


const HeroSlide = props => {
  const [movieItem, setMovieItem] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 , language: 'fr'};
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, { params });
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    }
    getMovies();
  }, [])
  return (
    <div className="hero-slide">

    </div>
  )
}

HeroSlide.propTypes = {

}

export default HeroSlide
