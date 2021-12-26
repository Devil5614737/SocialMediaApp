import React from "react";
import "../Styles/home.css";

export default function Card({
  photo,
  likes,
  postedBy,
  title,
  comments,
  userimage,
  handleChange,
  value,
  handleComment,
  commentedBy,

}) {
    

  return (
    <div className="card">
      <div className="top">
        <img src={userimage} alt="user" className="userimage" />
        <p className="username">{postedBy}</p>
      </div>
      <img src={photo} alt="post" className="postimage" />
      <div className="post-stats">
        <div className="heart" id="heart"></div>
        <p className="like-count">{likes ? likes.length : 0} likes</p>
        <p className="comment">
          <span className="comment-user">{postedBy}</span> {title}
        </p>
        
        {/* <p className="comment">
          <span className="comment-user"></span> {comments}
        </p> */}
        <div className="comment-container">
          <input
            type="text"
            className="comment"
            onChange={handleChange}
            value={value}
          />
          <p className="post-btn" onClick={handleComment}>
            Post
          </p>
        </div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  username: "kaushik",
  photo:
    "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZmVycmFyaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  userimage:
    "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZmVycmFyaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
  likes: 1,
  postedBy: "kaushik",
  title: "hello....",
};
