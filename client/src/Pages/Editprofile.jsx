import React, { useState, useEffect } from "react";
import NavTab from "../Components/NavTab";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Editprofile = () => {
  const [uName, setUname] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getuser = async () => {
      const res = await axios.get(
        `http://localhost:3001/user/singleuser/${userId}`
      );
      // console.log(res.data);
      setUname(res.data);
    };
    getuser();
  }, []);

  const newData = new FormData();
  newData.append("name", uName);
  newData.append("Pic", profilePic);
  newData.append("userId", userId);

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "http://localhost:3001/user/updateduser",
        newData
      );
      // console.log(res);
      setUname(res.data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavTab />
      <h1
        style={{
          position: "absolute",
          left: "330px",
        }}
      >
        Settings
      </h1>
      <div
        style={{
          position: "absolute",
          left: "335px",
          border: "1px solid black",
          marginTop: "70px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div>
              <form
                style={{
                  padding: "10px",
                  border: "1px solid black",
                  height: "325px",
                }}
                onSubmit={handleUpdate}
                encType="multipart/form-data"
              >
                <img
                  src={`/uploads/${uName.profilePic}`}
                  alt=""
                  style={{ borderRadius: "50%", width: "20%" }}
                />
                <div>
                  <h4>{uName.username}</h4>
                  <input
                    type="file"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                  />
                  {/* <Button variant="primary">Change profile photo</Button> */}
                </div>
                <br />
                <input
                  type="text"
                  placeholder="username"
                  value={uName.username}
                  name="name"
                  onChange={(e) => setUname(e.target.value)}
                />
                <br />
                <br />
                <Button variant="primary" type="submit">
                  update
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editprofile;
