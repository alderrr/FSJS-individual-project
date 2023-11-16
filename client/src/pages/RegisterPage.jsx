import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <div className="flex flex-row justify-center h-screen w-full bg-aldergrey">
        <form className="" onSubmit={formOnSubmitHandler}>
          <p>
            <input
              className=""
              type="text"
              placeholder="Username"
              defaultValue={username}
              onChange={inputUsernameOnChangeHandler}
            />
          </p>
          <p>
            <input
              className=""
              type="text"
              placeholder="Email"
              defaultValue={email}
              onChange={inputEmailOnChangeHandler}
            />
          </p>
          <p>
            <input
              className=""
              type="password"
              placeholder="Password"
              defaultValue={password}
              onChange={inputPasswordOnChangeHandler}
            />
          </p>
          <p></p>
          <button className="" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
