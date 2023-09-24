import React, { useState, useEffect } from "react";
import NavTab from "../Components/NavTab";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const name = window.localStorage.getItem("username");
  const userId = window.localStorage.getItem("userID");
  const [myposts, setMyPosts] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [oneUsers, setOneUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        `http://localhost:3001/user/alluser/${userId}`
      );
      // console.log(res);
      setOtherUsers(res.data);
    };

    const oneUser = async () => {
      const res = await axios.get(
        `http://localhost:3001/user/singleuser/${userId}`
      );
      // console.log(res.data);
      setOneUsers(res.data);
    };
    oneUser();
    getUser();
  }, []);

  useEffect(() => {
    const myPost = async () => {
      const res = await axios.get(
        `http://localhost:3001/post/mypost/${userId}`
      );
      // console.log(res);
      setMyPosts(res.data);
    };
    myPost();
  }, []);

  return (
    <div>
      <NavTab />
      <div
        style={{
          position: "absolute",
          left: "320px",
          width: "43%",
          display: "flex",
          marginTop: "40px",
          borderBottom: "1px solid grey",
          height: "20vh",
        }}
      >
        <div>
          <img
            src={`/uploads/${oneUsers.profilePic}`}
            alt=""
            style={{ borderRadius: "50%", width: "50%" }}
          />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              width: "126%",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <h5>{oneUsers.username}</h5>
            <Link to={"/profile/editProfile/" + userId}>
              <Button style={{ height: "40px" }}>Edit </Button>
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              width: "160%",
              justifyContent: "space-between",
            }}
          >
            <h6>{myposts.length} posts</h6>
            <h6>{oneUsers.followers?.length} followers</h6>
            <h6>{oneUsers.following?.length} following</h6>
          </div>
        </div>
        <hr></hr>
        <div
          style={{
            // width: "100%",
            marginTop: "140px",
            display: "flex",
            height: "400px",
            marginLeft: "-175px",
            flexWrap: "wrap",
          }}
        >
          {myposts.map((post) => {
            return (
              <div
                style={{
                  width: "420px",
                  height: "300px",
                  border: "1px solid grey",
                  padding: "10px",
                  marginBottom: "35px",
                }}
                key={post._id}
              >
                <h5>{post.title}</h5>
                <img
                  variant="top"
                  src={`/uploads/${post.image}`}
                  alt=""
                  style={{ width: "400px", height: "250px" }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          borderLeft: "1px solid black",
          position: "absolute",
          right: "100px",
          width: "200px",
          height: "100vh",
        }}
      >
        {otherUsers.map((user, key) => {
          return (
            <div
              key={key}
              style={{
                marginTop: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <img
                src={`/uploads/${user.profilePic}`}
                alt=""
                style={{
                  borderRadius: "50%",
                  width: "30%",
                  border: "4px solid grey",
                }}
              />
              <Link
                to={"/profile/" + user._id}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h6>{user.username}</h6>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
