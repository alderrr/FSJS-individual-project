import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../configs/config";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Swal from "sweetalert2";
import Toastify from "toastify-js";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputEmailOnChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const inputPasswordOnChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const formOnSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${url}/login`, { email, password });
      const access_token = data.access_token;
      localStorage.setItem("access_token", access_token);
      navigate("/");
      Swal.fire({
        // title: "Welcome to FortHub",
        icon: "success",
        imageUrl:
          "https://ik.imagekit.io/alder/SWAL_WELCOME%20TO%20FORTHUB.png?updatedAt=1700118165843",
      });
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.message,
        className: "info",
        style: {
          background: "linear-gradient(to right, #ff9a00, #ff5a00)",
        },
      }).showToast();
    }
  };
  const googleSignIn = async (credentialResponse) => {
    console.log(credentialResponse);
    try {
      const { data } = await axios({
        url: `${url}/google-sign`,
        method: "post",
        headers: {
          access_token: credentialResponse.credential,
        },
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
      Swal.fire({
        // title: "Welcome to FortHub",
        icon: "success",
        imageUrl:
          "https://ik.imagekit.io/alder/SWAL_WELCOME%20TO%20FORTHUB.png?updatedAt=1700118165843",
      });
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.message,
        className: "info",
        style: {
          background: "linear-gradient(to right, #ff9a00, #ff5a00)",
        },
      }).showToast();
    }
  };
  return (
    <>
      <div className="flex flex-row justify-center h-screen w-full bg-aldergrey">
        <form className="" onSubmit={formOnSubmitHandler}>
          <p>
            <input
              className="bg-stone-200 text-stone-200"
              type="text"
              placeholder="Email"
              defaultValue={email}
              onChange={inputEmailOnChangeHandler}
            />
          </p>
          <p>
            <input
              className="bg-stone-200"
              type="password"
              placeholder="Password"
              defaultValue={password}
              onChange={inputPasswordOnChangeHandler}
            />
          </p>
          <p></p>
          <button className="" type="submit">
            Sign In
          </button>
          <GoogleOAuthProvider clientId="863067018828-5sc2a5stj8uue7oes613dl2qcudh58b1.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={googleSignIn}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
          <hr />
          <p>
            <Link to={"/register"} className="">
              Create new account
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
