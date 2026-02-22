"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { CustomAlert } from "@/components/ui/CustomAlert";
import { useAuthStore } from "@/store/useAuthStore";
import { Chrome } from "lucide-react";
import Loader from "@/components/ui/loader";




export function AuthLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, registeredUser } = useAuthStore((state) => state);
  const setAlert = useAuthStore((state) => state.setAlert);
  const alert = useAuthStore((state) => state.alert);
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  const  [error, setError] = useState({ vEmail: false, vPassword: false });
  const router = useRouter();





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const vEmail = (formData.get("email") as string)?.trim();
    const vPassword = formData.get("password") as string;


      const validationErrors = {
      vEmail: !vEmail,
      vPassword: !vPassword,
    }; 

    setError(validationErrors);

    if(vEmail === "" && vPassword === "") {
      setAlert({message: "Please fill in all fields", type: "error"});
      return;
    }

    if(vPassword !== registeredUser?.password ) {
      setAlert({message: "Passwords do not match", type: "error"});
      return;
    }
    if(vEmail !== registeredUser?.email) {
      setAlert({message: "Email does not match", type: "error"});
      return;
    }
    setIsLoading(true);

    const success = await login(vEmail, vPassword);

    if (success) {
     
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.replace("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();
    console.log("GOOGLE LOGIN:", success);

    if (success) {
      router.replace("/dashboard");
    }
  };

useEffect(() => {
  // Səhifəyə gələndə (mount olanda) köhnə alert-ləri sil
  setAlert(null);
  
  // Səhifədən çıxanda (unmount olanda) təmizlik et
  return () => setAlert(null);
}, []);


  return (
    <>

       <CustomAlert />
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-2 ">
          <div className="space-y-2  flex-col flex gap-1">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground/90"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder={error.vEmail ? "Email is required!" : "you@example.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            className={`bg-white/5 border-white/10 placeholder:text-foreground/40 focus:border-white/20 focus:bg-white/10
              ${
                error.vEmail
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-white/10 focus:border-white/20 focus:ring-white/20"
              }
              
              `}
            />
          </div>

          <div className="space-y-2 flex-col flex gap-1 ">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-foreground/90"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
               placeholder={error.vPassword ? "Password is required!" : "*********"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`bg-white/5 border-white/10 placeholder:text-foreground/40 focus:border-white/20 focus:bg-white/10
              ${
                error.vEmail
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-white/10 focus:border-white/20 focus:ring-white/20"
              }
              
              `}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-medium transition-all duration-200"
          >
         
            { isLoading ? <div className="flex items-center gap-2 transition-all duration-300">
                <span>Logging in</span>
             <Loader />
              </div> : "Log in"}
     
   
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-foreground/60">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="glow-effect w-full flex items-center justify-center   gap-2 py-2.5 px-4 rounded-lg bg-white/5  hover:bg-white/10 text-foreground transition-all duration-200" //   onClick={handleGoogleSignIn}
        >
          <Chrome className="w-4 h-4 " />
          <span className="text-sm font-medium"> Continue with Google</span>
        </button>
      </div>
    </>
  );
}
