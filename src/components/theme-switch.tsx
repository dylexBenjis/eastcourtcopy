'use client'
import React, { useEffect, useState } from 'react';
import { IoMoon, IoSunny } from 'react-icons/io5';
import { FaComputer } from 'react-icons/fa6';
import { useTheme } from 'next-themes';

const ThemeSwitch = () => {

      //for theme mode dark/light
  const [mounted, setMounted] = useState(false)
    const { theme, setTheme, resolvedTheme, systemTheme } = useTheme();
    
    useEffect(() => {
            setMounted(true);//for theme to check if component is mounted so it can reach useTheme

    }, [])
    console.log(systemTheme, resolvedTheme, mounted)

    if (!mounted) {
        return (
                <div className='flex cursor-pointer backdrop-blur bg-gray-500/30 w-fit gap-x-10 px-4 py-1 items-center justify-center  border-solid border-2 border-gray-500/50 rounded-full z-[10]'>
                   computerrr
                </div>
        )
    } 
    if (theme === 'system') {
        if (systemTheme === 'dark') {
            return (
                <div className='group relative flex cursor-pointer backdrop-blur bg-gray-500/30 w-fit gap-x-10 px-4 py-1 items-center justify-center  border-solid border-2 border-gray-500/50 rounded-full z-[10]' onClick={() => setTheme('light')} >
                    computer
                <div className='hidden xl:group-hover:block absolute bg-gray-600 text-gray-300 py-1 px-4 mt-[0.5rem] top-8 w-max rounded text-sm'>system-theme</div>
                </div>
        )
        }else if (systemTheme === 'light') {
            return (
                <div className='group relative flex cursor-pointer backdrop-blur bg-gray-500/30 w-fit gap-x-10 px-4 py-1 items-center justify-center  border-solid border-2 border-gray-500/50 rounded-full z-[10]' onClick={() => setTheme('light')} >
                    computer
                <div className='hidden xl:group-hover:flex absolute bg-gray-200  py-1 px-4 mt-[0.5rem] rounded top-8 w-max text-sm'>system-theme</div>
                </div>
        ) 
        }
    } 

    if (resolvedTheme === 'light') {
        return (
                <div onClick={() => setTheme('dark')}  className='group relative flex cursor-pointer backdrop-blur bg-gray-500/30 w-auto gap-x-10 px-4 py-1 items-center justify-center  border-solid border-2 border-gray-500/50 rounded-full z-[10]'>
               moon
                <div className='invisible opacity-0 xl:group-hover:opacity-100 xl:group-hover:visible  absolute bg-gray-400/30  py-1 px-4 mt-[0.5rem] rounded top-8 w-max text-sm transition-all duration-[200ms]'>dark-theme</div>
                </div>
        )
    }
    if (resolvedTheme === 'dark') {
        return (
                <div onClick={() => setTheme('light')}  className='group relative flex cursor-pointer backdrop-blur bg-gray-500/30 w-fit gap-x-10 px-4 py-1 items-center justify-center  border-solid border-2 border-gray-500/50 rounded-full z-[10]'>
               sun
                <div className='invisible opacity-0 xl:group-hover:opacity-100 xl:group-hover:visible absolute bg-gray-600 text-gray-300 py-1 px-4 mt-[0.5rem] top-8 w-max rounded text-sm transition-all duration-[200ms]'>light-theme</div>

                </div>
        )
    }    if (resolvedTheme === undefined) {
        return (
                <div onClick={() => setTheme('light')}  className='group relative flex cursor-pointer backdrop-blur bg-gray-500/30 w-fit gap-x-10 px-4 py-1 items-center justify-center  border-solid border-2 border-gray-500/50 rounded-full z-[10]'>
               undefined
                <div className='invisible opacity-0 xl:group-hover:opacity-100 xl:group-hover:visible absolute bg-gray-600 text-gray-300 py-1 px-4 mt-[0.5rem] top-8 w-max rounded text-sm transition-all duration-[200ms]'></div>

                </div>
        )
    }
}

export default ThemeSwitch