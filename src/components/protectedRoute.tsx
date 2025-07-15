"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isLoggingOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user && !isLoggingOut) {
      router.push("/login")
    }
  }, [user, loading, isLoggingOut, router])

  if (loading || isLoggingOut) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-zinc-500">
        Saindo...
      </div>
    )
  }

  if (!user) return null

  return <>{children}</>
}
