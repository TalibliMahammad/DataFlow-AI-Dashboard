"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

import { Database } from "lucide-react";
import { useEffect, useState } from "react";


import { AuthLoginForm } from "./auth-login.form";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthSignupForm } from "./auth-signup-form";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { getRedirectResult } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { log } from "console";


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const,
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut" as const,

      delay: 0.3,
    },
  },
};






export function AuthCard({children}: {children?: React.ReactNode}) {
  const {view} = useAuthStore((state) => state);
  const router = useRouter();
  const pathname = usePathname();

const currentTab = pathname.includes("register") ?"signup" : "login";





  return (
    <div className="relative flex justify-center items-center min-h-screen  overflow-hidden p-4">

    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md glassmorphism rounded-2xl p-8 shadow-2xl"
    >
      <motion.div
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center mb-8"
      >
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
            <Database className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-semibold text-foreground tracking-tight">
            DataFlow Analytics
          </span>
        </div>
      </motion.div>

      <motion.div variants={contentVariants} initial="hidden" animate="visible">
        <Tabs value={currentTab} onValueChange={(val)=>router.push(val === "login" ? "/auth/login" : "/auth/register")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10 p-1 rounded-lg">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-foreground/70 rounded-md transition-all"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-foreground/70 rounded-md transition-all"
            >
              Create Account
            </TabsTrigger>
          </TabsList>

          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <TabsContent value="login" className="mt-0">
              <AuthLoginForm />
            </TabsContent>

            <TabsContent value="signup" className="mt-0">
              <AuthSignupForm />
            </TabsContent>
          </motion.div>
        </Tabs>
      </motion.div>

      <motion.p
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="text-xs text-foreground/50 text-center mt-8 leading-relaxed"
      >
        By continuing, you agree to our Terms of Service and Privacy Policy
      </motion.p>
    </motion.div>
    </div>
  );
}
