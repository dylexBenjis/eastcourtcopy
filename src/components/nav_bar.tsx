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
import { usePathname, useRouter } from "next/navigation";

const NavBar = () => {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();

  console.log(theme, systemTheme, resolvedTheme, "navbar theme");

  //user
  const { user, loading } = useContext(AuthState_Context);

  //router useRouter();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="sticky top-0 flex justify-center w-screen bg-background z-[1000]">
      <div className="container lg:max-w-[1200px]">
        <header className=" z-50 border-b bg-background">
          <div className="container flex h-16 items-center justify-between px-4 md:px-1">
            <div className="flex items-center gap-4 md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                {!pathname.includes("/eastcourt_admin") ? (
                  <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                    <nav className="flex flex-col gap-4 py-4">
                      {[
                        {
                          name: "Home",
                          icon: <Home className="mr-2 h-4 w-4" />,
                          tab: "/",
                        },
                        {
                          name: "Browse Listings",
                          icon: <Search className="mr-2 h-4 w-4" />,
                          tab: "/properties",
                        },
                        // { name: "My Listings", icon: <User className="mr-2 h-4 w-4" />, tab: "mylistings" },
                        {
                          name: "Post Property",
                          icon: <Plus className="mr-2 h-4 w-4" />,
                          tab: "/post_property",
                        },
                        {
                          name: "About Us",
                          icon: <Mail className="mr-2 h-4 w-4" />,
                          tab: "/about_us",
                        },
                      ].map((item) => (
                        <Button
                          key={item.name}
                          variant={
                            pathname === item.tab ? "secondary" : "ghost"
                          }
                          className="justify-start"
                          onClick={() => {
                            router.push(item.tab);
                            toast({
                              title: `${item.name} clicked`,
                            });
                          }}
                        >
                          {item.icon}
                          {item.name}
                        </Button>
                      ))}
                    </nav>
                  </SheetContent>
                ) : (
                  <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                    <nav className="flex flex-col gap-4 py-4">
                      {[
                        {
                          name: "Home",
                          icon: <Home className="mr-2 h-4 w-4" />,
                          tab: "/",
                        },
                        {
                          name: "Browse Listings",
                          icon: <Search className="mr-2 h-4 w-4" />,
                          tab: "properties",
                        },
                        {
                          name: "My Listings",
                          icon: <User className="mr-2 h-4 w-4" />,
                          tab: "mylistings",
                        },
                        {
                          name: "Post Property",
                          icon: <Plus className="mr-2 h-4 w-4" />,
                          tab: "post",
                        },
                        {
                          name: "About Us",
                          icon: <Mail className="mr-2 h-4 w-4" />,
                          tab: "/about_us",
                        },
                      ].map((item) => (
                        <Button
                          key={item.name}
                          variant={
                            pathname === item.tab ? "secondary" : "ghost"
                          }
                          className="justify-start"
                          onClick={() => {
                            router.push(item.tab);
                            toast({
                              title: `${item.name} clicked`,
                            });
                          }}
                        >
                          {item.icon}
                          {item.name}
                        </Button>
                      ))}
                    </nav>
                  </SheetContent>
                )}
              </Sheet>
            </div>
            <Button
              variant="logo"
              onClick={() => {
                router.push("/");
              }}
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
            </Button>
            {!pathname.includes("/eastcourt_admin") ? (
              <nav className="hidden md:flex md:items-center md:gap-5 md:text-sm">
                {[
                  { name: "Home", tab: "/" },
                  { name: "Browse Listings", tab: "/properties" },
                  // { name: "My Listings", tab: "mylistings" },
                  { name: "Post Property", tab: "/post_property" },
                  { name: "About Us", tab: "/about_us" },
                ].map((item) => (
                  <Button
                    key={item.name}
                    variant={pathname === item.tab ? "secondary" : "ghost"}
                    onClick={() => {
                      router.push(item.tab);
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </nav>
            ) : (
              <nav className="hidden md:flex md:items-center md:gap-5 md:text-sm">
                {[
                  { name: "Home", tab: "/" },
                  { name: "Browse Listings", tab: "properties" },
                  { name: "Post Property", tab: "post_property" },
                  { name: "My Listings", tab: "mylistings" },
                  { name: "About Us", tab: "about_us" },
                ].map((item) => (
                  <Button
                    key={item.name}
                    variant={pathname === item.tab ? "secondary" : "ghost"}
                    onClick={() => {
                      router.push(`/eastcourt_admin/${item.tab}`);
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </nav>
            )}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                  console.log("clicked ", theme, systemTheme, resolvedTheme);
                }}
                aria-label="Toggle theme"
                className="flex justify-center items-center"
              >
                {theme === "system" && systemTheme === "dark" && (
                  <Sun className="h-5 w-5" />
                )}
                {theme === "system" && systemTheme === "light" && (
                  <Moon className="h-5 w-5" />
                )}
                {theme === "dark" && <Sun className="h-5 w-5" />}
                {theme === "light" && <Moon className="h-5 w-5" />}
              </Button>
              {/* <Button className="flex justify-center items-center" variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>  */}
              {/* <DropdownMenu>
      <DropdownMenuTrigger asChild >
        <Button variant="outline" size="icon" className="flex justify-center items-center rounded-full" aria-label="Profile">
          {user?.photoURL?<div className="flex relative h-[100%] w-[100%]" ><Image src={user.photoURL} alt='user_profile picture' fill className="rounded-full"/></div>:<User className="h-5 w-5" />}
          <span className="sr-only">profile</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          {user&&<span>{user.displayName}</span>}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/about">Location</Link>
        </DropdownMenuItem>
         <DropdownMenuItem asChild>
          <Link href="/publications">Publications</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='cursor-pointer'>
          {user?<span onClick={()=>{
            signOut(auth).then(() => {
              toast({title:'Logged out successfully'});
              router.push(`/`);
            if(setActiveTab){setActiveTab('signin')}})}}>Log out <LogOut/></span>:<span onClick={()=>{
              if(setActiveTab){setActiveTab('signin')}}}>Log in <LogIn/></span>}
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
         */}
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default NavBar;
