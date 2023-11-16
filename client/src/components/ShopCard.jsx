const ShopCard = ({ shops, setShops }) => {
  return (
    <>
      <div className="w-[100dvw] px-24 py-10 gap-4 flex flex-row flex-wrap justify-center">
        {shops?.map((shop) => {
          return (
            <div key={shop?.mainId} className="">
              <div className="bg-white w-48 hover:scale-110 transition-all hover:brightness-125">
                <img
                  className="rounded-2xl"
                  src={shop?.displayAssets[0]?.full_background}
                  alt={shop?.name}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShopCard;
