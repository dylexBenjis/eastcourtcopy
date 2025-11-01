"use client";
import { useContext, useState } from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import {
  Bell,
  Heart,
  Home,
  LogIn,
  LogOut,
  Mail,
  Menu,
  Moon,
  Plus,
  Search,
  Sun,
  User,
} from "lucide-react";

import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Alert } from "../components/ui/alert";
import Image from "next/image";
import { toast } from "../hooks/use-toast";

import { ActiveTab_Context } from "../components/activeTab-provider";
import { AuthState_Context } from "../lib/auth_state";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { usePathname } from "next/navigation";

const Footer = () => {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

  const { activeTab, setActiveTab } = useContext(ActiveTab_Context);

  //user
  const { user, loading } = useContext(AuthState_Context);

  //pathname
  const pathname = usePathname();

  return (
    <div className=" flex justify-center w-screen">
      <div className="container lg:max-w-[1200px]">
        {/* Footer */}
        <footer className="border-t bg-background py-6">
          <div className="container flex flex-col-reverse justify-between lg:gap-4 gap-8 text-center md:flex-row md:text-left">
            <div className="flex flex-col gap-4 justify-between">
              <div
                onClick={() => {
                  if (setActiveTab) {
                    setActiveTab("home");
                  }
                }}
                className="flex justify-center lg:justify-start cursor-pointer"
              >
                <Image
                  src="/EAST-COURT-LOGO-2.png"
                  alt=""
                  height={50}
                  width={50}
                />
                <div className="h-[40px] w-[140px] relative ">
                  <Image src="/EAST-COURT-LOGO-1.png" alt="" fill />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                © 2025 EASTCOURT. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-lg font-semibold">Quick sitemap</h1>
              {!(pathname === "/eastcourt_admin") ? (
                <div className="flex flex-col gap-2">
                  {[
                    { name: "Home", tab: "home" },
                    // { name: "Browse Listings", tab: "browse" },
                    // { name: "My Listings", tab: "mylistings" },
                    { name: "Post Property", tab: "post" },
                    // { name: "Messages", tab: "messages" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      onClick={() => {
                        if (setActiveTab) {
                          setActiveTab(item.tab);
                        }
                      }}
                      className="text-sm text-muted-foreground hover:underline cursor-pointer"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {[
                    { name: "Home", tab: "home" },
                    // { name: "Browse Listings", tab: "browse" },
                    { name: "Post Property", tab: "post" },
                    { name: "My Listings", tab: "mylistings" },

                    // { name: "Messages", tab: "messages" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      onClick={() => {
                        if (setActiveTab) {
                          setActiveTab(item.tab);
                        }
                      }}
                      className="text-sm text-muted-foreground hover:underline cursor-pointer"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-lg font-semibold">Link</h1>
              <div className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="flex flex-col max-[760px]:justify-center max-[760px]:items-center  gap-4 lg:w-[calc(100%/3.5)]">
              <h1 className="text-lg font-semibold">Contact Us</h1>
              <div className="flex flex-col gap-2 text-start ">
                <Label>Email-address</Label>
                <Input type="email" className="shadow-sm"></Input>
              </div>
              <div className="flex flex-col gap-2 text-start">
                <Label>message</Label>
                <Textarea className="shadow-md"></Textarea>
              </div>
              <Button type="submit" className="w-fit">
                {false ? "Submitting" : "Submit"}
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
