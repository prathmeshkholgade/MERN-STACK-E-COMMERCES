import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteAddress } from "../app/features/auth/authSlice";
export default function addressBox({ address, idx, onSelectAddress }) {
  console.log(address);
  const { register } = useForm();
  const addresses = useSelector((state) => state?.Auth?.User?.addresses);
  const disptach = useDispatch();
  const handleDelete = () => {
    disptach(deleteAddress(address._id));
  };

  const handleSelect = (address) => {
  
    console.log(address);
    onSelectAddress(address); // Pass the selected address ID to the parent
  };
  return (
    address && (
      <div className="relative p-2">
        <div>
          <div className="flex items-center ">
            <input
              type="radio"
              value={JSON.stringify(address)}
              className="pr-4"
              {...register("address", { required: true })}
              // defaultChecked={idx === addresses.length - 1}
              onChange={() => handleSelect(address)}
            />
            <p className="p-2 text-lg tracking-normal">
              <span className="font-bold">
                {address.fristName} {address.lastName}
              </span>{" "}
              <span>{address.address}</span> <span>{address.landmark}</span>{" "}
              <span>{address.city}</span> <span>{address.zipCode}</span>
              {""}
              <span>{address.state}</span>
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
