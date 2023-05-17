import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Feed from "../components/Feed";
import RightBar from "../components/RightBar";
import Topbar from "../components/TopBar";
import { AuthContext } from "../context/AuthContext";
import ProfileImg from "../images/avatar.png";
import CoverImg from "../images/cover.jpg";
import "../styles/profile.css";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const params = useParams();

  const { user: currentUser } = useContext(AuthContext);
  const username = params.username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/v1/user/view?username=${username}`
      );

      setUser(res.data);
    };

    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture ? PF + user.coverPicture : CoverImg}
                alt="cover pic"
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture ? PF + user.profilePicture : ProfileImg
                }
                alt="profile pc"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">
                {user.description ||
                  "Never stop smiling; just smile smile smile smile smile. One day, life will completely get tired of upsetting you. Keep smiling. It costs nothing to smile 😇."}
              </span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
