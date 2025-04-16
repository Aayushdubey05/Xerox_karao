import { type NextRequest, NextResponse } from "next/server"

// This is a mock database. In a real application, you would use a proper database.
const adminDocuments = []

export async function POST(req: NextRequest) {
  try {
    const { files, shopId, verificationCode } = await req.json()

    // In a real application, you would save this data to a database
    adminDocuments.push({ files, shopId, verificationCode, timestamp: new Date() })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

export async function GET() {
  // In a real application, you would fetch this data from a database
  return NextResponse.json({ documents: adminDocuments })
}
