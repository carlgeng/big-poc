import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import NeedList from '@/components/needs/NeedList';
import { useApi } from '@/hooks/useApi';

const NeedsPage = () => {
  const { fetchData } = useApi();
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNeeds = async () => {
      try {
        const data = await fetchData('/needs');
        setNeeds(data);
      } catch (err) {
        setError('无法加载需求列表');
      } finally {
        setLoading(false);
      }
    };
    loadNeeds();
  }, [fetchData]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">临床需求</h1>
          <Link to="/needs/create" className="btn-primary">
            提交新需求
          </Link>
        </div>
        <NeedList needs={needs} loading={loading} error={error} />
      </div>
    </Layout>
  );
};

export default NeedsPage;