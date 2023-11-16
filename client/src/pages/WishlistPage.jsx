import { useState, useEffect } from "react";
import { url } from "../configs/config";
import axios from "axios";
import WishlistCard from "../components/WishlistCard";

const WishlistPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlists, setWishlists] = useState([]);
  useEffect(() => {
    async function fetchWishlist() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}/wishlist`, {
          headers: { Authorization: `Bearer ${localStorage.access_token}` },
        });
        setWishlists(data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWishlist();
  }, []);
  if (isLoading)
    return (
      <div className="h-screen w-full bg-royalblue">
        <p className="h-screen w-full bg-aldergrey animate-pulse"></p>;
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
      <div className="bg-aldergrey h-screen w-screen">
        <WishlistCard wishlists={wishlists} setWishlists={setWishlists} />
      </div>
    </>
  );
};

export default WishlistPage;
