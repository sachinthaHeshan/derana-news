import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faAdd, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../../shared/utils/firebase';
import { EditCategoryModal } from './EditCategoryModal';
import { CategoryType } from '../../shared/Types';

export const ManageCategoriesTab = () => {
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [newCategoryValue, setNewCategoryValue] = useState<string>('');
  const [categories, setCategories] = useState<CategoryType[]>();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/news/category`)
      .then((response) => {
        setCategories(response?.data?.categories);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [triggerEffect]);

  const reFetch = () => {
    setTriggerEffect(!triggerEffect);
  };

  const onCreate = async () => {
    try {
      setIsCreateLoading(true);

      const idToken = await auth?.currentUser?.getIdToken(/* forceRefresh */ true);

      if (idToken) {
        await axios
          .post(
            `/api/news/category`,
            { name: newCategoryValue },
            {
              headers: {
                token: idToken,
              },
            },
          )
          .then(() => {
            setNewCategoryValue('');
            reFetch();
          });
        toast.success('Category created successfully!');
      }
    } catch (error: any) {
      // const errorCode = error?.response?.data?.error;

      toast.error('Something went wrong! Please try again.');
    } finally {
      setIsCreateLoading(false);
    }
  };

  return (
    <div className="bg-onyx-black rounded-md p-6">
      <div className="bg-gray-800 p-4 rounded-md w-1/4">
        <h2 className="p-3 text-white text-4xl">Manage Categories</h2>

        {isLoading ? (
          <FontAwesomeIcon size="3x" className="py-32 animate-spin w-full " icon={faSpinner} />
        ) : (
          categories?.map((category) => (
            <div
              className="flex justify-between items-center bg-gray-900 p-2 text-white rounded-md my-2"
              key={category?.id}
            >
              <span>{category?.name}</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(category);
                }}
              >
                <FontAwesomeIcon className="px-2" icon={faEdit} />
              </button>
            </div>
          ))
        )}

        <div className="flex justify-between">
          <input
            type="text"
            className="bg-gray-900 text-white p-2 rounded-md w-2/3 mr-1"
            onChange={(event) => {
              setNewCategoryValue(event?.target?.value);
            }}
            value={newCategoryValue}
          />
          <button
            className="bg-gray-700 rounded-md p-2 w-1/3  text-left"
            type="button"
            onClick={() => {
              onCreate().then();
            }}
          >
            <FontAwesomeIcon className="px-2 text-white" icon={faAdd} />
            <span className="text-white">
              Add
              {isCreateLoading && <FontAwesomeIcon className="px-2 text-white animate-spin" icon={faSpinner} />}
            </span>
          </button>
        </div>
      </div>

      {selectedCategory && (
        <EditCategoryModal
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          reFetch={reFetch}
        />
      )}
    </div>
  );
};
