import { removeUser } from "@/store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const LogOutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeUser());
    navigate("/login");
  }, [dispatch, navigate]);

  return null;
};

export default LogOutPage;
