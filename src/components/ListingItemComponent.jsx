/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const ListingItemComponent = ({ listing, id }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="cardContainer group mx-3 flex flex-col p-6 justify-center items-start hover:bg-[#9A7884] border border-l-4 border-t-4 border-gray hover:border-white ease-in-out duration-500">
        <div className="w-full flex-col justify-between items-start gap-2">
          <div className="w-auto h-auto mb-3">
            <img
              src={listing.imgUrls[0]}
              alt={listing.name}
              className="xxl:h-[300px] xl:w-[600px] xl:h-[200px] object-cover"
            />
          </div>

          <div className="flex justify-center  items-center py-3">
            <h1 className="text-[14px]  text-white font-bold md:text-[16px]">
              {listing.name}
            </h1>
          </div>
          <div>
            {listing.offer ? (
              <div className="flex justify-center items-center">
                {listing.type === "rent" ? (
                  <span className="uppercase font-bold border px-3 mr-3 text-blue text-[14px]">
                    Rent
                  </span>
                ) : (
                  <span className="uppercase font-bold border px-3 mr-3 text-green text-[14px]">
                    Sale
                  </span>
                )}
                <span className="text-[12px] pr-2 text-black font-semibold line-through flex">
                  <span className="text-[10px] self-start">$</span>
                  {listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                </span>
                <span className="flex text-[14px] text-white font-bold">
                  <span className="text-[12px] self-start">$</span>
                  {listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {listing.type === "rent" ? (
                    <span className="text-[10px] self-end"> / month</span>
                  ) : null}
                </span>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                {listing.type === "rent" ? (
                  <span className="uppercase font-bold border px-3 mr-3 text-blue text-[14px]">
                    Rent
                  </span>
                ) : (
                  <span className="uppercase font-bold border px-3 mr-3 text-green text-[14px]">
                    Sale
                  </span>
                )}
                <span className="text-[14px] text-white font-bold flex">
                  <span className="text-[10px] self-start">$</span>
                  {listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  {listing.type === "rent" ? (
                    <span className="text-[10px] self-end"> / month</span>
                  ) : null}
                </span>
              </div>
            )}
          </div>

          <div
            onClick={() => navigate(`/category/${listing.type}/${id}`)}
            className="flex justify-center items-center p-[8px] mt-[15px] bg-lightOrange text-secondaryBlack hover:text-black hover:bg-orange cursor-pointer border border-l-4 border-white  hover:border-white ease-in-out duration-300"
          >
            <span className="font-bold text-[10px] uppercase md:text-[12px]">
              Read More
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingItemComponent;
