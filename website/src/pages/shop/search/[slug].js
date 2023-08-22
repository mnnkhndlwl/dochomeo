import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Paginator from "react-hooks-paginator";
import { useRouter } from "next/router";
import { Breadcrumb, BreadcrumbItem } from "../../../components/Other/Breadcrumb";
import { getProductbyFilter } from "../../../common/productSelect";
import LayoutOne from "../../../components/Layout/LayoutOne";
// import productData from "../../data/products.json";
import ShopProducts from "../../../components/Shop/ShopProducts";
import ShopHeader from "../../../components/Shop/ShopHeader";
import Product from "../../../components/Product";
import InstagramTwo from "../../../components/Sections/Instagram/InstagramTwo";
import ShopSidebar from "../../../components/Shop/ShopSidebar";
import AllProductsCard from "../../../components/Shop/AllProductCards";
import { baseUrl } from "../../../../config";
import axios from "axios";

export default function () {
  const router = useRouter();
  const { slug } = router.query;
  const filterData = useSelector((state) => state.shopReducers.filter);
  const pageLimit = 12;
  const [offset, setOffset] = useState(0);
  const [currentView, setCurrentView] = useState();
  const [currentSort, setCurrentSort] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [ categoriesData,setCategoriesData ] = useState([]);

  const fetchData = async () => {
    try {
      if(slug.length !== 0) {
        const url = `${baseUrl}/api/search/in/products?search=${slug}`;
        const res = await axios.get(url, { withCredentials: true });
        console.log(res);
        setProductData(res.data);
      }
      else {
        const url_pro = `${baseUrl}/api/all/products`;
        const res_pro = await axios.get(url_pro, { withCredentials: true });
        setProductData(res_pro.data.allProducts);
      }
      const url = `${baseUrl}/api/get/all/brands`;
      const res = await axios.get(url, { withCredentials: true });
      setCategoriesData(res.data);
    //  console.log("productData---",res_pro.data.allProducts);
    } catch (err) {
      console.log(err);
    }
  };

  useState(() => {
    fetchData();
  }, []);


  // const categoriesData =[
  //   {id:0,title:'All'},
  //   {id:1,title:'Dilutions'},
  //   {id:2,title:'Unani'},
  //   {id:3,title:'Ayurveda'},
  //   {id:4,title:'Trituration'},
  //   {id:5,title:'Lm Potencies'},
  //   {id:6,title:'Homoeopathic Medicines'},
  // ]

  useEffect(() => {
    let sortedProduct = getProductbyFilter(
      productData,
      currentSort,
      filterData.category,
      filterData.priceRange.from,
      filterData.priceRange.to,
      filterData.brand
    );
    console.log(sortedProduct);
    setCurrentData(sortedProduct);
  }, [offset, currentSort, filterData]);
  return (
    // <LayoutOne title="Shop Fullwidth Left Sidebar" container="wide">
    <LayoutOne title="Shop Fullwidth Left Sidebar" >
      <Breadcrumb title="Shop Products">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Shop" current />
      </Breadcrumb>
      <div className="" style={{justifyContent:"center",alignItems:"center"}} >
      <div className="shop -five-col">
        <div className="container-full-half"> 
           <div className="row"> 
            {/* <div className="col-12 col-md-4 col-lg-3 col-xl-2">
              <ShopSidebar categoriesData={categoriesData} />
            </div>
            <div className="col-12 col-md-8 col-lg-9 col-xl-10">
              {/* <ShopHeader
                view={currentView}
                getCurrentSort={setCurrentSort}
                getCurrentView={(view) => setCurrentView(view)}
              /> */}
              {!productData || productData.length === 0 ? (
                <h1>No product found</h1>
              ) : (
                <>
                  <AllProductsCard
                    gridColClass="col-12 col-sm-6 col-lg-4 col-xl-3"
                    listColClass="col-12 col-xl-6"
                    view='grid'
                    data={currentData.length === 0 ? productData : currentData}
                  />

                  <Paginator
                    pageContainerClass="paginator"
                    totalRecords={currentData.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* <InstagramTwo /> */}
    </LayoutOne>
  );
}
