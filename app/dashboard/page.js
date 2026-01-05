'use client'

import { useSession } from "next-auth/react" // useSession hook is used to get the session data
import { useRouter } from "next/navigation" // useRouter hook is used to redirect the user to a different page
import { useEffect, useState } from "react" // useEffect hook is used to run a function when the component is mounted
import { fetchuser, updateprofile } from "@/actions/useractions" // fetchuser and updateprofile are custom actions
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpayKeyId: "",
    razorpayKeySecret: "",
  })


  // handleChange function is used to update the form data
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  // getData function is used to get the user data
  const getData = async () => {
    if (session?.user?.name) {
      let u = await fetchuser(session.user.name)
      if (u) {
        setForm(u)
      } else {
        console.log("User not found:", session.user.name)
        toast.error("User not found. Please login again.", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark"
        })
      }
    }
  }
  // useEffect hook is used to run a function when the component is mounted
  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login")
    } else if (session) {
      getData()
    }
  }, [status, session, router])
  // handleSubmit function is used to update the user data
  const handleSubmit = async (e) => {
    let formData = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value)
    })
    let a = await updateprofile(session.user.name, formData)
    toast('Your Dashbord has been changed', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
  // if the session is loading, show loading message
  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>
  }
  // if the session is not available, redirect to login page
  if (!session) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Redirecting...</div>
  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">

        <div className="bg-gray-800 w-full max-w-2xl p-6 rounded-2xl shadow-lg text-white space-y-6">

          <h2 className="text-2xl font-bold text-center">Your Dashboard</h2>

          {/* NAME */}
          <div>
            <label htmlFor="name" className="block mb-1 text-sm">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name ? form.name : ""}
              className="w-full p-2 rounded bg-gray-700 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email ? form.email : ""}
              className="w-full p-2 rounded bg-gray-700 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* USERNAME */}
          <div>
            <label htmlFor="username" className="block mb-1 text-sm">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username ? form.username : ""}
              className="w-full p-2 rounded bg-gray-700 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* PROFILE PICTURE */}
          <div>
            <label htmlFor="profilepic" className="block mb-1 text-sm">Profile Picture</label>
            <input
              id="profilepic"
              name="profilepic"
              type="text"
              value={form.profilepic ? form.profilepic : ""}
              className="w-full p-2 rounded bg-gray-700 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* COVER PICTURE */}
          <div>
            <label htmlFor="coverpic" className="block mb-1 text-sm">Cover Picture</label>
            <input
              id="coverpic"
              name="coverpic"
              type="text"
              value={form.coverpic ? form.coverpic : ""} // if coverpic is not available, show empty string
              className="w-full p-2 rounded bg-gray-700 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* RAZORPAY KEY ID */}
          <div>
            <label htmlFor="razorpayKeyId" className="block mb-1 text-sm">Razorpay Key ID</label>
            <input
              id="razorpayKeyId"
              name="razorpayKeyId"
              type="text"
              placeholder="Enter Razorpay Key ID"
              value={form.razorpayKeyId ? form.razorpayKeyId : ""}
              className="w-full p-2 rounded bg-gray-700 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* RAZORPAY KEY SECRET */}
          <div>
            <label htmlFor="razorpayKeySecret" className="block mb-1 text-sm">Razorpay Key Secret</label>
            <input
              id="razorpayKeySecret"
              name="razorpayKeySecret"
              type="password"
              placeholder="Enter Razorpay Key Secret"
              value={form.razorpayKeySecret ? form.razorpayKeySecret : ""}
              className="w-full p-2 rounded bg-gray-700 outline-none"
              onChange={handleChange}
            />
          </div>

          {/* SAVE BUTTON */}
          <button onClick={handleSubmit} className=" w-full
                            relative overflow-hidden 
                            px-6 py-3 rounded-lg font-semibold 
                            text-white bg-slate-900/80 
                            backdrop-blur-md 
                            shadow-[0_0_20px_rgba(0,0,255,0.3)]
                            transition-all duration-300
                            before:absolute before:inset-0 
                            before:bg-gradient-to-r before:from-blue-500/20 before:via-cyan-400/10 before:to-blue-500/20 
                            before:blur-xl before:opacity-70
                            before:animate-waterFlow
                            hover:shadow-[0_0_35px_rgba(0,200,255,0.7)]
                            hover:scale-[1.03]
                          ">
            Save Changes
          </button>

        </div>

      </div>
    </>
  )
}