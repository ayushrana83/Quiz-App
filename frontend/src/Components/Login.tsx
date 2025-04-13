import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import { Axios } from "../Axios";
import { toast } from "react-toastify";

export default function Login() {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const {loginUser} = useUser();
  const navigate = useNavigate();
  const handleSubmit = async (e : any) => {
    e.preventDefault();
    try {
      const response  = await Axios.post("/user/login" , {email , password});
      // console.log(response);
      if(response.status === 200)
      {
        // console.log(email , password);
        loginUser(email , password);
        navigate("/");
        toast.success("login successfull");
      }
      else
      {
        toast.info(response.data.message);
        console.log("error in login");
      }
    } catch (error : any) {
      // console.log(error);
      // console.log(error.response);
      toast.error(error.response.data.message || "error");
      console.log("error in login" , error);
    }
  }
  return (
    <div className="isolate max-h-screen bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">Login</h2>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}  className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
              value={email}
                id="email"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
              Password
            </label>
            <div className="mt-2.5">
              <input
              value={password}
                id="password"
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
            </div>
          </div>
          <p className="block text-sm/6 font-semibold text-gray-900">Not Registered ? <Link to={"/signup"} className="text-blue-400 underline">Signup</Link></p>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
