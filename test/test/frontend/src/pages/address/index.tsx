import { useContext } from "react";
import Button from "@component/buttons/Button";
import IconButton from "@component/buttons/IconButton";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TableRow from "@component/TableRow";
import Typography from "@component/Typography";
import Link from "next/link";
import Icon from "@component/icon/Icon";
import withProtectedLayout from "@component/hoc/withProtectedLayout";
import { AuthContext } from "@context/AuthContext";


const AddressList = () => {
  const { address } = useContext(AuthContext); // Use address from the context

  return (
    <div>
      <DashboardPageHeader
        title="My Address"
        iconName="pin_filled"
        button={
          <Link href={`/address/${address?.id || "new"}`}>
            <a>
              <Button color="primary" bg="primary.light" px="2rem">
                {address ? "Update Address" : "Add New Address"}
              </Button>
            </a>
          </Link>
        }
      />

      {address && (
        <TableRow my="1rem" padding="6px 18px">
          <Typography className="pre" m="6px" textAlign="left">
            {address.fullAddress}
          </Typography>
          <Typography flex="1 1 260px !important" m="6px" textAlign="left">
            {`${address.district}, ${address.postcode}, ${address.state}`}
          </Typography>

          <Typography className="pre" textAlign="center" color="text.muted">
            <Link href={`/address/${address.id}`}>
              <Typography as="a" href={`/address/${address.id}`} color="inherit">
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    edit
                  </Icon>
                </IconButton>
              </Typography>
            </Link>
          </Typography>
        </TableRow>
      )}
    </div>
  );
};

AddressList.layout = DashboardLayout;

export default withProtectedLayout(AddressList, DashboardLayout);
