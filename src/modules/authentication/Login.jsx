
import React from "react";
import { Form, FormFeedback, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthWrapper from "./AuthWrapper";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";

const Login = () => {
  //meta title
  document.title = "Login | TeamTrail";

  const {user, loading} = useSelector(state => state.auth)
  console.log("USER", user, loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const heading = "Welcome Back !";
  const subHeading = "Sign in to TeamTrail.";

  const handleSubmit = (values) => {
    const cb = (val) => {
      console.log("val", val);
      navigate("/verify-otp?email=" + values?.email + '&id=' + val?.id);
    }
    dispatch(login({
      email: values?.email,
      cb: cb
    }));
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email("Invalid email address format")
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Invalid email address format"
        )
        .required("Email is required"),
    }),
    onSubmit: handleSubmit
  });

  return (
    <React.Fragment>
      <AuthWrapper heading={heading} subHeading={subHeading} >
        <div className="p-2">
          <Form
            className="form-horizontal"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-3">
              <Label className="form-label">Email</Label>
              <Input
                name="email"
                className="form-control"
                placeholder="Enter email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email || ""}
                invalid={
                  formik.touched.email && formik.errors.email ? true : false
                }
              />
            </div>
              {formik.touched.email && formik.errors.email ? (
                <FormFeedback type="invalid" className="">{formik.errors.email}</FormFeedback>
              ) : null}

            <div className="mt-3 d-grid">
              <button
                className="btn btn-primary btn-block"
                type="submit"
                disabled={loading}
              >
                {loading ? <span className="login-loader"></span> : "Next"}
              </button>
            </div>
          </Form>
        </div>
      </AuthWrapper>
    </React.Fragment>
  );
};

export default Login;
