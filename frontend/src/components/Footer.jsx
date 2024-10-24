import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="bg-zinc-100 p-2 sm:px-4 sm:py-8 w-full flex flex-col sm:flex-row  justify-evenly items-center">
      <div className="w-3/5 sm:w-fit">
        <div className=" w-[90%]">
          {" "}
          <h2 className="text-xl font-semibold">
            &copy; NewSamaratEnterPrises
          </h2>
          <p className="text-lg">
            Sardar patel rod kachhi bazar parbhani,Aurangabad Maharashtra 431401
          </p>
        </div>

        <div className=" flex gap-4 py-2">
          <a
            href="https://www.instagram.com/durgesh_kholgade_dk/"
            target="_blank"
          >
            {" "}
            <InstagramIcon />
          </a>
          <FacebookIcon />
          <TwitterIcon />
          <i className="ri-twitter-fill text-lg hover:text-xl"></i>
        </div>
      </div>
      <div className="w-3/5 sm:w-fit ">
        <p className="text-lg  font-semibold">Company</p>
        <ul className="flex sm:flex-col gap-2">
          <li>About</li>
          <li>Products</li>
        </ul>
      </div>
    </div>
  );
}
