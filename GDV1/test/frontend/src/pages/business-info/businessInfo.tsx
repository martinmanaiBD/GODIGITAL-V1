import React, { useContext } from "react";
import { AuthContext } from "@context/AuthContext";
import TableRow from "@component/TableRow";
import Typography from "@component/Typography";
import Link from "next/link";
import { API_BASE_URL } from "../../../config";
import Icon from "@component/icon/Icon";
import Box from "@component/Box";

const BusinessTable = () => {
  const { business } = useContext(AuthContext);

  if (!business) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
    <Box display="flex" alignItems="center" mb="1rem">
      <Icon variant="large" defaultcolor="auto" mr="12px">
      credit-card
      </Icon>
      <Typography variant="h4" fontSize="24px" fontWeight="bold">
        My Business
      </Typography>
    </Box>
    {business ? (
      <>
                         <TableRow p="0.90rem 1.5rem" mb="20px">
                       <Typography fontSize="14px" color="text.muted" mr="16px">
                         Company Name :
                      </Typography>
                        <Typography fontSize="14px">{business.companyName}</Typography>
                        </TableRow>
                      <TableRow p="0.90rem 1.5rem" mb="20px">
                        <Typography fontSize="14px" color="text.muted" mr="16px">
                          Business Address :
                        </Typography>
                        <Typography fontSize="14px">{business.businessAddress}</Typography>
                      </TableRow>
                      <TableRow p="0.90rem 1.5rem" mb="20px">
                        <Typography fontSize="14px" color="text.muted" mr="16px">
                          Average Revenue :
                        </Typography>
                        <Typography fontSize="14px">{business.averageRevenue}</Typography>
                      </TableRow>
                      <TableRow p="0.90rem 1.5rem" mb="20px">
                        <Typography fontSize="14px" color="text.muted" mr="16px">
                          Business Nature :
                        </Typography>
                        <Typography fontSize="14px">{business.businessNature}</Typography>
                      </TableRow>
                      <TableRow p="0.90rem 1.5rem" mb="20px">
                        <Typography fontSize="14px" color="text.muted" mr="16px">
                          Registration Number :
                        </Typography>
                        <Typography fontSize="14px">{business.registrationNumber}</Typography>
                      </TableRow>
                      <TableRow p="0.90rem 1.5rem" mb="20px">
                        <Typography fontSize="14px" color="text.muted" mr="16px">
                          Franchise Status :
                        </Typography>
                        <Typography fontSize="14px">
                          {business.franchiseStatus ? "Yes" : "No"}
                        </Typography>
                      </TableRow>
                      {business.franchiseStatus && (
                        <TableRow p="0.90rem 1.5rem" mb="20px">
                          <Typography fontSize="14px" color="text.muted" mr="16px">
                            Franchise Number :
                          </Typography>
                          <Typography fontSize="14px">{business.franchiseNumber}</Typography>
                        </TableRow>
                      )}
                      <TableRow p="0.90rem 1.5rem" mb="20px">
                        <Typography fontSize="14px" color="text.muted" mr="16px">
                          Business Document :
                        </Typography>
                        {business.documentPath && (
                          <Link href={`${API_BASE_URL}/${business.documentPath.replace(/\\/g, '/')}`}>
                            <a target="_blank" rel="noopener noreferrer">
                              View Document
                            </a>
                          </Link>
                        )}
                      </TableRow>
                      </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
};

export default BusinessTable;