"use client"

import { useState } from "react"
import { QrCode, CreditCard, Wallet, CheckCircle, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PaymentPageProps {
  totalCost: number
  onPaymentSuccess: (code: string) => void
}

export default function PaymentPage({ totalCost, onPaymentSuccess }: PaymentPageProps) {
  const [upiId, setUpiId] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = () => {
    setIsProcessing(true)
    // Simulated payment process
    setTimeout(() => {
      const code = generateVerificationCode()
      setVerificationCode(code)
      setShowSuccess(true)
      setIsProcessing(false)
      setTimeout(() => onPaymentSuccess(code), 5000)
    }, 1500)
  }

  const generateVerificationCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString()
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(verificationCode)
    alert("Verification code copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Complete Your Payment</h1>
            <div className="text-3xl font-bold text-center mb-6 text-emerald-600">₹{totalCost}</div>
            {!showSuccess ? (
              <>
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="h-5 w-5 text-emerald-600" />
                    <h2 className="font-medium text-gray-900">Payment Options</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <input type="radio" id="upi" name="payment" defaultChecked />
                      <label htmlFor="upi" className="text-gray-700">
                        UPI Payment
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="card" name="payment" disabled />
                      <label htmlFor="card" className="text-gray-400">
                        Card Payment (Coming Soon)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                    Enter UPI ID
                  </label>
                  <Input
                    id="upiId"
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full border-gray-200 focus:border-emerald-500 focus:ring focus:ring-emerald-200 transition-all duration-300"
                  />
                </div>
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <QrCode className="h-32 w-32 text-gray-600" />
                    <p className="text-xs text-center mt-2 text-gray-500">Scan to pay</p>
                  </div>
                </div>
                <Button
                  onClick={handlePayment}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Pay ₹{totalCost}
                    </span>
                  )}
                </Button>
              </>
            ) : (
              <div className="text-center animate-fadeIn">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
                <p className="text-emerald-600 font-semibold mb-4">
                  Payment Successful! Thank you for using Xerox Karao.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 mb-2">Your Verification Code:</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-3xl font-bold mb-0 text-gray-900">{verificationCode}</p>
                    <button
                      onClick={copyToClipboard}
                      className="p-1 rounded hover:bg-gray-200 transition-colors duration-300"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Please keep this code. You'll need to show it when collecting your documents.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
