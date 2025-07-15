"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, History, Sparkles } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "./ui/button"

export function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const navItems = [
    { label: "Gerador", href: "/dashboard", icon: <Sparkles size={18} /> },
    { label: "Histórico", href: "/dashboard/history", icon: <History size={18} /> },
  ]

  return (
    <aside className="h-screen w-60 bg-zinc-100 border-r border-zinc-300 p-5 flex flex-col justify-between fixed">
      <div>
        <h2 className="text-2xl font-bold mb-8">EducaAI</h2>

        <nav className="space-y-3">
          {navItems.map(({ label, href, icon }) => (
            <Link key={href} href={href}>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer 
                ${pathname === href ? "bg-zinc-200 font-semibold" : "hover:bg-zinc-200"}`}
              >
                {icon}
                <span>{label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <Button
        variant="ghost"
        className="flex items-center gap-2 text-red-500"
        onClick={logout}
      >
        <LogOut size={18} />
        Sair
      </Button>
    </aside>
  )
}