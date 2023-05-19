import React from "react";
import Button from "../buttons/Button";
import Typography from "../Typography";
import { StyledCarouselCard1 } from "./CarouselCardStyle";

export interface CarouselCard1Props {}

const CarouselCard1: React.FC<CarouselCard1Props> = () => {
  return (
    <StyledCarouselCard1>
      <div>
      <img
          src="/assets/images/products/GD Sarawak-GB02.png"
          alt="godigital-logo"
        />
        <h4 style={{ fontSize:24}} className="title">A TECH GRANT FOR SARAWAKIAN MSMEs TO DIGITALISE THEIR BUSINESS</h4>
        <Button
          className="button-link"
          variant="contained"
          color="primary"
          p="1rem 1.5rem"
        >
          View Products
        </Button>
      </div>

      <div className="image-holder">
        <img
          src="/assets/images/products/Home-2-1.png"
          alt="godigital-home"
        />
      </div>
    </StyledCarouselCard1>
  );
};

export default CarouselCard1;
