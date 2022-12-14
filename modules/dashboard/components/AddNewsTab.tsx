import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import axios from 'axios';
import { auth } from '../../shared/utils/firebase';
import { InputField } from '../../shared/components/InputField';
import { TextAreaField } from '../../shared/components/TextAreaField';

interface FormDataType {
  headline?: string;
  content?: string;
  imageURL?: string;
  category?: string;
}

const addNewsTabSchema = yup
  .object({
    headline: yup.string().required(),
    content: yup.string().required(),
    imageURL: yup.string().required(),
  })
  .required();

export const AddNewsTab = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues: {},
    resolver: yupResolver(addNewsTabSchema),
  });

  const onSubmit = async ({ headline, content, imageURL, category }: FormDataType) => {
    try {
      setIsLoading(true);

      const idToken = await auth?.currentUser?.getIdToken(/* forceRefresh */ true);

      if (idToken) {
        await axios.post(
          `/api/news`,
          { headline, content, imageURL, category },
          {
            headers: {
              token: idToken,
            },
          },
        );
        toast.success('News created successfully!');
      }
    } catch (error: any) {
      // const errorCode = error?.response?.data?.error;

      toast.error('Something went wrong! Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center bg-onyx-black rounded-md">
      <form className="flex flex-col w-80 m-8" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="p-3 text-white text-4xl">Add News</h1>

        <span className="py-2 w-full text-gray-400">Headline</span>
        <InputField
          errors={errors}
          control={control}
          name="headline"
          placeholder="Headline"
          type="text"
          className=" p-2.5 w-full bg-jungle-gray border border-2 border-black-eel rounded-md outline-none text-white"
        />

        <span className="py-2 w-full text-gray-400">Content</span>
        <TextAreaField
          errors={errors}
          control={control}
          name="content"
          placeholder="type here..."
          className=" p-2.5 w-full bg-jungle-gray border border-2 border-black-eel rounded-md outline-none text-white"
        />

        <span className="py-2 w-full text-gray-400">Category</span>
        <InputField
          errors={errors}
          control={control}
          name="category"
          placeholder="category"
          type="text"
          className=" p-2.5 w-full bg-jungle-gray border border-2 border-black-eel rounded-md outline-none text-white"
        />

        <span className="py-2 w-full text-gray-400">Image URL</span>
        <InputField
          errors={errors}
          control={control}
          name="imageURL"
          placeholder="https://www.example.com/example.jpg"
          type="text"
          className=" p-2.5 w-full bg-jungle-gray border border-2 border-black-eel rounded-md outline-none text-white"
        />

        <button
          type="submit"
          className="mt-6 p-3 w-full bg-baltic-gray border border-2 border-black-eel rounded-md outline-none text-white font-bold opacity-90 active:opacity-80 hover:opacity-100"
        >
          Publish
          {isLoading && <FontAwesomeIcon className="px-2 animate-spin" icon={faSpinner} />}
        </button>
      </form>
    </div>
  );
};
