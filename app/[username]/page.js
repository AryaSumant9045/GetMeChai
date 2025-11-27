export default async function Username({ params }) {
    const resolvedParams = await params   // FIX: unwrap the Promise

    return (
        <>
            {/* {resolvedParams.username} */}
            <div className="cover relative">
                <img src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/18.gif?token-hash=g6HitpHZigKvTCOxoDp--T61h2BEQeCThLTXU5q-Vls%3D&token-time=1764806400" alt="" />
                <div ><img height={150} className="left-[500px] relative top-0 border border-black rounded-full -mt-10" width={150} src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/aa52624d1cef47ba91c357da4a7859cf/eyJoIjozNjAsInciOjM2MH0%3D/4.gif?token-hash=vSqDOy1W6n0066PHtETadSa0NpQ1XSddnUMBHxoEMfI%3D&token-time=1765411200" alt="" />
                </div>
            </div>
            <div className=" info flex justify-center flex-col text-center">
                <div className="font-bold ">@{resolvedParams.username}</div>

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
                            <li className="flex items-center gap-3 p-1 m-1 rounded-lg bg-slate-800">
                                <img width={40} src="person.gif" alt="person" className="rounded-full border bg-slate-800" />
                                <p className="text-sm font-medium text-white">
                                    <span className="font-semibold">Rishab <span className="text-green-300">$40</span> I support You bro with lots of ❤️ </span>  
                                </p>
                            </li>
                            <li className="flex items-center gap-3 p-1 m-1 rounded-lg bg-slate-800">
                                <img width={40} src="person.gif" alt="person" className="rounded-full border bg-slate-800" />
                                <p className="text-sm font-medium text-white">
                                    <span className="font-semibold">Rishab <span className="text-green-300">$40</span> I support You bro with lots of ❤️ </span>  
                                </p>
                            </li>
                            <li className="flex items-center gap-3 p-1 m-1 rounded-lg bg-slate-800">
                                <img width={40} src="person.gif" alt="person" className="rounded-full border bg-slate-800" />
                                <p className="text-sm font-medium text-white">
                                    <span className="font-semibold">Rishab <span className="text-green-300">$40</span> I support You bro with lots of ❤️ </span>  
                                </p>
                            </li>
                            <li>Rishab donated $40 with a message</li>
                            <li>Rishab donated $40 with a message</li>
                            <li>Rishab donated $40 with a message</li>
                        </ul>
                    </div>
                    <div className="makepayment w-1/2 bg-white/10 backdrop-blur-lg text-white p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20">
                        <h2 className="text-yellow-500 text-2xl font-bold mb-5">Make Payment</h2>
                        <div className="input flex flex-col gap-2">
                            <input type="text" className="w-full p-3 rounded-lg bg-slate-800 " placeholder="Your Name" />
                            <input type="text" className="w-full p-3 rounded-lg bg-slate-800 " placeholder="Message" />
                            <input type="text" className="w-full p-3 rounded-lg bg-slate-800 " placeholder="Total Amount" />
                            <button
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
                            <button className="bg-slate-900 p-3 rounded-lg"> $10</button>
                            <button className="bg-slate-900 p-3 rounded-lg"> $20</button>
                            <button className="bg-slate-900 p-3 rounded-lg"> $50</button>
                            <button className="bg-slate-900 p-3 rounded-lg"> $100</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}