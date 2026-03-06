import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "./store/store";

function App() {
  // protecting route logic
  const token = useSelector((state: RootState) => state.user.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <></>;
}

export default App;
