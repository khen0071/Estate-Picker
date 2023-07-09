import { Link } from "react-router-dom";
import styles from "../styles/Explore.module.css";

import ExploreSlider from "../components/ExploreSlider";

const Explore = () => {
  return (
    <>
      <ExploreSlider />
      <div className={styles.explore_container}>
        <div className={styles.explore_content}>
          {/* <div className={styles.exploreItems}>
            <main className={styles.heroContainer}>
              <p>Explore With Us</p>
              <p className={styles.borderDesign}></p>

              <h4>Check Our Listings</h4>

              <div className={styles.heroItems}>
                <div className={styles.singleImage}>
                 
                </div>

                <div className={styles.split}>
                  <div className={styles.secondImage}>
                   
                  </div>

                  <div className={styles.thirdImage}>
                  
                  </div>
                </div>
              </div>
            </main>
          </div> */}

          <div className={styles.categoryContainer}>
            <div className={styles.categoryTextContainer}>
              <p className={styles.headerCategory}>Finding The Right Place</p>
              <p className={styles.borderDesign}></p>
              <h4>Category Listings</h4>

              <div className={styles.categoryIconsContainer}>
                <div className={styles.iconsContainer}>
                  <i className="fa-solid fa-building"></i>
                  <p>Building</p>
                </div>
                <div className={styles.iconsContainer}>
                  <i className="fa-solid fa-store"></i>
                  <p>Store</p>
                </div>
                <div className={styles.iconsContainer}>
                  <i className="fa-solid fa-city"></i>
                  <p>Condominium</p>
                </div>
                <div className={styles.iconsContainer}>
                  <i className="fa-solid fa-computer"></i>
                  <p>Office</p>
                </div>
                <div className={styles.iconsContainer}>
                  <i className="fa-solid fa-house"></i>
                  <p>House</p>
                </div>
              </div>
            </div>
            <div className={styles.categoryListContainer}>
              <div className={styles.categoryList}>
                <Link to="/offers">
                  <button>Properties With Offers</button>
                </Link>
                <Link to="/category/sale">
                  <button>Properties For Sale</button>
                </Link>
                <Link to="/category/rent">
                  <button>Properties For Rent</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
