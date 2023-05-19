import { useAppContext } from "@context/app/AppContext";
import { CartItem, cartActionType } from "@reducer/cartReducer";
import Link from "next/link";
import React, { Fragment, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { CSSProperties } from "styled-components";
import Box from "../Box";
import Button from "../buttons/Button";
import { CardProps } from "../Card";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import { H3, SemiSpan } from "../Typography";
import { StyledProductCard1 } from "./ProductCardStyle";


export interface ProductCard1Props extends CardProps {
  className?: string;
  name: string;
  style?: CSSProperties;
  imgUrl?: string;
  title?: string;
  price?: number;
  qty: number;
  off?: number;
  rating?: number;
  id?: string | number;
  category?: "SW" | "HW";
  
}

const ProductCard1: React.FC<ProductCard1Props> = ({
  imgUrl,
  title,
  price,
  id,
  qty,
  category,
  ...props
}) => {


  const getCategoryLabel = (category: "SW" | "HW" | undefined) => {
    switch (category) {
      case "SW":
        return "Software";
      case "HW":
        return "Hardware";
      default:
        return "";
    }
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const { state, dispatch } = useAppContext();
  const cartList: CartItem[] = state.cart.cartList;
  const router = useRouter();
  const routerId = router.query.id as string;
  const cartItem = cartList.find(
    (item) => item.id === id || item.id === routerId
  );
  const handleImageClick = (ind) => () => {
    setSelectedImage(ind);
  };


  const handleCartAmountChange = useCallback(
    (amount) => () => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          qty: amount,
          name: title,
          price,
          imgUrl: imgUrl,
          id: id || routerId,
          justification: cartItem?.justification || "", // Add this line
        },
      });
    },
    [dispatch, qty, price, imgUrl, id, routerId, cartItem?.justification] // Add cartItem?.justification here and remove the empty array []
  );

  return (
    <StyledProductCard1 {...props}>
      <div className="image-holder">
        <FlexBox className="extra-icons">
          <Icon
            color="secondary"
            variant="small"
            mb="0.5rem"

          >
            eye-alt
          </Icon>

          <Icon className="favorite-icon outlined-icon" variant="small">
            heart
          </Icon>
        </FlexBox>

        <Link href={`/product/${id}`}>
          <a>
          <img
            src={imgUrl}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
          </a>
        </Link>
      </div>
      <div className="details">
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
            <Link href={`/product/${id}`}>
              <a>
                <H3
                  className="title"
                  fontSize="20px"
                  textAlign="left"
                  fontWeight="600"
                  color="text.secondary"
                  mb="10px"
                  title={title}
                >
                  {title}
                </H3>
              </a>
            </Link>

            <SemiSpan fontSize="14px" color="" mb="10px">
              {getCategoryLabel(category)}
            </SemiSpan>

            {/* <Rating value={rating || 0} outof={5} color="warn" readonly /> */}

            <FlexBox alignItems="center" mt="10px">
            <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
            RM {(price)}
            </SemiSpan>
            </FlexBox>
          </Box>

          <FlexBox
            flexDirection="column-reverse"
            alignItems="center"
            justifyContent={!!cartItem?.qty ? "space-between" : "flex-start"}
            width="30px"
          >
            {/* <div className="add-cart"> */}
            <Button
             variant="outlined"
             color="primary"
             padding="3px"
             size="none"
             borderColor="primary.light"
             onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
>
            <Icon variant="small">plus</Icon>
            </Button>

            {!!cartItem?.qty && (
              <Fragment>
                <SemiSpan color="text.primary" fontWeight="600">
                  {cartItem?.qty}
                </SemiSpan>
                <Button
                  variant="outlined"
                  color="primary"
                  padding="3px"
                  size="none"
                  borderColor="primary.light"
                  onClick={handleCartAmountChange(cartItem?.qty - 1)}
                >
                  <Icon variant="small">minus</Icon>
                </Button>
              </Fragment>
            )}
          </FlexBox>
        </FlexBox>
      </div>

    
    </StyledProductCard1>
  );
};

export default ProductCard1;
