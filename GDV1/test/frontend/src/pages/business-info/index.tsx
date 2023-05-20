import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Typography from "@component/Typography";
import Link from "next/link";
import React, { useContext } from "react";
import withProtectedLayout from "@component/hoc/withProtectedLayout";
import { AuthContext } from "@context/AuthContext";
import TableRow from "@component/TableRow";
import { API_BASE_URL } from "../../../config";
import Spinner from "@component/Spinner";

const BusinessIndex = () => {
  const { business, isLoading } = useContext(AuthContext);

  return (
    <div>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Spinner />
        </Box>
      ) : (
        <Box>
          {console.log('Business state:', business)}
          <DashboardPageHeader
            iconName="credit-card"
            title="My Business"
            button={
              <Link href="/business-info/edit">
                <Button color="secondary" bg="primary.light" px="2rem">
                  {business ? "Edit Business" : "Add Business"}
                </Button>
              </Link>
            }
          />
          <Box mb="40px">
            <Grid container spacing={10}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Card p="30px 32px" height="100%">
                  {business && (
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
                  )}
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </div>
  );
};

BusinessIndex.layout = DashboardLayout;

export default withProtectedLayout(BusinessIndex, DashboardLayout);
