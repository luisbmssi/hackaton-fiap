import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import Link from "next/link";

const creators = [
  {
    id: 1,
    name: "Luis Bumussi",
    designation: "Javascript Developer",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQGs3e2uFe0QEw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1706917604995?e=1756944000&v=beta&t=_EWtjKSWcvkTLXst1DnBPhwZSJO2WLvX55sEhk8dtE4",
  }
]

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-100 min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center">
        {children}
      </main>
      <footer className="w-full border-t p-4 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
        &copy; {new Date().getFullYear()} EducaAI - Desenvolvido por: <Link href={"https://www.linkedin.com/in/luis-bumussi/"} target="_blank"><AnimatedTooltip items={creators} /></Link>
      </footer>
    </div>
  )
}