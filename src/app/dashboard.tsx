"use client"

import { useContext, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"

import ThemeModeProvider  from "@/src/components/theme-provider"

import { HomePage } from "./home-page"
import { MyListings } from "./my-listings"
import { PostProperty } from "./post-property"
import { Messages } from "./messages"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import Browse_Properties from "./browse-properties"
import { ActiveTab_Context } from "../components/activeTab-provider"
import LoginPage from "./signin"
import { AuthState_Context } from "../lib/auth_state"

import PropertyDetailsPage from "./property-details-page"


export default function Dashboard() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

  const {activeTab, setActiveTab} = useContext(ActiveTab_Context);

  //user
  const {user, loading} = useContext(AuthState_Context);
  
  console.log(theme)
  return (
      <div className="flex min-h-screen flex-col">
        {/* Top Navigation Bar */}




        {/* Main Content */}
        <main className="flex-1 w-full">
          {activeTab === "home" && <HomePage />}
          <div className=' lg:w-[1200px] max-w-[1200px] container'>
          {activeTab === "mylistings" && <MyListings />}
          {activeTab === "post" && <PostProperty />}
          {activeTab === "signin" && <LoginPage />}
          {activeTab === "browse" && <Browse_Properties />}
          {activeTab === "property_details_page" && <PropertyDetailsPage/>}</div>


        </main>

        
      </div>
  )
}
