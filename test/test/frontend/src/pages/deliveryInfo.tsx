import React from "react";
import Grid from "../components/grid/Grid";
import CheckoutNavLayout from "../components/layout/CheckoutNavLayout";
import AddressEditor from "../components/address/AddressEditor";
import CheckoutSummary0 from "@component/checkout/CheckoutSummary0";

const Checkout = () => {
  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <AddressEditor isNewAddress={false} />
      </Grid>
      <Grid item lg={4} md={4} xs={12}>
        <CheckoutSummary0 />
      </Grid>
    </Grid>
  );
};

Checkout.layout = CheckoutNavLayout;

export default Checkout;
