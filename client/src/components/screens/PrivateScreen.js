import { useState, useEffect} from "react";
import axios from "axios";
import "./styles/PrivateScreen.css";
import { useNavigate } from "react-router-dom"
const PrivateScreen = () => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
        navigate("/login")
      }
    };

    fetchPrivateData();
  }, []);
  const logoutHandler = () =>{
    localStorage.removeItem("authToken")
    navigate("/login")
  }
  return error ? (
    <span className="error-message">{error}</span>
  ) : (<>
    <div>{privateData}</div>
    <button  onClick={logoutHandler} >Log</button>
    </>
  );
};

export default PrivateScreen;