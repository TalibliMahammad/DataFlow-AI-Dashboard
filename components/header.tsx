
import { useAuthStore } from "@/store/useAuthStore";
import { Calendar, Download, Menu, Settings, X } from "lucide-react";
import React, { useState } from "react";



interface HeaderProps{
  isOpen:boolean;
  setIsOpen:(open:boolean)=>void;
}


const Header = ({isOpen, setIsOpen}:HeaderProps) => {

  const user = useAuthStore((state) => state.registeredUser);


  
  return (
    <header className="bg-card border-b border-border sticky top-0 z-10 flex-shrink-0">
      <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-start lg:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="hidden lg:flex text-xs sm:text-sm text-muted-foreground ">
            Welcome {user?.fullName || "Guest"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm transition-colors">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">This month</span>
          </button>
          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm transition-colors">
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm transition-colors">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-8 sm:top-4 right-4 z-50 lg:hidden w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center shadow-lg"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
