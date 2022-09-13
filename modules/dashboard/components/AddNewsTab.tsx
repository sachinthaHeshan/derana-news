export const AddNewsTab = () => (
  <div>
    <ul>
      <li className="relative rounded-md p-3 hover:bg-gray-100">
        <h3 className="text-sm font-medium leading-5">title</h3>

        <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
          <li>&middot;</li>
          <li>as comments</li>
          <li>&middot;</li>
          <li>as shares</li>
        </ul>
      </li>
    </ul>
  </div>
);
