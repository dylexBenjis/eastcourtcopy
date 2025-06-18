"use client"

import { useContext } from "react"
import { AuthState_Context } from "../../lib/auth_state"
import { MyListings } from "../my-listings"
import LoginPage from "../signin"

export default function Page() {
  const {user, loading} = useContext(AuthState_Context)


    if(!user){
        return (loading?(<div className=" flex justify-center w-screen">loading...</div>):<div className=" flex justify-center w-screen"><LoginPage/></div>)
    }

  return (loading?(<div className=" flex justify-center w-screen">loading...</div>):(<div className=" flex justify-center w-screen"><LoginPage/></div>))
}
