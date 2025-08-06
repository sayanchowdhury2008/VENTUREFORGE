import type { Metadata } from "next"
import { Courier_Prime } from 'next/font/google'
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"

const courierPrime = Courier_Prime({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier-prime"
})

export const metadata: Metadata = {
  title: "VentureForge - AI-Powered Startup Validation",
  description: "Validate your startup ideas with AI-powered market research and success probability scoring.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${courierPrime.variable} font-mono`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
