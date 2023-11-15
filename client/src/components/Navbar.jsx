import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const onClickLogout = async (event) => {
    localStorage.clear();
    navigate("/login");
    Swal.fire({
      text: "Logout Success",
    });
  };
  return (
    <>
      <div className="fixed w-full bg-royalblue z-10">
        <div className="h-12 px-6 relative flex flex-row justify-between items-center ">
          <img
            className="h-full"
            src="https://ik.imagekit.io/alder/FortniteLogo.png?updatedAt=1699977655775"
            alt="Fortnite"
          />
          <Link to={"/"}>
            <div className="text-white">Items</div>
          </Link>
          <Link to={"/shop"}>
            <div className="text-white">Shop</div>
          </Link>
          <Link to={"/wishlist"}>
            <div className="text-white">Wishlist</div>
          </Link>
          <Link to={"/locker"}>
            <div className="text-white">Locker</div>
          </Link>
          <p onClick={onClickLogout} className="cursor-pointer text-red-500">
            Logout
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
