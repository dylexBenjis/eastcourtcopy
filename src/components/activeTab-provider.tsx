'use client'    
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react"

export const ActiveTab_Context = createContext<{activeTab:string, setActiveTab?:React.Dispatch<React.SetStateAction<string>>,showSuccess?:boolean, setShowSuccess?:React.Dispatch<React.SetStateAction<boolean>>}>({})
const ActiveTab_Provider = ({children}:any) => {

  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('loading');

  const param = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const page = param.get("page")
  useEffect(()=>{
    if(page=='post_property'){
      setActiveTab("post")
      setShowSuccess(prev=>!prev)
    }else{
      setActiveTab('home')
    }

    if(page){
      router.replace(pathname)
    }

  },[])


  return(<ActiveTab_Context.Provider value={{ activeTab, setActiveTab , showSuccess, setShowSuccess}}>
    {children}
  </ActiveTab_Context.Provider>
  )
 
}
export default ActiveTab_Provider;