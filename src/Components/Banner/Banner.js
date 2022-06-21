import React, { useState } from "react";
import DynamicPosts from "../DynamicPosts/DynamicPosts";

import "./Banner.css";

function Banner() {
  let [category, setCategory] = useState();

  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <select
              name="Category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {" "}
              
              
              <option value="null">NO FILTER</option>
             
              <option value="Stationary">Stationary</option>
             
              <option value="Bicycles">Bicycles</option>
              <option value="Clothes & Bedding">Clothes & Bedding</option>
              <option value="Electronic Devices">Electronic Devices</option>
              <option value="Books">Books</option>
              <option value="Other Items">Other Items</option>
            </select>
          </div>
         
          <div className="otherQuickOptions">
            <span onClick={() => setCategory("Stationary")}>Stationary</span>
            <span onClick={() => setCategory("Bicycles")}>Bicycles</span>

            <span onClick={() => setCategory("Clothes & Bedding")}>
              Clothes & Bedding
            </span>
            <span onClick={() => setCategory("Electronic Devices")}>
              Electronic Devices
            </span>
            <span onClick={() => setCategory("Books")}>Books</span>
            <span onClick={() => setCategory("Other Items")}>Other Items</span>
          </div>
        </div>
        
        <div className="banner">
          <img src="../../../Images/background image.png" alt="" />
          <div className="textonimage">SECOND HAND SHOP</div>
     
        </div>
      </div>
      {category != null && <DynamicPosts category={category} />}
    
    </div>
  );
}

export default Banner;
