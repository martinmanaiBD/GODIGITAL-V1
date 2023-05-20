import { format, isValid } from "date-fns";
import Link from "next/link";
import React from "react";
import Box from "../Box";
import IconButton from "../buttons/IconButton";
import { Chip } from "../Chip";
import Hidden from "../hidden/Hidden";
import Icon from "../icon/Icon";
import TableRow from "../TableRow";
import Typography, { H5, Small } from "../Typography";

export interface OrderRowProps {
  item: {
    orderNo: any;
    status: string;
    href: string;
    purchaseDate: string | Date;
    price: number | undefined;
  };
}

const OrderRow: React.FC<OrderRowProps> = ({ item }) => {
  const getColor = (status) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "Processing":
        return "secondary";
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "";
    }
  };

  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return isValid(parsedDate) ? format(parsedDate, "MMM dd, yyyy") : "Invalid date";
  };

  const formatPrice = (price) => {
    return typeof price === "number" ? price.toFixed(2) : "N/A";
  };

  return (
    <Link href={`/orders/${item.orderNo}`}>
       <TableRow as="a" href={`/orders/${item.orderNo}`} my="1rem" padding="6px 18px">
        <H5 m="6px" textAlign="left">
          {item.orderNo}
        </H5>
        <Box m="6px">
          <Chip p="0.25rem 1rem" bg={`${getColor(item.status)}.light`}>
            <Small color={`${getColor(item.status)}.main`}>{item.status}</Small>
          </Chip>
        </Box>
        <Typography className="flex-grow pre" m="6px" textAlign="left">
          {formatDate(item.purchaseDate)}
        </Typography>
        <Typography m="6px" textAlign="left">
          RM{formatPrice(item.price)}
        </Typography>

        <Hidden flex="0 0 0 !important" down={769}>
          <Typography textAlign="center" color="text.muted">
            <IconButton size="small">
              <Icon variant="small" defaultcolor="currentColor">
                arrow-right
              </Icon>
            </IconButton>
          </Typography>
        </Hidden>
      </TableRow>
    </Link>
  );
};

export default OrderRow;
