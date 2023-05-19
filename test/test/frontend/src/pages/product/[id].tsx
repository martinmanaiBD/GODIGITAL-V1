import NavbarLayout from "@component/layout/NavbarLayout";
import ProductIntro from "@component/products/ProductIntro";
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import axios from 'axios';
import RelatedProducts from "@component/products/RelatedProducts";

const ProductDetails = ( product ) => {
  console.log("Product data:", product);

  const {
    productName,
    productPrice,
    productDes,
    productImage,
    id,
  } = product.product;

  const [selectedOption, setSelectedOption] = useState("description");

  const handleOptionClick = (opt) => () => {
    setSelectedOption(opt);
  };

  return (
    <div>
      <ProductIntro
        imgUrl={productImage}
        title={productName}
        price={parseFloat(productPrice)}
        id={id}
        description={productDes} name={""} qty={0}      />

      <RelatedProducts />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;

  const res = await axios.get(`http://localhost:5000/product/${id}`);
  const product = res.data;

  return {
    props: {
      product: product.product, // Change this line

        withCredentials: true

    },
  };
};

ProductDetails.layout = NavbarLayout;

export default ProductDetails;
