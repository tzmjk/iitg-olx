import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "./Post.css";
import { Firebase } from "../../firebase/config";
import BarLoading from "../Loading/BarLoading";
import PostCards from "../PostCards/PostCards";

import { AllPostContext } from "../../contextStore/AllPostContext";

function Posts() {
  
  const { setAllPost } = useContext(AllPostContext);
  
  let [posts, setPosts] = useState([]);
  
  let [posts2, setPosts2] = useState([]); 
  
  let [loading, setLoading] = useState(false);
  
  let [loading2,setLoading2] = useState(false)
  
  
  useEffect(() => {
    setLoading(true);
    setLoading2(true)
    Firebase.firestore() 
      .collection("products")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        let allPostsDescendingOder = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setPosts2(allPostsDescendingOder); 
        setAllPost(allPostsDescendingOder);
        setLoading(false);
      });
    
    
      Firebase.firestore() 
      .collection("products")
      .orderBy("createdAt", "asc")
      .get()
      .then((snapshot) => {
        let allPostsAscendingOder = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setPosts(allPostsAscendingOder);
        setLoading2(false)
        
      });
  }, [setAllPost]);

  let quickMenuCards = posts.map((product, index) => {
    return(<div className="quick-menu-cards" key={index}> <PostCards product={product} index={index} /> </div>);
  });

  let freshRecomendationCards = posts2.map((product, index) => { if(index<4) {
    return (<div className="fresh-recomendation-card" key={index}> <PostCards product={product} index={index} /> </div>);}
    return null 
});
  return (
    <div className="postParentDiv">
      {posts && (
        <div className="moreView">
          <div className="heading">
            <span>Items:</span>
            <Link to="./viewmore">
              {" "}
              <span className="viewItems">View Items</span>{" "}
            </Link>
          </div>
          <div className="cards">
            {" "}
            {loading ? <BarLoading /> : quickMenuCards}
          </div>
        </div>
      )}
     <div className="recommendations">
        <div className="heading">
          <span>Recommendations:</span>
        </div>
        <div className="fresh-recomendation-cards cards">{loading2 ? <BarLoading/> : freshRecomendationCards}</div> 
      </div> 
    </div>
  );
}

export default Posts;
