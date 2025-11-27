import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="flex justify-center flex-col items-center text-white gap-4">
      <div className="font-bold text-3xl gap-1 mt-10 mb-3 flex">
        Buy Me A Chai <span><img src="tea.png" width={38} alt="Tea" /></span>
      </div>
      <p className="mb-4">A CrowdFunding Platform for creators. Get Funded By Your Fan and Followers. Start Now </p>
      <div className="flex gap-2">
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl rounded-3xl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Start Here</button>
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl rounded-3xl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5">Read More</button>
      </div>

      <div className="relative w-full mt-5">
        <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-10 z-50"></div>

        <div className="my-[-5] mt-10 mb-5">
        <h2 className="mt-5 text-xl text-center text-bg my-8 font-bold">Fans Can Buy You A Chai</h2>
        <div className="flex gap-5 m-auto text-center justify-around mt-2">
        <div className="flex flex-col  border-r-5 item space-y-3 border-black relative ">
          <img src="Work.png" width={40} alt="Work" className="border-2 border-black ml-25 rounded-md relative -mt-2 mx-2 bg-blue-700"/>
          <p className="text-[10px] font-bold text-lg mx-2  mt-1">Fund Yourself</p>
          <p className="text-center  text-[10px] font-bold text-lg mx-2  mt-1">Your Fans Are Available For You to Help You</p>
        </div>

        <div className="flex flex-col  border-r-5 item space-y-3 border-black relative ">
          <img src="coin.png" width={40} alt="Work" className="border-2 border-black ml-25 rounded-md relative -mt-2 mx-2 bg-blue-700"/>
          <p className="text-[10px] font-bold text-lg mx-2  mt-1">Fund Yourself</p>
          <p className="text-center  text-[10px] font-bold text-lg mx-2  mt-1">Your Fans Are Available For You to Help You</p>
        </div>

        <div className="flex flex-col  border-r-5 item space-y-3 border-black relative ">
          <img src="getcoin.png" width={40} alt="Work" className="border-2 border-black ml-25 rounded-md relative -mt-2 mx-2 bg-blue-700"/>
          <p className="text-[10px] font-bold text-lg mx-2  mt-1">Fund Yourself</p>
          <p className="text-center  text-[10px] font-bold text-lg mx-2  mt-1">Your Fans Are Available For You to Help You</p>
        </div>
        </div>
      </div>
      </div>


      <div className="relative w-full container mx-auto pb-32  flex flex-col justify-center items-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-10 z-50"></div>
          <div className="my-[-5] mt-10 mb-5">
        <h2 className="mt-5 text-xl text-center text-bg my-8 font-bold">Learn More About Us</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/QtaorVNAwbI?si=iz497nkfylVpkFyj" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
        
      </div>
      
    </div>


    
    </>
  );
}
