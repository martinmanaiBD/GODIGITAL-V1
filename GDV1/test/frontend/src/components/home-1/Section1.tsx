import Box from "@component/Box";
import CarouselCard1 from "@component/carousel-cards/CarouselCard1";
import Carousel from "@component/carousel/Carousel";
import Container from "@component/Container";
import Navbar from "@component/navbar/Navbar";
import React, { Fragment } from "react";

const Section1: React.FC = () => {
  return (
    <Fragment>
      <Navbar navListOpen={true} />
      <Box bg="gray.white" mb="3.75rem">
        <Container pb="2rem">
          <Carousel
            totalSlides={1}
            visibleSlides={0}
            infinite={true}
            autoPlay={true}
            showDots={false}
            showArrow={false}
            spacing="0px"
          >
            <CarouselCard1 />
            
          </Carousel>
        </Container>
      </Box>
    </Fragment>
  );
};

export default Section1;
