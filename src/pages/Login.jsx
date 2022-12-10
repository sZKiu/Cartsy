import React from "react";
import LoginImg from "../assets/my-account.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Common/Footer";
import { Helmet } from "react-helmet";

const validateName = (value) => {
  let errorMessage;
  if (!value) {
    errorMessage = "Write a Name";
  } else if (value.length > 256 || value.length < 4) {
    errorMessage = "Short Name, Write other";
  }
  return errorMessage;
};

const validatePassword = (value) => {
  let errorMessage;
  if (!value) {
    errorMessage = "Write a Password";
  } else if (value.length > 256 || value.length < 4) {
    errorMessage = "Short Password, Write other";
  }
  return errorMessage;
};

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>
          Login
        </title>
      </Helmet>

      <div className="login">
        <div>
          <img src={LoginImg} alt="" />
        </div>

        <div>
          <Formik
            initialValues={{ password: "", username: "" }}
            onSubmit={(values, actions) =>
              setTimeout(() => {
                actions.resetForm();
                window.localStorage.setItem(
                  "account",
                  JSON.stringify({
                    username: values.username,
                    password: values.password,
                  })
                );
                window.localStorage.setItem("favorites", JSON.stringify([]))
                navigate("/");
              }, 1000)
            }
          >
            {({ errors, touched }) => (
              <Form>
                <div>
                  <label htmlFor="username">Username</label>
                  <Field
                    validate={validateName}
                    id="username"
                    name="username"
                  />
                  <ErrorMessage
                    name="username"
                    className="error-input"
                    component="div"
                  />
                </div>

                <div>
                  <label htmlFor="password">Password</label>
                  <Field
                    validate={validatePassword}
                    id="password"
                    name="password"
                    type="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-input"
                  />
                </div>

                <input type="submit" value="Log In" />
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <Footer/>
    </>
  );
};

export default Login;
