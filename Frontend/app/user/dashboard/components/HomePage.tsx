import { useState } from "react"
import { Search, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Shop {
  id: string
  shopName: string
  shopAddress: string
}

interface HomePageProps {
  onShopSelect: (shop: Shop) => void
  onSignOut: () => void
}

export default function HomePage({ onShopSelect, onSignOut }: HomePageProps) {
  const [searchResults, setSearchResults] = useState<Shop[]>([])
  const [recentSelections, setRecentSelections] = useState<Shop[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setSearchResults([])
      return
    }
    try {
      const response = await fetch(`/api/shops?search=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error("Failed to fetch shops")
      }
      const data = await response.json()
      setSearchResults(data.shops)
    } catch (error) {
      console.error("Error fetching shops:", error)
      setSearchResults([])
    }
  }

  const handleShopSelect = (shop: Shop) => {
    onShopSelect(shop)
    setRecentSelections([shop, ...recentSelections.filter((s) => s.id !== shop.id).slice(0, 3)])
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Welcome to Xerox Karao</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img className="h-16 w-16 rounded-full mr-4" src="/placeholder.svg?height=64&width=64" alt="Profile" />
            </div>
            <div className="flex-grow mx-4">
              <Input
                type="text"
                placeholder="Search xerox shops..."
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="outline" onClick={onSignOut}>
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {searchQuery.trim() === "" ? (
                <li className="px-4 py-4 sm:px-6 text-center text-gray-500">Enter a shop name to search</li>
              ) : searchResults.length === 0 ? (
                <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No shops found</li>
              ) : (
                searchResults.map((shop) => (
                  <li key={shop.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">{shop.shopName}</p>
                        <Button onClick={() => handleShopSelect(shop)}>Select</Button>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <p className="flex items-center text-sm text-gray-500">
                          <Search className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          {shop.shopAddress}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
          {recentSelections.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Selections</h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {recentSelections.map((shop) => (
                    <li key={shop.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-indigo-600 truncate">{shop.shopName}</p>
                          <Button onClick={() => handleShopSelect(shop)}>Select</Button>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <p className="flex items-center text-sm text-gray-500">
                            <Search className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {shop.shopAddress}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
