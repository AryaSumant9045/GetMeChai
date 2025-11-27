'use client'

import { useSession } from "next-auth/react"  //user login hai ya nahi batata
import { useRouter } from "next/navigation"  //page navigate karne ka hook
import { useEffect, useState } from "react"  //render ke baad code chalane ke liye (redirect error fix)

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: null,
    coverpic: null,
    razorpayKeyId: "",
    razorpayKeySecret: "",
  })
  const [touched, setTouched] = useState({})

  const handleChange = (event) => {
    const { name, value, files } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }))
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
  }

  // Fix redirect error
  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/login")
    }
  }, [status, session, router])

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>
  }

  if (!session) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Redirecting...</div>
  }

  return (
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
            value={touched.name ? form.name : (session.user?.name ?? "")}
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
            value={touched.email ? form.email : (session.user?.email ?? "")}
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
            value={touched.username ? form.username : (session.user?.name ?? "")}
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
            type="file"
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
            type="file"
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
            value={form.razorpayKeyId}
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
            value={form.razorpayKeySecret ?? ""}
            className="w-full p-2 rounded bg-gray-700 outline-none"
            onChange={handleChange}
          />
        </div>

        {/* SAVE BUTTON */}
        <button className=" w-full
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
  )
}