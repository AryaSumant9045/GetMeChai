'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar = () => {
  const [showdropdown, setShowdropdown] = useState(false) // default false
  const { data: session } = useSession()
  const dropdownRef = useRef(null)

  // close when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowdropdown(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  return (
    <nav className='bg-black text-white flex justify-between items-center px-4 h-16'>
      <div >
        <Link className='logo font-bold flex items-center gap-2' href={'/'}>
        <img src="/tea.png" width={20} alt="logo" />
        <span>GetMeaChai!</span>
        </Link>
      </div>

      <div className="relative" ref={dropdownRef}>
        {session && (
          <>
            {/* Button */}
            <button
              // for disappering list 
              // onBlur={()=>{
              //   setTimeout(() => {
                  
              //   }, 3000);
              // setShowdropdown(false)}}

              onClick={() => setShowdropdown(prev => !prev)}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              type="button"
              className="mx-4 inline-flex items-center justify-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Welcome {session.user?.email}
              <svg
                className="w-4 h-4 ml-1.5 -mr-0.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown menu — show/hide controlled correctly */}
            <div
              id="dropdown"
              className={`${showdropdown ? 'block' : 'hidden'} z-10 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44 absolute right-0 mt-2`}
            >
              <ul
                className="p-2 text-sm text-body font-medium"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link href="/dashboard" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link href="#" className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded">
                    Your Page
                  </Link>
                </li>

                <li>
                  <button
                    onClick={() => signOut()}
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded text-left"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}

        {session && (
          <Link href={'/dashboard'}>
            <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl rounded-2xl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-3 py-2 text-center leading-5'>
              Dashboard
            </button>
          </Link>
        )}

        {!session && (
          <Link href={'/login'}>
            <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl rounded-2xl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-sm px-3 py-2 text-center leading-5'>
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar