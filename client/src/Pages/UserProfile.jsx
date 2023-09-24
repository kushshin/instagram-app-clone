import React, { useState, useEffect } from "react";
import NavTab from "../Components/NavTab";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

const UserProfile = () => {
  const { userId } = useParams();
  const userid = window.localStorage.getItem("userID");
  const [singleUser, setSingleUser] = useState([]);
  const [myposts, setMyPosts] = useState([]);
  const [follow, setFollow] = useState([]);
  const [isfollowing, setIsfollowing] = useState(false);
  useEffect(() => {
    const oneUser = async () => {
      const res = await axios.get(
        `http://localhost:3001/user/singleuser/${userId}`
      );
      setSingleUser(res.data);
    };

    const myPost = async () => {
      const res = await axios.get(
        `http://localhost:3001/post/mypost/${userId}`
      );
      setMyPosts(res.data);
    };
    myPost();
    oneUser();
  }, []);

  const handleFollow = async () => {
    const res = await axios.put(`http://localhost:3001/user/follow/${userid}`, {
      Id: userId,
    });
    setFollow(res.data.user);
    setIsfollowing(true);
  };

  const handleunFollow = async () => {
    const res = await axios.put(
      `http://localhost:3001/user/unfollow/${userid}`,
      {
        Id: userId,
      }
    );
    setFollow(res.data.user);
    setIsfollowing(false);
  };

  useEffect(() => {
    setFollow(singleUser.followers === follow.followers ? follow : singleUser);
    // setIsfollowing(follow.followers?.includes(userid) ? true : false);
  }, [singleUser]);

  return (
    <div>
      <NavTab />
      <div
        style={{
          position: "absolute",
          left: "320px",
          width: "37%",
          display: "flex",
          marginTop: "40px",
          borderBottom: "1px solid grey",
          height: "20vh",
        }}
      >
        <div>
          <img
            src={`/uploads/${singleUser.profilePic}`}
            alt=""
            style={{ borderRadius: "50%", width: "70%" }}
          />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              width: "70%",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <h5>{singleUser.username}</h5>

            {follow.followers?.includes(userid) ? (
              <Button onClick={handleunFollow}>unfollow</Button>
            ) : (
              <Button onClick={handleFollow}>follow</Button>
            )}
          </div>
          <div
            style={{
              display: "flex",
              width: "80%",
              justifyContent: "space-between",
            }}
          >
            <h6>{myposts.length} post</h6>
            <h6>{follow.followers?.length} followers</h6>
            <h6>{follow.following?.length} following</h6>
          </div>
          {myposts.map((post) => {
            return (
              <div
                style={{
                  width: "420px",
                  height: "300px",
                  border: "1px solid grey",
                  padding: "10px",
                  marginBottom: "35px",
                  marginTop: "100px",
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
    </div>
  );
};

export default UserProfile;
