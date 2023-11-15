import { useState, useEffect } from "react";
import { url } from "../configs/config";
import axios from "axios";
import ItemCard from "../components/ItemCard";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchItems() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}/items`);
        setItems(data.slice(0, 100));
        // setItems(data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchItems();
  }, []);
  if (isLoading)
    return <p className="h-screen w-full bg-aldergrey animate-pulse"></p>;
  if (error)
    return (
      <p className="h-screen bg-aldergrey text-red-500">
        Error fetching, please try again later
      </p>
    );
  return (
    <>
      {/* {JSON.stringify(items)} */}
      <div className="h-screen w-full bg-aldergrey ">
        <ItemCard items={items} setItems={setItems} />
      </div>
    </>
  );
};

export default HomePage;
