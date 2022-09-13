import type { NextPage } from 'next';
import { NewsBox } from '../modules/shared/components/NewsBox';
import { MainLayout } from '../modules/app/components/MainLayout';

const Tech: NextPage = () => (
  <MainLayout>
    <>
      <div className="relative">
        <img src="/images/cricket.webp" className="w-full h-screen-7/10 object-cover brightness-50" alt="Top News" />
        <span className="font-bold text-white absolute bottom-10 text-4xl left-10">
          Sri Lanka clinch thrilling six-wicket win over India
        </span>
      </div>
      <div className="px-8 py-6">
        <NewsBox title="Tech News" fullSize />
      </div>
    </>
  </MainLayout>
);

export default Tech;
