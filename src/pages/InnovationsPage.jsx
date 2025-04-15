import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import InnovationCard from '@/components/innovations/InnovationCard';
import { useApi } from '@/hooks/useApi';

const InnovationsPage = () => {
  const { fetchData } = useApi();
  const [innovations, setInnovations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInnovations = async () => {
      try {
        const data = await fetchData('/innovations');
        setInnovations(data);
      } catch (err) {
        setError('无法加载创新方案');
      } finally {
        setLoading(false);
      }
    };
    loadInnovations();
  }, [fetchData]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">创新方案</h1>
          <Link to="/innovations/create" className="btn-primary">
            提交新方案
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-10">加载中...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : innovations.length === 0 ? (
          <div className="text-center py-10">暂无创新方案</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {innovations.map(innovation => (
              <InnovationCard key={innovation.id} innovation={innovation} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InnovationsPage;