import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { fetchCurrUser } from "../app/features/auth/authSlice";

export default function Protected({ children, adminOnly = false }) {
  // const user = useSelector((state) => state?.Auth?.User);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const result = await dispatch(fetchCurrUser()).unwrap();
      setUser(result.user); // Make sure you're setting the user from the API result
      console.log(result.user);
    } catch (error) {
      console.log("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, [dispatch]);
  // console.log(user);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  if (adminOnly && !user.isAdmin) {
    return <Navigate to={"/"} />;
  }
  return children;
}
