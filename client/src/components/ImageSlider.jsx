import React from 'react';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';

const ImageSlider = ({urls}) => {
  return (
    <Swiper navigation>
      {urls.map((url) => (
        <SwiperSlide key={url}>
          <div
            className="h-[400px]"
            style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageSlider;