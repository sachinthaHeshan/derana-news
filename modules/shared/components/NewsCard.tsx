interface NewsCardProps {
  headLine: string;
  content: string;
  // createdAt: string;
}

export const NewsCard = ({ headLine, content }: NewsCardProps) => (
  <div>
    <h3 className="font-bold font-xl text-white py-4">{headLine}</h3>
    <div className="flex bg-onyx-black h-64 drop-shadow-bright border-2 border-white-alpha-2 rounded-md   hover:scale-101">
      <img src="/images/cricket.webp" alt="Derana logo" className="w-2/5 h-full object-cover rounded-l-md" />
      <div className="flex flex-col px-4 pt-4 pb-1 justify-between">
        <p className="text-xs font-semibold overflow-hidden text-gray-400">{content}</p>
        <span className="self-end text-xs text-deep-sky-blue font-bold italic">1 minute ago</span>
      </div>
    </div>
  </div>
);
