import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState, useContext } from "react";
import * as yup from "yup";

import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";

import FlexBox from "../FlexBox";
import Icon from "../icon/Icon";
import TextField from "../text-field/TextField";
import { H3, H5, H6, SemiSpan} from "../Typography";
import { StyledSessionCard } from "./SessionStyle";
import { AuthContext } from "../../contexts/AuthContext";

const Login: React.FC = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();

  const { login } = useContext(AuthContext);

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values) => {
    try {
      await login(values.email, values.password);
      console.log("Logged in successfully");
      router.push("/profile");
    } catch (error) {
      console.error("Error logging in:", error);
      // Here, you can handle errors, e.g., displaying an error message to the user
    }
  };

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
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb="0.5rem">
          Go Digital
        </H3>
        <H5
          fontWeight="600"
          fontSize="12px"
          color="gray.800"
          textAlign="center"
          mb="2.25rem"
        >
          Log in with email & password
        </H5>

        <TextField
          mb="0.75rem"
          name="email"
          placeholder="exmple@mail.com"
          label="Email or Phone Number"
          type="email"
          fullwidth
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ""}
          errorText={touched.email && errors.email}
        />
        <TextField
          mb="1rem"
          name="password"
          placeholder="*********"
          autoComplete="on"
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

        <Button
          mb="1.65rem"
          variant="contained"
          color="primary"
          type="submit"
          fullwidth
        >
          Login
        </Button>

        <FlexBox justifyContent="center" mb="1.25rem">
          <SemiSpan>Don’t have account?</SemiSpan>
          <Link href="/signup">
            <a>
              <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                Sign Up
              </H6>
            </a>
          </Link>
        </FlexBox>
      </form>

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Forgot your password?</SemiSpan>
        <Link href="/">
          <a>
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Reset It
            </H6>
          </a>
        </Link>
      </FlexBox>
    </StyledSessionCard>
  );
};

const initialValues = {
  email: "",
  password: "",
};

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
});

export default Login;
