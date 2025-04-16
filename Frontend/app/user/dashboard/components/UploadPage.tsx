"use client"

import { useState } from "react"
import { Upload, Trash2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Shop {
  id: string
  shopName: string
  shopAddress: string
}

interface UploadPageProps {
  shop: Shop
  onSendToShopOwner: (totalCost: number, files: UploadedFile[]) => void
}

interface UploadedFile {
  id: number
  name: string
  color: "Color" | "Black & White"
  copies: number
  description: string
  exactPages: number
  file: File
}

export default function UploadPage({ shop, onSendToShopOwner }: UploadPageProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [color, setColor] = useState<"Color" | "Black & White">("Color")
  const [copies, setCopies] = useState(1)
  const [selectedFileId, setSelectedFileId] = useState<number | null>(null)
  const [descriptions, setDescriptions] = useState<{ [key: number]: string }>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalCost, setTotalCost] = useState(0)

  const getExactPageCount = async (file: File): Promise<number> => {
    if (file.type === "application/pdf") {
      const formData = new FormData()
      formData.append("pdf", file)

      try {
        const response = await fetch("/api/count-pages", {
          method: "POST",
          body: formData,
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to count pages")
        }

        return data.pageCount
      } catch (err) {
        console.error("Error counting pages:", err)
        return 1
      }
    } else {
      return 1 // For non-PDF files, return 1 page
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setError(null)
    const uploadedFiles = Array.from(event.target.files || [])
    const newFiles = await Promise.all(
      uploadedFiles.map(async (file) => ({
        id: Date.now() + Math.random(), // Ensure unique ID
        name: file.name,
        color,
        copies,
        description: "",
        exactPages: await getExactPageCount(file),
        file,
      })),
    )
    setFiles([...files, ...newFiles])
    const newTotalCost = [...files, ...newFiles].reduce((sum, file) => sum + file.exactPages * 2 * file.copies, 0)
    setTotalCost(newTotalCost)
    setLoading(false)
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)
    const droppedFiles = Array.from(event.dataTransfer.files)
    const newFiles = await Promise.all(
      droppedFiles.map(async (file) => ({
        id: Date.now() + Math.random(), // Ensure unique ID
        name: file.name,
        color,
        copies,
        description: "",
        exactPages: await getExactPageCount(file),
        file,
      })),
    )
    setFiles([...files, ...newFiles])
    const newTotalCost = [...files, ...newFiles].reduce((sum, file) => sum + file.exactPages * 2 * file.copies, 0)
    setTotalCost(newTotalCost)
    setLoading(false)
  }

  const handleDelete = (id: number) => {
    const updatedFiles = files.filter((file) => file.id !== id)
    setFiles(updatedFiles)
    const newTotalCost = updatedFiles.reduce((sum, file) => sum + file.exactPages * 2 * file.copies, 0)
    setTotalCost(newTotalCost)
    if (selectedFileId === id) {
      setSelectedFileId(null)
    }
    setDescriptions((prevDescriptions) => {
      const { [id]: _, ...rest } = prevDescriptions
      return rest
    })
  }

  const handleFileSelect = (fileId: number) => {
    setSelectedFileId(fileId)
  }

  const handleDescriptionChange = (fileId: number, newDescription: string) => {
    setDescriptions((prevDescriptions) => ({
      ...prevDescriptions,
      [fileId]: newDescription,
    }))
  }

  const handleAttachDescription = (fileId: number) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) => (file.id === fileId ? { ...file, description: descriptions[fileId] || "" } : file)),
    )
    setSelectedFileId(null)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Upload Files for {shop.shopName}</h1>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-dashed border-2 border-gray-300 p-6 mb-4 text-center cursor-pointer"
            >
              <Input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept="application/pdf,image/*"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-600">Click to upload or drag and drop PDF or image files</p>
              </label>
            </div>
            <div className="flex space-x-2 mb-4">
              <Button onClick={() => setColor("Color")} variant={color === "Color" ? "default" : "outline"}>
                Color Xerox
              </Button>
              <Button
                onClick={() => setColor("Black & White")}
                variant={color === "Black & White" ? "default" : "outline"}
              >
                Black & White Xerox
              </Button>
              <Input
                type="number"
                min="1"
                value={copies}
                onChange={(e) => setCopies(Number.parseInt(e.target.value))}
                className="w-20"
              />
            </div>
            {loading && <p className="text-center">Processing files...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {files.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Uploaded Files:</h2>
                <ul className="space-y-2">
                  {files.map((file) => (
                    <li key={file.id} className="flex justify-between items-center">
                      <Button onClick={() => handleFileSelect(file.id)} variant="ghost" className="text-left flex-grow">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>
                          {file.name} ({file.color}, {file.copies} copies, {file.exactPages} pages,{" "}
                          {file.exactPages * 2} rupees)
                          {file.description && (
                            <span className="ml-2 text-sm text-gray-500">[Description attached]</span>
                          )}
                        </span>
                      </Button>
                      <Button onClick={() => handleDelete(file.id)} variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {selectedFileId !== null && (
              <div className="mb-4">
                <Label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description for {files.find((f) => f.id === selectedFileId)?.name}
                </Label>
                <div className="flex items-center space-x-2">
                  <Textarea
                    id="description"
                    placeholder="Add a description about your document..."
                    value={descriptions[selectedFileId] || ""}
                    onChange={(e) => handleDescriptionChange(selectedFileId, e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={() => handleAttachDescription(selectedFileId)} size="sm">
                    Attach
                  </Button>
                </div>
              </div>
            )}
            <Button onClick={() => onSendToShopOwner(totalCost, files)} className="w-full">
              Send to Shop Owner
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
