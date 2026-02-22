"use client"
import PulseLoader from "react-spinners/PulseLoader";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
     <PulseLoader size={7} />
    </div>
  );
}