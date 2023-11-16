import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../configs/config";
import axios from "axios";
import Swal from "sweetalert2";
import Toastify from "toastify-js";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputUsernameOnChangeHandler = (event) => {
    setUsername(event.target.value);
  };
  const inputEmailOnChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const inputPasswordOnChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const formOnSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${url}/register`, {
        username,
        email,
        password,
      });
      navigate("/login");
      Swal.fire({
        // title: "Register Success",
        icon: "success",
        imageUrl:
          "https://ik.imagekit.io/alder/SWAL_REGISTRATION%20SUCCESS.png?updatedAt=1700117929982",
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
            placeholder="Username"
            defaultValue={username}
            onChange={inputUsernameOnChangeHandler}
          />
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
              src="https://ik.imagekit.io/alder/REGISTER.png?updatedAt=1700154788293"
              alt="REGISTER"
            />
          </button>
          <br />
          <Link to={"/login"}>
            <img
              className="h-4 mx-auto"
              src="https://ik.imagekit.io/alder/ALREADY%20HAVE%20ACCOUNT.png?updatedAt=1700154694886"
              alt="ALREADY HAVE ACCOUNT?"
            />
          </Link>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
