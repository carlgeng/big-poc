import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import NeedCard from '../needs/NeedCard';

const RecentNeeds = () => {
  const { fetchData } = useApi();
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNeeds = async () => {
      try {
        const data = await fetchData('/needs?limit=3');
        setNeeds(data);
      } catch (err) {
        console.error('Failed to load recent needs:', err);
      } finally {
        setLoading(false);
      }
    };
    loadNeeds();
  }, [fetchData]);

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">最新需求</h3>
        <Link to="/needs" className="text-primary hover:underline">查看全部</Link>
      </div>
      {loading ? (
        <div className="text-center">加载中...</div>
      ) : needs.length === 0 ? (
        <div className="text-center text-gray-500">暂无需求</div>
      ) : (
        <div className="space-y-4">
          {needs.map(need => (
            <NeedCard key={need.id} need={need} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentNeeds;