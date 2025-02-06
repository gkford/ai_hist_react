import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImagePath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  // Use import.meta.env.BASE_URL which will be '/' locally and '/react_ai_hist/' in production
  return `${import.meta.env.BASE_URL}${cleanPath}`
}
