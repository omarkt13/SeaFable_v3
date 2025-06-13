import { NextResponse } from "next/server"

export function handleApiError(error: unknown) {
  console.error("API Error:", error)

  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
}

export function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  }
}
