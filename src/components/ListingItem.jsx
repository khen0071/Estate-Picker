/* eslint-disable react/prop-types */
import styles from "../styles/ListingItem.module.css";
import { Link } from "react-router-dom";

const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  return (
    <>
      <div className={styles.listingItemContainer}>
        <li className={styles.itemContainer}>
          <img src={listing.imgUrls[0]} alt={listing.name} />

          <div className={styles.detailListContainer}>
            <h3>{listing.name}</h3>
            <h4>{listing.location}</h4>

            <div className={styles.priceContainer}>
              <div className={styles.typeContainer}>
                {" "}
                {listing.type === "rent" ? (
                  <p className={styles.forRent}>Rent</p>
                ) : (
                  <p className={styles.forSale}>Sale</p>
                )}
              </div>

              {listing.offer ? (
                <p className={styles.regularPrice}>
                  $
                  {listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              ) : (
                <p className={styles.regularPrice2}>
                  $
                  {listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              )}

              {listing.offer ? (
                <p className={styles.discountedPrice}>
                  $
                  {listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              ) : null}
              {listing.type === "rent" && (
                <p className={styles.perMonth}> / monthly</p>
              )}
            </div>

            <div className={styles.listingItemsButtonsContainer}>
              <Link to={`/category/${listing.type}/${id}`}>
                <button className={styles.listingItemButton}>
                  View Property
                </button>
              </Link>

              <div className={styles.listingButtonContainer}>
                {onEdit && (
                  <button
                    className={styles.listingItemButtonEdit}
                    onClick={() => onEdit(id)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                )}
                {onDelete && (
                  <button
                    className={styles.listingItemButtonDelete}
                    onClick={() => onDelete(listing.id, listing.name)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* <div className={styles.listingItemIconsContainer}>
              <div className={styles.listingItemIcons}>
                <i className="fa-solid fa-bed"></i>
                {listing.bedrooms}
              </div>
              <div className={styles.listingItemIcons}>
                <i className="fa-solid fa-bath"></i>
                {listing.bathrooms}
              </div>
              <div className={styles.listingItemIcons}>
                <i className="fa-solid fa-up-down-left-right"></i>
                {listing.floorArea}
              </div>
              <div className={styles.listingItemIcons}>
                <i className="fa-solid fa-building"></i>
                {listing.floors}
              </div>
            </div> */}
        </li>
      </div>
    </>
  );
};

export default ListingItem;
