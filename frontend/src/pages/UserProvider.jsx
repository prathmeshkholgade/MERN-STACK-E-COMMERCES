import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrUser } from "../app/features/auth/authSlice";

export default function UserProvider({ children }) {
  const user = useSelector((state) => state.Auth.User);
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrUser());
  }, [dispatch]);

  return <>{children}</>;
}
