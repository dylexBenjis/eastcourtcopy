'use client'    
import React, { createContext, useContext, useState } from "react"

export const ActiveTab_Context = createContext<{activeTab?:string, setActiveTab?:React.Dispatch<React.SetStateAction<string>>,showSuccess?:boolean, setShowSuccess?:React.Dispatch<React.SetStateAction<boolean>>}>({})
const ActiveTab_Provider = ({children}:any) => {

  const [activeTab, setActiveTab] = useState("home");

  const [showSuccess, setShowSuccess] = useState(false);

  return(<ActiveTab_Context.Provider value={{ activeTab, setActiveTab , showSuccess, setShowSuccess}}>
    {children}
  </ActiveTab_Context.Provider>
  )
 
}
export default ActiveTab_Provider;