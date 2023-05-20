import Section10 from "@component/home-1/Section10";
import Section11 from "@component/home-1/Section11";
import AppLayout from "@component/layout/AppLayout";
import { GetServerSideProps } from "next";
import axios from "axios";
import React, { useState } from "react";

const IndexPage = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <main>
    <Section10
      onCategorySelect={setSelectedCategory}
    />
    <Section11 products={products} selectedCategory={selectedCategory} />
  </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get("http://localhost:5000/product", {
    withCredentials: true,
  });
  const products = res.data.products;

  console.log("Products fetched in getServerSideProps:", products);

  return {
    props: {
      products,
    },
  };
};



IndexPage.layout = AppLayout;

export default IndexPage;
