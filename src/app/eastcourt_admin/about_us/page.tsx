

export default function Page(){
    return(
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-white py-16 px-6 text-center shadow-sm">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About <span className="text-blue-600">Eastcourt</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600">
          At Eastcourt, we make property advertising safe, simple, and effective.
          We connect property owners, agents, and seekers through a trusted and transparent platform.
        </p>
      </section>

      {/* Who We Are */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">Who We Are</h2>
        <p className="text-gray-700 leading-relaxed">
          Eastcourt is a modern property marketplace designed to make real estate
          transactions secure and straightforward. We help property owners and
          agents showcase their listings while ensuring every property is verified
          before going live. This way, buyers and renters can browse with
          confidence, knowing that all listings on Eastcourt are genuine and
          trustworthy.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-blue-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Our mission is to connect people with trusted properties through a
            platform that prioritizes safety, simplicity, and efficiency. Whether
            you’re selling, renting, or searching for your next home, Eastcourt
            ensures the process is smooth, transparent, and stress-free.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">What We Do</h2>
        <ul className="space-y-4 text-gray-700">
          <li>
            <span className="font-semibold text-blue-600">✔ Verified Listings:</span>{" "}
            Every property goes through a verification process before it’s published.
          </li>
          <li>
            <span className="font-semibold text-blue-600">✔ Safe & Secure Platform:</span>{" "}
            We ensure all communications and listings are monitored for authenticity.
          </li>
          <li>
            <span className="font-semibold text-blue-600">✔ Easy to Use:</span>{" "}
            Our user-friendly design makes browsing and listing properties effortless.
          </li>
          <li>
            <span className="font-semibold text-blue-600">✔ Support for Agents & Owners:</span>{" "}
            We provide tools and insights that help property owners and agents
            showcase their properties effectively.
          </li>
        </ul>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">Why Choose Eastcourt</h2>
          <p className="text-gray-700 leading-relaxed">
            Choosing Eastcourt means choosing trust, convenience, and reliability.
            We go beyond simple listings — we build connections based on confidence
            and genuine value, empowering users to make informed real estate decisions.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed">
          Our vision is to become the most trusted property marketplace where
          people can confidently buy, rent, and sell properties across regions —
          knowing that every transaction begins with authenticity and ends with satisfaction.
        </p>
      </section>

      {/* Join Section */}
      <section className="bg-blue-600 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
        <p className="max-w-2xl mx-auto mb-6 leading-relaxed">
          Whether you’re a homeowner, agent, or buyer, Eastcourt is here to guide
          you every step of the way. Explore verified listings, connect with trusted
          sellers and buyers, and experience real estate the way it should be —
          secure, simple, and effective.
        </p>
        <a
          href="/contact"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
        >
          Contact Us
        </a>
      </section>

      {/* Contact Info */}
      <footer className="py-10 bg-gray-900 text-gray-300 text-center">
        <p>📧 Email: <a href="mailto:support@eastcourt.com" className="text-blue-400 hover:underline">support@eastcourt.com</a></p>
        <p>📞 Phone: <span className="text-blue-400">+234 000 000 0000</span></p>
        <p>📍 Address: <span className="text-blue-400">[Insert Company Address]</span></p>
        <p className="text-sm text-gray-500 mt-4">© {new Date().getFullYear()} Eastcourt. All rights reserved.</p>
      </footer>
    </div>

    )
}