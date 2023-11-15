import { Link, useParams, useNavigate } from "react-router-dom";
import { url } from "../configs/config";
import axios from "axios";
import Toastify from "toastify-js";
import Swal from "sweetalert2";

const ItemCard = ({ items, setItems }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[100dvw] pt-24 py-10 gap-4 flex flex-row flex-wrap justify-center bg-aldergrey">
        {items?.map((item) => {
          return (
            <Link>
              <div key={item?.id} className="">
                <div className="bg-white w-48 hover:scale-110 transition-all hover:brightness-125">
                  <img
                    className="rounded-2xl"
                    src={item?.images?.full_background}
                    alt={item?.name}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ItemCard;
