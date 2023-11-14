import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const ParentPage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ParentPage;
