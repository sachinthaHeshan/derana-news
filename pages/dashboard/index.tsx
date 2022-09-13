import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DashboardLayout } from '../../modules/app/components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { MainDashboardTabView } from '../../modules/dashboard/components/MainDashboardTabView';

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
      <MainDashboardTabView />
    </DashboardLayout>
  );
};

export default Dashboard;
