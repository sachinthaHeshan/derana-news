import type { NextPage } from 'next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { DashboardLayout } from '../../modules/app/components/DashboardLayout';
import { InputField } from '../../modules/shared/components/InputField';

import { auth } from '../../modules/shared/utils/firebace';

interface LoginFormData {
  email?: string;
  password?: string;
}

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const Login: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const { login } = useAuth();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const onSubmit = async ({ email, password }: LoginFormData) => {
    try {
      setIsLoading(true);
      if (!!email && !!password) {
        await signInWithEmailAndPassword(auth, email, password);
      }
      toast.success('Logged in  successfully!');
      await router.push('/dashboard');
    } catch (error: any) {
      if (error?.code === 'auth/invalid-email') {
        toast.error('Invalid email Address.');
      } else if (error?.code === 'auth/user-not-found') {
        toast.error('Unknown email address.');
      } else if (error?.code === 'auth/wrong-password') {
        toast.error('Invalid Password.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-center items-center  bg-onyx-black h-screen">
        <form className="flex flex-col justify-center items-center w-80" onSubmit={handleSubmit(onSubmit)}>
          <img className="w-32" src="/images/derana-logo.png" alt="Derana Logo" />

          <h1 className="p-3 text-white text-4xl">Login</h1>

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
            Login
            {isLoading && <FontAwesomeIcon className="px-2 animate-spin" icon={faSpinner} />}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Login;
