"use client"

import { Check, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { User } from "./admin-dashboard"
import { useState } from "react"

interface UserListProps {
  users: User[]
  onUserSelect: (user: User) => void
  onUserComplete: (userId: string) => Promise<void>
  onUserReject: (userId: string) => Promise<void>
}

export function UserList({ users, onUserSelect, onUserComplete, onUserReject }: UserListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleComplete = async (userId: string) => {
    setLoadingId(userId)
    await onUserComplete(userId)
    setLoadingId(null)
  }

  const handleReject = async (userId: string) => {
    setLoadingId(userId)
    await onUserReject(userId)
    setLoadingId(null)
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-emerald-100"
        >
          <button
            onClick={() => onUserSelect(user)}
            className="flex items-center gap-4 text-left hover:text-emerald-600 transition-colors duration-300 group"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-medium text-sm group-hover:bg-emerald-200 transition-colors duration-300">
              {user.queueNumber}
            </span>
            <div className="flex flex-col">
              <span className="text-gray-900 font-medium">{user.phone}</span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <FileText className="h-3 w-3" />
                {user.documents.length} document{user.documents.length !== 1 ? "s" : ""}
              </span>
            </div>
          </button>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all duration-300"
              onClick={() => handleComplete(user.id)}
              disabled={loadingId === user.id}
            >
              <Check className="h-4 w-4 mr-1" />
              <span>{loadingId === user.id ? "Processing..." : "Complete"}</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-all duration-300"
              onClick={() => handleReject(user.id)}
              disabled={loadingId === user.id}
            >
              <X className="h-4 w-4 mr-1" />
              <span>{loadingId === user.id ? "Processing..." : "Reject"}</span>
            </Button>
          </div>
        </div>
      ))}
      {users.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No users found</p>
        </div>
      )}
    </div>
  )
}
