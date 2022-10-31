import React, { useState } from "react";
import { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

const Register = ({ data }) => {
  const [step, setStep] = useState(1);
  const [tabs, setTabs] = useState("مشتری");

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("tabs", tabs);
  console.log("forms", data);
  console.log("reducer", state);

  let tab_letter = {
    شرکت: "sh_",
    مشتری: "m_",
    همکار: "h_",
  };

  // test

  let testData = {
    m_address: "enable",
    m_state: "enable",
    m_city: "enable",
    m_legal_info_melli_code: "enable",
    m_email: "enable",
    m_first_name: "enable",
    m_last_name: "enable",

    h_address: "enable",
    h_state: "enable",
    h_city: "enable",
    h_email: "enable",
    h_first_name: "enable",
    h_last_name: "enable",
    h_legal_info_melli_code: "enable",
    h_guild_identifier: "enable",
    h_store_name: "enable",
  };

  let dynamicForm = [];

  for (const [key, value] of Object.entries(data)) {
    if (key.startsWith(tab_letter[tabs]) && value == "enable") {
      dynamicForm.push(key.replace(tab_letter[tabs], ""));
    }
  }

  return (
    <>
      {step == 1 && (
        <Step1
          tabs={tabs}
          setTabs={setTabs}
          setStep={setStep}
          dispatch={dispatch}
          state={state}
        />
      )}
      {step == 2 && (
        <Step2
          dynamicForm={dynamicForm}
          setStep={setStep}
          dispatch={dispatch}
          tabs={tabs}
          state={state}
        />
      )}
      {step == 3 && (
        <Step3
          setStep={setStep}
          dispatch={dispatch}
          phone={state?.phone_number}
        />
      )}
      {step == 4 && (
        <Step4
          setStep={setStep}
          dispatch={dispatch}
          phone={state?.phone_number}
          state={state}

        />
      )}
      {step == 5 && <Step5 />}
    </>
  );
};

export default Register;
