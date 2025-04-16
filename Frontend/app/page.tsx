import Link from "next/link"
import { Printer, Clock, MapPin, CreditCard, CheckCircle, ArrowRight } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
              <Printer className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Xerox Karao</span>
          </div>
          <div className="space-x-2">
            <Link
              href="/user/login"
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium"
            >
              Login
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/user/signup"
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Print Documents <span className="text-emerald-600">Anywhere</span>, Anytime
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Xerox Karao connects you with local print shops for hassle-free document printing, copying, and scanning
                services. Upload your files, pay online, and pick up your prints when ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/user/login"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 text-center flex items-center justify-center gap-2"
                >
                  Get Started as User
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/admin/login"
                  className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-300 text-center"
                >
                  Shop Owner Login
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 text-white">
                  <h3 className="text-xl font-bold">Xerox Karao Benefits</h3>
                  <p className="text-sm text-emerald-50">Why users love our service</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <Clock className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Quick & Convenient</h4>
                      <p className="text-sm text-gray-600">Upload documents in seconds and pick up when ready</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <MapPin className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Local Shop Network</h4>
                      <p className="text-sm text-gray-600">Find the closest print shop to your location</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <CreditCard className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Secure Online Payment</h4>
                      <p className="text-sm text-gray-600">Pay online and avoid carrying cash</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Verified Quality</h4>
                      <p className="text-sm text-gray-600">All print shops are verified for quality service</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">Join 1000+ satisfied users</div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How Xerox Karao Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Find Nearby Shops</h3>
              <p className="text-gray-600">Search for print shops near you and choose the most convenient location.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Printer className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Upload Documents</h3>
              <p className="text-gray-600">Upload your files, specify print options, and add special instructions.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Pay Online</h3>
              <p className="text-gray-600">Securely pay for your order and receive a verification code.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Collect Prints</h3>
              <p className="text-gray-600">Visit the shop, show your code, and collect your printed documents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Xerox Karao</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <Clock className="h-10 w-10 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Save Time</h3>
              <p className="text-gray-600">
                No more waiting in lines. Upload documents from anywhere and pick them up when ready.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <CheckCircle className="h-10 w-10 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Quality Assurance</h3>
              <p className="text-gray-600">Partner shops are verified for quality service and reliable printing.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
              <CreditCard className="h-10 w-10 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Secure Payments</h3>
              <p className="text-gray-600">Pay securely online with multiple payment options available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-emerald-50 mb-8 max-w-2xl mx-auto">
              Join Xerox Karao today and experience hassle-free document printing services. Whether you're a user
              looking for convenient printing or a shop owner wanting to expand your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/user/login"
                className="bg-white text-emerald-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                User
              </Link>
              <Link
                href="/admin/login"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Shop Owner
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
                <Printer className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Xerox Karao</span>
            </div>
            <div className="text-sm">&copy; {new Date().getFullYear()} Xerox Karao. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
