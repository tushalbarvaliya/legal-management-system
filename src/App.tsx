import { useEffect } from "react";
import { useNavigate } from "react-router";

function App() {
  // protecting route logic
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(()=>{
    if (token==null) {
      navigate("/login");
    }
  },[token,navigate])

  
  return <></>;
}

export default App;
