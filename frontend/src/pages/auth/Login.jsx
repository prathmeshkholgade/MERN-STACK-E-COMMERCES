import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../app/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
export default function Login() {
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
      const user = await dispatch(loginUser(data)).unwrap();
      navigate("/");

      console.log(user);
    } catch (error) {
      // if (error === "Unauthorized") {
      setError("root", {
        type: "manual",
        message:
          error === "Unauthorized" ? "username or password incorrect" : error,
      });
      // }
      console.log(error);
    }
  };
  return (
    <>
      <div className=" w-full h-screen flex flex-col items-center relative">
        <div className=" p-4 absolute top-24">
          <div className="text-center my-6">
            <h3 className="font-bold text-xl">Login to your account</h3>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <label htmlFor="email" className="font-semibold">
                  UserName
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder=""
                  {...register("username", {
                    required: { value: true, message: "Enter username" },
                    // pattern: {
                    //   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    //   message: "Enter valid email address",
                    // },
                  })}
                  id="email"
                  className=" border-2 border-zinc-400 w-72 sm:w-96 py-1 rounded-md my-1"
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
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
                Login
              </button>
            </div>
            <div className="text-center">
              <p>Don't have an account ? Sign up </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
