import Link from "next/link";
import { RecentListings } from "./recent-listings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EASTCOURT",
  description:
    "Welcome to Eastcourt, where you can submit and find a property suited for you.",
  icons: "EAST-COURT-LOGO-2.png",
};

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
        <div className="flex flex-col gap-10 lg:w-[1200px] max-w-[1200px]">
          <div className="flex flex-row my-5">
            <div className=" w-[calc(100%/2)]">picture</div>
            <div className="flex flex-col gap-3 w-[calc(100%/2)]">
              <h1 className="text-3xl font-semibold tracking-wider">
                Who We Are.
              </h1>
              <p className="text-wrap">
                At Eastcourt, we make property advertising safe, simple, and
                effective.
                <br />
                <br />
                We help property owners and agents showcase their listings while
                ensuring every Property is verified before going live. Buyers
                and Renters can browse with confidence, knowing that all
                listings are genuine and verified.
                <br />
                <br />
                Our mission is to connect people with trusted properties through
                a platform like ours. Whether you are selling, renting or
                searching for your next property, Eastcourt is here to make the
                process smooth and secure.
              </p>
              <Link
                className="bg-orange-950 py-2 px-3 text-white rounded-md w-fit hover:bg-orange-800"
                href="/about_us"
              >
                Know More
              </Link>
            </div>
          </div>
          <h2 className="mb-6 text-2xl font-bold">
            Recently Listed Properties
          </h2>
          <RecentListings />
        </div>
      </div>
    </div>
  );
}
