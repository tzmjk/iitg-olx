import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contextStore/PostContext";
import { Firebase } from "../../firebase/config";
import { useHistory } from "react-router";
import "./View.css";
function View() {
  let { postContent } = useContext(PostContext); 

  const [userDetails, setUserDetails] = useState(); 
  const history = useHistory(); 
 
 
 
  useEffect(() => {
    let { userId } = postContent;
    if (userId === undefined) {
      history.push("/");
    } else {
      Firebase.firestore()
        .collection("users")
        .where("id", "==", userId)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            setUserDetails(doc.data());
          });
        });
    }
  }, [history, postContent]);
  return (
    
    <div className="viewParentDiv">
     
      <div className="imageShowDiv">
        <img src={postContent.url} alt="" />
    
      </div>{" "}
     
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postContent.price} </p>
          <span >{postContent.name}</span>
          <p><span className="category">Category:</span> {postContent.category}</p>
          <span><span className="postedOn">Posted on:</span> {postContent.createdAt}</span>
        </div>
       
        <div className="productDescription">
          <p className="p-bold">Product Description:</p>
          <p>{postContent.description}</p>
        </div>

      
        <div className="contactInfo">
          <p className="p-bold">Contact Information:</p>
          <p>{postContent.contactInfo}</p>
        </div>
     
      </div>
    </div>
  );
}
export default View;
