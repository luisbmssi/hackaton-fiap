import { Sidebar } from "./sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-60 flex-1 px-6 py-8">{children}</div>
    </div>
  )
}