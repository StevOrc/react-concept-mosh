import React, { Component } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";

const CustomInput = ({ field, form: { touched, erros }, ...props }) => {
  return (
    <div className="form-group">
      <label> {props.label} </label>
      <input
        {...field}
        type="text"
        {...props}
        className="form-control"
      />
    </div>
  );
};


class LoginForm extends Component {
  state = {};

  userSchema = Yup.object().shape({
    username: Yup.string()
      .required("required")
      .min(5, "5 character min")
      .max(30, "30 character Max"),
    password: Yup.string()
      .required("required")
      .min(5, "5 character min")
      .max(30, "30 character Max"),
  });

  submitForm = (values, actions) => {
    console.log(values);
    console.log(actions);
  };

  render() {
    return (
      <Formik
        onSubmit={this.submitForm}
        initialValues={{ username: "", password: "" }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={this.userSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isSubmitting,
          errors,
          touched,
        }) => (
          <form className="loginForm mt-5" onSubmit={handleSubmit}>
            <Field
              name="username"
              type="text"
              label="Username"
              component={CustomInput}
            />
            <Field
              name="password"
              type="password"
              label="Password"
              component={CustomInput}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    );
  }
}

export default LoginForm;
