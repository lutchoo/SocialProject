import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../app/slices/userSlice";
import { dateParser } from "../Util";
import FollowHandle from "./FollowHandle";

function UpdateProfil() {
  const [bio, setBio] = useState("");
  const [updateFrom, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.currentUser.user);
  const usersData = useSelector((state) => state.allUser.users);
  const dispatch = useDispatch();
  const [followingPopup, setFollowingPopUp] = useState(false);
  const [followersPopup, setFollowersPopUp] = useState(false);

  const handleUpdate = () => {
    if (bio) console.log(userData._id);
    dispatch(updateBio({ userId: userData._id, bio }));
    setUpdateForm(false);
  };

  return (
    <>
      <div className="profil-container">
        {userData && <h1>Bienvenue {userData.pseudo}</h1>}
        <LeftNav />

        <div className="update-container">
          <div className="left-part">
            <h3>Photo de profil</h3>
            {userData && <img src={userData.picture} alt={userData.picture} />}
            <UploadImg />
          </div>
          <div className="right_part">
            <div className="bio-update">
              <h3>Bio</h3>
              {updateFrom !== true && (
                <>
                  {usersData ? (
                    <p onClick={() => setUpdateForm(!updateFrom)}>
                      {userData?.bio ?? "Aucune bio disponible"}{" "}
                      {/* Utilisez l'opérateur de coalescence nullish */}
                    </p>
                  ) : (
                    <h1>null</h1>
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
            {userData ? (
              <>
                <div>
                  <h4>
                    Membre depuis le :{" "}
                    {userData.createdAt
                      ? dateParser(userData.createdAt)
                      : "date"}
                  </h4>
                </div>
                <div>
                  <h5 onClick={() => setFollowingPopUp(true)}>
                    Abonnements :{" "}
                    {userData.following ? userData.following.length : ""}
                  </h5>
                </div>
                <div>
                  <h5 onClick={() => setFollowersPopUp(true)}>
                    Abonnés :{" "}
                    {userData.followers ? userData.followers.length : ""}
                  </h5>
                </div>
              </>
            ) : null}
          </div>
        </div>
        {followingPopup && (
          <div className="popup-profil-container">
            <div className="modal">
              <h3>Abonnement</h3>
              <span className="cross" onClick={() => setFollowingPopUp(false)}>
                &#10005;
              </span>
              {userData ? (
                <ul>
                  {usersData.map((user) => {
                    for (
                      let i = 0;
                      i < (userData.following ? userData.following.length : 0);
                      i++
                    ) {
                      if (user._id === userData.following[i]) {
                        return (
                          <li key={user._id}>
                            <img src={user.picture} alt="user-picture" />
                            <h4>{user.pseudo}</h4>
                            <FollowHandle idToFollow={user._id} />
                          </li>
                        );
                      }
                    }
                  })}
                </ul>
              ) : null}
            </div>
          </div>
        )}
        {followersPopup && (
          <div className="popup-profil-container">
            <div className="modal">
              <h3>Abonnée</h3>
              <span className="cross" onClick={() => setFollowersPopUp(false)}>
                &#10005;
              </span>

              {userData ? (
                <ul>
                  {usersData.map((user) => {
                    for (let i = 0; i < userData.followers.length; i++) {
                      if (user._id === userData.followers[i]) {
                        return (
                          <li key={user._id}>
                            <img src={user.picture} alt="user-picture" />
                            {/* <h4>{user.pseudo}</h4> */}
                            <h5>{user._id}</h5>
                            <FollowHandle idToFollow={user._id} />
                          </li>
                        );
                      }
                    }
                  })}
                </ul>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UpdateProfil;
