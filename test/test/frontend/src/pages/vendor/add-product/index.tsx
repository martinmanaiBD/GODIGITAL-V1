import Button from "@component/buttons/Button";
import Card from "@component/Card";
import DropZone from "@component/DropZone";
import Grid from "@component/grid/Grid";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import Select from "@component/Select";
import TextField from "@component/text-field/TextField";
import TextArea from "@component/textarea/TextArea";
import { Formik } from "formik";
import Link from "next/link";
import React from "react";
import * as yup from "yup";
import productCategories from "@data/Category";
import { addProduct } from "@component/API/product";
import { ValueType, ActionMeta } from "react-select";

const AddProduct = () => {

  const initialValues = {
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    price: yup.number().required('Price is required'),
    description: yup.string().required('Description is required'),
    category: yup.string().required('Category is required'),
    image: yup.mixed().required('Image is required'),
  });

  interface SelectOption {
    value: string;
    label: string;
  }  

  const handleFormSubmit = async (values) => {
    try {
      console.log("Submitting form with values:", values);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("price", values.price);
      console.log("Appending image to formData:", values.image);
      formData.append("image", values.image);

      const result = await addProduct(formData);
  
      console.log("Form data prepared:", formData); // Add this line to log the formData
      console.log("Image in formData:", values.image); // Add this line to log the image file in formData

         // Log formData entries
        // Log formData keys and values
        
        console.log("Submitting form with formData:", formData);
      
  
      console.log("Final result:", result);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  
  
  return (
    <div>
      <DashboardPageHeader
        title="Add Product"
        iconName="delivery-box"
        button={
          <Link href="/vendor/products">
            <Button color="primary" bg="primary.light" px="2rem">
              Back to Product List
            </Button>
          </Link>
        }
      />

      <Card p="30px">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
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
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={6}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="name"
                    label="Name"
                    placeholder="Name"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                <Select
                  mb="1rem"
                  label="Product Category"
                  options={productCategories}
                  onChange={(
                    selectedOption: ValueType<SelectOption>,
                    _actionMeta: ActionMeta<SelectOption>
                  ) => {
                    const selectedValue = (selectedOption as SelectOption).value;
                    console.log("Selected value:", selectedValue);
                    setFieldValue("category", selectedValue);
                  }}
                  onBlur={handleBlur}
                  value={productCategories.find(
                    (option) => option.value === values.category
                  )}
                />
                </Grid>
                

                <Grid item xs={12}>
                <DropZone
                  onChange={(files) => {
                    console.log(files);
                    setFieldValue("image", files[0]);
                    console.log("Image:", values.image);
                  }}
                />
                </Grid>
                
                <Grid item xs={12}>
                  <TextArea
                    name="description"
                    label="Description"
                    placeholder="Description"
                    rows={6}
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description || ""}
                    errorText={touched.description && errors.description}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    name="price"
                    label="Price"
                    placeholder="Price"
                    type="number"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price || ""}
                    errorText={touched.price && errors.price}
                  />
                </Grid>

              </Grid>
              <Button
                mt="25px"
                variant="contained"
                color="primary"
                type="submit"
              >
                Save product
              </Button>
            </form>
          )}
        </Formik>
      </Card>
    </div>
  );
};


AddProduct.layout = VendorDashboardLayout;

export default AddProduct;