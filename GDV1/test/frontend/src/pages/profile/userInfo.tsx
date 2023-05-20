import React, { useContext, useEffect } from "react";
import Typography from "@component/Typography";
import { AuthContext } from "@context/AuthContext";
import TableRow from "@component/TableRow";
import Box from "@component/Box";
import Icon from "@component/icon/Icon";


const UserInfoTable = () => {
  const { user, fetchUserData } = useContext(AuthContext);

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
       
      <Box display="flex" alignItems="center" mb="1rem">
        <Icon variant="medium" color="primary" mr="12px">
        user_filled
        </Icon>
        <Typography variant="h4" fontSize="24px" fontWeight="bold">
          My Profile
        </Typography>
      </Box>
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
  </div>
  );
};

export default UserInfoTable;
