"use client"

import { Download, FileText, Printer, Copy, FileIcon as FileDescription } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  phone: string
  queueNumber: number
  documents: {
    id: string
    name: string
    type: "color" | "bw"
    amount: number
    url: string
    copies: number
    description?: string
  }[]
}

interface DocumentDetailsDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocumentDetailsDialog({ user, open, onOpenChange }: DocumentDetailsDialogProps) {
  if (!user) return null

  const totalAmount = user.documents.reduce((sum, doc) => sum + doc.amount, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden rounded-xl"
        aria-describedby="dialog-description"
      >
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
          <DialogTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Documents for {user.phone}
          </DialogTitle>
          <DialogDescription id="dialog-description" className="text-emerald-100">
            View and manage documents for this user.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto px-6">
          <div className="space-y-4 py-4">
            {user.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col rounded-lg border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 truncate max-w-[70%] flex items-center gap-2">
                    <div
                      className={`p-1 rounded ${doc.type === "color" ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-600"}`}
                    >
                      <FileText className="h-4 w-4" />
                    </div>
                    {doc.name}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all duration-300"
                  >
                    <a href={doc.url} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Printer className="h-4 w-4 text-gray-400" />
                    <span>Type: {doc.type === "color" ? "Color Xerox" : "Black & White Xerox"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Copy className="h-4 w-4 text-gray-400" />
                    <span>Copies: {doc.copies}</span>
                  </div>
                </div>
                {doc.description && (
                  <div className="mt-2 flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    <FileDescription className="h-4 w-4 text-gray-400 mt-0.5" />
                    <p className="truncate">Description: {doc.description}</p>
                  </div>
                )}
                <div className="mt-2 text-right">
                  <span className="text-sm font-medium text-emerald-600">₹{doc.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between border-t px-6 py-4 text-lg font-medium bg-white sticky bottom-0">
          <span>Total Amount:</span>
          <span className="text-emerald-600">₹{totalAmount}</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
