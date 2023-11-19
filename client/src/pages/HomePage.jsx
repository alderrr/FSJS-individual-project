import { useState, useEffect } from "react";
import { url } from "../configs/config";
import axios from "axios";
import ItemCard from "../components/ItemCard";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${url}/items?name=${search}`);
      setItems(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    async function fetchItems() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}/items`);
        // setItems(data.slice(0, 100));
        setItems(data);
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
    return (
      <div className="h-[100dvh] w-[100dvw] bg-royalblue">
        <p className="h-[100dvh] w-[100dvw] bg-aldergrey animate-pulse"></p>
      </div>
    );
  if (error)
    return (
      <p className="h-[100dvh] bg-aldergrey text-red-500">
        Error fetching, please try again later
      </p>
    );
  return (
    <>
      <div className="z-10 fixed top-0 left-0 w-full bg-white p-4 mt-10 flex items-center font-sans">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="border-2 border-gray-300 p-2 rounded-full w-full mx-4 font-sans"
        />
        <img
          className="cursor-pointer"
          onClick={handleSearch}
          src="https://ik.imagekit.io/alder/SEARCH.png?updatedAt=1700377987056"
          alt="SEARCH"
        />
      </div>
      {/* {JSON.stringify(items)} */}
      <div className="h-screen w-full bg-aldergrey ">
        <ItemCard items={items} setItems={setItems} />
      </div>
    </>
  );
};

export default HomePage;
