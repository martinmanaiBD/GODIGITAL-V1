import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import { Formik } from "formik";
import Link from "next/link";
import React, { useContext } from "react";
import * as yup from "yup";
import { AuthContext } from "@context/AuthContext";
import { useRouter } from "next/router";

const ProfileEditor = () => {
  const { user, updateUser } = useContext(AuthContext);
  const router = useRouter();

  const initialValues = {
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    icNumber: user?.icNumber || "",
    preferredMediumOfCommunication: user?.preferredMediumOfCommunication || "",
    businessCategory: user?.businessCategory || "",
  };

  const handleFormSubmit = async (values) => {
    try {
      await updateUser({
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        icNumber: values.icNumber,
        preferredMediumOfCommunication: values.preferredMediumOfCommunication,
        businessCategory: values.businessCategory,
      });
      // Redirect to the Profile page or show a success message
      router.push("/profile");
    } catch (error) {
      // Handle the error (e.g., show an error message)
    }
  };
  



  const checkoutSchema = yup.object().shape({
    fullName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phoneNumber: yup.string().required("required"),
    icNumber: yup.string().required("required"),
    preferredMediumOfCommunication: yup.string().required("required"),
    businessCategory: yup.string().required("required"),
  });


  return (
    <div>
      <DashboardPageHeader
        iconName="user_filled"
        title="Edit Profile"
        button={
          <Link href="/profile">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Profile
            </Button>
          </Link>
        }
      />

      <Card1>
        <Formik
          initialValues={initialValues}
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
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb="30px">
                <Grid container horizontal_spacing={6} vertical_spacing={4}>
                  <Grid item md={12} xs={12}>
                    <TextField
                      name="fullName"
                      label="Full Name"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fullName}
                      errorText={touched.fullName && errors.fullName}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="email"
                      type="email"
                      label="Email"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      errorText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="phoneNumber"
                      label="Phone Number"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phoneNumber}
                      errorText={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="icNumber"
                      label="I.C. Number"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.icNumber}
                      errorText={touched.icNumber && errors.icNumber}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="preferredMediumOfCommunication"
                      label="Preferred Medium of Communication"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.preferredMediumOfCommunication}
                      errorText={
                        touched.preferredMediumOfCommunication && errors.preferredMediumOfCommunication
                      }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      name="businessCategory"
                      label="Business Category"
                      fullwidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.businessCategory}
                      errorText={
                        touched.businessCategory && errors.businessCategory
                      }
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </div>
  );
};

ProfileEditor.layout = DashboardLayout;

export default ProfileEditor;

