import { Tab } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faAdd, faList } from '@fortawesome/free-solid-svg-icons';
import { AddNewsTab } from './AddNewsTab';
import { CreateEditorTab } from './CreateEditorTab';
import { EditNewsTab } from './EditNewsTab';
import { ManageCategoriesTab } from './ManageCategoriesTab';

export const MainDashboardTabView = () => {
  const tabs = [
    {
      id: 'editNews',
      name: 'Edit News',
      icon: <FontAwesomeIcon className="px-2" icon={faEdit} />,
      content: <EditNewsTab />,
    },
    {
      id: 'addNews',
      name: 'Add News',
      icon: <FontAwesomeIcon className="px-2" icon={faAdd} />,
      content: <AddNewsTab />,
    },
    {
      id: 'createEditor',
      name: 'Create Editor',
      icon: <FontAwesomeIcon className="px-2" icon={faUser} />,
      content: <CreateEditorTab />,
    },
    {
      id: 'manageCategories',
      name: 'Manage Categories',
      icon: <FontAwesomeIcon className="px-2" icon={faList} />,
      content: <ManageCategoriesTab />,
    },
  ];

  return (
    <div className="w-full p-10 h-full bg-onyx-black ">
      <Tab.Group>
        <Tab.List className="flex w-1/2 space-x-1 rounded-xl bg-blue-900/20 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                `w-full  rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700       ${
                  selected ? 'bg-gray-300 shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                }`
              }
            >
              {tab.icon}
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2     ">
          {tabs.map((tab) => (
            <Tab.Panel
              key={tab.id}
              className="rounded-xl bg-gray-800 p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none"
            >
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
