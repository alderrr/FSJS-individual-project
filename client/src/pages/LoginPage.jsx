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
    // console.log(credentialResponse);
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
      <div className="flex flex-col justify-center items-center h-screen w-full bg-royalblue">
        <img
          className="h-24"
          src="https://ik.imagekit.io/alder/FortniteLogo.png?updatedAt=1699977655775"
          alt="Fortnite"
        />
        <form className="flex flex-col gap-3" onSubmit={formOnSubmitHandler}>
          <input
            className="py-1 px-2 rounded-md text-sm"
            type="text"
            placeholder="Email"
            defaultValue={email}
            onChange={inputEmailOnChangeHandler}
          />
          <input
            className="py-1 px-2 rounded-md text-sm"
            type="password"
            placeholder="Password"
            defaultValue={password}
            onChange={inputPasswordOnChangeHandler}
          />
          <button type="submit">
            <img
              className="h-4 mx-auto"
              src="https://ik.imagekit.io/alder/SIGN%20IN.png?updatedAt=1700152594038"
              alt="SIGN IN"
            />
          </button>
          <GoogleOAuthProvider clientId="863067018828-5sc2a5stj8uue7oes613dl2qcudh58b1.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={googleSignIn}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
          <Link to={"/register"}>
            <img
              className="h-4 mx-auto"
              src="https://ik.imagekit.io/alder/CREATE%20NEW%20ACCOUNT.png?updatedAt=1700152731256"
              alt="CREATE NEW ACCOUNT"
            />
          </Link>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
