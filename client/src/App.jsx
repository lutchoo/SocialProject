import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";

function App() {
  const [uid, setUid] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      await axios
        .get("http://localhost:8081/jwtid", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setUid(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
