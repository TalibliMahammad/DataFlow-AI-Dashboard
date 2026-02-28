"use client"
import PulseLoader from "react-spinners/PulseLoader";

export default function Loader() {
  return (
    <div className="flex justify-center items-center ">
     <PulseLoader size={7} />
    </div>
  );
}