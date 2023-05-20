import Image from "@component/Image";
import { useAppContext } from "@context/app/AppContext";
import { CartItem } from "@reducer/cartReducer";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import Box from "../Box";
import Button from "../buttons/Button";
import FlexBox from "../FlexBox";
import Grid from "../grid/Grid";
import Icon from "../icon/Icon";
import { H1, H2, H3, H6, SemiSpan } from "../Typography";

export interface ProductIntroProps {
  imgUrl?: string;
  title: string;
  price: number;
  id?: string | number;
  description?: string;
  name: string;
  qty: number;
}

const ProductIntro: React.FC<ProductIntroProps> = ({
  imgUrl,
  title,
  price,
  id,
  name,
  qty,
  description = "No description available.",
}) => {
  console.log("ProductIntro received:", {
    imgUrl,
    title,
    price,
    id,
    description,
    name,
    qty,
  });

  const defaultImg = "/assets/images/products/headphone.png";
  const imgList = imgUrl ? [imgUrl] : [defaultImg];
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

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <Box>
            <FlexBox justifyContent="center" mb="50px">
            <Image
              width={300}
              height={300}
              src={imgList[selectedImage] ? `http://localhost:5000/${imgList[selectedImage]}` : defaultImg}
              style={{ objectFit: "contain" }}
            />
            </FlexBox>
            {/* <FlexBox overflow="auto">
              {imgUrl.map((url, ind) => (
                <Box
                  size={70}
                  minWidth={70}
                  bg="white"
                  borderRadius="10px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  cursor="pointer"
                  border="1px solid"
                  key={ind}
                  ml={ind === 0 && "auto"}
                  mr={ind === imgUrl.length - 1 ? "auto" : "10px"}
                  borderColor={
                    selectedImage === ind ? "primary.main" : "gray.400"
                  }
                  onClick={handleImageClick(ind)}
                >
                  <Avatar src={url} borderRadius="10px" size={40} />
                </Box>
              ))}
            </FlexBox> */}
          </Box>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb="1rem">{title}</H1>

          <Box mb="24px">
            <H2 color="primary.main" mb="4px" lineHeight="1">
              RM{price.toFixed(2)}
            </H2>
            
          </Box>

          {!cartItem?.qty ? (
            <Button
              variant="contained"
              size="small"
              color="primary"
              mb="36px"
              onClick={handleCartAmountChange(1)}
            >
              Add to Cart
            </Button>
          ) : (
            <FlexBox alignItems="center" mb="36px">
              <Button
                p="9px"
                variant="outlined"
                size="small"
                color="primary"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Icon variant="small">minus</Icon>
              </Button>
              <H3 fontWeight="600" mx="20px">
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>
              <Button
                p="9px"
                variant="outlined"
                size="small"
                color="primary"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <Icon variant="small">plus</Icon>
              </Button>
            </FlexBox>
          )}

          <FlexBox alignItems="top" mb="1rem">
            <SemiSpan lineHeight="1.5">Description:</SemiSpan>
                <H6 lineHeight="1.5" ml="10px">
                  {description}
                </H6>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro;
