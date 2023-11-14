import { useState, useEffect } from "react";
import { url } from "../configs/config";
import axios from "axios";
import SkinCard from "../components/SkinCard";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchItems() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}/items`);
        setItems(data.slice(0, 10));
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchItems();
  }, []);
  if (isLoading) return <p className="h-screen bg-black">Loading...</p>;
  if (error)
    return (
      <p className="h-screen bg-black text-red-500">
        Error fetching, please try again later
      </p>
    );
  return (
    <>
      {/* {JSON.stringify(items)} */}
      <SkinCard items={items} setItems={setItems} />
    </>
  );
};

export default HomePage;
