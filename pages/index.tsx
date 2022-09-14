import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NewsBox } from '../modules/shared/components/NewsBox';
import { MainLayout } from '../modules/app/components/MainLayout';

type NewsListType = {
  headline?: string;
  content?: string;
  imageURL?: string;
  writerUID?: string;
  createdAt?: string;
};

const Home: NextPage = () => {
  const [newsList, setNewsList] = useState<NewsListType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/news`)
      .then((response) => {
        setNewsList(response?.data?.news);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      {isLoading ? (
        <div className="flex justify-center items-center bg-onyx-black h-screen ">
          <FontAwesomeIcon size="4x" className="px-2 text-lava-red animate-spin" icon={faSpinner} />
        </div>
      ) : (
        <>
          <div className="relative">
            <img
              src="/images/cricket.webp"
              className="w-full h-screen-7/10 object-cover brightness-50"
              alt="Top News"
            />
            <span className="font-bold text-white absolute bottom-10 text-4xl left-10">
              Sri Lanka clinch thrilling six-wicket win over India
            </span>
          </div>
          <div className="px-8 py-6">
            <NewsBox title="Recent News" fullSize newsList={newsList} />
          </div>
          <div className="grid grid-cols-2 gap-6 px-8">
            <NewsBox title="Tech News" newsList={newsList} />
            <NewsBox title="Sport News" newsList={newsList} />
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Home;
