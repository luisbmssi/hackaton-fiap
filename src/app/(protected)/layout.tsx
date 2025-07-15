import { ProtectedRoute } from "@/components/protectedRoute"
import { Sidebar } from "@/components/sidebar"
import { Sidebar2 } from "@/components/sidebar2"

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar2 />
        <main className="ml-60 flex-1 px-6 py-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  )
}