'use client'
import { useContext, useState } from "react"

import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet"
import { Button } from "@/src/components/ui/button"
import { Bell, Heart, Home, LogIn, LogOut, Mail, Menu, Moon, Plus, Search, Sun, User } from "lucide-react"

import { signOut } from "firebase/auth"
import { auth } from "../lib/firebase"
import { Alert } from "../components/ui/alert"
import Image from "next/image"
import { toast } from "../hooks/use-toast"


import { ActiveTab_Context } from "../components/activeTab-provider"
import { AuthState_Context } from "../lib/auth_state"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { useTheme } from "next-themes"


const Footer=()=>{

    const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

    const {activeTab, setActiveTab} = useContext(ActiveTab_Context);
  
    //user
    const {user, loading} = useContext(AuthState_Context);

return(
    <div className=" flex justify-center w-screen"><div className="container lg:max-w-[1200px]">
    {/* Footer */}
    <footer className="border-t bg-background py-6">
          <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:px-6 md:text-left">
            <p className="text-sm text-muted-foreground">© 2025 RealEstate Hub. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
        </footer></div>
    </div>
    
)
}

export default Footer;