"use client";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { CustomAlert } from "@/components/ui/CustomAlert";
import Loader from "@/components/ui/loader";








export function AuthSignupForm() {
  // Form sahələri üçün statelər hansıkı formun inputlarından məlumatları saxlayacaq
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // -------------------------------------------------------------------------------
  // button daxilindəki loading
  const [isLoading, setIsLoading] = useState(false);
  // Store-dan signup funksiyasını və alert setterini götürürük
  const signup = useAuthStore((state) => state.signup);
  const setAlert = useAuthStore.getState().setAlert;

  // Password validasiyası üçün iki əsas kriteriya:
  const isLongEnough = password.length >= 8;
  const isMatching = password === confirmPassword && confirmPassword.length > 0;
  // Google login funksiyasını store-dan götürürük
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  // Router obyektini əldə edirik ki, uğurlu qeydiyyatdan sonra yönləndirmə edə bilək
  const router = useRouter();
  // Password üçün regex: ən azı 8 simvol, ən azı bir böyük hərf, ən azı bir kiçik hərf və ən azı bir rəqəm içermelidir
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  // Error state-i hər bir input sahəsi üçün ayrıca saxlayırıq ki, hansı sahədə problem olduğunu vizual olaraq göstərə bilək
  const [error, setError] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    name: false,
  });

  // Component yüklənərkən əvvəlki qeydiyyat məlumatlarını və alert mesajlarını təmizləyirik ki, istifadəçi təmiz bir form ilə qarşılaşsın
  useEffect(() => {
    useAuthStore.setState({ registeredUser: null, alert: null });
  }, []);

  // Əsas məsələ: Form submit edildikdə nə baş verir?
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Formun default submit davranışını bloklayırıq ki, səhifə yenilənməsin və bizim custom logic-imiz işləsin
    e.preventDefault();

    // 1. FormData API istifadə edərək formdan məlumatları alırıq
    const formData = new FormData(e.currentTarget);
    const vName = (formData.get("name") as string)?.trim();
    const vEmail = (formData.get("email") as string)?.trim();
    const vPassword = formData.get("password") as string;
    const vConfirm = formData.get("confirmPassword") as string;

    // 2. Hər bir sahənin boş olub olmadığını yoxlayırıq və error state-ni ona görə güncəlləyirik
    const validationErrors = {
      email: !vEmail,
      password: !vPassword,
      confirmPassword: !vConfirm,
      name: !vName,
    };
    setError(validationErrors);

    // 3. Əgər hər hansı bir sahə boşdursa, alert göstəririk və signup prosesini dayandırırıq
    if (!vName || !vEmail || !vPassword || !vConfirm) {
      setAlert({
        message: "Please fill in all required fields correctly.",
        type: "error",
      });
      return;
    }

    // 4. Şifrə uyğunluğu yoxlanışı
    if (vPassword !== vConfirm) {
      setAlert({ message: "Passwords do not match", type: "error" });
      return;
    }

    // 5. Şifrə çətinliyi (Regex) - vPassword-u yoxla!
    if (!passwordRegex.test(vPassword)) {
      setAlert({
        message: "Password must include uppercase, lowercase and a number.",
        type: "error",
      });
      return;
    }

    // 6. Əgər bütün validasiyalar keçərli olarsa, loading state-ni true edirik və signup funksiyasını çağırırıq
    setIsLoading(true);
    try {
      const success = await signup(
        { fullName: vName, email: vEmail, password: vPassword },
        "manual",
      );

      if (success) {
        // Uğurlu qeydiyyatdan sonra kiçik bir gecikmə əlavə edirik ki, istifadəçi alert mesajını görsün
        await new Promise((r) => setTimeout(r, 2000));
        setAlert({ message: "Account created successfully!", type: "success" });
        router.replace("/auth/login");
      }
    } catch (err: any) {
      setAlert({ message: err.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // Google ilə qeydiyyat funksiyası: loginWithGoogle funksiyasını çağırırıq və əgər uğurlu olarsa, istifadəçini dashboard-a yönləndiririk
  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();

    console.log("GOOGLE LOGIN:", success);

    if (success) {
      router.replace("/dashboard");
    }
  };

  return (
    <>
      <CustomAlert />
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
              name="name"
              placeholder={error.name ? "Name is required!" : "John Doe"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`bg-white/5 border-white/10 placeholder:text-foreground/40 focus:border-white/20 focus:bg-white/10
              ${
                error.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-white/10 focus:border-white/20 focus:ring-white/20"
              }
              
              `}
            />
          </div>

          <div className="space-y-2 flex-col flex gap-1">
            <Label htmlFor="signup-email"> Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder={
                error.email ? "Email is required!" : "you@example.com"
              }
              value={email}
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
                if (e.target.value)
                  setError((prev) => ({ ...prev, email: false }));
              }}
              className={`bg-white/5 border-white/10 placeholder:text-foreground/40 focus:border-white/20   focus:bg-white/10
            ${
              error.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-white/10 focus:border-white/20 focus:ring-white/20"
            }`}
            />
          </div>

          <div className="space-y-2  flex-col flex gap-1">
            <Label htmlFor="signup-password"> Password</Label>
            <Input
              id="signup-password"
              type="password"
              name="password"
              placeholder={
                error.password ? "Password is required!" : "********"
              }
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value)
                  setError((prev) => ({ ...prev, password: false }));
              }}
              className={`bg-white/5 border-white/10 placeholder:text-foreground/40 focus:border-white/20 focus:bg-white/10 
  ${
    password.length === 0
      ? "border-white/10" // Boşdursa default rəng
      : password.length >= 8
        ? "border-green-500 shadow-[0_0_5px_rgba(34,197,94,0.4)]" // Düzdürsə yaşıl
        : "border-red-500" // Səhvdirsə qırmızı
  } ${
    error.password
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "border-white/10 focus:border-white/20 focus:ring-white/20"
  }  `}
            />
          </div>

          <div className="space-y-2 flex-col flex gap-1">
            <Label htmlFor="signup-confirm-password"> Confirm Password</Label>
            <Input
              id="signup-confirm-password"
              type="password"
              name="confirmPassword"
              placeholder={
                error.confirmPassword ? "Passwords do not match!" : "********"
              }
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`bg-white/5 border-white/10 placeholder:text-foreground/40 focus:border-white/20 focus:bg-white/10 
  ${
    confirmPassword.length === 0
      ? "border-white/10" // Boşdursa default rəng
      : password === confirmPassword
        ? "border-green-500 shadow-[0_0_5px_rgba(34,197,94,0.4)]" // Düzdürsə yaşıl
        : "border-red-500" // Səhvdirsə qırmızı
  } ${
    error.confirmPassword
      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
      : "border-white/10 focus:border-white/20 focus:ring-white/20"
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
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground  font-medium "
          >
          
            { isLoading ? <div className="flex items-center gap-2 ">
                <span>Creating Account</span>
             <Loader />
              </div> : "Sign Up"}
     
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
          onClick={handleGoogleLogin}
          className="glow-effect w-full flex items-center  justify-center gap-2 py-2.5 rounded-lg bg-white/5 border  border-white/10   text-foreground/80 transition-color  duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Chrome className="w-4 h-4" />
          <span className="text-sm font-medium"> Continue with Google</span>
        </button>
      </div>
    </>
  );
}
``;
