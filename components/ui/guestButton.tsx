import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "./loader";
const GuestButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading]= useState(false)

  const clickToDash = () => {

    setIsLoading(true)
    setTimeout(() => {

      router.replace("/dashboard");
    }, 1000);
  };

  return (
    <button  onClick={clickToDash}
 className=" bg-green-700 glow-effect w-full flex items-center justify-center gap-2 py-2.5 rounded-lg  border border-white/10 text-foreground/80 transition-color duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[42px]"
>      { isLoading ? <div className="flex items-center gap-2 ">
                     <span>Loading to Dash...</span>
                  <Loader />
                   </div> : "Guest"}
    </button>
  );
};

export default GuestButton;
