import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user");
  }
};

export const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem("user");
  }
};

export const setLocalStorage = (username: string) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem("user", username);
  }
};
