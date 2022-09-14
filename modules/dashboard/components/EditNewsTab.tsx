import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faRemove } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import axios from 'axios';
import { auth } from '../../shared/utils/firebase';
import { InputField } from '../../shared/components/InputField';
import { TextAreaField } from '../../shared/components/TextAreaField';
import { NewsCard } from '../../news/components/NewsCard';
import { NewsType } from '../../shared/Types';

interface FormDataType {
  headline?: string;
  content?: string;
  imageURL?: string;
  category?: string;
}

interface OnDeleteArgs {
  id?: string;
}

const editNewsTabSchema = yup
  .object({
    headline: yup.string().required(),
    content: yup.string().required(),
    imageURL: yup.string().required(),
  })
  .required();

export const EditNewsTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newsList, setNewsList] = useState<NewsType[]>([]);
  const [isLoadingNewsList, setIsLoadingNewsList] = useState<boolean>(true);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [selectedNewsID, setSelectedNewsID] = useState<string>();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormDataType>({
    defaultValues: {},
    resolver: yupResolver(editNewsTabSchema),
  });

  useEffect(() => {
    if (!isLoading && !isLoadingDelete) {
      setIsLoadingNewsList(true);
      axios
        .get(`/api/news`)
        .then((response) => {
          setNewsList(response?.data?.news);
        })
        .finally(() => {
          setIsLoadingNewsList(false);
        });
    }
  }, [isLoading, isLoadingDelete]);

  const onDelete = async ({ id }: OnDeleteArgs) => {
    try {
      setIsLoadingDelete(true);

      const idToken = await auth?.currentUser?.getIdToken(/* forceRefresh */ true);

      if (idToken && id) {
        await axios.delete(`/api/news`, {
          headers: {
            token: idToken,
            id,
          },
        });
        toast.success('News deleted successfully!');
      }
    } catch (error: any) {
      // const errorCode = error?.response?.data?.error;

      toast.error('Something went wrong! Please try again.');
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const onSubmit = async ({ headline, content, imageURL, category }: FormDataType) => {
    try {
      setIsLoading(true);

      const idToken = await auth?.currentUser?.getIdToken(/* forceRefresh */ true);

      if (idToken) {
        await axios.patch(
          `/api/news`,
          { id: selectedNewsID, headline, content, imageURL, category },
          {
            headers: {
              token: idToken,
            },
          },
        );
        toast.success('News updated successfully!');
      }
    } catch (error: any) {
      toast.error('Something went wrong! Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center  bg-onyx-black rounded-md">
      <form className="flex flex-col w-80 m-8" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="p-3 text-white text-4xl">Edit News</h1>

        <span className="py-2 w-full text-gray-400">Headline</span>
        <InputField
          disabled={!selectedNewsID}
          errors={errors}
          control={control}
          name="headline"
          placeholder="Headline"
          type="text"
          className=" p-2.5 w-full bg-jungle-gray border border-2 border-black-eel rounded-md outline-none text-white"
        />

        <span className="py-2 w-full text-gray-400">Content</span>
        <TextAreaField
          disabled={!selectedNewsID}
          errors={errors}
          control={control}
          name="content"
          placeholder="type here..."
          className=" p-2.5 w-full bg-jungle-gray border border-2 border-black-eel rounded-md outline-none text-white"
        />

        <span className="py-2 w-full text-gray-400">Category</span>
        <InputField
          disabled={!selectedNewsID}
          errors={errors}
          control={control}
          name="category"
          placeholder="category"
          type="text"
          className=" p-2.5 w-full bg-jungle-gray border border-2 border-black-eel rounded-md outline-none text-white"
        />

        <span className="py-2 w-full text-gray-400">Image URL</span>
        <InputField
          disabled={!selectedNewsID}
          errors={errors}
          control={control}
          name="imageURL"
          placeholder="https://www.example.com/example.jpg"
          type="text"
          className=" p-2.5 w-full bg-jungle-gray border border-2 border-black-eel rounded-md outline-none text-white"
        />

        <button
          disabled={!selectedNewsID}
          type="submit"
          className="mt-6 p-3 w-full bg-baltic-gray border border-2 border-black-eel rounded-md outline-none text-white font-bold opacity-90 active:opacity-80 hover:opacity-100 disabled:opacity-20"
        >
          Update
          {isLoading && <FontAwesomeIcon className="px-2 animate-spin" icon={faSpinner} />}
        </button>
      </form>

      <div className=" bg-gray-900 rounded-md w-2/3 h-full m-7 overflow-auto max-h-128 p-6">
        {isLoadingNewsList ? (
          <div className="flex justify-center items-center bg-onyx-black h-56 ">
            <FontAwesomeIcon size="4x" className="px-2 text-lava-red animate-spin" icon={faSpinner} />
          </div>
        ) : (
          newsList?.map((news) => (
            <div key={news.id} className="relative  ">
              <NewsCard
                onClick={() => {
                  reset({
                    headline: news?.headline,
                    content: news?.content,
                    imageURL: news?.imageURL,
                    category: news?.category,
                  });
                  setSelectedNewsID(news?.id);
                }}
                headline={news?.headline}
                content={news?.content}
                createdAt={news?.createdAt}
                imageURL={news?.imageURL}
              />
              <button
                type="button"
                onClick={() => {
                  onDelete({ id: news?.id }).then();
                }}
                className={`absolute right-5 top-1/4  bg-red-700  px-3 opacity-90 py-1 border border-black-eel rounded-full text-gray-200 font-bold text-sm ${
                  selectedNewsID === news?.id ? 'inline' : 'hidden'
                }`}
              >
                DELETE
                <FontAwesomeIcon
                  className={`${isLoadingDelete && 'animate-spin'} px-1`}
                  icon={isLoadingDelete ? faSpinner : faRemove}
                />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
