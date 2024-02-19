import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";

function UpdateProfil() {
  const [bio, setBio] = useState("");
  const [updateFrom, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.currentUser.user);

  const handleUpdate = () => {
    e.prevent.default;
  };

  return (
    <>
      {userData && <h1>Bienvenue {userData.pseudo}</h1>}
      <div className="profil-container">
        <LeftNav />

        <div className="update-container">
          <div className="left-part">
            <h3>Photo de profil</h3>
            {userData && <img src={userData.picture} alt="user picture" />}
            <UploadImg />
          </div>
          <div className="right_part">
            <div className="bio-update">
              <h3>Bio</h3>
              {updateFrom !== true && (
                <>
                  {userData && (
                    <p onClick={() => setUpdateForm(!updateFrom)}>
                      {userData.bio}
                    </p>
                  )}
                  <button onClick={() => setUpdateForm(!updateFrom)}>
                    Modifier bio
                  </button>
                </>
              )}
              {updateFrom && (
                <>
                  {userData && (
                    <textarea
                      type="text"
                      defaultValue={userData.bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                  )}
                  <button onClick={handleUpdate}>Valider modification</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfil;
