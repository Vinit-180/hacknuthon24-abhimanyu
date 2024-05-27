import React, { useState } from "react";
import img from "../ai.png";
import registerImg from "../regjpg.jpg";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
const Login = () => {
  const [login, setLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading,setLoading]=useState(false)
  const form2 = useForm();
  const navigate = useNavigate();
  const submit = (data) => {
    setLoading(true)
    axios
      .post("http://localhost:5000/login", data)
      .then((data) => {
        console.log(data?.data?.user);
        localStorage.setItem('auth',data?.data?.user)
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>{
        // setLoading(false)
      });
  };
  const submit1 = (data) => {
    // console.log(data);
    setLoading(true)
    if(data?.password===data?.cpassword)
      {
        axios
      .post("http://localhost:5000/signup", data)
      .then((data) => {
        // console.log(data);
        localStorage.setItem('auth',data?.data?.user)
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>{
        setLoading(false)
      });
      }
  };
  return (
    <>

      <div className=" flex h-screen w-100 items-center justify-center ">
        {login ? (
          <div className="flex  border border-solid border-gray-700 rounded gap-10">
            <form
              action=""
              className="col-md-6 rounded px-8 pt-6 pb-8 mb-4 "
              onSubmit={handleSubmit(submit)}
            >
              <h1 className="bg-black-600 mb-2 mt-2 ">User Login</h1>
              <div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Username
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                    {...register("email")}
                  />
                </div>
                <div class="mb-6">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="password"
                  >
                    Password
                  </label>
                  <input
                    class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    {...register("password")}
                  />
                  {/* <p class="text-red-500 text-xs italic">
                  Please choose a password.
                </p> */}
                </div>
                <div class="flex items-center justify-between">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign In
                  </button>
                  {/* <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a> */}
                </div>
                <span className="">
                  Haven't Registered?
                  <button
                    className="btn btn-link"
                    onClick={() => {
                      setLogin(false);
                    }}
                  >
                    Create an Account
                  </button>
                </span>
              </div>
            </form>
            <div className="col-md-6">
              <img src={img} alt="" className="h-100 w-100" />
            </div>
          </div>
        ) : (
          <div className="flex  border border-solid border-gray-700 rounded gap-10">
            <form
              action=""
              className="col-md-6 rounded px-8 pt-6 pb-8 mb-4 "
              onSubmit={form2.handleSubmit(submit1)}
            >
              <h1 className="bg-black-600 mb-2 mt-2 ">User Sign up</h1>
              <div>
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Email
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                    {...form2.register("email")}
                  />
                </div>
                <div class="mb-6">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="password"
                  >
                    Password
                  </label>
                  <input
                    class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    {...form2.register("password")}
                  />
                  {/* <p class="text-red-500 text-xs italic">
                  Please choose a password.
                </p> */}
                </div>
                <div class="mb-6">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="password"
                  >
                    Confirm Password
                  </label>
                  <input
                    class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    {...form2.register("cpassword")}
                  />
                  {/* <p class="text-red-500 text-xs italic">
                  Please choose a password.
                </p> */}
                </div>
                <div class="flex items-center justify-between">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
                <span className="">
                  Already Registered?
                  <button
                    className="btn btn-link"
                    onClick={() => {
                      setLogin(true);
                    }}
                  >
                    Sign in
                  </button>
                </span>
              </div>
            </form>
            <div className="col-md-6">
              <img src={registerImg} alt="" className="h-100 w-100" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
