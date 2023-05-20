import AddressEditor from "@component/address/AddressEditor";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import React from "react";
import { useRouter } from "next/router";

const AddressUpdater = () => {
  const router = useRouter();
  const { id } = router.query;
  const isAddingNewAddress = id === "new";

  return <AddressEditor isNewAddress={isAddingNewAddress} />;
};

AddressUpdater.layout = DashboardLayout;

export default AddressUpdater;
