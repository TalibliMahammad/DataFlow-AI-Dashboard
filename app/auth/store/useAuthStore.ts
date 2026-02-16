"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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
  signup: (data: UserData, method: "firebase" | "manual") => Promise<void>;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
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
        provider.setCustomParameters({
          prompt: "select_account",
        });
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          set({
            view: "dashboard",
            registeredUser: {
              email: user.email || "",
              fullName: user.displayName || "",
              avatar: user.photoURL || "",
              password: "",
            },
            alert: { message: "Logged in with Google", type: "success" },
          });
          return true;
        } catch (error: any) {
          if (error.code === "auth/unauthorized-domain") {
            console.log("Google sign-in error:", error);
            set({ alert: { message: "Google sign-in failed", type: "error" } });
          }
          return false;
        }
      },

      signup: async (userData: UserData, method: "firebase" | "manual") => {
        if (method === "firebase") {
          try {
            await createUserWithEmailAndPassword(
              auth,
              userData.email,
              userData.password,
            );

            set({
              registeredUser: userData,
              view: "login",
              alert: {
                message: "Account created in Firebase!",
                type: "success",
              },
            });
          } catch (error: any) {
            set({
              alert: {
                message: "Firebase error: " + error.message,
                type: "error",
              },
            });
          }
        } else {
          // Tamamilə Manual - Heç bir Firebase çağırışı yoxdur
          set({
            registeredUser: userData,
            view: "login",
            alert: { message: "Manual signup successful!", type: "success" },
          });
        }
      },

      login: async (email, password) => {
        // Öncə Firebase ilə yoxla
        try {
          await signInWithEmailAndPassword(auth, email, password);
          set({
            view: "dashboard",
            alert: { message: "Logged in via Firebase", type: "success" },
          });
          return true;
        } catch (firebaseErr: any) {
          console.log("Firebase login failed, checking local storage...");

          // Firebase uğursuz olsa, sənin manual yoxlamanı işə salırıq
          const user = get().registeredUser;
          if (user && user.email === email && user.password === password) {
            set({
              view: "dashboard",
              alert: {
                message: "Logged in via Local Storage",
                type: "success",
              },
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

      logout: async () => {
        try {
          await signOut(auth);
        } catch (error: any) {
          console.log("Firebase sign out error:", error);
        }
        set({
          view: "login",
          alert: { message: "Logged out", type: "success" },
        });
      },

      alert: null,
      setAlert: (alert) => set({ alert }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
