import React from 'react';
import { Link } from 'react-router-dom';
import VerificationWidget from '../blockchain/VerificationWidget';

const InnovationDetail = ({ innovation }) => {
  if (!innovation) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-4">{innovation.title}</h2>
        <p className="text-gray-600 mb-4">{innovation.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">类别</p>
            <p className="font-medium">{innovation.category}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">状态</p>
            <p className="font-medium">{innovation.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">提交者</p>
            <p className="font-medium">{innovation.submitter}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">组织</p>
            <p className="font-medium">{innovation.organization || '无'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">创建时间</p>
            <p className="font-medium">
              {new Date(innovation.createdAt).toLocaleDateString('zh-CN')}
            </p>
          </div>
          {innovation.relatedNeedId && (
            <div>
              <p className="text-sm text-gray-500">关联需求</p>
              <Link to={`/needs/${innovation.relatedNeedId}`} className="text-primary hover:underline">
                查看需求
              </Link>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">解决方案详情</h3>
            <p className="text-gray-600">{innovation.solutionDetails || '未提供'}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">潜在影响</h3>
            <p className="text-gray-600">{innovation.potentialImpact || '未提供'}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">实施计划</h3>
            <p className="text-gray-600">{innovation.implementationPlan || '未提供'}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">是否机密</h3>
            <p className="text-gray-600">{innovation.isConfidential ? '是' : '否'}</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <VerificationWidget
          recordType="innovation"
          recordId={innovation.id}
          title={innovation.title}
        />
      </div>
      <Link to="/innovations" className="btn-secondary mt-4 inline-block">
        返回方案列表
      </Link>
    </div>
  );
};

export default InnovationDetail;