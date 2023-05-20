import Box from "@component/Box";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import Typography from "../Typography";
import { logoutUser } from "@component/API/auth";
import {
  DashboardNavigationWrapper,
  StyledDashboardNav,
} from "./DashboardStyle";

const CustomerDashboardNavigation = () => {
  const { pathname } = useRouter();
   const router = useRouter(); // Rename to 'router' for consistency

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/login'); // Redirect to login page
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };


  return (
    <DashboardNavigationWrapper px="0px" pb="1.5rem" color="gray.900">
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="text.muted" fontSize="12px">
            {item.title}
          </Typography>
          {item.list.map((item) => (
            <StyledDashboardNav
              isCurrentPath={pathname.includes(item.href)}
              href={item.href}
              key={item.title}
              px="1.5rem"
              mb="1.25rem"
              onClick={item.href === '/logout' ? handleLogout : null}
            >
              <FlexBox alignItems="center">
                <Box className="dashboard-nav-icon-holder">
                  <Icon variant="small" defaultcolor="currentColor" mr="10px">
                    {item.iconName}
                  </Icon>
                </Box>
                <span>{item.title}</span>
              </FlexBox>
              <span>{item.count}</span>
            </StyledDashboardNav>
          ))}
        </Fragment>
      ))}
    </DashboardNavigationWrapper>
  );
};

const linkList = [
  {
    title: "DASHBOARD",
    list: [
      {
        href: "/orders",
        title: "Application",
        iconName: "bag",
        count : null
      },
      {
        href: "/support-tickets",
        title: "Support Tickets",
        iconName: "customer-service",
        count : null
      },
    ],
  },
  {
    title: "ACCOUNT SETTINGS",
    list: [
      {
        href: "/profile",
        title: "Profile Info",
        iconName: "user",
        count : null
      },
      {
        href: "/address",
        title: "Addresses",
        iconName: "pin",
        count : null
      },
      {
        href: "/business-info",
        title: "Business Info",
        iconName: "credit-card",
        count : null
      },
      {
        href: "/logout",
        title: "Logout",
        iconName: "logout",
        count : null
      },
     
    ],
  },
];

export default CustomerDashboardNavigation;
