import { useAppContext } from "@context/app/AppContext";
import { CartItem } from "@reducer/cartReducer";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import Box from "../components/Box";
import Button from "../components/buttons/Button";
import { Card1 } from "../components/Card1";
import Divider from "../components/Divider";
import FlexBox from "../components/FlexBox";
import Grid from "../components/grid/Grid";
import CheckoutNavLayout from "../components/layout/CheckoutNavLayout";
import ProductCard7, { ProductCard7Props } from "../components/product-cards/ProductCard7";
import Typography from "../components/Typography";
import { fetchCartItems } from "../components/API/cart";
import { setCartItems,clearCart } from "../reducers/cartReducer";
import Spinner from "../Spinner";
import UserInfoTable from "./profile/userInfo";
import BusinessTable from "./business-info/businessInfo";
import AddressTable from "../pages/address/addressInfo";
import { useRouter } from "next/router";
import { createApplication, Application } from "../components/API/application";



const SimpleCartItem = ({ id, name, qty, price, imgUrl, }: CartItem) => (
  <div>
    <h3>{name}</h3>
    <p>Price: ${price}</p>
    <p>Quantity: {qty}</p>
    <img src={imgUrl} alt={name} width="100" />
  </div>
);

const Submission = () => {
  const { state, dispatch } = useAppContext();
  const cartList: CartItem[] = state.cart.cartList || [];
  const router = useRouter();
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

  console.log("Updated cart state:", cartList);

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
  const handleSubmission = async () => {
    try {
      // Replace this with the actual userId value
      const userId = 1;
  
      const total = getTotalPrice();
  
      // Create the application
      const newApplication: Application = await createApplication({
        userId,
        total,
      });
  
      console.log("New application created:", newApplication);
  
      // Clear the cart
      console.log("Dispatching clearCart");
      dispatch(clearCart());
  
      // Redirect to the homepage
     // router.push("/");
    } catch (error) {
      console.error("Error creating application:", error);
      console.error("Error message:", error.message);
      console.error("Error response:", error.response);
      // Handle submission error
      return;
    }
  
    // Show success message or navigate to another page
    alert("Your submission was successful!");
  };

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          {Array.isArray(cartList) && cartList.map((item) => (
            <ProductCard7 key={item.id} mb="1.5rem" {...(item as ProductCard7Props)} />
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
            <Link href="/">
            <Button
             variant="contained"
             color="primary"
             fullwidth
             onClick={() => {
              try {
                handleSubmission();
              } catch (error) {
                // Handle submission error
                return;
              }
          
              // Show success message or navigate to another page
              alert("Your submission was successful!");
            }}
              >
             Submit
            </Button>
            </Link>
          </Card1>
        </Grid>
      </Grid>
      <Grid container flexWrap="wrap-reverse" spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          <UserInfoTable />
          <Box mt={4} />
          <BusinessTable />
          <Box mt={4} />
          <AddressTable />
          <Box mt={4} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

Submission.layout = CheckoutNavLayout;

export default Submission;


