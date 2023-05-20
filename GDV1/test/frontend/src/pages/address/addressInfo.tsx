import { useContext } from "react";
import TableRow from "@component/TableRow";
import Typography from "@component/Typography";
import Link from "next/link";
import IconButton from "@component/buttons/IconButton";
import Icon from "@component/icon/Icon";
import { AuthContext } from "@context/AuthContext";
import Box from "@component/Box";

const AddressTable = () => {
  const { address } = useContext(AuthContext);

  if (!address) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Box display="flex" alignItems="center" mb="1rem">
        <Icon variant="medium" defaultcolor="auto" mr="12px">
          pin_filled
        </Icon>
        <Typography variant="h4" fontSize="24px" fontWeight="bold">My Address</Typography>
      </Box>

      {address ? (
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
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
};

export default AddressTable;
