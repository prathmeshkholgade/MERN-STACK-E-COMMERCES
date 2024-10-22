import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { logoutUser } from "../app/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
export default function SideBar() {
  const color = { color: "#2b3445" };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutAction = () => {
    dispatch(logoutUser());
    navigate("/");
    // setuserMenu(false);
    // settoggleMenu(false);
  };
  const userMenuOptions = [
    {
      icon: <AccountCircleOutlinedIcon fontSize="small" sx={color} />,
      path: "/",
      name: "My Profile",
    },
    // {
    //   icon: <DashboardIcon fontSize="small" sx={color} />,
    //   path: "/dashboard",
    //   name: "Dashboard",
    // },
    {
      icon: <AllInboxIcon fontSize="small" sx={color} />,
      path: "/admin/order",
      name: "Orders",
    },
    {
      icon: <AllInboxIcon fontSize="small" sx={color} />,
      path: "/add",
      name: "AddNewProduct",
    },
    {
      icon: <LogoutIcon fontSize="small" sx={color} />,
      name: "Logout",
      onclick: logOutAction,
    },
  ];
  return (
    <div className="bg-white w-full h-full">
      <ul className="flex gap-2 p-4 flex-col">
        {userMenuOptions.map((opt, idx) => (
          <li
            className="p-2  font-semibol hover:bg-gray-100 rounded-lg"
            onClick={opt.onclick || null}
          >
            {" "}
            <NavLink to={opt.path}>
              {" "}
              {opt.icon} {opt.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
