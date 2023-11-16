import { useState, useEffect } from "react";
import { url } from "../configs/config";
import axios from "axios";
import ShopCard from "../components/ShopCard";

const ShopPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shops, setShops] = useState([]);
  useEffect(() => {
    async function fetchShops() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}/shops`);
        setShops(data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchShops();
  }, []);
  if (isLoading)
    return (
      <div className="h-screen w-full bg-royalblue">
        <p className="h-screen bg-aldergrey animate-pulse"></p>
      </div>
    );
  if (error)
    return (
      <p className="h-screen bg-aldergrey text-red-500">
        Error fetching, please try again later
      </p>
    );
  return (
    <>
      {/* {JSON.stringify(shops)} */}
      <div className="bg-aldergrey h-screen w-screen">
        <ShopCard shops={shops} setShops={setShops} />
      </div>
    </>
  );
};

export default ShopPage;
