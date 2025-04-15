import React from 'react';
import NeedCard from './NeedCard';
import { Link } from 'react-router-dom';

const NeedList = ({ needs, loading, error }) => {
  if (loading) {
    return <div className="text-center py-10">加载中...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  if (!needs || needs.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 mb-4">暂无临床需求</p>
        <Link to="/needs/create" className="btn-primary">
          提交新需求
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {needs.map(need => (
        <NeedCard key={need.id} need={need} />
      ))}
    </div>
  );
};

export default NeedList;