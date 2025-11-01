'use client'
import type { Metadata } from "next"
import Link from "next/link"
import { AuthForm } from "../components/auth-form"
import { useContext } from "react"
import { ActiveTab_Context } from "../components/activeTab-provider"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
    const {setActiveTab}= useContext(ActiveTab_Context);



  return (
    <div className="flex max-h-screen items-center justify-center px-4 py-[50%] lg:py-[12.5%] sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Login to your account</h1>

        </div>
        <AuthForm type="login" />
        {/* {user&&<div>Location</div>} */}
      </div>
    </div>
  )
}
