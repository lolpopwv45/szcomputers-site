import { NextResponse } from "next/server"

export async function GET() {
  const res = NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"))
  // Set simple admin cookie (HttpOnly false so client can toggle UI)
  res.cookies.set("admin", "true", {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.set("admin", "", { path: "/", maxAge: 0 })
  return res
}


