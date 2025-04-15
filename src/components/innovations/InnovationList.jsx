import React from 'react';
import InnovationCard from './InnovationCard';
import { Link } from 'react-router-dom';

const InnovationList = ({ innovations, loading, error }) => {
  if (loading) {
    return <div className="text-center py-10">加载中...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  if (!innovations || innovations.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 mb-4">暂无创新方案</p>
        <Link to="/innovations/create" className="btn-primary">
          提交新方案
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {innovations.map(innovation => (
        <InnovationCard key={innovation.id} innovation={innovation} />
      ))}
    </div>
  );
};

export default InnovationList;