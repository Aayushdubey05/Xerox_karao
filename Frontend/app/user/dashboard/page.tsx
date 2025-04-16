'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import HomePage from './components/HomePage'
import UploadPage from './components/UploadPage'
import PaymentPage from './components/PaymentPage'

export default function UserDashboard() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedShop, setSelectedShop] = useState(null)
  const [totalCost, setTotalCost] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState([])
  const router = useRouter()

  const sendFilesToAdmin = async () => {
    try {
      const response = await fetch('/api/send-to-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ files: selectedFiles, shopId: selectedShop.id }),
      });
      if (!response.ok) {
        throw new Error('Failed to send files to admin');
      }
    } catch (error) {
      console.error('Error sending files to admin:', error);
    }
  };

  const handleSignOut = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {currentPage === 'home' && (
        <HomePage 
          onShopSelect={(shop) => {
            setSelectedShop(shop)
            setCurrentPage('upload')
          }} 
          onSignOut={handleSignOut}
        />
      )}
      {currentPage === 'upload' && (
        <UploadPage 
          shop={selectedShop} 
          onSendToShopOwner={(cost, files) => {
            setTotalCost(cost)
            setSelectedFiles(files)
            setCurrentPage('payment')
          }}
        />
      )}
      {currentPage === 'payment' && (
        <PaymentPage 
          totalCost={totalCost} 
          onPaymentSuccess={() => {
            sendFilesToAdmin();
            setCurrentPage('home');
          }} 
        />
      )}
    </div>
  )
}
