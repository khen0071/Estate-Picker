/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const CardComponent = ({ listing, id }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="group flex flex-col p-6 justify-center items-start hover:bg-[#9A7884] border border-l-4 border-t-4 border-gray hover:border-white ease-in-out duration-500">
        <div className="w-full flex-col justify-between items-start gap-2">
          <div className="w-auto h-auto mb-3">
            <img
              src={listing.imgUrls[0]}
              alt={listing.name}
              className="xxl:h-[300px] xl:w-[600px] xl:h-[200px] object-cover"
            />
          </div>

          <div className="flex justify-center  items-center py-3">
            <h1 className="text-[16px]  text-white font-bold md:text-[20px]">
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
                <span className="text-[14px] pr-2 text-black font-semibold line-through flex">
                  <span className="text-[10px] self-start">$</span>
                  {listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                </span>
                <span className="flex text-[18px] text-white font-bold">
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
                <span className="text-[18px] text-white font-bold flex">
                  <span className="text-[12px] self-start">$</span>
                  {listing.regularPrice}
                </span>
              </div>
            )}
          </div>

          {/* <div className="flex flex-row justify-between items-center p-[10px]">
            <div>
              <div className="flex p-[10px]">
                <div>
                  <FontAwesomeIcon
                    icon={faBed}
                    style={{ color: "#fff", fontSize: "28px", width: "30px" }}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-[10px]">Accommodation</div>
                  <p className="text-[12px] font-bold">
                    {bedrooms} {bedrooms > 1 ? "Bedrooms" : "Bedroom"}
                  </p>
                </div>
              </div>
              <div className="flex p-[10px]">
                <div>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    style={{ color: "#fff", fontSize: "28px", width: "30px" }}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-[10px]">Floors</div>
                  <p className="text-[12px] font-bold">
                    {floor} {floor > 1 ? "Floors" : "Floor"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex p-[10px]">
                <div>
                  <FontAwesomeIcon
                    icon={faBath}
                    style={{ color: "#fff", fontSize: "28px", width: "30px" }}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-[10px]">Wash Area</div>

                  <p className="text-[12px] font-bold">
                    {bathrooms} {bathrooms > 1 ? "Bathrooms" : "Bathroom"}
                  </p>
                </div>
              </div>
              <div className="flex p-[10px]">
                <div>
                  <FontAwesomeIcon
                    icon={faArrowsUpDownLeftRight}
                    style={{ color: "#fff", fontSize: "28px", width: "30px" }}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-[10px]">Floor Area</div>
                  <p className="text-[12px] font-bold">{floor_area} </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              {furnished ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "#7CFC00", fontSize: "20px" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faXmark}
                  style={{ color: "#FF3131", fontSize: "24px" }}
                />
              )}{" "}
              <span className="pl-3 font-semibold">Furnished</span>
            </div>

            <div className="flex justify-between items-center">
              {parking ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "#7CFC00", fontSize: "24px" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faXmark}
                  style={{ color: "#FF3131", fontSize: "24px" }}
                />
              )}{" "}
              <span className="pl-3 font-semibold">Parking</span>
            </div>
          </div> */}

          <div
            onClick={() => navigate(`/category/${listing.type}/${id}`)}
            className="flex justify-center items-center space-x-2 p-[10px] mt-[20px] bg-lightOrange text-secondaryBlack hover:text-black hover:bg-orange cursor-pointer border border-l-4 border-white  hover:border-white ease-in-out duration-300"
          >
            <span className="font-bold text-[12px] uppercase md:text-[14px]">
              Read More...
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComponent;
