import Box from "@component/Box";
import Button from "@component/buttons/Button";
import { Card1 } from "@component/Card1";
import Grid from "@component/grid/Grid";
import Select from "@component/Select";
import DashboardLayout from "@component/layout/CustomerDashboardLayout";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import TextField from "@component/text-field/TextField";
import { Formik } from "formik";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@context/AuthContext";
import DropZone from "@component/DropZone";
import { getBusiness, Business } from "@component/API/business";
import Spinner from "@component/Spinner";
import { averageRevenueOptions, franchiseStatusOptions, businessNatureOptions, businessSchema, } from '../../businessFormConfig';


const BusinessEditor: React.FC & { layout: React.FC } = () => {
    const router = useRouter();
    const { user, createOrUpdateBusinessInfo } = useContext(AuthContext);
    const [loading, setLoading] = useState(true); // Add this line
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const [businessDetails, setBusinessDetails] = useState<Business | null>(null);
    useEffect(() => {
        const fetchBusinessDetails = async () => {
            if (!user) return;

            try {
                const response = await getBusiness(user.id);
                console.log("Fetched business data:", response);
                setBusinessDetails(response.business);
                setLoading(false); // Set loading to false after fetching the data (this line is new)
            } catch (error) {
                console.error("Error fetching business data:", error);
            }
        };

        if (user) {
            fetchBusinessDetails();
        }
    }, [user]); // Add fetched to the dependency array

    const findOptionByValue = (options, value) => {
        return options.find((option) => option.value === value) || null;
    };


    const initialValues = {
        companyName: businessDetails?.companyName || "",
        businessAddress: businessDetails?.businessAddress || "",
        averageRevenue: businessDetails?.averageRevenue,
        businessNature: businessDetails?.businessNature || "",
        registrationNumber: businessDetails?.registrationNumber || "",
        franchiseStatus: businessDetails?.franchiseStatus === "true" ? "YES" : "NO",
        franchiseNumber: businessDetails?.franchiseNumber || "",
    };

    const handleFormSubmit = async (values: typeof initialValues) => {
        if (!user) {
          console.error("User not found");
          return;
        }
        try {
          setUploading(true);
          const userId = user?.id;
          const businessData: Business = {
            userId,
            companyName: values.companyName,
            businessAddress: values.businessAddress,
            averageRevenue: values.averageRevenue,
            businessNature: values.businessNature,
            registrationNumber: values.registrationNumber,
            franchiseStatus: values.franchiseStatus === "YES" ? "true" : "false",
            franchiseNumber: values.franchiseNumber,
          };
      
          if (businessDetails) {
            businessData.id = businessDetails.id;
          }
      
          const formData = new FormData();
      
          if (files.length > 0) {
            formData.append("document", files[0]); // Append the first file under the key 'document'
          }
      
          // Append the userId field to formData
          formData.append("userId", userId.toString());

      
          await createOrUpdateBusinessInfo(businessData, formData);
      
          console.log("Business updated successfully");
          setUploading(false);
          router.push("/business-info");
        } catch (error) {
          console.error("Error:", error);
          setUploading(false);
        }
    };
    
      
    
    return (
        <div>
            <DashboardPageHeader
                iconName="credit-card"
                title="Edit Business"
                button={
                    <Link href="/business-info">
                        <Button color="primary" bg="primary.light" px="2rem">
                            Back to Business
                        </Button>
                    </Link>
                }
            />
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <Spinner />
                </Box>
            ) : (
                <Card1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={businessSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            setFieldValue,
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
                                                    name="companyName"
                                                    label="Company Name"
                                                    fullwidth
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.companyName}
                                                    errorText={touched.companyName && errors.companyName}
                                                />
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <TextField
                                                    name="businessAddress"
                                                    label="Business Address"
                                                    fullwidth
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.businessAddress}
                                                    errorText={
                                                        touched.businessAddress && errors.businessAddress
                                                    }
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <Select
                                                    options={averageRevenueOptions}
                                                    value={findOptionByValue(averageRevenueOptions, values.averageRevenue)}
                                                    onChange={handleSelectChange("averageRevenue")}
                                                    getOptionValue={(option) => option.value}
                                                    name="averageRevenue"
                                                    label="Average Monthly Revenue"
                                                    errorText={touched.averageRevenue && errors.averageRevenue}
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <Select
                                                    options={businessNatureOptions}
                                                    value={findOptionByValue(businessNatureOptions, values.businessNature)}
                                                    onChange={handleSelectChange("businessNature")}
                                                    getOptionValue={(option) => option.value}
                                                    name="businessNature"
                                                    label="Business Nature"
                                                    errorText={touched.businessNature && errors.businessNature}
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    name="registrationNumber"
                                                    label="Business Registration Number"
                                                    fullwidth
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.registrationNumber}
                                                    errorText={touched.registrationNumber && errors.registrationNumber}
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <Select
                                                    options={franchiseStatusOptions}
                                                    value={findOptionByValue(franchiseStatusOptions, values.franchiseStatus)}
                                                    onChange={handleSelectChange("franchiseStatus")}
                                                    label="Franchise Status"
                                                    errorText={touched.franchiseStatus && errors.franchiseStatus}
                                                    name="franchiseStatus"
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                {values.franchiseStatus === "YES" ? (
                                                    <TextField
                                                        name="franchiseNumber"
                                                        label="Franchise Number"
                                                        fullwidth
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.franchiseNumber || ""}
                                                        errorText={touched.franchiseNumber && errors.franchiseNumber}
                                                    />
                                                ) : null}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <DropZone
                                                    onChange={(files) => {
                                                        setFiles(files);
                                                        console.log("Selected files:", files);
                                                    }}
                                                />
                                                {uploading && (
                                                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50px" mt={2}>
                                                        <Spinner />
                                                    </Box>
                                                )}
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
BusinessEditor.layout = DashboardLayout;

export default BusinessEditor;


