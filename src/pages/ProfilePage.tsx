import { fetchUsers } from "@/store/slices/userSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUsers());
  },[dispatch]);

  const data = useSelector((state: RootState) => state.user);
  console.log("profile", data);

  return (
    <div className="mt-10 flex justify-center items-center bg-transparent px-4 "></div>
  );
};

export default ProfilePage;
