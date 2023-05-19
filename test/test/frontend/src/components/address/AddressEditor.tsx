import { createAddress, updateAddress, getAddress, Address } from "../API/address";
import { useRouter } from "next/router";
import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import { Formik } from "formik";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContext";
import * as yup from "yup";
import { FormikHelpers } from "formik";
import DashboardLayout from "../layout/CustomerDashboardLayout";
import Spinner from "Spinner";
import Select from "@component/Select";
import { districtOptions, stateOptions } from "DistrictListOptions";


type FormValues = {
  fullAddress: string;
  district: string;
  postcode: string;
  state: string;
};


const AddressEditor: React.FC<{ isNewAddress: boolean }> & { layout: React.FC } = ({
  isNewAddress,
}) => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const [addressDetails, setAddressDetails] = useState<Address | null>(null);

  useEffect(() => {
    const fetchAddressDetails = async () => {
      

      try {
        const fetchedAddressDetails = await getAddress(user.id);
        console.log("Fetched address details:", fetchedAddressDetails); // Add this line
        setAddressDetails(fetchedAddressDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching address details:", error);
      }
    };

    if (!isNewAddress)  {
      fetchAddressDetails();
    } else {
      setLoading(false);

    }
  },[user, id ]);

  const handleFormSubmit = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    try {
      const userId = user?.id;
      const addressData: Address = {
        userId,
        fullAddress: values.fullAddress,
        district: values.district,
        postcode: values.postcode,
        state: values.state,
      };

      if (isNewAddress) {
        await createAddress(addressData);
        console.log("Address created successfully");
      } else {
        addressData.id = Number(id);
        await updateAddress(addressData);
        console.log("Address updated successfully");
      }

      router.push("/address");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkoutSchema = yup.object().shape({
    fullAddress: yup.string().required("required"),
    district: yup.string().required("required"),
    postcode: yup.string().required("required"),
    state: yup.string().required("required"),
  });

  return (
    <div>
      <DashboardPageHeader
        iconName="pin_filled"
        title={isNewAddress ? "Add New Address" : "Edit Address"}
        button={
          <Link href="/address">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Address
            </Button>
          </Link>
        }
      />
      {loading || !user ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Spinner />
        </Box>
      ) : (
        <Card1>
          <Formik
            initialValues={{
              fullAddress: addressDetails?.fullAddress || "",
              district: addressDetails?.district || "",
              postcode: addressDetails?.postcode || "",
              state: addressDetails?.state || "",
            }}
            validationSchema={checkoutSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue
            }) => {
              const handleSelectChange = (name: string) => (selectedOption: any) => {
                setFieldValue(name, selectedOption.value);
            };
            return (
            
              <form onSubmit={handleSubmit}>
                <Box mb="30px">
                  <Grid container horizontal_spacing={6} vertical_spacing={4}>
                    <Grid item md={12} xs={12}>
                      <TextField
                        name="fullAddress"
                        label="Full Address"
                        fullwidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.fullAddress || ""}
                        errorText={touched.fullAddress && errors.fullAddress}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                    <Select
                        name="district"
                        label="District"
                        onBlur={handleBlur}
                        onChange={handleSelectChange("district")}
                        value={districtOptions.find((option) => option.value === values.district) || ""}
                        errorText={touched.district && errors.district}
                        options={districtOptions}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        name="postcode"
                        label="Postcode"
                        fullwidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.postcode || ""}
                        errorText={touched.postcode && errors.postcode}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                    <Select
                        name="state"
                        label="State"
                        onBlur={handleBlur}
                        onChange={handleSelectChange("state")}
                        value={stateOptions.find((option) => option.value === values.state) || ""}
                        errorText={touched.state && errors.state}
                        options={stateOptions}
                      />
                    </Grid>
                  </Grid>
                </Box>
  
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
              </form>
            )
            }}
          </Formik>
        </Card1>
      )}
    </div>
  );
  };
  
  AddressEditor.layout = DashboardLayout;
  
  export default AddressEditor;
  