// app/(your-folder)/page.tsx
'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import {React } from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation" //for navigate to your specific page

const Login = () => {
  const { data: session } = useSession()
  const router = useRouter() //hooks outside conditon hi hone chaiye
    if(session){
      router.push('/dashboard')
    }

  return (
    <div className="text-white py-8 container mx-auto min-h-screen">
      <h1 className="font-bold text-3xl text-center mb-6">
        Login/Signup to get your fans to support you
      </h1>

      <div className= " flex flex-col gap-3 justify-center items-center p-10 rounded-md">
        {/* Google */}
        <button
          type="button"
          aria-label="Continue with Google"
          className="w-[-webkit-fill-available] flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg className="h-6 w-6 mr-2" viewBox="-0.5 0 48 48" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(-401 -860)">
                <g transform="translate(401 860)">
                  <path d="M9.827 24c0-1.524.253-2.986.705-4.356L2.623 13.604C1.082 16.734.214 20.26.214 24c0 3.737.868 7.261 2.407 10.389l7.904-6.05c-.447-1.364-.697-2.82-.697-4.336" fill="#FBBC05" />
                  <path d="M23.714 10.133c3.312 0 6.303 1.174 8.653 3.094l6.836-6.826C35.036 2.773 29.695.533 23.714.533 14.427.533 6.445 5.844 2.623 13.604l7.909 6.04C12.354 14.112 17.549 10.133 23.714 10.133" fill="#EB4335" />
                  <path d="M23.714 37.867c-6.165 0-11.359-3.978-13.182-9.51L2.623 34.395c3.822 7.761 11.804 13.072 21.09 13.072 5.732 0 11.205-2.035 15.312-5.848l-7.508-5.804c-2.118 1.334-4.785 2.052-7.89 2.052" fill="#34A853" />
                  <path d="M46.145 24c0-1.387-.214-2.88-.533-4.267L23.714 19.733v9.067h12.605c-.631 3.091-2.346 5.468-4.801 7.015l7.508 5.804C43.339 37.614 46.145 31.649 46.145 24" fill="#4285F4" />
                </g>
              </g>
            </g>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* LinkedIn (correct SVG) */}
        <button
          type="button"
          aria-label="Continue with LinkedIn"
          className=" w-[-webkit-fill-available] flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
            <path fill="#0A66C2" d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5 4.98 2.4 4.98 3.5zM.5 8h5v12h-5V8zm7 0h4.8v1.6h.1c.7-1.3 2.4-2.6 4.9-2.6 5.2 0 6.1 3.4 6.1 7.8V20h-5v-6.2c0-1.5 0-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V20h-5V8z" />
          </svg>
          <span>Continue with LinkedIn</span>
        </button>

        {/* Twitter (correct SVG) */}
        <button
          type="button"
          aria-label="Continue with Twitter"
          className="w-[-webkit-fill-available] flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
            <path fill="#1DA1F2" d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.29 3.9A12.13 12.13 0 0 1 3.15 4.6a4.28 4.28 0 0 0 1.33 5.71 4.23 4.23 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 3.99 2.97A8.6 8.6 0 0 1 2 19.54 12.12 12.12 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.35-.02-.53A8.36 8.36 0 0 0 22.46 6z" />
          </svg>
          <span>Continue with Twitter</span>
        </button>

        {/* Facebook */}
        <button
          type="button"
          aria-label="Continue with Facebook"
          className="w-[-webkit-fill-available] flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
            <path fill="#1877F2" d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.3v-2.9h2.3v-2.2c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .08 2 .08v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4v1.8h2.5l-.4 2.9h-2.1v7A10 10 0 0 0 22 12z" />
          </svg>
          <span>Continue with Facebook</span>
        </button>

        {/* Github - use uploaded file as icon */}
        <button
        onClick={()=>{signIn('github')}}
      type="button"
      aria-label="Continue with GitHub"
      className="w-[-webkit-fill-available] flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <div className="h-6 w-6 mr-2 relative">
        <Image
          src="github.png"
          alt="Github icon"
          width={24}
          height={24}
          className="object-contain rounded-sm"
          unoptimized // <-- important for local/dev path loader bypass
        />
      </div>

      <span>Continue with Github</span>
    </button>

        {/* Apple (correct SVG) */}
        <button
      type="button"
      aria-label="Continue with Apple"
      className="w-[-webkit-fill-available] flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <div className="h-6 w-6 mr-2 relative">
        <Image
          src="apple.png"   // your Apple icon image
          alt="Apple icon"
          width={24}
          height={24}
          className="object-contain"
          unoptimized     // fixes Next.js loader issue for local dev paths
        />
      </div>

      <span>Continue with Apple</span>
    </button>
      </div>
    </div>
  )
}

export default Login