'use client'

import { useSession } from "next-auth/react"  //user login hai ya nahi batata
import { useRouter } from "next/navigation"  //page navigate karne ka hook
import { useEffect } from "react"  //render ke baad code chalane ke liye (redirect error fix)

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

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
          <label className="block mb-1 text-sm">Name</label>
          <input
            type="text"
            defaultValue={session.user?.name}
            className="w-full p-2 rounded bg-gray-700 outline-none"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            defaultValue={session.user?.email}
            className="w-full p-2 rounded bg-gray-700 outline-none"
          />
        </div>

        {/* USERNAME */}
        <div>
          <label className="block mb-1 text-sm">Username</label>
          <input
            type="text"
            defaultValue={session.user?.name}
            className="w-full p-2 rounded bg-gray-700 outline-none"
          />
        </div>

        {/* PROFILE PICTURE */}
        <div>
          <label className="block mb-1 text-sm">Profile Picture</label>
          <input
            type="file"
            className="w-full p-2 rounded bg-gray-700 outline-none"
          />
        </div>

        {/* COVER PICTURE */}
        <div>
          <label className="block mb-1 text-sm">Cover Picture</label>
          <input
            type="file"
            className="w-full p-2 rounded bg-gray-700 outline-none"
          />
        </div>

        {/* RAZORPAY KEY ID */}
        <div>
          <label className="block mb-1 text-sm">Razorpay Key ID</label>
          <input
            type="text"
            placeholder="Enter Razorpay Key ID"
            className="w-full p-2 rounded bg-gray-700 outline-none"
          />
        </div>

        {/* RAZORPAY KEY SECRET */}
        <div>
          <label className="block mb-1 text-sm">Razorpay Key Secret</label>
          <input
            type="password"
            placeholder="Enter Razorpay Key Secret"
            className="w-full p-2 rounded bg-gray-700 outline-none"
          />
        </div>

        {/* SAVE BUTTON */}
        <button className="w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-semibold">
          Save Changes
        </button>

      </div>

    </div>
  )
}