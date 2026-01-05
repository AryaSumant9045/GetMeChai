'use client'

import { React, useEffect, useState } from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useractions'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments } from '@/actions/useractions'
import { toast } from 'react-toastify'
import { Bounce } from 'react-toastify'
import { useSearchParams } from 'next/navigation'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

// payment page component
const PaymentPage = ({ username }) => {
    const { data: session, status } = useSession()
    const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams() //
    const router = useRouter()
    // handle change of payment form
    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }
    // get data of user and payments
    useEffect(() => {
        getData()
    }, [username])
    // toast and refetch data after payment
    useEffect(() => {
        if (searchParams.get("paymentdone") === 'true') {
            // Refetch payments to show new donation
            fetchpayments(username).then((dbpayments) => {
                setPayments(dbpayments)
            })

            toast('Thank you for your support!', {
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
    }, [searchParams])


    // get data of user and payments
    const getData = async (params) => {
        let u = await fetchuser(username)
        if (!u) {
            console.log("User not found:", username)
            return
        }
        setCurrentUser(u)
        let dbpayments = await fetchpayments(username)
        setPayments(dbpayments)
        console.log(u, dbpayments)
    }

    // initiate payment
    const pay = async (amount) => {
        //Get the order ID
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "GetMeAChai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Sumant Saini", //your customer's name
                "email": "example.name@example.com",
                "contact": "+918006153750" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "username": username
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        var rzp1 = new window.Razorpay(options)
        rzp1.open();
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />



            <div>
                {/* {resolvedParams.username} */}
                <div className="cover relative w-full h-64 bg-gray-700 overflow-visible">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWmUy6bxl4VPSUUk_xql7Dee-uSMGcwnebBA&s"
                        alt="Cover"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='400'%3E%3Crect fill='%23374151' width='1600' height='400'/%3E%3C/svg%3E" }}
                    />
                    {/* Profile Picture Positioned Over Cover */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-20">
                        <img
                            height={180}
                            width={180}
                            className="border-4 border-black rounded-full shadow-lg bg-gray-800"
                            src={currentUser?.profilepic || "https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/18.gif?token-hash=g6HitpHZigKvTCOxoDp--T61h2BEQeCThLTXU5q-Vls%3D&token-time=1764806400"}
                            alt="Profile"
                            onError={(e) => { e.target.src = "https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/18.gif?token-hash=g6HitpHZigKvTCOxoDp--T61h2BEQeCThLTXU5q-Vls%3D&token-time=1764806400" }}
                        />
                    </div>
                </div>
                <div className=" info flex justify-center flex-col text-center mt-20">
                    <div className="font-bold ">@{username}</div>

                    <div>
                        <div className="text-sm text-slate-400">
                            Creating Animated art for VTTs
                        </div>
                        <div className="text-sm text-slate-400">
                            21,529 members • 104 posts • $17,900/release
                        </div>

                    </div>

                    <div className="mt-8 flex gap-3 w-[80%] m-auto payment">
                        <div className="supporter w-1/2 bg-white/10 backdrop-blur-lg text-white p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20">
                            {/* show list of all supporter as a leaderboard */}
                            <h2 className=" text-yellow-500 text-2xl font-bold mb-5">Our Supporters</h2>
                            <ul className="">
                                {payments.length === 0 && <p>No payments yet</p>}
                                {payments.map((payment) => (
                                    <li key={payment._id} className="flex items-center gap-3 p-1 m-1 rounded-lg bg-slate-800">
                                        <img width={40} src="person.gif" alt="person" className="rounded-full border bg-slate-800" />
                                        <p className="text-sm font-medium text-white">
                                            <span className="font-semibold">{payment.name} Donated <span className="text-green-300">${payment.amount}</span> with message "{payment.message}"</span>
                                        </p>
                                    </li>
                                ))}

                            </ul>
                        </div>
                        <div className="makepayment w-1/2 bg-white/10 backdrop-blur-lg text-white p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20">
                            <h2 className="text-yellow-500 text-2xl font-bold mb-5">Make Payment</h2>
                            <div className="input flex flex-col gap-2">
                                <input name="name" onChange={handleChange} value={paymentform.name} type="text" className="w-full p-3 rounded-lg bg-slate-800 " placeholder="Your Name" />
                                <input name="message" onChange={handleChange} value={paymentform.message} type="text" className="w-full p-3 rounded-lg bg-slate-800 " placeholder="Message" />
                                <input name="amount" onChange={handleChange} value={paymentform.amount} type="text" className="w-full p-3 rounded-lg bg-slate-800 " placeholder="Total Amount" />
                                <button
                                    onClick={() => pay(paymentform.amount * 100)}
                                    type="button"
                                    className="btn-water relative overflow-hidden px-6 py-3 rounded-lg text-white font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-300/40"
                                >
                                    {/* animated color layers */}
                                    <span aria-hidden className="water-layer slow absolute inset-0 -z-10"></span>
                                    <span aria-hidden className="water-layer fast absolute inset-0 -z-20 mix-blend-screen opacity-80"></span>

                                    {/* subtle glass highlight */}
                                    <span aria-hidden className="absolute left-0 top-0 h-1/2 w-1/2 rounded-bl-full blur-2xl opacity-30 -z-30"></span>

                                    {/* visible label (kept top) */}
                                    <span className="relative z-10">Pay</span>
                                </button>
                            </div>
                            {/* Or choose from these amounts */}
                            <div className="flex gap-2 mt-5">
                                <button className="bg-slate-900 p-3 font-bold rounded-lg" onClick={() => pay(1000)}>₹10</button>
                                <button className="bg-slate-900 p-3 font-bold rounded-lg" onClick={() => pay(2000)}> ₹20</button>
                                <button className="bg-slate-900 p-3 font-bold rounded-lg" onClick={() => pay(5000)}> ₹50</button>
                                <button className="bg-slate-900 p-3 font-bold rounded-lg" onClick={() => pay(1000000)}> ₹10000</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default PaymentPage