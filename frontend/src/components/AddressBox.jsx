import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteAddress } from "../app/features/auth/authSlice";
export default function addressBox({ address, idx, onSelectAddress }) {
  const { register } = useForm();
  const addresses = useSelector((state) => state?.Auth?.User?.addresses);
  const disptach = useDispatch();
  const handleDelete = () => {
    disptach(deleteAddress(address._id));
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
    onSelectAddress(e.target.value); // Pass the selected address ID to the parent
  };
  return (
    address && (
      <div className="relative p-2">
        <div>
          <div className="flex items-center ">
            <input
              type="radio"
              value={address._id}
              className="pr-4"
              {...register("address", { required: true })}
              // defaultChecked={idx === addresses.length - 1}
              onChange={handleSelect}
            />
            <p className="p-2 text-lg tracking-normal">
              <span className="font-bold">
                {address.fristName} {address.lastName}
              </span>{" "}
              <span>{address.locality}</span> <span>{address.landmark}</span>{" "}
              <span>{address.city}</span> <span>{address.state}</span>{" "}
              <span>{address.zipCode}</span>
            </p>{" "}
          </div>
        </div>
        <div className="absolute top-0 right-2">
          <DeleteOutlineIcon fontSize="small" onClick={handleDelete} />
        </div>
      </div>
    )
  );
}
