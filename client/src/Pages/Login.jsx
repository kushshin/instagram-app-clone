import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["myToken"]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });
      // console.log(res.data);
      setCookies("myToken", res.data.token);
      window.localStorage.setItem("userID", res.data.userID);
      window.localStorage.setItem("username", res.data.uname);
      alert("logged In successfully!");
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", width: "80%", margin: "auto" }}>
      <img
        src="https://images.pexels.com/photos/7568297/pexels-photo-7568297.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt=""
        style={{
          height: "80vh",
          width: "500px",
          borderRadius: "30%",
          marginTop: "10px",
        }}
      />

      <Form onSubmit={handleSubmit} className="form">
        <img
          src="https://pnghq.com/wp-content/uploads/2023/02/download_instagram_text_logo_transparent_png_3512-300x103.png"
          alt="InstaLogo"
          style={{ width: "213px" }}
        />

        <Form.Group controlId="formHorizontalEmail">
          <Form.Label column sm={2}></Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formHorizontalPassword">
          <Form.Label column sm={2}></Form.Label>

          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Button type="submit">Sign In</Button>
        </Form.Group>
        <Form.Group className="mb-3" style={{ display: "inline-block" }}>
          Don't have an account ? <Link to="/"> Sign Up</Link>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
