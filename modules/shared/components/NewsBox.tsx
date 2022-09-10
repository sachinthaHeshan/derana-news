import { NewsCard } from './NewsCard';

const newsList = [
  {
    id: 1,
    headLine: 'Apple reveals iPhone 14 Pro and Watch Ultra',
    content:
      'Apple has unveiled the iPhone 14, with emergency satellite connectivity and car crash detection technology, at a launch event in the US.\nThe company revealed four versions of the new handset at its Cupertino headquarters, with an audience attending in person for the first time since the pandemic. It also showed off a new extreme sports wearable - the Watch Ultra. The event focused on next generation iPhone, Watch and AirPod products.\n',
  },
  {
    id: 2,
    headLine: 'Apple reveals iPhone 14 Pro and Watch Ultra',
    content:
      'Apple has unveiled the iPhone 14, with emergency satellite connectivity and car crash detection technology, at a launch event in the US.\nThe company revealed four versions of the new handset at its Cupertino headquarters, with an audience attending in person for the first time since the pandemic. It also showed off a new extreme sports wearable - the Watch Ultra. The event focused on next generation iPhone, Watch and AirPod products.\n',
  },
  {
    id: 3,
    headLine: 'Apple reveals iPhone 14 Pro and Watch Ultra',
    content:
      'Apple has unveiled the iPhone 14, with emergency satellite connectivity and car crash detection technology, at a launch event in the US.\nThe company revealed four versions of the new handset at its Cupertino headquarters, with an audience attending in person for the first time since the pandemic. It also showed off a new extreme sports wearable - the Watch Ultra. The event focused on next generation iPhone, Watch and AirPod products.\n',
  },
  {
    id: 4,
    headLine: 'Apple reveals iPhone 14 Pro and Watch Ultra',
    content:
      'Apple has unveiled the iPhone 14, with emergency satellite connectivity and car crash detection technology, at a launch event in the US.\nThe company revealed four versions of the new handset at its Cupertino headquarters, with an audience attending in person for the first time since the pandemic. It also showed off a new extreme sports wearable - the Watch Ultra. The event focused on next generation iPhone, Watch and AirPod products.\n',
  },
];

interface NewsBoxProps {
  title: string;
  fullSize?: boolean;
}
export const NewsBox = ({ title, fullSize }: NewsBoxProps) => (
  <div className="text-white bg-smoky-black w-full rounded-md p-6">
    <h2 className="text-2xl font-bold text-white pb-1">{title}</h2>
    <hr className="border border-lava-red w-3/5" />

    <div
      className={`grid xl:grid-cols-${fullSize ? '3' : '1'} lg:grid-cols-${
        fullSize ? '2' : '1'
      } grid-cols-1 gap-6 mt-6`}
    >
      {newsList?.map((news) => (
        <NewsCard key={news.id} headLine={news?.headLine} content={news?.content} />
      ))}
    </div>
  </div>
);
