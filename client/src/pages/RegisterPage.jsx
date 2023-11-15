const RegisterPage = () => {
  return (
    <>
      <div className="flex flex-row justify-center h-screen w-full bg-aldergrey">
        <form className="">
          <p>
            <input className="" type="text" placeholder="Email" />
          </p>
          <p>
            <input className="" type="password" placeholder="Password" />
          </p>
          <p></p>
          <button className="" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
