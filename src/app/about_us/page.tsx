import { GoalIcon, LightbulbIcon, Target, TargetIcon } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className=" flex flex-col justify-center w-screen ">
      <div className="relative  bg-[url(/about-us1.jpg)] bg-[center_bottom_35%] bg-no-repeat bg-cover w-screen flex justify-center items-center overflow-hidden">
        <div className="absolute inset-0 max-w-full bg-orange-950 bg-opacity-60"></div>
        <div className="z-10 flex gap-5 text-white lg:w-[1200px] max-w-[1200px] container  px-4 md:px-1">
          <h1 className="flex text-4xl md:text-5xl py-5 font-bold">
            About Us.
          </h1>
        </div>
      </div>
      <div className="my-6 h-auto w-screen justify-center items-center flex flex-col">
        <div className="flex flex-col gap-10 lg:w-[1200px] max-w-[1200px] ">
          <section className=" py-16 px-6 text-center shadow-sm">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              At <span className="text-orange-900">Eastcourt</span>,
            </h1>
            <p className="text-lg max-w-2xl mx-auto text-gray-500">
              we make property advertising safe, simple, and effective. We
              connect property owners, agents, and seekers through a trusted and
              transparent platform.
            </p>
          </section>

          {/* Who We Are */}
          <section className="flex flex-col lg:flex-row py-16 px-6 max-w-5xl mx-auto">
            <div className="lg:w-[calc(100%/2)]">picture</div>
            <div className="flex flex-col gap-3 lg:w-[calc(100%/2)]">
              <h2 className="text-3xl font-semibold mb-4 ">Who We Are</h2>
              <p className="leading-relaxed">
                Eastcourt is a modern property marketplace designed to make real
                estate transactions secure and straightforward. We help property
                owners and agents showcase their listings while ensuring every
                property is verified before going live. This way, buyers and
                renters can browse with confidence, knowing that all listings on
                Eastcourt are genuine and trustworthy.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="flex flex-col-reverse lg:flex-row py-16 gap-8 lg:gap-5 px-4 max-w-5xl mx-auto">
            <div className="flex flex-col gap-3 lg:w-[calc(100%/2)]">
              <h2 className="text-3xl font-semibold mb-4 flex items-center">
                <GoalIcon className="mr-2" size={40} /> Our Mission
              </h2>
              <p className=" leading-relaxed">
                Our mission is to connect people with trusted properties through
                a platform that prioritizes safety, simplicity, and efficiency.
                Whether you’re selling, renting, or searching for your next
                home, Eastcourt ensures the process is smooth, transparent, and
                stress-free.
              </p>
              {/* Vision Section */}
              <section className=" max-w-5xl mx-auto">
                <h2 className="text-3xl font-semibold mb-4 flex items-center ">
                  <LightbulbIcon className="mr-2" size={40} />
                  Our Vision
                </h2>
                <p className=" leading-relaxed">
                  Our vision is to become the most trusted property marketplace
                  where people can confidently buy, rent, and sell properties
                  across regions — knowing that every transaction begins with
                  authenticity and ends with satisfaction.
                </p>
              </section>
            </div>

            <div className="flex lg:w-[calc(100%/2)] h-full">
              <Image
                src="/about-us2.jpg"
                alt="About Us 2"
                layout="responsive"
                width={500}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </section>

          {/* Why Choose Us */}
          <section className=" py-16 px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-semibold mb-4 text-center">
                Why Choose Eastcourt
              </h2>
              <p className="text-gray-700 dark:text-gray-400 leading-relaxed text-center">
                Choosing Eastcourt means choosing trust, convenience, and
                reliability. We go beyond simple listings — we build connections
                based on confidence and genuine value, empowering users to make
                informed real estate decisions.
              </p>
            </div>
            {/* What We Do */}
            <section className="py-6 px-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-6 ">What We Do</h2>
              <ul className="space-y-4 ">
                <li>
                  <span className="font-semibold text-orange-900 dark:text-orange-700">
                    ✔ Verified Listings:
                  </span>{" "}
                  Every property goes through a verification process before it’s
                  published.
                </li>
                <li>
                  <span className="font-semibold text-orange-900 dark:text-orange-700">
                    ✔ Safe & Secure Platform:
                  </span>{" "}
                  We ensure all communications and listings are monitored for
                  authenticity.
                </li>
                <li>
                  <span className="font-semibold text-orange-900 dark:text-orange-700">
                    ✔ Easy to Use:
                  </span>{" "}
                  Our user-friendly design makes browsing and listing properties
                  effortless.
                </li>
                <li>
                  <span className="font-semibold text-orange-900 dark:text-orange-700">
                    ✔ Support for Agents & Owners:
                  </span>{" "}
                  We provide tools and insights that help property owners and
                  agents showcase their properties effectively.
                </li>
              </ul>
            </section>
          </section>
        </div>
      </div>

      {/* Join Section */}
      <section className="flex justify-center bg-orange-900 w-screen text-white py-16 mb-10 px-6 ">
        <div className="flex flex-col lg:w-[1200px] max-w-[1200px] text-center justify-center items-center">
          <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
          <p className="max-w-2xl mx-auto mb-6 leading-relaxed">
            Whether you’re a homeowner, agent, or buyer, Eastcourt is here to
            guide you every step of the way. Explore verified listings, connect
            with trusted sellers and buyers, and experience real estate the way
            it should be — secure, simple, and effective.
          </p>
          <a
            href="/contact"
            className=" w-fit bg-white text-gray-900 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
