import { url } from "../configs/config";
import axios from "axios";
import Toastify from "toastify-js";
import Swal from "sweetalert2";

const WishlistCard = ({ wishlists, setWishlists }) => {
  const handleDeleteWishlist = async (id) => {
    try {
      Swal.fire({
        imageUrl:
          "https://ik.imagekit.io/alder/SWAL_REMOVE%20FROM%20WISHLIST.png?updatedAt=1700120039527",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${url}/wishlist/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.access_token}` },
          });
          setWishlists((previousWishlist) =>
            previousWishlist.filter((wishlist) => wishlist.id !== id)
          );
          Swal.fire({
            icon: "success",
            imageUrl:
              "https://ik.imagekit.io/alder/SWAL_ITEM%20REMOVED%20FROM%20WISHLIST.png?updatedAt=1700120039693",
          });
        }
      });
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response.data.message,
        className: "info",
        style: {
          background: "linear-gradient(to right, #ff9a00, #ff5a00)",
        },
        newWindow: true,
      }).showToast();
    }
  };
  return (
    <>
      {wishlists?.length === 0 ? (
        <div className="flex flex-row justify-center items-center py-[100px]">
          <img
            src="https://ik.imagekit.io/alder/NO%20ITEM%20IN%20WISHLIST.png?updatedAt=1700119304145"
            alt="NO ITEM IN WISHLIST"
          />
        </div>
      ) : (
        <div className="w-[100dvw] pt-24 py-10 gap-4 flex flex-row flex-wrap justify-center bg-aldergrey">
          {wishlists.map((wishlist) => (
            <div
              key={wishlist?.ItemId}
              className="cursor-pointer"
              onClick={() => {
                handleDeleteWishlist(wishlist.id);
              }}
            >
              <div className="bg-white w-48 hover:scale-110 transition-all hover:brightness-125">
                <img
                  className="rounded-2xl"
                  src={wishlist?.image}
                  alt={wishlist?.name}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default WishlistCard;
