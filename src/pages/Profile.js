import React, { useEffect, useState,useContext } from "react";
import Navbar from "../components/Navbar";
import "../Styles/profile.css";
import Heart from "../assets/heart1.svg";
import Comment from "../assets/comment.svg";
import { motion } from "framer-motion";
import axios from "axios";
import Camera from "../assets/camera.svg";
import Edit from "../assets/edit.svg";
import {Context} from '../Context';



function Profile() {
const {user}=useContext(Context)
  const [posts, setPosts] = useState([]);
  const [url, setUrl] = useState("");
  const [url2, setUrl2] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImage2, setSelectedImage2] = useState("");
  const[showModal,setShowModal]=useState(false);
  const[name,setName]=useState("")


  useEffect(() => {
    axios
      .get("https://socialmediabackend1.herokuapp.com/post/mypost", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => setPosts(res.data.mypost))
      .catch((e) => console.log(e));
  }, []);

  const postData = () => {
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
  const postData2 = () => {
    const data = new FormData();
    data.append("file", selectedImage2);
    data.append("upload_preset", "instaclone2");
    data.append("cloud_name", "dwtpwuwax");
    fetch("https://api.cloudinary.com/v1_1/dwtpwuwax/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl2(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (selectedImage) {
       postData();
    }
  }, [postData]);

  useEffect(() => {
    if (selectedImage2) {
       postData2();
    }
  }, [postData2]);

  useEffect(() => {
    if (url) {
      fetch("https://socialmediabackend1.herokuapp.com/post/updatepic", {
        method: "PUT",
        body: JSON.stringify({
          pic: url,
        }),
        headers: {
          "content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          window.alert("profile pic updated");
      window.location = "/profile"
        })
      .catch((e) => console.log(e));
    }
  }, [url]);

  useEffect(() => {
    if (url2) {
      fetch("https://socialmediabackend1.herokuapp.com/post/updatecover", {
        method: "PUT",
        body: JSON.stringify({
          cover: url2,
        }),
        headers: {
          "content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) =>{ console.log(data)
          console.log(data);
          window.alert("cover updated");
          window.location = "/profile"
        })
        .catch((e) => console.log(e));
    }
  }, [url2]);

 

  const updateName=()=>{
 fetch('https://socialmediabackend1.herokuapp.com/users/updatename',{
   method:'PUT',
   body:JSON.stringify({
     username:name
   }),
   headers:{
     'Content-Type':'application/json',
     'x-auth-token':localStorage.getItem('token')
   }
 }).then(res=>{console.log(res)
window.location='/profile'
}).catch(e=>console.log(e))
  }

 

const removePost=async(id)=>{
fetch('https://socialmediabackend1.herokuapp.com/post/removepost',{
  method:'DELETE',
  body:JSON.stringify({
    postId:id
  }),
  headers:{
    'Content-Type':"application/json",
    'x-auth-token':localStorage.getItem('token')
  }
}).then((res)=>{
  window.alert('post removed')
  window.location='/profile'
}).catch(e=>console.log(e))
}



  return (
    <>
      <Navbar  />

      <div className="container">
        <div className="top-container">
          <div className="cover">
            <motion.img
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.2, x: 0 }}
              src={user.cover}
              alt="cover"
            />
            <label for="cover">
              <img src={Edit} alt="icon" id="icon" />
            </label>
            <input
              type="file"
              id="cover"
              name="myImage"
              onChange={(event) => {
                setSelectedImage2(event.target.files[0]);
              }}
            />
          </div>
          <div className="user-details">
            <div className="userpic-container">
              <img src={user.pic} alt="userpic" />
              <label for="dp">
                <img src={Camera} alt="icon" id="camera" />
              </label>
              <input
                type="file"
                id="dp"
                name="myImage"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </div>
            <div className="user-info">
              <p className="username">{user.username}</p>
              <p className="friends-count"> {posts.length} Posts</p>
              <p className="friends-count">
                {user.friends ? user.friends.length : 12} Friends
              </p>
              <p className="btn" onClick={()=>setShowModal(true)}>Edit Profile</p>
            </div>
          </div>
        </div>

        <div className="post-container">
          <p className="title">Posts</p>
          <div className="posts">
            {posts.map((item) => (
              <div   onDoubleClick={()=>removePost(item._id)}  key={item._id} className="user-post">
                <motion.img
          
                  initial={{ y: 50, scale: 0 }}
                  whileInView={{ y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 1 }}
                  src={item.photo}
                  alt="post"
                  className="postImage"
                />
                <div className="user-stats">
                  <div className="like">
                    <img     src={Heart} alt="icon" className="icon" />
                    <p className="like-count">
                      {item.likes ? item.likes.length : 0}
                    </p>
                  </div>
                  <div className="comment">
                    <img src={Comment} alt="icon" className="icon" />
                    <p className="like-count">
                      {item.comments ? item.comments.length : 0}
                    </p>
               
                  </div>
               
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

{showModal && <div className="modal">
  <input className="input" placeholder="update username" onChange={(e)=>setName(e.target.value)} value={name}/>
  <p className="btn" onClick={updateName}>Update</p>
  <p className="btn" onClick={()=>setShowModal(false)}>Close</p>
</div>}


    </>
  );
}

export default Profile;
