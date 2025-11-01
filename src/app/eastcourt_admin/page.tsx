"use client";

import { useContext } from "react";
import Link from "next/link";
import { RecentListings } from "./recent-listings";

export default function Page() {
  return (
    <div className=" flex flex-col justify-center w-screen">
      <div className="relative h-[calc(100vh/1.5)] bg-[url(/p3.webp)] bg-center bg-no-repeat bg-cover w-screen flex justify-center items-center overflow-hidden">
        <div className="absolute inset-0 max-w-full bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex flex-col gap-5 max-w-[320px] md:max-w-[720px] text-center text-white ">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to Eastcourt,
            <br /> where you can submit and find a property suited for you.
          </h1>
          <p className="text-md lg:text-lg">
            <Link
              href="/post_property"
              className="cursor-pointer text-blue-500 hover:text-blue-700 no-underline"
            >
              Click here
            </Link>{" "}
            to submit properties or scroll down to start viewing properties
            close to you.
          </p>
        </div>
      </div>

      <div className="my-6 h-auto w-screen justify-center items-center flex">
        <div className="flex flex-col  lg:w-[1200px] max-w-[1200px]">
          <h2 className="mb-6 text-2xl font-bold">
            Recently Listed Properties
          </h2>
          <RecentListings />
        </div>
      </div>
    </div>
  );
}
