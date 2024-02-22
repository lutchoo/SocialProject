import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../app/slices/userSlice";
import { fetchCurrentUser } from "../../app/slices/userSlice";

function UploadImg() {

  const [file, setFile] = useState();
  // const [picture,setPicture]=useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.currentUser.user);
  const handlePicture = (e) => {
    e.preventDefault();

    // if (userData) {
    //   console.log("userData", JSON.stringify(userData));
    // }
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);

   
    dispatch(uploadPicture({ data, id: userData._id }));
    // setPicture(userData.picture);

  };

  return (
    <div>
    <form
      action=""
      onSubmit={handlePicture}
      className="upload-pic"
    >
      <label htmlFor="files">Changer l'image</label>
      <input
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
    </div>
  );
}

export default UploadImg;
