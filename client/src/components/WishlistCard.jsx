const WishlistCard = ({ wishlists, setWishlists }) => {
  return (
    <>
      <div className="w-[100dvw] pt-24 py-10 gap-4 flex flex-row flex-wrap justify-center bg-aldergrey">
        {wishlists?.map((wishlist) => {
          return (
            <div key={wishlist?.ItemId} className="">
              <div className="bg-white w-48 hover:scale-110 transition-all hover:brightness-125">
                <img
                  className="rounded-2xl"
                  src={wishlist?.image}
                  alt={wishlist?.name}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WishlistCard;
