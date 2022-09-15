import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps {
  name: string;
  path: string;
  exact?: boolean;
}

export const NavLink = ({ name, path, exact }: NavLinkProps) => {
  const router = useRouter();

  const isCurrentLink = exact ? router?.asPath === path : router?.asPath?.startsWith(path);

  return (
    <Link href={path}>
      <a
        className={`text-lg font-bold  py-3 px-6 ${
          isCurrentLink
            ? 'text-white border-b-4 border-lava-red'
            : 'text-granite-gray hover:text-gray-300 hover:border-lava-red hover:border-opacity-80 hover:border-b-4 border-b-2 border-white border-opacity-20'
        }`}
      >
        {name}
      </a>
    </Link>
  );
};
