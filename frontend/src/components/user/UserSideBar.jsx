import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import AllInboxIcon from "@mui/icons-material/AllInbox";
import LogoutIcon from "@mui/icons-material/Logout";

import { logoutUser } from "../../app/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";
const style = { color: "#2b3445" };

export default function UserSideBar({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutAction = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const userMenuOptions = [
    {
      icon: <AccountCircleOutlinedIcon fontSize="small" sx={style} />,
      path: "/",
      name: "Products",
    },
    {
      icon: <AccountCircleOutlinedIcon fontSize="small" sx={style} />,
      path: "/Cart",
      name: "Cart",
    },
    {
      icon: <AllInboxIcon fontSize="small" sx={style} />,
      path: "/orders",
      name: "Orders",
    },
    {
      icon: <LogoutIcon fontSize="small" sx={style} />,
      name: "Logout",
      onclick: logOutAction,
    },
  ];
  return (
    user && (
      <div className="w-full p-2 ">
        <div className="flex  p-2 text-center gap-2 items-center">
          <div className=" w-20 rounded-full h-20">
            <AccountCircleOutlinedIcon sx={{ width: "70%", height: "100%" }} />
          </div>
          <div>
            <p className="font-semibold">{user.fullName}</p>
          </div>
        </div>
        <div className="py-4">
          <p>{user.email}</p>
        </div>
        <hr />
        <div>
          {userMenuOptions.map((opt) => (
            <ul className="text-lg">
              {" "}
              <Menu opt={opt} />
            </ul>
          ))}
        </div>
      </div>
    )
  );
}
