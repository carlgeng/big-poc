import React from 'react';
import { Link } from 'react-router-dom';

const InnovationCard = ({ innovation }) => {
  const {
    id,
    title,
    description,
    category,
    submitter,
    organization,
    createdAt,
    status,
    relatedNeedId,
  } = innovation;

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    published: 'bg-blue-100 text-blue-800',
    underReview: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 text-xs rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
            {status === 'draft' ? '草稿'
              : status === 'published' ? '已发布'
              : status === 'underReview' ? '审核中'
              : status === 'approved' ? '已通过'
              : '已拒绝'}
          </span>
          {relatedNeedId && (
            <Link to={`/needs/${relatedNeedId}`} className="text-primary hover:underline text-sm">
              关联需求
            </Link>
          )}
        </div>
        <Link to={`/innovations/${id}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary">{title}</h3>
        </Link>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-500">
            {organization && <span className="inline-block mr-4">{organization}</span>}
            <span>提交于 {formatDate(createdAt)}</span>
          </div>
          <Link to={`/innovations/${id}`} className="text-primary hover:text-primary-dark font-medium">
            查看详情
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InnovationCard;