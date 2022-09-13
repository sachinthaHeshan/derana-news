import type { NextPage } from 'next';
import { NewsBox } from '../modules/shared/components/NewsBox';
import { MainLayout } from '../modules/app/components/MainLayout';

const Home: NextPage = () => (
  <MainLayout>
    <>
      <div className="relative">
        <img src="/images/cricket.webp" className="w-full h-screen-7/10 object-cover brightness-50" alt="Top News" />
        <span className="font-bold text-white absolute bottom-10 text-4xl left-10">
          Sri Lanka clinch thrilling six-wicket win over India
        </span>
      </div>
      <div className="px-8 py-6">
        <NewsBox title="Recent News" fullSize />
      </div>
      <div className="grid grid-cols-2 gap-6 px-8">
        <NewsBox title="Tech News" />
        <NewsBox title="Sport News" />
      </div>
    </>
  </MainLayout>
);

export default Home;
