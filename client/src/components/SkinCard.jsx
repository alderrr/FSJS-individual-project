import { Link, useParams, useNavigate } from "react-router-dom";
import { url } from "../configs/config";
import axios from "axios";
import Toastify from "toastify-js";
import Swal from "sweetalert2";

const SkinCard = ({ items, setItems }) => {
  const navigate = useNavigate();
  return (
    <>
      {/* {JSON.stringify(items)} */}
      {items.length}

      <pre>{JSON.stringify(items, null, 2)}</pre>

      {items?.map((item) => {
        return (
          <div key={item?.id}>
            a
            {/* <Link className="bg-black hover:bg-stone-900">
            <div className="">
              <img src={item?.images?.background} alt={item?.name} />
            </div>
            <div className="">{item?.name}</div>
            <div className="">
              <div className="">Wishlist</div>
              <div className="">Locker</div>
            </div>
          </Link> */}
          </div>
        );
      })}
    </>
  );
};

export default SkinCard;
