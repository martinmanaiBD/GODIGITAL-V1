import Box from "@component/Box";
import Image from "@component/Image";
import { useAppContext } from "@context/app/AppContext";
import Link from "next/link";
import React, { useCallback } from "react";
import { SpaceProps } from "styled-system";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Typography from "../Typography";
import { StyledProductCard0 } from "./ProductCardStyle";
import { CartItem } from "@reducer/cartReducer";

export interface ProductCard0Props {
  id: string | number;
  name: string;
  qty: number;
  price: number;
  imgUrl?: string;
}


const ProductCard0: React.FC<ProductCard0Props & SpaceProps> = ({
  id,
  name,
  qty,
  price,
  imgUrl,
  
  ...props
}) => {
  const { dispatch } = useAppContext();
  const handleCartAmountChange = useCallback(
    (amount) => () => {
      console.log("Changing cart amount:", { amount, name, price, imgUrl, id });
      const cartItem: CartItem = {
        id,
        name,
        qty: amount,
        price,
        imgUrl,
        justification: ""
      };
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: cartItem,
      });
    },
    [dispatch, qty, id, name, price, imgUrl]
  );

  console.log("Rendering ProductCard0:", { id, name, qty, price, imgUrl });

  return (
    <StyledProductCard0 {...props}>
      <Image
        src={imgUrl || "/assets/images/products/iphone-xi.png"}
        size={150}
        display="block"
        alt={name}
      />
      <FlexBox
        className="product-details"
        flexDirection="column"
        justifyContent="space-between"
        minWidth="0px"
        width="100%"
      >
        <Link href={`/product/${id}`}>
          <a>
            <Typography
              className="title"
              fontWeight="600"
              fontSize="18px"
              mb="0.5rem"
            >
              {name}
            </Typography>
          </a>
        </Link>
        <Box position="absolute" right="1rem" top="1rem">
          <IconButton
            padding="4px"
            ml="12px"
            size="small"
            onClick={handleCartAmountChange(0)}
          >
            <Icon size="1.25rem">close</Icon>
          </IconButton>
        </Box>
        <FlexBox
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="gray.600" mr="0.5rem">
            RM{price.toFixed(2)} x {qty}
          </Typography>
          <Typography fontWeight={600} color="primary.main" mr="1rem">
            RM{(price * qty).toFixed(2)}
          </Typography>

          <FlexBox alignItems="center">
            <Button
              variant="outlined"
              color="primary"
              padding="5px"
              size="none"
              borderColor="primary.light"
              onClick={handleCartAmountChange(qty - 1)}
              disabled={qty === 1}
            >
              <Icon variant="small">minus</Icon>
            </Button>
            <Typography mx="0.5rem" fontWeight="600" fontSize="15px">
              {qty}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              padding="5px"
              size="none"
              borderColor="primary.light"
              onClick={handleCartAmountChange(qty + 1)}
            >
              <Icon variant="small">plus</Icon>
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </StyledProductCard0>
  );
};

export default ProductCard0;
