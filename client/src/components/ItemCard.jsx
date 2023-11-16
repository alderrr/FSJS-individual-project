import { Link, useParams, useNavigate } from "react-router-dom";
import { url } from "../configs/config";
import axios from "axios";
import Toastify from "toastify-js";
import Swal from "sweetalert2";

const ItemCard = ({ items, setItems }) => {
  const navigate = useNavigate();
  const handleAddWishlist = async (ItemId, name, image) => {
    try {
      const payload = {
        ItemId,
        name,
        image,
      };
      const { data } = await axios.get(`${url}/wishlist/${ItemId}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      const alreadyWishlishted = data;
      if (alreadyWishlishted) {
        Swal.fire({
          icon: "info",
          imageUrl:
            "https://ik.imagekit.io/alder/SWAL_ITEM%20ALREADY%20IN%20WISHLIST.png?updatedAt=1700124585896",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
      Swal.fire({
        imageUrl:
          "https://ik.imagekit.io/alder/SWAL_ADD%20TO%20WISHLIST.png?updatedAt=1700120278081",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`${url}/wishlist`, payload, {
            headers: { Authorization: `Bearer ${localStorage.access_token}` },
          });
          Swal.fire({
            icon: "success",
            imageUrl:
              "https://ik.imagekit.io/alder/SWAL_ITEM%20ADDED%20TO%20WISHLIST.png?updatedAt=1700120277825",
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
      <div className="w-[100dvw] px-24 pt-24 py-10 gap-4 flex flex-row flex-wrap justify-center bg-aldergrey">
        {items?.map((item) => {
          return (
            <div
              key={item?.id}
              className="cursor-pointer"
              onClick={() => {
                handleAddWishlist(
                  item.id,
                  item.name,
                  item.images.full_background
                );
              }}
            >
              <div className="bg-white w-48 hover:scale-110 transition-all hover:brightness-125">
                <img
                  className="rounded-2xl"
                  src={item?.images?.full_background}
                  alt={item?.name}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ItemCard;
