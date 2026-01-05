'use server'

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/Connectdb"
import User from "@/models/User"

// initiate a payment
export const initiate = async (amount, to_username,
    payment_from) => {
    await connectDB()
    var instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET })

    // create an order
    let options = {
        amount: Number.parseInt(amount),
        currency: 'INR'
    }

    let x = await instance.orders.create(options)

    //create a payment object which shows a pending payment in the databse
    await Payment.create({
        oid: x.id,
        amount: amount / 100,
        to_user: to_username,
        name: payment_from.name,
        message: payment_from.message
    })

    return x
}
// fetch user details
export const fetchuser = async (username) => {
    await connectDB()
    let u = await User.findOne({ username: username })
    if (!u) {
        console.log("User not found:", username)
        return null
    }
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

// fetch all payments of a user
export const fetchpayments = async (username) => {
    await connectDB()
    // find all payment sorted by decreasing order of amount and flatten object
    let payments = await Payment.find({ to_user: username }).sort({ amount: -1 })
    payments = payments.map((payment) => payment.toObject({ flattenObjectIds: true }))
    return payments
}

//update profile data
export const updateprofile = async (OldUsername, data) => {
    await connectDB()
    let ndata = Object.fromEntries(data)

    //If the username is being updated , check if username is available
    if (OldUsername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { success: false, message: "Username is not available" }
        }

    }
    await User.findOneAndUpdate({ username: OldUsername }, ndata)
    return { success: true, message: "Profile updated successfully" }
}