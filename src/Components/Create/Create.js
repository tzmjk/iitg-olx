import React, { Fragment, useState, useContext } from "react";

import "./Create.css";

import Header from "../Header/Header";
import { Firebase,db } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useHistory } from "react-router";
import GoLoading from "../Loading/GoLoading";

const Create = () => {
 
  const { user } = useContext(AuthContext);
 
  const history = useHistory();
  let [name, setName] = useState("");
  let [category, setCategory] = useState("");
 
  let [price, setPrice] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState();
 
  let [loading, setLoading] = useState(false);
  let [contactInfo,setContactInfo]=useState();
  const handleSubmit = () => {
  
    console.log('this1')
    
    setLoading(true);
  
    let date = new Date().toDateString();
    console.log('this2')
  
    
    
    
   
    Firebase.storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          
          Firebase.firestore()
            .collection("products")
            .add({
              name,
              category,
              price,
              description,
              contactInfo,
              url,
              userId: user.uid,
              createdAt: date,
            })
            .then(() => {
              history.push("/");
            });
        });
      });
  };
  return (
    <Fragment>
     
      <Header />
      {loading && <GoLoading />}
      <div className="centerDiv">
        <label>Item name</label>
        <br />
       
        <input
          className="input"
          type="text"
          name="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
       
        <label>Category:</label>
        <select
          name="Category"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="input"
        >
          {" "}
          <option>Select Category</option>
          <option value="Stationary">Stationary</option>
          <option value="Bicycles">Bicycles</option>
          <option value="Clothes & Bedding">Clothes & Bedding</option>
          <option value="Electronic Devices">Electronic Devices</option>
          <option value="Books">Books</option>
          <option value="Other Items">Other Items</option>
        
        </select>
        <br />
        <label>Price</label>
        <br />
        <input
          className="input"
          type="number"
          name="Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <br />
        <label>Description</label>
        <br />
        <input
          className="input"
          type="text"
          name="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <br />
        
        <label>Your Contact Information</label>
        <br />
        
        <input
          className="input"
          type="text"
          name="contactInfo"
          value={contactInfo}
          onChange={(e) => {
            setContactInfo(e.target.value);
          }}
        />
        <br />
        <img
          alt="Posts"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : ""}
        ></img>

        <br />
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <br />
        <button className="uploadBtn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    
    </Fragment>
  );
};



export default Create;
