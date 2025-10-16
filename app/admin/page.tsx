import AdminDashboard from "@/components/admin-dashboard"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function AdminPage() {
  const cookieStore = cookies()
  const isAdmin = cookieStore.get("admin")?.value === "true"

  if (!isAdmin) {
    redirect("/")
  }

  return (
    <main className="min-h-screen bg-background pt-16">
      <AdminDashboard />
    </main>
  )
}
