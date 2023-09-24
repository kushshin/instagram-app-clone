import React, { useState, useEffect } from "react";
import NavTab from "../Components/NavTab";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { FaTrashAlt } from "react-icons/fa";
import { TbTrashXFilled } from "react-icons/tb";
import { RiDeleteBinFill } from "react-icons/ri";
import { BsHeart, BsHeartFill, BsArrowReturnRight } from "react-icons/bs";
import { useCookies } from "react-cookie";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const userId = window.localStorage.getItem("userID");
  const username = window.localStorage.getItem("username");
  const [oneUsers, setOneUsers] = useState([]);
  const [cookies, setCookies] = useCookies("myToken");

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:3001/post/allpost");
      setPosts(res.data);
    };
    const oneUser = async () => {
      const res = await axios.get(
        `http://localhost:3001/user/singleuser/${userId}`
      );
      console.log(res.data);
      setOneUsers(res.data.username);
    };
    oneUser();
    getPost();
  }, []);

  const deletePost = async (postId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/post/deletepost/${postId}`,
        { headers: { authorization: cookies.myToken } }
      );
      console.log(res.data);
      const result = res.data;
      const newData = posts.filter((post) => {
        return post._id !== result._id;
      });
      setPosts(newData);
      // alert("post deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async (postId) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/post/like/${postId}/${userId}`
      );
      const result = res.data;
      const newData = posts.map((post) => {
        console.log(post);
        if (post._id === result._id) {
          return result;
        } else {
          return post;
        }
      });
      setPosts(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const disLikePost = async (postId) => {
    try {
      const res = await axios.put(
        `http://localhost:3001/post/dislike/${postId}/${userId}`
      );
      const result = res.data;
      const newData = posts.map((post) => {
        if (post._id === result._id) {
          return result;
        } else {
          return post;
        }
      });
      setPosts(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const makeComment = async (text, postId) => {
    const res = await axios.put(
      `http://localhost:3001/post/comment/${postId}`,
      {
        text: text,
        userId,
        username,
      }
    );
    console.log(res.data);
    const result = res.data;
    const newData = posts.map((post) => {
      if (post._id === result._id) {
        return result;
      } else {
        return post;
      }
    });
    setPosts(newData);
    setComment("");
  };

  const deleteComment = async (postId, commentId) => {
    const res = await axios.delete(
      `http://localhost:3001/post/deletecomment/${postId}/${commentId}`
    );
    console.log(res);
    const result = res.data;
    const newData = posts.map((post) => {
      if (post._id === result._id) {
        return result;
      } else {
        return post;
      }
    });
    setPosts(newData);
  };

  return (
    <div>
      <NavTab />
      <div style={{ marginLeft: "500px", marginTop: "50px" }}>
        {posts.map((post) => {
          return (
            <div
              style={{
                width: "475px",
                height: "90vh",
                border: "1px solid grey",
                padding: "10px",
                marginBottom: "35px",
                overflow: "hidden",
              }}
              key={post._id}
            >
              {post.postOwner === userId && (
                <FaTrashAlt
                  onClick={() => deletePost(post._id)}
                  style={{ color: "blue" }}
                />
              )}
              <br></br>
              <h5>{post.title}</h5>
              <img
                variant="top"
                src={`/uploads/${post.image}`}
                alt=""
                style={{ width: "450px", height: "350px" }}
              />
              <div>
                <h6>{post.desc}</h6>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "15%",
                  }}
                >
                  {post.likes.includes(userId) ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "35%",
                      }}
                    >
                      <BsHeartFill
                        style={{
                          fontSize: "23px",
                          color: "red",
                          cursor: "pointer",
                        }}
                        onClick={() => disLikePost(post._id)}
                      />
                    </div>
                  ) : (
                    <BsHeart
                      style={{ fontSize: "23px", cursor: "pointer" }}
                      onClick={() => likePost(post._id)}
                    />
                  )}
                  <h6>{post.likes.length} like</h6>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <input
                    type="text"
                    placeholder="comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{
                      width: "87%",
                      marginTop: "2px",
                      marginBottom: "4px",
                    }}
                  />
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => makeComment(comment, post._id)}
                    style={{ fontSize: "14px" }}
                  >
                    Post
                  </Button>
                </div>

                <div
                  style={{
                    border: "1px solid black",
                    borderRadius: "5px",
                    height: "60px",
                    overflow: "scroll",
                  }}
                >
                  {post.comments.map((record, key) => {
                    console.log(record);
                    return (
                      <h6 key={key}>
                        <span
                          style={{
                            color: "red",
                            fontSize: "12px",
                          }}
                        >
                          {record.username}
                        </span>
                        <BsArrowReturnRight />
                        {record.text}
                        <span>
                          {record.username === username ? (
                            <TbTrashXFilled
                              onClick={() =>
                                deleteComment(post._id, record._id)
                              }
                            />
                          ) : (
                            ""
                          )}
                        </span>
                      </h6>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
