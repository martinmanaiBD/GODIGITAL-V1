import React from "react";
import Card from "../Card";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import { H4, SemiSpan } from "../Typography";

const Section13: React.FC = () => {
  return (
    <Container mb="70px">
        <h4 style={{ fontSize:24}} className="title">WHY GODIGITAL SARAWAK?</h4>
      <Grid container spacing={6}>
        {serviceList.map((item, ind) => (
          <Grid item lg={4} md={6} xs={13} key={ind}>
            <FlexBox
              as={Card}
              flexDirection="column"
              alignItems="center"
              p="3rem"
              height="100%"
              borderRadius={8}
              boxShadow="border"
              hoverEffect
            >
              <FlexBox
                justifyContent="center"
                alignItems="center"
                borderRadius="300px"
                bg="gray.200"
                size="64px"
              >
                <Icon color="secondary" size="1.75rem">
                  {item.iconName}
                </Icon>
              </FlexBox>
              <H4 mt="20px" mb="10px" textAlign="center">
                {item.title}
              </H4>
            </FlexBox>
          </Grid>
        ))}
      </Grid>
      {/* </Card> */}
    </Container>
  );
};

const serviceList = [
  {
    iconName: "truck",
    title: "To assist Entrepreneurs who were affected by the Pandemic",
  },
  {
    iconName: "credit",
    title: "To develop digital-ready entrepreneurs across Sarawak",
    },
  {
    iconName: "shield",
    title: "To actualise the digitalisation efforts of the State Government",
  },

];

export default Section13;
