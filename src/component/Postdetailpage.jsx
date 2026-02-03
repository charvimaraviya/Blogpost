import "./Postdetailpage.css";
import logo from "../assets/images/kedarnath.jpg";
import Confirmationmodal from "./Confirmationmodel";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Postdetail() {
  const loggedINUserData = JSON.parse(localStorage.getItem("loginData")) || {}
  const postData = JSON.parse(localStorage.getItem("postData")) || [];
  const { postId } = useParams(); //used to get dynamic value from url
  const [currentPost, setCurrentPost] = useState({}); //used to store single post data
  const navigate = useNavigate();

  useEffect(() => {
    //find() - apply only array, return single object
    const filtered = postData.find(
      (item) => String(item.id) === String(postId)
    );
    console.log({ postData, postId, filtered });

    if (filtered) setCurrentPost(filtered);
  }, [postId, localStorage]);

  const [showModel, setShowModel] = useState(false);

  const showModelHandler = () => {
    setShowModel(true);
  };
  const hideModelHandler = () => {
    setShowModel(false);
  };

  const handleEdit = () => {
    navigate("/new-post", {
      state: { id: currentPost.id }
    });
  };
  
  const deletePostHandler = () => {
    const updatedPosts = postData.filter(
      (item) => String(item.id) !== String(postId)
    );
  
    localStorage.setItem("postData", JSON.stringify(updatedPosts));
  
    setShowModel(false);   
    navigate("/");         
  };
  
  return (
    <>
      <div className="detail-card">
        <div className="left-image">
          <img src={currentPost.image || "/kedarnath.jpg"} />
        </div>

        <div className="right-detail">
          <div className="detail">
            <h2>{currentPost.title}</h2>
            <p>{currentPost.body}</p>
          </div>

          {loggedINUserData?.role === "admin" ? 
          <div className="btn-main">
            <button className="btn1" onClick={handleEdit}>Edit</button>
            <button className="btn2" onClick={showModelHandler}>Delete</button>
          </div>
          : <></> }
        </div>
      </div>
      {showModel && (
        <Confirmationmodal
          title="Delete?"
          desc="You are about to log out, are you sure?"
          onClose={hideModelHandler}
          onConfirm={deletePostHandler}
          confirmBtnText="Delete"
        />
      )}
    </>
  );
}
