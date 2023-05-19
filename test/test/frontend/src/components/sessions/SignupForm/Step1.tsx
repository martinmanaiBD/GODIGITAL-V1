import React, { useState } from "react";
import Button from "../../buttons/Button";
import IconButton from "../../buttons/IconButton";
import FlexBox from "../../FlexBox";
import Icon from "../../icon/Icon";
import TextField from "../../text-field/TextField";
import { H3, H5, H6, SemiSpan } from "../../Typography";
import { StyledSessionCard } from "../SessionStyle";
import { useFormik } from "formik";
import * as yup from "yup";
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/assets/images/logo.png';

type Step1Props = {
  onNext: () => void;
  onPrev: () => void;
};

const Step1: React.FC<Step1Props> = ({ onNext }) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  const handleFormSubmit = (values) => {
    console.log("Submitting form with values:", values);
    localStorage.setItem("signupFormStep1Data", JSON.stringify(values));
    onNext();
  };

  //save the values in local storage
  const savedData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("signupFormStep1Data") || "{}") : {};

  const initialValues = {
    fullName: savedData.fullName || "",
    email: savedData.email || "",
    phoneNumber: savedData.phoneNumber || "",
    icNumber: savedData.icNumber || "",
    password: savedData.password || "",
    re_password: savedData.re_password || "",
  };

  const formSchema = yup.object().shape({
    fullName: yup.string().required("${path} is required"),
    email: yup.string().email("invalid email").required("${path} is required"),
    phoneNumber: yup.string().required("${path} is required"),
    icNumber: yup.string().required("${path} is required"),
    password: yup.string().required("${path} is required"),
    re_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please re-type password"),
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    onSubmit: handleFormSubmit,
    initialValues,
    validationSchema: formSchema,
  });

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

        <TextField
          mb="0.75rem"
          name="fullName"
          label="Full Name"
          placeholder="Abu Bakar"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.fullName || ""}
          errorText={touched.fullName && errors.name}
        />
        <TextField
          mb="0.75rem"
          name="email"
          placeholder="abubakar@gmail.com"
          label="Email"
          type="email"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ""}
          errorText={touched.email && errors.email}
        />
        <TextField
          mb="0.75rem"
          name="phoneNumber"
          placeholder="08123456789"
          label="Phone Number"
          type="tel"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber || ""}
          errorText={touched.phoneNumber && errors.phoneNumber}
        />
        <TextField
          mb="0.75rem"
          name="icNumber"
          placeholder="801212139003"
          label="IC Number"
          type="text"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.icNumber || ""}
          errorText={touched.icNumber && errors.icNumber}
        />
        <TextField
          mb="0.75rem"
          name="password"
          placeholder="***"
          type={passwordVisibility ? "text" : "password"}
          label="Password"
          fullwidth
          endAdornment={
            <IconButton
              size="small"
              type="button"
              p="0.25rem"
              mr="0.25rem"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password || ""}
          errorText={touched.password && errors.password}
        />
        <TextField
          mb="1rem"
          name="re_password"
          placeholder="***"
          type={passwordVisibility ? "text" : "password"}
          label="Confirm Password"
          fullwidth
          endAdornment={
            <IconButton
              size="small"
              type="button"
              p="0.25rem"
              mr="0.25rem"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password || ""}
          errorText={touched.re_password && errors.re_password}
        />
        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
        >
          Continue
        </Button>
      </form>
      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Already have an account?</SemiSpan>
        <Link href="/login">
          <a>
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Log in
            </H6>
          </a>
        </Link>
      </FlexBox>
    </StyledSessionCard>
  );

};

export default Step1; 
