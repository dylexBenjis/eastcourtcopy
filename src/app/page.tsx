"use client"

import { useContext } from "react"
import Dashboard from "./dashboard"
import { AuthState_Context } from "../lib/auth_state"

export default function Page() {
  const {loading} = useContext(AuthState_Context)

  if (loading) {
    return <div className="flex justify-center items-center w-screen h-screen"><div className="loader">loading....</div></div>
  }

  return <div className=" flex justify-center w-screen"><div className=""><Dashboard /></div></div>
}
