import React from "react";
import Button from "../buttons/Button";
import { Card1 } from "../Card1";
import Divider from "../Divider";
import FlexBox from "../FlexBox";
import Typography from "../Typography";
import { useAppContext } from "@context/app/AppContext";
import { useRouter } from "next/router";

const CheckoutSummary0: React.FC = () => {
  const { state } = useAppContext();
  const cartList = state.cart.cartList || [];

  const subtotal = cartList.reduce(
    (accumulator, item) => accumulator + item.price * item.qty,
    0
  );

  const router = useRouter();

  const handleProceedToSubmission = () => {
    router.push('/submission');
  };

  return (
    <Card1>
      <FlexBox justifyContent="space-between" alignItems="center" mb="0.5rem">
        <Typography color="text.hint">Subtotal:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            RM{subtotal.toFixed(2)}
          </Typography>
        </FlexBox>
      </FlexBox>

      <Divider mb="1rem" />

      <Typography
        fontSize="25px"
        fontWeight="600"
        lineHeight="1"
        textAlign="right"
        mb="1.5rem"
      >
        RM{subtotal.toFixed(2)}
      </Typography>

      <Button
  variant="outlined"
  color="primary"
  mt="1rem"
  mb="30px"
  fullwidth
  onClick={handleProceedToSubmission}
>
  Proceed To Submission
</Button>

    </Card1>
  );
};

export default CheckoutSummary0;
