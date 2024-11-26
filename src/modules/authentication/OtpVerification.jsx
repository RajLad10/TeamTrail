
import { Fragment, useState } from "react"
import OTPInput from "otp-input-react";
import AuthWrapper from "./AuthWrapper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormFeedback } from "reactstrap";
import { useDispatch } from "react-redux";
import { verifyOtp, resendOtp } from "../../store/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
    const [tempId, setTempId] = useState();

    const navigate = useNavigate();
    const inputStyle = {
        border: "1px solid transparent",
        borderRadius: "8px",
        width: "54px",
        height: "54px",
        fontSize: "12px",
        color: "#000",
        fontWeight: "400",
        caretColor: "blue",
        textAlign: "center",
        backgroundColor: "#e8e9eb"
    }

    const dispatch = useDispatch();
    const location = useLocation();

    const idIndex = location?.search?.indexOf("&id=");
    const email = location?.search?.slice(7, idIndex);
    const id = location?.search?.slice(idIndex + 4);

    const heading = email || "OTP Verification";
    const subHeading = "Enter OTP";

    const handleSubmit = (values) => {
        dispatch(verifyOtp({
            otp: +(values?.otp),
            id: tempId || id,
            cb: cb
        }))
    }
    const cb = (val) => {
        console.log("verifyOTP VAL", val);
        setTempId(val?.id);
        navigate("/")
    }

    const formik = useFormik({
        initialValues: {
            otp: '',
        },
        validationSchema: Yup.object({
            otp: Yup.string().trim().length(6, 'OTP must be exactly 6 digits').required("OTP is required"),
        }),
        onSubmit: handleSubmit
    });

    const resendCode = () => {
        formik.setFieldValue("otp", '')
        dispatch(resendOtp({
            id: tempId || id,
            cb: resendCb,
        }))
    }

    const resendCb = (val) => {
        setTempId(val?.id);
    }

    return (
        <Fragment>
            <AuthWrapper heading={heading} subHeading={subHeading}>
                <div className="verify-otp-wrapper">
                    <form onSubmit={formik.handleSubmit} className="mt-4">
                        <OTPInput
                            value={formik.values.otp}
                            onChange={(e) => formik.setFieldValue("otp", e)}
                            autoFocus
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            style={{ justifyContent: "center" }}
                            inputStyles={inputStyle}
                            className={"otp-input"}
                        />
                        {formik.touched.otp && formik.errors.otp ? (
                            <FormFeedback type="invalid">{formik.errors.otp}</FormFeedback>
                        ) : null}
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mt-4"
                            disabled={formik.values.otp.length < 6}
                        >
                            Submit
                        </button>
                    </form>
                    <div className="mt-3 text-center">
                        <p>
                            Don&#39;t receive the code?{" "}
                            <div 
                                className="fw-medium text-primary d-inline"
                                onClick={resendCode}
                                style={{cursor: "pointer"}}
                            >
                                Resend Code
                            </div>{" "}
                        </p>
                    </div>
                </div>
            </AuthWrapper>
        </Fragment>
    );
}

export default OtpVerification; 