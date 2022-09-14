import { Popover } from '@headlessui/react';
import { signOut } from 'firebase/auth';
import toast from 'react-hot-toast';
import { auth } from '../utils/firebase';

interface UserProfilePopUpProps {
  children: JSX.Element;
}

export const UserProfilePopUp = ({ children }: UserProfilePopUpProps) => (
  <Popover className="relative">
    <Popover.Button className="outline-none">{children}</Popover.Button>

    <Popover.Panel className="absolute z-50 w-60 right-0">
      <div className="flex flex-col justify-center   bg-black border border-gray-900 rounded-md text-white">
        <img
          className="w-28 max-w-3xl self-center h-28 border p-1 object-cover rounded-full"
          alt="sass"
          src="/images/sachintha.jpeg"
        />
        <button type="button" className="hover:bg-gray-900 active:bg-gray-800 m-2 rounded-md  py-2 px-4 text-left">
          My Profile
        </button>
        <button type="button" className="hover:bg-gray-900 active:bg-gray-800 m-2 rounded-md py-2 px-4 text-left">
          History
        </button>
        <button
          onClick={async () => {
            try {
              await signOut(auth);
              toast.success('Logged out successfully!');
            } catch (error) {
              toast.error('Something went wrong.');
            }
          }}
          type="button"
          className="hover:bg-lava-red active:bg-red-700 m-2 rounded-md  py-2 px-4 text-left"
        >
          Log out
        </button>
      </div>
    </Popover.Panel>
  </Popover>
);
