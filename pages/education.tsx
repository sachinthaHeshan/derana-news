import type { NextPage } from 'next';
import { useState } from 'react';
import { NewsBox } from '../modules/news/components/NewsBox';
import { MainLayout } from '../modules/app/components/MainLayout';
import { NewsType } from '../modules/shared/Types';

const Education: NextPage = () => {
  const [topNews, setTopNews] = useState<NewsType>({});

  return (
    <MainLayout>
      <>
        <div className="relative">
          <img src={topNews?.imageURL} className="w-full h-screen-7/10 object-cover brightness-50" alt="Top News" />
          <span className="font-bold text-white absolute bottom-10 text-4xl left-10">{topNews?.headline}</span>
        </div>
        <div className="px-8 py-6">
          <NewsBox title="Education News" category="education" fullSize setTopNews={setTopNews} />
        </div>
      </>
    </MainLayout>
  );
};

export default Education;
