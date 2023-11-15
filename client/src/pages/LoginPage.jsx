import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  return (
    <>
      <div className="flex flex-row justify-center h-screen w-full bg-aldergrey">
        <form className="">
          <p>
            <input
              className="bg-stone-200 text-stone-200"
              type="text"
              placeholder="Email"
            />
          </p>
          <p>
            <input
              className="bg-stone-200"
              type="password"
              placeholder="Password"
            />
          </p>
          <p></p>
          <button className="" type="submit">
            Sign In
          </button>
          <GoogleOAuthProvider clientId="863067018828-5sc2a5stj8uue7oes613dl2qcudh58b1.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            ;
          </GoogleOAuthProvider>
          ;
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
