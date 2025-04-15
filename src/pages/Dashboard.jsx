import React, { useEffect, useState } from 'react';
import Layout from '@/components/common/Layout';
import DashboardCard from '@/components/dashboard/DashboardCard';
import RecentNeeds from '@/components/dashboard/RecentNeeds';
import ActivityList from '@/components/dashboard/ActivityList';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const { fetchData } = useApi();
  const [stats, setStats] = useState({
    totalNeeds: 0,
    activeInnovations: 0,
    pendingVotes: 0,
    completedProjects: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchData('/dashboard/stats');
        setStats(data);
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [fetchData]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">欢迎, {user?.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="总需求数"
            value={stats.totalNeeds}
            icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            color="primary"
          />
          <DashboardCard
            title="活跃方案"
            value={stats.activeInnovations}
            icon="M13 10V3L4 14h7v7l9-11h-7z"
            color="secondary"
          />
          <DashboardCard
            title="待投票"
            value={stats.pendingVotes}
            icon="M5 15l7-7 7 7"
            color="success"
          />
          <DashboardCard
            title="完成项目"
            value={stats.completedProjects}
            icon="M5 13l4 4L19 7"
            color="green"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentNeeds />
          <ActivityList />
        </div>
        <div className="mt-6">
          <AnalyticsChart />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;