import Link from "next/link"; // Importing the Next.js Link component for client-side navigation
import Button from "../commons/Button"; // Importing the reusable Button component

// Defining the Header functional component
const Header: React.FC = () => {
  return (
    <header className="h-28 flex items-center bg-[#171D22] px-4 md:px-16 lg:px-44 text-white">
      {/* Main header container with height, flex alignment, background color, and padding */}
      <div className="flex items-center justify-between w-full">
        {/* Flex container to space out elements horizontally */}

        {/* Logo Section */}
        <h2 className="text-xl md:text-4xl font-semibold">
          Cine<span className="text-[#E2D609]">Seek</span>
        </h2>
        {/* Displays the logo with a span for highlighting part of the text */}

        {/* Navigation Section */}
        <nav className="hidden md:flex flex-1 justify-center space-x-8">
          {/* Hidden on small screens, flex container for navigation links */}
          <Link
            href="/"
            className="hover:text-[#E2D609] px-4 md:px-8 text-xl transition-colors duration-300 font-semibold"
          >
            Home
          </Link>
          {/* Link to the Home page with hover styling and padding */}

          <Link
            href="/movies"
            className="hover:text-[#E2D609] px-4 md:px-8 text-xl transition-colors duration-300 font-semibold"
          >
            Movies
          </Link>
          {/* Link to the Movies page */}

          <Link
            href="/contact"
            className="hover:text-[#E2D609] px-4 md:px-8 text-xl transition-colors duration-300 font-semibold"
          >
            Contact
          </Link>
          {/* Link to the Contact page */}
        </nav>

        {/* Button for small screens */}
        <div className="flex md:hidden">
          {/* Displayed only on small screens (hidden on medium and larger screens) */}
          <Button title="Sign in" />
        </div>

        {/* Button for medium and larger screens */}
        <div className="hidden md:flex">
          {/* Hidden on small screens, displayed on medium and larger screens */}
          <Button title="Sign in" />
        </div>
      </div>
    </header>
  );
};

export default Header; // Exporting the Header component as the default export
