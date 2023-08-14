import { useRouter } from "next/router";
import { useState } from "react";
import products from "../../../data/products.json";
import { getProductBySlug } from "../../../common/productSelect";
import ProductDetail from "../../../components/ProductDetail/ProductDetail";
import InstagramTwo from "../../../components/Sections/Instagram/InstagramTwo";
import LayoutFour from "../../../components/Layout/LayoutOne";
import { baseUrl } from "../../../../config.js";
import axios from "axios";
import {
  Breadcrumb,
  BreadcrumbItem,
} from "../../../components/Other/Breadcrumb";
import ProductSlideTwo from "../../../components/Sections/ProductThumb/ProductSlide/ProductSlideTwo";

export default function () {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);
  const [foundProduct, setFoundProduct] = useState({
    productID : "",
    id: "",
    category: "",
    name: "",
    rate: 0,
    price: 0,
    new: true,
    brand: "",
    code: "",
    point: 0,
    quantity: 0,
    variation: [],
    thumbImage: [],
    images: [],
    description: "",
    slug: "",
  });
  const fetchData = async () => {
    try {
      const url = `${baseUrl}/api/get/single/product/${slug}`;

      const res = await axios.get(url, { withCredentials: true });
      console.log(res?.data);
      setFoundProduct({
        productID: res?.data._id,
        id: res?.data.product_id,
        category: res?.data.product_main_category,
        name: res?.data.product_name,
        rate: 4,
        price: res?.data.product_sale_price,
        new: res?.data.new_arrival,
        brand: "",
        code: res?.data.product_code,
        point: 0,
        quantity: res?.quantity,
        variation: [],
        thumbImage: res?.data.product_images,
        images: res?.data.product_images,
        description: res?.data.product_description,
        slug: res?.data.product_slug,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useState(() => {
    fetchData();
  }, []);
  // let foundProduct = getProductBySlug(products, slug);
  console.log(foundProduct);
  const onReviewSubmit = (data) => {
    console.log(data);
  };
  return (
    foundProduct !== null && (
      <LayoutFour title={foundProduct.name}>
        <Breadcrumb title="Product Detail">
          <BreadcrumbItem name="Home" />
          <BreadcrumbItem name="Shop" />
          <BreadcrumbItem name={foundProduct.name} current />
        </Breadcrumb>
        <ProductDetail data={foundProduct} onReviewSubmit={onReviewSubmit} />
        {/* <ProductSlideTwo data={products} /> */}
        {/* <InstagramTwo /> */}
      </LayoutFour>
    )
  );
}
