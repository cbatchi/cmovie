import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import tmdbApi, { category, movieType } from "../../config/tmdbApi";
import apiConfig, { youtubeUrl } from "../../config/api.config";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useHistory } from "react-router-dom";
import Button, { OutlineButton } from "../button/Button";
import Modal, { ModalContent } from "../modal/Modal";
import "./hero_slide.scss";

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

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{ delay: 3000 }}
      >
        {movieItem.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
              // <img src={apiConfig.originalImage(item.backdrop_path)} alt="" />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {movieItem.map((item, index) => (
        <TrailerModal key={index} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = ({ item, className }) => {
  let history = useHistory();
  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  
  const setModalActive = async () => {
    const [modal, fetchingVideos] = [
      document.getElementById(`modal_${item.id}`),
      await tmdbApi.getVideos(category.movie, item.id)
    ];

    console.log( modal.querySelector('.modal__content > iframe'))

    if (fetchingVideos.results.lenght > 0) {
      const videoSrc = `${youtubeUrl}/${fetchingVideos.results[0].key}`;
      modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc);
    } else {
      modal.querySelector('.modal__content').innerHTML = 'No trailer found'
    }
    modal.classList.toggle('active');
  }

  return (
    <div
      className={`hero-slide__item ${className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClick={() => history.push(`/movie/${item.id}`)}>
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  );
};

HeroSlideItem.propTypes = {
  className: PropTypes?.string.isRequired,
  item: PropTypes?.object.isRequired,
};

const TrailerModal = ({ item }) => {
  const iframeRef = useRef(null);
  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={!true} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          src={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

TrailerModal.propTypes = {
  item: PropTypes.object.isRequired
};

export default HeroSlide;
