import { NewsCard } from './NewsCard';
import { NewsType } from '../Types';

interface NewsBoxProps {
  title: string;
  fullSize?: boolean;
  newsList?: NewsType[];
}
export const NewsBox = ({ title, fullSize, newsList }: NewsBoxProps) => (
  <div className="text-white bg-smoky-black w-full rounded-md p-6">
    <h2 className="text-2xl font-bold text-white pb-1">{title}</h2>
    <hr className="border border-lava-red w-3/5" />

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
  </div>
);
