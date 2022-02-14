import "./Auth.scss";
import { FC, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { TLoginUser } from "../../types/TypeUser";
import { login } from "../../service/userService";
import { useAppDispatch } from "../../hooks/redux";
const Login: FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signIn, setSignIn] = useState<TLoginUser>({
    email: "",
    password: "",
  });
  const onChangeSignUp = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSignIn({
      ...signIn,
      [name]: value,
    });
  };
  const onSubmit = (): void => {
    // return alert(JSON.stringify(signIn));
    dispatch(login(signIn));
  };

  // console.log(isLoading);
  return (
    <div className="auth-wrapper">
      <div className="registration">
        <div className="registration-header">
          <h5>Войти</h5>
          <Link to="/registration">Регистрация</Link>
        </div>

        <div className="registration-body">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signIn.email}
            onChange={onChangeSignUp}
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={signIn.password}
            onChange={onChangeSignUp}
          />
          <button onClick={onSubmit}>Войти</button>
          {/* <button onClick={logout}>Logout</button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;

// import * as Yup from "yup";
// import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
// import { Link } from "react-router-dom";
// import "../Auth/Auth.scss";
// // Shape of form values
// interface FormValues {
//   email: string;
//   password: string;
// }

// interface OtherProps {
//   message: string;
// }
// const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
//   const { touched, errors, isSubmitting, message } = props;
//   const [loginUser, { error, isLoading }] = authAPI.useLoginUserMutation();
//     let errorMessage: string = "";
//     let errorsMessages: string[] = [];
//     if (error) {
//       if ("data" in error) {
//         if ("message" in error.data) {
//           console.log(error.data.message);
//           errorMessage = error.data.message;
//         }
//         if (Array.isArray(error.data)) errorsMessages = error.data;
//       }
//     }
//     console.log(errorMessage, errorsMessages);
//   return (
//     <Form>
//       <h1>{message}</h1>
//       <div className="auth-wrapper">
//         <div className="registration">
//           <div className="registration-header">
//             <h5>Войти</h5>
//             <Link to="/registration">Регистрация</Link>
//           </div>

//           <div className="registration-body">
//             <Field type="email" name="email" />
//             {touched.email && errors.email && <div>{errors.email}</div>}
//             <Field type="password" name="password" />
//             {touched.password && errors.password && (
//               <div>{errors.password}</div>
//             )}
//             <button type="submit">Войти</button>
//           </div>
//         </div>
//       </div>
//     </Form>
//   );
// };

// // The type of props MyForm receives
// interface MyFormProps {
//   initialEmail?: string;
//   message: string; // if this passed all the way through you might do this or make a union type
// }

// // Wrap our form with the withFormik HoC
// const MyForm = withFormik<MyFormProps, FormValues>({
//   // Transform outer props into form values
//   mapPropsToValues: (props) => {
//     return {
//       email: props.initialEmail || "",
//       password: "",
//     };
//   },
//   validationSchema: Yup.object().shape({
//     email: Yup.string().email("Email not valid").required("Email is required"),
//     password: Yup.string()
//       .length(4, "Not length")
//       .required("Password is required"),
//   }),
//   // Add a custom validation function (this can be async too!)
//   //    validate: (values: FormValues) => {
//   //      let errors: FormikErrors<FormValues> = {};
//   //      if (!values.email) {
//   //        errors.email = 'Required';
//   //      } else if (!isValidEmail(values.email)) {
//   //        errors.email = 'Invalid email address';
//   //      }
//   //      return errors;
//   //    },

//   handleSubmit: (values) => {

//     // do submitting things
//     console.log(values);
//   },
// })(InnerForm);

// const Login = () => (
//   <>
//     <MyForm message="" />
//   </>
// );

// export default Login;
