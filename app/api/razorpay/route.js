import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/Connectdb";
import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export const POST = async (req) => {
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)

    console.log("Received payment callback:", {
        razorpay_order_id: body.razorpay_order_id,
        razorpay_payment_id: body.razorpay_payment_id,
        razorpay_signature: body.razorpay_signature
    })

    // check if RazorpayOrderid is present on the server
    let p = await Payment.findOne({ oid: body.razorpay_order_id })

    if (!p) {
        console.log("Payment not found for order:", body.razorpay_order_id)
        return NextResponse.json({ success: false, message: "Order Id is not found" })
    }

    console.log("Payment found:", p)

    // Verify the payment 
    let xx = validatePaymentVerification({
        'order_id': body.razorpay_order_id,
        'payment_id': body.razorpay_payment_id
    }, body.razorpay_signature, process.env.KEY_SECRET)

    console.log("Payment verification result:", xx)

    if (xx) {
        // update the payment status
        const updatedPayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id },
            { done: true },
            { new: true }
        )
        console.log("Updated Payment:", updatedPayment)

        // Use to_user from the payment object
        const redirectUrl = `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`
        console.log("Redirecting to:", redirectUrl)
        return NextResponse.redirect(redirectUrl)
    }

    else {
        console.log("Payment verification failed")
        return NextResponse.json({ success: false, message: "Payment is not verified" })
    }
}