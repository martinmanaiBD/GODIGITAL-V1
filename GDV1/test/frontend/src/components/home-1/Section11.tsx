import React from "react";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import Grid from "../grid/Grid";
import ProductCard1 from "../product-cards/ProductCard1";
import { useAppContext } from "@context/app/AppContext";

interface Section11Props {
  products: any[];
  selectedCategory: string;
}

const Section11: React.FC<Section11Props> = ({ products, selectedCategory }) => {
  console.log("Products in Section11:", products);

  const filteredProducts = products
  ? products.filter((product) => {
      if (selectedCategory === "All") {
        return true;
      }
      return product.productCategory === selectedCategory;
    })
  : [];

  return (
    <Container mb="70px">
      <CategorySectionHeader title="All Product" seeMoreLink="#" />
      <Grid container spacing={6}>
        {filteredProducts.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1
              id={item.id}
              imgUrl={`http://localhost:5000/${item.productImage}`}
              title={item.productName}
              price={item.productPrice}
              off={25}
              rating={item.rating}
              hoverEffect
              category={item.productCategory} name={""} qty={0}  />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section11;
