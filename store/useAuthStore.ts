"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { register } from "node:module";

type ViewType =
  | "register"
  | "login"
  | "dashboard"
  | "reset-password"
  | "verify-email"
  | "update-profile"
  | "delete-account";

interface UserData {
  fullName?: string;
  email: string;
  password: string;
  avatar?: string;
  provider?: "google" | "email";
}

interface AuthState {
  view: ViewType;
  registeredUser: UserData | null;
  setView: (view: ViewType) => void;
  signup: (data: UserData, method: "firebase" | "manual") => Promise<boolean>;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  alert: { message: string; type: "success" | "error" } | null;
  setAlert: (
    alert: { message: string; type: "success" | "error" } | null,
  ) => void;
  loginWithGoogle: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      view: "register",
      registeredUser: null,
      setView: (newView) => set({ view: newView }),

      loginWithGoogle: async (): Promise<boolean> => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });

        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;

          if (user) {
            set({
              registeredUser: {
                email: user.email || "",
                fullName: user.displayName || "",
                avatar: user.photoURL || "",
                password: "",
              },
              view: "dashboard",
              alert: { message: "Uğurla giriş edildi!", type: "success" },
            });

            return true;
          }
          return false;
        } catch (error: any) {
          const errorMessage =
            error.code === "auth/popup-closed-by-user"
              ? "Giriş pəncərəsi bağlandı."
              : "Giriş zamanı xəta baş verdi.";

          set({ alert: { message: errorMessage, type: "error" } });
          return false;
        }
      },

   signup: async (userData: UserData, method: "firebase" | "manual"): Promise<boolean> => {
  // 1. Hər qeydiyyat cəhdində köhnəni sıfırla (State-i təmizləyirik)
  set({ registeredUser: null });

  // 2. Məlumatların doluluğunu yoxla (Manual və ya Firebase fərq etməz)
  if (!userData.email || !userData.password || userData.email.trim() === "") {
    set({
      alert: { message: "Email and password are required!", type: "error" },
    });
    return false; // Əməliyyatı burada kəsirik, heç nə set olunmur
  }

  if (method === "firebase") {
    try {
      await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      
      set({
        registeredUser: userData,
        view: "login",
        alert: { message: "Account created in Firebase!", type: "success" },
      });
      return true;
    } catch (error: any) {
      set({ alert: { message: "Firebase error: " + error.message, type: "error" } });
      return false;
    }
  } else {
    // 3. MANUAL HİSSƏ: Artıq bura gəlibsə, datanın dolu olduğuna əminik
    set({
      registeredUser: userData,
      view: "login",
      alert: { message: "Manual signup successful!", type: "success" },
    });
    return true;
  }
},

      login: async (email, password) => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
          set({
            view: "dashboard",
            alert: { message: "Logged in via Firebase", type: "success" },
          });
          return true;
        } catch (firebaseErr: any) {
          console.log("Firebase login failed, checking local storage...");

          const user = get().registeredUser;
          if (user && user.email === email && user.password === password) {
            set({
              view: "dashboard",
            });
            return true;
          }

          set({
            alert: {
              message: "Invalid credentials on both systems",
              type: "error",
            },
          });
          return false;
        }
      },

      logout: async function (): Promise<boolean> {
        try {
          await signOut(auth);
        } catch (error: any) {
          console.log("Firebase sign out error:", error);
        }
        set({
          view: "login",
          alert: { message: "Logged out", type: "success" },
        });
        return true;
      },

      alert: null,
      setAlert: (alert) => set({ alert }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
