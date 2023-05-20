import IconButton from "@component/buttons/IconButton";
import Image from "@component/Image";
import { useAppContext } from "@context/app/AppContext";
import Link from "next/link";
import React, { useState, useContext } from "react";
import Box from "../Box";
import Container from "../Container";
import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import MiniCart from "../mini-cart/MiniCart";
import SearchBox from "../search-box/SearchBox";
import Login from "../sessions/Login";
import Sidenav from "../sidenav/Sidenav";
import Typography, { Tiny } from "../Typography";
import StyledHeader from "./HeaderStyle";
import UserLoginDialog from "./UserLoginDialog";
import { AuthContext } from "@context/AuthContext";

type HeaderProps = {
  isFixed?: boolean;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);
  const { state } = useAppContext();
  const { cartList } = state.cart;
  const { user, isAuthenticated } = useContext(AuthContext);

  const cartHandle = (
    <FlexBox ml="20px" alignItems="flex-start">
      <IconButton bg="gray.200" p="12px">
        <Icon size="20px">bag</Icon>
      </IconButton>

      {!!cartList.length && (
        <FlexBox
          borderRadius="300px"
          bg="error.main"
          px="5px"
          py="2px"
          alignItems="center"
          justifyContent="center"
          ml="-1rem"
          mt="-9px"
        >
          <Tiny color="white" fontWeight="600">
            {cartList.length}
          </Tiny>
        </FlexBox>
      )}
    </FlexBox>
  );

  return (
    <StyledHeader className={className}>
      <Container
      display="flex"
        alignItems="center"
        justifyContent="center"
        
      >
        <FlexBox>
          
          </FlexBox>
      </Container>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        height="100%"
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
        <Box width="120px"> 
          <Link href="/">
            <a>
              <Image src="/assets/images/logo.png" alt="logo" />
            </a>
          </Link>
          </Box>
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
        Dikuasakan oleh MINTRED & SDEC
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
        <UserLoginDialog
  handle={
    isAuthenticated ? (
      <Link href="/profile">
        <a>
          <IconButton ml="1rem" bg="gray.200" p="8px">
            <Icon size="28px">user</Icon>
          </IconButton>
        </a>
      </Link>
    ) : (
      <IconButton ml="1rem" bg="gray.200" p="8px">
        <Icon size="28px">user</Icon>
      </IconButton>
    )
  }
>
  <Box>
    {isAuthenticated ? (
      <Link href="/profile">
        <a>Profile</a>
      </Link>
    ) : (
      <Login />
    )}
  </Box>
</UserLoginDialog>



          <Sidenav
            handle={cartHandle}
            position="right"
            open={open}
            width={380}
            toggleSidenav={toggleSidenav}
          >
            <MiniCart toggleSidenav={toggleSidenav} />
          </Sidenav>
        </FlexBox>
      </Container>
    </StyledHeader>
  );
};

export default Header;
