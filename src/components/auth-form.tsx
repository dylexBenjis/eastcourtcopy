"use client"

import { useContext, useState } from "react"
// import { signIn } from "next-auth/react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Loader, LoaderCircle } from "lucide-react"
import Image from "next/image"
import { auth, google_auth_provider } from "../lib/firebase"
import { signInWithPopup } from "firebase/auth"
import { Create_user_in_db } from "../lib/user"
import { ActiveTab_Context } from "./activeTab-provider"

interface AuthFormProps {
  type: "login" | "signup"
}



export function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { setActiveTab, showSuccess, setShowSuccess } = useContext(ActiveTab_Context)
  

  async function handleGoogleSignIn() {
    setIsLoading(true)
    try {
      const result = await signInWithPopup(auth, google_auth_provider);
      const user = result.user;
      await Create_user_in_db({ userID: user.uid, userName: user.displayName, userImageUrl: user.photoURL, location: "", properties: [], favourites: [] })
      .then(() => {
        if(setActiveTab) setActiveTab("home")})
    } catch (error) {
      console.error("Authentication error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === "login" ? "Sign in" : "Sign Up"}</CardTitle>
        <CardDescription>
          {type === "login" ? "Sign in to your account using Google" : "Create a new account using Google"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button variant="outline" onClick={handleGoogleSignIn} disabled={isLoading} className="w-full">
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="relative mr-2 h-4 w-4" ><Image src='/google.svg' alt='google logo' fill={true}/></div>
            )}
            {type === "login" ? "Sign in with Google" : "Sign up with Google"}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  )
}
