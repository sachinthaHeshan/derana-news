import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NewsCard } from './NewsCard';
import { NewsType } from '../../shared/Types';

interface NewsBoxProps {
  title: string;
  category?: string;
  fullSize?: boolean;
  setTopNews?: Dispatch<SetStateAction<NewsType>>;
}
export const NewsBox = ({ title, fullSize, category, setTopNews }: NewsBoxProps) => {
  const [newsList, setNewsList] = useState<NewsType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/news`, { params: { category } })
      .then((response) => {
        setNewsList(response?.data?.news);
        if (setTopNews) {
          setTopNews(response?.data?.news?.[0]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category, setTopNews]);

  return (
    <div className="text-white bg-smoky-black w-full rounded-md p-6">
      <h2 className="text-2xl font-bold text-white pb-1">{title}</h2>
      <hr className="border border-lava-red w-3/5" />
      {isLoading ? (
        <div className="flex justify-center items-center bg-onyx-black h-20 ">
          <FontAwesomeIcon size="4x" className="px-2 text-lava-red animate-spin" icon={faSpinner} />
        </div>
      ) : (
        <div className={`grid ${fullSize ? 'xl:grid-cols-3 lg:grid-cols-2 grid-cols-1' : 'grid-cols-1'} gap-6 mt-3`}>
          {newsList?.map((news) => (
            <NewsCard
              key={news.id}
              headline={news?.headline}
              content={news?.content}
              createdAt={news?.createdAt}
              imageURL={news?.imageURL}
            />
          ))}
        </div>
      )}
    </div>
  );
};
