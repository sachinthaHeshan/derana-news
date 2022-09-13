import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { DashboardLayout } from '../../modules/app/components/DashboardLayout';
import { MainDashboardTabView } from '../../modules/dashboard/components/MainDashboardTabView';
import { auth } from '../../modules/shared/utils/firebace';

const Dashboard: NextPage = () => {
  const router = useRouter();

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
    if (!user && !loading) {
      router.push('/dashboard/login');
    }
  }, [router, user, loading, error]);

  return (
    <DashboardLayout>
      {user && !loading ? (
        <MainDashboardTabView />
      ) : (
        <div className="flex justify-center items-center bg-onyx-black h-screen ">
          <FontAwesomeIcon size="4x" className="px-2 text-lava-red animate-spin" icon={faSpinner} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
