import Link from 'next/link';
import { NavLink } from './NavLink';
import { CategorySelector } from '../../shared/components/CategorySelector';
import { UserProfilePopUp } from '../../shared/components/UserProfilePopUp';

export const Navbar = () => (
  <nav className="fixed z-50 w-full  bg-black opacity-90  flex justify-between items-center p-4">
    <Link href="/">
      <a>
        <div className="flex justify-between items-center">
          <img src="/images/derana-logo.png" alt="Derana logo" className="w-16" />
          <div className="flex flex-col">
            <span className="text-white font-bold text-3xl font-sans block leading-9">ADA</span>
            <span className="text-lava-red font-bold text-3xl leading-6">Derana</span>
          </div>
        </div>
      </a>
    </Link>

    <div>
      <div className="flex">
        <NavLink name="Home" path="/" exact />
        <NavLink name="Sport" path="/sport" />
        <NavLink name="Tech" path="/tech" />
        <NavLink name="Gallery" path="/gallery" />
        <CategorySelector />
      </div>
    </div>

    <UserProfilePopUp>
      <div className="flex justify-center items-center  ">
        <img
          src="/images/sachintha.jpeg"
          alt="User Avatar"
          className="w-11 h-11 object-cover m-2 p-0.5 border-2 border-granite-gray rounded-full"
        />
      </div>
    </UserProfilePopUp>
  </nav>
);
