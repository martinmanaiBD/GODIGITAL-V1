import React from "react";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import Grid from "../components/grid/Grid";
import CheckoutNavLayout from "../components/layout/CheckoutNavLayout";
import ProfileEditor from "./profile/edit";
import BusinessEditor from "./business-info/edit";
import Box from "@component/Box";

const Details = () => {
  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
      <ProfileEditor/>
        <Box mt={4} />
        <BusinessEditor/>
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <CheckoutSummary />
      </Grid>
    </Grid>
  );
};

Details.layout = CheckoutNavLayout;

export default Details;
