import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Link from 'next/link';
import { startCase } from 'lodash';
import { CategoryType } from '../Types';

export function CategorySelector() {
  const [categories, setCategories] = useState<CategoryType[]>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const router = useRouter();

  const isCategoryPage = router?.asPath?.startsWith('/category');
  const queryCategory = router?.query?.category;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/news/category`)
      .then((response) => {
        setCategories(response?.data?.categories);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div
      className={`flex items-center justify-center   ${
        isCategoryPage ? 'border-b-4 border-lava-red' : 'border-b-2 border-white border-opacity-20'
      } `}
    >
      <Menu as="div" className="relative ">
        <Menu.Button
          className={`text-lg font-bold py-3 px-6   ${isCategoryPage ? 'text-white ' : 'text-granite-gray'}`}
        >
          Category
          <FontAwesomeIcon className="px-2 " icon={faAngleDown} />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-black border border-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2">
            {isLoading ? (
              <FontAwesomeIcon className="w-full py-4 text-white animate-spin" icon={faSpinner} />
            ) : (
              categories?.map((category) => (
                <Menu.Item key={category?.id}>
                  {() => (
                    <Link href={`/category/${category?.name}`}>
                      <a
                        className={`${
                          queryCategory === category?.name ? 'bg-lava-red text-white bg-opacity-60' : 'text-white'
                        } group border-none my-1 hover:bg-lava-red text-white hover:bg-opacity-20  flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {startCase(category?.name)}
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              ))
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
