import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { startCase } from 'lodash';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassEmpty } from '@fortawesome/free-regular-svg-icons';
import { NewsBox } from '../../modules/news/components/NewsBox';
import { MainLayout } from '../../modules/app/components/MainLayout';
import { NewsType } from '../../modules/shared/Types';

const Category: NextPage = () => {
  const router = useRouter();
  const category = String(router?.query?.category);
  const [topNews, setTopNews] = useState<NewsType>({});

  return (
    <MainLayout>
      <>
        <div className="relative">
          {topNews ? (
            <>
              <img src={topNews?.imageURL} className="w-full h-screen-7/10 object-cover brightness-50" alt="Top News" />
              <span className="font-bold text-white absolute bottom-10 text-4xl left-10">{topNews?.headline}</span>
            </>
          ) : (
            <div className="flex flex justify-center items-center w-full h-screen   ">
              <FontAwesomeIcon size="5x" className="text-white  " icon={faHourglassEmpty} />
              <span className="text-white text-4xl font-bold m-2">Empty</span>
            </div>
          )}
        </div>
        <div className="px-8 py-6">
          <NewsBox title={`${startCase(category)} News`} fullSize category={category} setTopNews={setTopNews} />
        </div>
      </>
    </MainLayout>
  );
};

export default Category;
