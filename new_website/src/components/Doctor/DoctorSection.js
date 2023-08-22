import React, { useState } from "react";
import Slider from "react-slick";
import { PrevArrow, NextArrow } from "../Other/SliderArrow";
import Link from "next/link";
import { DoctorForm } from "../form/DoctorForm";

export default function DoctorSection({ data }) {
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
          slidesToShow: 1,
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

  const [show,setShow] = useState(false);
  const [doctorData,setDoctorData] = useState();

  return (
    <>
      <div className="container">
        <div className="doctorsection">
          {/* <div className="three">
          <h1>Our Doctors</h1>
        </div> */}

          <div className="two">
            <h1>
              Our Doctors
              <span>Consult with our experienced doctors</span>
            </h1>
          </div>

          <div className="doctorsection__wrapper">
            {data.map((item) => {
              return (
                <main className="qr-container">
                  <div className="img-block">
                    <div>
                      <img src={item.image.image_url} alt="QR code" />
                    </div>
                  </div>
                  <div className="rectangle">
                    <p className="text1">{item.name}</p>
                    <p className="text2">{item.Specialization}</p>
                  </div>
                  <article className="info-block">
                    <h4>{item.experience} + years of experience</h4>
                    {/* <Link
                      href={`${process.env.PUBLIC_URL}/doctors/[slug]`}
                      // href={`#`}
                      as={`${process.env.PUBLIC_URL}/doctors/${item._id}`}
                      // as={`#`}
                    > */}
                      <button className="button-24" onClick={() => {
                        setDoctorData(item);
                        setShow(true);
                      }}>Consult Doctor</button>
                    {/* </Link> */}
                  </article>
                </main>
              );
            })}
          </div>

          {/* <div className="doctorsection__wrapper">
          {data.slice(4,8).map((item) => {
            return (
              <main className="qr-container">
                <div className="img-block">
                  <div>
                    <img src={item.image.image_url} alt="QR code" />
                  </div>
                </div>
                <div className="rectangle">
                  <p className="text1">{item.name}</p>
                  <p className="text2">{item.Specialization}</p>
                </div>
                <article className="info-block">
                  <h4>{item.experience} + years of experience</h4>
                  <Link
                    href={`${process.env.PUBLIC_URL}/doctors/[slug]`}
                    // href={`#`}
                    as={`${process.env.PUBLIC_URL}/doctors/${item._id}`}
                    // as={`#`}
                  >
                    <button className="button-24">Consult Doctor</button>
                  </Link>
                </article>
              </main>
            );
          })}
        </div> */}

       {/* </div> */}
        </div>
        <DoctorForm show={show} setShow={setShow} data={doctorData}/>
      </div>
    </>
  );
}
