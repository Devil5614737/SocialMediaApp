import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../Styles/home.css";
import Icon from "../assets/imageIcon.svg";
import Card from "../components/Card";
import axios from "axios";
import Request from "../assets/request.svg";
import Close from "../assets/close.svg";
import {Context} from '../Context';
import {useContext} from 'react';

function Home() {
  const {user}=useContext(Context);
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [comment, setComment] = useState([]);
  const [recentComment, setRecentComment] = useState([]);

  useEffect(() => {
    axios
      .get("https://socialmediabackend1.herokuapp.com/post/allpost", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => setPosts(res.data.posts.reverse()))
      .catch((e) => console.log(e));
  }, []);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", "instaclone2");
    data.append("cloud_name", "dwtpwuwax");
    fetch("https://api.cloudinary.com/v1_1/dwtpwuwax/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpload = () => {
    if (selectedImage) {
      postDetails();
    }
  };

  useEffect(() => {
    if (url) {
      fetch("https://socialmediabackend1.herokuapp.com/post", {
        method: "POST",
        body: JSON.stringify({
          title,
          photo: url,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          window.alert("uploaded successfully...");
          window.location = "/home";
        });
    }
  }, [url]);

  useEffect(() => {
    axios
      .get("https://socialmediabackend1.herokuapp.com/users/accounts")
      .then((res) => setUsers(res.data))
      .catch((e) => console.log(e));
  }, []);

  const handleUserInfo = (info) => {
    setShow(true);
    setUserInfo(info);
  };

  const handleComment = (id) => {
    fetch("https://socialmediabackend1.herokuapp.com/post/comment", {
      method: "PUT",
      body: JSON.stringify({
      "text": comment,
      "postId": id,
      }),
      headers:{
        'Content-Type':'application/json',
        'x-auth-token':localStorage.getItem('token')
      }
    }).then(res=>res.json()).then(data=>setRecentComment(data.comments)).catch(e=>console.log(e))
  };

const filteredUser=users.filter(item=>{
return item._id!==user._id
})


  return (
    <>
      <Navbar />
      <div className="container">
        <div className="post-container">
          <div className="post-box">
            <input
              type="text"
              className="input"
              placeholder="What's on your mind? "
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <label for="upload" className="label">
              <img src={Icon} alt="icon" className="icon" />
            </label>
            <input
              type="file"
              id="upload"
              className="input2"
              name="myImage"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
            />
          </div>
          <div className="button" onClick={handleUpload}>
            Post
          </div>
        </div>

        <div className="card-container">
          {posts.map((item) => (
            <Card
              photo={item.photo}
              likes={item.likes}
              // comments={item.comments}
              postedBy={item.postedBy.username}
              title={item.title}
              userimage={item.postedBy.pic}
              handleChange={(e) => setComment(e.target.value)}
              value={comment}
              handleComment={() => handleComment(item)}
              data={recentComment}
              comments={item}
            />
          ))}
        </div>
        <div className="friends-containers">
          <p className="title">People you may know</p>
          {filteredUser.map((user) => (
            <div className="containers">
              <div className="lefts">
                <img src={user.pic} alt="user" />
                <div className="detail">
                  <p onClick={() => handleUserInfo(user)}>{user.username}</p>
                </div>
              </div>
              <img src={Request} alt="icon" id="icon" />
            </div>
          ))}
        </div>
      </div>
      {show && (
        <div className="userInfo-modal">
          <div className="userInfo-container">
            <img src={userInfo.cover} alt="cover" />
            <div className="user-info">
              <img src={userInfo.pic} alt="user" />
              <div className="user-data">
                <p className="data">{userInfo.username}</p>
                <p className="data">{userInfo.friends.length} Friends</p>
              </div>
            </div>
          </div>
          <div className="icon-container">
            <img
              onClick={() => setShow(false)}
              src={Close}
              alt="icon"
              id="close"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
