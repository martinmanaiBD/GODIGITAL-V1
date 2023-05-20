import { useAppContext } from "@context/app/AppContext";
import { CartItem } from "@reducer/cartReducer";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import Button from "../components/buttons/Button";
import { Card1 } from "../components/Card1";
import Divider from "../components/Divider";
import FlexBox from "../components/FlexBox";
import Grid from "../components/grid/Grid";
import CheckoutNavLayout from "../components/layout/CheckoutNavLayout";
import ProductCard0, { ProductCard0Props } from "../components/product-cards/ProductCard0";
import Typography from "../components/Typography";
import { fetchCartItems } from "../components/API/cart";
import { setCartItems } from "../reducers/cartReducer";
import Spinner from "../Spinner";

const SimpleCartItem = ({ id, name, qty, price, imgUrl }: CartItem) => (
  <div>
    <h3>{name}</h3>
    <p>Price: ${price}</p>
    <p>Quantity: {qty}</p>
    <img src={imgUrl} alt={name} width="100" />
  </div>
);


const Cart = () => {
  const { state, dispatch } = useAppContext();
  const cartList: CartItem[] = state.cart.cartList || [];

  console.log("State cart:", state.cart);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await fetchCartItems();
        console.log("Fetched cart items:", items);
        dispatch(setCartItems(items.items));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    fetchItems();
  }, [dispatch]);

  console.log("Updated cart state:", cartList); // Add this line here

  const getTotalPrice = () => {
    return (
      (Array.isArray(cartList) && cartList.reduce(
        (accumulator, item) => accumulator + item.price * item.qty,
        0
      )) || 0
    );
  };

  if (loading) {
    return <Spinner />;
  }

  console.log("Cart list:", cartList);

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
        {Array.isArray(cartList) && cartList.map((item) => (
            <ProductCard0 key={item.id} mb="1.5rem" {...(item as ProductCard0Props)} />
          ))}
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Card1>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
            >
              <Typography color="gray.600">Total:</Typography>
              <FlexBox alignItems="flex-end">
                <Typography fontSize="18px" fontWeight="600" lineHeight="1">
                  RM{getTotalPrice().toFixed(2)}
                </Typography>
                <Typography fontWeight="600" fontSize="14px" lineHeight="1">
                  
                </Typography>
              </FlexBox>
            </FlexBox>
            <Divider mb="1rem" />
            <Link href="/details">
              <Button variant="contained" color="primary" fullwidth>
                Proceed To Application Details
              </Button>
            </Link>
          </Card1>
        </Grid>
      </Grid>
    </Fragment>
  );
};

Cart.layout = CheckoutNavLayout;

export default Cart;
