import type { NextPage } from 'next';
import { NewsBox } from '../modules/shared/components/NewsBox';

const Home: NextPage = () => (
  <div className=" ">
    <img src="/images/cricket.webp" className="w-full h-screen-7/10 object-cover brightness-50" alt="" />
    <div className="px-8 py-6">
      <NewsBox title="Recent News" fullSize />
    </div>
    <div className="grid grid-cols-2 gap-6 px-8">
      <NewsBox title="Tech News" />
      <NewsBox title="Recent News" />
    </div>
  </div>
);

export default Home;
