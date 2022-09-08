import Link from 'next/link';

export const Navbar = () => (
  <nav className="w-full bg-gray-900 flex justify-between items-center p-4">
    <div className="flex justify-between items-end">
      <img src="/images/derana-logo.png" alt="Derana logo" className="w-16" />
      <div>
        <span className="text-white font-bold text-4xl font-sans">ADA</span>
        <span className="text-red-600 font-bold text-4xl">Derana</span>
      </div>
    </div>

    <div className="flex">
      <Link href="/">
        <a className="text-gray-600 text-xl font-semibold  p-2">Sport</a>
      </Link>
      <Link href="/">
        <a className="text-gray-50 text-xl font-semibold p-2">Tech</a>
      </Link>
      <Link href="/">
        <a className="text-gray-600 text-xl font-semibold p-2">Travel</a>
      </Link>
      <Link href="/">
        <a className="text-gray-600 text-xl font-semibold p-2">WorkLife</a>
      </Link>
      <Link href="/">
        <a className="text-gray-600 text-xl font-semibold p-2">Gallery</a>
      </Link>
    </div>

    <div className="flex justify-center items-center  ">
      <img
        src="/images/user-avatar.png"
        alt="User Avatar"
        className="w-11 m-2 p-0.5 border-2 border-sky-800 rounded-full"
      />
      <button type="button" className="text-white bg-gray-800 hover:bg-gray-600 p-2 rounded-md border border-gray-700">
        Sign In
      </button>
    </div>
  </nav>
);
