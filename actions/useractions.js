'use server'

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/Connectdb"
import User from "@/models/User"

export const initiate = async (amount, to_username,
    payment_from) =>{
        await connectDB()
        var instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET })

        let options = {
            amount: Number.parseInt(amount),
            currency:'INR'
        }

        let x = await instance.orders.create(options)

        //create a payment object which shows a pending payment in the databse
        await Payment.create({
            oid:x.id,
            amount:amount,
            to_user: to_username,
            name: payment_from.name,
            message: payment_from.message
        })

        return x
    }