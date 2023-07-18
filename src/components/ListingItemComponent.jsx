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

          {/* <div className="flex flex-row justify-between items-center my-3">
            <div className="space-y-1">
              <div className="flex">
                <div>
                  <i className="fa-solid fa-bed w-[20px]"></i>
                </div>
                <div className="ml-3">
                  <div className="text-[10px]">Accommodation</div>
                  <p className="text-[12px] font-bold">
                    {listing.bedrooms}{" "}
                    {listing.bedrooms > 1 ? "Bedrooms" : "Bedroom"}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div>
                  <i className="fa-solid fa-building w-[20px]"></i>
                </div>
                <div className="ml-3">
                  <div className="text-[10px]">Floors</div>
                  <p className="text-[12px] font-bold">
                    {listing.floors} {listing.floors > 1 ? "Floors" : "Floor"}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div>
                  <i className="fa-solid fa-car w-[20px]"></i>
                </div>
                <div className="ml-3">
                  <div className="text-[10px]">Parking</div>
                  <p className="text-[12px] font-bold">
                    {listing.parking ? "available" : "unavailable"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex">
                <div>
                  <i className="fa-solid fa-shower w-[20px]"></i>
                </div>
                <div className="ml-3">
                  <div className="text-[10px]">Wash Area</div>

                  <p className="text-[12px] font-bold">
                    {listing.bathrooms}{" "}
                    {listing.bathrooms > 1 ? "Bathrooms" : "Bathroom"}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div>
                  <i className="fa-regular fa-arrows-up-down-left-right w-[20px]"></i>
                </div>
                <div className="ml-3">
                  <div className="text-[10px]">Floor Area</div>
                  <p className="text-[12px] font-bold">{listing.floorArea} </p>
                </div>
              </div>
              <div className="flex">
                <div>
                  <i className="fa-solid fa-car w-[20px]"></i>
                </div>
                <div className="ml-3">
                  <div className="text-[10px]">Furnished</div>
                  <p className="text-[12px] font-bold">
                    {listing.parking ? "furnished" : "not furnished"}
                  </p>
                </div>
              </div>
            </div>
          </div> */}

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
