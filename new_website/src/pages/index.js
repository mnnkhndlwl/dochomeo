import LayoutOne from "../components/Layout/LayoutOne";
import SliderTwo from "../components/Sections/Slider/SliderTwo";
import sliderData from "../data/slider/sliderOne.json";
import IntroductionOne from "../components/Sections/Introduction/IntroductionOne";
import introductionOneData from "../data/introduction/introductionOne.json";
import IntroductionTwo from "../components/Sections/Introduction/IntroductionTwo";
import introductionTwoData from "../data/introduction/introductionTwo.json";
import ProductSlideOne from "../components/Sections/ProductThumb/ProductSlide/ProductSlideOne";
import productSlideOneData from "../data/products.json";
import TestimonialOne from "../components/Sections/Testimonial/TestimonialOne";
import testimonialOneData from "../data/testimonial/data.json";
import TeamOne from "../components/Sections/Team/TeamOne";
import teamOneData from "../data/team/teamOne.json";
import CTAOne from "../components/Sections/CallToAction/CTAOne";
import { useState } from "react";
import { baseUrl } from "../../config";
import axios from "axios";
import ShopProducts from "../components/Shop/ShopProducts";
import BrandsTwo from "../components/Sections/Brands/BrandsTwo";
import ProductCategories from "../components/Sections/ProductCategories/ProductCategories";
import CategoriesTwo from "../components/Sections/Categories/CategoriesTwo";
import MenuFive from "../components/Header/Menu/MenuFive";
import DoctorSection from "../components/Doctor/DoctorSection";

export default function homepage1() {
  console.log(sliderData);

  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [ doctorsData, setDoctorsData ] = useState([]);

  const fetchDoctors = async() => {
    try {
      const url = `${baseUrl}/api/get/all/doctors/`;
      const res = await axios.get(url, { withCredentials: true });
      setDoctorsData(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchBrands = async() => {
    try {
      const url = `${baseUrl}/api/get/all/brands`;
      const res = await axios.get(url, { withCredentials: true });
      setBrandsData(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchData = async () => {
    try {
      const url = `${baseUrl}/api/get/all/banners`;
   
      const res = await axios.get(url, { withCredentials: true });
      setData(res.data);

      const url_pro = `${baseUrl}/api/all/products`;
      const res_pro = await axios.get(url_pro, { withCredentials: true });
      setProduct(res_pro.data.allProducts);
    } catch (err) {
      console.log(err);
    }
  };

  useState(() => {
    fetchBrands();
    fetchData();
    fetchDoctors();
  }, []);
  console.log(data);

  return (
    <LayoutOne title="Dochomoeo" data={sliderData} className="-style-1">
    <MenuFive />
    {/* <ProductCategories data={brandsData}/> */}
    {/* <CategoriesTwo data={brandsData}/> */}
      <SliderTwo data={data} className="-style-1" showDots />
      {/* <IntroductionOne data={introductionOneData} /> */}
      {/* <IntroductionTwo data={introductionTwoData} /> */}
      {/* <ProductSlideOne data={productSlideOneData} /> */}
      <BrandsTwo data={brandsData}/>
      {/* <div className="container"> */}
        <ShopProducts
          // gridColClass="col-12 col-sm-6 col-md-4 col-lg-3"
          // listColClass="col-12 col-lg-6"
          // view={"grid"}
          brandsData={brandsData.slice(0,4)}
          data={product}
        />
        {/* <div className="container">
             <div className="three">
                <h1>Our Doctorss</h1>
             </div>
        </div> */}
      <DoctorSection data={doctorsData}/>
      {/* </div> */}
      <TestimonialOne data={testimonialOneData} /> 
      {/* <TeamOne data={teamOneData} />  */}
      {/* <CTAOne /> */}
    </LayoutOne>
  );
}
