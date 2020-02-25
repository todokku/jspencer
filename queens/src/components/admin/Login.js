import React from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';

function Login({touched, errors}) {
    return (
        <Form>
         <h3>Admin Login</h3> 
        <Field type="text" name="username" placeholder="Username" />
        {touched.username && errors.username && (
          <p className="error">{errors.username}</p>)}
​
        <Field type="text" name="password" placeholder="Password" />
        {touched.password && errors.password && <p className="error">{errors.password}</p>}
        
         <button>Login</button>
      </Form>
    )
}

const FormikLogin = withFormik({
    mapPropsToValues({ username, password }) {
      return {
        username: username || "",
        password: password || ""
      };
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Required Field"),
      password: Yup.string().required("Required Field")
    }),
    //You can use this to see the values
    handleSubmit(values, { props, setStatus }) {
      axios
        .post("https://jspencer-be.herokuapp.com/auth/login", values)
        .then(res => {
          console.log(res.data)
          localStorage.setItem('token', res.data.token);
          props.history.push('/Dashboard');
          setStatus();
        })
        .catch(err => console.log(err.res));
    }
  })(Login);
//   console.log("This is the HOC", FormikLogin);
  
  export default FormikLogin