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

interface FormDataType {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

const createEditorTabSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
  })
  .required();

export const CreateEditorTab = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues: {},
    resolver: yupResolver(createEditorTabSchema),
  });

  const onSubmit = async ({ firstName, lastName, email, password }: FormDataType) => {
    try {
      setIsLoading(true);

      const idToken = await auth?.currentUser?.getIdToken(/* forceRefresh */ true);

      if (idToken) {
        await axios.post(
          `/api/user`,
          { firstName, lastName, email, password, userRole: 'editor' },
          {
            headers: {
              token: idToken,
            },
          },
        );
        toast.success('Created Editor successfully!');
      }
    } catch (error: any) {
      const errorCode = error?.response?.data?.error;

      if (errorCode === 'auth/invalid-email') {
        toast.error('Invalid email Address.');
      } else if (errorCode === 'auth/user-not-found') {
        toast.error('Unknown email address.');
      } else if (errorCode === 'auth/wrong-password') {
        toast.error('Invalid Password.');
      } else if (errorCode === 'auth/email-already-in-use') {
        toast.error('This email address already used.');
      } else {
        toast.error('Something went wrong! Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center bg-onyx-black rounded-md">
      <form className="flex flex-col w-80 m-8" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="p-3 text-white text-4xl">Create Editor</h1>

        <span className="py-2 w-full text-gray-400">First Name</span>
        <InputField
          errors={errors}
          control={control}
          name="firstName"
          placeholder="First Name"
          type="text"
          className=" p-2.5 w-full bg-jungle-gray border border-2 border-black-eel rounded-md outline-none text-white"
        />

        <span className="py-2 w-full text-gray-400">Last Name</span>
        <InputField
          errors={errors}
          control={control}
          name="lastName"
          placeholder="Last Name"
          type="text"
          className=" p-2.5 w-full bg-jungle-gray border border-2 border-black-eel rounded-md outline-none text-white"
        />

        <span className="py-2 w-full text-gray-400">Email</span>
        <InputField
          errors={errors}
          control={control}
          name="email"
          placeholder="example@example.com"
          type="text"
          className=" p-2.5 w-full bg-jungle-gray border border-2 border-black-eel rounded-md outline-none text-white"
        />

        <span className="py-2 w-full text-gray-400">Password</span>
        <InputField
          errors={errors}
          control={control}
          name="password"
          placeholder="Password"
          type="password"
          className=" p-2.5 w-full bg-jungle-gray border border-2 border-black-eel rounded-md outline-none text-white"
        />

        <button
          type="submit"
          className="mt-6 p-3 w-full bg-baltic-gray border border-2 border-black-eel rounded-md outline-none text-white font-bold opacity-90 active:opacity-80 hover:opacity-100"
        >
          Create
          {isLoading && <FontAwesomeIcon className="px-2 animate-spin" icon={faSpinner} />}
        </button>
      </form>
    </div>
  );
};
