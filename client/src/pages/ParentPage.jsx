import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const ParentPage = () => {
  return (
    <>
      <div className="gap-4">
        <Navbar />
      </div>

      <Outlet />
    </>
  );
};

export default ParentPage;
