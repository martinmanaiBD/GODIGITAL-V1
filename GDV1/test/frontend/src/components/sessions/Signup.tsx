import React, { useState } from "react";
import FlexBox from "../../components/FlexBox";
import Step1 from "./SignupForm/Step1";
import Step2 from "./SignupForm/Step2";

const SignUpPage = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSubmit = async (values) => {
    // Handle form submission logic here
    console.log("Submitting form with values:", values);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 2:
        return <Step2 onPrev={handlePrevStep} onSubmit={handleSubmit} nextStepUrl={""} />;
      default:
        return null;
    }
  };

  return (
    <FlexBox
      flexDirection="column"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      {renderStep()}
    </FlexBox>
  );
};

export default SignUpPage;
