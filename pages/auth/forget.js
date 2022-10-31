import LayoutAuth from 'Components/Auth/LayoutAuth'
import ForgetPassword from 'Components/Auth/Login/ForgetPassword'
import ForgetPassCode from 'Components/Auth/Login/ForgetPassword/ForgetPassCode'
import React from 'react'

const Forget = () => {
  return (
    <LayoutAuth>
        {/* <ForgetPassword/> */}
        <ForgetPassCode/>
    </LayoutAuth>
  )
}

export default Forget