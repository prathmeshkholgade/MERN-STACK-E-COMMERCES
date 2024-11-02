import React, { useState } from "react";
import SearchInput from "./SearchInput";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../app/features/auth/authSlice";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "./Menu";
import withUsername from "./WithUsername";
// import { Block } from "@mui/icons-material";
const color = { color: "#2b3445" };
export default function Navbar() {
  const [userMenu, setuserMenu] = useState(false);
  const [toggleMenu, settoggleMenu] = useState(false);
  const [search, setsearch] = useState(false);
  const user = useSelector((state) => state.Auth.User);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutAction = () => {
    dispatch(logoutUser());
    navigate("/");
    setuserMenu(false);
    settoggleMenu(false);
  };
  const MenuWithUsername = withUsername(Menu, user?.fullName);
  const userMenuOptions = [
    {
      icon: <AccountCircleOutlinedIcon fontSize="small" sx={color} />,
      path: "/myprofile",
      name: "My Profile",
    },
    ...(user?.isAdmin
      ? [
          {
            icon: <DashboardIcon fontSize="small" sx={color} />,
            path: "/admin/order",
            name: "Dashboard",
          },
        ]
      : []),
    {
      icon: <AllInboxIcon fontSize="small" sx={color} />,
      path: "/orders",
      name: "Orders",
    },
    {
      icon: <LogoutIcon fontSize="small" sx={color} />,
      name: "Logout",
      onclick: logOutAction,
    },
  ];
  return (
    <div className="flex px-2 md:px-4 lg:px-0 py-4 bg-gray-50 shadow-lg justify-between lg:justify-evenly relative">
      <div className="text-sm flex items-center">
        <Link to={"/"}>
          {" "}
          {/* <p className="text-lg">New Samarat Enterprises</p>{" "} */}
          <p>E-commerce</p>
        </Link>
      </div>

      <div className="hidden md:flex ">
        <SearchInput />{" "}
      </div>

      <div>
        <ul className="flex gap-4 sm:gap-6 lg:gap-10 items-center  font-semibold    ">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `${isActive ? "text-[#FA541C]" : ""} hidden md:block`
            }
          >
            <li>Home</li>{" "}
          </NavLink>
          <li className="md:hidden" onClick={() => setsearch(!search)}>
            <SearchIcon sx={{ color: "#327bf1" }} />
          </li>
          <NavLink to={"/cart"}>
            <li className="flex items-center">
              <ShoppingCartIcon fontSize="small" />{" "}
              <p className="hidden md:block">Cart</p>
            </li>
          </NavLink>
          {user && (
            <li
              className="sm:hidden "
              onClick={() => settoggleMenu(!toggleMenu)}
            >
              <MenuIcon />
            </li>
          )}
          {!user ? (
            <>
              <NavLink
                to={"/login"}
                className={({ isActive }) => (isActive ? "text-[#FA541C]" : "")}
              >
                {" "}
                <li>Login</li>
              </NavLink>
              <NavLink
                to={"/signup"}
                className={({ isActive }) => (isActive ? "text-[#FA541C]" : "")}
              >
                {" "}
                <li>SignUp</li>
              </NavLink>
            </>
          ) : (
            <li className="user hidden sm:block w-56 relative">
              <div
                className="relative"
                onMouseEnter={() => setuserMenu(true)}
                onMouseLeave={() => setuserMenu(false)}
              >
                <div
                  className={`${
                    userMenu
                      ? "border-2 border-gray-300"
                      : "border-2 border-transparent"
                  }  flex gap-2 items-center p-1 rounded-md transition-all duration-300 ease-in-out `}
                >
                  <AccountCircleOutlinedIcon />{" "}
                  <p>{(user?.fullName).slice(0, 15) + ".."}</p>{" "}
                  {userMenu ? (
                    <KeyboardArrowUpOutlinedIcon fontSize="small" />
                  ) : (
                    <KeyboardArrowDownOutlinedIcon fontSize="small" />
                  )}
                </div>
                {userMenu && (
                  <div className="absolute bg-[#e5e6e8] w-full rounded-lg py-2 z-10 ">
                    <ul>
                      {userMenuOptions.map((opt, idx) => (
                        <Menu opt={opt} />
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
          )}
        </ul>
      </div>

      {toggleMenu && user && (
        <div
          className="menu px-2 sm:hidden absolute right-0 top-16 w-[60%] h-screen
       bg-gray-100 transition-all duration-500 ease-in-out z-30"
        >
          <ul>
            {user && (
              <li className="py-2 pl-1 bg-[#232f3e] rounded-md text-white font-semibold">
                {" "}
                Hello {user?.fullName}
              </li>
            )}
            {userMenuOptions.map((opt, idx) => (
              <Menu opt={opt} />
            ))}
          </ul>
        </div>
      )}
      {search && (
        <div className="absolute md:hidden top-16  w-full z-20 ">
          <div className="px-4">
            <SearchInput />
          </div>
        </div>
      )}
    </div>
  );
}
