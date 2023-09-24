import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("registered successfully!please login");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form onSubmit={handleSubmit} className="form">
      <img
        src="https://pnghq.com/wp-content/uploads/2023/02/download_instagram_text_logo_transparent_png_3512-300x103.png"
        alt="InstaLogo"
        style={{ width: "213px" }}
      />
      <Form.Group className="mb-3" controlId="formHorizontalEmail">
        <Form.Label column sm={2}></Form.Label>
        Sign up to see photos and videos<br></br>
        from your friends
      </Form.Group>
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
        <Button type="submit">Sign up</Button>
      </Form.Group>
      <Form.Group className="mb-3" style={{ display: "inline-block" }}>
        Have an account ? <Link to="/login"> Sign in</Link>
      </Form.Group>
    </Form>
  );
};

export default Register;
