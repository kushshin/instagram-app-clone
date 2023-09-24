import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BsPlusSquareFill } from "react-icons/bs";
import { PiFilmReelFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { RiLogoutBoxRLine } from "react-icons/ri";
import "./navtab.css";
import { useCookies } from "react-cookie";

const NavTab = () => {
  const [cookies, setCookies] = useCookies(["myToken"]);
  const navigate = useNavigate();

  const Logout = () => {
    setCookies("myToken", "");
    window.localStorage.clear("");

    navigate("/");
  };
  return (
    <div className="navcontainer">
      <ul>
        <li>
          <img
            src="https://pnghq.com/wp-content/uploads/2023/02/download_instagram_text_logo_transparent_png_3512-300x103.png"
            alt="InstaLogo"
            className="Imglogo"
          />
        </li>
        <li>
          <Link to="/home" className="link">
            <AiFillHome />
            <span> </span>Home
          </Link>
        </li>
        <li>
          <Link to="/createpost" className="link">
            <BsPlusSquareFill />
            <span> </span>Create
          </Link>
        </li>
        <li>
          <Link to="/AllPost" className="link">
            <PiFilmReelFill />
            <span> </span>Reels
          </Link>
        </li>
        <li>
          <Link to="/profile" className="link">
            <CgProfile />
            <span> </span>Profile
          </Link>
        </li>
        <li className="link" onClick={Logout}>
          <RiLogoutBoxRLine />
          <span> </span>
          Logout
        </li>
      </ul>

      {/* <Navbar bg="light" data-bs-theme="light" style={{ width: "244px" }}>
        <Container
          style={{
            display: "block",
            height: "100vh",
            borderRight: "1px solid black",
          }}
        >
          <Navbar.Brand href="/">
            <img
              src="https://pnghq.com/wp-content/uploads/2023/02/download_instagram_text_logo_transparent_png_3512-300x103.png"
              alt=""
              style={{
                width: "130px",
                background: "transparent",
                marginBottom: "20px",
                marginTop: "30px",
              }}
            />
          </Navbar.Brand>
          <Nav
            className="me-auto"
            style={{
              display: "block",
              textAlign: "center",
              color: "black",
            }}
          >
            <Nav.Link
              href="/"
              style={{ marginBottom: "50px", color: "black", fontSize: "17px" }}
            >
              <AiFillHome />
              <span> </span>
              Home
            </Nav.Link>

            <Nav.Link
              href="/CreatePost"
              style={{ marginBottom: "50px", color: "black", fontSize: "17px" }}
            >
              <BsPlusSquareFill />
              <span> </span>
              Create
            </Nav.Link>
            <Nav.Link
              href="/Reels"
              style={{ marginBottom: "50px", color: "black", fontSize: "17px" }}
            >
              <PiFilmReelFill />
              <span> </span>
              Reels
            </Nav.Link>
            <Nav.Link
              href="/profile"
              style={{ marginBottom: "50px", color: "black", fontSize: "17px" }}
            >
              <CgProfile />
              <span> </span>
              Profile
            </Nav.Link>
            <Nav.Link href="/logout">More</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
    </div>
  );
};

export default NavTab;
