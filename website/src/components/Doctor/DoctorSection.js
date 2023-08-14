import React from "react";
import Slider from "react-slick";
import { PrevArrow, NextArrow } from "../Other/SliderArrow";

export default function DoctorSection({data}) {
  const settings = {
    pauseOnHover: true,
    //className: "",
    dots: false,
    infinite: true,
    autoplay: false,
    focusOnSelect: true,
    autoplaySpeed: 4000,
    speed: 1000,
    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    // dotsClass: "slider-dots container",
    responsive: [
      {
        breakpoint: 844,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <>
      <div className="doctorsection">
        <div class="three">
          <h1>Our Doctors</h1>
        </div>
        <div className="doctorsection__wrapper">
          <Slider {...settings}>
          {
            data.map((item) => {
              return <main className="qr-container">
              <div className="img-block">
                <img
                  src={item.image.image_url}
                  alt="QR code"
                />
                <div>
                  <div className="rectangle">
                    <p className="text1">{item.name}</p>
                    <p className="text2">{item.Specialization}</p>
                  </div>
                </div>
              </div>
              <article className="info-block">
                <h4>{item.experience} + years experience</h4>
                <button className="button-24">Consult Doctor</button>
              </article>
            </main>
            }
            )
          }
          </Slider>
        </div>
      </div>
    </>
  );
}

