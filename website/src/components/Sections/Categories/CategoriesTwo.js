import React from "react";
import Slider from "react-slick";
import Link from "next/link";
import { PrevArrow, NextArrow } from "../../Other/SliderArrow";

export default function CategoriesTwo({ data }) {
  const settings = {
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className="category-two">
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={index}>
            <Link href="/shop/fullwidth-4col">
              <a className="category-two__item">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/kozmo-cloud.appspot.com/o/kozmocloud%2Fallcategories%2Fmaincategories%2Fhomoeopathic%20medicines%2FWed%2C%2002%20Aug%202023%2010%3A21%3A15%20GMT--drugs.png?alt=media&token=d6ffa47c-bcd5-46ba-976a-ed6c46980be3"
                  alt="Category icon"
                />
                <h3>{item.main_category_name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
