import { NextResponse } from "next/server"

export const revalidate = 300

const CACHE_CONTROL = "public, max-age=300, s-maxage=300, stale-while-revalidate=3600"

function noContentResponse() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Cache-Control": CACHE_CONTROL,
      "X-Content-Type-Options": "nosniff",
    },
  })
}

export async function GET() {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID
  if (!tenantId) return noContentResponse()

  const adminOrigin = (process.env.NEXT_PUBLIC_ADMIN_URL || "https://admin.globle-trade.com").replace(/\/+$/, "")

  try {
    const upstream = await fetch(
      `${adminOrigin}/api/public/analytics.js?tenantId=${encodeURIComponent(tenantId)}`,
      { next: { revalidate: 300 } },
    )
    const contentType = upstream.headers.get("content-type") || ""

    if (!upstream.ok || !contentType.toLowerCase().startsWith("application/javascript")) {
      return noContentResponse()
    }

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Cache-Control": CACHE_CONTROL,
        "Content-Type": "application/javascript; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
      },
    })
  } catch {
    return noContentResponse()
  }
}
