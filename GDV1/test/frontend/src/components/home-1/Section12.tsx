import React from "react";
import Card from "../Card";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import { H4, SemiSpan } from "../Typography";

const Section12: React.FC = () => {
  return (
    <Container mb="70px">
      <h4 style={{ fontSize:24}} className="title">WHAT IS GODIGITAL SARAWAK?</h4>
      <Grid container spacing={6}>
        {serviceList.map((item, ind) => (
          <Grid item lg={4} md={6} xs={12} key={ind}>
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
    title: "Bantuan Khas Sarawakku Sayang (BKSS) 5.0 was announced by Datuk Amar Haji Awang Tengah Bin Ali Hassan, Deputy Premier of Sarawak",
  },
  {
    iconName: "credit",
    title: "BKSS 5.0 introduces the Go Digital Sarawak program with the main goal of assisting Micro, Small and Medium Enterprises (MSMEs) with Digitalising their business.",
  },
  {
    iconName: "shield",
    title: "GoDigital Sarawak initiative provides MSMEs involved in Digital Entrepreneurship with a grant to purchase hardware and software with a value of up to RM10,000.00",
  },

];

export default Section12;
