import React from "react";
import Profile from "../../components/Profile";
import { useSelector } from "react-redux";
import UserSideBar from "../../components/user/UserSideBar";
import ChangePassword from "../../components/user/ChangePassword";

export default function MyProfilePage() {
  const user = useSelector((state) => state?.Auth?.User);
  const address = useSelector((state) => state?.Auth?.User?.addresses);
  console.log(address);
  return (
    user && (
      <div className="  bg-white py-8">
        <div className="w-[90%] mx-auto  ">
          <div className="flex  justify-evenly">
            <div className="border hidden md:block md:w-[30%] lg:w-[20%]">
              <UserSideBar user={user} />
            </div>
            <div className="flex justify-center items-center py-8">
              <Profile
                userInfo={user}
                address={address?.length > 0 ? address[0] : null}
              />
            </div>
          </div>
          <div>
            <ChangePassword />
          </div>
        </div>
      </div>
    )
  );
}
