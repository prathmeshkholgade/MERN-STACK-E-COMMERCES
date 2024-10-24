import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signupUser } from "../../app/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const user = await dispatch(signupUser(data)).unwrap();
      navigate("/");
      console.log(user);
    } catch (error) {
      console.log(error);
      setError("root", {
        type: "manual",
        message: error || "unexpected error occurred",
      });
    }
  };
  return (
    <div className=" w-full h-screen flex flex-col items-center relative">
      <div className=" p-4 absolute top-20">
        <div className="text-center my-6">
          <h3 className="font-bold text-xl">Sign Up </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label htmlFor="username" className="font-semibold">
                UserName
              </label>
            </div>
            <div>
              <input
                type="text"
                {...register("username", {
                  required: { value: true, message: "Enter username" },
                })}
                placeholder=""
                id="username"
                className=" border-2 border-zinc-400 w-72 sm:w-96 py-1 rounded-md my-1"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="fullname" className="font-semibold">
                FullName
              </label>
            </div>
            <div>
              <input
                type="text"
                placeholder=""
                {...register("fullName", {
                  required: { value: true, message: "Enter fullName" },
                })}
                id="fullname"
                className=" border-2 border-zinc-400 w-72 sm:w-96 py-1 rounded-md my-1"
              />
              {errors.fullName && (
                <p className="text-red-500">{errors.fullName.message}</p>
              )}
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="email" className="font-semibold">
                Email Address
              </label>
            </div>
            <div>
              <input
                type="text"
                placeholder=""
                {...register("email", {
                  required: { value: true, message: "Enter email" },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter valid email address",
                  },
                })}
                id="email"
                className=" border-2 border-zinc-400 w-72 sm:w-96 py-1 rounded-md my-1"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
            </div>
            <div>
              <input
                type="text"
                placeholder=""
                {...register("password", {
                  required: { value: true, message: "Enter password" },
                })}
                id="password"
                className=" border-2 border-zinc-400 w-72 sm:w-96 py-1 rounded-md my-1"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className="text-right">
            <p>Forgot Password ?</p>
          </div>
          {errors.root && (
            <div>
              <p className="text-red-500"> {errors.root.message}</p>
            </div>
          )}
          <div className="my-4">
            <button className="bg-blue-500 w-full py-1 rounded-lg text-white">
              Sign in
            </button>
          </div>
          <div className="text-center">
            <p>Already have an account ? Sign in </p>
          </div>
        </form>
      </div>
    </div>
  );
}
