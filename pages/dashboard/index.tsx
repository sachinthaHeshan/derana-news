import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '../../modules/app/components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const Dashboard: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/dashboard/login');
    }
  }, [router, user]);

  return (
    <DashboardLayout>
      <div className="mt- text-white">Email : {user?.email}</div>
    </DashboardLayout>
  );
};

export default Dashboard;
