import React, { useEffect, useState } from 'react';
import Layout from '@/components/common/Layout';
import VotingList from '@/components/voting/VotingList';
import { useApi } from '@/hooks/useApi';

const VotingPage = () => {
  const { fetchData } = useApi();
  const [votingItems, setVotingItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVotingItems = async () => {
      try {
        const data = await fetchData('/voting');
        setVotingItems(data);
      } catch (err) {
        setError('无法加载投票列表');
      } finally {
        setLoading(false);
      }
    };
    loadVotingItems();
  }, [fetchData]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">需求评选</h1>
        {loading ? (
          <div className="text-center py-10">加载中...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <VotingList items={votingItems} />
        )}
      </div>
    </Layout>
  );
};

export default VotingPage;