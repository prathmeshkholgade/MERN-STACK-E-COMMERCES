import React from "react";

export default function Login() {
  return (
    <>
      <div className=" w-full h-full flex flex-col items-center relative">
        <div className=" p-4 absolute top-24">
          <div className="text-center my-6">
            <h3 className="font-bold text-xl">Sign in to your account</h3>
          </div>
          <form>
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
                  id="email"
                  className=" border-2 border-zinc-400 w-72 sm:w-96 py-1 rounded-md my-1"
                />
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
                  id="password"
                  className=" border-2 border-zinc-400 w-72 sm:w-96 py-1 rounded-md my-1"
                />
              </div>
            </div>
            <div className="text-right">
              <p>Forgot Password ?</p>
            </div>
            <div className="my-4">
              <button className="bg-blue-500 w-full py-1 rounded-lg text-white">
                Sign in
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
