import { Link, useParams, useNavigate } from "react-router-dom";
import { url } from "../configs/config";
import axios from "axios";
import Toastify from "toastify-js";
import Swal from "sweetalert2";

const SkinCard = ({ items, setItems }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[100dvw] space-y-4 flex flex-row flex-wrap justify-center items-center space-x-4 bg-aldergrey">
        {items?.map((item) => {
          return (
            <div key={item?.id} className="">
              <Link>
                <div className="bg-white w-48 hover:scale-110 transition-all hover:brightness-125">
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
