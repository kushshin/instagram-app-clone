import React, { useState } from "react";
import NavTab from "../Components/NavTab";
import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";

const CreatePost = () => {
  const userId = window.localStorage.getItem("userID");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState(userId);

  const navigate = useNavigate();

  const handleData = async (e) => {
    try {
      e.preventDefault();
      const postDetails = new FormData();
      postDetails.append("title", title);
      postDetails.append("desc", desc);
      postDetails.append("image", image);
      postDetails.append("user", user);

      const res = await axios.post(
        "http://localhost:3001/post/createpost",
        postDetails
      );
      console.log(res);
      alert("post created");
      navigate("/home");
    } catch (error) {}
  };
  return (
    <div>
      <NavTab />
      <div
        style={{
          position: "absolute",
          left: "450px",
          top: "70px",
          width: "40%",
          height: "80vh",
          border: "1px solid grey",
          padding: "10px",
        }}
      >
        <form onSubmit={handleData} encType="multipart/form-data">
          <h6>create new post</h6>
          <img src="" alt="" />
          <hr></hr>
          <input
            placeholder="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br></br>
          <br></br>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br></br>
          <br></br>

          <input
            type="textarea"
            placeholder="write a caption"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <br></br>
          <Button variant="primary" type="submit">
            post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

//  <Card
//    style={{
//      width: "30rem",
//      position: "absolute",
//      left: "450px",
//      top: "80px",
//      height: "30rem",
//      padding: "10px",
//    }}
//  >
//    <Card.Img
//           variant="top"
//           src="https://images.pexels.com/photos/1562/italian-landscape-mountains-nature.jpg?auto=compress&cs=tinysrgb&w=600"
//         />
//    <input type="file" onChange={(e) => setImage(e.target.files[0])} />

//    <Card.Body>
//      <Card.Title value={title} onChange={(e) => setTitle(e.target.value)}>
//        {title}
//      </Card.Title>
//      <Card.Text
//        placeholder="write a caption"
//        value={body}
//        onChange={(e) => setBody(e.target.value)}
//      >
//        Some quick example text to build on the card title and make up the bulk
//        of the card's content.
//      </Card.Text>
//      <Button variant="primary" onClick={handleData}>
//        share
//      </Button>
//    </Card.Body>
//  </Card>;
