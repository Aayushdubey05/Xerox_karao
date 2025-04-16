import { type NextRequest, NextResponse } from "next/server"

// This is a mock database. In a real application, you would use a proper database.
const shops: any[] = []

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, shopName, shopAddress } = await req.json()
    const newShop = { id: Date.now().toString(), name, email, phone, shopName, shopAddress }
    shops.push(newShop)
    return NextResponse.json({ success: true, shop: newShop })
  } catch (error) {
    console.error("Error registering shop:", error)
    return NextResponse.json({ error: "Failed to register shop" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const searchQuery = req.nextUrl.searchParams.get("search") || ""
  const filteredShops = shops.filter((shop) => shop.shopName.toLowerCase().includes(searchQuery.toLowerCase()))
  return NextResponse.json({ shops: filteredShops })
}
