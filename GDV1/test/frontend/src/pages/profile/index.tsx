import Box from "@component/Box";
import Button from "@component/buttons/Button";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import Typography from "@component/Typography";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import withProtectedLayout from "@component/hoc/withProtectedLayout";
import { AuthContext } from "@context/AuthContext";
import TableRow from "@component/TableRow";

const Profile = () => {
  const { user, fetchUserData } = useContext(AuthContext);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <DashboardPageHeader
        iconName="user_filled"
        title="My Profile"
        button={
          <Link href="/profile/edit">
            <Button color="secondary" bg="primary.light" px="2rem">
              Edit Profile
            </Button>
          </Link>
        }
      />

      <Box mb="40px">
        <Grid container spacing={10}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Card p="30px 32px" height="100%">
              <TableRow p="0.90rem 1.5rem" mb="20px">
                <Typography fontSize="14px" color="text.muted" mr="16px">
                  Full Name :
                </Typography>
                <Typography fontSize="14px">{user.fullName}</Typography>
              </TableRow>
              <TableRow p="0.90rem 1.5rem" mb="20px">
                <Typography fontSize="14px" color="text.muted" mr="16px">
                  Email :
                </Typography>
                <Typography fontSize="14px">{user.email}</Typography>
              </TableRow>
              <TableRow p="0.90rem 1.5rem" mb="20px">
                <Typography fontSize="14px" color="text.muted" mr="16px">
                  Phone Number :
                </Typography>
                <Typography fontSize="14px">{user.phoneNumber}</Typography>
              </TableRow>
              <TableRow p="0.90rem 1.5rem" mb="20px">
                <Typography fontSize="14px" color="text.muted" mr="16px">
                  I.C. Number :
                </Typography>
                <Typography fontSize="14px">{user.icNumber}</Typography>
              </TableRow>
              <TableRow p="0.90rem 1.5rem" mb="20px">
                <Typography fontSize="14px" color="text.muted" mr="16px">
                  Preferred Medium of Communication :
                </Typography>
                <Typography fontSize="14px">
                  {user.preferredMediumOfCommunication}
                </Typography>
              </TableRow>
              <TableRow p="0.90rem 1.5rem" mb="20px">
                <Typography fontSize="14px" color="text.muted" mr="16px">
                  Business Category :
                </Typography>
                <Typography fontSize="14px">{user.businessCategory}</Typography>
              </TableRow>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

Profile.layout = DashboardLayout;

export default withProtectedLayout(Profile, DashboardLayout);
