import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const onClickLogout = async (event) => {
    Swal.fire({
      imageUrl:
        "https://ik.imagekit.io/alder/SWAL_ARE%20YOU%20SURE.png?updatedAt=1700118878939",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate("/login");
      }
    });
  };
  return (
    <>
      <div className="fixed w-full bg-royalblue z-10 text-white">
        <div className="h-12 px-6 relative flex flex-row justify-between items-center mx-1">
          <img
            className="h-full"
            src="https://ik.imagekit.io/alder/FortniteLogo.png?updatedAt=1699977655775"
            alt="Fortnite"
          />
          <Link to={"/"}>
            <img
              className="h-4"
              src="https://ik.imagekit.io/alder/ITEMS.png?updatedAt=1700102051256"
              alt="ITEMS"
            />
          </Link>
          <Link to={"/shop"}>
            <img
              className="h-4"
              src="https://ik.imagekit.io/alder/SHOP.png?updatedAt=1700102051321"
              alt="SHOP"
            />
          </Link>
          <Link to={"/wishlist"}>
            <img
              className="h-4"
              src="https://ik.imagekit.io/alder/WISHLIST.png?updatedAt=1700102051399"
              alt="WISHLIST"
            />
          </Link>
          <img
            onClick={onClickLogout}
            className="h-4 cursor-pointer"
            src="https://ik.imagekit.io/alder/LOGOUT.png?updatedAt=1700103271436"
            alt="LOGOUT"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
