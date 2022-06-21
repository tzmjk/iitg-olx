import React, { useContext,useState } from "react";

import { useHistory } from "react-router";

import { AllPostContext } from "../../contextStore/AllPostContext";

import Pagination from "../Pagination/Pagination";
import PostCards from "../PostCards/PostCards";
import "./allposts.css";

function AllPosts() {
  const { allPost } = useContext(AllPostContext);
 
  let length = allPost.length; 
 
  const history = useHistory();

 
  let [currentPage,setCurrentPage]=useState(1)
  
  let itemsPerPage=8
 
  let indexOfLastDish=currentPage*itemsPerPage
 
 
  let indexOfFirstDish=indexOfLastDish-itemsPerPage
 
  let showTheseItems=allPost.slice(indexOfFirstDish,indexOfLastDish)

  let displayThesePosts = showTheseItems.map((product, index) => {
   
    return (
      <div className="all-post-card" key={index}>
        {" "}
        <PostCards product={product} index={index} />{" "}
      </div>
    );
  });
  return (
    <>
     
      {length !== 0 ? (
        <div className="display-all-parent">
          <div className="container-allpost">{displayThesePosts}</div>
      
          <Pagination setCurrentPage={setCurrentPage}/>
        </div>
      ) : (
        history.push("/")
      )}
    </>
  );
}



export default AllPosts;
