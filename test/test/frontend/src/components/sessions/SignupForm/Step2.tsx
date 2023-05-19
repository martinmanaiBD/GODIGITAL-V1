import React from "react";
import CheckBox from "../../CheckBox";
import { H3, H5, H6 } from "../../Typography";
import { StyledSessionCard } from "../SessionStyle";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../../buttons/Button";
import axios from 'axios';
import {API_BASE_URL} from '../../../../config';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../../../../public/assets/images/logo.png';

// Add the following prop type definitions
type Step2Props = {
  onPrev: () => void;
  onSubmit: (values: any) => Promise<void>;
  nextStepUrl: string;
};



const Step2: React.FC<Step2Props> = ({ onPrev, nextStepUrl }) => {
  
    const step1Data = JSON.parse(localStorage.getItem("signupFormStep1Data"));

    const router = useRouter();
    const handleFormSubmit = async (values) => { 
    const mergedData = {
      ...step1Data,
      ...values
    };

    // Handle form submission logic here using the merged form data
    console.log("Submitting form with values:", mergedData);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/register`, mergedData);
      console.log("Response:", response.data);
  
      // If signup is successful, show success message
      alert("Registration successful");
      // Clear local storage and navigate to the desired page
      localStorage.removeItem("step1Data");
      router.push(nextStepUrl);
    } catch (err) {
      console.error("Error occurred while submitting form:", err);
      if (err.response) {
        console.log("Response data:", err.response.data);
      }
      if (err.request) {
        console.log("Request:", err.request);
      }
    }
  };

  const initialValues = {
    preferredMediumOfCommunication: "",
    businessCategory: "",
    acceptanceToTermsAndConditions: false,
  };

  const formSchema = yup.object().shape({
    preferredMediumOfCommunication: yup
      .string()
      .oneOf(["whatsapp", "sms"], "Select a valid communication method")
      .required("Preferred communication is required"),
    businessCategory: yup
      .string()
      .oneOf(["F&B", "services", "product-based"], "Select a valid business category")
      .required("Business category is required"),
    acceptanceToTermsAndConditions: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
      
  });

  const {
    values,
    handleChange,
    handleSubmit,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });

  const handleBack = () => {
    onPrev();
  };

  return (
    <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
  <div className="logo-container" style={{ display: "flex", justifyContent: "center", paddingTop: "20px", marginBottom: "1rem" }}>
    <Image src={logo} alt="Logo" width={200} height={50} />
</div>
  <form className="content" onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
    <H3 textAlign="center" mb="0.5rem">
      Registration Form
    </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Please fill in all forms to continue
        </H5>

        <H6 mb="1rem">Choose your medium of preferred communication:</H6>
        <CheckBox
          mb="0.5rem"
          name="preferredMediumOfCommunication"
          type="radio"
          value="whatsapp"
          color="primary"
          checked={values.preferredMediumOfCommunication === "whatsapp"}
          onChange={handleChange}
          label="Whatsapp"
        />
        <CheckBox
          mb="1.5rem"
          name="preferredMediumOfCommunication"
          type="radio"
          value="sms"
          color="primary"
          checked={values.preferredMediumOfCommunication === "sms"}
          onChange={handleChange}
          label="SMS"
        />
    
        <H6 mb="1rem">Define Your Business Category:</H6>
        <CheckBox
          mb="0.5rem"
          name="businessCategory"
          type="radio"
          value="F&B"
          color="primary"
          checked={values.businessCategory === "F&B"}
          onChange={handleChange}
          label="F&B"
        />
        <CheckBox
          mb="0.5rem"
          name="businessCategory"
          type="radio"
          value="services"
          color="primary"
          checked={values.businessCategory === "services"}
          onChange={handleChange}
          label="Services"
        />
        <CheckBox
          mb="1.5rem"
          name="businessCategory"
          type="radio"
          value="product-based"
          color="primary"
          checked={values.businessCategory === "product-based"}
          onChange={handleChange}
          label="Product-based"
        />
        <CheckBox
          mb="1.5rem"
          name="acceptanceToTermsAndConditions"
          type="checkbox"
          color="primary"
          checked={values.acceptanceToTermsAndConditions}
          onChange={handleChange}
          label="I agree to the terms and conditions"
        />
    
        <Button
          mb="1.5rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
        >
          Submit
        </Button>
        
        <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={handleBack}
          fullwidth
        >
          Back
        </Button>
      </form>
    </StyledSessionCard>
    );
  };
  
  export default Step2;
