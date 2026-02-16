"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import { useAuthStore } from "./store/useAuthStore";

export function AuthSignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const signup = useAuthStore.getState().signup;
  const setAlert = useAuthStore.getState().setAlert;
  const isLongEnough = password.length >= 8;
  const isMatching = password === confirmPassword && confirmPassword.length > 0;
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      setAlert({ message: "Passwords do not match", type: "error" });
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setAlert({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase letters and a number",
        type: "error",
      });
      return;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      signup({
        fullName: name,
        email: email,
        password: password,
      },"manual");
      setAlert({
        message: "Account created successfully! Please login.",
        type: "success",
      });

    }
    
  };


  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2 flex-col flex gap-1">
          <Label
            className="text-sm font-medium text-foreground/90"
            htmlFor="name"
          >
            Full Name
          </Label>

          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white/5 border-white/10 placeholder:text-foreground/40 focus:border-white/20 focus:bg-white/10"
          />
        </div>

        <div className="space-y-2 flex-col flex gap-1">
          <Label htmlFor="signup-email"> Email</Label>
          <Input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 border-white/10 placeholder:text-foreground/40 focus:border-white/20   focus:bg-white/10"
          />
        </div>

        <div className="space-y-2  flex-col flex gap-1">
          <Label htmlFor="signup-password"> Password</Label>
          <Input
            id="signup-password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`bg-white/5 border-white/10 placeholder:text-foreground/40 focus:border-white/20 focus:bg-white/10 
  ${
    password.length === 0
      ? "border-white/10" // Boşdursa default rəng
      : password.length >= 8
        ? "border-green-500 shadow-[0_0_5px_rgba(34,197,94,0.4)]" // Düzdürsə yaşıl
        : "border-red-500" // Səhvdirsə qırmızı
  }`}
          />
        </div>

        <div className="space-y-2 flex-col flex gap-1">
          <Label htmlFor="signup-confirm-password"> Confirm Password</Label>
          <Input
            id="signup-confirm-password"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`bg-white/5 border-white/10 placeholder:text-foreground/40 focus:border-white/20 focus:bg-white/10 
  ${
    confirmPassword.length === 0
      ? "border-white/10" // Boşdursa default rəng
      : password === confirmPassword
        ? "border-green-500 shadow-[0_0_5px_rgba(34,197,94,0.4)]" // Düzdürsə yaşıl
        : "border-red-500" // Səhvdirsə qırmızı
  }`}
          />
        {password.length > 0 && (
            <div className="space-y-2 mt-3 ml-1">
            {/* 1. Uzunluq Dairəsi */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  isLongEnough
                    ? "bg-green-500 shadow-[0_0_8px_#22c55e]"
                    : "bg-red-500 shadow-[0_0_8px_#ef4444]"
                }`}
              />
              <span
                className={`text-[11px] ${isLongEnough ? "text-green-500" : "text-red-400"}`}
              >
                Minimum 8 simvol
              </span>
            </div>

            {/* 2. Uyğunluq Dairəsi */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  isMatching
                    ? "bg-green-500 shadow-[0_0_8px_#22c55e]"
                    : "bg-red-500 shadow-[0_0_8px_#ef4444]"
                }`}
              />
              <span
                className={`text-[11px] ${isMatching ? "text-green-500" : "text-red-400"}`}
              >
                Şifrələr eynidir
              </span>
            </div>
          </div> ) }
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground  font-medium transition-all duration-200"
        >
          {isLoading ? "Creating Account" : "Create Account"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-foreground/60 ">
            {" "}
            Or continue with
          </span>
        </div>
      </div>

      <button
        onClick={loginWithGoogle}
        className="glow-effect w-full flex items-center  justify-center gap-2 py-2.5 rounded-lg bg-white/5 border  border-white/10   text-foreground/80 transition-color  duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Chrome className="w-4 h-4" />
        <span className="text-sm font-medium"> Continue with Google</span>
      </button>
    </div>
  );
}
``;
