import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import tmdbApi, { category, movieType } from "../../config/tmdbApi";
import apiConfig from "../../config/api.config";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./hero_slide.scss";
import { useHistory } from "react-router-dom";
import Button, { OutlineButton } from '../button/Button';

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItem, setMovieItem] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1, language: "en" };
      try {
        const response = await tmdbApi.getMoviesList(movieType["popular"], {
          params,
        });
        setMovieItem(response["results"].slice(0, 8));
      } catch (error) {
        console.error(error);
      }
    };
    getMovies();
  }, []);

  console.log(movieItem);

  return <div className="hero-slide">
    <Swiper
      modules={[Autoplay]}
      grabCursor={true}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{delay: 3000}}
    >
      {movieItem.map((item, index) => (
        <SwiperSlide key={index}>
          {({ isActive }) => (
            <HeroSlideItem item={item} className={`${isActive ? "active" : ''}`}/>
            // <img src={apiConfig.originalImage(item.backdrop_path)} alt="" />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  </div>;
};

const HeroSlideItem = props => {
  let history = useHistory();
  const { item } = props;
  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

  return <div
    className={`hero-slide__item ${props.className}`}
    style={{backgroundImage: `url(${background})`}}
  >
    <div className="hero-slide__item__content container">
      <div className="hero-slide__item__content__info">
        <h2 className="title">
          {item.title}
        </h2>
        <div className="overview">{item.overview}</div>
        <div className="btns">
          <Button onClick={() => history.push(`/movie/${item.id}`)}>
            Watch now
          </Button>
          <OutlineButton onClick={() => console.log("You watch trailer")}>
            Watch trailer
          </OutlineButton>
        </div>
      </div>
      <div className="hero-slide__item__content__poster">
        <img src={apiConfig.w500Image(item.poster_path)} alt="" />
      </div>
    </div>
  </div>
}

HeroSlide.propTypes = {

};

export default HeroSlide;
