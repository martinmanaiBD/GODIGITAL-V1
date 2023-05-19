import productDatabase from "@data/product-database";
import NextImage from "next/image";
// import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Card from "../Card";
import CategorySectionHeader from "../CategorySectionHeader";
import Container from "../Container";
import Grid from "../grid/Grid";
import Typography from "../Typography";

const StyledImage = styled(NextImage)`
  border-radius: 8px;
`;

interface Section10Props {

  onCategorySelect: (category: string) => void;
}

const Section10: React.FC<Section10Props> = ({

  onCategorySelect,
}) => {
  return (
    <Container mb="70px" paddingTop={20}>
      <CategorySectionHeader
        title="Categories"
        iconName="categories"
        seeMoreLink="#"
      />

      <Grid container spacing={6}>
      {displayCategoryList.map((item, ind) => (
  <Grid item lg={2} md={3} sm={4} xs={12} key={ind}>
    <a onClick={() => onCategorySelect(categoryList[ind])}>
      <Card
        display="flex"
        alignItems="center"
        p="0.75rem"
        boxShadow="small"
        borderRadius={8}
        hoverEffect
      >
        <StyledImage
          src={productDatabase[ind * 13 + 70].imgUrl}
          alt="fashion"
          height="52px"
          width="52px"
          objectFit="contain"
        />
        <Typography fontWeight="600" fontSize="14px" ml="10px">
          {item}
        </Typography>
      </Card>
    </a>
  </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const categoryList = ["All", "HW", "SW"];
const displayCategoryList = ["All", "Hardware", "Software"];


export default Section10;
