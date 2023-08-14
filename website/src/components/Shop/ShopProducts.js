import React from "react";
import Product from "../Product";
import classNames from "classnames";
import Slider from "react-slick";
import { PrevArrow, NextArrow } from "../Other/SliderArrow";

export default function ShopProducts(props) {
  const { gridColClass, listColClass, fiveCol, view, data, brandsData } = props;
  let arr = [5];
  for (var i = 0; i < Math.round(data.length / 5); i++) {
    arr.push(arr[i] + 6);
  }

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
    slidesToShow: 5,
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

  console.log(data);
  return (
    <>
      <div>
        {brandsData.map((brand) => {
          return (
            <div className="productsTwo">
              <div className="two">
                <h2>{brand.main_category_name}</h2>
              </div>
              <div className="ProductsTwo__wrapper">
                <Slider {...settings}>
                  {data.map((item) => {
                    if (
                      item.product_main_category === brand.main_category_name
                    ) {
                      return <Product data={item} />;
                    }
                  })}
                </Slider>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

//   return (
//     <div className="shop-products">
//       {view === "grid" ? (
//         <div className="shop-products__grid">
//           {data && (
//             <div className="row">
//               {data.map((item, index) => {
//                 if (fiveCol) {
//                   if (arr.includes(index)) {
//                     return <div key={index} className="w-100"></div>;
//                   }
//                 }
//                 return (
//                   <div
//                     key={index}
//                     className={classNames(gridColClass, {
//                       "five-col": fiveCol,
//                     })}
//                   >
//                     <Product data={item} />
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="shop-products__list">
//           {data && (
//             <div className="row">
//               {data.map((item, index) => (
//                 <div key={index} className={listColClass}>
//                   {/* <Product type={view} data={item} type={"list"} /> */}
//                   <Product data={item} type={"list"} />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
