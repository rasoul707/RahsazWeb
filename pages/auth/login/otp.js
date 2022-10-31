import LayoutAuth from "Components/Auth/LayoutAuth";
import Step1 from "Components/Auth/Login/otp/Step1";
import Step2 from "Components/Auth/Login/otp/Step2";
import React, { useState } from "react";

const Otp = () => {
  const [phone, setPhone] = useState();
  const [step, setStep] = useState(1);

  return (
    <LayoutAuth>
      {step == 1 && <Step1 setPhone={setPhone} setStep={setStep} />}
      {step == 2 && <Step2 phone={phone} setStep={setStep}/>}
    </LayoutAuth>
  );
};

export default Otp;
