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
      // console.log(payload);
      await axios.post(`${url}/wishlist`, payload, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      Swal.fire({
        text: "Item added to Wishlist",
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
      <div className="w-[100dvw] pt-24 py-10 gap-4 flex flex-row flex-wrap justify-center bg-aldergrey">
        {items?.map((item) => {
          return (
            // <Link>

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

            // </Link>
          );
        })}
      </div>
    </>
  );
};

export default ItemCard;
