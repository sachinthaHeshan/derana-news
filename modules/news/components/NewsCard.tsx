import moment from 'moment';
import { MouseEventHandler } from 'react';

interface NewsCardProps {
  headline?: string;
  content?: string;
  imageURL?: string;
  createdAt?: string;
  onClick?: MouseEventHandler<any> | undefined;
}
export const NewsCard = ({ headline, content, createdAt, imageURL, onClick }: NewsCardProps) => (
  <button type="button" onClick={onClick} className="flex flex-col">
    <h3 className="font-bold font-xl text-white py-4 text-left">{headline}</h3>
    <div className="flex bg-onyx-black h-64 drop-shadow-bright border-2 border-white-alpha-2 rounded-md hover:scale-101">
      <img
        src={imageURL || '/images/empty-image.png'}
        alt="Derana logo"
        className="w-2/5 h-full object-cover rounded-l-md"
      />
      <div className="flex flex-col px-4 pt-4 pb-2.5 justify-between w-full">
        <p className="text-xs font-semibold overflow-hidden text-gray-400 text-left">{content}</p>
        <span className="self-end text-xs text-deep-sky-blue font-bold italic">{moment(createdAt).fromNow()}</span>
      </div>
    </div>
  </button>
);
