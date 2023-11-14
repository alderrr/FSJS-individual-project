import { Link, useParams, useNavigate } from "react-router-dom";
import { url } from "../configs/config";
import axios from "axios";
import Toastify from "toastify-js";
import Swal from "sweetalert2";

const SkinCard = ({ items, setItems }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-8 gap-2 bg-aldergrey">
        {items?.map((item) => {
          return (
            <div key={item?.id} className="">
              <Link className="bg-black hover:bg-stone-900">
                <div className="bg-white">
                  <img
                    className="rounded-2xl"
                    src={item?.images?.background}
                    alt={item?.name}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SkinCard;
