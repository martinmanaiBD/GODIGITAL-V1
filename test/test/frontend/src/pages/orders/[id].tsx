import Avatar from "@component/avatar/Avatar";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import Typography, { H5, H6, Paragraph } from "@component/Typography";
import productDatabase from "@data/product-database";
import useWindowSize from "@hook/useWindowSize";
import { format } from "date-fns";
import React, { Fragment, useState, useEffect } from "react";
import { getApplicationsByUserId } from '@component/API/application';
import { fetchCartItems } from "@component/API/cart";
import { useAppContext } from "@context/app/AppContext";
import { CartItem, setCartItems } from "@reducer/cartReducer";
import ProductCard12 from "@component/product-cards/ProductCard12";
import Spinner from "@component/Spinner";

type OrderStatus = "packaging" | "shipping" | "delivering" | "complete";

const OrderDetails = () => {
  const orderStatus: OrderStatus = "shipping";
  const orderStatusList = ["packaging", "shipping", "delivering", "complete"];
  const stepIconList = ["package-box", "truck-1", "delivery"];
  const [applications, setApplications] = useState([]);
  const statusIndex = orderStatusList.indexOf(orderStatus);
  const { state, dispatch } = useAppContext();
  const cartList: CartItem[] = state.cart.cartList || [];
  const [loading, setLoading] = useState(true);
  const width = useWindowSize();
  const breakpoint = 350;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplicationsByUserId();
        setApplications(data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();

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
    <div>
      <DashboardPageHeader
        title="Application Details"
        iconName="bag_filled"
      />

    
      <Card p="0px" mb="30px" overflow="hidden">
      <TableRow bg="gray.200" p="12px" boxShadow="none" borderRadius={0}>
        <FlexBox className="pre" m="6px" alignItems="center">
         <Typography fontSize="14px" color="text.muted" mr="4px">
          Application No:
         </Typography>
        <Typography fontSize="14px">{applications[0]?.applicationId}</Typography>
        </FlexBox>
            <FlexBox className="pre" m="6px" alignItems="center">
            <Typography fontSize="14px" color="text.muted" mr="4px">
             Submitted On:
            </Typography>
            <Typography fontSize="14px">
            {
              applications[0]?.createdAt
             ? format(new Date(applications[0].createdAt), "dd MMM, yyyy")
             : "Loading..."
            }
            </Typography>
          </FlexBox>
        </TableRow>

        <Box py="0.5rem">
        {cartList.map((item) => (
    <ProductCard12
      key={item.id}
      id={item.id}
      name={item.name}
      qty={item.qty}
      price={item.price}
      imgUrl={item.imgUrl}
      justification={item.justification}
            >
              <FlexBox flex="2 2 260px" m="6px" alignItems="center">
                <Avatar src={item.imgUrl} size={64} />
                <Box ml="20px">
                  <H6 my="0px">{item}</H6>
                  <Typography fontSize="14px" color="text.muted">
                    RM{item.price} x 1
                  </Typography>
                </Box>
              </FlexBox>
              <FlexBox flex="1 1 260px" m="6px" alignItems="center">
                <Typography fontSize="14px" color="text.muted">
                  Justification : This is one two three
                </Typography>
              </FlexBox>
              <FlexBox flex="160px" m="6px" alignItems="center">
                <Button variant="text" color="primary">
                  <Typography fontSize="14px">View Item</Typography>
                </Button>
              </FlexBox>
            </ProductCard12>
          ))}
        </Box>
      </Card>

      <Grid container spacing={6}>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              Delivery Address
            </H5>
            <Paragraph fontSize="14px" my="0px">
              Kampung Mang, Kota Samarahan.
            </Paragraph>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Card p="20px 30px">
            <H5 mt="0px" mb="14px">
              Total Summary
            </H5>

            <Divider mb="0.5rem" />

            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
            >
              <H6 my="0px">Total</H6>
              <H6 my="0px">RM9250</H6>
            </FlexBox>

          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

OrderDetails.layout = DashboardLayout;

export default OrderDetails;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

